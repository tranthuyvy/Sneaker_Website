import React, { useEffect } from "react";
import {
  Avatar,
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
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../Redux/Admin/Orders/Action";
import { format } from 'date-fns';

const RecentOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { adminsOrder } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getOrders({ jwt }));
  }, [jwt]);

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
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminsOrder?.orders?.filter((item) => item.orderStatus === "PLACED")
            .slice(0, 5)
            .map((item, index) => (
              <TableRow
                hover
                key={item.id}
                sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
              >
                <TableCell>
                  <Avatar
                    alt={item.title}
                    src={item.orderItems[0]?.product?.imageUrl || ""}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography sx={{ fontWeight: 500 }}>
                      {item.orderItems[0]?.product?.title || ""}
                    </Typography>
                    <Typography variant="caption">
                      {item.orderItems[0]?.product?.brand || ""}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>${item.totalDiscountedPrice}</TableCell>
                <TableCell>
                  <Chip
                    sx={{ color: "white" }}
                    label={item.orderStatus}
                    size="small"
                    color={
                      item.orderStatus === "PLACED"
                        ? "success"
                        : item.orderStatus === "CONFIRMED"
                        ? "info"
                        : item.orderStatus === "DELIVERED"
                        ? "success"
                        : "secondary"
                    }
                  />
                </TableCell>
                <TableCell>{format(new Date(item.createdAt), 'dd/MM/yyyy')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default RecentOrders;
