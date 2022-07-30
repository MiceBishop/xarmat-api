import Router from 'express-promise-router';
import {
  createUserSessionHandler, deleteSessionHandler, getProfile, getUserSessionHandler, refreshSession,
} from '../../controllers/session.controller';
import createUserHandler from '../../controllers/user.controller';
import { requireUser } from '../../middleware/requireUser';
import validate from '../../middleware/validateResource';
import createSessionSchema from '../../schema/session.schema';
import createUserSchema from '../../schema/user.schema';

const router = Router();

router.post('/signup', validate(createUserSchema), (createUserHandler));
router.post('/login', validate(createSessionSchema), (createUserSessionHandler));
router.get('/sessions', requireUser, getUserSessionHandler);
router.get('/profile', requireUser, getProfile);
router.post('/refresh-token', refreshSession);
router.delete('/logout', requireUser, deleteSessionHandler);

export default router;
