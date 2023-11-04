import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../../config/api";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import errorMessagesEn from "../../../Lang/en.json";
import errorMessagesVi from "../../../Lang/vi.json";

function ChangePasswordStaff() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword1, setNewPassword1] = useState("");
    const [newPassword2, setNewPassword2] = useState("");
    const [currentPasswordError, setCurrentPasswordError] = useState("");
    const [newPassword1Error, setNewPassword1Error] = useState("");
    const [newPassword2Error, setNewPassword2Error] = useState("");

    const lang = useSelector((state) => state);
    const errorMessages = lang === "vi" ? errorMessagesVi : errorMessagesEn;

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "currentPassword") {
            setCurrentPassword(value);
            if (value.length < 6) {
                setCurrentPasswordError(errorMessages["129"]);
            } else {
                setCurrentPasswordError("");
            }
        } else if (name === "newPassword1") {
            setNewPassword1(value);
            if (value.length < 6) {
                setNewPassword1Error(errorMessages["129"]);
            } else {
                setNewPassword1Error("");
            }

        } else if (name === "newPassword2") {
            setNewPassword2(value);
            if (value.length < 6) {
                setNewPassword2Error(errorMessages["129"]);
            } else {
                setNewPassword2Error("");
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log("hello:", currentPassword, newPassword1, newPassword2);
        if (!currentPassword || !newPassword1 || !newPassword2) {
            // setPasswordError(errorMessages["101"]);
            if (!currentPassword) {
                setCurrentPasswordError(errorMessages["101"]);
            }
            if (!newPassword1) {
                setNewPassword1Error(errorMessages["101"]);
            }
            if (!newPassword2) {
                setNewPassword2Error(errorMessages["101"]);
            }
            return;

        }

        if (currentPassword.length < 6) {
            setCurrentPasswordError(errorMessages["129"]);
            return;
        }
        if (newPassword1.length < 6) {
            setNewPassword1Error(errorMessages["129"]);
            return;
        }
        if (newPassword2.length < 6) {
            setNewPassword2Error(errorMessages["129"]);
            return;
        }
        try {
            const response = await api.put("/api/v1/admin/change-password", {
                currentPassword,
                newPassword1,
                newPassword2,
            });

            if (response.status === 200) {
                setCurrentPassword("");
                setNewPassword1("");
                setNewPassword2("");
                toast.success(errorMessages["213"], {
                    autoClose: 1000,
                });
                dispatch({ type: 'LANG_ENG' });
                // navigate("/admin/login");
            }
        } catch (error) {
            if (error.response && error.response.status === 500) {
                toast.error(errorMessages[error.response.data.code],
                    { autoClose: 1000 });
            } else {
                const accountErrorCode = "103";
                toast.error(errorMessages[accountErrorCode], {
                    autoClose: 1000,
                });
            }
        }
    }

    return (
        <React.Fragment>
            <form style={{ width: "50%" }} onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            name="currentPassword"
                            label="Current Password"
                            fullWidth
                            autoComplete="given-name"
                            value={currentPassword}
                            onChange={handleInputChange}
                            error={!!currentPasswordError}
                            helperText={currentPasswordError}
                            type="password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="newPassword1"
                            label="New Password"
                            fullWidth
                            autoComplete="userName"
                            value={newPassword1}
                            onChange={handleInputChange}
                            error={!!newPassword1Error}
                            helperText={newPassword1Error}
                            type="password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="newPassword2"
                            label="New Password Again"
                            fullWidth
                            autoComplete="new-password"
                            type="password"
                            value={newPassword2}
                            onChange={handleInputChange}
                            error={!!newPassword2Error}
                            helperText={newPassword2Error}
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
                            {lang === "vi" ? "Đổi mật khẩu" : "Change Password"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <ToastContainer />
        </React.Fragment>
    );
}

export default ChangePasswordStaff;
