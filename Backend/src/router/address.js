import { Router } from "express";
import auth from '../middleware/authenJWT'
import address_controller from "controller/address_controller";
const address_router = Router();

address_router.get("/get", address_controller.get);
address_router.post('/create',auth.authenUser,address_controller.create)
export default address_router;
