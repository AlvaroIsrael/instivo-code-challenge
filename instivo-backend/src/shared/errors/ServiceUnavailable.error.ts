import { HttpStatusCode } from 'axios';

import CustomError from './Custom.error';

class ServiceUnavailableError extends CustomError {
  constructor(message: string) {
    super(message, HttpStatusCode.ServiceUnavailable);
  }
}

export { ServiceUnavailableError };
