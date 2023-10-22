import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS của react-toastify
import errorMessagesEn from "../../../Lang/en.json";
import errorMessagesVi from "../../../Lang/vi.json";
import axios from "../../../config/axios";

function UpdateSupplier() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const lang = useSelector((state) => state);
  const errorMessages = lang === "vi" ? errorMessagesVi : errorMessagesEn;
  const phoneRegex = /^0\d{9}$/;

  useEffect(() => {
    const fetchSupplierData = async () => {
      try {
        const response = await axios.get(`/api/v1/supplier/get/${id}`);
        const supplierData = response.data;
  
        setName(supplierData.name);
        setAddress(supplierData.address);
        setPhone(supplierData.phone);
      } catch (error) {
        // toast.error(errorMessages["006"], {
        //   autoClose: 1000,
        // });
      }
    };
  
    fetchSupplierData();
  }, [id]);
  

  const handleUpdate = async (event) => {
    event.preventDefault();

    setNameError("");
    setAddressError("");
    setPhoneError("");

    if (!name || !address || !phone || !phoneRegex.test(phone)) {
      
      if (!name) {
        setNameError(errorMessages["111"]);
      }
      if (!address) {
        setAddressError(errorMessages["112"]);
      }
      if (!phone) {
        setPhoneError(errorMessages["113"]);
      }
      if (!phoneRegex.test(phone)) {
        setPhoneError(errorMessages["107"]);
      }
      return;
    }

    try {
      const response = await axios.put(`/api/v1/supplier/update?id=${id}`, {
        name,
        address,
        phone,
      });

      if (response.status === 200) {
        toast.success(errorMessages["013"], {
          autoClose: 900,
        });
        dispatch({ type: "LANG_ENG" });
        navigate("/admin/supplier");
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        toast.error(errorMessages[error.response.data.code], {
          autoClose: 1000,
        });
      } else {
        toast.error(errorMessages["006"], {
          autoClose: 1000,
        });
      }
    }
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {/* <Typography variant="h5">
            {lang === "vi" ? "Cập nhật Nhà cung cấp" : "Update Supplier"}
          </Typography> */}
        </Grid>
      </Grid>
      <form style={{ width: "50%" }} onSubmit={handleUpdate}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Supplier Name"
              fullWidth
              autoComplete="given-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              onChange={(e) => setAddress(e.target.value)}
              error={!!addressError}
              helperText={addressError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="phone"
              label="Supplier Phone"
              fullWidth
              autoComplete="given-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
              {lang === "vi" ? "Cập nhật" : "Update"}
            </Button>
          </Grid>
        </Grid>
      </form>
      <ToastContainer />
    </React.Fragment>
  );
}

export default UpdateSupplier;
