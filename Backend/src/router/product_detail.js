import { Router } from "express";
import product_detail_controller from "controller/product_detail_controller";
const product_detail_router = Router();
product_detail_router.post('/create', product_detail_controller.create);

export default product_detail_router;