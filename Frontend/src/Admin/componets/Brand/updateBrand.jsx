import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import errorMessagesEn from "../../../Lang/en.json";
import errorMessagesVi from "../../../Lang/vi.json";
import axios from "../../../config/axios";

function UpdateBrand() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [linkPage, setLinkPage] = useState("");
  const [nameError, setNameError] = useState("");
  const [infoError, setInfoError] = useState("");
  const [linkPageError, setLinkPageError] = useState("");

  const lang = useSelector((state) => state);
  const errorMessages = lang === "vi" ? errorMessagesVi : errorMessagesEn;

  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        const response = await axios.get(`/api/v1/brand/get/${id}`);
        const brandData = response.data.data;

        setName(brandData.name);
        setInfo(brandData.info);
        setLinkPage(brandData.link_page);
      } catch (error) {
        toast.error(errorMessages["006"], {
          autoClose: 1000,
        });
      }
    };

    fetchBrandData();
  }, [id]);

  const handleUpdate = async (event) => {
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

      return;
    }

    try {
      const response = await axios.put(`/api/v1/brand/update?id=${id}`, {
        name,
        info,
        link_page:linkPage,
      });

      if (response.status === 200) {
        toast.success(errorMessages["013"], {
          autoClose: 900,
        });
        dispatch({ type: "LANG_ENG" });
        navigate("/admin/brand");
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
            {lang === "vi" ? "Cập nhật Thương hiệu" : "Update Brand"}
          </Typography> */}
        </Grid>
      </Grid>
      <form style={{ width: "50%" }} onSubmit={handleUpdate}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Brand Name"
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
              name="info"
              label="Brand Info"
              fullWidth
              autoComplete="given-info"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
              error={!!infoError}
              helperText={infoError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="linkPage"
              label="Brand Link Page"
              fullWidth
              autoComplete="given-link-page"
              value={linkPage}
              onChange={(e) => setLinkPage(e.target.value)}
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
              {lang === "vi" ? "Cập nhật" : "Update"}
            </Button>
          </Grid>
        </Grid>
      </form>
      <ToastContainer />
    </React.Fragment>
  );
}

export default UpdateBrand;
