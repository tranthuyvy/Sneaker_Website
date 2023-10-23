import { Router } from "express";
import brand_controller from "controller/brand_controller";
const brand_router = Router();

brand_router.post("/create", brand_controller.createBrand);
brand_router.put("/update", brand_controller.updateBrand);
brand_router.put("/disable", brand_controller.disableBrand);
brand_router.get("/get", brand_controller.getAllBrand);
brand_router.get("/get/:id", brand_controller.getBrandById);
export default brand_router;
