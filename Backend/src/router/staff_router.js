import { Router } from "express";
import StaffController from "controller/staff_controller";

const staff_router = Router();
const staffController = new StaffController();

staff_router.get("/:id_account", (req, res) =>
  staffController.getProfileByIdStaff(req, res)
);

export default staff_router;
