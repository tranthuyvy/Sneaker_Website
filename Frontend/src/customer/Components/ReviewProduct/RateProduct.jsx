import {
  Button,
  Divider,
  Grid,
  Rating,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../../../Redux/Customers/Review/Action";
import { useNavigate, useParams } from "react-router-dom";
import { findProductById } from "../../../Redux/Customers/Product/Action";
import { format } from "date-fns";

const RateProduct = () => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [rating, setRating] = useState();
  const isLargeScreen = useMediaQuery("(min-width:1200px)");
  const dispatch = useDispatch();
  const { customersProduct } = useSelector((store) => store);
  const { productId } = useParams();
  const navigate=useNavigate();

  const handleRateProduct = (e, value) => {
    console.log("rating ----- ", value);
    setRating(value);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formData);

    const reviewData = {
      review: formData.title,
      productId,
      star: rating
    };

    dispatch(createReview(reviewData))
    setFormData({title:"",description:""})
    navigate(`/product/${productId}`)

  };
  useEffect(() => {
    dispatch(findProductById({ productId }));
  }, []);

  //total ratings
  const totalRatings = (customersProduct.product?.reviews || []).reduce(
    (total, review) => total + review.star, 0
  );
  const averageRating = totalRatings / customersProduct.product?.reviews.length;

  return (
    <div className="px-5 lg:px-20">
      <h1 className="text-xl p-5 shadow-lg mb-8 font-bold">
        Rate & Review Product
      </h1>
      <Grid sx={{ justifyContent: "space-between" }} container>
        <Grid
          className="flex  lg:items-center shadow-lg border rounded-md p-5"
          item
          xs={12}
          lg={5.8}
        >
          <div>
            <img
              className="w-[5rem] lg:w-[15rem]"
              src={customersProduct.product?.imageUrl}
              alt=""
            />
          </div>
          <div className="ml-3 lg:ml-5 space-y-2 lg:space-y-4">
            <p className="lg:text-lg font-bold">{customersProduct.product?.title}</p>
            <p className="opacity-50 font-semibold text-xs">
              {customersProduct.product?.brand}
            </p>

            <div className='flex space-x-2 items-center'>
            <p className="text-red-600 font-bold">${customersProduct.product?.discountedPrice}</p>
            {
              customersProduct.product?.discountedPrice !== customersProduct.product?.price && customersProduct.product?.price !== 0 && (
                <p className='opacity-50 line-through'>${customersProduct.product?.price}</p>
              )
            }
            {
              customersProduct.product?.discountPersent !== 0 && (
                <p className='text-green-600 font-semibold'>{customersProduct.product?.discountPersent}% off</p>
              )
            }
        </div>
            <p className="font-semibold text-sm">Size: {customersProduct.product?.sizes[0].name}</p>
           {customersProduct.product?.color && <p className="font-semibold text-sm">Color: {customersProduct.product?.color}</p>}
            <div className="flex items-center space-x-3">
              <Rating name="read-only" 
                value={averageRating} 
                precision={0.5} 
                readOnly />

              <p className="opacity-60 text-sm">{customersProduct.product?.reviews.length} Ratings</p>
              <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
              {customersProduct.product?.reviews.length} reviews
              </p>
            </div>
            <div>
              <p className="space-y-2 font-semibold">
                <FiberManualRecordIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-green-600  mr-2"
                />
                <span className="text-xs">Your Item Has Been Delivered</span>
              </p>
              
            </div>
          </div>
        </Grid>
        <Grid item xs={12} lg={6}>
          <div className={`${!isLargeScreen ? "py-10" : ""} space-y-5`}>
            <div className="shadow-md border rounded-md p-5">
              <Typography className="font-semibold" component="legend">
                Rate This Product
              </Typography>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  handleRateProduct(event, newValue);
                }}
              />
            </div>
            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-5 shadow-md border rounded-md"
            >
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.title}
                onChange={handleChange}
                name="title"
              />
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
                name="description"
              />
              <Button type="submit" variant="contained" color="primary">
                Submit Review
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default RateProduct;
