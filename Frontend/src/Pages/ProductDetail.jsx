import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { RadioGroup } from "@headlessui/react";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Rating,
  requirePropFactory,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "lottie-react";

import axios from "../config/axios";
import { getImage, setCart } from "../config/common";
import ProductReviewCard from "../Components/ProductReviewCard";
import AddToCart from "../Animation/AddToCart.json";
import "../Styles/ProductDetail.css";
const loadingAnimation = require("../Animation/Loading.json");
export default function ProductDetails(props) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const location = useLocation();
  const { lang, cart } = useSelector((state) => {
    return { lang: state.lang, cart: state.cart };
  });
  const dispatch = useDispatch();
  const [product, setProduct] = useState();
  const [listSize, setListSize] = useState([]);
  const [delay, setDelay] = useState(Math.random() * 4000 + 500);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [discountPersent, setDiscountedPresent] = useState(10);
  const [loading, setLoading] = useState(true);
  const id = location.search.match(/id=(.+)/)[1];

  useEffect(() => {
    function call() {
      getProduct()
        .then(() => {
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        })
        .catch((err) => {
          setTimeout(() => {
            call();
          }, delay);
        });
    }
    call();
  }, []);

  const totalRatings =
    product && product.reviews
      ? product.reviews.reduce((total, review) => total + review.star, 0)
      : 0;

  const averageRating = totalRatings / product?.reviews.length;

  console.log("averageRating", averageRating);

  // total ratings excellent
  const excellentRatings = (product?.reviews || []).filter(
    (review) => review.star === 4.5 || review.star === 5
  );
  const totalExcellentRatings = excellentRatings.length;

  // total ratings very good
  const veryGoodRatings = (product?.reviews || []).filter(
    (review) => review.star === 3.5 || review.star === 4
  );
  const totalVeryGoodRatings = veryGoodRatings.length;

  //total ratings good
  const goodRatings = (product?.reviews || []).filter(
    (review) => review.star === 2.5 || review.star === 3
  );
  const totalGoodRatings = goodRatings.length;

  //total ratings avarage
  const averageRatings = (product?.reviews || []).filter(
    (review) => review.star === 1.5 || review.star === 2
  );
  const totalAverageRatings = averageRatings.length;

  //total ratings poor
  const poorRatings = (product?.reviews || []).filter(
    (review) => review.star === 0.5 || review.star === 1 || review.star === 0
  );
  const totalPoorRatings = poorRatings.length;

  // console.log("product", product);
  // console.log("product Review", product?.reviews);
  // console.log("product Review", product?.reviews.length);

  return (
    <div className="bg-white lg:px-20 container-custom">
      <div className="h-96 w-full" hidden={!loading}>
        {loading ? (
          <Lottie
            style={{
              top: 0,
              position: "absolute",
              width: "90%",
              height: "100%",
            }}
            loop={true}
            animationData={loadingAnimation}
          />
        ) : null}
      </div>
      <div className="main-content h-fit w-full" hidden={loading}>
        <div className="pt-6 relative">
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
                  alt={"Product Image"}
                  loading={"lazy"}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="flex flex-wrap space-x-5 justify-center"></div>
            </div>
            {/* product detail */}
            <div className="lg:col-span-1 mx-auto max-w-2xl px-4 pb-16 sm:px-6  lg:max-w-7xl  lg:px-8 lg:pb-24">
              <div className="lg:col-span-2">
                <h1 className="text-lg lg:text-xl font-semibold tracking-tight text-black-700 mb-1">
                  {product?.name}
                </h1>
                <h1 className="text-sm tracking-tight text-gray-900 opacity-60 pt-1 mb-1">
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
                    <Rating
                      name="read-only"
                      value={averageRating}
                      precision={0.5}
                      readOnly
                    />

                    <p className="opacity-60 text-sm">
                      {product?.reviews.length} Ratings
                    </p>
                    <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      {product?.reviews.length} reviews
                    </p>
                  </div>
                </div>

                <form className="mt-10">
                  {/* Sizes */}
                  <div className="mt-10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">
                        Size
                      </h3>
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

                  {isAddingToCart ? (
                    <Lottie
                      style={{
                        width: "70%",
                        height: "50%",
                        cursor: "pointer",
                      }}
                      loop={true}
                      animationData={AddToCart}
                    />
                  ) : (
                    <Button
                      variant="contained"
                      onClick={addCart}
                      sx={{
                        padding: ".9rem 4rem",
                        marginTop: "5.8rem",
                        marginLeft: "6rem",
                        backgroundColor: "#9155FD",
                        borderRadius: 8,
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#6f38e6",
                        },
                      }}
                    >
                      <Typography variant="button" fontWeight="bold">
                        Add To Cart
                      </Typography>
                    </Button>
                  )}

                  {/* <Button
                  variant="contained"
                  onClick={addCart}
                  sx={{
                    padding: ".8rem 2rem",
                    marginTop: "2rem",
                    backgroundColor: "#9155FD",
                    borderRadius: 2,
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#6f38e6",
                    },
                  }}
                >
                  <Typography variant="button" fontWeight="bold">
                    Add To Cart
                  </Typography>
                </Button>
                <Lottie onClick={addCart} style={{width: "70%", cursor:"pointer", marginRight:"50px"}} loop={true} animationData={AddToCart} /> */}
                </form>
              </div>

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                <div className="mt-10">
                  <h3 className="text-sm font-medium text-gray-900">
                    Highlights
                  </h3>

                  <div className="mt-4">
                    <ul
                      role="list"
                      className="list-disc space-y-2 pl-4 text-sm"
                    >
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

          {/* {/* rating and review section */}
          <section className="">
            <h1 className="font-semibold text-lg mb-3">
              Recent Review & Ratings
            </h1>

            <div className="border p-3">
              <Grid container spacing={7}>
                <Grid item xs={7}>
                  <div className="space-y-5">
                    {product?.reviews.map((item, i) => (
                      <ProductReviewCard item={item} />
                    ))}
                  </div>
                </Grid>

                <Grid item xs={5}>
                  <h1 className="text-xl font-semibold mb-3">
                    Product Ratings
                  </h1>
                  <div className="flex items-center space-x-3 pb-1">
                    <Rating
                      name="read-only"
                      value={averageRating}
                      precision={0.5}
                      readOnly
                    />

                    <p className="opacity-60">
                      {product?.reviews.length} Ratings
                    </p>
                  </div>
                  <Box>
                    <Grid
                      container
                      justifyContent="center"
                      alignItems="center"
                      gap={2}
                    >
                      <Grid xs={2}>
                        <p className="p-0">Excellent</p>
                      </Grid>
                      <Grid xs={7}>
                        <LinearProgress
                          className=""
                          sx={{
                            bgcolor: "#d0d0d0",
                            borderRadius: 4,
                            height: 7,
                          }}
                          variant="determinate"
                          value={
                            (totalExcellentRatings / product?.reviews.length) *
                            100
                          }
                          color="success"
                        />
                      </Grid>
                      <Grid xs={2}>
                        <p className="opacity-50 p-2">
                          {totalExcellentRatings} Ratings
                        </p>
                      </Grid>
                    </Grid>
                  </Box>

                  <Box>
                    <Grid
                      container
                      justifyContent="center"
                      alignItems="center"
                      gap={2}
                    >
                      <Grid xs={2}>
                        <p className="p-0">Very Good</p>
                      </Grid>
                      <Grid xs={7}>
                        <LinearProgress
                          className=""
                          sx={{
                            bgcolor: "#d0d0d0",
                            borderRadius: 4,
                            height: 7,
                          }}
                          variant="determinate"
                          value={
                            (totalVeryGoodRatings / product?.reviews.length) *
                            100
                          }
                          color="success"
                        />
                      </Grid>
                      <Grid xs={2}>
                        <p className="opacity-50 p-2">
                          {totalVeryGoodRatings} Ratings
                        </p>
                      </Grid>
                    </Grid>
                  </Box>

                  <Box>
                    <Grid
                      container
                      justifyContent="center"
                      alignItems="center"
                      gap={2}
                    >
                      <Grid xs={2}>
                        <p className="p-0">Good</p>
                      </Grid>
                      <Grid xs={7}>
                        <LinearProgress
                          className="bg-[#885c0a]"
                          sx={{
                            bgcolor: "#d0d0d0",
                            borderRadius: 4,
                            height: 7,
                          }}
                          variant="determinate"
                          value={
                            (totalGoodRatings / product?.reviews.length) * 100
                          }
                          color="warning"
                        />
                      </Grid>
                      <Grid xs={2}>
                        <p className="opacity-50 p-2">
                          {totalGoodRatings} Ratings
                        </p>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box>
                    <Grid
                      container
                      justifyContent="center"
                      alignItems="center"
                      gap={2}
                    >
                      <Grid xs={2}>
                        <p className="p-0">Avarage</p>
                      </Grid>
                      <Grid xs={7}>
                        <LinearProgress
                          className=""
                          sx={{
                            bgcolor: "#d0d0d0",
                            borderRadius: 4,
                            height: 7,
                            "& .MuiLinearProgress-bar": {
                              bgcolor: "#885c0a",
                            },
                          }}
                          variant="determinate"
                          value={
                            (totalAverageRatings / product?.reviews.length) *
                            100
                          }
                          color="warning"
                        />
                      </Grid>
                      <Grid xs={2}>
                        <p className="opacity-50 p-2">
                          {totalAverageRatings} Ratings
                        </p>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box>
                    <Grid
                      container
                      justifyContent="center"
                      alignItems="center"
                      gap={2}
                    >
                      <Grid xs={2}>
                        <p className="p-0">Poor</p>
                      </Grid>
                      <Grid xs={7}>
                        <LinearProgress
                          className=""
                          sx={{
                            bgcolor: "#d0d0d0",
                            borderRadius: 4,
                            height: 7,
                          }}
                          variant="determinate"
                          value={
                            (totalPoorRatings / product?.reviews.length) * 100
                          }
                          color="error"
                        />
                      </Grid>
                      <Grid xs={2}>
                        <p className="opacity-50 p-2">
                          {totalPoorRatings} Ratings
                        </p>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  function addCart() {
    setIsAddingToCart(true);
    let listCart = [];
    listSize.forEach((item) => {
      if (item.isChecked && !checkInCart(item.id))
        listCart.push({ ...item, quantity: 1 });
    });
    dispatch({ type: "SET_CART", data: [...cart, ...listCart] });
    setCart([...cart, ...listCart]);
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 2500);
    // toast(lang["020"]);
  }
  function checkInCart(id) {
    for (let i of cart) {
      if (i.id.localeCompare(id) == 0) return true;
    }
    return false;
  }
  async function getProduct() {
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
  }
}
