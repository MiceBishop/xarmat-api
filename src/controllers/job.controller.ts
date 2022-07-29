import { Request, Response } from 'express';
import { CreateJobInput } from '../schema/job.schema';
import { createJob } from '../services/job.service';
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
