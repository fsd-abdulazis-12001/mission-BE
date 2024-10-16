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
import {GOOGLE_CLIENT_ID , GOOGLE_CLIENT_SECRET, ORIGIN,JWT_SECRET} from '../secret'
import { google } from 'googleapis';
 
 
const client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);

 
 
 

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
    if (user){
        new BadRequestException("User already exists", ErrorCode.USER_ALREADY_EXISTS)
    }
    user = await prismaClient.user.create({
        data: {
            email,
            password:hashSync(password, 10),
            name
        }
    })
    res.json(user)
}


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

    const token = jwt.sign({userId: user.id}, JWT_SECRET || 'secret', {
        expiresIn: '1d'
    })
    
    res.json({user, token})
}


// /me -> return the logged in user

export const me = async (req: RequestCustom, res: Response) => {
  
    
    res.json(req.user)
}