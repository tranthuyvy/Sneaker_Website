import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import OrderTraker from "./OrderTraker";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate, useParams } from "react-router-dom";
import AddressCard from "../adreess/AdreessCard";
import { deepPurple } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrderById } from "../../../Redux/Customers/Order/Action";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { orderId } = useParams();
  const { order } = useSelector((store) => store);

  console.log("order", order.order);

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, []);

  const navigate = useNavigate();

  return (
    <div className=" px-2 lg:px-36 space-y-7 ">
      <Box className="p-5 shadow-lg border rounded-md">
        <Grid
          container
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Grid item xs={9}>
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
          <Grid item justifyContent="center">
            {order.order?.orderStatus === "DELIVERED" && (
              <Button sx={{ color: "" }} color="error" variant="text"></Button>
            )}

            {order.order?.orderStatus !== "DELIVERED" && (
              <Button sx={{ color: deepPurple[500] }} variant="text"></Button>
            )}
          </Grid>
        </Grid>
      </Box>

      <Grid container className="p-5 shadow-lg">
        <Grid xs={12}>
          <p className="font-bold text-lg py-2">Delivery Address</p>
        </Grid>
        <Grid item xs={6}>
          <AddressCard address={order.order?.shippingAddress} />
        </Grid>
      </Grid>

      <Grid container className="space-y-5">
        {order.order?.orderItems.map((item) => (
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
              {order.order?.orderStatus === "DELIVERED" && (
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
        ))}
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
                <span>${order.order?.totalPrice}</span>
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
                <span>- ${order.order?.discounte}</span>
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
                  Total Payment ({order.order?.totalItem})
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
                  ${order.order?.totalDiscountedPrice}
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
                  {order.order?.paymentStatus === 0
                    ? "Cash On Delivery"
                    : order.order?.paymentStatus === 1
                    ? "Payment via Paypal"
                    : "Unknown Payment Method"}
                </span>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default OrderDetails;
