import { NextFunction, Request, Response } from 'express';
import { Role } from '../models/user.model';
import errors from '../utils/errors';

export function validateRole(roles: Role[]) {
  // eslint-disable-next-line consistent-return
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = res.locals;
      if (!user) {
        return res.status(401).send({ error: errors.ACCESS_DENIED });
      }
      if (!roles.includes(user.role)) {
        return res.status(403).send({ error: errors.ACCESS_FORBIDDEN });
      }
      next();
    } catch (error: any) {
      return res.status(400).send(error.errors);
    }
  };
}
