import express from "express";
import orderRouter from "./order.router";
import likeRouter from "./like.router";
import rateRouter from "./rate.router";

const rootRouter = express.Router();

rootRouter.use("/like", likeRouter);
rootRouter.use("/rate", rateRouter);
rootRouter.use("/order", orderRouter);

export default rootRouter;
