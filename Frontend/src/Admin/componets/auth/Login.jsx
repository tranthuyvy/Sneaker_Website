import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, TextField, Button } from "@mui/material";
import api from '../../../config/api';

function LoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (event) => {
    if (event.target.name === "username") {
      setUsername(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post("api/v1/auth/login", { username, password });

      if (response.status === 200) {
        const data = response.data;

        if (data.accessToken) {
          const token = data.accessToken;
          localStorage.setItem("accessToken", token);

          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          navigate("/admin/staff/profile");
        } else {
          console.error("Lỗi khi nhận token từ phản hồi.");
        }
      } else {
        console.error("Đăng nhập thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi thực hiện đăng nhập:", error);
    }
  };

  return (
    <React.Fragment>
      <form style={{ width: "50%" }} onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              name="username"
              label="Tài khoản"
              fullWidth
              autoComplete="given-name"
              value={username}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              name="password"
              label="Mật khẩu"
              fullWidth
              autoComplete="given-name"
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
              Đăng nhập
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}

export default LoginForm;
