import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import '../Styles/OrderItem.css'
function OrderItem({ order }) {
  const listDetail = order.order_details || [];
  return (
    <div className=" mx-5 my-5 font-medium text-xl border border-gray-500 rounded-lg shadow-md flex flex-col justify-center items-center ">
      <div className="grid grid-cols-8 h-1/6">
        <p className="col-start-6 col-span-2 ">
          Date {format(new Date(order?.create_at), "dd/MM/yyyy")}
        </p>
      </div>
      {listDetail.map((item) => {
        return (
          <Link
            to={`/product/?id=${item.id_product_detail_product_detail.id_product_product.id}`}
            className="h-4/6 flex w-5/6  border-black py-4 border-t-2 border-dotted border-b-2 hover:cursor-pointer hover:text-black link-hover mb-4"
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
            <div className="flex justify-center items-center justify-items-center w-2/3 ml-10">
              <p className="mr-10 text-left">
                {item.id_product_detail_product_detail.id_product_product.name}
              </p>
              <p className="mr-10">
                size: {item.id_product_detail_product_detail.size}
              </p>
              <p className="mr-10">Price: {item.price}</p>
              <p className="mr-10">Quantity: {item.quantity}</p>
              <p className="mr-10">Total: {item.quantity * item.price}</p>
            </div>
          </Link>
        );
      })}
      <div className="grid grid-cols-8 h-1/6">
        <p className="col-start-6 col-span-2 ">Total {909090}</p>
      </div>
    </div>
  );
}
export default OrderItem;
