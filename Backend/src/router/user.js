import { Router } from "express";
import user_controller from "controller/user_controller";

const user_router = Router();
user_router.get("/", user_controller.get);

export default user_router;
