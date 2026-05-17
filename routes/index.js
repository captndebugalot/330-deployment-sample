import express from 'express';
import itemsRoutes from './items';

const router = express.Router();

router.use('/items', itemsRoutes);

router.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
        <h1> Hello, world! </h1>
        <p> Version: 0.0.1 </p>
      </body>
    </html>
  `);
});

export default router;
