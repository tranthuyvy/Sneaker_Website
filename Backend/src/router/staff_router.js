import { Router } from "express";
import StaffController from "controller/staff_controller";

const staff_router = Router();

const staffController = new StaffController();

staff_router.get("/", (req, res) =>
  staffController.getProfileByIdStaff(req, res)
);

staff_router.put("/", (req, res) => staffController.updateProfile(req, res));

export default staff_router;
