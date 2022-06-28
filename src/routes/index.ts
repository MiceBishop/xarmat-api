import Router from 'express-promise-router';
import healthcheck from './healthcheck';
import users from './users';

const router = Router();

router.use('/healthcheck', healthcheck);
router.use('/users', users);

export default router;
