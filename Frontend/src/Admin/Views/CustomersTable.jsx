import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Table,
  TableContainer,
  Typography,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deepOrange } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import api from "../../config/api";

const statusObj = {
  applied: { color: "info" },
  rejected: { color: "error" },
  current: { color: "primary" },
  resigned: { color: "warning" },
  professional: { color: "success" },
};

const CustomersTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [listBatch, setListBatch] = useState([]);
  useEffect(() => {
    getBatchProduct().catch((err) => console.log(err));
  }, []);

  return (
    <Card>
      <CardHeader
        title="inventory"
        sx={{
          pt: 2,
          alignItems: "center",
          "& .MuiCardHeader-action": { mt: 0.6 },
        }}
        action={
          <Typography
            onClick={() => navigate("/admin/customers")}
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
        <Table sx={{ minWidth: 390 }} aria-label="table in dashboard">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Sales quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listBatch.length > 0
              ? listBatch.map((user) => {
                  return (
                    <TableRow
                      hover
                      key={user.id}
                      sx={{
                        "&:last-of-type td, &:last-of-type th": { border: 0 },
                      }}
                    >
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.size}</TableCell>
                      <TableCell>{user.batch}</TableCell>
                      <TableCell>{user.orders}</TableCell>
                    </TableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
  async function getBatchProduct() {
    // Tạo mảng trống để chứa kết quả
    const data = (await api.get("/api/v1/statistic/batch")).data.data;
    // Tạo mảng trống để chứa kết quả
    const result = [];

    // Duyệt qua dữ liệu đầu vào
    const products = data.filter((product) => product.order !== 0);

    // Gom hết mấy thằng chung id lại
    const groupedProducts = products.map((product) => {
      const id = product.id;
     
      // Nếu chưa có sản phẩm nào có id này
      if (!result[id]) {
        result[id] = {
          id,
          name: product.id_product_product.name,
          batch: product?.batch || 0,
          orders: product?.order || 0,
          size:product.size
        };
        
      } else {
        result[id] = {
          ...result[id],
          batch: result[id].batch + product?.batch || 0,
          orders: result[id].order + product?.order || 0,
        };
      }
      return result[id];
    });
 
    console.log(groupedProducts);
    setListBatch([...groupedProducts]);
  }
};

export default CustomersTable;
