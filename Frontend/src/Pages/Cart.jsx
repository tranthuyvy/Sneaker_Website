import React, { useState } from "react";
import CartItem from "../Components/CartItem";
import { Badge, Button, cardActionAreaClasses, ListItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "../config/axios";
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [listCart, setListCart] = useState([]);
  const cart = useSelector((store) => store.cart);
  const lang = useSelector((state) => state.lang);
  useEffect(() => {
    (async () => {
      const listPromise = [];
      for (let i of cart) {
        listPromise.push(
          await axios.get(`/api/v1/product_detail/get?id=${i.id}`)
        );
      }
      const listTmp = [];
      const data = (await Promise.all(listPromise)).map((item) => {
        let quantity = findQuantity(item.data.data.id);
        return { ...item.data.data, quantity: quantity, isValid: true };
      });
      for (let a of data) {
        listTmp.push({ ...a });
      }
      setListCart([...listTmp]);
    })();
  }, []);
  useEffect(() => {
    getTotal();
  });
  return (
    <div className="">
      {cart.length > 0 && (
        <div className="lg:grid grid-cols-3 lg:px-16 relative">
          <div className="lg:col-span-2 lg:px-5 bg-white">
            <div className=" space-y-3">
              {listCart.length > 0
                ? listCart.map((item, index) => (
                    <>
                      <CartItem key={index} detail={item} showButton={true} />
                    </>
                  ))
                : null}
            </div>
          </div>
          <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0 ">
            <div className="border p-5 bg-white shadow-lg rounded-md">
              <p className="font-bold opacity-60 pb-4">PRICE DETAILS</p>
              <hr />

              <div className="space-y-3 font-semibold">
                <div className="flex justify-between pt-3 text-black ">
                  {/* <span>Price ({cart.cart?.totalItem} item)</span> */}
                  <span>${total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span className="text-green-700">${0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="text-green-700">Free</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Amount</span>
                  <span className="text-green-700">${total}</span>
                </div>
              </div>

              <Button
                onClick={handleCheckOut}
                variant="contained"
                type="submit"
                sx={{ padding: ".8rem 2rem", marginTop: "2rem", width: "100%" }}
              >
                Check Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  function getTotal() {
    let totalTmp = 0;
    listCart.forEach((item) => {
      totalTmp += findQuantity(item.id) * item.id_product_product.product_price;
    });
    setTotal(totalTmp);
  }
  function findQuantity(id) {
    let quantity = 0;
    for (let i of cart) {
      if (i.id.localeCompare(id) == 0) quantity = i.quantity;
    }
    return quantity;
  }
  function isIdInList(id, list) {
    return list.some((item) => item.id === id);
  };
  function handleCheckOut() {
    (async () => {
      let data = (
        await axios.post("/api/v1/order/checkInventory", {
          listDetail: cart.map((item) => {
            return { id_product_detail: item.id, quantity: item.quantity };
          }),
        })
      ).data;
      if (!data.flag) {
        const li = listCart;
        
        setListCart(li.map((item) => {
            return { ...item, isValid: !isIdInList(item.id, data.listProduct) };
          })
        );
        toast(lang["017"]);
      } else {
        navigate("/order");
      }
    })().catch((err) => {
      console.error(err);
      toast(lang["006"]);
    });
  }
};

export default Cart;
