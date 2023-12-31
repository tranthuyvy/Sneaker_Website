// import { Navigation } from "mdi-material-ui";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../Pages/Homepage";
import ProductDetails from "../Pages/ProductDetail";
import SideBar from "../Admin/Views/sideBar";
import AdminPannel from "../Admin/AdminPannel";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Cart from "../Pages/Cart";
import UserProfile from "../Pages/UserProfile";
import OrderSummary from "../Pages/Order";
import ModalLogin from "../Components/ModalLogin";
import "../App.css";

const Routers = () => {
  return (
    <div className="app">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/home" element={<Homepage />}></Route>
        <Route path="/product" element={<ProductDetails />}></Route>
        <Route path="/login" element={<ModalLogin />}></Route>
        {/* 
        <Route path="/privaciy-policy" element={<PrivacyPolicy/>}></Route>
        <Route path="/terms-condition" element={<TearmsCondition/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/men" element={<Product/>}></Route>*/}
        <Route path="/profile" element={<UserProfile />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/admin" element={<AdminPannel />}></Route>
        <Route path="/demo" element={<SideBar />}></Route>
        <Route path="/order" element={<OrderSummary />}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
};

export default Routers;
