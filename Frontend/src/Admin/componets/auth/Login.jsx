import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid, TextField, Button, Box } from "@mui/material";
import axios from "../../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import errorMessagesEn from "../../../Lang/en.json";
import errorMessagesVi from "../../../Lang/vi.json";
import { applyMiddleware } from "redux";
import axiosApiInstance from "../../../config/api";
import Modal from "react-modal";

function LoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const lang = useSelector((state) => state);
  const errorMessages = lang === "vi" ? errorMessagesVi : errorMessagesEn;

  const handleInputChange = (event) => {
    if (event.target.name === "username") {
      setUsername(event.target.value);
      setUsernameError("");
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
      setPasswordError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      if (!username) {
        setUsernameError(errorMessages["016"]);
      } if (!password) {
        setPasswordError(errorMessages["101"]);
      }
      return;
    }

    try {
      const response = await axios.post("/api/v1/auth/login", {
        username,
        password,
      });

      if (response.status === 200) {
        const data = response.data;
        // console.log("code", response.data.code)

        if (data.accessToken) {
          const token = data.accessToken;
          localStorage.setItem("accessToken", token);
          const successCode = response.data.code;
          axiosApiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          if (successCode) {
            toast.success(errorMessages[successCode], {
              autoClose: 1000,
            });
          }

          dispatch({ type: "LANG_ENG" });
          navigate("/admin/dashboard");
        } else {
          const errorCode = response.data.code;

          if (errorCode) {
            toast.error(errorMessages[errorCode], {
              autoClose: 1000,
            });
          } else {
            const errorCode = "105";
            toast.error(errorMessages[errorCode], {
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
          const errorCode = "001";
          toast.error(errorMessages[errorCode], {
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
        const errorCode = "106";
        toast.error(errorMessages[errorCode], {
          autoClose: 1000,
        });
      }
    }
  };
  const customStyles = {
    overlay: {
      zIndex: 9999, // Đặt giá trị z-index cao
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'green',
      border: '1px solid #000',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      padding: '20px', zIndex: 9999,
    },
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="70vh"
    >
      <React.Fragment>
        <form style={{ width: "50%" }} onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="username"
                label="User Name"
                fullWidth
                autoComplete="given-name"
                value={username}
                onChange={handleInputChange}
                error={!!usernameError}
                helperText={usernameError}
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
                error={!!passwordError}
                helperText={passwordError}
              />
            </Grid>
            <Grid item xs={12}>
              <Button color="info" onClick={() => setIsOpen(true)}>Forgot Password?</Button></Grid>
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
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setIsOpen(false)}
          style={customStyles}
          contentLabel="Example Modal"
          shouldCloseOnOverlayClick={true} // Đóng modal khi nhấn ra ngoài
        >
          <form style={{ width: "50%" }} onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name="username"
                  label="User Name"
                  fullWidth
                  autoComplete="given-name"
                  value={username}
                  onChange={handleInputChange}
                  error={!!usernameError}
                  helperText={usernameError}
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
                  error={!!passwordError}
                  helperText={passwordError}
                />
              </Grid>
              <Grid item xs={12}>
                <Button color="info" onClick={() => setIsOpen(true)}>Forgot Password?</Button></Grid>
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

        </Modal>
      </React.Fragment>
    </Box>
  );
}

export default LoginForm;
