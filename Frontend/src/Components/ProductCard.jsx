import React, { useState } from "react";
import "../Styles/ProductCard.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
const ProductCard = ({ product }) => {
  const [delay,setDelay]= useState(Math.random()*1000)
  const {
    id,
    title,
    brand,
    imageUrl,
    price,
    discountedPrice,
    status,
    discountPersent,
  } = product;
  const navigate = useNavigate();
  const items = [
    ...imageUrl.map((item) => <img src={item.link} role="presentation" />)
  ];

  return (
    <Link
      to={`/product/?id=${product.id}`}
      className="productCard w-[20rem] border m-3 transition-all cursor-pointer "
    >
      <div className="h-[20rem]">
        <AliceCarousel
          mouseTracking
          items={items}
          autoPlay={true}
          disableButtonsControls={true}
          disableDotsControls
          infinite={items.length>1}
          animationDuration={800+delay}
        />
      </div>

      <div className="textPart bg-white p-3 ">
        <div>
          <p className="text-black-700 font-bold">{title}</p>
          <p className="text-xs opacity-50">{brand}</p>
          {status === 1 ? (
            <p className="text-md text-red-600 font-semibold">Out of stock</p>
          ) : (
            <div className="flex space-x-2 items-center">
              <p className="text-red-600 font-bold">${discountedPrice}</p>
              {discountedPrice !== price && price !== 0 && (
                <p className="opacity-50 line-through">${price}</p>
              )}
              {discountPersent !== 0 && (
                <p className="text-green-600 font-semibold">
                  {discountPersent}% off
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
