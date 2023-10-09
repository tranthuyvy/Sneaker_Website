import React from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem, updateTotal} from "../../../Redux/Customers/Cart/Action";
import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const CartItem = ({ item,showButton }) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleRemoveItemFromCart = () => {
    const data = { cartItemId: item?.id, jwt };
    dispatch(removeCartItem(data));
    dispatch(updateTotal());
    // window.location.reload();
  };
  const handleUpdateCartItem=(num)=>{
    const data={data:{quantity:item.quantity + num}, cartItemId:item?.id, jwt}
    dispatch(updateCartItem(data));
    dispatch(updateTotal());
    // window.location.reload();
  };

  return (
    <div className="p-5 shadow-lg border rounded-md">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem] ">
          <img
            className="w-full h-full object-cover object-top"
            src={item?.product.imageUrl}
            alt=""
          />
        </div>
        <div className="ml-5 space-y-1">
          <p className="font-bold text-lg">{item?.product?.title}</p>
          <p className="opacity-70 text-sm mt-5">Size: {item?.size}, White</p>
          <p className="opacity-70 mt-5 text-sm">Brand: {item?.product?.brand}</p>
          <div className="flex space-x-2 items-center pt-3">

          <p className='text-red-600 font-semibold text-lg'>${item?.product.discountedPrice}</p>

            {
              item?.product.discountedPrice !== item?.product.price && item?.product.price !== 0 && (
                <p className="opacity-50 line-through text-lg">${item?.product.price}</p>
              )
            }

            {
              item?.product.discountPersent !== 0 && (
                <p className='text-green-600 font-semibold text-lg'>{item?.product.discountPersent}% off</p>
              )
            }
    
          </div>
        </div>
      </div>
     {showButton&& <div className="lg:flex items-center lg:space-x-10 pt-4">
        <div className="flex items-center space-x-2 ">
          <IconButton onClick={()=>handleUpdateCartItem(-1)} disabled={item?.quantity<=1} color="primary" aria-label="add an alarm">
            <RemoveCircleOutlineIcon />
          </IconButton>

          <span className="py-1 px-7 border rounded-sm">{item?.quantity}</span>
          <IconButton onClick={()=>handleUpdateCartItem(1)} color="primary" aria-label="add an alarm">
            <AddCircleOutlineIcon />
          </IconButton>
        </div>
        <div className="flex text-sm lg:text-base mt-5 lg:mt-0">
          
          <Button onClick={handleRemoveItemFromCart} variant="text">
            <DeleteIcon />
          </Button>
          
        </div>
      </div>}
    </div>
  );
};

export default CartItem;
