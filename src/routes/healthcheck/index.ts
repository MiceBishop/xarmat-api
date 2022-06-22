import Router from 'express-promise-router';
import logger from '../../utils/logger';

const router = Router();

router.get('/', (req, res) => {
  logger.info('Service Healthy');
  res.sendStatus(200);
});

export default router;
