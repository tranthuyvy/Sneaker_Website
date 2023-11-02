import { Router } from "express";
import auth from '../middleware/authenJWT'
import address_controller from "controller/address_controller";
const address_router = Router();

address_router.get("/get",address_controller.get);
address_router.post('/create',address_controller.create);
address_router.get('/delete',address_controller.delete);
address_router.get('/set-default',address_controller.setDefault)
export default address_router;
