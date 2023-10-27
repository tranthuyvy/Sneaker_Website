import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Grid, Select } from "@mui/material";
import api from "../../../config/api";
import { format } from "date-fns";

const AllOrder = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ status: "", sort: "" });
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 9;

  const fetchOrders = (page) => {
    api
      .get(`api/v1/order/get?page=${page}&pageSize=${pageSize}`)
      .then((response) => {
        const ordersArray = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        setOrders(ordersArray);
        setCurrentPage(page);
        setTotalPages(response.data.totalPage);
      })
      .catch((error) => {
        console.error("Error Call API", error);
      });
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, []);

  const handlePaginationChange = (event, page) => {
    fetchOrders(page);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({ ...formData, [name]: value });
  };

  // const handleConfirmedOrder = (orderId, index) => {

  //   dispatch(confirmOrder(orderId));
  //   setOrderStatus("CONFIRMED");
  // };

  // const handleShippedOrder = (orderId, index) => {

  //   dispatch(shipOrder(orderId));
  //   setOrderStatus("SHIPPED");
  // };

  // const handleDeliveredOrder = (orderId, index) => {

  //   dispatch(deliveredOrder(orderId));
  //   setOrderStatus("DELIVERED");
  // };

  // const handleDeleteOrder = (orderId) => {

  //   dispatch(deleteOrder(orderId));
  // };

  // const handleOrderClick = (orderId) => {
  //   navigate(`/admin/orders/${orderId}`);
  // };
  const statusLabels = {
    1: "PLACED",
    2: "CONFIRMED",
    3: "SHIPPED",
    4: "DELIVERED",
    5: "SUCCESS",
    6: "CANCELLED",
  };

  return (
    <Box>
      <Card className="p-3">
        <CardHeader
          title="Sort"
          sx={{
            pt: 0,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.status}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value={"PLACED"}>PLACED</MenuItem>
                <MenuItem value={"CONFIRMED"}>CONFIRMED</MenuItem>
                <MenuItem value={"DELIVERED"}>DELIVERED</MenuItem>
                <MenuItem value={"CANCELD"}>CANCLED</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>
      <Card className="mt-3">
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Product Name</TableCell>

                <TableCell sx={{ textAlign: "center" }}>Price</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  Discounted Price
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>Payment</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Status</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Order Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow
                  hover
                  key={order.id}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell sx={{}}>
                    <AvatarGroup max={4} sx={{ justifyContent: "start" }}>
                        {order.order_details.map((orderItem) => (
                          <Avatar
                            alt={order.id}
                            src={orderItem.id_product_detail_product_detail.image}
                          />
                        ))}
                      </AvatarGroup>{" "}
                      {/* <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: "0.875rem !important",
                          }}
                        >
                          {order?.order_details.map((item) => (
                            <span className=""> {item.id_product_detail_product_detail.color},</span>
                          ))}
                        </Typography> */}
                  </TableCell>

                  {/* <TableCell
                    //   onClick={() => handleOrderClick(order.id)}
                      sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                    >
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: "0.875rem !important",
                          }}
                        >
                          {order?.order_details.map((item) => (
                            <span className=""> {order.product.title},</span>
                          ))}
                        </Typography>
                        <Typography variant="caption">
                          {order?.order_details.map((order) => (
                            <span className="opacity-60">
                              {" "}
                              {order.product.brand},
                            </span>
                          ))}
                        </Typography>
                      </Box>
                    </TableCell> */}
                    <TableCell
                    sx={{ textAlign: "center" }}
                    style={{ color: "yellow", fontStyle: "bold" }}
                  >
                    Name nè
                  </TableCell>

                  <TableCell
                    sx={{ textAlign: "center" }}
                    style={{ color: "yellow", fontStyle: "bold" }}
                  >
                    ${order.total_price}
                  </TableCell>

                  <TableCell
                    sx={{ textAlign: "center" }}
                    style={{ color: "green" }}
                  >
                    ${order.total_discounted_price}
                  </TableCell>

                  <TableCell sx={{ textAlign: "center" }}>
                    <span
                      className="font-semibold text-md"
                      style={{ color: "cyan" }}
                    >
                      {order.status_payment === 1
                        ? "Cash On Delivery"
                        : order.status_payment === 2
                        ? "Payment via Paypal"
                        : "Unknown Payment Method"}
                    </span>
                  </TableCell>

                  <TableCell
                    className="text-white"
                    sx={{ textAlign: "center" }}
                  >
                    <Chip
                      sx={{
                        color: "white !important",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                      label={statusLabels[order.status]}
                      size="medium"
                      color={
                        order.status === 1
                          ? "warning"
                          : order.status === 4
                          ? "success"
                          : order.status === 2
                          ? "info"
                          : order.status === 3
                          ? "primary"
                          : order.status === 5
                          ? "success"
                          : "secondary"
                      }
                      className="text-white"
                    />
                  </TableCell>

                  <TableCell
                    sx={{ textAlign: "center" }}
                    style={{ color: "lightgreen", fontStyle: "bold" }}
                  >
                    {order.create_at &&
                      format(new Date(order.create_at), "dd/MM/yyyy")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Card className="mt-2 flex justify-center items-center">
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
    </Box>
  );
};

export default AllOrder;
