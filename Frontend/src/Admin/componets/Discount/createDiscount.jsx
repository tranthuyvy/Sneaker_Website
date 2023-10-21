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
  const [value, setValue] = useState("");
  const [type, setType] = useState("");
  const [expirationDate, setExpirationDate] = useState(null);

  const navigate = useNavigate();

  const lang = useSelector((state) => state);
  const errorMessages = lang === "vi" ? errorMessagesVi : errorMessagesEn;
  console.log(expirationDate)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "value") {
      setValue(value);
    } else if (name === "type") {
      setType(value);
    }
  };

  const handleDateChange = (date) => {
    setExpirationDate(date);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!value || !type || !expirationDate || value < 0 || value > 100 || expirationDate < new Date()) {
      if (!value) {
        toast.error(errorMessages["114"], {
          autoClose: 1000,
        });
      } else if (!type) {
        toast.error(errorMessages["115"], {
          autoClose: 1000,
        });
      } else if (!expirationDate) {
        toast.error(errorMessages["116"], {
          autoClose: 1000,
        });
      } else if (value < 0 || value > 100) {
          toast.error(errorMessages["117"], {
          autoClose: 1000,
        });
      } else if (expirationDate < new Date()) {
          toast.error(errorMessages["118"], {
          autoClose: 1000,
        });
      }
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
              value={value}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              name="type"
              label="Type"
              fullWidth
              value={type}
              onChange={handleInputChange}
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
