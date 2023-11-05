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

        ordersArray.sort(
          (a, b) => new Date(b.create_at) - new Date(a.create_at)
        );

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

  const handleOrderClick = (id) => {
    navigate(`/admin/orders/${id}`);
  };

  const statusLabels = {
    1: "PLACED",
    2: "CONFIRMED",
    3: "DELIVERING",
    4: "SUCCESS",
    5: "FAILED",
    6: "CANCELLED",
    7: "RETURN",
  }

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
                <MenuItem value={1}>PLACED</MenuItem>
                <MenuItem value={2}>CONFIRMED</MenuItem>
                <MenuItem value={3}>DELIVERING</MenuItem>
                <MenuItem value={4}>SUCCESS</MenuItem>
                <MenuItem value={5}>FAILED</MenuItem>
                <MenuItem value={6}>CANCLED</MenuItem>
                <MenuItem value={7}>RETURN</MenuItem>
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
                  onClick={() => handleOrderClick(order.id)}
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
                          src={
                            orderItem.id_product_detail_product_detail
                              .id_product_product.images[0].link
                          }
                        />
                      ))}
                    </AvatarGroup>{" "}
                    
                  </TableCell>

                  <TableCell
                    sx={{ textAlign: "center" }}
                    style={{ color: "white", fontStyle: "bold" }}
                  >
                    {order.order_details.map((orderItem) => (
                      <span>
                        {"  "}
                        {
                          orderItem.id_product_detail_product_detail
                            .id_product_product.name
                        }
                        ,
                      </span>
                    ))}
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
