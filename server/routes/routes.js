import addressRouter from "./addressRouter.js";
import productRouter from "./productRouter.js";
import categoryouter from "./categoryRouter.js";
import colorRouter from "./colorRouter.js";
import userRouter from "./userRouter.js";
import cartRouter from "./cartRouter.js";
const routes = (app) => {
  app.use("/api/products", productRouter);
  app.use("/api/users", userRouter);
  app.use("/api/addresses", addressRouter);
  app.use("/api/categories", categoryouter);
  app.use("/api/colors", colorRouter);
  app.use("/api/carts", cartRouter);
};

export default routes;
