import mongoose from 'mongoose';
import logger from './logger';

export default async function connect() {
  try {
    if (!process.env.DB_URI) {
      throw new Error('DB_URI env variable not set');
    }
    await mongoose.connect(process.env.DB_URI);
    logger.info('Successfully connected to db');
  } catch (error) {
    logger.error('Database connection failed');
    logger.error(error);
    process.exit(1);
  }
}
