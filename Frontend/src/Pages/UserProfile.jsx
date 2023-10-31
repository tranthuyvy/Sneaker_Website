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
import { Select, MenuItem } from "@mui/material";
import errorMessagesEn from "../Lang/en.json";
import errorMessagesVi from "../Lang/vi.json";
import "../Styles/UserDetail.css";
function UserProfile() {
  const [user, setUser] = useState();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [delay, setDelay] = useState(Math.random() * 4000 + 500);
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    function call() {
      getUser()
        .then()
        .catch((err) => {
          setTimeout(() => {
            call();
          }, delay);
        });
    }
    call();
  }, []);
  return (
    <Fragment className='h-screen'>
      <Typography
        variant="h3"
        sx={{ textAlign: "center" }}
        className="py-10 text-center"
      >
        Hello, {user?.name}
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
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="Selected Avatar"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : null}
            </Avatar>
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
      <div className="h-44 px-20">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} key={1}>
            <span>Name</span>
            <TextField
              fullWidth
              placeholder={"name"}
              name={"name"}
              value={name}
              onChange={handleChange}
              type={"text"}
            />
          </Grid>
          <Grid item xs={12} sm={4} key={2}>
            <span>Email</span>
            <TextField
              fullWidth
              placeholder={"email"}
              name={"email"}
              value={user?.email}
              onChange={handleChange}
              type={"text"}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={4} key={3}>
            <span>Phone</span>
            <TextField
              fullWidth
              placeholder={"phone"}
              name={"phone"}
              value={phone}
              onChange={handleChange}
              type={"text"}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ p: 1.8 }}
              className="py-20"
              size="large"
              // onClick={handleEdit}
            >
              Update Profile
            </Button>
          </Grid>
        </Grid>
        <ToastContainer />
      </div>
    </Fragment>
  );
  async function getUser() {
    const data = (await axiosApiInstance.get("api/v1/user")).data.data;
    setUser(data);
    setName(data?.name || "");
    setPhone(data?.phone || "");
  }
  function handleChange(event) {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "phone":
        setPhone(value);
        break;
      default:
        break;
    }
  }
}

export default UserProfile;
