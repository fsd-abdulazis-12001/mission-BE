//message , status code, error codes, error


export class Httpexception extends Error {
  message: string;
  errorCode: any;
  statusCode: number;
  errors: ErrorCode;
  constructor(message: string, errorCode: ErrorCode, statusCode: number, error: any) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = error;
  }
}

export enum ErrorCode {
  USER_NOT_FOUND = 1001,
  USER_ALREADY_EXISTS = 1002,
  WRONG_PASSWORD = 1003,
  UNAUTHORIZED = 1004,
  FORBIDDEN = 1005,
  USER_NOT_LOGGED_IN = 1006,
  UNPRECEDESSABLE_ENTITY = 2001,
  INTERNAL_EXCEPTION = 3001
}