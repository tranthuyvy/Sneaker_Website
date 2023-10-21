import React, { useState, useEffect } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import errorMessagesEn from "../../../Lang/en.json";
import errorMessagesVi from "../../../Lang/vi.json";
import api from "../../../config/api";
import DatePicker from "react-datepicker";
import { Select, MenuItem } from "@mui/material";

function UpdateDiscount() {
  const { id } = useParams();
  const [value, setValue] = useState("");
  const [type, setType] = useState("");
  const [expirationDate, setExpirationDate] = useState(null);
  const navigate = useNavigate();

  const lang = useSelector((state) => state);
  const errorMessages = lang === "vi" ? errorMessagesVi : errorMessagesEn;

  useEffect(() => {
    const fetchDiscountData = async () => {
      try {
        const response = await api.get(`/api/v1/discount/get/${id}`);
        const discountData = response.data;

        setValue(discountData.value);
        setType(discountData.type);
        setExpirationDate(new Date(discountData.expiration_date));
      } catch (error) {
        
      }
    };

    fetchDiscountData();
  }, [id]);

  const handleUpdate = async (event) => {
    event.preventDefault();

    if (!value || !type || !expirationDate || value < 0 || value > 100 || expirationDate < new Date()) {
      if (!value) {
        toast.error(errorMessages["114"], { autoClose: 1000 });
      }
      if (!type) {
        toast.error(errorMessages["115"], { autoClose: 1000 });
      }
      if (!expirationDate) {
        toast.error(errorMessages["116"], { autoClose: 1000 });
      }
      if (value < 0 || value > 100) {
        toast.error(errorMessages["117"], { autoClose: 1000 });
      }
      if (expirationDate < new Date()) {
        toast.error(errorMessages["118"], { autoClose: 1000 });
      }
      return;
    }

    try {
      const response = await api.put(`/api/v1/discount/update?id=${id}`, {
        value,
        type,
        expiration_date: expirationDate,
      });

      if (response.status === 200) {
        toast.success(errorMessages["013"], {
          autoClose: 900,
        });
        navigate("/admin/discount");
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
        <Grid item xs={12}></Grid>
      </Grid>
      <form style={{ width: "50%" }} onSubmit={handleUpdate}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              name="value"
              label="Value"
              fullWidth
              autoComplete="off"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              name="type"
              label="Type"
              fullWidth
              value={type}
              onChange={(e) => setValue(e.target.type)}
            >
              <MenuItem value={1}>Discount $</MenuItem>
              <MenuItem value={2}>Discount %</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              name="expirationDate"
              selected={expirationDate}
              onChange={(date) => setExpirationDate(date)}
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
              {lang === "vi" ? "Cập nhật" : "Update"}
            </Button>
          </Grid>
        </Grid>
      </form>
      <ToastContainer />
    </React.Fragment>
  );
}

export default UpdateDiscount;
