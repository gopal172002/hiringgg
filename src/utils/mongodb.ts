import mongoose from 'mongoose';

const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) return;

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined in the environment variables');
  }

  await mongoose.connect(process.env.MONGO_URI);
};

export default connectToDatabase;
