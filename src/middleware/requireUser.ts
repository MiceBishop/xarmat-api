import { NextFunction, Request, Response } from 'express';
import errors from '../utils/errors';

export function requireUser(req: Request, res: Response, next: NextFunction) {
  const { user } = res.locals;
  if (!user) {
    return res.status(401).send({ error: errors.ACCESS_DENIED });
  }

  return next();
}
