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
import { deepOrange, deepPurple } from "@mui/material/colors";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../../../config/api";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const AllStaff = () => {
  const navigate = useNavigate();
  const [staffs, setStaffs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8;

  const fetchStaffs = (page) => {
    api
      .get(`/api/v1/admin/get?id_role=1&page=${page}&pageSize=${pageSize}`)
      .then((response) => {
        const staffsArray = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        setStaffs(staffsArray);
        setCurrentPage(page);
        setTotalPages(response.data.totalPage);
        console.log("staff", staffsArray);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      });
  };

  useEffect(() => {
    fetchStaffs(currentPage);
  }, []);

  const handlePaginationChange = (event, page) => {
    fetchStaffs(page);
  };

  const handleDeleteStaff = (id) => {
    
    api
      .put(`/api/v1/admin/change-status/?id=${id}`)
      .then((response) => {

        console.log('Successful',id);
        fetchStaffs(currentPage);
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
              <span style={{ flex: 1 }}>All Staffs</span>
              <Button
                onClick={() => navigate("/admin/staff/create")}
                variant="contained"
                color="primary"
              >
                Create Account
              </Button>
            </div>
          }
          sx={{ pt: 2, "& .MuiCardHeader-action": { mt: 0.6 } }}
        />
        <TableContainer>
          <Table sx={{ minWidth: 390 }} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell style={{ textAlign: "center" }}>Avatar</TableCell>
                <TableCell style={{ textAlign: "center" }}>Email</TableCell>
                <TableCell style={{ textAlign: "center" }}>Phone</TableCell>
                <TableCell style={{ textAlign: "center" }}>CCCD</TableCell>
                <TableCell style={{ textAlign: "center" }}>Birthday</TableCell>
                <TableCell style={{ textAlign: "center" }}>Sex</TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  Bank Number
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  Start Work
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>Status</TableCell>
                <TableCell style={{ textAlign: "center" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {staffs.map(
                (staff) =>
                  staff.name !== "admin@gmail.com" && (
                    <TableRow
                      hover
                      key={staff.id}
                      sx={{
                        "&:last-of-type td, &:last-of-type th": { border: 0 },
                      }}
                    >
                      <TableCell style={{ textAlign: "center" }}>
                        {staff.id}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <Avatar sx={{ bgcolor: deepPurple[500] }}>
                          {staff.name.charAt(0).toUpperCase()}
                        </Avatar>
                      </TableCell>

                      <TableCell style={{ textAlign: "center" }}>
                        {staff.name}
                      </TableCell>

                      <TableCell style={{ textAlign: "center" }}>
                        {staff.staffs[0]?.phone}
                      </TableCell>

                      <TableCell style={{ textAlign: "center" }}>
                        {staff.staffs[0]?.id_card}
                      </TableCell>

                      <TableCell style={{ textAlign: "center" }}>
                        {staff.staffs[0]?.date_of_birth &&
                          format(
                            new Date(staff.staffs[0].date_of_birth),
                            "dd/MM/yyyy"
                          )}
                      </TableCell>

                      <TableCell style={{ textAlign: "center" }}>
                        {staff.staffs[0]?.sex}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {staff.staffs[0]?.bank_account_number}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {staff.staffs[0]?.start_work &&
                          format(
                            new Date(staff.staffs[0].start_work),
                            "dd/MM/yyyy"
                          )}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <FiberManualRecordIcon
                          style={{
                            color:
                              staff.staffs[0]?.status === 0
                                ? "red"
                                : "green",
                          }}
                        />
                        {/* {staff.id_account_staffs[0]?.status} */}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        <Button
                          onClick={() => handleDeleteStaff(staff.staffs[0]?.id)}
                          variant="text"
                          color="secondary"
                        >
                          <DeleteIcon />
                        </Button>
                      </TableCell>
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

export default AllStaff;
