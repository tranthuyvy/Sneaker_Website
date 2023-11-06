import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import "../Styles/OrderItem.css";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AdjustIcon from "@mui/icons-material/Adjust";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useNavigate } from "react-router-dom";
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
  const listDetail = order.order_details || [];
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
        <p className="col-start-11 col-span-1 my-4 flex">
          <span className="mr-1">Total: </span>
          <span className="text-red-500 font-bold">${order?.total_price}</span>
        </p>
      </div>
    </div>
  );
}
export default OrderItem;
