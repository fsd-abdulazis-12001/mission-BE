import {  Httpexception } from "./root";

export class UnprecessableEntity extends Httpexception {

    constructor(error: any ,message: string, errorCode:number) {
        super(message, errorCode, 422, error);
    }
}