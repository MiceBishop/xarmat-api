import Router from 'express-promise-router';
import createUserHandler from '../../controllers/user.controller';
import validate from '../../middleware/validateResource';
import createUserSchema from '../../schema/user.schema';

const router = Router();

router.post('/signup', validate(createUserSchema), (createUserHandler));

export default router;
