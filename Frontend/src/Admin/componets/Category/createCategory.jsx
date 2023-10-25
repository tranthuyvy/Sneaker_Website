import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../../config/api";
import { toast, ToastContainer } from "react-toastify";
import errorMessagesEn from "../../../Lang/en.json";
import errorMessagesVi from "../../../Lang/vi.json";
import { useSelector } from "react-redux";
import axios from "../../../config/axios";

function CreateCategory() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [idParent, setIdParent] = useState("");
  const [nameError, setNameError] = useState("");
  const [idParentError, setIdParentError] = useState("");
  const [isIdParentErrorSelected, setIsIdParentErrorSelected] = useState(false);
  const [categorys, setCategorys] = useState([]);

  const lang = useSelector((state) => state);
  const errorMessages = lang === "vi" ? errorMessagesVi : errorMessagesEn;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") {
      setName(value);
      setNameError("");
    } else if (name === "idParent") {
      setIdParent(value);
      console.log("id parent", idParent)
      setIdParentError("");
    }
  };

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    let valid = true;

    if (!name) {
      setNameError(errorMessages["124"]);
      valid = false;
    }

    if (!idParent) {
      setIdParentError(errorMessages["125"]);
      setIsIdParentErrorSelected(true);
      valid = false;
    } else {
      setIsIdParentErrorSelected(false);
    }

    if (!valid) {
      return;
    }

    try {
      const response = await api.post("/api/v1/category/create", {
        name,
        id_parent:idParent,
      });

      if (response.status === 200) {
        toast.success(errorMessages["008"], {
          autoClose: 1000,
        });
        navigate("/admin/category");
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
              name="name"
              label="Category Name"
              fullWidth
              autoComplete="off"
              value={name}
              onChange={handleInputChange}
              error={!!nameError}
              helperText={nameError}
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              name="idParent"
              label="Parent Category"
              fullWidth
              value={idParent}
              onChange={(e) => {
                handleInputChange(e);
                setIsIdParentErrorSelected(false);
              }}
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
            
            {isIdParentErrorSelected && (
              <Typography variant="body2" sx={{ color: "red" }}>
                Please select category parent
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Button
              className="bg-[#9155FD] w-full"
              type="submit"
              variant="contained"
              size="large"
              sx={{ padding: ".8rem 0" }}
            >
              Create Category
            </Button>
          </Grid>
        </Grid>
      </form>
      <ToastContainer />
    </React.Fragment>
  );
}

export default CreateCategory;
