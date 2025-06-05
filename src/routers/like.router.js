import express from "express";
import { likeController } from "../controllers/like.controller";

const likeRouter = express.Router();

likeRouter.post("/", likeController.create);
likeRouter.get("/", likeController.findAll);

export default likeRouter;
