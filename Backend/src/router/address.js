import { Router } from "express";

import address_controller from "controller/address_controller";
const address_router = Router();

address_router.get("/get", address_controller.get);

export default address_router;
