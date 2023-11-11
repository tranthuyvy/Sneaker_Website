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
import { format } from "date-fns";

function ApplyDiscount() {
    const navigate = useNavigate();
    const [value, setValue] = useState("");
    const [type, setType] = useState("");
    const [expirationDate, setExpirationDate] = useState(null);
    const [valueError, setValueError] = useState("");
    const [typeError, setTypeError] = useState("");
    const [expirationDateError, setExpirationDateError] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 5;

    const [search, setSearch] = useState([]);
    const [result, setResult] = useState([]);
    const [select, setSelect] = useState([])
    const [listSelect, setListSelect] = useState([])
    const [listDiscountProduct, setListDiscountProduct] = useState([]);
    const [listProduct, setListProduct] = useState([]);
    const [discountDetail, setDiscountDetail] = useState("");
    const lang = useSelector((state) => state);
    const errorMessages = lang === "vi" ? errorMessagesVi : errorMessagesEn;


    const id_discount = useParams().id;

    useEffect(() => {
        fetchApiDiscount(currentPage)
        fetchApi()
        fetchApiDiscountDetail()
    }, [])
    const fetchApiDiscount = async (page) => {
        const res = await api.get(`/api/v1/discount/apply/get?id=${id_discount}&page=${page}&pageSize=${pageSize}`);
        if (res && res.data && res.data.data) {
            console.log("total: ", res.data);
            setCurrentPage(page);
            setTotalPages(res.data.totalPage);
            setListDiscountProduct(res.data.data)
        }
    }
    const fetchApi = async (value) => {
        const res = await api.get("/api/v1/product/get");
        if (res && res.data && res.data.data) {
            setListProduct(res.data.data)
        }
    }
    const fetchApiDiscountDetail = async () => {
        const res = await api.get(`/api/v1/discount/get?id=${id_discount}`);

        if (res && res.data && res.data.data) {
            console.log("Của discount: ", res);
            setDiscountDetail(res.data.data)
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
        let a = value.toLowerCase();//Nhập vào chữ biến thành chữ thường
        setSearch(a)
        console.log(a);
        filterProduct(a);
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
                fetchApiDiscount(currentPage)
                setListSelect([])
                // navigate("/admin/products");
            } catch (e) {
                if (e && e.response && e.response.data && e.response.data.code) {
                    toast.error(errorMessages[e.response.data.code], {
                        autoClose: 1000,
                    });
                }
            }
        } else {
            toast.error(errorMessages["009"], {
                autoClose: 1000,
            });
        }
    }
    const handlePaginationChange = (event, page) => {
        fetchApiDiscount(page);
    };

    const handleDelete = async (id) => {

        try {
            let res = await api.delete(`/api/v1/discount/apply/delete?id=${id}`);
            console.log(res);
            toast.success(errorMessages[res.data.code], {
                autoClose: 1000,
            });
            fetchApiDiscount(currentPage)
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
            <div style={{
                // border: "1px solid white", 
                display: "flex", justifyContent: "space-between"
            }}>
                <div style={{ flex: 7 }}></div>
                <div style={{ border: "1px solid white", flex: 3, padding: "10px" }}>
                    <div>Code: {discountDetail.id}</div>
                    <div>Value: {discountDetail.value}</div>
                    <div>Type: {discountDetail.type == 1 ? "$" : "%"}</div>
                    <div>Start date:  {discountDetail.start_date &&
                        format(new Date(discountDetail.start_date), "dd/MM/yyyy")}</div>
                    <div>Expiration Date:   {discountDetail.expiration_date &&
                        format(new Date(discountDetail.expiration_date), "dd/MM/yyyy")}</div>
                </div>
            </div>
            <div style={{ fontSize: "1.2rem", fontWeight: "bold", fontStyle: "italic" }} className="my-3">
                {/* Tìm và chọn sản phẩm để khuyến mãi: */}
                Find and select products for promotion:
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

                <div style={{ height: "20px" }} >
                    <ul className="list-group overflow-y-auto" style={{ height: "200px", position: "relative", zIndex: 3 }}>
                        {result.map((item, index) => (

                            <li key={index}
                                className="list-group-item list-group-item-action cursor-pointer"
                                style={{ padding: "0.5rem" }}
                                onClick={() => handleSelect(item)}
                            >
                                <div
                                    style={{ display: "flex", backgroundColor: "white", color: "black" }}
                                >
                                    <div style={{ flex: 2.5 }}><b>{index + 1} - Id: </b><span style={{ color: "#a855f7" }}>{item.id}</span> </div>
                                    <div style={{ flex: 2 }}>  <b>Name:</b> <span style={{ color: "#a855f7" }}>{item.name}</span></div>
                                </div>
                                {/* <b>{index} - Id:</b>  <span style={{ color: "#a855f7" }}>{item.id}</span> <b>Name:</b> <span style={{ color: "#a855f7" }}>{item.name}</span> */}
                            </li>
                        ))}
                    </ul>
                </div>
            </form >

            {console.log(listSelect)}

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", border: "2px solid white", marginTop: "200px", }
            } >
                <div style={{
                    fontSize: "1.25rem",
                    lineHeight: "1.75rem",
                    fontWeight: "bold", marginTop: "20px",
                    marginBottom: "20px",
                    fontFamily: "system-ui",
                    textTransform: "uppercase"
                }}>
                    {/* Sản phẩm áp dụng khuyến mãi  */}
                    PROMOTION APPLICABLE PRODUCTS
                </div>
                {
                    listSelect.length > 0 ? listSelect.map((item, index) => {
                        return (
                            <div style={{ display: "flex", position: "relative" }} >
                                <div
                                    style={{ display: "flex", backgroundColor: "white", color: "black", width: "570px", padding: "8px", border: "1px solid green", borderRadius: "6px", margin: "6px" }}
                                >
                                    <div style={{ flex: 2.5 }}><b>{index + 1} - Id: </b><span style={{ color: "#a855f7" }}>{item.id}</span> </div>
                                    <div style={{ flex: 2 }}>  <b>Name:</b> <span style={{ color: "#a855f7" }}>{item.name}</span></div>
                                </div>&nbsp; <div onClick={() => handleRemoveSelect(item)} style={{ color: "red", cursor: "pointer", position: "absolute", top: "8px", left: "550px" }}>X</div>
                            </div>
                        )
                    }) : <div>
                        {/* Chưa chọn sản phẩm */}
                        Product has not been selected
                    </div>
                }
                <Button
                    color="primary"
                    style={{
                        fontSize: "1.125rem",
                        lineHeight: "1.75rem",
                        fontWeight: "bold",
                        color: "white",
                        marginTop: "20px",
                        marginBottom: "20px"
                    }}
                    // className="text-6xl"
                    variant="contained"
                    onClick={() => handleApply()}
                >
                    Apply
                </Button>
            </div >
            {/* {result} */}
            {/* <div>{selectProduct}</div> */}

            <div style={{
                fontSize: "1.25rem", marginTop: "50px", marginBottom: "20px",
                lineHeight: "1.75rem", textAlign: "center", fontWeight: "bold", fontFamily: "system-ui", textTransform: "uppercase"
            }} >
                {/* Sản phẩm đã áp dụng khuyến mãi */}
                Promotion has been applied to the product
            </div>
            <TableContainer style={{ border: "2px solid white" }}>
                <Table sx={{ minWidth: 390 }} aria-label="table in dashboard">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ textAlign: "center" }}>Num</TableCell>
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
                                    {index + 1}
                                </TableCell>
                                <TableCell style={{ textAlign: "center" }}>
                                    {discount.id_product}
                                </TableCell>
                                <TableCell style={{ textAlign: "center" }}>
                                    <div style={{ display: "flex", justifyContent: "center" }}>
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
            <Card className="mt-2 border">
                <div className="mx-auto px-4 py-5 flex justify-center shadow-lg rounded-md">
                    <Pagination
                        count={totalPages}
                        size="medium"
                        page={currentPage}
                        color="primary"
                        onChange={handlePaginationChange}
                        showFirstButton
                        showLastButton
                    />
                </div>
            </Card>
        </React.Fragment >
    );
}

export default ApplyDiscount;
