import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import errorMessagesEn from "../../../Lang/en.json";
import errorMessagesVi from "../../../Lang/vi.json";
import axios from "../../../config/axios";

function CreateBrand() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [linkPage, setLinkPage] = useState("");
  const [nameError, setNameError] = useState("");
  const [infoError, setInfoError] = useState("");
  const [linkPageError, setLinkPageError] = useState("");

  const lang = useSelector((state) => state);
  const errorMessages = lang === "vi" ? errorMessagesVi : errorMessagesEn;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") {
      setName(value);
      setNameError("");
    } else if (name === "info") {
      setInfo(value);
      setInfoError("");
    } else if (name === "linkPage") {
      setLinkPage(value);
      setLinkPageError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setNameError("");
    setInfoError("");
    setLinkPageError("");

    if (!name || !info || !linkPage) {
      if (!name) {
        setNameError(errorMessages["126"]);
      }

      if (!info) {
        setInfoError(errorMessages["127"]);
      }

      if (!linkPage) {
        setLinkPageError(errorMessages["128"]);
      }
    } else {
      try {
        const response = await axios.post("/api/v1/brand/create", {
          name,
          info,
          link_page: linkPage,
        });

        if (response.status === 200) {
          toast.success(errorMessages["008"], {
            autoClose: 1000,
          });
          dispatch({ type: "LANG_ENG" });
          navigate("/admin/brand");
        } else {
          toast.error(errorMessages["103"], {
            autoClose: 1000,
          });
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
    }
  };

  return (
    <React.Fragment>
      <form style={{ width: "50%" }} onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Brand Name"
              fullWidth
              autoComplete="brand-name"
              placeholder="Enter brand name"
              value={name}
              onChange={handleInputChange}
              error={!!nameError}
              helperText={nameError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="info"
              label="Brand Info"
              fullWidth
              autoComplete="brand-info"
              placeholder="Enter brand info"
              value={info}
              onChange={handleInputChange}
              error={!!infoError}
              helperText={infoError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="linkPage"
              label="Brand Link Page"
              fullWidth
              autoComplete="brand-link-page"
              placeholder="Enter brand link page"
              value={linkPage}
              onChange={handleInputChange}
              error={!!linkPageError}
              helperText={linkPageError}
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
              {lang === "vi" ? "Tạo Mới" : "Create Brand"}
            </Button>
          </Grid>
        </Grid>
      </form>
      <ToastContainer />
    </React.Fragment>
  );
}

export default CreateBrand;
