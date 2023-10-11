import auth_router from "./auth";

export default function router(app) {

   app.use('/api/v1/auth',auth_router);
   
 }
 