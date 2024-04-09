import {Router} from "express";

import productRoute from "./products";

const indexRoute = Router();

indexRoute.use("/product", productRoute);

export default indexRoute;
