import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, TextField, Button } from "@mui/material";
import axios from "../../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import errorMessagesEn from "../../../Lang/en.json";
import errorMessagesVi from "../../../Lang/vi.json";

function LoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const lang = useSelector((state) => state);
  const errorMessages = lang === "vi" ? errorMessagesVi : errorMessagesEn;

  const handleInputChange = (event) => {
    if (event.target.name === "username") {
      setUsername(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };

  const handleSubmit = async (event) => {
    
    event.preventDefault();

    if (!username || !password) {
      if (!username) {
        const accountErrorCode = "100";
        toast.error(errorMessages[accountErrorCode], {
          autoClose: 1000,
        });
      }
      if (!password) {
        const passwordErrorCode = "101";
        toast.error(errorMessages[passwordErrorCode], {
          autoClose: 1000,
        });
      }
      return;
    }
  
    try {
      const response = await axios.post("/api/v1/auth/login", { username, password });
  
      if (response.status === 200) {
        const data = response.data;
        // console.log("code", response.data.code)
  
        if (data.accessToken) {
          const token = data.accessToken;
          localStorage.setItem("accessToken", token);
          
          const successCode = response.data.code;
  
          if (successCode) {
            toast.success(errorMessages[successCode], {
              autoClose: 1000,
            });
          }
  
          dispatch({ type: 'LANG_ENG' });
          navigate("/admin/staff");
        } else {
          const errorCode = response.data.code;
          
          if (errorCode) {
            toast.error(errorMessages[errorCode], {
              autoClose: 1000,
            });
            
          } else {
            toast.error(lang === "vi" ? "Lỗi khi nhận token từ phản hồi." : "Error receiving token from response", {
              autoClose: 1000,
            });
          }
        }
      } else {
        const errorCode = response.data.code;
        
        if (errorCode) {
          toast.error(errorMessages[errorCode], {
            autoClose: 1000,
          });

        } else {
          toast.error(lang === "vi" ? "Đăng nhập thất bại." : "Login failed", {
            autoClose: 1000,
          });
        }
      }
    } catch (error) {
      const errorCode = error.response ? error.response.data.code : null;
      
      if (errorCode) {
        toast.error(errorMessages[errorCode], {
          autoClose: 1000,
        });

      } else {
        toast.error(lang === "vi" ? "Lỗi khi thực hiện đăng nhập." : "Error while logging in", {
          autoClose: 1000,
        });
      }
    }
  };
  
  return (
    <React.Fragment>
      <form style={{ width: "50%" }} onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              name="username"
              label="Account"
              fullWidth
              autoComplete="given-name"
              value={username}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="password"
              label="Password"
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
              {lang === "vi" ? "Đăng nhập" : "Login"}
            </Button>
          </Grid>
        </Grid>
      </form>
      <ToastContainer />
    </React.Fragment>
  );
}

export default LoginForm;