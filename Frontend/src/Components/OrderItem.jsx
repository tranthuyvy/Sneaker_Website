import React, { useState } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import "../Styles/OrderItem.css";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AdjustIcon from "@mui/icons-material/Adjust";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "../config/axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import Modal from "react-modal";

const statusLabels = {
  1: "PLACED",
  2: "CONFIRMED",
  3: "DELIVERING",
  4: "SUCCESS",
  5: "FAILED",
  6: "CANCELLED",
  7: "RETURN",
};

function OrderItem({ order }) {
  const navigate = useNavigate();
  const lang = useSelector((state) => state.lang);
  const listDetail = order.order_details || [];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateOrderStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:8081/api/v1/order/get/${id}/update-status/${newStatus}`
      );

      if (response.status === 200) {
        // fetchOrderData();
        toast.success("SUCCESS", {
          autoClose: 1000,
        });
      } else {
      }
    } catch (error) {
      toast.error(lang["006"], {
        autoClose: 1000,
      });
    }
  };

  const handleSuccessOrder = () => {
    const newStatus = 4;
    updateOrderStatus(order?.id, newStatus);
  };

  const handleCancelledOrder = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    const newStatus = 6;
    updateOrderStatus(order?.id, newStatus);
    setIsModalOpen(false);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
  };

  return (
    <div className=" mx-5 my-3 font-medium text-xl border border-gray-500 rounded-lg shadow-lg flex flex-col justify-center items-center ">
      <div className="grid grid-cols-12 mt-4">
        <p className="col-start-9 col-span-2 ">
          OD: {format(new Date(order?.create_at), "dd/MM/yyyy")}
        </p>

        <p className="col-start-11 col-span-1 font-semibold text-xl">
          <div style={{ display: "flex", alignItems: "center" }}>
            {order?.status === 3 || order?.status === 4 ? (
              <>
                <FiberManualRecordIcon
                  sx={{ width: "20px", height: "20px" }}
                  className="text-green-600 p-0 mr-2 text-sm"
                />
              </>
            ) : (
              <>
                <AdjustIcon
                  sx={{ width: "20px", height: "20px" }}
                  className="text-green-600 p-0 mr-2 text-sm"
                />
              </>
            )}
            <p className="mr-2 w-full h-full" style={{ color: "green" }}>
              <LocalShippingIcon />{" "}
            </p>
            <p className="font-semibold">{statusLabels[order?.status]}</p>
          </div>
        </p>
      </div>
      {listDetail.map((item) => {
        return (
          <div
            onClick={() =>
              navigate(
                `/product/?id=${item.id_product_detail_product_detail.id_product_product.id}`
              )
            }
            className="h-4/6 flex w-5/6 border rounded-md shadow-md border-black py-4 border-t-2 border-b-2 hover:cursor-pointer hover:text-black link-hover my-4"
          >
            <div className="">
              <img
                src={
                  item.id_product_detail_product_detail.id_product_product
                    ?.images[0].link
                }
                loading="lazy"
                height={200}
                width={200}
                className="ml-10"
              />
            </div>
            <div className="flex items-center mx-10">
              <div className="align-text-top">
                <p>Id: 01</p>
                <p className="flex text-2xl">
                  {
                    item.id_product_detail_product_detail.id_product_product
                      .name
                  }
                </p>

                <p className="text-base">
                  <span className="opacity-70">size: </span>
                  <span className="text-black">
                    {item.id_product_detail_product_detail.size}
                  </span>
                </p>

                <p className="text-base opacity-60">
                  <span className="">
                    {
                      item?.id_product_detail_product_detail?.id_product_product
                        ?.id_category_category?.name
                    }
                    ,{" "}
                  </span>
                  <span className="text-black">
                    {
                      item?.id_product_detail_product_detail?.id_product_product
                        ?.id_branch_branch?.name
                    }
                  </span>
                </p>
              </div>
              <p className="mx-10">
                <span className="opacity-70">Product Price: </span>
                <span className="text-fuchsia-500 font-bold">
                  ${item.price}
                </span>
              </p>
              <p className="mx-10">
                <span className="opacity-70">x </span>
                <span className="text-black font-bold">{item.quantity}</span>
              </p>
              <p className="mx-10">
                <span className="opacity-70">Total: </span>
                <span className="text-fuchsia-500 font-bold">
                  ${item.quantity * item.price}
                </span>
              </p>

            </div>
          </div>
        );
      })}

      <div className="grid grid-cols-12">
        <p className="col-start-2 col-span-2 my-4 flex">
          <span className="mr-1 font-bold text-red-500">
            {order?.status_payment === 1 ? "Paid: " : "Total: "}
          </span>
          <span className="text-red-500 font-bold">${order?.total_price}</span>
        </p>

        <div className="col-start-5 col-span-3 flex mb-3 mt-2">
          {order?.status === 3 && (
            <Button
              variant="contained"
              color="success"
              onClick={handleSuccessOrder}
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: "18px",
                height: "50px",
                width: "150px",
              }}
            >
              RECEIVED
            </Button>
          )}
        </div>

        <div className="col-start-8 col-span-3 flex mt-2 mb-3">
          {order?.status === 1 && order?.status_payment === 0 && (
            <>
              <Button
                variant="contained"
                color="error"
                onClick={handleCancelledOrder}
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "18px",
                  height: "50px",
                  width: "150px",
                }}
              >
                CANCELL
              </Button>
              <Modal
                isOpen={isModalOpen}
                onRequestClose={cancelDelete}
                contentLabel="Xác nhận xóa"
                style={{
                  overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 1000,
                  },
                  content: {
                    width: "250px",
                    height: "140px",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "20px",
                    backgroundColor: "white",
                  },
                }}
              >
                <h2 className="font-bold text-red-500 p-2 mt-2">
                  ARE YOU SURE CANCEL ?
                </h2>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={confirmDelete}
                  style={{ marginRight: "10px" }}
                >
                  CONFIRM
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={cancelDelete}
                >
                  CANCEL
                </Button>
              </Modal>
            </>
          )}
        </div>

        <div className="col-start-11 flex mb-3 mt-2">
          {order?.payment_method === 2 && order?.status_payment === 0 && (
            <PayPalScriptProvider
              options={{
                "client-id":
                  "AVR129jGmpPplO0U5gNQnlPlfCeRffQ1r6E0GUJkJGyRTUP8Ce16qs3xocDzt7OwphQaRHDB0XdEuzzC",
              }}
            >
              <PayPalButtons
                style={{
                  color: "gold",
                  shape: "rect",
                  layout: "horizontal",
                  label: "paypal",
                  height: 55,
                  width: 200,
                }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        description: "Sneaker",
                        amount: {
                          currency_code: "USD",
                          value: (order?.total_price).toString(),
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then(function (details) {
                    axios
                      .put(`/api/v1/order/get/${order?.id}/update-payment`)
                      .then((response) => {
                        if (response.status === 200) {
                          toast(lang["132"]);
                        } else {
                          toast.error(lang["133"]);
                        }
                      })
                      .catch((error) => {
                        toast.error(lang["006"]);
                      });
                  });
                }}
                onError={(data, actions) => {
                  toast.error(lang["133"]);
                }}
              />
            </PayPalScriptProvider>
          )}
        </div>
      </div>
      <Button
        variant="contained"
        color="primary"
        // onClick={handleShippedOrder}
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        CANCELLED ORDER
      </Button>
    </div>
  );
}
export default OrderItem;
