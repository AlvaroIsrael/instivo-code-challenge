import { HttpStatusCode } from 'axios';

import CustomError from './Custom.error';

class UnauthorizedError extends CustomError {
  constructor(message: string) {
    super(message, HttpStatusCode.Unauthorized);
  }
}

export { UnauthorizedError };
