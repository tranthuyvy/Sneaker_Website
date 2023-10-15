// import { Navigation } from "mdi-material-ui";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../Pages/Homepage";

import SideBar from "../Admin/Views/sideBar";
import AdminPannel from "../Admin/AdminPannel";

const Routers = () => {
  return (
    <div>
       <div className="">
        <Routes>
        <Route path="/" element={<Homepage/>}></Route>
        <Route path="/home" element={<Homepage/>}></Route>
        {/* <Route path="/about" element={<About/>}></Route>
        <Route path="/privaciy-policy" element={<PrivacyPolicy/>}></Route>
        <Route path="/terms-condition" element={<TearmsCondition/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/men" element={<Product/>}></Route>
        <Route path="/product/:productId" element={<ProductDetails/>}></Route>
  <Route path="/cart" element={<Cart/>}></Route>*/}

        <Route path="/admin" element={<AdminPannel/>}></Route>
        <Route path="/demo" element={<SideBar/>}></Route>
      </Routes>
       </div>
      
    </div>
  );
};

export default Routers;
