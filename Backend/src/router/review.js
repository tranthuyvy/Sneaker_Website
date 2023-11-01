import { Router } from "express";
import review_controller from "controller/review_controller";
const review_router = Router();

review_router.post("/create", review_controller.createReview);
review_router.get("/get", review_controller.getAllReview);

export default review_router;