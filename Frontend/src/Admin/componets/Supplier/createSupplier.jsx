import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import errorMessagesEn from "../../../Lang/en.json";
import errorMessagesVi from "../../../Lang/vi.json";
import axios from "../../../config/axios";

function CreateSupplier() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const lang = useSelector((state) => state);
  const errorMessages = lang === "vi" ? errorMessagesVi : errorMessagesEn;
  const phoneRegex = /^0\d{9}$/;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") {
      setName(value);
      setNameError("");
    } else if (name === "address") {
      setAddress(value);
      setAddressError("");
    } else if (name === "phone") {
      setPhone(value);
      setPhoneError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !address || !phone || !phoneRegex.test(phone)) {
      if (!name) {
        setNameError(errorMessages["111"]);
      }

      if (!address) {
        setAddressError(errorMessages["112"]);
      }

      if (!phone) {
        setPhoneError(errorMessages["113"]);
      } else if (!phoneRegex.test(phone)) {
        setPhoneError(errorMessages["107"]);
      }
    } else {
      try {
        const response = await axios.post("/api/v1/supplier/create", {
          name,
          address,
          phone,
        });

        if (response.status === 200) {
          toast.success(errorMessages["008"], {
            autoClose: 1000,
          });
          dispatch({ type: "LANG_ENG" });
          navigate("/admin/supplier");
        } else {
        }
      } catch (error) {
        if (error.response && error.response.status === 500) {
          toast.error(errorMessages[error.response.data.code], {
            autoClose: 1000,
          });
        } else {
          toast.error(errorMessages["103"], {
            autoClose: 1000,
          });
        }
      }
    }
  };

  return (
    <React.Fragment>
      <form style={{ width: "50%" }} onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Supplier Name"
              fullWidth
              autoComplete="given-name"
              value={name}
              onChange={handleInputChange}
              error={!!nameError}
              helperText={nameError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="address"
              label="Supplier Address"
              fullWidth
              autoComplete="given-address"
              value={address}
              onChange={handleInputChange}
              error={!!addressError}
              helperText={addressError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="phone"
              label="Suppiler Phone"
              fullWidth
              autoComplete="given-phone"
              value={phone}
              onChange={handleInputChange}
              error={!!phoneError}
              helperText={phoneError}
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
              {lang === "vi" ? "Tạo Mới" : "Create Supplier"}
            </Button>
          </Grid>
        </Grid>
      </form>
      <ToastContainer />
    </React.Fragment>
  );
}

export default CreateSupplier;
