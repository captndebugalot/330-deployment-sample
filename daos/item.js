import Item from '../models/item';

const create = async (name) => {
  const item = await Item.create({ name });

  return item;
};

const getAll = async () => {
  const items = await Item.find().lean();

  return items;
};

const getById = async (itemId) => {
  const item = await Item.findOne({ _id: itemId }).lean();

  return item;
};

export default {
  create,
  getAll,
  getById,
};
