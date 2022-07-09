import Router from 'express-promise-router';
import { createUserSessionHandler } from '../../controllers/session.controller';
import validate from '../../middleware/validateResource';
import createSessionSchema from '../../schema/session.schema';

const router = Router();

router.post('/login', validate(createSessionSchema), (createUserSessionHandler));

export default router;
