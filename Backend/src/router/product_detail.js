import { Router } from "express";
import product_detail_controller from "controller/product_detail_controller";
const product_detail_router = Router();
product_detail_router.post('/create', product_detail_controller.create);
product_detail_router.get('/get',product_detail_controller.get)
export default product_detail_router;