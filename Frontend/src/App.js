import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./customer/Components/Navbar/Navigation";
import CustomerRoutes from "./Routers/CustomerRoutes";
import AdminRoutes from "./Routers/AdminRoutes";
import NotFound from "./Pages/Notfound";
import AdminPannel from "./Admin/AdminPannel";
import { useState } from "react";
// import Routers from './Routers/Routers';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import api from "./config/api";
<<<<<<< HEAD
import i18next from "react-i18next";
function App() {
  // const [language, setLanguage] = useState("en");
  // const i18n = i18next.createInstance({
  //   resources: {
  //     en: {
  //       translations: require("./Lang/en.json"),
  //     },
  //     vi: {
  //       translations: require("./Lang/vi.json"),
  //     },
  //   },
  //   detection: {
  //     // detect language based on browser's preferred language
  //     useBrowserDetection: true,
  //   },
  // });
  // const isAdmin = true;
=======
>>>>>>> b4db6a99b114210f46e387aa54d64d4fdb042c33

import common_vi from "./Lang/vi.json";
import common_en from "./Lang/en.json"
function App(props) {
  const [common, setCommon] = useState(common_en);
 
  const isAdmin = true;
 
  const handleSuccess = async (response) => {
    // Xử lý thông tin người dùng sau khi đăng nhập thành công
<<<<<<< HEAD
    const data = await api.post("/api/v1/auth/login/google", {
      code: response.credential,
    });
    // alert(i18n.t(data.code));
    console.log(data);
=======
    const data = (await api.post("/api/v1/auth/login/google", {
      code: response.credential
    })).data
    alert(common[data.code])
>>>>>>> b4db6a99b114210f46e387aa54d64d4fdb042c33
  };

  const handleFailure = (error) => {
    // Xử lý khi đăng nhập thất bại
    console.error("Login failed:", error);
  };
  return (
<<<<<<< HEAD
    <GoogleOAuthProvider clientId="156409993558-716kd0g7s83nht2hekpd3vvkmqbne265.apps.googleusercontent.com">
      <div className="">
        <Routes>
          <Route path="/*" element={<CustomerRoutes />} />
          <Route path="/admin/*" element={<AdminPannel />} />
        </Routes>
        <GoogleLogin
          onSuccess={handleSuccess}
          onFailure={handleFailure}
          useOneTap={true}
        />
      </div>
=======
    <GoogleOAuthProvider clientId="156409993558-716kd0g7s83nht2hekpd3vvkmqbne265.apps.googleusercontent.com" >
        <div className="">
          <Routes>
            <Route path="/*" element={<CustomerRoutes />} />
            <Route path="/admin/*" element={<AdminPannel />} />
          </Routes>
          <GoogleLogin onSuccess={handleSuccess} onFailure={handleFailure} useOneTap={true} />
        </div>
     
>>>>>>> b4db6a99b114210f46e387aa54d64d4fdb042c33
    </GoogleOAuthProvider>
  );
}

export default App;
