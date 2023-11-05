import { Router } from "express";
import auth_controller from "controller/auth_controller";
const auth_router = Router();
auth_router.post('/login', auth_controller.login);
auth_router.post('/login/google', auth_controller.login_google);
auth_router.post("/forgot-password", auth_controller.forgotPassword);
auth_router.put("/change-password-forgot", auth_controller.changePasswordForgot)
export default auth_router