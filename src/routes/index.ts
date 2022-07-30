import Router from 'express-promise-router';
import healthcheck from './healthcheck';
import auth from './auth';
import skills from './skills';
import jobs from './jobs';
import proposals from './proposals';

const router = Router();

router.use('/healthcheck', healthcheck);
router.use('/auth', auth);
router.use('/skills', skills);
router.use('/jobs', jobs);
router.use('/proposals', proposals);

export default router;
