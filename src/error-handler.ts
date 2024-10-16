import { Request, Response, NextFunction } from "express"
import { ErrorCode, Httpexception } from "./exceptions/root"
import { InternalException } from "./exceptions/internal-exception"

export const errorHandler = (method:Function) => {

    return async (req:Request, res:Response, next:NextFunction) => {
        try {
            await method(req, res, next)
        } catch (error:any) {
            let exception: Httpexception;
            if (error instanceof Httpexception) {
                exception = error
            }else{
                exception = new InternalException('Something went wrong', error, ErrorCode.INTERNAL_EXCEPTION)
            }
            next(exception)
        }
    }
    
}