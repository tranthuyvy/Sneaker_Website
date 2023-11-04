import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import axios from "../config/axios";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/Modal.css";
function ModalLogin(props) {
  const lang = useSelector((state) => state.lang);
  const openModal = useSelector((state) => state.openModal);
  const isLogin = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => { }, []);
  const handleSuccess = async (response) => {
    const user = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.access_token}`
    );

    const data = (await axios.post("/api/v1/auth/login/google", user.data))
      .data;
    if (data.code.localeCompare("000" == 0)) {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      dispatch({ type: "LOGIN" });
      dispatch({ type: "CLOSE_MODAL" });
    }
    toast(lang[data.code]);
  };

  const handleFailure = (error) => {
    // Xử lý khi đăng nhập thất bại
    console.error("Login failed:", error);
  };
  const signIn = useGoogleLogin({
    onSuccess: handleSuccess,
    onFailure: handleFailure,
  });

  return (
    <div
      className="w-full h-full"
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1 className="login-text">LOGIN</h1>
      <button
        className="button-login"
        onClick={() => {
          signIn();
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
          width="25"
          height="25"
          alt="Google Logo"
          style={{ marginRight: "5px" }}
        />
        Login with Google
      </button>
      <button
        className="button-login"
        onClick={() => {
          toast(lang["021"]);
        }}
      >
        <img
          src="https://img.icons8.com/color/48/facebook-new.png"
          width="30"
          height="30"
          alt="Facebook Logo"
          style={{ marginRight: "5px" }}
        />
        Login with FaceBook
      </button>
    </div>
  );
}
export default ModalLogin;
