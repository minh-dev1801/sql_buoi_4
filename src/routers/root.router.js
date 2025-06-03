import express from "express";
import likeResRouter from "./likeRes.router";
import rateResRouter from "./rateRes.router";

const rootRouter = express.Router();

rootRouter.use("/like-res", likeResRouter);
rootRouter.use("/rate-res", rateResRouter);
rootRouter.use("/order", orderRouter);

export default rootRouter;
