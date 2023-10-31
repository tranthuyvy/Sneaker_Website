import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

import TrendingUp from "mdi-material-ui/TrendingUp";
import DotsVertical from "mdi-material-ui/DotsVertical";
import CellphoneLink from "mdi-material-ui/CellphoneLink";
import AccountOutline from "mdi-material-ui/AccountOutline";
import {
  BriefcaseVariantOutline,
  CurrencyUsd,
  HelpCircleOutline,
  Poll,
} from "mdi-material-ui";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import api from "../../config/api";

const Statistics = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 100;
  const dispatch = useDispatch();

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

  const calculateNewOrders = () => {
    const validOrders = orders.filter((order) => order?.status === 1);

    const totalNewOrders = validOrders.length;

    return totalNewOrders;
  };

  const totalNewOrders = calculateNewOrders();

  const fetchUsers = (page) => {
    api
      .get(`/api/v1/admin/get?id_role=2&page=${page}&pageSize=${pageSize}`)
      .then((response) => {
        const UsersArray = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        setUsers(UsersArray);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      });
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, []);

  const totalUsers = users.length;

  const fetchStaffs = (page) => {
    api
      .get(`/api/v1/admin/get?id_role=1&page=${page}&pageSize=${pageSize}`)
      .then((response) => {
        const staffsArray = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        setStaffs(staffsArray);
        console.log("staff", staffsArray);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      });
  };

  useEffect(() => {
    fetchStaffs(currentPage);
  }, []);

  const totalStaffs = staffs.length;

  const fetchProducts = (page) => {
    api
      .get(`api/v1/product/get?page=${page}&pageSize=${pageSize}`)
      .then((response) => {
        const productsArray = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        setProducts(productsArray);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      });
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, []);

  const totalProducts = products.length;

  const salesData = [
    {
      stats: totalNewOrders.toLocaleString(),
      title: "New Orders",
      color: "primary",
      icon: <BriefcaseVariantOutline sx={{ fontSize: "1.75rem" }} />,
    },
    {
      stats: totalUsers.toLocaleString(),
      title: "Customers",
      color: "success",
      icon: <AccountOutline sx={{ fontSize: "1.75rem" }} />,
    },
    {
        stats: totalStaffs.toLocaleString(),
        color: "info",
        title: "Staffs",
        icon: <AccountOutline sx={{ fontSize: "1.75rem" }} />,
    },
    {
      stats: totalProducts.toLocaleString(),
      color: "warning",
      title: "Products",
      icon: <CellphoneLink sx={{ fontSize: "1.75rem" }} />,
    },
  ];

  const renderStats = () => {
    return salesData.map((item, index) => (
      <Grid item xs={12} sm={3} key={index}>
        <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            variant="rounded"
            sx={{
              mr: 3,
              width: 45,
              height: 45,
              boxShadow: 3,
              color: "common.white",
              backgroundColor: `${item.color}.main`,
            }}
          >
            {item.icon}
          </Avatar>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="caption">{item.title}</Typography>
            <Typography variant="h6">{item.stats}</Typography>
          </Box>
        </Box>
      </Grid>
    ));
  };

  return (
    <Card>
      <CardHeader
        title="Overview"
        action={
          <IconButton
            size="small"
            aria-label="settings"
            className="card-more-options"
            sx={{ color: "text.secondary" }}
          >
            <DotsVertical />
          </IconButton>
        }
        subheader={
          <Typography variant="body2">
            <Box
              component="span"
              sx={{ fontWeight: 600, color: "text.primary" }}
            >
              Total 9.9% growth
            </Box>{" "}
            😎 this month
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: "2rem !important",
            letterSpacing: "0.15px !important",
          },
        }}
      />
      <CardContent sx={{ pt: (theme) => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Statistics;
