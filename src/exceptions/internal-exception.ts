import { Httpexception } from "./root";

export class InternalException extends Httpexception {
    constructor(message: string, errors: any, errorCode: number) {
        super(message, errorCode, 500, errors);
    }
 
}