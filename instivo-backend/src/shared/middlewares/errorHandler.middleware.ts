import { AxiosError, HttpStatusCode } from 'axios';
import { isCelebrateError } from 'celebrate';
import { NextFunction, Request, Response } from 'express';

import CustomError from '../errors/Custom.error';

interface IErrorResponseJson {
  name: string;
  message: string | string[] | Record<string, unknown>;
  isOperational: boolean;
  stack?: unknown;
}

interface IAxiosErrorResponseJson extends IErrorResponseJson {
  url?: string;
}

// noinspection JSUnusedLocalSymbols
export const errorHandlerMiddleware = async (
  err: Error | CustomError,
  _: Request,
  response: Response,
  // biome-ignore lint/correctness/noUnusedVariables: <explanation>
  next: NextFunction,
): Promise<Response> => {
  if (err instanceof CustomError) {
    const res: IErrorResponseJson = {
      name: err.name,
      message: err.message,
      isOperational: true,
      stack: process.env.NODE_ENV === 'development' ? err.stack : null,
    };

    return response.status(err.statusCode).json(res);
  } else if (err instanceof AxiosError) {
    const res: IAxiosErrorResponseJson = {
      name: err.name,
      url: err.response?.config.url,
      message: err.response?.data,
      isOperational: true,
      stack: process.env.NODE_ENV === 'development' ? err.stack : null,
    };

    return response
      .status(err.response?.status || HttpStatusCode.BadRequest)
      .json(res);
  } else if (isCelebrateError(err)) {
    const res: IErrorResponseJson = {
      name: err.message,
      message:
        err.details.get('headers')?.message ||
        err.details.get('params')?.message ||
        err.details.get('query')?.message ||
        err.details.get('cookies')?.message ||
        err.details.get('signedCookies')?.message ||
        err.details.get('body')?.message ||
        '',
      isOperational: true,
      stack: process.env.NODE_ENV === 'development' ? err.stack : null,
    };

    return response.status(HttpStatusCode.BadRequest).json(res);
  } else {
    const res: IErrorResponseJson = {
      name: err.name,
      message: err.message,
      isOperational: false,
      stack: process.env.NODE_ENV === 'development' ? err.stack : null,
    };

    return response.status(HttpStatusCode.InternalServerError).json(res);
  }
};
