import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import { useGoogleOneTapLogin } from "@react-oauth/google";

import api from "./config/api";
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routers from "./Routers/Routers_Public";
import AdminPannel from "./Admin/AdminPannel";
import ModalLogin from "./Components/ModalLogin";
import Modal from 'react-modal'
function App(props) {
  const lang = useSelector((state) => state.lang)
  const openModal = useSelector(state => state.openModal)
  
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({ type: "INIT_CART" })
    
  }, [])
  // const handleSuccess = async (response) => {
  //   // Xử lý thông tin người dùng sau khi đăng nhập thành công
  //   const data = (
  //     await api.post("/api/v1/auth/login/google", {
  //       code: response.credential,
  //     })
  //   ).data;
  //   if (data.code.localeCompare("000" == 0)) {
  //     localStorage.setItem("accessToken", data.accessToken);
  //     localStorage.setItem("refreshToken", data.refreshToken);
  //     setIsLogin(true);
  //   }
  //   toast(lang[data.code]);
  // };

  // const handleFailure = (error) => {
  //   // Xử lý khi đăng nhập thất bại
  //   console.error("Login failed:", error);
  // };
  // const signIn = useGoogleOneTapLogin({
  //   onSuccess: handleSuccess,
  //   onFailure: handleFailure,
  //   disabled: false,
  // })
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "50%",
      width: "40%",
      padding: 0,
    },
  };
  return (
    <div className="">
      <ToastContainer />
      <Modal
        isOpen={openModal}
        style={customStyles}
        contentLabel="Example Modal"
      ><ModalLogin></ModalLogin></Modal>
      <Routes>
        <Route path="/*" element={<Routers />} />
        <Route path="/admin/*" element={<AdminPannel />} />
      </Routes>
    </div >
  );
}
export default App;
