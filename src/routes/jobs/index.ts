import Router from 'express-promise-router';
import { getAllJobs, getMyPublishedJobs, publishJob } from '../../controllers/job.controller';
import { requireUser } from '../../middleware/requireUser';
import { validateRole } from '../../middleware/vaildatePrivilege';
import validate from '../../middleware/validateResource';
import { Role } from '../../models/user.model';
import createJobSchema from '../../schema/job.schema';

const router = Router();

router.post(
  '/publish',
  validate(createJobSchema),
  requireUser,
  validateRole([Role.PROFESSIONAL]),
  publishJob,
);
router.get(
  '/my-jobs',
  requireUser,
  validateRole([Role.PROFESSIONAL]),
  getMyPublishedJobs,
);
router.get(
  '/',
  requireUser,
  validateRole([Role.ADMIN, Role.PROFESSIONAL, Role.FREELANCER]),
  getAllJobs,
);

export default router;
