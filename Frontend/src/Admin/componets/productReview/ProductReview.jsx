import {
  Button,
  Divider,
  Grid,
  Rating,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviews } from "../../../Redux/Customers/Review/Action";
import { findProductById } from "../../../Redux/Customers/Product/Action";
import { format } from "date-fns";
import { Box, Avatar } from "@mui/material";

const ProductReviews = () => {
  const isLargeScreen = useMediaQuery("(min-width:1200px)");
  const { productId } = useParams();
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customersProduct } = useSelector((store) => store);

  useEffect(() => {
    const data = { productId: Number(productId), jwt };
    dispatch(findProductById(data));
    dispatch(getAllReviews(productId));
  }, [productId]);

  const [value, setValue] = React.useState(4.5);

  const totalRatings = (customersProduct.product?.reviews || []).reduce(
    (total, review) => total + review.star,
    0
  );
  const averageRating = totalRatings / customersProduct.product?.reviews.length;

  return (
    <div className="px-5 lg:px-20">
      <h1 className="text-xl p-5 shadow-lg mb-8 font-bold">
        Rate & Review Product
      </h1>
      <Grid sx={{ justifyContent: "space-between" }} container>
        <Grid
          className="flex lg:items-center shadow-lg border rounded-md p-5"
          item
          xs={12}
          lg={7.8}
        >
          <div>
            <img
              className="w-[5rem] lg:w-[15rem] rounded-md"
              src={customersProduct.product?.imageUrl}
              alt=""
            />
          </div>
          <div className="ml-3 lg:ml-5 space-y-2 lg:space-y-4">
            <p className="lg:text-lg font-bold">
              {customersProduct.product?.title}
            </p>
            <p className="opacity-50 font-semibold text-sm">
              {customersProduct.product?.brand}
            </p>

            <div className="flex space-x-2 items-center">
              <p className="text-red-600 font-semibold text-lg">
                ${customersProduct.product?.discountedPrice}
              </p>
              {customersProduct.product?.discountedPrice !==
                customersProduct.product?.price &&
                customersProduct.product?.price !== 0 && (
                  <p className="opacity-50 line-through">
                    ${customersProduct.product?.price}
                  </p>
                )}
              {customersProduct.product?.discountPersent !== 0 && (
                <p className="text-green-600 font-semibold">
                  {customersProduct.product?.discountPersent}% off
                </p>
              )}
            </div>
            <p className="font-semibold text-sm">
              Size: {customersProduct.product?.sizes[0].name}
            </p>
            {customersProduct.product?.color && (
              <p className="font-semibold text-sm">
                Color: {customersProduct.product?.color}
              </p>
            )}
            <div className="flex items-center space-x-3">
              <Rating
                name="read-only"
                value={averageRating}
                precision={0.5}
                readOnly
              />

              <p className="opacity-60 text-sm hover:text-indigo-500">
                {customersProduct.product?.reviews.length} Ratings
              </p>
              <p className="ml-3 text-sm font-medium hover:text-indigo-500">
                {customersProduct.product?.reviews.length} reviews
              </p>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} lg={4}>
          <div className={`${!isLargeScreen ? "py-10" : ""} space-y-5`}>
            <div className="shadow-md border rounded-md p-5" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <Typography className="font-semibold" component="legend">
                {customersProduct.product?.reviews && customersProduct.product?.reviews.length > 0 ?
                  (customersProduct.product?.reviews.map((item) => (
                    <div className="p-5">
                      <Grid container spacing={2} gap={4}>
                        <Grid item xs={1}>
                          <Box>
                            <Avatar
                              className="text-white"
                              sx={{ width: 40, height: 40, bgcolor: "#9155FD" }}
                              alt={item.user.firstName}
                              src=""
                            >
                              {item.user.firstName[0].toUpperCase()}
                            </Avatar>
                          </Box>
                        </Grid>
                        <Grid item xs={9}>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <p className="font-semibold text-lg">
                                {item.user.firstName}
                              </p>
                              <p className="opacity-70 mt-1">
                                {format(new Date(item.createdAt), "dd/MM/yyyy")}
                              </p>
                            </div>
                            <div>
                              <Rating
                                value={item.star}
                                onChange={(event, newValue) => {
                                  setValue(newValue);
                                }}
                                name="half-rating"
                                defaultValue={2.5}
                                precision={0.5}
                                readOnly
                              />
                            </div>
                            <p>{item.review}</p>
                          </div>
                        </Grid>
                      </Grid>
                      <div className="col-span-1 flex"></div>
                    </div>
                  ))):(
                    <p className="text-center font-semibold" style={{color:"yellow"}}>Product has not been reviewed</p>
                  )}
              </Typography>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductReviews;
