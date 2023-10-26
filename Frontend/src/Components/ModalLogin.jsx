import { Route, Routes } from "react-router-dom";

import { useState, useEffect } from "react";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import axios from "../config/axios";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ModalLogin(props) {
  const lang = useSelector((state) => state.lang);
  const [isLogin, setIsLogin] = useState();
  const isAdmin = true;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "INIT_CART" });
    setIsLogin(localStorage.hasOwnProperty("accessToken"));
  }, []);
  const handleSuccess = async (response) => {
    // Xử lý thông tin người dùng sau khi đăng nhập thành công
    const data = (
      await axios.post("/api/v1/auth/login/google", {
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
  const signIn = useGoogleOneTapLogin({
    onSuccess: handleSuccess,
    onFailure: handleFailure,
    disabled: false,
  });
  return (
    <div className="">
      <GoogleLogin
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        useOneTap
      ></GoogleLogin>
    </div>
  );
}
export default ModalLogin;
