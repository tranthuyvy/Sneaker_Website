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
        return i.name.localeCompare(item.name) == 0
          ? { ...i, isActive: true }
          : { ...i, isActive: false };
      })
    );
  }

  return (
    <Fragment className="max-h-12">
      <div className="px-10 flex flex-row pt-10">
        <div className="w-1/3 h-screen justify-center font-bold bg-white mr-10">
          <div className="border-b-4 w-full h-20 text-3xl text-center text-rose-600">
            Dashboard
          </div>
          <ul className="h-1/3">
            {listItem.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    handleLi(item);
                  }}
                  className={`${
                    item.isActive ? "text-rose-500" : "text-black"
                  } border-b-4 w-full h-1/3 hover:scale-y-110 cursor-pointer text-center text-2xl`}
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>
        {item?.component}
      </div>
    </Fragment>
  );
}

export default UserProfile;
