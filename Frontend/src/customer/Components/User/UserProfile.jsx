import axios from "axios";
import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import {
  Grid,
  TextField,
  Button,
  Snackbar,
  Alert,
  Avatar,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { Fragment } from "react";
import "./UserProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      axios
        .get("http://localhost:5454/api/users/profile", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((response) => {
          const userData = response.data;
          setUser(userData);

          setEditedUser({
            ...userData,
            street: userData.streetAddress,
            state: userData.state,
            city: userData.city,
            zipCode: userData.zipCode,
          });

          setIsEditing(false);
          setUpdateSuccess(true);
        })
        .catch((error) => {
          console.error(
            "Error Call API:",
            error.response?.data || error.message
          );
        });
    }
  }, [jwt]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);

    setEditedUser(user);
  };

  const handleSaveEdit = () => {
    const updatedAddress = {
      streetAddress: editedUser.streetAddress,
      city: editedUser.city,
      state: editedUser.state,
      zipCode: editedUser.zipCode,
    };

    if (editedUser.addresses && editedUser.addresses.length > 0) {
      editedUser.addresses[0] = updatedAddress;
    } else {
      editedUser.addresses = [updatedAddress];
    }

    axios
      .put("http://localhost:5454/api/users/profile", editedUser, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        setIsEditing(false);
        setUpdateSuccess(true);
      })
      .catch((error) => {
        console.error("Error: ", error.response?.data || error.message);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (user === null) {
    return <div>Loading ...</div>;
  }

  return (
    <Fragment className="updateProfileContainer ">
      <Typography
        variant="h3"
        sx={{ textAlign: "center" }}
        className="py-10 text-center "
      >
        Profile
        <div className="flex justify-center m-10">
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
          {editedUser.firstName.charAt(0)}
        </Avatar>
        </div>
        
      </Typography>
      <form
        className="updateProfileContainer min-h-screen"
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={editedUser.email}
              //   onChange={handleChange}
              disabled={true}
              inputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={editedUser.firstName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={editedUser.lastName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Mobile"
              name="mobile"
              value={editedUser.mobile}
              onChange={handleChange}
              type="number"
              disabled={!isEditing}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Points"
              name="points"
              value={editedUser.points}
              //   onChange={handleChange}
              disabled={true}
              inputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Rank"
              name="rank"
              value={editedUser.rank}
              //   onChange={handleChange}
              disabled={true}
              inputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12}>
            {isEditing ? (
              // Hiển thị nút chỉnh sửa và lưu khi trong trạng thái chỉnh sửa
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
      </form>

      {updateSuccess && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={updateSuccess}
          autoHideDuration={5000}
          onClose={() => setUpdateSuccess(false)}
        >
          <Alert onClose={() => setUpdateSuccess(false)} severity="success">
            Profile updated successfully!
          </Alert>
        </Snackbar>
      )}
    </Fragment>
  );
};

export default UserProfile;
