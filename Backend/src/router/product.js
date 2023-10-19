import { Router } from "express";
import product_controller from "controller/product_controller";

const product_router = Router();

product_router.post('/create', product_controller.createProduct);
product_router.get('/get', product_controller.getAllProduct);
product_router.put("/update", product_controller.updateProduct);
product_router.put("/disable", product_controller.disableProduct)
export default product_router;