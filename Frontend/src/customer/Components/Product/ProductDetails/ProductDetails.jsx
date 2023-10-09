import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import ProductReviewCard from "./ProductReviewCard";
import { Box, Button, Grid, LinearProgress, Rating } from "@mui/material";
import HomeProductCard from "../../Home/HomeProductCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findProductById } from "../../../../Redux/Customers/Product/Action";
import { addItemToCart } from "../../../../Redux/Customers/Cart/Action";
import { getAllReviews } from "../../../../Redux/Customers/Review/Action";
import api from "../../../../config/api";

const product = {
  name: "",
  price: "$",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Nike", href: "#" },
  ],
  images: [
    {
      src: "https://wheyshop.cdn.vccloud.vn/wp-content/uploads/2021/09/bang-size-chan-chuan-nhat-va-cach-do-size-chan-1.png",
      alt: "",
    },
    {
      src: "https://authentic-shoes.com/wp-content/uploads/2023/05/untitled_design__13__011956e84cbd49fb9ff24fbca6c10bcd_2048x2048.png",
      alt: "",
    },
  ],
  // colors: [
  //   { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
  //   { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
  //   { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  // ],
  sizes: [
    { name: "6", inStock: true },
    { name: "7", inStock: true },
    { name: "8", inStock: true },
    { name: "9", inStock: true },
    { name: "10", inStock: true },
    { name: "11", inStock: true },
  ],

  highlights: [
    "Commitment to 100% genuine products",
    "Bringing comfort to your feet",
    "Delivering an excellent experience",
    "Get free delivery on orders over $100",
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customersProduct } = useSelector((store) => store);
  const { productId } = useParams();
  const jwt = localStorage.getItem("jwt");
  // console.log("customersProduct", customersProduct)
  // console.log("param",productId,customersProduct.product)

  const [productsFromAPI, setProductsFromAPI] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeImage, setActiveImage] = useState(
    customersProduct.product?.imageUrl
  );
  const [fixedImage, setFixedImage] = useState(
    customersProduct.product?.imageUrl
  );

  const handleSetActiveImage = (image) => {
    setFixedImage(image.src);

    setActiveImage(image.src);
  };

  const handleSubmit = () => {
    if (!jwt) {
      alert("Please log in");
      navigate("/login");
      return;
    }

    if (selectedSize) {
      const data = { productId, size: selectedSize.name };
      if (!data || !data.productId || !data.size) {
        alert("Invalid data");
        return;
      }
      dispatch(addItemToCart({ data, jwt }));
      navigate("/cart");
    } else {
      alert("Please select size");
    }
  };

  useEffect(() => {
    const data = { productId: Number(productId), jwt };
    dispatch(findProductById(data));
    dispatch(getAllReviews(productId));
  }, [productId]);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const brand = customersProduct.product?.brand;
        if (brand) {
          const response = await api.get(`/api/products/brand/${brand}`);
          const dataFromAPI = response.data;
          setProductsFromAPI(dataFromAPI);
          setLoading(false);
        }
      } catch (error) {
        console.error("Call API Error:", error);
        setLoading(false);
      }
    };

    fetchDataFromAPI();
  }, [customersProduct.product]);

  const similarProducts = productsFromAPI.filter(
    (item) => item.id !== customersProduct.product.id
  );

  //total ratings
  const totalRatings = (customersProduct.product?.reviews || []).reduce(
    (total, review) => total + review.star,
    0
  );
  const averageRating = totalRatings / customersProduct.product?.reviews.length;

  //total ratings excellent
  const excellentRatings = (customersProduct.product?.reviews || []).filter(
    (review) => review.star === 4.5 || review.star === 5
  );
  const totalExcellentRatings = excellentRatings.length;

  //total ratings very good
  const veryGoodRatings = (customersProduct.product?.reviews || []).filter(
    (review) => review.star === 3.5 || review.star === 4
  );
  const totalVeryGoodRatings = veryGoodRatings.length;

  //total ratings good
  const goodRatings = (customersProduct.product?.reviews || []).filter(
    (review) => review.star === 2.5 || review.star === 3
  );
  const totalGoodRatings = goodRatings.length;

  //total ratings avarage
  const averageRatings = (customersProduct.product?.reviews || []).filter(
    (review) => review.star === 1.5 || review.star === 2
  );
  const totalAverageRatings = averageRatings.length;

  //total ratings poor
  const poorRatings = (customersProduct.product?.reviews || []).filter(
    (review) => review.star === 0.5 || review.star === 1 || review.star === 0
  );
  const totalPoorRatings = poorRatings.length;

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
                  {customersProduct.product?.brand}
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
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {customersProduct.product?.title}
              </a>
            </li>
          </ol>
        </nav>

        {/* product details */}
        <section className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 px-4 pt-10">
          {/* Image gallery */}
          <div className="flex flex-col items-center ">
            <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
              <img
                src={activeImage?.src || customersProduct.product?.imageUrl}
                alt={product.images[0].alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="flex flex-wrap space-x-5 justify-center">
              {product.images.map((image, index) => (
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
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="lg:col-span-1 mx-auto max-w-2xl px-4 pb-16 sm:px-6  lg:max-w-7xl  lg:px-8 lg:pb-24">
            <div className="lg:col-span-2">
              <h1 className="text-lg lg:text-xl font-semibold tracking-tight text-black-700">
                {customersProduct.product?.title}
              </h1>
              <h1 className="text-sm tracking-tight text-gray-900 opacity-60 pt-1">
                {customersProduct.product?.brand}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>

              {customersProduct.product?.status === 1 ? (
                <p className="text-lg text-red-600 font-semibold mt-3">
                  Out of stock
                </p>
              ) : (
                <div className="flex space-x-5 items-center text-lg lg:text-xl tracking-tight text-gray-900 mt-6">
                  <p className="font-semibold text-red-500">
                    ${customersProduct.product?.discountedPrice}
                  </p>
                  {customersProduct.product?.price !== 0 &&
                    customersProduct.product?.price !==
                      customersProduct.product?.discountedPrice && (
                      <p className="opacity-50 line-through">
                        ${customersProduct.product?.price}
                      </p>
                    )}

                  {customersProduct.product?.discountPersent !== 0 && (
                    <p className="text-green-600 font-semibold">
                      {customersProduct.product?.discountPersent}% Off
                    </p>
                  )}
                </div>
              )}

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
                    {customersProduct.product?.reviews.length} Ratings
                  </p>
                  <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {customersProduct.product?.reviews.length} reviews
                  </p>
                </div>
              </div>

              {customersProduct.product?.status === 1 ? (
                <p className="text-xs text-red-600 font-semibold"></p>
              ) : (
                <form className="mt-10" onSubmit={handleSubmit}>
                  {/* Sizes */}
                  <div className="mt-10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">
                        Size
                      </h3>
                    </div>

                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="mt-4"
                    >
                      <RadioGroup.Label className="sr-only">
                        Choose a size
                      </RadioGroup.Label>
                      <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-10">
                        {product.sizes.map((size) => (
                          <RadioGroup.Option
                            key={size.name}
                            value={size}
                            disabled={!size.inStock}
                            className={({ active }) =>
                              classNames(
                                size.inStock
                                  ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                  : "cursor-not-allowed bg-gray-50 text-gray-200",
                                active ? "ring-1 ring-indigo-500" : "",
                                "group relative flex items-center justify-center rounded-md border py-1 px-1 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                              )
                            }
                          >
                            {({ active, checked }) => (
                              <>
                                <RadioGroup.Label as="span">
                                  {size.name}
                                </RadioGroup.Label>
                                {size.inStock ? (
                                  <span
                                    className={classNames(
                                      active ? "border" : "border-2",
                                      checked
                                        ? "border-indigo-500"
                                        : "border-transparent",
                                      "pointer-events-none absolute -inset-px rounded-md"
                                    )}
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                  >
                                    <svg
                                      className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                      viewBox="0 0 100 100"
                                      preserveAspectRatio="none"
                                      stroke="currentColor"
                                    >
                                      <line
                                        x1={0}
                                        y1={100}
                                        x2={100}
                                        y2={0}
                                        vectorEffect="non-scaling-stroke"
                                      />
                                    </svg>
                                  </span>
                                )}
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ padding: ".8rem 2rem", marginTop: "2rem" }}
                  >
                    Add To Cart
                  </Button>
                </form>
              )}
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {product.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">
                    {customersProduct.product?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* rating and review section */}
        <section className="">
          <h1 className="font-semibold text-lg pb-4">
            Recent Review & Ratings
          </h1>

          <div className="border p-5">
            <Grid container spacing={7}>
              <Grid item xs={7}>
                <div className="space-y-5">
                  {customersProduct.product?.reviews.map((item, i) => (
                    <ProductReviewCard item={item} />
                  ))}
                </div>
              </Grid>

              <Grid item xs={5}>
                <h1 className="text-xl font-semibold pb-1">Product Ratings</h1>
                <div className="flex items-center space-x-3 pb-10">
                  <Rating
                    name="read-only"
                    value={averageRating}
                    precision={0.5}
                    readOnly
                  />

                  <p className="opacity-60">
                    {customersProduct.product?.reviews.length} Ratings
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
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={
                          (totalExcellentRatings /
                            customersProduct.product?.reviews.length) *
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
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={
                          (totalVeryGoodRatings /
                            customersProduct.product?.reviews.length) *
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
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={
                          (totalGoodRatings /
                            customersProduct.product?.reviews.length) *
                          100
                        }
                        color="orange"
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
                          (totalAverageRatings /
                            customersProduct.product?.reviews.length) *
                          100
                        }
                        color="success"
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
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={
                          (totalPoorRatings /
                            customersProduct.product?.reviews.length) *
                          100
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

        {/* similer product */}

        <section className=" pt-10">
          <h1 className="py-5 text-xl font-bold">Similer Products</h1>
          <div className="flex flex-wrap space-y-5">
            {similarProducts.slice(0, 20).map((item) => (
              <HomeProductCard product={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
