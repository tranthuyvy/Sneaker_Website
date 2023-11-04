import {
    Box, Button,
  } from "@mui/material";
  
import React, { useEffect, useState } from "react";
  
import { useNavigate, useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import axios from "../../../config/axios";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import errorMessagesEn from "../../../Lang/en.json";
import errorMessagesVi from "../../../Lang/vi.json";
import { toast, ToastContainer } from "react-toastify";
  
  const OrderDetail = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const { id } = useParams();
    const lang = useSelector((state) => state);
    const errorMessages = lang === "vi" ? errorMessagesVi : errorMessagesEn;
  
    useEffect(() => {
        const fetchOrderData = async () => {
          try {
            const response = await axios.get(`/api/v1/order/get/${id}`);
            const orderData = response.data.data;
    
            setOrders(orderData)
          } catch (error) {
            toast.error(errorMessages["006"], {
              autoClose: 1000,
            });
          }
        };
    
        fetchOrderData();
      }, [id]);
  
    // const handleConfirmedOrder = (orderId, index) => {
  
    //   dispatch(confirmOrder(orderId));
    //   setOrderStatus("CONFIRMED");
    // };
  
    // const handleShippedOrder = (orderId, index) => {
  
    //   dispatch(shipOrder(orderId));
    //   setOrderStatus("SHIPPED");
    // };
  
    // const handleDeliveredOrder = (orderId, index) => {
  
    //   dispatch(deliveredOrder(orderId));
    //   setOrderStatus("DELIVERED");
    // };
  
    // const handleDeleteOrder = (orderId) => {
  
    //   dispatch(deleteOrder(orderId));
    // };
  
    const statusLabels = {
      1: "PLACED",
      2: "CONFIRMED",
      3: "SHIPPED",
      4: "DELIVERED",
      5: "SUCCESS",
      6: "CANCELLED",
    };
  
    return (
        <div className=" px-2 lg:px-36 space-y-7 ">
        <Box className="p-5 shadow-lg border rounded-md">
          <Grid
            container
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Grid item xs={12}>
              {/* <OrderTraker
                activeStep={
                  order.order?.orderStatus === "PLACED"
                    ? 1
                    : order.order?.orderStatus === "CONFIRMED"
                    ? 2
                    : order.order?.orderStatus === "SHIPPED"
                    ? 3
                    : 5
                }
              /> */}
            </Grid>
            {/* <Grid item justifyContent="center">
              {orders.status === "DELIVERED" && (
                <Button sx={{ color: "" }} color="error" variant="text"></Button>
              )}
  
              {orders.status !== "DELIVERED" && (
                <Button sx={{ color: deepPurple[500] }} variant="text"></Button>
              )}
            </Grid> */}
          </Grid>
        </Box>
  
        <Grid container className="p-5 shadow-lg">
          <Grid xs={12} style={{marginLeft: "10px"}}>
            <p className="font-bold text-lg py-2">Delivery Address</p>
          </Grid>
          <Grid item xs={6} style={{marginLeft: "10px"}}>
            {/* <AddressCard address={order.order?.shippingAddress} /> */}
          </Grid>
        </Grid>
  
        <Grid container className="space-y-5">
          {/* {orders.orderItems.map((item) => (
            <Grid
              container
              item
              className="shadow-xl rounded-md p-5 border"
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
              <Grid item>
                {order.order?.orderStatus === "SUCCESS" && (
                  <Box
                    sx={{ color: deepPurple[500] }}
                    onClick={() => navigate(`/account/rate/${item.product.id}`)}
                    className="flex items-center cursor-pointer"
                  >
                    <StarIcon
                      sx={{ fontSize: "2rem" }}
                      className="px-2 text-5xl"
                    />
                    <span>Rate & Review Product</span>
                  </Box>
                )}
              </Grid>
            </Grid>
          ))} */}
        </Grid>
  
        <div>
          <Grid container justifyContent="flex-end" className="font-semibold">
            <Grid container>
              <Grid
                item
                xs={8}
                style={{
                  border: "1px solid #f2f2f2",
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
                  border: "1px solid #f2f2f2",
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "10px",
                }}
              >
                <div>
                  <span>${orders.total_price}</span>
                </div>
              </Grid>
  
              <Grid
                item
                xs={8}
                style={{
                  border: "1px solid #f2f2f2",
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
                  border: "1px solid #f2f2f2",
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "10px",
                }}
              >
                <div>
                  <span className="text-indigo-600">Free</span>
                </div>
              </Grid>
  
              <Grid
                item
                xs={8}
                style={{
                  border: "1px solid #f2f2f2",
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
                  border: "1px solid #f2f2f2",
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
                  border: "1px solid #f2f2f2",
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
                  border: "1px solid #f2f2f2",
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "10px",
                }}
              >
                <div>
                  <span>- ${orders.total_discounted_price}</span>
                </div>
              </Grid>
  
              <Grid
                item
                xs={8}
                style={{
                  border: "1px solid #f2f2f2",
                  borderRadius: "1px",
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "10px",
                }}
              >
                <div>
                  <span className="opacity-50">
                    Total Item ({orders.total_item})
                  </span>
                </div>
              </Grid>
              <Grid
                item
                xs={4}
                style={{
                  border: "1px solid #f2f2f2",
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "10px",
                }}
              >
                <div>
                  <span className="text-red-600 font-semibold text-2xl">
                    ${orders.total_price}
                  </span>
                </div>
              </Grid>
  
              <Grid
                item
                xs={8}
                style={{
                  border: "1px solid #f2f2f2",
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
                  border: "1px solid #f2f2f2",
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "10px",
                }}
              >
                <div>
                  <span className="text-green-600 font-semibold text-md">
                    {orders.status_payment === 0
                      ? "Cash On Delivery"
                      : orders.status_payment === 1
                      ? "Payment via Paypal"
                      : "Unknown Payment Method"}
                  </span>
                </div>
              </Grid>

              {orders.status === 1 && (
              <Grid container justifyContent="flex-end" className="mt-5">
                <Grid item>
                  <Button
                    variant="contained"
                    color="info"
                    // onClick={() => handleConfirmedOrder(order.order?.id)}
                    style={{color:"white", fontWeight:"bold", fontSize:"18px"}}
                  >
                    CONFIRM ORDER
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    // onClick={() => handleDeleteOrder(order.order?.id)}
                    style={{color:"white", fontWeight:"bold", fontSize:"18px", marginLeft:"30px"}}
                  >
                    CANCELLED ORDER
                  </Button>
                </Grid>
              </Grid>
            )}

            {orders.status === 2 && (
              <Grid container justifyContent="flex-end" className="mt-5">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    // onClick={() => handleShippedOrder(order.order?.id)}
                    style={{color:"white", fontWeight:"bold", fontSize:"18px"}}
                  >
                    SHIPPED
                  </Button>
                </Grid>
              </Grid>
            )}

            {orders.status === 3 && (
              <Grid container justifyContent="flex-end" className="mt-5">
                <Grid item>
                  <Button
                    variant="contained"
                    color="success"
                    // onClick={() => handleDeliveredOrder(order.order?.id)}
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
      </div>
    );
  };
  
  export default OrderDetail;
  