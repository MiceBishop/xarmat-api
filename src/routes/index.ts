import Router from 'express-promise-router';
import healthcheck from './healthcheck';
import users from './users';
import sessions from './sessions';
import skills from './skills';

const router = Router();

router.use('/healthcheck', healthcheck);
router.use('/users', users);
router.use('/sessions', sessions);
router.use('/skills', skills);

export default router;
