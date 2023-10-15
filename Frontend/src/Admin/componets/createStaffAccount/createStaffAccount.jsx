import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from '../../../config/api';

function CreateStaffAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameStaff, setNameStaff] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "nameStaff") {
      setNameStaff(value);
    } else if (name === "email") {
        setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post("api/v1/admin/create-staff", { nameStaff, email, password });

      if (response.status === 200) {
        console.log("sta",response.status)
        const data = response.data;
        
        const token = data.accessToken;
        localStorage.setItem("accessToken", token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
        navigate("/admin/staff");
        
      } else {
        console.error("Lỗi khi gửi yêu cầu tạo tài khoản nhân viên.");
      }
    } catch (error) {
      console.error("Lỗi khi thực hiện đăng ký tài khoản nhân viên:", error);
    }
  };

  return (
    <React.Fragment>
      <form style={{ width: "50%" }} onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              name="nameStaff"
              label="Staff Name"
              fullWidth
              autoComplete="given-name"
              value={nameStaff}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
              value={email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              name="password"
              label="Password"
              fullWidth
              autoComplete="new-password"
              type="password"
              value={password}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              className="bg-[#9155FD] w-full"
              type="submit"
              variant="contained"
              size="large"
              sx={{ padding: ".8rem 0" }}
            >
              Create Account
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}

export default CreateStaffAccount;
