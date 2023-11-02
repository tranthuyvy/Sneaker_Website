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
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import errorMessagesEn from "../../../Lang/en.json";
import errorMessagesVi from "../../../Lang/vi.json";
import { useSelector } from "react-redux";
import axios from "../../../config/axios";
import DeleteIcon2 from "@mui/icons-material/Delete";
import axiosApiInstance from "../../../config/api";
import { format } from "date-fns";


const WarehouseDetail = () => {
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
    const id = useParams().id;
    const fetchApi = async () => {
        try {

            let res = await axios.get(`/api/v1/product-batch/get?id_product_batch=${id}`);
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
        setSearch(value)
        filterProduct(value)
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
                <div className="hidden md:block flex-grow" style={{ float: "right", width: "450px", fontSize: "1.2rem", marginTop: "30px", marginBottom: "30px" }}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ flex: 2, fontWeight: "bold" }}>Supplier:</div>
                        <div style={{ flex: 2 }}>{listProduct && listProduct.id_supplier_supplier && listProduct.id_supplier_supplier.name}</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ flex: 2, fontWeight: "bold" }}>Receipt_Code:</div>
                        <div style={{ flex: 2 }}>{listProduct.id} </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ flex: 2, fontWeight: "bold" }}>Date:</div>
                        <div style={{ flex: 2 }}>{listProduct.create_at && format(
                            new Date(listProduct.create_at),
                            "dd/MM/yyyy"
                        )}</div>
                    </div>
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listProduct && listProduct.product_batch_items && listProduct.product_batch_items.length > 0 && listProduct.product_batch_items.map((item, index) => (
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
                                        {item.id_product_detail_product_detail.id_product_product.name}
                                    </TableCell>
                                    <TableCell style={{ textAlign: "center" }}>
                                        {item.id_product_detail_product_detail.size}
                                    </TableCell>
                                    <TableCell style={{ textAlign: "center" }}>
                                        {item.quantity}
                                    </TableCell>


                                    <TableCell sx={{ textAlign: "center" }}>
                                        {item.import_price}
                                    </TableCell>

                                    <TableCell sx={{ textAlign: "center" }}>
                                        $ {Number(item.quantity) * Number(item.import_price)}
                                    </TableCell>


                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
            {

                listProduct && listProduct.product_batch_items && listProduct.product_batch_items.length > 0 && listProduct.product_batch_items.map((item, index) => {
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

            </div>
        </Box >
    );
};

export default WarehouseDetail;
