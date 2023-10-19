import React, { useEffect, useState } from "react";
import { InputAdornment, Typography } from "@mui/material";
import {
  Grid,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { Fragment } from "react";
import "./staffProfile.css";
import { format } from "date-fns";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import api from '../../../config/api';
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import errorMessagesEn from "../../../Lang/en.json";
import errorMessagesVi from "../../../Lang/vi.json";

const StaffProfile = () => {
  const [staff, setStaff] = useState(null);
  const [editedStaff, setEditedStaff] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [avatarImage, setAvatarImage] = useState(null);
  const lang = useSelector((state) => state);
  const errorMessages = lang === "vi" ? errorMessagesVi : errorMessagesEn;
  // const token = localStorage.getItem("accessToken");
  //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwibmFtZSI6InR0di50aHV5dnlAZ21haWwuY29tIiwiaWRfcm9sZSI6MSwiY3JlYXRlX2F0IjoiMjAyMy0xMC0xM1QwNjo0NTo1MS4wMDBaIiwiaWF0IjoxNjk3MjA3OTUwLCJleHAiOjE2OTcyMjU5NTB9.guJFU90JxRcak0YWz4egfp9gTt_yECKd3RyWXadMLzE";

  useEffect(() => {
    api.get("api/v1/staff", {

    })
      .then((response) => {
        const staffData = response.data;
        toast.success(errorMessages["002"], {
          autoClose: 900,
        });
        setStaff(staffData);

        setEditedStaff({
          ...staffData,
        });

        setIsEditing(false);
        // setUpdateSuccess(false);
      })
      .catch((error) => {
        toast.error(errorMessages["006"], {
          autoClose: 900,
        });
      });
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);

    setEditedStaff(staff);
  };

  const handleSaveEdit = () => {
    api.put("/api/v1/staff", editedStaff)
      .then((response) => {
        setStaff(response.data);
        setIsEditing(false);
        setUpdateSuccess(true);
        if (response.data.code === "013") {
          toast.success(errorMessages["013"], {
            autoClose: 900,
          });
        }
      })
      .catch((error) => {
        toast.error(errorMessages["006"], {
          autoClose: 900,
        });
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedStaff((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (staff === null) {
    return <div>Loading ...</div>;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const imageURL = event.target.result;
        setAvatarImage(imageURL);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <Fragment>
      <Typography
        variant="h3"
        sx={{ textAlign: "center" }}
        className="py-10 text-center"
      >
        Hello, {editedStaff.name}
        <div className="flex justify-center m-10">
          <label htmlFor="fileInput">
            <Avatar
              className="text-white"
              aria-haspopup="true"
              sx={{
                bgcolor: deepPurple[500],
                color: "white",
                cursor: "pointer",
                width: "100px",
                height: "100px",
                fontSize: "30px",
              }}
            >
              {avatarImage ? (
                <img
                  src={avatarImage}
                  alt="Selected Avatar"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                editedStaff.name.charAt(0)
              )}
            </Avatar>
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>
      </Typography>
      <form className="updateProfileContainer min-h-screen">
        <Grid container spacing={2}>
          {[
            {
              label: "Name",
              name: "name",
              value: editedStaff.name,
            },
            {
              label: "Email",
              name: "email",
              value: editedStaff.email,
              disabled: true,
            },
            {
              label: "CCCD",
              name: "id_card",
              value: editedStaff.id_card,
            },
            {
              label: "Phone",
              name: "phone",
              value: editedStaff.phone,
            },
            {
              label: "Birthday",
              name: "date_of_birth",
              type: Date,
              value: editedStaff.date_of_birth
              // value: format(new Date(editedStaff.date_of_birth), "dd/MM/yyyy")
            },
            {
              label: "Sex",
              name: "sex",
              value: editedStaff.sex,
            },
            {
              label: "Bank Number",
              name: "bank_account_number",
              value: editedStaff.bank_account_number
            },
            {
              label: "Start Work",
              name: "start_work",
              value: format(new Date(editedStaff.start_work), "dd/MM/yyyy"),
              disabled: true,
            },
            {
              label: "Status",
              name: "status",
              //   value: editedStaff.status,
              disabled: true,
              startAdornment: (
                <InputAdornment position="start">
                  {editedStaff.status === 0 ? (
                    <>
                      <FiberManualRecordIcon style={{ color: "green" }} />
                      Làm Việc
                    </>
                  ) : (
                    <>
                      <FiberManualRecordIcon style={{ color: "red" }} />
                      Ngừng Làm Việc
                    </>
                  )}
                </InputAdornment>
              ),
            },
          ].map((field, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <TextField
                fullWidth
                label={field.label}
                name={field.name}
                value={field.value}
                onChange={handleChange}
                type={field.type || "text"}
                disabled={!isEditing || field.disabled}
                InputProps={
                  field.startAdornment && {
                    startAdornment: field.startAdornment,
                  }
                }
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            {isEditing ? (
              <>
                <Button
                  variant="contained"
                  sx={{ p: 1.8 }}
                  className="py-20"
                  size="large"
                  onClick={handleSaveEdit}
                >
                  Save Changes
                </Button>
                <Button
                  variant="contained"
                  sx={{ p: 1.8, ml: 2 }}
                  className="py-20"
                  size="large"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                sx={{ p: 1.8 }}
                className="py-20"
                size="large"
                onClick={handleEdit}
              >
                Update Profile
              </Button>
            )}
          </Grid>
        </Grid>
        <ToastContainer />
      </form>
    </Fragment>
  );
};

export default StaffProfile;