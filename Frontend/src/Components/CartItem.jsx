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
import "./CartItem.css";

const CartItem = ({ detail, showButton }) => {
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [discountPersent, setDiscountedPresent] = useState(0);

  const handleRemoveItemFromCart = () => {
    const updatedCart = cart.filter((item) => item.id !== detail.id);

    dispatch({
      type: "SET_CART",
      data: updatedCart,
    });

    setCart(updatedCart);
  };

  const handleUpdateCartItem = (num) => {
    dispatch({
      type: "SET_CART",
      data: cart.map((item) => {
        return item.id.localeCompare(detail.id) === 0
          ? { ...item, quantity: item.quantity + num }
          : item;
      }),
    });

    setCart(
      cart.map((item) => {
        return item.id.localeCompare(detail.id) === 0
          ? { ...item, quantity: item.quantity + num }
          : item;
      })
    );
  };

  return (
    <div
      className={`p-3 shadow-lg rounded-md  ${
        detail.isValid ? "border-neutral-200" : "border-red-500"
      } border-2`}
    >
      <div className="flex items-center mt-2">
        <div className="w-[12rem] h-[12rem] ml-5">
          <img
            className="w-full h-full object-cover object-top"
            src={getImage(detail.id_product_product)}
            alt="Product image"
            loading="lazy"
          />
        </div>
        <div className="ml-8 space-y-1">
          <p className="font-bold text-lg">
            {detail?.id_product_product?.name}
          </p>
          <p className="opacity-80 text-sm mt-3">Size: {detail?.size}</p>
          <p className="opacity-80 mt-3 text-sm">
            Brand: {detail?.id_product_product?.id_branch_branch.name}
          </p>
          {!showButton ? (
            <p className="opacity-90 mt-5 text-sm">x{detail?.quantity}</p>
          ) : null}
          <div className="flex space-x-2 items-center pt-3">
            {discountedPrice !== 0 ? (
              <p className="text-red-600 font-semibold text-lg">
                ${discountedPrice}
              </p>
            ) : (
              <p className="text-red-600 font-semibold text-lg">
                ${detail?.id_product_product?.product_price}
              </p>
            )}
            {discountedPrice ? (
              <p className={`opacity-50 text-lg line-through`}>
                ${detail?.id_product_product?.product_price}
              </p>
            ) : null}
            {discountPersent !== 0 && (
              <p className="text-green-600 font-semibold text-lg">
                {discountPersent}% off
              </p>
            )}
          </div>
        </div>
      </div>
      {showButton && (
        <div className="lg:flex items-center lg:space-x-5 pt-2 ml-8">
          <div className="flex items-center space-x-2 mt-4">
            <IconButton
              onClick={() => handleUpdateCartItem(-1)}
              disabled={findQuantity(detail.id) <= 1}
              color="primary"
              aria-label="add an alarm"
            >
              <RemoveCircleOutlineIcon />
            </IconButton>

            <div className="input-card">
              <input
                type={"text"}
                className="input-small"
                step={null}
                value={findQuantity(detail.id)}
                min={1}
                inputMode="numeric"
                pattern="[0-9]*"
                onInput={(e) => {
                  let inputValue = e.target.value;
                  inputValue = inputValue.replace(/[^0-9]/g, '');
                  if (inputValue === '' || parseInt(inputValue, 10) <= 0) {
                    inputValue = '1';
                  }
                  e.target.value = inputValue;
                }}
                onChange={(e) =>
                  handleUpdateCartItem(e.target.value - findQuantity(detail.id))
                }
              ></input>
            </div>
            <IconButton
              onClick={() => handleUpdateCartItem(1)}
              color="primary"
              aria-label="add an alarm"
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </div>
          <div className="flex text-sm lg:text-base mt-4 lg:mt-0">
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
      if (i.id.localeCompare(id) === 0) quantity = i.quantity;
    }
    return quantity;
  }
};

export default CartItem;
