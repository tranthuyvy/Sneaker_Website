import React, { useEffect, useState } from "react";
import { InputAdornment, Typography } from "@mui/material";
import { Grid, TextField, Button, Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { Fragment } from "react";
import "./staffProfile.css";
import { format } from "date-fns";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import api from "../../../config/api";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import errorMessagesEn from "../../../Lang/en.json";
import errorMessagesVi from "../../../Lang/vi.json";
import { Select, MenuItem } from "@mui/material";

const StaffProfile = () => {
  const [staff, setStaff] = useState(null);
  const [editedStaff, setEditedStaff] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [avatarImage, setAvatarImage] = useState(null);
  const [gender, setGender] = useState(editedStaff ? editedStaff.sex : "");
  const lang = useSelector((state) => state);
  const errorMessages = lang === "vi" ? errorMessagesVi : errorMessagesEn;

  const validateCCCD = (cccd) => {
    return /^\d{12}$/.test(cccd);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhoneNumber = (phone) => {
    return /^0\d{9}$/.test(phone);
  };

  useEffect(() => {
    api
      .get("api/v1/staff", {})
      .then((response) => {
        const staffData = response.data;
        setStaff(staffData);
        setGender(staffData.sex);

        setEditedStaff({
          ...staffData,
        });

        setIsEditing(false);
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
    if (!validateCCCD(editedStaff.id_card)) {
      toast.error(errorMessages["108"], {
        autoClose: 900,
      });
    } else if (!validateEmail(editedStaff.email)) {
      toast.error(errorMessages["010"], {
        autoClose: 900,
      });
    } else if (!validatePhoneNumber(editedStaff.phone)) {
      toast.error(errorMessages["107"], {
        autoClose: 900,
      });
    } else {
      editedStaff.sex = gender;
      api
        .put("/api/v1/staff", editedStaff)
        .then((response) => {
          setStaff(response.data);
          setIsEditing(false);
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
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setEditedStaff((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
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
            // {
            //   label: "Birthday",
            //   name: "date_of_birth",
            //   type: Date,
            //   // value: editedStaff.date_of_birth
            //   value: format(new Date(editedStaff.date_of_birth), "dd/MM/yyyy")
            // },
            {
              label: "Bank Number",
              name: "bank_account_number",
              value: editedStaff.bank_account_number,
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
          <Grid item xs={12} sm={4}>
            <Select
              fullWidth
              label="Gender"
              name="sex"
              value={gender}
              onChange={handleGenderChange}
              disabled={!isEditing}
            >
              <MenuItem value="Nam">Nam</MenuItem>
              <MenuItem value="Nữ">Nữ</MenuItem>
            </Select>
          </Grid>

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
