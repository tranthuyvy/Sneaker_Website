import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import errorMessagesEn from "../../../Lang/en.json";
import errorMessagesVi from "../../../Lang/vi.json";
import axios from "../../../config/axios";

function CreateSupplier() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const lang = useSelector((state) => state);
  const errorMessages = lang === "vi" ? errorMessagesVi : errorMessagesEn;
  const phoneRegex = /^0\d{9}$/;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") {
      setName(value);
    } else if (name === "address") {
      setAddress(value);
    } else if (name === "phone") {
      setPhone(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !address || !phone) {
      if (!name) {
        toast.error(errorMessages["111"], {
          autoClose: 1000,
        });
      } else if (!address) {
        toast.error(errorMessages["112"], {
          autoClose: 1000,
        });
      } else if (!phone) {
        toast.error(errorMessages["113"], {
          autoClose: 1000,
        });
      }
    } else if (!phoneRegex.test(phone)) {
      toast.error(errorMessages["107"], {
        autoClose: 1000,
      });
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
