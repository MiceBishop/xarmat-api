/* eslint-disable no-underscore-dangle */
import { Request, Response } from 'express';
import { omit } from 'lodash';
import {
  createSession, findSessions, refreshAccessToken, updateSession,
} from '../services/session.service';
import { findUser, validatePassword } from '../services/user.service';
import errors from '../utils/errors';
import { signJwt, verifyJwt } from '../utils/jwt.utils';

export async function createUserSessionHandler(req: Request, res: Response) {
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send('Invalid email or password');
  }

  const session = await createSession(user._id, req.get('user-agent') || '');

  const accessToken = signJwt(
    { ...user, session: session._id },
    {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES,
    },
  );

  const refreshToken = signJwt(
    { ...user, session: session._id },
    {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES,
    },
  );

  return res.send({ accessToken, refreshToken });
}

export async function refreshSession(req: Request, res: Response) {
  const { refreshToken } = req.body;
  const decodedToken = verifyJwt(refreshToken);
  if (!decodedToken.valid) {
    return res.status(403).send({ error: errors.ACCESS_DENIED });
  }

  const newAccessToken = await refreshAccessToken({ refreshToken });
  return res.status(200).send({ accessToken: newAccessToken });
}

export async function getUserSessionHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const sessions = await findSessions({ user: userId, valid: true });
  return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;
  await updateSession({ _id: sessionId }, { valid: false });
  return res.send({ accessToken: null, refreshToken: null });
}

export async function getProfile(req: Request, res: Response) {
  try {
    const userId = res.locals.user._id;
    const user = await findUser({ _id: userId });
    const profile = omit(user, ['password', 'createdAt', 'updatedAt']);
    res.status(200).send(profile);
  } catch (error) {
    res.status(409).send({ error });
  }
}
