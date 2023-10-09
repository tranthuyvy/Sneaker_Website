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

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { Grid, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmOrder,
  deleteOrder,
  deliveredOrder,
  getOrders,
  shipOrder,
} from "../../../Redux/Admin/Orders/Action";

const OrdersTable = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ status: "", sort: "" });
  const [orderStatus, setOrderStatus] = useState("");
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { adminsOrder } = useSelector((store) => store);
  const [anchorElArray, setAnchorElArray] = useState([]);

  const [currentOrders, setCurrentOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    dispatch(getOrders({ jwt }));
  }, [jwt, adminsOrder.delivered, adminsOrder.shipped, adminsOrder.confirmed]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * ordersPerPage;
    const endIndex = startIndex + ordersPerPage;
    const ordersToDisplay =
      adminsOrder?.orders?.slice(startIndex, endIndex) || [];
    setCurrentOrders(ordersToDisplay);
  }, [adminsOrder, currentPage]);

  const handleUpdateStatusMenuClick = (event, index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorElArray(newAnchorElArray);
  };

  const handleUpdateStatusMenuClose = (index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = null;
    setAnchorElArray(newAnchorElArray);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({ ...formData, [name]: value });
  };

  const handlePaginationChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleConfirmedOrder = (orderId, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(confirmOrder(orderId));
    setOrderStatus("CONFIRMED");
  };

  const handleShippedOrder = (orderId, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(shipOrder(orderId));
    setOrderStatus("SHIPPED");
  };

  const handleDeliveredOrder = (orderId, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(deliveredOrder(orderId));
    setOrderStatus("DELIVERED");
  };

  const handleDeleteOrder = (orderId) => {
    handleUpdateStatusMenuClose();
    dispatch(deleteOrder(orderId));
  };

  const handleOrderClick = (orderId) => {
    navigate(`/account/order/${orderId}`);
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
      <Card className="mt-2">
        <CardHeader
          title="All Orders"
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>

                <TableCell sx={{ textAlign: "center" }}>Price</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Payment</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Status</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  Update Status
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>Cancel</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentOrders.map((item, index) => (
                <TableRow
                  hover
                  key={item.name}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell sx={{}}>
                    <AvatarGroup max={4} sx={{ justifyContent: "start" }}>
                      {item.orderItems.map((orderItem) => (
                        <Avatar
                          alt={item.title}
                          src={orderItem.product.imageUrl}
                        />
                      ))}
                    </AvatarGroup>{" "}
                  </TableCell>

                  <TableCell
                    onClick={() => handleOrderClick(item.id)}
                    sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "0.875rem !important",
                        }}
                      >
                        {item?.orderItems.map((order) => (
                          <span className=""> {order.product.title},</span>
                        ))}
                      </Typography>
                      <Typography variant="caption">
                        {item?.orderItems.map((order) => (
                          <span className="opacity-60">
                            {" "}
                            {order.product.brand},
                          </span>
                        ))}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell sx={{ textAlign: "center" }}>
                    {item.totalPrice}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <span className="text-green-600 font-semibold text-md">
                      {item.paymentStatus === 0
                        ? "Cash On Delivery"
                        : item.paymentStatus === 1
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
                      label={item.orderStatus}
                      size="small"
                      color={
                        item.orderStatus === "PLACED"
                          ? "warning"
                          : item.orderStatus === "DELIVERED"
                          ? "success"
                          : item.orderStatus === "CONFIRMED"
                          ? "info"
                          : item.orderStatus === "SHIPPED"
                          ? "primary"
                          : "secondary"
                      }
                      className="text-white"
                    />
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "center" }}
                    className="text-white"
                  >
                    {/* <Button>{item.orderStatus==="PENDING"?"PENDING": item.orderStatus==="PLACED"?"CONFIRMED":item.orderStatus==="CONFIRMED"?"SHIPPED":"DELEVERED"}</Button> */}
                    <div>
                      <Button
                        id={`basic-button-${item.id}`}
                        aria-controls={`basic-menu-${item.id}`}
                        aria-haspopup="true"
                        aria-expanded={Boolean(anchorElArray[index])}
                        disabled={
                          item.orderStatus === "CANCELLED" ||
                          item.orderStatus === "DELIVERED"
                        }
                        onClick={(event) =>
                          handleUpdateStatusMenuClick(event, index)
                        }
                      >
                        <EditIcon style={{color:"yellow"}}/>
                      </Button>
                      <Menu
                        id={`basic-menu-${item.id}`}
                        anchorEl={anchorElArray[index]}
                        open={Boolean(anchorElArray[index])}
                        onClose={() => handleUpdateStatusMenuClose(index)}
                        MenuListProps={{
                          "aria-labelledby": `basic-button-${item.id}`,
                        }}
                      >
                        <MenuItem
                          onClick={() => handleConfirmedOrder(item.id, index)}
                          disabled={
                            item.orderStatus === "DELIVERED" ||
                            item.orderStatus === "SHIPPED" ||
                            item.orderStatus === "CANCELLED" ||
                            item.orderStatus === "CONFIRMED"
                          }
                        >
                          CONFIRMED ORDER
                        </MenuItem>
                        <MenuItem
                          disabled={
                            item.orderStatus === "DELIVERED" ||
                            item.orderStatus === "CANCELLED" ||
                            item.orderStatus === "PLACED" ||
                            item.orderStatus === "SHIPPED"
                          }
                          onClick={() => handleShippedOrder(item.id, index)}
                        >
                          SHIPPED ORDER
                        </MenuItem>
                        <MenuItem
                          disabled={
                            item.orderStatus === "DELIVERED" ||
                            item.orderStatus === "CANCELLED" ||
                            item.orderStatus === "PLACED" ||
                            item.orderStatus === "CONFIRMED"
                          }
                          onClick={() => handleDeliveredOrder(item.id)}
                        >
                          DELIVERED ORDER
                        </MenuItem>
                      </Menu>
                    </div>
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "center" }}
                    className="text-white"
                  >
                    <Button
                      disabled={
                        item.orderStatus === "CANCELLED" ||
                        item.orderStatus === "CONFIRMED" ||
                        item.orderStatus === "SHIPPED" ||
                        item.orderStatus === "DELIVERED"
                      }
                      onClick={() => handleDeleteOrder(item.id)}
                      variant="text"
                    >
                      <DeleteIcon style={{color:"red"}}/>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Card className="mt-2 flex justify-center items-center">
        <Pagination
          className="py-5 w-auto"
          size="large"
          count={Math.ceil((adminsOrder?.orders?.length || 0) / ordersPerPage)}
          color="primary"
          page={currentPage}
          onChange={handlePaginationChange}
        />
      </Card>
    </Box>
  );
};

export default OrdersTable;
