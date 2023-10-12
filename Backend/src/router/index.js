import auth_router from "./auth";
import staff_router from "./staff_router";

export default function router(app) {
  app.use("/api/v1/auth", auth_router);

  app.use("/api/v1/staff", staff_router);
}
