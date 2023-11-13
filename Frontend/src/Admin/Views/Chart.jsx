import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  IconButton,
  useTheme,
} from "@mui/material";
import DotsVertical from "mdi-material-ui/DotsVertical";
import ReactApexCharts from "react-apexcharts";
import { useNavigate } from "react-router-dom";
import api from "../../config/api";

const Chart = () => {
  const theme = useTheme();
  const [chartData, setChartData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 100;

  const fetchOrders = (page) => {
    api
      .get(`api/v1/order/get?page=${page}&pageSize=${pageSize}`)
      .then((response) => {
        const ordersArray = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        ordersArray.sort(
          (a, b) => new Date(a.create_at) - new Date(b.create_at)
        );
        setOrders(ordersArray);
      })
      .catch((error) => {
        console.error("Error Call API", error);
      });
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, []);

  useEffect(() => {
    const totalsByDay = calculateTotalByDay(orders);
    setChartData(totalsByDay);
  }, [orders]);

  const calculateTotalByDay = (orders) => {
    const totalsByDay = {};

    if (!orders || orders.length === 0) {
      return [];
    }

    orders.forEach((order) => {
      const createdAt = new Date(order?.create_at);
      const formattedDate = `${createdAt.getDate()}/${
        createdAt.getMonth() + 1
      }/${createdAt.getFullYear()}`;

      if (totalsByDay[formattedDate]) {
        totalsByDay[formattedDate] += order?.total_price;
      } else {
        totalsByDay[formattedDate] = order?.total_price;
      }
    });

    const chartData = Object.keys(totalsByDay).map((day) => ({
      x: day,
      y: totalsByDay[day],
    }));

    return chartData;
  };

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        distributed: true,
        columnWidth: "40%",
        endingShape: "rounded",
        startingShape: "rounded",
      },
    },
    stroke: {
      width: 2,
      colors: [theme.palette.background.paper],
    },
    legend: { show: false },
    grid: {
      strokeDashArray: 7,
      padding: {
        top: -1,
        right: 0,
        left: -12,
        bottom: 5,
      },
    },
    dataLabels: { enabled: false },
    colors: [
      // theme.palette.blue.main,
      theme.palette.orange.main,
      // theme.palette.secondary.main,
      // theme.palette.success.main,
    ],
    states: {
      hover: {
        filter: { type: "none" },
      },
      active: {
        filter: { type: "none" },
      },
    },
    xaxis: {
      categories: chartData.map((item) => item.x),
      tickPlacement: "on",
      labels: { show: true },
      axisTicks: { show: true },
      axisBorder: { show: true },
    },
    yaxis: {
      show: true,
      tickAmount: 4,
      labels: {
        offsetX: -17,
        formatter: (value) =>
          `${value > 99 ? `${(value / 100).toFixed(0)}` : value}k`,
      },
    },
  };

  return (
    <Card>
      <CardHeader
        title="Chart Sale"
        titleTypographyProps={{
          sx: {
            lineHeight: "0.5rem !important",
            letterSpacing: "0.15px !important",
          },
        }}
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
      />
      <CardContent
        sx={{ "& .apexcharts-xcrosshairs.apexcharts-active": { opacity: 0 } }}
      >
        <ReactApexCharts
          type="bar"
          height={274}
          options={{
            ...options,
            xaxis: {
              categories: chartData.map((item) => item.x),
              tickPlacement: "on",
              labels: { show: true },
              axisTicks: { show: true },
              axisBorder: { show: true },
            },
          }}
          series={[{ data: chartData.map((item) => item.y) }]}
        />
        <Button
          fullWidth
          variant="contained"
          onClick={() => navigate("/admin/orders")}
          style={{ marginTop: "25px" }}
        >
          Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default Chart;
