import express from 'express';
import itemsRoutes from './items';

const router = express.Router();

router.use('/items', itemsRoutes);

// because we are serving up server.use(express.static('deployment-sample-frontend/dist'));
// it not hitting this route below. It is serving static first
// router.get('/', (req, res) => {
//   res.send(`
//     <html>
//       <body>
//         <h1> Hello, world! </h1>
//         <p> Version: 0.0.1 </p>
//       </body>
//     </html>
//   `);
// });

export default router;
