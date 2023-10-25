import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, Typography, Select, MenuItem } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import errorMessagesEn from "../../../Lang/en.json";
import errorMessagesVi from "../../../Lang/vi.json";
import axios from "../../../config/axios";

function UpdateCategory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [idParent, setIdParent] = useState("");
  const [nameError, setNameError] = useState("");
  const [idParentError, setIdParentError] = useState("");
  const [categorys, setCategorys] = useState([]);

  const lang = useSelector((state) => state);
  const errorMessages = lang === "vi" ? errorMessagesVi : errorMessagesEn;

  const fetchCategorys = () => {
    axios
      .get(`/api/v1/category/get`)
      .then((response) => {
        const CategorysArray = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        setCategorys(CategorysArray);
      })
      .catch((error) => {
        toast.error(errorMessages["006"], {
          autoClose: 900,
        });
      });
  };

  useEffect(() => {
    fetchCategorys();
  }, []);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(`/api/v1/category/get/${id}`);
        const categoryData = response.data.data;

        setName(categoryData.name);
        setIdParent(categoryData.id_parent);
      } catch (error) {
        toast.error(errorMessages["006"], {
          autoClose: 1000,
        });
      }
    };

    fetchCategoryData();
  }, [id]);

  const handleUpdate = async (event) => {
    event.preventDefault();

    setNameError("");
    setIdParentError("");

    if (!name) {
      setNameError(errorMessages["124"]);
      return;
    }
    if (!idParent) {
        setIdParentError(errorMessages["125"]);
        return;
      }

    try {
      const response = await axios.put(`/api/v1/category/update?id=${id}`, {
        name,
        id_parent:idParent,
      });

      if (response.status === 200) {
        toast.success(errorMessages["013"], {
          autoClose: 900,
        });
        dispatch({ type: "LANG_ENG" });
        navigate("/admin/category");
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
            {lang === "vi" ? "Cập nhật Danh mục" : "Update Category"}
          </Typography> */}
        </Grid>
      </Grid>
      <form style={{ width: "50%" }} onSubmit={handleUpdate}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Category Name"
              fullWidth
              autoComplete="given-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!nameError}
              helperText={nameError}
            />
          </Grid>

          <Grid item xs={12}>
            <Select
              name="idParent"
              label="Parent Category"
              fullWidth
              value={idParent}
              onChange={(e) => setIdParent(e.target.value)}
              error={!!idParentError}
              helperText={idParentError}
            >
              <MenuItem value={1}>None</MenuItem>
              {categorys.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
            
              ))}
            </Select>
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

export default UpdateCategory;
