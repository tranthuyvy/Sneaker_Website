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
  Avatar,
  Pagination,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useNavigate } from "react-router-dom";
import axios from "../../../config/axios";
import { format } from "date-fns";

const AllDiscount = () => {
  const [discounts, setDiscounts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8;
  const navigate = useNavigate();

  const fetchDiscounts = (page) => {
    axios
      .get(`/api/v1/discount/get?page=${page}&pageSize=${pageSize}`)
      .then((response) => {
        const DiscountsArray = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        setDiscounts(DiscountsArray);
        setCurrentPage(page);
        setTotalPages(response.data.totalPage);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      });
  };

  useEffect(() => {
    fetchDiscounts(currentPage);
  }, []);

  const handlePaginationChange = (event, page) => {
    fetchDiscounts(page);
  };

  const handleDeleteDiscount = (id) => {
    
    axios
      .put(`/api/v1/discount/disable/?id=${id}`)
      .then((response) => {

        console.log('Successful',id);
        fetchDiscounts(currentPage);
      })
      .catch((error) => {
        
        console.error('Error', error);
      });
  };

  return (
    <Box>
      <Card>
      <CardHeader
          title={
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ flex: 1 }}>All Discounts</span>
              <Button
                onClick={() => navigate("/admin/discount/create")}
                variant="contained"
                color="primary"
              >
                Create Discount
              </Button>
            </div>
          }
          sx={{ pt: 2, "& .MuiCardHeader-action": { mt: 0.6 } }}
        />
        <TableContainer>
          <Table sx={{ minWidth: 390 }} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: "center" }}>Code</TableCell>
                <TableCell style={{ textAlign: "center" }}>Value</TableCell>
                <TableCell style={{ textAlign: "center" }}>Type</TableCell>
                <TableCell style={{ textAlign: "center" }}>Expiration Date</TableCell>
                <TableCell style={{ textAlign: "center" }}>Create At</TableCell>
                <TableCell style={{ textAlign: "center" }}>Status</TableCell>
                <TableCell style={{ textAlign: "center" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {discounts.map((discount, index) => (
                <TableRow
                  hover
                  key={discount.id}
                  sx={{
                    "&:last-of-type td, &:last-of-type th": { border: 0 },
                  }}
                >
                  <TableCell style={{ textAlign: "center" }}>
                    KM0{index + 1}
                  </TableCell>

                  <TableCell style={{ textAlign: "center" }}>
                    {discount.value}
                  </TableCell>

                  <TableCell style={{ textAlign: "center" }}>
                    {discount.type && discount.type === 1 ? "$" : "%"}
                  </TableCell>

                  <TableCell style={{ textAlign: "center" }}>
                    {discount.expiration_date &&
                      format(new Date(discount.expiration_date), "dd/MM/yyyy")}
                  </TableCell>

                  <TableCell style={{ textAlign: "center" }}>
                    {discount.create_at &&
                      format(new Date(discount.create_at), "dd/MM/yyyy")}
                  </TableCell>

                  <TableCell style={{ textAlign: "center" }}>
                    <FiberManualRecordIcon
                      style={{
                        color: discount.status === 1 ? "green" : "red",
                      }}
                    />
                  </TableCell>

                  <TableCell sx={{ textAlign: "center" }}>
                  {/* <Button
                      onClick={() => navigate(`/admin/discount/update/${discount.id}`)}
                      variant="text"
                      color="warning"
                    >
                      <EditIcon />
                    </Button> */}
                    <Button
                      onClick={() => handleDeleteDiscount(discount.id)}
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

export default AllDiscount;
