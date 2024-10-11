import { prismaClient } from './../index';
import { NextFunction, Request, Response } from 'express';
import {JWT_SECRET} from '../secret'
import {hashSync, compareSync} from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { BadRequestException } from '../exceptions/bad-request';
import { ErrorCode } from '../exceptions/root';
import { SignupSchema } from '../schema/users';
import { NotFoundException } from '../exceptions/not-found';
import { RequestCustom } from '../interfaces/request-custom';


export const signup = async (req: Request, res: Response,next: NextFunction) => {

    //tidak perlu pake try-catch karena sudah di wrap pake error-handler high-level functions
    SignupSchema.parse(req.body)
    const {email, password, name} = req.body

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