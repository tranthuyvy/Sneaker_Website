import auth_router from "./auth";
import staff_router from "./staff_router";
import admin_router from "./admin";
import product_router from "./product";
import product_detail_router from "./product_detail";
import category_router from "./category";

import discount_router from "./discount";


export default function router(app) {
  app.use("/api/v1/auth", auth_router);
  app.use("/api/v1/admin", admin_router);
  app.use("/api/v1/product", product_router);
  app.use("/api/v1/staff", staff_router);

  app.use("/api/v1/product_detail", product_detail_router);
<<<<<<< HEAD
  app.use("/api/v1/category",category_router)
=======

  app.use('/api/v1/discount', discount_router)
>>>>>>> 1cd2ce8f51ca5bbc0bca77be922432c267b843f1
}
