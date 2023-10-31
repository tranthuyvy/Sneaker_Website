import React, { useEffect, useState } from "react";
import { InputAdornment, Typography } from "@mui/material";
import { Grid, TextField, Button, Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { Fragment } from "react";
import { format } from "date-fns";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import axiosApiInstance from "../config/api";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import errorMessagesEn from "../Lang/en.json";
import errorMessagesVi from "../Lang/vi.json";
import { Select, MenuItem } from "@mui/material";
function UserProfile() {
  const [user, setUser] = useState();
  const [delay, setDelay] = useState(Math.random() * 4000 + 500);
  useEffect(() => {
    async function call() {
      getUser()
        .then()
        .catch((err) => {
          setTimeout(() => {
            call().catch((err) => {});
          },delay);
        });
    }
    call().then().catch();
  }, []);
  return (
    <Fragment>
      <Typography
        variant="h3"
        sx={{ textAlign: "center" }}
        className="py-10 text-center"
      >
        {/* Hello, {editedStaff.name} */}
        <div className="flex justify-center m-10">
          <label htmlFor="fileInput">
            {/* <Avatar
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
            </Avatar> */}
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            // onChange={handleImageChange}
          />
        </div>
      </Typography>
      {/* <form className="updateProfileContainer min-h-screen">
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
      </form> */}
    </Fragment>
  );
  async function getUser() {
    const data = (await axiosApiInstance.get("api/v1/user")).data.data;
  }
}

export default UserProfile;
