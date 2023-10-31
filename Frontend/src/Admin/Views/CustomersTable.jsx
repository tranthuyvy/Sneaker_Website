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
import { useNavigate } from 'react-router-dom'
import { deepOrange } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../config/axios";

const statusObj = {
  applied: { color: 'info' },
  rejected: { color: 'error' },
  current: { color: 'primary' },
  resigned: { color: 'warning' },
  professional: { color: 'success' }
}

const CustomersTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const fetchUsers = (page) => {
    axios
      .get(`/api/v1/admin/get?id_role=2&page=${page}&pageSize=${pageSize}`)
      .then((response) => {
        const UsersArray = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        setUsers(UsersArray);
        setCurrentPage(page);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      });
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, []);

  return (
    <Card>
      <CardHeader
          title='New Customers'
          sx={{ pt: 2, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
          action={<Typography onClick={()=>navigate("/admin/customers")} variant='caption' sx = {{color:"yellow", cursor:"pointer",paddingRight:".8rem"}}>View All</Typography>}
          titleTypographyProps={{
            variant: 'h5',
            sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
          }}
        />
      <TableContainer>
        <Table sx={{ minWidth: 390 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(0,5).map(user => (
              <TableRow hover key={user.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell> 
                <Avatar sx={{ bgcolor: deepOrange[500] }}>
                      {user.name.charAt(0).toUpperCase()}
                    </Avatar>
                  </TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default CustomersTable
