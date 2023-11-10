import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid, TextField, Button, Box, createTheme, ThemeProvider } from "@mui/material";
import axios from "../../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import errorMessagesEn from "../../../Lang/en.json";
import errorMessagesVi from "../../../Lang/vi.json";
import { applyMiddleware } from "redux";
import axiosApiInstance from "../../../config/api";
import Modal from "react-modal";
import "./ModalForgotPassword.css"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const customStyles = {
    overlay: {
        zIndex: 9999, // Đặt giá trị z-index cao
        backgroundColor: "rgba(255, 255, 255, 0.18)"
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        // marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgb(255, 255, 255)',
        border: '1px solid #000',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        color: "black",
        padding: '20px', zIndex: 9999,
    },
};


const ModalForgotPassword = (props) => {
    const { modalIsOpen, setIsOpen } = props;
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [eye, setEye] = useState(false);
    const lang = useSelector((state) => state);
    const errorMessages = lang === "vi" ? errorMessagesVi : errorMessagesEn;
    const handleSubmit = async () => {
        console.log("Hello: ", email, code, password);
        try {
            if (emailError) {
                toast.error(errorMessages["010"], {
                    autoClose: 1000,
                });
                return
            }
            if (passwordError) {
                toast.error(errorMessages["129"], {
                    autoClose: 1000,
                });
                return
            }
            let res = await axios.put("/api/v1/auth/change-password-forgot", { email, code, newPassword: password });
            console.log("res: ", res);
            if (res && res.data && res.data.code) {
                let errCode = res.data.code;
                if (errCode == "213") {
                    toast.success(errorMessages[errCode], {
                        autoClose: 1000,
                    });
                    setEmail("");
                    setCode("");
                    setPassword("");
                    setIsOpen(false);
                }
                else {
                    toast.error(errorMessages[errCode], {
                        autoClose: 1000,
                    });
                }
            }

        } catch (e) {
            console.log(e);
            if (e && e.response && e.response.data && e.response.data.code) {
                toast.error(errorMessages[e.response.data.code], {
                    autoClose: 1000,
                });
            }
        }
    }

    const handleSendCode = async () => {

        try {

            if (emailError) {
                toast.error(errorMessages["010"], {
                    autoClose: 1000,
                });
                return
            }
            // if (passwordError) {
            //     toast.error(errorMessages["129"], {
            //         autoClose: 1000,
            //     });
            //     return
            // }
            let res = await axios.post("/api/v1/auth/forgot-password", { email });
            console.log("res: ", res);
            if (res && res.data && res.data.code) {
                let errCode = res.data.code;
                if (errCode == "217") {
                    toast.success(errorMessages[errCode], {
                        autoClose: 1000,
                    });
                }
                else {
                    toast.error(errorMessages[errCode], {
                        autoClose: 1000,
                    });
                }
            }

        } catch (e) {
            console.log(e);
            if (e && e.response && e.response.data && e.response.data.code) {
                toast.error(errorMessages[e.response.data.code], {
                    autoClose: 1000,
                });
            }
        }
    }
    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleInputChange = (event) => {
        let { name, value } = event.target;
        if (name == "email") {
            setEmail(value);
            if (!validateEmail(value)) {
                setEmailError(errorMessages["010"])
            }
            else {
                setEmailError("")
            }
        }
        if (name == "code") {
            setCode(value);
        }
        if (name == "password") {
            setPassword(value);
            if (value.length < 6) {
                setPasswordError(errorMessages["129"])
            } else {
                setPasswordError("")
            }

        }
    };


    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
                contentLabel="Example Modal"
                shouldCloseOnOverlayClick={true} // Đóng modal khi nhấn ra ngoài
            >
                {/* <form style={{ width: "50%" }} onSubmit={handleSubmit}> */}
                <Grid item xs={12} style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "bold" }}>
                    FORGOT PASSWORD</Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} style={{ borderColor: "white" }}>
                        <div className="body-modal-forgot">
                            <label>Enter email:</label>
                            <input
                                name="email"
                                value={email}
                                onChange={handleInputChange}
                                className="input-modal-forgot"
                                placeholder="Enter email"
                                style={emailError ? { border: "1px solid red" } : { border: "1px solid gray" }}
                            // error={!!usernameError}
                            // helperText={usernameError}
                            />
                            {emailError && <p style={{ color: "red", fontStyle: "italic" }}>   {emailError}</p>}
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="body-modal-forgot">
                            <label>Enter Code:</label>
                            <div className="form-input-code">
                                <input
                                    name="code"
                                    value={code}
                                    onChange={handleInputChange}
                                    className="input-modal-forgot"
                                    placeholder="Enter code"
                                // error={!!usernameError}
                                // helperText={usernameError}
                                />
                                <Button
                                    className="bg-[#9155FD] w-full"
                                    type="submit"
                                    variant="contained"
                                    style={{ backgroundColor: "#039be5" }}
                                    size="large"
                                    sx={{ padding: ".8rem 0" }}
                                    onClick={handleSendCode}
                                >
                                    {lang === "vi" ? "Gửi mã" : "Send Code"}
                                </Button>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="body-modal-forgot" style={{ position: "relative" }}>
                            <label>Enter password:</label>
                            {/* <div style={{ position: "relative" }}> */}
                            <input
                                name="password"
                                value={password}
                                onChange={handleInputChange}
                                placeholder="Enter password"
                                className="input-modal-forgot"
                                type={eye ? "text" : "password"}
                                style={passwordError ? { border: "1px solid red" } : { border: "1px solid gray" }}
                            // error={!!usernameError}
                            // helperText={usernameError}
                            /><div style={{ position: "absolute", right: "15px", bottom: "18px", cursor: "pointer" }}>
                                {
                                    eye ? <RemoveRedEyeIcon onClick={() => setEye(false)} /> : <VisibilityOffIcon onClick={() => setEye(true)} />}</div>


                            {/* </div> */}
                        </div>
                        {passwordError && <p style={{ color: "red", fontStyle: "italic" }}>   {passwordError}</p>}
                    </Grid>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={12} style={{ display: "flex", position: "relative", bottom: 0, right: 0 }}>
                        <Grid item xs={3} style={{ position: "absolute", bottom: 0, right: "220px", width: "100px" }}>
                            <Button
                                className="bg-[#9155FD] w-full button-close"
                                type="submit"
                                variant="contained"
                                style={{ backgroundColor: "#78909c" }}
                                size="large"
                                sx={{ padding: ".8rem 0" }}
                                onClick={() => setIsOpen(false)}
                            >
                                {lang === "vi" ? "Đóng" : "Close"}
                            </Button></Grid>
                        <Grid item xs={3} style={{ position: "absolute", bottom: 0, right: 0, width: "200px" }}>
                            <Button
                                className="bg-[#9155FD] w-full"
                                type="submit"
                                variant="contained"
                                style={{ backgroundColor: "#039be5" }}
                                size="large"
                                sx={{ padding: ".8rem 0" }}
                                onClick={handleSubmit}
                            >
                                {lang === "vi" ? "Lưu thay đổi" : "Save Change"}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                {/* </form> */}

            </Modal >
        </>
    )
}

export default ModalForgotPassword