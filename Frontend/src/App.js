import { Route, Routes } from "react-router-dom";
import "./App.css";
import CustomerRoutes from "./Routers/CustomerRoutes";
import AdminPannel from "./Admin/AdminPannel";
import { useState, useEffect } from "react";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import api from "./config/api";
import common_vi from "./Lang/vi.json";
import common_en from "./Lang/en.json"
function App(props) {
  const [common, setCommon] = useState(common_en);
  const [isLogin, setIsLogin] = useState(localStorage.hasOwnProperty('jwt'))
  const isAdmin = true;
  console.log(isLogin)
  const handleSuccess = async (response) => {
    // Xử lý thông tin người dùng sau khi đăng nhập thành công
    const data = (await api.post("/api/v1/auth/login/google", {
      code: response.credential
    })).data
    if (data.code.localeCompare("000" == 0)) {
      localStorage.setItem('jwt', data.accessToken);
      localStorage.setItem('refresh_token', data.refreshToken);
      setIsLogin(true)
    }
    alert(common[data.code])
  };
  const handleFailure = (error) => {
    // Xử lý khi đăng nhập thất bại
    console.error("Login failed:", error);
  };

  return (
    <div className="">
      <div useOneTap={useGoogleOneTapLogin({
        onSuccess: handleSuccess,
        onFailure: handleFailure,
        disabled: isLogin
      })} />
      <Routes>
        <Route path="/*" element={<CustomerRoutes />} />
        <Route path="/admin/*" element={<AdminPannel />} />
      </Routes>
    </div>
  );
}

export default App;
