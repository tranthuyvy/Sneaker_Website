import React from "react";
import "../Styles/ProductCard.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
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

  // const handleNavigate = () => {
  //     navigate(,);
  // };

  return (
    <Link
      to={`/product/?id=${product.id}`}
      className="productCard w-[20rem] border m-3 transition-all cursor-pointer "
    >
      <div className="h-[20rem]">
        {/* <div
          id="default-carousel"
          className="relative w-full"
          data-carousel="slide"
        >
          <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
            {imageUrl.map((item) => {
              return (
                <div
                  className=" duration-700 ease-in-out"
                  data-carousel-item
                >
                  <img
                    src={item.link}
                    className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                 
                    alt="..."
                  />
                </div>
              );
            })}
          </div>

          <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
            <button
              type="button"
              className="w-3 h-3 rounded-full"
              aria-current="true"
              aria-label="Slide 1"
              data-carousel-slide-to="0"
            ></button>
          </div>

          <button
            type="button"
            className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-prev
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-next
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div> */}
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
