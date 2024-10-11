import { Httpexception } from "./root";

export class UnauthorizedException extends Httpexception {
    constructor(message: string,  errorCode: number, errors?: any) {
        super(message, errorCode, 401, errors);
    }
 
}