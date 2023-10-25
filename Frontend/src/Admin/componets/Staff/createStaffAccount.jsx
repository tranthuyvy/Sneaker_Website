import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../../config/api";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import errorMessagesEn from "../../../Lang/en.json";
import errorMessagesVi from "../../../Lang/vi.json";

function CreateStaffAccount() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [nameStaff, setNameStaff] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [nameStaffError, setNameStaffError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const lang = useSelector((state) => state);
  const errorMessages = lang === "vi" ? errorMessagesVi : errorMessagesEn;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "nameStaff") {
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        setNameStaffError(errorMessages["130"]);
      }else{
        setNameStaffError("");
      }
      setNameStaff(value);
    } else if (name === "userName") {
      setUserName(value);
      if (/\s/.test(value)) {
        setUserNameError(errorMessages["131"]);
      } else {
        setUserNameError("");
      }

    } else if (name === "password") {
      setPassword(value);
      if (value.length < 6) {
        setPasswordError(errorMessages["129"]);
      } else {
        setPasswordError("");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!nameStaff || !userName || !password) {
      if (!nameStaff) {
        setNameStaffError(errorMessages["102"]);
      }
      if (!userName) {
        setUserNameError(errorMessages["100"]);
      }
      if (!password) {
        setPasswordError(errorMessages["101"]);
      }
      return;
    }

    // if (password.length < 6) {
    //   setPasswordError(errorMessages["129"]);
    //   return;
    // }

    try {
      const response = await api.post("/api/v1/admin/create-staff", {
        nameStaff,
        userName,
        password,
      });
  
      if (response.status === 200) {
        toast.success(errorMessages["008"], {
          autoClose: 1000,
        });
        dispatch({ type: 'LANG_ENG' });
        navigate("/admin/staff");
      } else {
        
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        toast.error(errorMessages[error.response.data.code], 
          { autoClose: 1000 });
      } else {
        const accountErrorCode = "103";
        toast.error(errorMessages[accountErrorCode], {
          autoClose: 1000,
        });
      }
    }
  }

  return (
    <React.Fragment>
      <form style={{ width: "50%" }} onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              name="nameStaff"
              label="Staff Name"
              fullWidth
              autoComplete="given-name"
              value={nameStaff}
              onChange={handleInputChange}
              error={!!nameStaffError}
              helperText={nameStaffError}
              type="text"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="userName"
              label="User Name"
              fullWidth
              autoComplete="userName"
              value={userName}
              onChange={handleInputChange}
              error={!!userNameError}
              helperText={userNameError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="password"
              label="Password"
              fullWidth
              autoComplete="new-password"
              type="password"
              value={password}
              onChange={handleInputChange}
              error={!!passwordError}
              helperText={passwordError}
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
              {lang === "vi" ? "Tạo Tài Khoản" : "Create Account"}
            </Button>
          </Grid>
        </Grid>
      </form>
      <ToastContainer />
    </React.Fragment>
  );
}

export default CreateStaffAccount;
