import React from "react";

import { useNavigate } from "react-router-dom";

const HomeProductCard = ({ product }) => {
  const navigate = useNavigate();

  const titleToShow = product?.title.length > 18 ? product?.title.slice(0, 18) + "..." : product?.title;

  return (
    <div
      onClick={() => navigate(`/product/${product?.id}`)}
      className="cursor-pointer flex flex-col items-center bg-white shadow-lg overflow-hidden w-[15rem] mx-3"
      style={{
        borderRadius: "8px",
        border: '1px solid gray',
        transition: 'transform 0.3s, box-shadow 0.3s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(0.95)'; 
        e.currentTarget.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.3)'; 
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="h-[12rem] w-[12rem]">
        <img
          className="object-cover object-top w-full h-full"
          src={product?.image || product?.imageUrl}
          alt={product?.title}
        />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900">
              {titleToShow}
        </h3>
        <p className="mt-2 text-xs text-gray-500 mb-2">{product?.brand || product?.title}</p>
        <div className='flex space-x-2 items-center'>
            <p className='text-red-600 font-bold'>${product?.discountedPrice}</p>
            {
              product?.discountedPrice !== product?.price && product?.price !== 0 && (
                <p className='opacity-50 line-through'>${product?.price}</p>
              )
            }
            {
              product?.discountPersent !== 0 && (
                <p className='text-green-600 font-semibold'>{product?.discountPersent}% off</p>
              )
            }
        </div>
      </div>
    </div>
  );
};

export default HomeProductCard;
