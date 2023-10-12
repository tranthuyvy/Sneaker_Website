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
import common_vi from "./Lang/vi.json";
import common_en from "./Lang/en.json";
// import i18next from "react-i18next";
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

  function App(props) {
    const [common, setCommon] = useState(common_en);

    const isAdmin = true;

    const handleSuccess = async (response) => {
      // Xử lý thông tin người dùng sau khi đăng nhập thành công

      const data = (
        await api.post("/api/v1/auth/login/google", {
          code: response.credential,
        })
      ).data;
      alert(common[data.code]);
    };

    const handleFailure = (error) => {
      // Xử lý khi đăng nhập thất bại
      console.error("Login failed:", error);
    };
    return (
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
      </GoogleOAuthProvider>
    );
  }
}
export default App;
