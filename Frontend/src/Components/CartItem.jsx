import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import axios from "../config/axios";
import { getImage, setCart } from "../config/common";
import { useSelector } from "react-redux";
const CartItem = ({ detail, showButton }) => {
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [discountPersent, setDiscountedPresent] = useState(10);
  const handleRemoveItemFromCart = () => {
    // window.location.reload();
  };
  const handleUpdateCartItem = (num) => {
    dispatch({type:'SET_CART',data:cart.map(item=>{
      return item.id.localeCompare(detail.id)==0 ? {...item,quantity: item.quantity+num}: item
    })})
    setCart(cart.map(item=>{
      return item.id.localeCompare(detail.id)==0 ? {...item,quantity: item.quantity+num}: item
    }))
    // window.location.reload();
  };
  console.log(detail)
  return (
    <div className="p-5 shadow-lg border rounded-md">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem] ">
          <img
            className="w-full h-full object-cover object-top"
            src={detail?.id_product_product?.images?.link || null}
            alt=""
          />
        </div>
        <div className="ml-5 space-y-1">
          <p className="font-bold text-lg">
            {detail?.id_product_product?.name}
          </p>
          <p className="opacity-70 text-sm mt-5">Size: {detail?.size}, White</p>
          <p className="opacity-70 mt-5 text-sm">
            Brand: {detail?.id_product_product?.id_branch_branch.name}
          </p>
          <div className="flex space-x-2 items-center pt-3">
            <p className="text-red-600 font-semibold text-lg">
              ${discountedPrice != 0 ? discountedPrice : null}
            </p>
            <p
              className={`opacity-50 text-lg ${
                discountedPrice ? "line-through" : null
              }`}
            >
              ${detail?.id_product_product?.product_price}
            </p>
            {discountPersent !== 0 && (
              <p className="text-green-600 font-semibold text-lg">
                {discountPersent}% off
              </p>
            )}
          </div>
        </div>
      </div>
      {showButton && (
        <div className="lg:flex items-center lg:space-x-10 pt-4">
          <div className="flex items-center space-x-2 ">
            <IconButton
              onClick={() => handleUpdateCartItem(-1)}
              disabled={detail?.quantity <= 1}
              color="primary"
              aria-label="add an alarm"
            >
              <RemoveCircleOutlineIcon />
            </IconButton>

            <span className="py-1 px-7 border rounded-sm">
              {findQuantity(detail.id)}
            </span>
            <IconButton
              onClick={() => handleUpdateCartItem(1)}
              color="primary"
              aria-label="add an alarm"
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </div>
          <div className="flex text-sm lg:text-base mt-5 lg:mt-0">
            <Button onClick={handleRemoveItemFromCart} variant="text">
              <DeleteIcon />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
  function findQuantity(id) {
    let quantity = 0;
    for (let i of cart) {
      if (i.id.localeCompare(id) == 0) quantity = i.quantity;
    }
    return quantity;
  }
};

export default CartItem;
