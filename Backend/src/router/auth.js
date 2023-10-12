import { Router } from "express";
import auth_controller from "controller/auth_controller";
const auth_router = Router();
auth_router.post('/login',auth_controller.login);
auth_router.post('/login/google',auth_controller.login_google);
export default auth_router