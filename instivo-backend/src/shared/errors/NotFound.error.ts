import { HttpStatusCode } from 'axios';

import CustomError from './Custom.error';

class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, HttpStatusCode.NotFound);
  }
}

export { NotFoundError };
