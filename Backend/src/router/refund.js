import refund_controller from "controller/refund_controller";
import { Router } from "express";
const refund_router = Router();

refund_router.post("/create", refund_controller.createRefund);

export default refund_router;