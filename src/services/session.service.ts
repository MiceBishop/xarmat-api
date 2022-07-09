import get from 'lodash/get';
import { FilterQuery, UpdateQuery } from 'mongoose';
import Session, { SessionDocument } from '../models/session.model';
import { signJwt, verifyJwt } from '../utils/jwt.utils';
import { findUser } from './user.service';

export async function createSession(userId: string, userAgent: string) {
  const session = await Session.create({ user: userId, userAgent });
  return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  return Session.find(query).lean();
}

// eslint-disable-next-line max-len
export async function updateSession(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) {
  return Session.updateOne(query, update);
}

export async function refreshAccessToken({ refreshToken }: { refreshToken: string }) {
  const { decoded } = verifyJwt(refreshToken);
  if (!decoded || !get(decoded, 'session')) {
    return false;
  }

  const session = await Session.findById(get(decoded, 'session', null));
  if (!session || !session.valid) {
    return false;
  }

  const user = await findUser({ _id: session.user });
  if (!user) {
    return false;
  }

  const accessToken = signJwt(
    { ...user, session: session._id },
    {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES,
    },
  );

  return accessToken;
}
