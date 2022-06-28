import { DocumentDefinition } from 'mongoose';
import User, { UserDocument } from '../models/user.model';

export default async function createUser(input: DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updatedAt'>>) {
  try {
    return await User.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}
