import { HttpStatusCode } from 'axios';

class CustomError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = HttpStatusCode.BadRequest) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
    this.statusCode = statusCode;
  }
}

export default CustomError;
