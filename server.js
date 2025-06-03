import express from "express";
import logApi from "./src/common/morgan/init.morgan";
import { handleError } from "./src/common/helpers/handle-err.helper";
import rootRouter from "./src/routers/root.router";

const app = express();

app.use(express.json());

app.use(logApi);

app.use(rootRouter);

app.use(handleError);

app.listen(3069, () => {
  console.log(`Server running on port http://localhost:3069`);
});
