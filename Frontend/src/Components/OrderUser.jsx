import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import axiosApiInstance from "../config/api";
import OrderItem from "./OrderItem";
function OrderUser() {
  const [listOrder, setListOrder] = useState([]);
  const lang = useSelector((state) => state.lang);
  const [status, setStatus] = useState(1);
  const [listLi, setListLi] = useState([
    { isActive: true, name: "Placed" },
    { isActive: false, name: "Confirmed" },
    { isActive: false, name: "Delivering" },
    { isActive: false, name: "Success" },
    { isActive: false, name: "Failed" },
    { isActive: false, name: "Cancelled" },
    { isActive: false, name: "Return" },
    { isActive: false, name: "Wait for pay" }
  ]);
  useEffect(() => {
    getData()
      .then()
      .catch((err) => {
        toast(lang["006"]);
      });
  }, [status]);
  const styleLi = "text-center pt-5 cursor-pointer h-8";
  return (
    <div className=" w-4/5 bg-white h-screen grid grid-rows-6 mr-4 ">
      <ul className="row-span-1 w-full h-[7rem] grid grid-cols-8 border-b-4 text-xl font-semibold">
        {listLi?.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              setStatus(index + 1);
              setListLi([
                ...listLi.map((i, ind) => {
                  return { ...i, isActive: ind === index };
                }),
              ]);
            }}
            className={styleLi}
            style={{ color: item.isActive ? "#9155FD" : "black" }}
          >
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
      <div className="w-full row-span-5  overflow-auto">
        {listOrder.length > 0
          ? listOrder.map((item) => {
              return <OrderItem order={item}></OrderItem>;
            })
          : null}
      </div>
    </div>
  );
  async function getData() {
    const data = (
      await axiosApiInstance.get(`/api/v1/order/get/user?status=${status}`)
    ).data;
    setListOrder([...data.data]);
    console.log(listOrder);
  }
}
export default OrderUser;
