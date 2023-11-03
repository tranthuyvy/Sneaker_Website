import React, { useState, useEffect } from "react";
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
    Pagination,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Input,
    TextField,
    FormLabel,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import errorMessagesEn from "../../../Lang/en.json";
import errorMessagesVi from "../../../Lang/vi.json";
import { useSelector } from "react-redux";
import axios from "../../../config/axios";
import DeleteIcon2 from "@mui/icons-material/Delete";
import axiosApiInstance from "../../../config/api";


const ImportWarehouse = () => {
    const navigate = useNavigate();
    const [warehouse, setWarehouse] = useState([]);
    const [search, setSearch] = useState([])
    const [listProduct, setListProduct] = useState([])
    const [result, setResult] = useState([])
    const [listSelect, setListSelect] = useState([]);
    const [listSupplier, setListSupplier] = useState([]);
    const [id_supplier, setIdSupplier] = useState([]);
    const [productBatchName, setProductBatchName] = useState("")
    const [id_list_select, setIdListSelect] = useState(0)
    const pageSize = 8;

    const lang = useSelector((state) => state);
    const errorMessages = lang === "vi" ? errorMessagesVi : errorMessagesEn;

    const fetchApi = async () => {
        try {

            let res = await axios.get("/api/v1/product/get");
            console.log("res: ", res);
            if (res && res.data && res.data.data) {
                setListProduct(res.data.data)
            }
        } catch (e) {
            console.log(e);
            toast.error(errorMessages["006"], {
                autoClose: 900,
            });
        }

    };

    const fetchApiSupplier = async () => {
        try {

            let res = await axios.get("/api/v1/supplier/get");
            console.log("res: ", res);
            if (res && res.data && res.data.data) {
                setListSupplier(res.data.data)
            }
        } catch (e) {
            console.log(e);
            toast.error(errorMessages["006"], {
                autoClose: 900,
            });
        }

    };
    useEffect(() => {
        // fetchApi(currentPage);
        fetchApiSupplier();
        fetchApi();
    }, []);

    const filterProduct = (value) => {
        if (!value) {
            setResult([])
        } else {
            console.log(listProduct);
            const result = listProduct.filter((item, index) => {
                return item && item.name && item.name.includes(value)
            })

            setResult(result)
        }
    }

    const handleSelect = (pro) => {
        // let duplication = listSelect.some((item) => item.id === pro.id)
        // if (!duplication) {
        let newIdListSelect = id_list_select + 1;

        setListSelect([...listSelect, { ...pro, id_list_select: newIdListSelect, quantity: "", id_product_detail: "", import_price: "", }])
        // }
        setIdListSelect(newIdListSelect);
        console.log(listSelect);
    }

    const handleOnChange = (value) => {
        let a = value.toLowerCase();//Nhập vào chữ biến thành chữ thường
        setSearch(a)
        filterProduct(a)
    }

    const handleInputChange = (id, event, name) => {
        const newInputs = listSelect.map(item => {
            let value = event.target.value
            if (item.id_list_select === id) {
                if (name == "size") {
                    console.log("Check id_product_detail: ", event.target);
                    return { ...item, id_product_detail: event.target.value };
                }
                if (name == "quantity") {
                    if (isNaN(value) || value.includes(".") || value.includes(" ")) {
                        return item;
                    }
                    return { ...item, quantity: event.target.value };
                }
                if (name == "price") {
                    if (isNaN(value) || value.includes(".") || value.includes(" ")) {
                        return item;
                    }
                    return { ...item, import_price: event.target.value };
                }
            }
            return item;
        });
        // setInputs(newInputs);
        setListSelect(newInputs)
    };

    // const handleAddInput = () => {
    //     const newInputId = idSize + 1;
    //     setIdSize(idSize + 1)
    //     setInputs([...inputs, { id: newInputId, value: '' }]);
    // };
    const handleRemoveItemListSelect = (id) => {
        const newInputs = listSelect.filter(item => item.id_list_select != id);
        setListSelect(newInputs);
    }

    const handleImport = async () => {
        console.log("Test xem list select: ", listSelect);
        if (listSelect.length > 0) {
            try {
                let res = await axiosApiInstance.post(`http://localhost:8081/api/v1/product-batch/create`, { arrProductBatch: listSelect, id_supplier, name: productBatchName });
                console.log(res);
                toast.success(errorMessages[res.data.code], {
                    autoClose: 1000,
                });
                // fetchApiDiscount(currentPage)
                // setListSelect([])
                navigate("/admin/warehouse");
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

    let quantity = 0;
    let total = 0;
    return (
        <Box>
            <Card>
                {/* <CardHeader
                    title={ */}
                <div className="hidden md:block flex-grow max-w-sm" style={{ marginLeft: "20px", marginTop: "20px" }}>
                    <div className="relative w-full">
                        <input
                            type="search"
                            className="block w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 focus:text-gray-900 sm:text-sm"
                            style={{ color: "black" }}
                            placeholder="Search"
                            // value={search}
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

                                <li
                                    // key={index}
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
                    <FormControl fullWidth style={{ marginTop: "200px" }}>

                        <InputLabel id="demo-simple-select-label">Select supplier</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={id_supplier}
                            label="Age"
                            onChange={(e) => setIdSupplier(e.target.value)}
                        >
                            {listSupplier.length > 0 && listSupplier.map((item, indexDetail) => {
                                return (
                                    <MenuItem value={item.id}
                                    // onClick={() => handleClick(detail.id, item.id)}
                                    >{item.name}</MenuItem>
                                )
                            })}
                        </Select>
                        <TextField className="my-3" label="Product Batch Name" variant="outlined"
                            value={productBatchName}
                            onChange={(e) => setProductBatchName(e.target.value)}
                        />
                    </FormControl>




                </div>
                {/* } */}
                {/* sx={{ pt: 2, "& .MuiCardHeader-action": { mt: 0.6 } }} */}
                {/* /> */}

                <TableContainer>
                    <Table sx={{ minWidth: 390 }} aria-label="table in dashboard">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ textAlign: "center" }}>Id</TableCell>
                                <TableCell style={{ textAlign: "center" }}>Product Name</TableCell>
                                <TableCell style={{ textAlign: "center" }}>Size</TableCell>
                                <TableCell style={{ textAlign: "center" }}>Quantity</TableCell>
                                <TableCell style={{ textAlign: "center" }}>Price</TableCell>
                                <TableCell style={{ textAlign: "center" }}>Total</TableCell>
                                <TableCell style={{ textAlign: "center" }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listSelect && listSelect.map((item, index) => (
                                <TableRow
                                    hover
                                    // key={item.id}
                                    sx={{
                                        "&:last-of-type td, &:last-of-type th": { border: 0 },
                                    }}
                                >
                                    <TableCell style={{ textAlign: "center" }}>
                                        {item.id}
                                    </TableCell>

                                    {/* <TableCell style={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
                                        <img src={item.product_batch_items
                                            && item.product_batch_items[0].id_product_detail_product_detail
                                            && item.product_batch_items[0].id_product_detail_product_detail.id_product_product
                                            && item.product_batch_items[0].id_product_detail_product_detail.id_product_product.images
                                            && item.product_batch_items[0].id_product_detail_product_detail.id_product_product.images[0].link}
                                            width={"100px"}
                                            height={"100px"}
                                            style={{ borderRadius: "50%" }}
                                        />
                                    </TableCell> */}

                                    <TableCell style={{ textAlign: "center" }}>
                                        {item.name}
                                    </TableCell>
                                    <TableCell style={{ textAlign: "center" }}>
                                        <FormControl fullWidth>
                                            <InputLabel >Select Size</InputLabel>
                                            <Select


                                                value={item.id_product_detail}
                                                onChange={(e) => handleInputChange(item.id_list_select, e, "size")}
                                            // label="Age"
                                            >
                                                {/* <div style={{ overflowY: "scroll", height: "200px" }}> */}
                                                {item.product_details.length > 0 && item.product_details.map((detail, indexDetail) => {
                                                    return (
                                                        <MenuItem value={detail.id}
                                                        // onClick={() => handleClick(detail.id, item.id)}
                                                        >{detail.size}</MenuItem>
                                                    )
                                                })}
                                                {/* </div> */}
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell style={{ textAlign: "center" }}>
                                        <TextField value={item.quantity}
                                            onChange={e => handleInputChange(item.id_list_select, e, "quantity")}

                                        />
                                    </TableCell>


                                    <TableCell sx={{ textAlign: "center" }}>
                                        <TextField value={item.import_price}
                                            onChange={e => handleInputChange(item.id_list_select, e, "price")}
                                        />
                                    </TableCell>

                                    <TableCell sx={{ textAlign: "center" }}>
                                        $ {Number(item.quantity) * Number(item.import_price)}
                                    </TableCell>

                                    <TableCell sx={{ textAlign: "center" }}>
                                        <DeleteIcon2 style={{ color: "red" }} className="cursor-pointer"
                                            onClick={() => handleRemoveItemListSelect(item.id_list_select)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
            {

                listSelect.map((item, index) => {
                    quantity += Number(item.quantity);
                    total += (Number(item.quantity) * Number(item.import_price));
                })}
            <div style={{ float: "right", width: "450px", marginTop: "30px", fontSize: "1.2rem" }}>
                <div style={{ display: "flex" }}>
                    <div style={{ flex: 2, fontWeight: "bold" }}>Quantity:</div>
                    <div style={{ flex: 2 }}>{quantity}</div>
                </div>
                <div style={{ display: "flex", marginTop: "20px" }}>
                    <div style={{ flex: 2, fontWeight: "bold" }}>Total:</div>
                    <div style={{ flex: 2 }}>$ {total}</div>
                </div>
                <Button variant="contained" color="success" onClick={() => handleImport()} style={{ fontSize: "1.75rem", fontWeight: "bold", marginTop: "20px" }} >Import</Button>
            </div>
        </Box >
    );
};

export default ImportWarehouse;
