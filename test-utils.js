import mongoose from 'mongoose';
import Item from './models/item';

const models = [Item];

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URL, {});
  await Promise.all(models.map((model) => model.syncIndexes()));
};

const stopDB = async () => {
  await mongoose.disconnect();
};

const clearDB = async () => {
  await Promise.all(models.map((model) => model.deleteMany()));
};

export default {
  connectDB,
  stopDB,
  clearDB,
};
