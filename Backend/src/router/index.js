import auth_router from "./auth";
import staff_router from "./staff_router";
import admin_router from "./admin";
import product_router from "./product";
import product_detail_router from "./product_detail";
import category_router from "./category";
import discount_router from "./discount";
import product_batch_router from "./product_batch";
import order_router from "./order";
import discount_user_router from "./discount_user";
import supplier_router from "./supplier";
import brand_router from "./brand";
import review_router from "./review"
import address_router from "./address";


export default function router(app) {
  app.use("/api/v1/auth", auth_router);
  app.use("/api/v1/address", address_router);
  app.use("/api/v1/admin", admin_router);
  app.use("/api/v1/product", product_router);
  app.use("/api/v1/staff", staff_router);
  app.use("/api/v1/product_detail", product_detail_router);
  app.use("/api/v1/category", category_router)
  app.use('/api/v1/discount', discount_router)
  app.use("/api/v1/product-batch", product_batch_router)
  app.use("/api/v1/order", order_router)
  app.use("/api/v1/discount_user", discount_user_router)
  app.use("/api/v1/supplier", supplier_router)
  app.use("/api/v1/brand", brand_router)
  app.use("/api/v1/review", review_router)
}
