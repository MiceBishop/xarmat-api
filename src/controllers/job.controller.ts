import { Request, Response } from 'express';
import get from 'lodash/get';
import { CreateJobInput } from '../schema/job.schema';
import { createJob, deleteJob, findJobs } from '../services/job.service';
import logger from '../utils/logger';

export async function publishJob(req: Request<{}, {}, CreateJobInput['body']>, res: Response) {
  try {
    const userId = res.locals.user._id;
    const job = await createJob({ professional: userId, ...req.body });
    return res.send(job);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

export async function deleteJobHandler(req: Request<{}, {}, CreateJobInput['body']>, res: Response) {
  try {
    const jobIdToDelete = get(req.params, 'id');
    await deleteJob({ _id: jobIdToDelete });
    return res.status(200);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

export async function getAllJobs(req: Request<{}, {}, CreateJobInput['body']>, res: Response) {
  try {
    const query = req.params || {};
    const allJobs = await findJobs({ ...query });
    return res.status(200).send(allJobs);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

export async function getMyPublishedJobs(req: Request<{}, {}, CreateJobInput['body']>, res: Response) {
  try {
    const query = req.params || {};
    const currentUser = res.locals.user;
    const myJobs = await findJobs({ professional: currentUser._id, ...query });
    return res.status(200).send(myJobs);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}
