import { Box, Button } from "@mui/material";

import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import api from "../../../config/api";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import errorMessagesEn from "../../../Lang/en.json";
import errorMessagesVi from "../../../Lang/vi.json";
import { toast, ToastContainer } from "react-toastify";
import OrderTraker from "./OrderTraker";

const OrderDetail = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const { id } = useParams();
  const lang = useSelector((state) => state);
  const errorMessages = lang === "vi" ? errorMessagesVi : errorMessagesEn;

  useEffect(() => {
    fetchOrderData();
  }, [id]);

  const fetchOrderData = async () => {
    try {
      const response = await api.get(`/api/v1/order/get/${id}`);
      const orderData = response.data.data;

      setOrders(orderData);
    } catch (error) {
      toast.error(errorMessages["006"], {
        autoClose: 1000,
      });
    }
  };

  const updateOrderStatus = async (id, newStatus) => {
    try {
      const response = await api.put(
        `http://localhost:8081/api/v1/order/get/${id}/update-status/${newStatus}`
      );

      if (response.status === 200) {
        fetchOrderData();
        toast.success(errorMessages["013"], {
          autoClose: 1000,
        });
      } else {
      }
    } catch (error) {
      toast.error(errorMessages["006"], {
        autoClose: 1000,
      });
    }
  };

  const handleConfirmOrder = () => {
    const newStatus = 2;
    updateOrderStatus(orders?.id, newStatus);
  };

  const handleShippedOrder = () => {
    const newStatus = 3;
    updateOrderStatus(orders?.id, newStatus);
  };

  const handleConfirmReturnOrder = () => {
    const newStatus = 8;
    updateOrderStatus(orders?.id, newStatus);
  };

  // const handleCancelledOrder = () => {
  //   const newStatus = 6;
  //   updateOrderStatus(orders?.id, newStatus);
  //   fetchOrderData();
  // };

  const statusLabels = {
    1: "PLACED",
    2: "CONFIRMED",
    3: "DELIVERING",
    4: "SUCCESS",
    5: "FAILED",
    6: "CANCELLED",
    7: "RETURN",
    8: "CONFIRM RETURN",
  };

  return (
    <div className="px-2 lg:px-36 space-y-7">
      <Box className="shadow-lg rounded-md p-3">
        <Grid
          container
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Grid item xs={12}>
            <OrderTraker
              activeStep={
                orders?.status === 1
                  ? 1
                  : orders?.status === 2
                  ? 2
                  : orders?.status === 3
                  ? 3
                  : orders?.status === 4
                  ? 4
                  : 4
              }
            />
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

      <Grid container className="shadow-lg">
        <Grid xs={12} style={{ marginLeft: "40px" }}>
          {/* <p className="font-bold text-4xl py-2">Delivery Address</p> */}
        </Grid>
        <Grid item xs={12}>
          <div
            className={`h-48 flex px-36 text-xl item py-3 mb-4 rounded-lg shadow-md`}
          >
            <div className="w-full">
              <p className="text-3xl font-semibold mt-1">
                {orders?.id_address_address?.name}
              </p>
              <div className="flex items-center pt-1">
                <p className="text-2xl font-semibold">
                  {orders?.id_address_address?.recipient_name}
                </p>
                <div
                  className="h-6 bg-slate-300 mx-3"
                  style={{ width: "1px" }}
                ></div>
                <p className="text-2xl font-semibold">
                  {orders?.id_address_address?.phone}
                </p>
              </div>
              <div className="text-white mt-2">
                <p className="text-2xl font-normal">
                  {orders?.id_address_address?.address}
                </p>
                <p className="text-2xl font-normal">
                  {orders?.id_address_address?.ward},{" "}
                  {orders?.id_address_address?.district},{" "}
                  {orders?.id_address_address?.province}
                </p>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>

      <Grid container className="space-y-3 ml-36">
        {orders &&
          orders.order_details &&
          orders.order_details.map((item) => (
            <Grid
              container
              item
              className="shadow-xl rounded-md p-2 border-white mb-3"
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Grid item xs={6}>
                {" "}
                <div className="flex items-center ">
                  <img
                    className="w-[15rem] h-[15rem] object-cover object-top"
                    src={
                      item?.id_product_detail_product_detail?.id_product_product
                        ?.images[0].link
                    }
                    alt=""
                  />
                  <div className="ml-5 space-y-2 font-semibold text-2xl">
                    <p className="">
                      {
                        item?.id_product_detail_product_detail
                          ?.id_product_product?.name
                      }
                    </p>
                    <p className="opacity-80 text-md space-x-2">
                      <span>
                        {
                          item?.id_product_detail_product_detail
                            ?.id_product_product?.id_branch_branch?.name
                        }
                        ,
                      </span>
                      <span>
                        {
                          item?.id_product_detail_product_detail
                            ?.id_product_product?.id_category_category?.name
                        }
                      </span>
                    </p>
                    <p>Size: {item?.id_product_detail_product_detail?.size}</p>
                    <p> x{item?.quantity}</p>

                    {orders?.total_discounted_price === 0 && (
                      <p
                        className=""
                        style={{
                          color: "gray",
                          textDecoration: "line-through",
                          opacity: "60%",
                        }}
                      >
                        {" "}
                        ${item?.price}
                      </p>
                    )}

                    <p className="text-red-600">
                      {/* ${orders?.total_price - orders?.total_discounted_price}{" "} */}
                      ${item?.price}
                    </p>
                  </div>
                </div>
              </Grid>
            </Grid>
          ))}
      </Grid>

      <div>
        <Grid
          container
          justifyContent="flex-end"
          className="font-semibold text-2xl"
        >
          <Grid container>
            <Grid
              item
              xs={8}
              style={{
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
                <span>${orders.total_price}</span>
              </div>
            </Grid>

            <Grid
              item
              xs={8}
              style={{
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
                <span className="text-indigo-500">Free</span>
              </div>
            </Grid>

            <Grid
              item
              xs={8}
              style={{
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
                <span className="text-green-400 font-semibold text-md">
                  {orders?.payment_method === 1
                    ? "Cash On Delivery"
                    : orders.payment_method === 2
                    ? "Payment via Paypal"
                    : "Unknown Payment Method"}
                </span>
              </div>
            </Grid>

            <Grid
              item
              xs={8}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "10px",
              }}
            >
              <div>
                <span className="opacity-50">Payment Status</span>
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
                <span className="text-cyan-400 font-semibold text-md">
                  {orders.status_payment === 0
                    ? "Wait For Pay"
                    : orders.status_payment === 1
                    ? "Paid via PayPal"
                    : "Unknown"}
                </span>
              </div>
            </Grid>

            {orders.status === 1 && (
              <Grid container justifyContent="flex-end" className="p-5">
                <Grid item>
                  <Button
                    variant="contained"
                    color="info"
                    onClick={handleConfirmOrder}
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    CONFIRM ORDER
                  </Button>
                </Grid>

                {/* <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleCancelledOrder}
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "20px",
                      marginLeft: "80px",
                    }}
                  >
                    CANCELLED ORDER
                  </Button>
                </Grid> */}
              </Grid>
            )}

            {orders.status === 2 && (
              <Grid container justifyContent="flex-end" className="p-5">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleShippedOrder}
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    DELIVERING
                  </Button>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </div>

      <Grid container className="shadow-lg">
        {orders?.status === 7 && (
          <>
            <Grid item xs={12}>
              {orders?.refunds.length !== 0 && (
                <div
                  className={`h-48 flex px-36 text-xl item py-3 mb-4 rounded-lg shadow-md`}
                >
                  <div className="w-full">
                    <p className="text-3xl font-semibold mt-1">REFUND</p>
                    <div className="flex items-center pt-1">
                      <p className="text-2xl font-semibold">Lý do</p>
                      <div
                        className="h-6 bg-slate-300 mx-3"
                        style={{ width: "1px" }}
                      ></div>
                      <p className="text-2xl font-semibold">
                        {orders?.refunds[0]?.content}
                      </p>
                      <div className="ml-10 flex">
                        {orders?.refunds[0]?.refund_images.length !== 0 && (
                          <div className="text-2xl font-normal flex space-x-3">
                            {orders?.refunds[0]?.refund_images.map(
                              (image, index) => (
                                <img
                                  key={index}
                                  className="w-[9rem] h-[9rem] mr-2"
                                  src={image.image}
                                  alt={`Refund Image ${index + 1}`}
                                />
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Grid>
            <Button
              variant="contained"
              color="warning"
              onClick={handleConfirmReturnOrder}
              style={{
                color: "red",
                fontWeight: "bold",
                fontSize: "20px",
                marginLeft: "145px",
                marginTop: "25px",
              }}
            >
              CONFIRM RETURN
            </Button>
          </>
        )}
      </Grid>
    </div>
  );
};

export default OrderDetail;
