import { Router } from "express";

import admin_controller from "controller/admin_controller";
const admin_router = Router();
admin_router.post("/create-staff", admin_controller.createNewStaff);
admin_router.get("/get", admin_controller.getAllUser);
admin_router.put("/change-status", admin_controller.changeStatus);
export default admin_router;
