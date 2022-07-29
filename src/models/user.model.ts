import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { SkillDocument } from './skill.model';

export enum Role {
  FREELANCER = 'freelancer',
  PROFESSIONAL = 'professional',
  ADMIN = 'admin',
}

export interface UserDocument extends mongoose.Document {
  email: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  password: string;
  companyName: string | undefined;
  address: string | undefined;
  birthdate: Date | undefined;
  additionnalInfos: object | undefined;
  role: Role;
  skills: SkillDocument['_id'][];
  comparePassword(candidatePassword: string): Promise<Boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    companyName: { type: String },
    address: { type: String },
    birthdate: { type: Date },
    additionnalInfos: { type: Object },
    role: { type: String },
    skills: [{ type: String }],
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function f(next: any) {
  const user = this as unknown as UserDocument;
  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hashSync(user.password, salt);
  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function compare(
  candidatePassword: string,
): Promise<boolean> {
  const user = this as unknown as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch(() => false);
};

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
