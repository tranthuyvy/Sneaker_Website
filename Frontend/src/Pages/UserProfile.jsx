import React, { useEffect, useState } from "react";
import { InputAdornment, Typography } from "@mui/material";
import { Grid, TextField, Button, Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { Fragment } from "react";
import axiosApiInstance from "../config/api";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import OrderUser from "../Components/OrderUser";
import AddressUser from "../Components/AddressUser";
import "../Styles/UserDetail.css";
import InforUser from "../Components/InforUser";

function UserProfile() {
  const [listItem, setListItem] = useState([
    { name: "Info", isActive: true, component: <InforUser></InforUser> },
    { name: "Address", isActive: false, component: <AddressUser /> },
    { name: "Order", isActive: false, component: <OrderUser /> },
  ]);
  
  const [item, setItem] = useState(listItem[0]);
  useEffect(() => {}, []);
  function handleLi(item) {
    setItem(item);
    setListItem(
      listItem.map((i) => {
        return i.name.localeCompare(item.name) === 0
          ? { ...i, isActive: true }
          : { ...i, isActive: false };
      })
    );
  }

  return (
    <Fragment className="max-h-12">
      <div className="flex flex-row">
        <div className="w-1/5 pt-5 h-screen bg-white mr-10 p-6 rounded-md shadow-md">
          <div className="border-b-4 h-16 text-2xl text-center text-rose-600 font-bold">
            Dashboard
          </div>
          <ul className="h-1/3">
            {listItem.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  handleLi(item);
                }}
                className={`${
                  item.isActive ? "text-purple-500" : "text-black"
                } font-semibold border-b-4 hover:scale-y-110 cursor-pointer text-center text-2xl p-4 transition-transform`}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        {item?.component}
      </div>
    </Fragment>
  );
}

export default UserProfile;
