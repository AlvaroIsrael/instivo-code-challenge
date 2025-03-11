import Joi from 'joi';

class ValidationError extends Joi.ValidationError {
  constructor(message: string) {
    super(message, [], null);
  }
}

export { ValidationError };
