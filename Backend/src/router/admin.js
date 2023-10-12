import { Router } from "express";

import admin_controller from "controller/admin_controller";
const admin_router = Router();
admin_router.post('/create-staff', admin_controller.createNewStaff);
admin_router.get('/test', admin_controller.hello2)
export default admin_router;