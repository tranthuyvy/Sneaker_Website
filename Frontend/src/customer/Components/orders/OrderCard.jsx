import { Box, Grid, Avatar, AvatarGroup } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AdjustIcon from "@mui/icons-material/Adjust";
import React from "react";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import "./OrderCard.css";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, successOrder } from "../../../Redux/Admin/Orders/Action";
import { useState } from "react";
import axios from "axios";

const OrderCard = ({ item, order }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOrderCancelled, setIsOrderCancelled] = useState(false);
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  const [isReceived, setIsReceived] = useState(false);

  console.log("user", auth);

  const handleCancelOrder = (orderId) => {
    if (window.confirm("Are you sure cancel order?")) {
      dispatch(deleteOrder(orderId))
        .then(() => {
          setIsOrderCancelled(true);
          setTimeout(() => {
            setIsOrderCancelled(false);
          }, 3000);
        })
        .catch((error) => {
          console.error("Error", error);
        });
    }
  };

  // const handleSuccessOrder = (orderId) => {
  //   if (window.confirm("Are you sure you've received order?")) {
  //     dispatch(successOrder(orderId))
  //       .then(() => {
  //         setIsOrderSuccess(true);
  //         setTimeout(() => {
  //           setIsOrderSuccess(false);
  //         }, 3000);
  //       })
  //       .catch((error) => {
  //         console.error("Error", error);
  //       });
  //   }
  // };

  let totalPrice = 0;

  order.orderItems.forEach((orderItem) => {
    totalPrice += orderItem.price;
  });

  console.log("items ", item, order, order.orderStatus);

  const calculatePoints = () => {
    return Math.floor(order?.totalDiscountedPrice * 0.1);
  };
  const totalPricePoint = order?.totalDiscountedPrice;

  const handleReceiveOrder = (orderId, totalPricePoint, user) => {
    const pointsUser = auth.user.points;

    const points = calculatePoints(totalPricePoint);

    const totalPoints = pointsUser + points;

    const confirmed = window.confirm("Are you sure you've received order?");

    if (confirmed) {
      try {
        axios.put(
          "http://localhost:5454/api/users/profile",
          { points: totalPoints },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        dispatch(successOrder(orderId))
          .then(() => {
            console.log("SuccessOrder dispatched successfully");
            setIsReceived(true);
          })
          .catch((error) => {
            console.error("Error dispatching successOrder", error);
          });
      } catch (error) {
        console.error(
          "Error updating points",
          error.response?.data || error.message
        );
      }
    }
  };

  return (
    <Box className="p-5 shadow-lg hover:shadow-2xl border">
      <Grid
        item
        xs={12}
        container
        alignItems="center"
        justifyContent="flex-end"
      >
        <p className="opacity-50 mr-5 text-sm">
          OD: {format(new Date(order?.createdAt), "dd/MM/yyyy")}
        </p>
        <p className="space-y-2 font-semibold">
          <div style={{ display: "flex", alignItems: "center" }}>
            {order?.orderStatus === "DELIVERED" || order?.orderStatus === "SUCCESS" ? (
              <>
                <FiberManualRecordIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-green-600 p-0 mr-2 text-sm"
                />
              </>
            ) : (
              <>
                <AdjustIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-green-600 p-0 mr-2 text-sm"
                />
              </>
            )}
            <p className="mr-2" style={{ color: "green" }}>
              <LocalShippingIcon />{" "}
            </p>
            <p className="font-semibold">{order?.orderStatus}</p>
          </div>
        </p>
        <p className="text-xs"></p>
        {item.orderStatus === "SUCCESS" && (
          <div
            onClick={() => navigate(`/account/rate/{id}`)}
            className="flex items-center text-blue-600 cursor-pointer"
          >
            <StarIcon sx={{ fontSize: "2rem" }} className="px-2 text-5xl" />
            <span>Rate & Review Product</span>
          </div>
        )}
      </Grid>

      <hr className="mt-5 mb-5" />

      <Grid spacing={2} container sx={{ justifyContent: "space-between" }}>
        <Grid item xs={5}>
          <div
            onClick={() => navigate(`/account/order/${order?.id}`)}
            className="flex cursor-pointer"
          >
            <img
              className="w-[7rem] h-[7rem] object-cover object-top"
              src={item?.product.imageUrl}
              alt=""
            />
            <div className="ml-5">
              <p className="mb-2 font-semibold text-lg">
                {item?.product.title}
              </p>
              <p className="opacity-50 text-xs font-semibold space-x-5">
                <span>
                  {item?.product.color}, {item?.size}
                </span>
              </p>
              <div className="mt-3">
                <AvatarGroup max={4} sx={{ justifyContent: "start" }}>
                  {order.orderItems.map((orderItem) => (
                    <Avatar
                      key={orderItem.product.id}
                      alt={orderItem.product.title}
                      src={orderItem.product.imageUrl}
                    />
                  ))}
                </AvatarGroup>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={2} container alignItems="center">
          <p className="opacity-50 text-sm mr-1">Total Items:</p>
          <p className="text-sm font-semibold">{order?.totalItem}</p>
        </Grid>

        <Grid item xs={3} container alignItems="center">
          <p style={{ color: "black", opacity: "50%", marginRight: "4px" }}>
            Item Price:{" "}
          </p>
          <p
            className="font-semibold mr-2 ml-1"
            style={{ color: "gray", textDecoration: "line-through" }}
          >
            {" "}
            ${item?.product.price}
          </p>
          <p className="font-semibold" style={{ color: "red" }}>
            {" "}
            ${item?.product.discountedPrice}
          </p>
        </Grid>

        <Grid item xs={2} container alignItems="center">
          <p className="space-y-2 font-semibold">
            <div style={{ display: "flex", alignItems: "center" }}>
              {order?.orderStatus === "DELIVERED" || order?.orderStatus === "SUCCESS" ? (
                <>
                  <FiberManualRecordIcon
                    sx={{ width: "15px", height: "15px" }}
                    className="text-green-600 p-0 mr-2 text-sm"
                  />
                </>
              ) : (
                <>
                  <AdjustIcon
                    sx={{ width: "15px", height: "15px" }}
                    className="text-green-600 p-0 mr-2 text-sm"
                  />
                </>
              )}
              <p className="mr-2" style={{ color: "green" }}>
                <LocalShippingIcon />{" "}
              </p>
              <p className="font-semibold">{order?.orderStatus}</p>
            </div>
          </p>
          <p className="text-xs"></p>
          {item.orderStatus === "SUCCESS" && (
            <div
              onClick={() => navigate(`/account/rate/{id}`)}
              className="flex items-center text-blue-600 cursor-pointer"
            >
              <StarIcon sx={{ fontSize: "2rem" }} className="px-2 text-5xl" />
              <span>Rate & Review Product</span>
            </div>
          )}
        </Grid>
      </Grid>
      <hr className="mt-5" />
      <div className="flex justify-end items-center mt-5">
        <img
          className="w-14 h-14 mr-2"
          src="https://cdn.printgo.vn/uploads/media/774255/logo-giay-1_1586510617.jpg"
        />
        <p style={{ color: "black", opacity: "50%", marginRight: "4px" }}>
          Total:{" "}
        </p>
        <p
          className="font-semibold mr-2 ml-1"
          style={{ color: "gray", textDecoration: "line-through" }}
        >
          {" "}
          ${totalPrice}
        </p>
        <p className="font-semibold" style={{ color: "red" }}>
          {" "}
          ${order?.totalDiscountedPrice}
        </p>
      </div>
      <div className="flex justify-end items-center">
        <p className="centered-text text-sm">
          Vui lòng chỉ nhấn "Đã nhận được hàng" khi đơn hàng đã được giao đến
          bạn và sản phẩm nhận được không có vấn đề nào
        </p>
        {order?.orderStatus === "SUCCESS" || order?.orderStatus === "CONFIRMED" || order?.orderStatus === "SHIPPED" || order?.orderStatus === "CANCELLED" ? null : (
          <>
            {order?.orderStatus === "DELIVERED" ? (
              <button
                className="square-button btn-submit"
                onClick={() => handleReceiveOrder(order?.id, totalPrice)}
              >
                ĐÃ NHẬN HÀNG
              </button>
            ) : null}
            <div>
              {order?.orderStatus === "PLACED" ? (
                <button
                  className="square-button btn-submit"
                  onClick={() => handleCancelOrder(order?.id)}
                >
                  HỦY ĐƠN HÀNG
                </button>
              ) : null}
              {isOrderCancelled && (
                <div style={{ color: "green" }}>Successfully</div>
              )}
            </div>
          </>
        )}
      </div>
    </Box>
  );
};

export default OrderCard;
