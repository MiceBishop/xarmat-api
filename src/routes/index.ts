import Router from 'express-promise-router';
import healthcheck from './healthcheck';
import users from './users';
import sessions from './sessions';

const router = Router();

router.use('/healthcheck', healthcheck);
router.use('/users', users);
router.use('/sessions', sessions);

export default router;
