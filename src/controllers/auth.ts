import { prismaClient } from './../index';

import { NextFunction, Request, Response } from 'express';
import {hashSync, compareSync} from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { BadRequestException } from '../exceptions/bad-request';
import { ErrorCode } from '../exceptions/root';
import { SignupSchema } from '../schema/users';
import { NotFoundException } from '../exceptions/not-found';
import { RequestCustom } from '../interfaces/request-custom';
import { OAuth2Client } from 'google-auth-library';
import {GOOGLE_CLIENT_ID , GOOGLE_CLIENT_SECRET, ORIGIN,JWT_SECRET, FE_BASE_URL} from '../secret'
import { google } from 'googleapis';
import { sendVerificationEmail } from '../services/nodemailer';
 
 
const client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);

 
export const updateProfile = async (req: RequestCustom, res: Response, next: NextFunction) => {
  const { name, profileImage } = req.body;
  const userId = req.user?.id;  

  if (!name && !profileImage) {
    throw new BadRequestException('No fields provided for update', ErrorCode.MISSING_REQUIRED_FIELDS);
  }

  const dataToUpdate: any = {};
  if (name) dataToUpdate.name = name;
  
  if (profileImage) dataToUpdate.profileImage = profileImage;

  const updatedUser = await prismaClient.user.update({
    where: { id: userId },
    data: dataToUpdate,
  });

  res.json({ user: updatedUser });
};
 

export const googleLoginCallBack = async (req: Request, res: Response, next: NextFunction) => {
     //tidak perlu pake try-catch karena sudah di wrap pake error-handler high-level functions
    const {code} = req.body
    if (!code) {
        throw new BadRequestException("Missing code", ErrorCode.MISSING_REQUIRED_FIELDS)
    }

    const { tokens } = await client.getToken({
        code,
        redirect_uri: 'postmessage',
        
    });
    
      console.log(tokens)
    // Verify the ID token
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token!,
      audience: GOOGLE_CLIENT_ID,
    });
    console.log(ticket)
    const payload = ticket.getPayload();
    const googleId = payload?.sub;

    if (!payload) {
      return res.status(400).json({ error: "Invalid Google ID token" });
    }
    if (!googleId || !payload?.email) {
        throw new NotFoundException("Not Found", ErrorCode.ITEM_NOT_FOUND)
    }

    let user = await prismaClient.user.findUnique({
        where: {
          googleId: googleId!,
          email: payload.email
        },
      });
  
    if (!user){
        user = await prismaClient.user.create({
            data: {
                googleId: googleId!,
                email: payload.email!,
                name: payload.name!,
                profileImage: payload.picture || "",
                authProvider: "google",
                isActive: true,
                password: "",
            }
        })
    
    }
    const token = jwt.sign({userId: user.id}, JWT_SECRET || 'secret', {
        expiresIn: '1d'
    })
    console.log(token)


    res.json({user, token})
}
 
 

export const signup = async (req: Request, res: Response,next: NextFunction) => {

    //tidak perlu pake try-catch karena sudah di wrap pake error-handler high-level functions
    SignupSchema.parse(req.body)
    const {email, password, name} = req.body
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
     new BadRequestException("Invalid email format", ErrorCode.INVALID_EMAIL_FORMAT);
    }
    let user = await prismaClient.user.findFirst({
        where: {
            email
        }   
    })
    if (user && user.isActive) {
       throw new BadRequestException("This email already registered", ErrorCode.USER_ALREADY_EXISTS)
    }else if (user && !user.isActive) {
        throw new BadRequestException("Verify your email", ErrorCode.EMAIL_NOT_VERIFIED)
    }
    user = await prismaClient.user.create({
        data: {
            email,
            password:hashSync(password, 10),
            name
        }
    })

     // Generate a token for email verification
  const verificationToken = jwt.sign({ userId: user.id }, JWT_SECRET || 'secret', { expiresIn: '1d' });
  console.log(verificationToken)
  const verificationLink = `${FE_BASE_URL}/verify-email?token=${verificationToken}`; 

  // Send verification email
  await sendVerificationEmail(user.email, verificationLink);
    res.json(user)
}
export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.query;
  
    if (!token) {
      throw new BadRequestException("Missing verification token", ErrorCode.MISSING_REQUIRED_FIELDS);
    }
  
    const decoded = jwt.verify(token as string, JWT_SECRET || 'secret') as { userId: number };

   
    const user = await prismaClient.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
    }

    
    if (user.isActive) {
      return res.status(200).json({ message: "Email is already verified." });
    }

     
    const updatedUser = await prismaClient.user.update({
      where: { id: decoded.userId },
      data: { isActive: true },
    });

    res.status(200).json({ message: "Email verified successfully!", user: updatedUser });
  };

export const login = async (req: Request, res: Response, next: NextFunction) => {
     //tidak perlu pake try-catch karena sudah di wrap pake error-handler high-level functions
    const {email, password} = req.body

    let user = await prismaClient.user.findFirst({
        where: {
            email
        }   
    })
    if (!user){
        throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND)
         
    }

   if (!compareSync(password, user.password)){
         throw new BadRequestException("Invalid Credentials", ErrorCode.WRONG_PASSWORD)
    }
    const verified = user.isActive
    if (!verified) {
        throw new BadRequestException("Email not verified", ErrorCode.EMAIL_NOT_VERIFIED)
    }

    const token = jwt.sign({userId: user.id}, JWT_SECRET || 'secret', {
        expiresIn: '1d'
    })
    
    res.json({user, token})
}


// /me -> return the logged in user

export const me = async (req: RequestCustom, res: Response) => {
  
    
    res.json(req.user)
}