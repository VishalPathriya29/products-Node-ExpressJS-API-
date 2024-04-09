import {Router} from "express";

import * as productControllr from "./productController";

import * as validation from '../../middleware/validation';

const productRoute = Router();

productRoute.post("/addProduct", validation.addProductValidation, productControllr.addProduct);
productRoute.get("/getProducts", productControllr.getAllProducts);
productRoute.get("/getProduct", productControllr.getProduct);
productRoute.patch("/updateProduct", validation.updateProductValidation, productControllr.updateProduct);
productRoute.get("/searchProducts", productControllr.searchProduct);

export default productRoute;
