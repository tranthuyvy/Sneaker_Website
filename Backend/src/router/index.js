import auth_router from "./auth";
import staff_router from "./staff_router";
import admin_router from "./admin";
import product_router from "./product";

export default function router(app) {
  app.use('/api/v1/auth', auth_router);
  app.use('/api/v1/admin', admin_router)
  app.use('/api/v1/product', product_router)
  app.use("/api/v1/staff", staff_router);
}
