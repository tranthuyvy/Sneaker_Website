import { Router } from "express";
import auth from '../middleware/authenJWT'
import statistic_controller from "controller/statistic_controller";
const statistic_router = Router();
statistic_router.get("/order",statistic_controller.order);
statistic_router.get("/batch",statistic_controller.product_batch);
export default statistic_router;
