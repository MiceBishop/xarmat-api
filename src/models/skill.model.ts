import mongoose from 'mongoose';

export interface SkillDocument extends mongoose.Document {
  label: string;
  shortCode: string;
  createdAt: Date;
  updatedAt: Date;
}

const skillSchema = new mongoose.Schema(
  {
    label: { type: String },
    shortCode: { type: String },
  },
  {
    timestamps: true,
  },
);

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;
