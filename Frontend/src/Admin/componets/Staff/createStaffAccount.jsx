import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../../config/api";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import errorMessagesEn from "../../../Lang/en.json";
import errorMessagesVi from "../../../Lang/vi.json";

function CreateStaffAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameStaff, setNameStaff] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const lang = useSelector((state) => state);
  const errorMessages = lang === "vi" ? errorMessagesVi : errorMessagesEn;

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
  
    if (!nameStaff || !email || !password) {
      if (!nameStaff) {
        const accountErrorCode = "102";
        toast.error(errorMessages[accountErrorCode], {
          autoClose: 1000,
        });
      }
      else if (!email) {
        const accountErrorCode = "100";
        toast.error(errorMessages[accountErrorCode], {
          autoClose: 1000,
        });
      }
      else if (!password) {
        const accountErrorCode = "101";
        toast.error(errorMessages[accountErrorCode], {
          autoClose: 1000,
        });
      }
      return;
    }

    try {
      const response = await api.post("/api/v1/admin/create-staff", {
        nameStaff,
        email,
        password,
      });
  
      if (response.data.code === "008") {
        const accountErrorCode = "008";
        toast.success(errorMessages[accountErrorCode], {
          autoClose: 1000,
        });
        dispatch({ type: 'LANG_ENG' });
        navigate("/admin/staff");
      } else {
        
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
          toast.error(errorMessages[error.response.data.code], 
            {autoClose: 1000})
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
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="email"
              label="User Name"
              fullWidth
              autoComplete="email"
              value={email}
              onChange={handleInputChange}
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
