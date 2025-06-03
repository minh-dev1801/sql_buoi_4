import express from 'express';
import { likeResController } from '../controllers/likeRes.controller';


const likeResRouter = express.Router();

// Tạo route CRUD
likeResRouter.post('/', likeResController.create);
likeResRouter.get('/', likeResController.findAll);
likeResRouter.get('/:id', likeResController.findOne);
likeResRouter.patch('/:id', likeResController.update);
likeResRouter.delete('/:id', likeResController.remove);

export default likeResRouter;