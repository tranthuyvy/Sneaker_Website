import { Router } from "express";
import order_controller from "controller/order_controller";
import auth from '../middleware/authenJWT'
const order_router = Router();
order_router.get("/get", order_controller.getAllOrder)
// auth.authenUser
order_router.post('/create',order_controller.create)
order_router.post('/checkInventory',order_controller.checkInventory)
export default order_router;