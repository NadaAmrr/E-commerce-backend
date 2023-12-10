import { dbConnection } from "../DB/connection.js";
import categoryRouter from "./modules/category/category.router.js";
import subcategoryRouter from "./modules/subcategory/subcategory.router.js";
import couponRouter from "./modules/coupon/coupon.router.js";
import brandRouter from "./modules/brand/brand.router.js";
import { globalErrorHandling } from "./utils/errorHandling.js";

const bootstrap = (app, express) => {
  app.use(express.json({}));

  app.use("/category", categoryRouter);
  app.use("/subcategory", subcategoryRouter);
  app.use("/coupon", couponRouter);
  app.use("/brand", brandRouter);

  app.use("*", (req, res, next) => {
    return res.json({ message: "In-valid Routing" });
  });
  app.use(globalErrorHandling);

  dbConnection();
};

export default bootstrap;
