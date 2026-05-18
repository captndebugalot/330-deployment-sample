import request from 'supertest';
import server from '../server';
import testUtils from '../test-utils';
import Item from '../models/item';

describe('/items', () => {
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.stopDB);

  afterEach(testUtils.clearDB);

  const item0 = { name: 'Item Zero' };
  const item1 = { name: 'Item One' };

  describe('GET /', () => {
    beforeAll(async () => {
      await Item.insertMany([item0, item1]);
    });

    it('should return all stored items', async () => {
      const res = await request(server).get('/items').send();

      expect(res.statusCode).toEqual(200);
      expect(res.body).toMatchObject([item0, item1]);
      expect(false).toBe(true)
    });
  });

  describe('GET /:id', () => {
    let savedItems;

    beforeEach(async () => {
      savedItems = await Item.insertMany([item0, item1]);
    });

    it('should return item0', async () => {
      const res = await request(server)
        .get(`/items/${savedItems[0].id}`)
        .send();

      expect(res.statusCode).toEqual(200);
      const { _id: itemId, ...expected } = savedItems[0].toJSON();

      expect(res.body).toMatchObject({ ...expected, _id: String(itemId) });
    });

    it('should return item1', async () => {
      const res = await request(server)
        .get(`/items/${savedItems[1].id}`)
        .send();

      expect(res.statusCode).toEqual(200);
      const { _id: itemId, ...expected } = savedItems[1].toJSON();

      expect(res.body).toMatchObject({ ...expected, _id: String(itemId) });
    });

    it('should return 404 if no match', async () => {
      await Item.deleteOne({ _id: savedItems[1].id });
      const res = await request(server)
        .get(`/items/${savedItems[1].id}`)
        .send();

      expect(res.statusCode).toEqual(404);
    });
  });

  describe('POST /', () => {
    it('should create item0', async () => {
      const res = await request(server).post('/items').send(item0);

      expect(res.statusCode).toEqual(200);
      const storedItem = await Item.findOne().lean();
      expect(storedItem).toMatchObject(item0);
    });

    it('should create item1', async () => {
      const res = await request(server).post('/items').send(item1);

      expect(res.statusCode).toEqual(200);
      const storedItem = await Item.findOne().lean();
      expect(storedItem).toMatchObject(item1);
    });
  });
});
