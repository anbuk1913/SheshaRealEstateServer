import dotenv from 'dotenv';
dotenv.config();

export const env = {
  PORT:       process.env.PORT       || '5000',
  MONGO_URI:  process.env.MONGO_URI  || 'mongodb://localhost:27017/shesharealstate',
  JWT_SECRET: process.env.JWT_SECRET || 'sheshaSecretKey',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
};
