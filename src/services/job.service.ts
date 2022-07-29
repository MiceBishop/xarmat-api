import { DocumentDefinition, FilterQuery, UpdateQuery } from 'mongoose';
import Job, { JobDocument } from '../models/job.model';

export async function createJob(input: DocumentDefinition<Omit<JobDocument, 'createdAt' | 'updatedAt'>>) {
  try {
    const job = await Job.create(input);
    return job.toJSON();
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findJob(query: FilterQuery<JobDocument>) {
  try {
    return await Job.findOne(query).lean();
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findJobs(query: FilterQuery<JobDocument>) {
  try {
    const jobs = await Job.find(query || {}).lean();
    return jobs;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function updateJob(query: FilterQuery<JobDocument>, update: UpdateQuery<JobDocument>) {
  try {
    return await Job.updateOne(query, update);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function deleteJob(query: FilterQuery<JobDocument>) {
  try {
    return await Job.deleteOne(query);
  } catch (error: any) {
    throw new Error(error);
  }
}
