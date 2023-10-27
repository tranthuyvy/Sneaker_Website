import {
    Button,
    Divider,
    Grid,
    Rating,
    TextField,
    Typography,
    useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getAllReviews } from "../../../Redux/Customers/Review/Action";
// import { findProductById } from "../../../Redux/Customers/Product/Action";
import { format } from "date-fns";
import { Box, Avatar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import api from '../../../config/api'
import errorMessagesEn from "../../../Lang/en.json";
import errorMessagesVi from "../../../Lang/vi.json";
import { toast, ToastContainer } from "react-toastify";

const DetailProduct = () => {
    const isLargeScreen = useMediaQuery("(min-width:1200px)");
    const { productId } = useParams();
    const jwt = localStorage.getItem("jwt");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const lang = useSelector((state) => state);
    const errorMessages = lang === "vi" ? errorMessagesVi : errorMessagesEn;
    // const { customersProduct } = useSelector((store) => store);
    const [customersProduct, setCustomersProduct] = useState([])
    const [listReview, setListReview] = useState([])
    const [inputs, setInputs] = useState([{ id: 1, value: '' }]);
    const [idSize, setIdSize] = useState(1)
    //user Params
    let id = useParams().id;
    console.log(">>> Check id: ", id);
    useEffect(() => {
        const data = { productId: Number(productId), jwt };
        fetchApi();
        fetchApiReview();
    }, [productId]);

    const fetchApi = async () => {
        let res = await api.get(`/api/v1/product/get?id=${id}`);
        console.log("Check update data: ", res.data);
        if (res.data && res.data.data) {
            setCustomersProduct(res.data.data)
        }
    }
    const fetchApiReview = async () => {
        let res = await api.get(`/api/v1/review/get?id_product=${id}`);
        console.log("Check review data: ", res.data);
        if (res && res.data) {
            setListReview(res.data.data)
        }
    }
    const [value, setValue] = React.useState(4.5);

    const totalRatings = (customersProduct.product?.reviews || []).reduce(
        (total, review) => total + review.star,
        0
    );
    const averageRating = totalRatings / customersProduct.product?.reviews.length;

    //----------------Xử lý cho input size-----------------------------
    const handleRemoveInput = (id) => {
        const newInputs = inputs.filter(input => input.id !== id);
        setInputs(newInputs);
    };
    const handlePrintValues = async () => {
        let check = true;
        for (let i = 0; i < inputs.length; i++) {
            const item = inputs[i];
            if (!item.value) {
                check = false;
                alert("Bạn nhập thiếu!");
                break; // Dừng vòng lặp khi gặp một giá trị không hợp lệ
            }
        }
        if (check) {
            for (let i = 0; i < inputs.length; i++) {
                const item = inputs[i];
                console.log(`Input ID: ${item.id}, Value: ${item.value}`);
                //Gọi api thêm 
                try {
                    const response = await api.post("/api/v1/product_detail/create", {
                        idProduct: id,
                        size: item.value,
                    });
                    if (response && (response.status === 200)) {
                        toast.success(errorMessages["008"], {
                            autoClose: 1000,
                        });
                        dispatch({ type: "LANG_ENG" });
                        fetchApi();
                        setInputs([{ id: 1, value: '' }]);
                        //   navigate("/admin/supplier");
                    }
                } catch (error) {
                    if (error.response && (error.response.status === 500)) {
                        toast.error(errorMessages[error.response.data.code], {
                            autoClose: 1000,
                        });
                    } else {
                        toast.error(errorMessages["103"], {
                            autoClose: 1000,
                        });
                    }
                }
            }
        }

    };
    const handleInputChange = (id, event) => {
        const newInputs = inputs.map(input => {
            if (input.id === id) {
                return { ...input, value: event.target.value };
            }
            return input;
        });
        setInputs(newInputs);
    };

    const handleAddInput = () => {
        const newInputId = idSize + 1;
        setIdSize(idSize + 1)
        setInputs([...inputs, { id: newInputId, value: '' }]);
    };
    const renderInputs = () => {
        return inputs.map((input, index) => (
            <div key={input.id} style={{ display: "flex", flexDirection: "row" }} className="my-3">
                <input
                    value={input.value}
                    onChange={e => handleInputChange(input.id, e)}
                    style={{ color: "red" }}
                />
                <AddCircleOutlineIcon style={{ color: "lightgreen" }} className="mx-3 cursor-pointer " onClick={handleAddInput} />
                {index > 0 && (
                    <DeleteIcon style={{ color: "red" }} className="cursor-pointer" onClick={() => handleRemoveInput(input.id)} />
                    // <button onClick={() => handleRemoveInput(input.id)}>DeleteIcon</button>
                )}
            </div>
        ));
    };

    const calStar = (list) => {
        let sum = 0;
        for (let i = 0; i < list.length; i++) {

            sum += list[i].star
        }
        return sum / list.length;
    }

    //----------------Xử lý cho input size-----------------------------
    return (
        <div className="px-5 lg:px-20">
            <h1 className="text-xl p-5 shadow-lg mb-8 font-bold text-center">
                PRODUCT DETAIL
            </h1>
            <Grid sx={{ justifyContent: "space-between" }} container>
                <Grid
                    className="flex lg:items-center shadow-lg border rounded-md p-5"
                    item
                    xs={12}
                    lg={8}
                >
                    <div>
                        <img
                            className="w-[5rem] lg:w-[15rem] rounded-md"
                            src={customersProduct?.images && customersProduct.images[0]?.link}
                            alt=""
                        />
                    </div>

                    <div className="ml-3 lg:ml-5 space-y-2 lg:space-y-4">
                        <p className="lg:text-lg font-bold">
                            {customersProduct?.name}
                        </p>
                        <p className="opacity-50 font-semibold text-sm">
                            {customersProduct?.id_branch_branch && customersProduct.id_branch_branch.name}
                        </p>

                        <div className="flex space-x-2 items-center">
                            {/* <p className="text-red-600 font-semibold text-lg">
                                ${customersProduct?.product_price}
                            </p> */}
                            {/* {
                                <p className="opacity-50 line-through">
                                    ${customersProduct?.product_price}
                                </p>
                            } */}
                            {
                                <p className="text-green-600 font-semibold">
                                    $ {customersProduct?.product_price}
                                </p>
                            }
                        </div>
                        <p className="font-semibold text-sm">
                            Size:&nbsp;
                            {customersProduct?.product_details && customersProduct.product_details.map((item, index) => {
                                return (
                                    item.size + " "
                                )
                            })
                            }
                        </p>

                        <div className="flex items-center space-x-3">
                            <Rating
                                name="read-only"
                                value={listReview && listReview.length > 0 && calStar(listReview)}
                                precision={0.5}
                                readOnly
                            />

                            <p className="opacity-60 text-sm hover:text-indigo-500">
                                {listReview && listReview.length > 0 && calStar(listReview)} Ratings
                            </p>
                            <p className="ml-3 text-sm font-medium hover:text-indigo-500">
                                {listReview && listReview.length} reviews
                            </p>
                        </div>
                    </div>

                </Grid>

                <Grid item xs={12} lg={4}>
                    <div className={`${!isLargeScreen ? "py-10" : ""} space-y-5`}>
                        <div className="shadow-md border rounded-md p-5" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            <Typography className="font-semibold" component="legend">
                                {listReview && listReview.length > 0 ?
                                    (listReview.map((item) => (
                                        <div className="p-5">
                                            <Grid container spacing={2} gap={4}>
                                                <Grid item xs={1}>
                                                    <Box>
                                                        <Avatar
                                                            className="text-white"
                                                            sx={{ width: 40, height: 40, bgcolor: "#9155FD" }}
                                                            // alt={item.user.firstName}
                                                            src="item."
                                                        >
                                                            {/* {item.user.firstName[0].toUpperCase()} */}
                                                        </Avatar>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={9}>
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between">
                                                            <p className="font-semibold text-lg">
                                                                {item?.id_user_user && item.id_user_user.name}
                                                            </p>
                                                            <p className="opacity-70 mt-1">
                                                                {format(new Date(item.create_at), "dd/MM/yyyy")}
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
                                                        <p>{item.comment}</p>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                            <div className="col-span-1 flex"></div>
                                        </div>
                                    ))) : (
                                        <p className="text-center font-semibold" style={{ color: "yellow" }}>Product has not been reviewed</p>
                                    )}
                            </Typography>
                        </div>
                    </div>

                </Grid>

            </Grid>
            <Grid className="shadow-md border rounded-md p-5">
                <div className="mt-3"> NHẬP SIZE:</div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    {/* {renderInputs()}<div onClick={handleAddInput}>Thêm</div> */}
                </div>
                <div>{renderInputs()}</div>
                <Button
                    onClick={() => handlePrintValues()}
                    variant="contained"
                    color="primary"
                >
                    ADD SIZE
                </Button>

            </Grid>
        </div>

    );
};

export default DetailProduct;
