import { NextFunction, Request, Response } from "express"
import { UnauthorizedException } from "../exceptions/unauthorized"
import { ErrorCode } from "../exceptions/root"
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../secret"
import { prismaClient } from ".."
import { any } from "zod"
import { RequestCustom } from "../interfaces/request-custom"

const authMiddleware =  async(req: RequestCustom, res: Response, next: NextFunction) => { 
    const token = req.headers.authorization
    if (!token) {
       next(new UnauthorizedException('User not logged in', ErrorCode.UNAUTHORIZED))
       return
    }

    try {
        const payload  = jwt.verify(token,JWT_SECRET) as any
        const user = await prismaClient.user.findUnique({
            where: {
                id: payload.userId
            }   
        })
        if (!user) {
            next(new UnauthorizedException('User not logged in', ErrorCode.UNAUTHORIZED))
            return
         }
         req.user= user
         next()
    } catch (error) {
        next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
    }

}

export default authMiddleware