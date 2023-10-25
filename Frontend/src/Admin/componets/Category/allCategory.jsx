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

const AllCategory = () => {
  const navigate = useNavigate();
  const [categorys, setCategorys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8;

  const lang = useSelector((state) => state);
  const errorMessages = lang === "vi" ? errorMessagesVi : errorMessagesEn;

  const fetchCategorys = (page) => {
    axios
      .get(`/api/v1/category/get?page=${page}&pageSize=${pageSize}`)
      .then((response) => {
        const CategorysArray = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        setCategorys(CategorysArray);
        setCurrentPage(page);
        setTotalPages(response.data.totalPage);
      })
      .catch((error) => {
        toast.error(errorMessages["006"], {
          autoClose: 900,
        });
      });
  };

  useEffect(() => {
    fetchCategorys(currentPage);
  }, []);

  const handlePaginationChange = (event, page) => {
    fetchCategorys(page);
  };

  const handleDeleteCategory = (id) => {
    axios
      .put(`/api/v1/category/disable/?id=${id}`)
      .then((response) => {
        fetchCategorys(currentPage);
      })
      .catch((error) => {
        toast.error(errorMessages["006"], {
          autoClose: 900,
        });
      });
  };

  return (
    <Box>
      <Card>
        <CardHeader
          title={
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ flex: 1 }}>All Categorys</span>
              <Button
                onClick={() => navigate("/admin/category/create")}
                variant="contained"
                color="primary"
              >
                Create Category
              </Button>
            </div>
          }
          sx={{ pt: 2, "& .MuiCardHeader-action": { mt: 0.6 } }}
        />
        <TableContainer>
          <Table sx={{ minWidth: 390 }} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: "center" }}>STT</TableCell>
                <TableCell style={{ textAlign: "center" }}>Name</TableCell>
                <TableCell style={{ textAlign: "center" }}>Status</TableCell>
                <TableCell style={{ textAlign: "center" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categorys.map((category, index) => (
                <TableRow
                  hover
                  key={category.id}
                  sx={{
                    "&:last-of-type td, &:last-of-type th": { border: 0 },
                  }}
                >
                  <TableCell style={{ textAlign: "center" }}>
                    {index + 1}
                  </TableCell>

                  <TableCell style={{ textAlign: "center" }}>
                    {category.name}
                  </TableCell>

                  <TableCell style={{ textAlign: "center" }}>
                    <FiberManualRecordIcon
                      style={{
                        color: category.status === 0 ? "red" : "green",
                      }}
                    />
                  </TableCell>
                  <TableCell style={{}} sx={{ textAlign: "center" }}>
                    <Button
                      onClick={() => navigate(`/admin/category/update/${category.id}`)}
                      variant="text"
                      color="warning"
                    >
                      <EditIcon />
                    </Button>

                    <Button
                      onClick={() => handleDeleteCategory(category.id)}
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
      <ToastContainer/>
    </Box>
  );
};

export default AllCategory;
