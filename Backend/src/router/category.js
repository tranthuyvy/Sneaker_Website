import { Router } from "express";
import category_controller from "controller/category_controller";
const category_router = Router();
category_router.post("/create", category_controller.createCategory);
category_router.put("/update", category_controller.updateCategory);
category_router.get("/get", category_controller.getAllCategory);
category_router.get("/get/:id", category_controller.getCategoryById);
category_router.put("/disable", category_controller.disableCategory);
export default category_router;
