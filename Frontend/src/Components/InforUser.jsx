import React, { useEffect, useState } from "react";
import { InputAdornment, Typography } from "@mui/material";
import { Grid, TextField, Button, Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { Fragment } from "react";
import Lottie from "lottie-react";
import validator from "validator";
import axiosApiInstance from "../config/api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
function InforUser() {
  const [user, setUser] = useState();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [delay, setDelay] = useState(Math.random() * 4000 + 500);
  const [errorName, setErrorName] = useState({ isValid: true, err: "" });
  const [errorPhone, setErrorPhone] = useState({ isValid: true, err: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    function call() {
      getUser()
        .then((data) => setIsLoading(false))
        .catch((err) => {
          setTimeout(() => {
            call();
          }, delay);
        });
    }
    call();
  }, []);

  return (
    <div className=" w-2/3 bg-white">
      {isLoading ? (
        <Lottie
          style={{
            width: "70%",
            height: "50%",
            cursor: "pointer",
          }}
          animationData={require("../Animation/Loading.json")}
          loop={true}
        />
      ) : null}
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
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
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
      <div className="h-44 pl-20">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5} key={1}>
            <span>Name</span>
            <TextField
              fullWidth
              placeholder={"name"}
              name={"name"}
              value={name}
              onChange={handleChange}
              type={"text"}
              error={!errorName.isValid}
            />
            <p hidden={errorName.isValid} className="text-red-500">
              {errorName.err}
            </p>
          </Grid>
          <Grid item xs={12} sm={5} key={2}>
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
          <Grid item xs={12} sm={2} key={3}>
            <span>Phone</span>
            <TextField
              fullWidth
              placeholder={"phone"}
              name={"phone"}
              value={phone}
              onChange={handleChange}
              type={"text"}
            />
            <p hidden={errorPhone.isValid} className="text-red-500">
              {errorPhone.err}
            </p>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ p: 1.8 }}
              className="py-20"
              size="large"
              hidden={!errorName.isValid || !errorPhone.isValid}
              // onClick={handleEdit}
            >
              Update Profile
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
  async function getUser() {
    const data = (await axiosApiInstance.get("api/v1/user")).data.data;
    setUser(data);
    setName(data?.name || "");
    setPhone(data?.phone || "");
  }
  function handleChangeName(name) {
    if (name.localeCompare("") == 0) {
      setErrorName({ isValid: false, err: "Name is Empty" });
    } else setErrorName({ isValid: true, err: "No thing" });
    setName(name);
  }
  function handleChangePhone(phone) {
    if (phone.localeCompare("") == 0) {
      setErrorPhone({ isValid: false, err: "Phone is Empty" });
    } else if (!validator.isNumeric(phone)) {
      return setErrorPhone({ isValid: false, err: "Phone must be number" });
    } else {
      setPhone(phone);
      setErrorPhone({ isValid: true, err: "No thing" });
    }
  }
  function handleChange(event) {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        handleChangeName(value);
        break;
      case "phone":
        handleChangePhone(value);
        break;
      default:
        break;
    }
  }
}
export default InforUser;
