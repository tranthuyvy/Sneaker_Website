import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardHeader,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { format } from "date-fns";
import api from "../../config/api";

const RecentOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 100;

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
        console.log(ordersArray)
        setCurrentPage(page);
      })
      .catch((error) => {
        console.error("Error Call API", error);
      });
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, []);

  const statusLabels = {
    1: "PLACED",
    2: "CONFIRMED",
    3: "SHIPPED",
    4: "DELIVERED",
    5: "SUCCESS",
    6: "CANCELLED",
  };

  return (
    <Card>
      <CardHeader
        title="Recent Orders"
        sx={{
          pt: 2,
          alignItems: "center",
          "& .MuiCardHeader-action": { mt: 0.6 },
        }}
        action={
          <Typography
            onClick={() => navigate("/admin/orders")}
            variant="caption"
            sx={{ color: "yellow", cursor: "pointer", paddingRight: ".8rem" }}
          >
            View All
          </Typography>
        }
        titleTypographyProps={{
          variant: "h5",
          sx: {
            lineHeight: "1.6 !important",
            letterSpacing: "0.15px !important",
          },
        }}
      />
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Product Name</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Price</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Payment</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Status</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Order Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
              ?.filter((item) => item.status === 1)
              .slice(0, 5)
              .map((item, index) => (
                <TableRow
                  hover
                  key={item.id}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                >
                  <TableCell>
                    <AvatarGroup max={4} sx={{ justifyContent: "start" }}>
                      {item.order_details.map((orderItem) => (
                        <Avatar
                          alt={item.id}
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
                    {item.order_details.map((orderItem) => (
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
                    ${item.total_price}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <span
                      className="font-semibold text-md"
                      style={{ color: "cyan" }}
                    >
                      {item.status_payment === 1
                        ? "Cash On Delivery"
                        : item.status_payment === 2
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
                      label={statusLabels[item.status]}
                      size="medium"
                      color={
                        item.status === 1
                          ? "warning"
                          : item.status === 4
                          ? "success"
                          : item.status === 2
                          ? "info"
                          : item.status === 3
                          ? "primary"
                          : item.status === 5
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
                    {item.create_at &&
                      format(new Date(item.create_at), "dd/MM/yyyy")}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default RecentOrders;
