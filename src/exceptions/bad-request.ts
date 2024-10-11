import { ErrorCode, Httpexception } from "./root";

export class BadRequestException extends Httpexception {
    constructor(message: string, errorCode: ErrorCode) {
        super(message, errorCode,400, null);
        
    }
}