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
    { name: "Address", isActive: false, component: <AddressUser/> },
    { name: "Order", isActive: false, component: <OrderUser/> },
  ]);
  const [item, setItem] = useState(listItem[0]);
  useEffect(()=>{
 
  },[])
  function handleLi(item){
    setItem(item)
    setListItem(listItem.map(i=>{
      return i.name.localeCompare(item.name)==0 ? {...i,isActive:true} : {...i,isActive:false}
    }))
  }
  return (

    <Fragment className="max-h-52">
      <div className="px-10 flex flex-row pt-10">
        <div className="w-1/3 h-44 justify-center font-bold">
          <div className="border-b-4 w-full h-1/3 text-2xl">Dashboard</div>
          <ul className="h-2/3">
            {listItem.map((item) => {
              return <li onClick={()=>{handleLi(item)}} className={`${item.isActive ? 'text-rose-600': 'text-black'} border-b-4 w-full h-1/3 `}>{item.name}</li>;
            })}
          </ul>
        </div>
        {item?.component}
      </div>
    </Fragment>
  );
}

export default UserProfile;
