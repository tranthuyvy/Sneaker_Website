import React, { useState } from "react";
import { Grid, TextField, Button, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../../config/api";
import { toast, ToastContainer } from "react-toastify";
import errorMessagesEn from "../../../Lang/en.json";
import errorMessagesVi from "../../../Lang/vi.json";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, MenuItem } from "@mui/material";

function CreateDiscount() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [type, setType] = useState("");
  const [expirationDate, setExpirationDate] = useState(null);
  const [valueError, setValueError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [expirationDateError, setExpirationDateError] = useState("");

  const lang = useSelector((state) => state);
  const errorMessages = lang === "vi" ? errorMessagesVi : errorMessagesEn;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "value") {
      setValue(value);
      setValueError("");
    } else if (name === "type") {
      setType(value);
      setTypeError("");
    }
  };

  const handleDateChange = (date) => {
    setExpirationDate(date);
    setExpirationDateError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let valid = true;

    if (!value) {
      setValueError(errorMessages["114"]);
      valid = false;
    }

    if (!type) {
      setTypeError(errorMessages["115"]);
      valid = false;
    }

    if (!expirationDate) {
      setExpirationDateError(errorMessages["116"]);
      valid = false;
    }

    if (value < 0 || value > 100) {
      setValueError(errorMessages["117"]);
      valid = false;
    }

    if (expirationDate < new Date()) {
      setExpirationDateError(errorMessages["118"]);
      valid = false;
    }

    if (!valid) {
      return;
    }

    try {
      const response = await api.post("/api/v1/discount/create", {
        value,
        type,
        expiration_date: expirationDate,
      });

      if (response.status === 200) {
        toast.success(errorMessages["008"], {
          autoClose: 1000,
        });
        navigate("/admin/discount");
        return;
      } else {
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        toast.error(errorMessages[error.response.data.code], {
          autoClose: 1000,
        });
      } else {
        toast.success(errorMessages["006"], {
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
              name="value"
              label="Value"
              fullWidth
              autoComplete="off"
              type="number"
              value={value}
              onChange={handleInputChange}
              error={!!valueError}
              helperText={valueError}
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              name="type"
              label="Type"
              fullWidth
              value={type}
              onChange={handleInputChange}
              error={!!typeError}
              helperText={typeError}
            >
              <MenuItem value={1}>Discount $</MenuItem>
              <MenuItem value={2}>Discount %</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              name="expirationDate"
              selected={expirationDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              customInput={
                <TextField
                  style={{ width: "100%" }}
                  fullWidth
                  label="Expiration Date"
                  value={
                    expirationDate
                      ? expirationDate.toLocaleDateString("en-GB")
                      : ""
                  }
                  error={!!expirationDateError}
                  helperText={expirationDateError}
                />
              }
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
              Create Discount
            </Button>
          </Grid>
        </Grid>
      </form>
      <ToastContainer />
    </React.Fragment>
  );
}

export default CreateDiscount;
