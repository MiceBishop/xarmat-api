import get from 'lodash/get';
import { NextFunction, Request, Response } from 'express';
import { verifyJwt } from '../utils/jwt.utils';
import { refreshAccessToken } from '../services/session.service';

export async function deserializeUser(req: Request, res: Response, next: NextFunction) {
  const accessToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');
  if (!accessToken) {
    return next();
  }

  const refreshToken = get(req, 'headers.x-refresh');

  const { decoded, expired } = verifyJwt(accessToken);
  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await refreshAccessToken({ refreshToken });
    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken);
      const validAccessToken = verifyJwt(newAccessToken);
      res.locals.user = validAccessToken.decoded;
      return next();
    }
  }

  return next();
}
