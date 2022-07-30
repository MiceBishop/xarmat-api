import { Request, Response } from 'express';
import get from 'lodash/get';
import Job from '../models/job.model';
import { Role } from '../models/user.model';
import { CreateProposalInput } from '../schema/proposal.schema';
import { createProposal, deleteProposal, findProposals } from '../services/proposal.service';
import errors from '../utils/errors';
import logger from '../utils/logger';

export async function submitProposal(req: Request<{}, {}, CreateProposalInput['body']>, res: Response) {
  try {
    const userId = res.locals.user._id;
    const job = await createProposal({ ...req.body, freelancer: userId });
    return res.send(job);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

export async function deleteProposalHandler(req: Request<{}, {}, CreateProposalInput['body']>, res: Response) {
  try {
    const proposalIdToDelete = get(req.params, 'id');
    await deleteProposal({ _id: proposalIdToDelete });
    return res.status(200);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

export async function getAllProposals(req: Request<{}, {}, CreateProposalInput['body']>, res: Response) {
  try {
    const query = req.params || {};
    const allProposals = await findProposals({ ...query });
    return res.status(200).send(allProposals);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

export async function getMySubmittedProposals(req: Request<{}, {}, CreateProposalInput['body']>, res: Response) {
  try {
    const query = req.params || {};
    const currentUser = res.locals.user;
    const myProposals = await findProposals({ freelancer: currentUser._id, ...query });
    return res.status(200).send(myProposals);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

export async function getJobProposals(req: Request<{}, {}, CreateProposalInput['body']>, res: Response) {
  try {
    const jobId = get(req.params, 'jobId');
    const currentUser = res.locals.user;
    const myJob = await Job.findOne({ professional: currentUser._id });
    if (!myJob && res.locals.user.role !== Role.ADMIN) {
      return res.status(403).send({ error: errors.ACCESS_FORBIDDEN });
    }
    const myJobProposals = await findProposals({ job: jobId, ...req.query });
    return res.status(200).send(myJobProposals);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}
