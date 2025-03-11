import { HttpStatusCode } from 'axios';

import CustomError from './Custom.error';

class ConflictError extends CustomError {
  constructor(message: string) {
    super(message, HttpStatusCode.Conflict);
  }
}

export { ConflictError };
