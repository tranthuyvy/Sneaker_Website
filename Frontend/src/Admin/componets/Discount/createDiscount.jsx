import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../../config/api";
import { toast, ToastContainer } from "react-toastify";
import errorMessagesEn from "../../../Lang/en.json";
import errorMessagesVi from "../../../Lang/vi.json";
import { useSelector } from "react-redux";

function CreateDiscount() {
  const [value, setValue] = useState("");
  const [type, setType] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  const navigate = useNavigate();

  const lang = useSelector((state) => state);
  const errorMessages = lang === "vi" ? errorMessagesVi : errorMessagesEn;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "value") {
      setValue(value);
    } else if (name === "type") {
      setType(value);
    } else if (name === "expirationDate") {
      setExpirationDate(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!value || !type || !expirationDate) {
        if (!value) {
            const accountErrorCode = "114";
            toast.error(errorMessages[accountErrorCode], {
              autoClose: 1000,
            });
          }
          else if (!type) {
            const accountErrorCode = "115";
            toast.error(errorMessages[accountErrorCode], {
              autoClose: 1000,
            });
          }
          else if (!expirationDate) {
            const accountErrorCode = "116";
            toast.error(errorMessages[accountErrorCode], {
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
          navigate("/admin/discount")
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
  }

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
          <Grid item xs={12}>
            <TextField
              name="type"
              label="Type"
              fullWidth
              autoComplete="off"
              value={type}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="expirationDate"
              label="Expiration Date"
              fullWidth
              autoComplete="off"
              value={expirationDate}
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
