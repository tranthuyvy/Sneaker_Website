import React, { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardHeader,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Avatar,
    Pagination,
    Button,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../config/api";
import { toast, ToastContainer } from "react-toastify";
import errorMessagesEn from "../../../Lang/en.json";
import errorMessagesVi from "../../../Lang/vi.json";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, MenuItem } from "@mui/material";

function ApplyDiscount() {
    const navigate = useNavigate();
    const [value, setValue] = useState("");
    const [type, setType] = useState("");
    const [expirationDate, setExpirationDate] = useState(null);
    const [valueError, setValueError] = useState("");
    const [typeError, setTypeError] = useState("");
    const [expirationDateError, setExpirationDateError] = useState("");
    const [search, setSearch] = useState([]);
    const [result, setResult] = useState([]);
    const [select, setSelect] = useState([])
    const [listSelect, setListSelect] = useState([])
    const [listDiscountProduct, setListDiscountProduct] = useState([]);
    const [listProduct, setListProduct] = useState([])
    const lang = useSelector((state) => state);
    const errorMessages = lang === "vi" ? errorMessagesVi : errorMessagesEn;


    const id_discount = useParams().id;

    useEffect(() => {
        fetchApiDiscount()
        fetchApi()
    }, [])
    const fetchApiDiscount = async () => {
        const res = await api.get(`/api/v1/discount/apply/get?id=${id_discount}`);
        if (res && res.data && res.data.data) {
            setListDiscountProduct(res.data.data)
        }
    }
    const fetchApi = async (value) => {
        const res = await api.get("/api/v1/product/get");
        console.log(res);
        if (res && res.data && res.data.data) {
            setListProduct(res.data.data)
        }
    }
    const filterProduct = (value) => {
        if (!value) {
            setResult([])
        } else {
            const result = listProduct.filter((item, index) => {
                return item && item.name && item.name.toLowerCase().includes(value)
            })
            console.log("Result: ", result);
            setResult(result)
        }
    }
    const handleOnChange = (value) => {
        setSearch(value)
        console.log(value);
        filterProduct(value);
    }

    const handleSelect = (pro) => {
        console.log(pro);
        const isDuplicate = listSelect.some((item) => item.id === pro.id);
        if (!isDuplicate) {
            setListSelect([...listSelect, pro]);
        }
    }

    const handleRemoveSelect = (pro) => {
        const updatedListSelect = listSelect.filter(item => item.id !== pro.id);
        setListSelect(updatedListSelect);
    }

    const handleApply = async () => {
        if (listSelect.length > 0) {
            try {
                let res = await api.post(`/api/v1/discount/apply?id=${id_discount}`, { listProduct: listSelect });
                console.log(res);
                toast.success(errorMessages[res.data.code], {
                    autoClose: 1000,
                });
                fetchApiDiscount()
                setListSelect([])
                // navigate("/admin/products");
            } catch (error) {
                if (error.response && error.response.status === 500) {
                    toast.error(errorMessages[error.response.data.code], {
                        autoClose: 1000,
                    });
                } else {
                    //     const accountErrorCode = "103";
                    //     toast.error(errorMessages[accountErrorCode], {
                    //         autoClose: 1000,
                    //     });
                }
            }
        }
    }

    const handleDelete = async (id) => {

        try {
            let res = await api.delete(`/api/v1/discount/apply/delete?id=${id}`);
            console.log(res);
            toast.success(errorMessages[res.data.code], {
                autoClose: 1000,
            });
            fetchApiDiscount()
            // navigate("/admin/products");
        } catch (error) {
            if (error.response && error.response.status === 500) {
                toast.error(errorMessages[error.response.data.code], {
                    autoClose: 1000,
                });
            } else {
                //     const accountErrorCode = "103";
                //     toast.error(errorMessages[accountErrorCode], {
                //         autoClose: 1000,
                //     });
            }
        }

    }
    return (
        <React.Fragment>
            <div style={{ fontSize: "1.2rem" }} className="mt-3">
                Tìm sản phẩm để khuyến mãi:
            </div>
            <form className="hidden md:block flex-grow max-w-sm">
                <div className="relative w-full">
                    <input
                        type="search"
                        className="block w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 focus:text-gray-900 sm:text-sm"
                        style={{ color: "black" }}
                        placeholder="Search"
                        value={search}
                        onChange={(e) => handleOnChange(e.target.value)}
                    />

                    <div className="absolute inset-y-0 left-0 flex items-center justify-center pl-3">
                        <svg
                            className="h-5 w-5 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.716 14.966A7.25 7.25 0 1114.35 8.33a7.25 7.25 0 01-6.634 6.635zM15.5 9.75a5.75 5.75 0 10-11.5 0 5.75 5.75 0 0011.5 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>

                </div>
                <div style={{ minHeight: "20px" }}>
                    <ol>
                        {result.map((item, index) => (

                            <li key={index} style={{ display: "flex", backgroundColor: "white", color: "black", border: "1px solid green", overflow: "auto", whiteSpace: "nowrap", padding: "6px", cursor: "pointer", fontWeight: "bold" }}
                                onClick={() => handleSelect(item)}
                            > {index} - Id: {item.id} Name: {item.name}</li>
                        ))}
                    </ol>
                </div>
            </form >
            {console.log(listSelect)}
            <div className="my-3" style={{ fontSize: "1.2rem" }}>Sản phẩm áp dụng khuyến mãi: </div>
            <div style={{ border: "1px solid green" }
            } >
                {
                    listSelect.map((item, index) => {
                        return (<div style={{ display: "flex", position: "relative" }} >
                            <div style={{ backgroundColor: "white", color: "black", width: "500px", padding: "6px", border: "1px solid green" }}>Id: {item.id}  Name: {item.name} </div>&nbsp; <div onClick={() => handleRemoveSelect(item)} style={{ color: "red", cursor: "pointer", position: "absolute", top: "0", left: "480px" }}>X</div></div>
                        )
                    })
                }</div >
            {/* {result} */}
            {/* <div>{selectProduct}</div> */}
            <Button
                color="info"
                variant="contained"
                onClick={() => handleApply()}
            >
                Apply
            </Button>
            <div style={{ fontSize: "1.2rem" }} className="mt-3">
                Những sản phẩm đã áp dụng:
            </div>
            <TableContainer>
                <Table sx={{ minWidth: 390 }} aria-label="table in dashboard">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ textAlign: "center" }}>Id</TableCell>
                            <TableCell style={{ textAlign: "center" }}>Image</TableCell>
                            <TableCell style={{ textAlign: "center" }}>Name</TableCell>
                            <TableCell style={{ textAlign: "center" }}>Price</TableCell>
                            <TableCell style={{ textAlign: "center" }}>Brand</TableCell>
                            <TableCell style={{ textAlign: "center" }}>Category</TableCell>
                            <TableCell style={{ textAlign: "center" }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listDiscountProduct.map((discount, index) => (

                            <TableRow
                                hover
                                key={discount.id}
                                sx={{
                                    "&:last-of-type td, &:last-of-type th": { border: 0 },
                                }}
                            >
                                <TableCell style={{ textAlign: "center" }}>
                                    {discount.id_product}
                                </TableCell>
                                <TableCell style={{ textAlign: "center" }}>
                                    <div >
                                        <img
                                            className="w-[3rem] lg:w-[3rem] rounded-md"
                                            src={discount?.id_product_product && discount.id_product_product?.images && discount.id_product_product.images[0]?.link}
                                            alt=""
                                        />
                                    </div>
                                </TableCell>
                                <TableCell style={{ textAlign: "center" }}>
                                    {discount.id_product_product.name}
                                </TableCell>

                                <TableCell style={{ textAlign: "center" }}>
                                    {discount.id_product_product.product_price}
                                </TableCell>

                                {console.log(discount)}

                                <TableCell sx={{ textAlign: "center" }}>
                                    {discount.id_product_product.id_branch_branch.name}

                                </TableCell>

                                <TableCell sx={{ textAlign: "center" }}>
                                    {discount.id_product_product.id_category_category.name}
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                    <Button onClick={() => handleDelete(discount.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* {listDiscountProduct.map((item, index) => {
                console.log("Name test: ", item)
                return (
                    <div style={{ display: "flex" }}>
                        <div>{item.id_product}</div>
                        <div>{item.id_product_product.name}</div>
                    </div>
                )
            })} */}
        </React.Fragment >
    );
}

export default ApplyDiscount;
