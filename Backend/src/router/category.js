import { Router } from "express";
import category_controller from "controller/category_controller";
const category_router = Router();
// category_router.post('/create', category_controller.createProduct);
category_router.get('/get', category_controller.get)
export default category_router;