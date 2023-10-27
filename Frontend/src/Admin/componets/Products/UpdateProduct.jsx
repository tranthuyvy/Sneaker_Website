import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import {
    Grid,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";

import { Fragment } from "react";
import "./CreateProduct.css";
// import { useDispatch } from "react-redux";
// import { createProduct } from "../../../Redux/Customers/Product/Action";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../config/axios";
import api from "../../../config/api"
import { toast, ToastContainer } from "react-toastify";
import errorMessagesEn from "../../../Lang/en.json";
import errorMessagesVi from "../../../Lang/vi.json";
import { useSelector } from "react-redux";
import { ImageMarker } from "mdi-material-ui";

const listBrand = [
    { id: 1, name: "Nike" },
    { id: 2, name: "Adidas" },
    { id: 3, name: "Converse" },
    { id: 4, name: "Puma" },

]


const UpdateProduct = () => {

    const [image, setImage] = useState([])
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [listImage, setListImage] = useState('')
    const [listBrand, setListBrand] = useState([]);

    const lang = useSelector((state) => state);
    const errorMessages = lang === "vi" ? errorMessagesVi : errorMessagesEn;

    const [selectedImage, setSelectedImage] = useState(null);
    const [listCategory, setListCategory] = useState([]);
    const [images, setImages] = useState([]);
    // const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const navigate = useNavigate();

    //user Params
    let id = useParams().id;
    console.log(">>> Check id: ", id);

    useEffect(() => {
        fetchApiBrand();
        fetchApi();
        fetchApiCategory();

    }, []);

    const fetchApiBrand = async () => {
        let res = await axios.get("/api/v1/brand/get");
        console.log("Check list brand: ", res.data.data);
        setListBrand(res.data.data);
    };


    const fetchApi = async () => {
        let res = await api.get(`/api/v1/product/get?id=${id}`);
        console.log("Check update data: ", res.data);
        if (res && res.data && res.data.data) {
            let data = res.data.data
            setName(data.name);
            setBrand(data.id_branch);
            setDescription(data.description);
            setPrice(data.product_price);
            setCategory(data.id_category);
            setImage(data.images);
            setListImage(data.images);
        }
        // setListCategory(res.data.data);
    }

    const fetchApiCategory = async () => {
        let res = await axios.get("/api/v1/category/get");
        console.log("Check category: ", res.data.data);
        setListCategory(res.data.data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // dispatch(createProduct({ data: productData, jwt }))
        // navigate("/admin/products")


        console.log("product Data ne", name, price, image, category, brand, description);
        const formData = new FormData();
        formData.append("name", name);
        formData.append("id_branch", brand);
        formData.append("id_category", category);
        formData.append("product_price", price);
        formData.append("description", description);
        if (image.length > 0) {
            // if (image.length === listImage.length) {
            //     return;
            // }
            if (image[0] && image[0].id) {
                console.log("Còn ảnh");
                const commonIds = [];
                console.log(">>> image: ", image, listImage);
                for (const item2 of listImage) {
                    let isCommon = false;
                    for (const item1 of image) {
                        if (item1.id === item2.id) {
                            isCommon = true;
                            break;
                        }
                    }
                    if (!isCommon && !commonIds.includes(item2.id)) {
                        commonIds.push(item2.id);
                    }
                }
                console.log(">>>> check commonIds: ", commonIds);
                for (let i = 0; i < commonIds.length; i++) {
                    formData.append(`listImageDelete[${i}]`, commonIds[i]);
                }

                // formData.append(`listImageDelete${}`, commonIds);
                // return commonIds;
            }
            else {
                console.log("Ảnh mới");
                console.log(image);
                for (let i = 0; i < image.length; i++) {
                    formData.append(`file${i + 1}`, image[i]);
                }
            }
        }
        else {
            // if (listImage) {
            //     return;
            // }
            // else {
            //     formData.append("listImageDelete: ", '');
            // }
        }

        try {
            let res = await api.put(`/api/v1/product/update?id=${id}`, formData
            );

            toast.success(errorMessages[res.data.code], {
                autoClose: 1000,
            });
            // navigate("/admin/products")
        } catch (error) {
            if (error.response && error.response.status === 500) {
                toast.error(errorMessages[error.response.data.code],
                    { autoClose: 1000 })
            } else {
                const accountErrorCode = "103";
                toast.error(errorMessages[accountErrorCode], {
                    autoClose: 1000,
                });
            }
        }
    };

    const [imageToShow, setImageToShow] = useState("");

    const handleImageChangeGPT = (e) => {
        const files = Array.from(e.target.files);
        // setImages(files);
        if (files) {
            setImage(files);

            // setSelectedImage(URL.createObjectURL(files));
        } else {
            setImage(null);
            // setSelectedImage(null);
        }
    };


    const handleRemoveImage = (index) => {
        const filteredImages = image.filter((image, i) => i !== index);
        console.log("filteredImages: ", filteredImages);

        setImage(filteredImages)


        // setProductData((prevState) => ({
        //     ...prevState,
        //     image: filteredImages,
        // }));
    };

    return (
        <Fragment className="createProductContainer ">
            <Typography
                variant="h3"
                sx={{ textAlign: "center" }}
                className="py-10 text-center "
            >
                Update Product
            </Typography>
            <div
                // onSubmit={handleSubmit}
                className="createProductContainer min-h-screen"

            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {/* <TextField
                            fullWidth
                            label="Image URL"
                            name="imageUrl"
                            // value={image}
                            // onChange={handleImageLinkChange}
                            multiple
                            onChange={handleOnChangeImage}
                            type="file"
                        /> */}
                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                multiple="multiple"
                                onChange={handleImageChangeGPT}
                            />
                            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                {image && image.map((img, index) => (
                                    // console.log(img.link)
                                    <div style={{ position: 'relative', marginRight: '10px' }}>
                                        <img
                                            key={index}
                                            // src={URL.createObjectURL(img && img.link)}
                                            src={img.link ? img.link : URL.createObjectURL(img)}
                                            alt={`img-${index}`}
                                            style={{ width: "180px", height: "180px", marginRight: "12px", borderRadius: "8px" }}
                                        />
                                        <button onClick={() => handleRemoveImage(index)} style={{ position: 'absolute', top: 0, right: "12px", backgroundColor: "green", color: "#ddd", padding: "6px" }}>X</button>
                                    </div>
                                ))}
                                {/* {console.log(">>> Check: ", image)} */}
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Brand</InputLabel>
                            <Select
                                name="brand"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                label="Brand"
                            >
                                {listBrand && listBrand.map((item, index) => {
                                    return (
                                        <MenuItem value={item.id}>{item.name}</MenuItem>
                                    )
                                })}

                                {/* <MenuItem value="women">Women</MenuItem> */}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select
                                name="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                label="Category"
                            >
                                {listCategory && listCategory.map((item, index) => {
                                    return (
                                        <MenuItem value={item.id}>{item.name}</MenuItem>
                                    )
                                })}

                                {/* <MenuItem value="women">Women</MenuItem> */}
                            </Select>
                        </FormControl>
                    </Grid>



                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Price"
                            name="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="outlined-multiline-static"
                            label="Description"
                            multiline
                            name="description"
                            rows={3}
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                    </Grid>
                    {/* {size.map((size, index) => (
                        <Grid container item spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Size Name"
                                    name="name"
                                    value={size.name}
                                    onChange={(event) => handleSizeChange(event, index)}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Quantity"
                                    name="size_quantity"
                                    type="number"
                                    onChange={(event) => handleSizeChange(event, index)}
                                    required
                                    fullWidth
                                />
                            </Grid>{" "}
                        </Grid>
                    ))} */}
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            sx={{ p: 1.8 }}
                            className="py-20"
                            size="large"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Update Product
                        </Button>
                        {/* <Button
              variant="contained"
              sx={{ p: 1.8 }}
              className="py-20 ml-10"
              size="large"
              onClick={()=>handleAddProducts(dressPage1)}
            >
              Add Products By Loop
            </Button> */}
                    </Grid>
                </Grid>
            </div>
        </Fragment>
    );
};

export default UpdateProduct;