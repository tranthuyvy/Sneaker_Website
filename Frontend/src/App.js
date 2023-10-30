import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routers from "./Routers/Routers_Public";
import AdminPannel from "./Admin/AdminPannel";
import ModalLogin from "./Components/ModalLogin";
import Modal from "react-modal";

function App(props) {
  const lang = useSelector((state) => state.lang);
  const openModal = useSelector((state) => state.openModal);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "INIT_CART" });
    dispatch({ type: "INIT_AUTH" });
  }, []);

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
      >
        <ModalLogin></ModalLogin>
      </Modal>
      <Routes>
        <Route path="/*" element={<Routers />} />
        <Route path="/admin/*" element={<AdminPannel />} />
      </Routes>
    </div>
  );
}
export default App;
