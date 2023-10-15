import { Router } from "express";
import product_batch_controller from "controller/product_batch_controller";
const product_batch_router = Router();

product_batch_router.get("/test", product_batch_controller.hello);
product_batch_router.post("/create", product_batch_controller.enterBatchProduct)
export default product_batch_router;
