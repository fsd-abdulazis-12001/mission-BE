import { NextFunction, Request, Response } from "express"
import { Httpexception } from "../exceptions/root"

export const errorMiddleware = (error: Httpexception,req:Request,res:Response, next:NextFunction) => {
   res.status(error.statusCode || 500).json({
       success: false,
       message: error.message || "Internal Server Error",
       errorCode: error.errorCode,
       errors: error.errors
   })
}