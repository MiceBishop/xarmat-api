import Router from 'express-promise-router';
import { publishJob } from '../../controllers/job.controller';
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
  validateRole(Role.PROFESSIONAL),
  publishJob,
);

export default router;
