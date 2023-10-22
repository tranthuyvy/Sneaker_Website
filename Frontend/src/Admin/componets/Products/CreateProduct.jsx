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
import { useNavigate } from "react-router-dom";
import axios from "../../../config/axios";
import api from "../../../config/api"
import { toast, ToastContainer } from "react-toastify";
import errorMessagesEn from "../../../Lang/en.json";
import errorMessagesVi from "../../../Lang/vi.json";
import { useSelector } from "react-redux";
import { ImageMarker } from "mdi-material-ui";

const initialSizes = [
    { name: "6", quantity: 0 },
    { name: "7", quantity: 0 },
    { name: "8", quantity: 0 },
    { name: "9", quantity: 0 },
    { name: "10", quantity: 0 },
    { name: "11", quantity: 0 },
];

const listBrand = [
    { id: 1, name: "Nike" },
    { id: 2, name: "Adidas" },
    { id: 3, name: "Converse" },
    { id: 4, name: "Puma" },

]

const CreateProduct = () => {
    const lang = useSelector((state) => state);
    const errorMessages = lang === "vi" ? errorMessagesVi : errorMessagesEn;
    const [errors, setErrors] = useState({
        name: "",
        brand: "", 
        category: "",
        price: "",
    });
    

    const [productData, setProductData] = useState({
        image: "",
        brand: "",
        category: "",
        name: "",
        price: "",
        discountPersent: "",
        size: initialSizes,
        description: "",
    });

    const [selectedImage, setSelectedImage] = useState(null);
    const [listCategory, setListCategory] = useState([]);
    const [images, setImages] = useState([]);
    // const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const navigate = useNavigate();

    useEffect(() => {
        fetchApi(listCategory);
    }, []);

    const fetchApi = async (listCategory) => {
        let res = await axios.get("/api/v1/category/get");
        console.log("Check category: ", res.data.data);
        setListCategory(res.data.data);
    }

    const handleOnChangeImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProductData((prevState) => ({
                ...prevState,
                image: file,
            }));
            setSelectedImage(URL.createObjectURL(file));
        } else {
            setProductData((prevState) => ({
                ...prevState,
                image: null,
            }));
            setSelectedImage(null);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProductData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleChangeNumber = (e) => {
        const { name, value } = e.target;
        if (isNaN(value) || value.includes('.') || value.includes(' ')) {
            return;
        }

        setProductData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSizeChange = (e, index) => {
        let { name, value } = e.target;
        name === "size_quantity" ? (name = "quantity") : (name = e.target.name);

        const sizes = [...productData.size];
        sizes[index][name] = value;
        setProductData((prevState) => ({
            ...prevState,
            size: sizes,
        }));
    };

    // const handleAddSize = () => {
    //   const sizes = [...productData.size];
    //   sizes.push({ name: "", quantity: "" });
    //   setProductData((prevState) => ({
    //     ...prevState,
    //     size: sizes,
    //   }));
    // };

    // const handleRemoveSize = (index) => {
    //   const sizes = [...productData.size];
    //   sizes.splice(index, 1);
    //   setProductData((prevState) => ({
    //     ...prevState,
    //     size: sizes,
    //   }));
    // };
    const validateInput = () => {
        const newErrors = {};
    
        if (!productData.name) {
            newErrors.name = errorMessages["119"];
        }

        if (!productData.brand) {
            console.log(productData.brand)
            newErrors.brand = errorMessages["120"];
        }
        if (!productData.category) {
            newErrors.category = errorMessages["121"];
        }
        if (!productData.price) {
            newErrors.price = errorMessages["122"];
        }
        
    
        setErrors(newErrors);
    
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // dispatch(createProduct({ data: productData, jwt }))
        // navigate("/admin/products")
        if (validateInput()) {


        console.log("product Data ne", productData);
        const formData = new FormData();
        formData.append("name", productData.name);
        formData.append("id_branch", productData.brand);
        formData.append("id_category", productData.category);
        formData.append("product_price", productData.price);
        formData.append("description", productData.description);
        if (productData.image.length > 0) {
            for (let i = 0; i < productData.image.length; i++) {
                formData.append(`file${i + 1}`, productData.image[i]);
            }
        }
        

        try {
            let res = await api.post("/api/v1/product/create", formData
            );
            
            toast.success(errorMessages[res.data.code], {
                autoClose: 1000,
            });
            navigate("/admin/products")
        } catch (error) {
            if (error.response && error.response.status === 500) {
                toast.error(errorMessages[error.response.data.code],
                    { autoClose: 1000 })
            } else {
            //     const accountErrorCode = "103";
            //     toast.error(errorMessages[accountErrorCode], {
            //         autoClose: 1000,
            //     });
            }
        }
    }
};

    const [imageToShow, setImageToShow] = useState("");

    const handleImageChangeGPT = (e) => {
        const files = Array.from(e.target.files);
        // setImages(files);
        if (files) {
            setProductData((prevState) => ({
                ...prevState,
                image: files,
            }));
            // setSelectedImage(URL.createObjectURL(files));
        } else {
            setProductData((prevState) => ({
                ...prevState,
                image: null,
            }));
            // setSelectedImage(null);
        }
    };

    const handleImageLinkChange = (e) => {
        const imageUrl = e.target.value;
        setProductData((prevState) => ({
            ...prevState,
            imageUrl: imageUrl,
        }));

        setImageToShow(imageUrl);
    };

    const handleRemoveImage = (index) => {
        const filteredImages = productData.image.filter((image, i) => i !== index);
        setProductData((prevState) => ({
            ...prevState,
            image: filteredImages,
        }));
    };

    return (
        <Fragment className="createProductContainer ">
            <Typography
                variant="h3"
                sx={{ textAlign: "center" }}
                className="py-10 text-center "
            >
                Create Product
            </Typography>
            <form
                onSubmit={handleSubmit}
                className="createProductContainer min-h-screen"

            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        
                            <input
                                type="file"
                                accept="image/*"
                                multiple="multiple"
                                onChange={handleImageChangeGPT}
                            />
                            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                {productData.image && productData.image.map((image, index) => (
                                    <div style={{ position: 'relative', marginRight: '10px' }}>
                                        <img
                                            key={index}
                                            src={URL.createObjectURL(image)}
                                            alt={`img-${index}`}
                                            style={{ width: "180px", height: "180px", marginRight: "12px", borderRadius: "8px" }}
                                        />
                                        <button onClick={() => handleRemoveImage(index)} style={{ position: 'absolute', top: 0, right: "12px", backgroundColor: "green", color: "#ddd", padding: "6px" }}>X</button>
                                    </div>
                                ))}

                            </div>
                        
                    </Grid>
                    {selectedImage && (
                        <Grid item xs={12} style={{ textAlign: 'center' }}>
                            <img
                                src={selectedImage}
                                alt="Product"
                                style={{ maxWidth: "50%", height: "auto", objectFit: "contain" }}
                            />
                            <div onClick={() => setSelectedImage(null)}>x</div>
                        </Grid>
                    )}
                    <Grid item xs={6} sm={6}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={productData.name}
                            onChange={handleChange}
                            error={Boolean(errors.name)}
                            helperText={errors.name}
                        />
                        
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Brand</InputLabel>
                            <Select
                                name="brand"
                                value={productData.brand}
                                onChange={handleChange}
                                label="Brand"
                                error={Boolean(errors.brand)}
                                helperText={errors.brand}
                            >
                                {listBrand && listBrand.map((item, index) => {
                                    return (
                                        <MenuItem value={item.id}>{item.name}</MenuItem>
                                    )
                                })}

                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select
                                name="category"
                                value={productData.category}
                                onChange={handleChange}
                                label="Category"
                                error={Boolean(errors.category)}
                                helperText={errors.category}
                            >
                                {listCategory && listCategory.map((item, index) => {
                                    return (
                                        <MenuItem value={item.id}>{item.name}</MenuItem>
                                    )
                                })}

                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6} sm={6}>
                        <TextField
                            fullWidth
                            label="Price"
                            name="price"
                            value={productData.price}
                            onChange={handleChangeNumber}
                            error={Boolean(errors.price)}
                            helperText={errors.price}
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
                            onChange={handleChange}
                            value={productData.description}
                        />
                    </Grid>
    
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            sx={{ p: 1.8 }}
                            className="py-20"
                            size="large"
                            type="submit"
                        >
                            Add Product
                        </Button>
                        
                    </Grid>
                </Grid>
            </form>
        </Fragment>
    );
};

export default CreateProduct;