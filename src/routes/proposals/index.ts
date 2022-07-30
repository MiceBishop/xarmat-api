import Router from 'express-promise-router';
import {
  getAllProposals, getJobProposals, getMySubmittedProposals, submitProposal,
} from '../../controllers/proposal.controller';
import { requireUser } from '../../middleware/requireUser';
import { validateRole } from '../../middleware/vaildatePrivilege';
import validate from '../../middleware/validateResource';
import { Role } from '../../models/user.model';
import createProposalSchema from '../../schema/proposal.schema';

const router = Router();

router.post(
  '/submit',
  validate(createProposalSchema),
  requireUser,
  validateRole([Role.FREELANCER]),
  submitProposal,
);
router.get(
  '/my-proposals',
  requireUser,
  validateRole([Role.FREELANCER]),
  getMySubmittedProposals,
);
router.get(
  '/:jobId',
  requireUser,
  validateRole([Role.PROFESSIONAL, Role.ADMIN]),
  getJobProposals,
);
router.get(
  '/',
  requireUser,
  validateRole([Role.ADMIN]),
  getAllProposals,
);
// get proposals of a job

export default router;
