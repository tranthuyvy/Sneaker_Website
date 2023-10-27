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
import { deepOrange } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../../../config/api";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8;

  const fetchUsers = (page) => {
    api
      .get(`/api/v1/admin/get?id_role=2&page=${page}&pageSize=${pageSize}`)
      .then((response) => {
        const UsersArray = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        setUsers(UsersArray);
        setCurrentPage(page);
        setTotalPages(response.data.totalPage);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      });
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, []);

  const handlePaginationChange = (event, page) => {
    fetchUsers(page);
  };

  return (
    <Box>
      <Card>
        <CardHeader
          title={
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ flex: 1 }}>All Customers</span>
            </div>
          }
          sx={{ pt: 2, "& .MuiCardHeader-action": { mt: 0.6 } }}
        />
        <TableContainer>
          <Table sx={{ minWidth: 390 }} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                {/* <TableCell>STT</TableCell> */}
                <TableCell style={{ textAlign: "center" }}>Avatar</TableCell>
                <TableCell style={{ textAlign: "center" }}>Name</TableCell>
                <TableCell style={{ textAlign: "center" }}>Phone</TableCell>
                <TableCell style={{ textAlign: "center" }}>Email</TableCell>
                <TableCell style={{ textAlign: "center" }}>Platform</TableCell>
                <TableCell style={{ textAlign: "center" }}>Point</TableCell>
                <TableCell style={{ textAlign: "center" }}>Rank</TableCell>
                {/* <TableCell style={{ textAlign: "center" }}>Action</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(
                (user) =>
                  user.name !== "admin@gmail.com" && (
                    <TableRow
                      hover
                      key={user.id}
                      sx={{
                        "&:last-of-type td, &:last-of-type th": { border: 0 },
                      }}
                    >
                      <TableCell style={{ textAlign: "center" }}>
                        <Avatar sx={{ bgcolor: deepOrange[500] }}>
                          {user.name.charAt(0).toUpperCase()}
                        </Avatar>
                      </TableCell>

                      <TableCell style={{ textAlign: "center" }}>
                        {user.name}
                      </TableCell>

                      <TableCell style={{ textAlign: "center" }}>
                        {user.phone}
                      </TableCell>

                      <TableCell style={{ textAlign: "center" }}>
                        {user.email}
                      </TableCell>

                      <TableCell style={{ textAlign: "center" }}>
                        {user.platform}
                      </TableCell>

                      <TableCell style={{ textAlign: "center" }}>
                        {user.point}
                      </TableCell>

                      <TableCell style={{ textAlign: "center" }}>
                        <MilitaryTechIcon
                          style={{
                            color:
                              user.point < 200
                                ? "brown"
                                : user.point >= 200 && user.point < 400
                                ? "silver"
                                : user.point >= 400 && user.point < 600
                                ? "gold"
                                : user.point >= 600
                                ? "lightblue"
                                : "purple",
                          }}
                        />
                        {user.point < 200 && <span>BROWN</span>}
                        {user.point >= 200 && user.point < 400 && (
                          <span>SILVER</span>
                        )}
                        {user.point >= 400 && user.point < 600 && (
                          <span>GOLD</span>
                        )}
                        {user.point >= 600 && <span>DIAMOND</span>}
                      </TableCell>

                      {/* <TableCell sx={{ textAlign: "center" }}>
                        <Button
                          // onClick={() => handleDeleteProduct(item.id)}
                          variant="text"
                          color="secondary"
                        >
                          <DeleteIcon />
                        </Button>
                      </TableCell> */}
                    </TableRow>
                  )
              )}
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

export default AllUser;
