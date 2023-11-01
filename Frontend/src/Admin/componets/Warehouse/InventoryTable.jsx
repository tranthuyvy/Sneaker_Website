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
import "./ImportWarehouse.css"


const InventoryTable = () => {

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
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <span style={{ flex: 1 }}>All Inventory</span>
                            <Button
                                onClick={() => navigate("/admin/warehouse/import")}
                                variant="contained"
                                color="primary"
                                className="button-animation"
                            >
                                + Import
                            </Button>
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
                                            && item.product_batch_items[0].id_product_detail_product_detail.id_product_product.images[0]?.link}
                                            width={"100px"}
                                            height={"100px"}
                                            style={{ borderRadius: "50%" }}
                                            className="phong"
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
            <Card className="mt-2 border">
                <div className="mx-auto px-4 py-5 flex justify-center shadow-lg rounded-md">
                    <Pagination
                        // count={totalPages}
                        size="medium"
                        // page={currentPage}
                        color="primary"
                        onChange={handlePaginationChange}
                        showFirstButton
                        showLastButton
                    />
                </div>
            </Card>
        </Box>
    );
};

export default InventoryTable;
