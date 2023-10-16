import { Router } from "express";
import order_controller from "controller/order_controller";
const order_router = Router();

order_router.get("/test", order_controller.hello);
order_router.get("/get", order_controller.getAllOrder)
export default order_router;