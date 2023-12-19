import { connection } from "./src/db/connection.js";
import userRouter from "./src/modules/user/router/user.router.js";
import postRouter from "./src/modules/post/router/post.router.js";

const initiateApp = (app, express) => {
  connection();
  app.use(express.json());
  app.use("/user", userRouter);
  app.use("/post", postRouter);
};

export default initiateApp;
