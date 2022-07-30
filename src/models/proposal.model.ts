import mongoose from 'mongoose';
import { JobDocument } from './job.model';
import { UserDocument } from './user.model';

export enum JobDuration {
  LESS_THAN_A_WEEK = 'less_than_a_week',
  A_WEEK_TO_A_MONTH = 'a_week_to_a_month',
  ONE_TO_3_MONTHS = 'one_to_3_months',
  MORE_THAN_3_MONTHS = 'more_than_3_months',
}

export interface ProposalDocument extends mongoose.Document {
  freelancer: UserDocument['_id'];
  coverLetter: string;
  budget: number[];
  duration: JobDuration;
  job: JobDocument['_id'];
  createdAt: Date;
  updatedAt: Date;
}

const proposalSchema = new mongoose.Schema(
  {
    freelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    coverLetter: { type: String },
    budget: [{ type: Number }],
    duration: { type: String },
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  },
  {
    timestamps: true,
  },
);

const Proposal = mongoose.model('Proposal', proposalSchema);

export default Proposal;
