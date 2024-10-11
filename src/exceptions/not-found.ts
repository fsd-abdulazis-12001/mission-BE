import { ErrorCode, Httpexception } from "./root";

export class NotFoundException extends Httpexception {
    constructor(message: string, errorCode: ErrorCode) {
        super(message, errorCode,404, null);
        
    }
}