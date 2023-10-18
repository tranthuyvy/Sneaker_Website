import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import api from "./config/api";
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routers from "./Routers/Routers_Public";
import Footer from "./Components/Footer";
import AdminPannel from "./Admin/AdminPannel";

function App(props) {
  const lang = useSelector((state) => state.lang)
  const [isLogin, setIsLogin] = useState(localStorage.hasOwnProperty("accessToken"));
  const isAdmin = true;
  console.log(isLogin);
  const handleSuccess = async (response) => {
    // Xử lý thông tin người dùng sau khi đăng nhập thành công
    const data = (
      await api.post("/api/v1/auth/login/google", {
        code: response.credential,
      })
    ).data;
    if (data.code.localeCompare("000" == 0)) {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      setIsLogin(true);
    }
    toast(lang[data.code]);
  };
  const handleFailure = (error) => {
    // Xử lý khi đăng nhập thất bại
    console.error("Login failed:", error);
  };
  return (
    <div className="">
      <ToastContainer/>
      
      <div></div>
      <div
        useOneTap={useGoogleOneTapLogin({
          onSuccess: handleSuccess,
          onFailure: handleFailure,
          disabled: isLogin,
        })}
      />
      <Routes>
        <Route path="/*" element={<Routers />} />
        <Route path="/admin/*" element={<AdminPannel />} />
      </Routes>
      <footer>
        {window.location.pathname.indexOf("/admin") === -1 && <Footer />}
      </footer>
    </div>
  );
}
export default App;
