import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { RadioGroup } from "@headlessui/react";
import { Button, Rating } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "../config/axios";
import { getImage, setCart } from "../config/common";
export default function ProductDetails(props) {
  const location = useLocation();
  const { lang, cart } = useSelector((state) => {
    return { lang: state.lang, cart: state.cart };
  });
  const dispatch = useDispatch();
  const [product, setProduct] = useState();
  const [listSize, setListSize] = useState([]);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [discountPersent, setDiscountedPresent] = useState(10);
  const id = location.search.match(/id=(.+)/)[1];
  useEffect(() => {
    (async () => {
      const data = (await axios.get(`/api/v1/product/get?id=${id}`)).data;
      if (data.code.localeCompare("002") != 0) {
        toast(lang[data.code]);
      }
      if (!data.data) {
        toast(lang["003"]);
      } else {
        setProduct({ ...data.data });
        setDiscountedPrice(
          data.data.product_price -
            (data.data.product_price / 100) * discountPersent
        );
        setListSize(
          data.data.product_details.length > 0
            ? [
                ...data.data.product_details.map((item) => {
                  return { id: item.id, value: item.size, isChecked: false };
                }),
              ]
            : []
        );
      }
    })();
  }, []);
  return (
    <div className="bg-white lg:px-20">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li>
              <div className="flex items-center">
                <a
                  href={"/"}
                  className="mr-2 text-sm font-medium text-gray-900"
                >
                  {product && product?.id_branch_branch?.name}
                </a>
                <svg
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
            <li className="text-sm">
              <a
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product && product?.name}
              </a>
            </li>
          </ol>
        </nav>
        <section className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 px-4 pt-10">
          <div className="flex flex-col items-center ">
            {/* image */}
            <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem] border">
              <img
                src={product ? getImage(product) : null}
                alt={"Hình ảnh giày"}
                loading={"lazy"}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="flex flex-wrap space-x-5 justify-center">
              {/* {product.images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => handleSetActiveImage(image)}
                  className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] mt-4"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))} */}
            </div>
          </div>
          {/* product detail */}
          <div className="lg:col-span-1 mx-auto max-w-2xl px-4 pb-16 sm:px-6  lg:max-w-7xl  lg:px-8 lg:pb-24">
            <div className="lg:col-span-2">
              <h1 className="text-lg lg:text-xl font-semibold tracking-tight text-black-700">
                {product?.name}
              </h1>
              <h1 className="text-sm tracking-tight text-gray-900 opacity-60 pt-1">
                {product?.id_branch_branch.name}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <div className="flex space-x-5 items-center text-lg lg:text-xl tracking-tight text-gray-900 mt-6">
                <p className="font-semibold text-red-500">
                  ${Number.parseInt(discountedPrice)}
                </p>
                {product?.product_price !== 0 &&
                  product?.product_price !== discountedPrice && (
                    <p className="opacity-50 line-through">
                      ${product?.product_price}
                    </p>
                  )}

                {discountPersent !== 0 && (
                  <p className="text-green-600 font-semibold">
                    {discountPersent}% Off
                  </p>
                )}
              </div>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>

                <div className="flex items-center space-x-3">
                  <Rating name="read-only" value={6} precision={0.5} readOnly />

                  <p className="opacity-60 text-sm">{5} Ratings</p>
                  <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {5} reviews
                  </p>
                </div>
              </div>

              <form className="mt-10">
                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  </div>

                  <RadioGroup className="mt-4">
                    <RadioGroup.Label className="sr-only">
                      Choose a size
                    </RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-10">
                      {listSize.length > 0
                        ? listSize.map((item) => (
                            <RadioGroup.Option
                              key={item.id}
                              value={item.value}
                              className={`cursor-pointer text-gray-900 shadow-sm ring-1 ring-indigo-500 font-medium uppercase min-h-[40px] min-w-[40px] justify-content: center align-items: center
                                ${
                                  item.isChecked ? "bg-blue-400" : "bg-white"
                                } `}
                            >
                              <RadioGroup.Label
                                as="p"
                                onClick={() => {
                                  setListSize([
                                    ...listSize.map((i) => {
                                      if (i.id.localeCompare(item.id) == 0)
                                        return {
                                          ...item,
                                          isChecked: !item.isChecked,
                                        };
                                      return i;
                                    }),
                                  ]);
                                }}
                                className={
                                  "text-center min-h-full m-w-full align-items: center "
                                }
                              >
                                {item.value}
                              </RadioGroup.Label>
                            </RadioGroup.Option>
                          ))
                        : null}
                    </div>
                  </RadioGroup>
                </div>
                <Button
                  variant="contained"
                  onClick={addCart}
                  sx={{ padding: ".8rem 2rem", marginTop: "2rem" }}
                >
                  Add To Cart
                </Button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    <li>Bringing comfort to you feet</li>
                    <li>Expensive</li>
                    <li>Luxury</li>
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>
                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">
                    {product?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
  function addCart() {
    let listCart = [];
    listSize.forEach((item) => {
      if (item.isChecked && !checkInCart(item.id)) listCart.push({ ...item, quantity: 1 });
    });
    dispatch({ type: "SET_CART", data: [...cart,...listCart] });
    setCart([...cart,...listCart]);
  }
  function checkInCart(id){
    for(let i of cart){
       if (i.id.localeCompare(id)==0) return true
    }
    return false
  }
}
