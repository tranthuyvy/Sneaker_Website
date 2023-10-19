import { Router } from "express";
const supplier_router = Router();
import supplier_controller from "controller/supplier_controller";

supplier_router.get("/get", supplier_controller.getAllSupllier);
supplier_router.get("/get/:id", supplier_controller.getSupplierById);
supplier_router.post("/create", supplier_controller.createSupplier);
supplier_router.put("/update", supplier_controller.updateSupplier);
supplier_router.put("/disable", supplier_controller.disableSupplier);

export default supplier_router;
