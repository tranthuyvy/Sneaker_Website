import { Router } from "express";
import order_controller from "controller/order_controller";
import auth from "../middleware/authenJWT";
const order_router = Router();
order_router.get("/get", order_controller.getAllOrder);
order_router.get("/get/:id", order_controller.getOrderById);
order_router.put("/get/:id/confirm", order_controller.confirmOrder);
order_router.put("/get/:id/shipped", order_controller.shippedOrder);
order_router.put("/get/:id/delivery", order_controller.deliveryOrder);
order_router.put("/get/:id/success", order_controller.successOrder);
order_router.put("/get/:id/delete", order_controller.deleteOrder);
// auth.authenUser
order_router.post("/create", auth.authenUser, order_controller.create);
order_router.post("/checkInventory", order_controller.checkInventory);
export default order_router;
