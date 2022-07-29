import { NextFunction, Request, Response } from 'express';
import { Role } from '../models/user.model';

export function validateRole(role: Role) {
  // eslint-disable-next-line consistent-return
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = res.locals;
      if (!user) {
        return res.sendStatus(403);
      }
      if (user.role !== role) {
        return res.sendStatus(403);
      }
      next();
    } catch (error: any) {
      return res.status(400).send(error.errors);
    }
  };
}
