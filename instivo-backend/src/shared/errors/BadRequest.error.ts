import { HttpStatusCode } from 'axios';

import CustomError from './Custom.error';

class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, HttpStatusCode.BadRequest);
  }
}

export { BadRequestError };
