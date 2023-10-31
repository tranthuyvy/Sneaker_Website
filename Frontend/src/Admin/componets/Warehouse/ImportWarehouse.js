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


const ImportWarehouse = () => {
    const navigate = useNavigate();
    const [warehouse, setWarehouse] = useState([]);
    //   const [currentPage, setCurrentPage] = useState(1);
    //   const [totalPages, setTotalPages] = useState(1);
    const pageSize = 8;

    const lang = useSelector((state) => state);
    const errorMessages = lang === "vi" ? errorMessagesVi : errorMessagesEn;

    const fetchApi = async (page) => {
        try {

            let res = await axios.get("/api/v1/product-batch/get");
            console.log("res: ", res);
            if (res && res.data && res.data.data) {
                setWarehouse(res.data.data)
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
        fetchApi();
    }, []);

    const handlePaginationChange = (event, page) => {
        // fetchSuppliers(page);
        fetchApi();
    };

    return (
        <Box>
            <Card>
                <CardHeader
                    title={
                        <div className="hidden md:block flex-grow max-w-sm">
                            <div className="relative w-full">
                                <input
                                    type="search"
                                    className="block w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 focus:text-gray-900 sm:text-sm"
                                    style={{ color: "black" }}
                                    placeholder="Search"
                                // value={search}
                                // onChange={(e) => handleOnChange(e.target.value)}
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
                        </div>
                    }
                    sx={{ pt: 2, "& .MuiCardHeader-action": { mt: 0.6 } }}
                />
                <TableContainer>
                    <Table sx={{ minWidth: 390 }} aria-label="table in dashboard">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ textAlign: "center" }}>Id</TableCell>
                                <TableCell style={{ textAlign: "center" }}>Image</TableCell>
                                <TableCell style={{ textAlign: "center" }}>Name</TableCell>
                                <TableCell style={{ textAlign: "center" }}>Total</TableCell>
                                <TableCell style={{ textAlign: "center" }}>Detail</TableCell>
                                <TableCell style={{ textAlign: "center" }}>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {warehouse.map((item, index) => (
                                <TableRow
                                    hover
                                    key={item.id}
                                    sx={{
                                        "&:last-of-type td, &:last-of-type th": { border: 0 },
                                    }}
                                >
                                    <TableCell style={{ textAlign: "center" }}>
                                        {item.id}
                                    </TableCell>

                                    <TableCell style={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
                                        <img src={item.product_batch_items
                                            && item.product_batch_items[0].id_product_detail_product_detail
                                            && item.product_batch_items[0].id_product_detail_product_detail.id_product_product
                                            && item.product_batch_items[0].id_product_detail_product_detail.id_product_product.images
                                            && item.product_batch_items[0].id_product_detail_product_detail.id_product_product.images[0].link}
                                            width={"100px"}
                                            height={"100px"}
                                            style={{ borderRadius: "50%" }}
                                        />
                                    </TableCell>

                                    <TableCell style={{ textAlign: "center" }}>
                                        {item.name}
                                    </TableCell>

                                    <TableCell style={{ textAlign: "center" }}>
                                        {/* {item.product_batch_items
                                            && item.product_batch_items[index].quantity
                                
                                        } */}
                                    </TableCell>

                                    <TableCell style={{ textAlign: "center" }}>
                                        <FiberManualRecordIcon
                                        // style={{
                                        //     color: supplier.status === 0 ? "red" : "green",
                                        // }}
                                        />
                                    </TableCell>
                                    <TableCell style={{}} sx={{ textAlign: "center" }}>
                                        <Button
                                            onClick={() => navigate(`/admin/supplier/update/${item.id}`)}
                                            variant="text"
                                            color="warning"
                                        >
                                            <EditIcon />
                                        </Button>

                                        <Button
                                            // onClick={() => handleDeleteSupplier(item.id)}
                                            variant="text"
                                            color="secondary"
                                        >
                                            <DeleteIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

        </Box>
    );
};

export default ImportWarehouse;
