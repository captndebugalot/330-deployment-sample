import express from 'express';
import itemDAO from '../daos/item';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name } = req.body;
  const item = await itemDAO.create(name);

  res.json(item);
});

router.get('/', async (req, res) => {
  const items = await itemDAO.getAll();

  if (items) {
    res.json(items);
  } else {
    res.sendStatus(404);
  }
});

router.get('/:id', async (req, res) => {
  const itemId = req.params.id;
  const item = await itemDAO.getById(itemId);

  if (item) {
    res.json(item);
  } else {
    res.sendStatus(404);
  }
});

export default router;
