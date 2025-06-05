import express from "express";
import { rateController } from "../controllers/rate.controller";

const rateRouter = express.Router();

rateRouter.post("/", rateController.create);
rateRouter.get("/", rateController.findAll);

export default rateRouter;
