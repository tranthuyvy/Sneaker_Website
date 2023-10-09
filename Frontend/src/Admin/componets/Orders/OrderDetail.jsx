import { Box, Button, Grid, Snackbar, Typography } from "@mui/material";
import React from "react";
import OrderTraker from "../../../customer/Components/orders/OrderTraker";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate, useParams } from "react-router-dom";
import AddressCard from "../../../customer/Components/adreess/AdreessCard";
import { deepPurple } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrderById } from "../../../Redux/Customers/Order/Action";
import {
  confirmOrder,
  deleteOrder,
  deliveredOrder,
  shipOrder,
} from "../../../Redux/Admin/Orders/Action";
import { useState } from "react";
import MuiAlert from "@mui/material/Alert";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [orderStatus, setOrderStatus] = useState("");
  const { orderId } = useParams();
  const { order } = useSelector((store) => store);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  console.log("order", order.order);

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, []);
  // console.log("order", order)

  const openSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const navigate = useNavigate();

  const handleConfirmedOrder = (orderId, index) => {
    dispatch(confirmOrder(orderId));
    setOrderStatus("CONFIRMED");
    openSnackbar("Update Success");
    window.location.reload();
  };

  const handleShippedOrder = (orderId, index) => {
    dispatch(shipOrder(orderId));
    setOrderStatus("SHIPPED");
    openSnackbar("Update Success");
    window.location.reload();
  };

  const handleDeliveredOrder = (orderId, index) => {
    dispatch(deliveredOrder(orderId));
    setOrderStatus("DELIVERED");
    openSnackbar("Update Success");
    window.location.reload();
  };

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId));
    openSnackbar("Update Success");
    window.location.reload();
  };
  

  return (
    <div className=" px-2 lg:px-36 space-y-7 ">
      <Box className="p-5 shadow-lg rounded-md">
        <Grid
          container
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Grid item xs={12}>
            <OrderTraker
              activeStep={
                order.order?.orderStatus === "PLACED"
                  ? 1
                  : order.order?.orderStatus === "CONFIRMED"
                  ? 2
                  : order.order?.orderStatus === "SHIPPED"
                  ? 3
                  : 5
              }
            />
          </Grid>
        </Grid>
      </Box>

      <Grid container className="p-5 shadow-lg">
        <Grid xs={12} style={{ marginLeft: "10px", fontSize:"20px" }}>
          <p className="font-bold py-2">Delivery Address</p>
        </Grid>
        <Grid item xs={6} style={{ marginLeft: "10px", fontSize:"18px" }}>
          <AddressCard address={order.order?.shippingAddress} />
        </Grid>
      </Grid>

      <Grid container className="space-y-5">
        {order.order?.orderItems.map((item) => (
          <Grid
            container
            item
            className="shadow-xl rounded-md p-5"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Grid item xs={6}>
              {" "}
              <div className="flex items-center ">
                <img
                  className="w-[10rem] h-[10rem] object-cover object-top"
                  src={item?.product.imageUrl}
                  alt=""
                />
                <div className="ml-5 space-y-2 font-semibold">
                  <p className="">{item.product.title}</p>
                  <p className="opacity-50 text-xs font-semibold space-x-2">
                    <span>{item.product.brand},</span>
                    <span>{item?.product.color},</span>
                    <span>{item.size}</span>
                  </p>
                  <p> x{item.quantity}</p>

                  {item.product?.discountedPrice !== item.product?.price &&
                    item.product?.price !== 0 && (
                      <p
                        className=""
                        style={{
                          color: "gray",
                          textDecoration: "line-through",
                          opacity: "60%",
                        }}
                      >
                        {" "}
                        ${item?.product.price}
                      </p>
                    )}

                  <p className="text-red-600">
                    ${item?.product.discountedPrice}{" "}
                  </p>
                </div>
              </div>
            </Grid>
          </Grid>
        ))}
      </Grid>

      <div>
        <Grid container justifyContent="flex-end" className="font-semibold">
          <Grid container style={{fontSize:"18px"}}>
            <Grid
              item
              xs={8}
              style={{
                borderRadius: "1px",
                display: "flex",
                justifyContent: "flex-end",
                padding: "10px",
              }}
            >
              <div>
                <span className="opacity-50">Total</span>
              </div>
            </Grid>
            <Grid
              item
              xs={4}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "10px",
              }}
            >
              <div>
                <span>${order.order?.totalPrice}</span>
              </div>
            </Grid>

            <Grid
              item
              xs={8}
              style={{
                borderRadius: "1px",
                display: "flex",
                justifyContent: "flex-end",
                padding: "10px",
              }}
            >
              <div>
                <span className="opacity-50">Delivery Charges</span>
              </div>
            </Grid>
            <Grid
              item
              xs={4}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "10px",
              }}
            >
              <div>
                <span style={{color:"cyan"}}>Free</span>
              </div>
            </Grid>

            <Grid
              item
              xs={8}
              style={{
                borderRadius: "1px",
                display: "flex",
                justifyContent: "flex-end",
                padding: "10px",
              }}
            >
              <div>
                <span className="opacity-50">Voucher</span>
              </div>
            </Grid>
            <Grid
              item
              xs={4}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "10px",
              }}
            >
              <div>
                <span>- 0$</span>
              </div>
            </Grid>

            <Grid
              item
              xs={8}
              style={{
                borderRadius: "1px",
                display: "flex",
                justifyContent: "flex-end",
                padding: "10px",
              }}
            >
              <div>
                <span className="opacity-50">Discount</span>
              </div>
            </Grid>
            <Grid
              item
              xs={4}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "10px",
              }}
            >
              <div>
                <span>- ${order.order?.discounte}</span>
              </div>
            </Grid>

            <Grid
              item
              xs={8}
              style={{
                borderRadius: "1px",
                display: "flex",
                justifyContent: "flex-end",
                padding: "10px",
              }}
            >
              <div>
                <span className="opacity-50">Payment</span>
              </div>
            </Grid>
            <Grid
              item
              xs={4}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "10px",
              }}
            >
              <div>
                <span className="font-semibold text-md" style={{color:"cyan"}}>
                  {order.order?.paymentStatus === 0
                    ? "Cash On Delivery"
                    : order.order?.paymentStatus === 1
                    ? "Payment via Paypal"
                    : "Unknown Payment Method"}
                </span>
              </div>
            </Grid>

            <Grid
              item
              xs={8}
              style={{
                marginTop: "30px",
                borderTop: "1px solid #f2f2f2",
                borderRadius: "1px",
                display: "flex",
                justifyContent: "flex-end",
                padding: "10px",
              }}
            >
              <div>
                <span className="opacity-50">
                  Total Payment ({order.order?.totalItem})
                </span>
              </div>
            </Grid>
            <Grid
              item
              xs={4}
              style={{
                marginTop: "30px",
                borderTop: "1px solid #f2f2f2",
                display: "flex",
                justifyContent: "flex-end",
                padding: "10px",
              }}
            >
              <div>
                <span className="text-red-600 font-semibold text-2xl">
                  ${order.order?.totalDiscountedPrice}
                </span>
              </div>
            </Grid>
            {order.order?.orderStatus === "PLACED" && (
              <Grid container justifyContent="flex-end" className="mt-5">
                <Grid item>
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => handleConfirmedOrder(order.order?.id)}
                    style={{color:"white", fontWeight:"bold", fontSize:"18px"}}
                  >
                    CONFIRM ORDER
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteOrder(order.order?.id)}
                    style={{color:"white", fontWeight:"bold", fontSize:"18px", marginLeft:"30px"}}
                  >
                    CANCELLED ORDER
                  </Button>
                </Grid>
              </Grid>
            )}

            {order.order?.orderStatus === "CONFIRMED" && (
              <Grid container justifyContent="flex-end" className="mt-5">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleShippedOrder(order.order?.id)}
                    style={{color:"white", fontWeight:"bold", fontSize:"18px"}}
                  >
                    SHIPPED
                  </Button>
                </Grid>
              </Grid>
            )}

            {order.order?.orderStatus === "SHIPPED" && (
              <Grid container justifyContent="flex-end" className="mt-5">
                <Grid item>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleDeliveredOrder(order.order?.id)}
                    style={{color:"white", fontWeight:"bold", fontSize:"18px"}}
                  >
                    DELIVERED
                  </Button>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={900}
        onClose={() => setSnackbarOpen(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          severity="success"
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default OrderDetails;
