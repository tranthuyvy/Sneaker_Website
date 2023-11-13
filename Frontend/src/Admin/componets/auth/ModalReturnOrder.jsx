import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid, TextField, Button, Box, createTheme, ThemeProvider, Typography } from "@mui/material";
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

const ModalReturnOrder = (props) => {
    const { modalIsOpen, setIsOpen, id_order } = props;
    const [email, setEmail] = useState("");
    const [content, setContent] = useState("");
    const [password, setPassword] = useState("");
    const [contentErr, setContentErr] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [image, setImage] = useState("");
    const [imageErr, setImageErr] = useState("");

    const [eye, setEye] = useState(false);
    const lang = useSelector((state) => state);
    const errorMessages = lang === "vi" ? errorMessagesVi : errorMessagesEn;
    const handleSubmit = async () => {
        try {

            if (image.length <= 0) {
                setImageErr(errorMessages["123"]);
                if (!content) {
                    setContentErr(errorMessages["009"]);
                }

                return;
            }
            if (!content) {
                setContentErr(errorMessages["009"]);
                return;
            }

            console.log(">>> check thông tin: ", content, id_order);
            const formData = new FormData();
            formData.append("content", content);
            formData.append("id_order", id_order);
            if (image.length > 0) {
                for (let i = 0; i < image.length; i++) {
                    formData.append(`file${i + 1}`, image[i]);
                }
            }
            let res = await axios.post("/api/v1/refund/create", formData);
            console.log("res: ", res);
            if (res && res.data && res.data.code) {
                let errCode = res.data.code;
                if (errCode == "004") {
                    toast.success(errorMessages[errCode], {
                        autoClose: 1000,
                    });
                    setContent("");
                    setImage([]);
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

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleInputChange = (event) => {
        let { name, value } = event.target;
        if (name == "content") {
            setContent(value);
            setContentErr("");
        }

    };
    const handleImageChangeGPT = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const isImage = files.every(file => file.type.startsWith('image/'));
            // setImages(files);

            if (isImage) {
                // setProductData((prevState) => ({
                //   ...prevState,
                //   image: files,
                // }));
                setImage(files);
                setImageErr("");
            } else {
                toast.error(errorMessages[224], {
                    autoClose: 1000,
                });
                // setProductData((prevState) => ({
                //   ...prevState,
                //   image: null,
                // }));
                setImage(null);
            }
        }
    };

    const handleRemoveImage = (index) => {
        const filteredImages = image.filter((img, i) => i !== index);
        // setProductData((prevState) => ({
        //   ...prevState,
        //   image: filteredImages,
        // }));
        setImage(filteredImages)
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
                    MODAL RETURN ORDER</Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} style={{ borderColor: "white" }}>
                        <div className="body-modal-forgot">
                            <input
                                type="file"
                                accept="image/*"
                                multiple="multiple"
                                onChange={(e) => {
                                    handleImageChangeGPT(e);
                                    // setIsImageSelected(false);
                                }}
                            //   onChange={handleImageChangeGPT}
                            />
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                }}
                            >
                                {image &&
                                    image.map((img, index) => (
                                        <div style={{ position: "relative", marginRight: "10px" }}>
                                            <img
                                                key={index}
                                                src={URL.createObjectURL(img)}
                                                alt={`img-${index}`}
                                                style={{
                                                    width: "180px",
                                                    height: "180px",
                                                    marginRight: "12px",
                                                    borderRadius: "8px",
                                                }}
                                            />
                                            <button
                                                onClick={() => handleRemoveImage(index)}
                                                style={{
                                                    position: "absolute",
                                                    top: 0,
                                                    right: "12px",
                                                    backgroundColor: "green",
                                                    color: "#ddd",
                                                    padding: "6px",
                                                }}
                                            >
                                                X
                                            </button>
                                        </div>
                                    ))}
                            </div>
                            {imageErr && (
                                <Typography variant="body2" sx={{ color: "red" }}>
                                    {imageErr}
                                </Typography>
                            )}
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="body-modal-forgot" style={{ position: "relative" }}>
                            <label>Enter Content:</label>
                            {/* <div style={{ position: "relative" }}> */}
                            <TextField
                                name="content"
                                value={content}
                                onChange={handleInputChange}
                                placeholder="Enter content"
                                // className="input-modal-forgot"
                                type={"text"}
                                // style={passwordError ? { border: "1px solid red" } : { border: "1px solid gray" }}
                                error={contentErr}
                                helperText={contentErr}
                            />


                            {/* </div> */}
                        </div>
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

export default ModalReturnOrder