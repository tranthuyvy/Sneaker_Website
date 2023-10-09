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
} from "@mui/material";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../Redux/Admin/Users/Action";
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';

const Customers = () => {
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { users } = useSelector((store) => store.adminsUser);

  useEffect(() => {
    dispatch(getUsers({ jwt }));
  }, [jwt]);

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  // const usersToDisplay = users.slice(startIndex, endIndex);
  const usersToDisplay = Array.isArray(users)
    ? users.slice(startIndex, endIndex)
    : [];

  function handlePaginationChange(event, value) {
    setPage(value);
  }

  return (
    <Box>
      <Card>
        <CardHeader
          title="All Customers"
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <TableContainer>
          <Table sx={{ minWidth: 390 }} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Avatar</TableCell>
                <TableCell>FirstName</TableCell>
                <TableCell>LastName</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Points</TableCell>
                <TableCell>Rank</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersToDisplay.map((user, index) => (
                user.firstName !== "Sneakers" && (
                <TableRow
                  hover
                  key={user.id}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                >
                  <TableCell>{startIndex + index + 1}</TableCell>
                  <TableCell>
                    <Avatar sx={{ bgcolor: deepPurple[500] }}>
                      {user.firstName.charAt(0).toUpperCase()}
                    </Avatar>
                  </TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.mobile}</TableCell>
                  <TableCell>{user.points}</TableCell>
                  <TableCell>
                    <MilitaryTechIcon 
                    style={{
                      color:
                        user.rank === "BRONZE"
                          ? "brown"
                          : user.rank === "SILVER"
                          ? "silver"
                          : user.rank === "GOLD"
                          ? "gold"
                          : user.rank === "DIAMOND"
                          ? "lightblue"
                          : "purple",
                    }}
                  />{user.rank}</TableCell>
                </TableRow>
              )))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Card className="mt-2 felx justify-center items-center">
        <Pagination
          className="py-5 w-auto"
          size="large"
          count={Math.ceil(users.length / perPage)}
          color="primary"
          onChange={handlePaginationChange}
          page={page}
        />
      </Card>
    </Box>
  );
};

export default Customers;
