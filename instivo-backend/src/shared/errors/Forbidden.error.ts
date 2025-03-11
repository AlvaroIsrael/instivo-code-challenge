import { HttpStatusCode } from 'axios';

import CustomError from './Custom.error';

class ForbiddenError extends CustomError {
  constructor(message: string) {
    super(message, HttpStatusCode.Forbidden);
  }
}

export { ForbiddenError };
