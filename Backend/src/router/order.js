import { Router } from "express";
import order_controller from "controller/order_controller";
import auth from "../middleware/authenJWT";
const order_router = Router();
order_router.get("/get", order_controller.getAllOrder);
order_router.get("/get/user", auth.authenUser, order_controller.getByUser);
order_router.get("/get/:id", order_controller.getOrderById);
order_router.put("/get/:id/update-status/:status", (req, res) => {
  const { id, status } = req.params;
  order_controller.updateOrderStatus(req, res, parseInt(status));
});
// auth.authenUser
order_router.post("/create", auth.authenUser, order_controller.create);
order_router.post("/checkInventory", order_controller.checkInventory);

export default order_router;
