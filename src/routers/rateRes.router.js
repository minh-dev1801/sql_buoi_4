import express from 'express';
import { rateResController } from '../controllers/rateRes.controller';

const rateResRouter = express.Router();

// Tạo route CRUD
rateResRouter.post('/', rateResController.create);
rateResRouter.get('/', rateResController.findAll);
rateResRouter.get('/:id', rateResController.findOne);
rateResRouter.patch('/:id', rateResController.update);
rateResRouter.delete('/:id', rateResController.remove);

export default rateResRouter;