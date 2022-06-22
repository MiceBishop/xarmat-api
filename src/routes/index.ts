import Router from 'express-promise-router';
import healthcheck from './healthcheck';

const router = Router();

router.use('/healthcheck', healthcheck);

export default router;
