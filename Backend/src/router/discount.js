import { Router } from "express";
import discount_controller from "controller/discount_controller";
const discount_router = Router();

discount_router.get("/hello", discount_controller.hello);
//api tạo khuyến mãi
discount_router.post("/create", discount_controller.createDiscount);
//api lấy khuyến mãi
discount_router.get("/get", discount_controller.getAllDiscount);
//api vô hiệu hóa khuyến mãi
discount_router.put("/disable", discount_controller.disableDiscount);
export default discount_router;