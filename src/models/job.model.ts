import mongoose from 'mongoose';
import type { ProposalDocument } from './proposal.model';
import { SkillDocument } from './skill.model';
import { UserDocument } from './user.model';

export enum JobDuration {
  LESS_THAN_A_WEEK = 'less_than_a_week',
  A_WEEK_TO_A_MONTH = 'a_week_to_a_month',
  ONE_TO_3_MONTHS = 'one_to_3_months',
  MORE_THAN_3_MONTHS = 'more_than_3_months',
}

export interface JobDocument extends mongoose.Document {
  professional: UserDocument['_id'];
  title: string;
  description: string;
  budget: number[];
  duration: JobDuration;
  skills: SkillDocument['_id'][];
  proposals: ProposalDocument['_id'][];
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new mongoose.Schema(
  {
    professional: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String },
    description: { type: String },
    budget: [{ type: Number }],
    duration: { type: String },
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill', default: [] }],
    proposals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Proposal', default: [] }],
  },
  {
    timestamps: true,
  },
);

const Job = mongoose.model('Job', jobSchema);

export default Job;
