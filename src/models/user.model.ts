import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserDocument extends mongoose.Document {
  email: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  password: string;
  companyName: string;
  address: string;
  birthdate: Date;
  additionnalInfos: object;
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
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function f(next: any) {
  const user = this as unknown as UserDocument;
  if (user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hashSync(user.password, salt);
  user.password = hash;

  return next;
});

const User = mongoose.model('User', userSchema);

export default User;
