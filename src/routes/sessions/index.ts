import Router from 'express-promise-router';
import { createUserSessionHandler, deleteSessionHandler, getUserSessionHandler } from '../../controllers/session.controller';
import { requireUser } from '../../middleware/requireUser';
import validate from '../../middleware/validateResource';
import createSessionSchema from '../../schema/session.schema';

const router = Router();

router.post('/login', validate(createSessionSchema), (createUserSessionHandler));
router.get('/profile', requireUser, getUserSessionHandler);
router.delete('/logout', requireUser, deleteSessionHandler);

export default router;
