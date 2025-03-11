import { NextFunction, Request, Response } from 'express';

import { UnauthorizedError } from '@shared/errors';
import { Secret, verify } from 'jsonwebtoken';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

const ensureAuthenticationMiddleware = async (
  request: Request,
  _: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError('Missing JWT token.');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, process.env.APP_SECRET as Secret);

    const { sub } = decodedToken as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new UnauthorizedError('Invalid JWT token.');
  }
};

export { ensureAuthenticationMiddleware };
