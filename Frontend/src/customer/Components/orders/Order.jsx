import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderHistory,
  getFilteredOrders,
} from "../../../Redux/Customers/Order/Action";
import "./Order.css";

const orderStatus = [
  { label: "ALL", value: "" },
  { label: "PLACED", value: "placed" },
  { label: "CONFIRMED", value: "confirmed" },
  { label: "SHIPPED", value: "shipped" },
  { label: "DELIVERED", value: "delivered" },
  { label: "SUCCESS", value: "success" },
  { label: "CANCELLED", value: "cancelled" },
  { label: "RETURNED", value: "returned" },
];

const Order = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { order } = useSelector((store) => store);
  const [activeFilter, setActiveFilter] = useState(null);
  const handleFilterChange = (value) => {
    setActiveFilter(value);
  };

  useEffect(() => {
    if (activeFilter) {
      dispatch(getFilteredOrders({ status: activeFilter }));
    } else {
      dispatch(getOrderHistory({ jwt }));
    }
  }, [activeFilter, jwt, dispatch]);

  return (
    <Box className="px-10">
      <Grid container spacing={0} sx={{ justifyContent: "space-between" }}>
        <Grid item xs={2.5} className="">
          <div className="h-auto shadow-lg bg-white border p-5 sticky top-5">
            <h1 className="font-bold text-lg">Filters</h1>
            <div className="space-y-4 mt-10">
              <h1 className="font-semibold">ORDER STATUS</h1>

              <div className="filter-bar">
                {orderStatus.map((option) => (
                  <div
                    key={option.value}
                    className={`filter-option ${
                      option.value === activeFilter ? "active" : ""
                    }`}
                    onClick={() => handleFilterChange(option.value)}
                  >
                    {option.value === activeFilter && (
                      <div className="selected-rectangle"></div>
                    )}
                    {option.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Grid>
        {/* <Grid item xs={9}>
          <Box className="space-y-5">
            {order.orders?.length > 0 &&
              order.orders?.map((order) => {
                return order?.orderItems?.map((item, index) => (
                  <OrderCard item={item} order={order} />
                ));
              })}
          </Box>
        </Grid> */}

        <Grid item xs={9}>
          <Box className="space-y-5">
            {order.orders?.length > 0 &&
              order.orders?.map((order) => {
                const displayedOrderIds = [];

                return order?.orderItems?.map((item, index) => {
                  if (!displayedOrderIds.includes(order.id)) {
                    displayedOrderIds.push(order.id);
                    return (
                      <OrderCard item={item} order={order} key={order.id} />
                    );
                  }

                  return null;
                });
              })}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Order;
