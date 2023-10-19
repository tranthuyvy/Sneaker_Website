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
    const lang = useSelector((state) => state);
    const errorMessages = lang === "vi" ? errorMessagesVi : errorMessagesEn;

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // dispatch(createProduct({ data: productData, jwt }))
        // navigate("/admin/products")


        console.log("product Data ne", productData);
        const formData = new FormData();
        formData.append("name", productData.name);
        formData.append("id_branch", productData.brand);
        formData.append("id_category", productData.category);
        formData.append("product_price", productData.price);
        formData.append("description", productData.description);
        formData.append("file", productData.image);

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
        setImages(files);
    };

    const handleImageLinkChange = (e) => {
        const imageUrl = e.target.value;
        setProductData((prevState) => ({
            ...prevState,
            imageUrl: imageUrl,
        }));

        setImageToShow(imageUrl);
    };

    return (
        <Fragment className="createProductContainer ">
            <Typography
                variant="h3"
                sx={{ textAlign: "center" }}
                className="py-10 text-center "
            >
                Product
            </Typography>
            <form
                onSubmit={handleSubmit}
                className="createProductContainer min-h-screen"
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {/* <TextField
                            fullWidth
                            label="Image URL"
                            name="imageUrl"
                            // value={productData.image}
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
                            <div>
                                {images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={URL.createObjectURL(image)}
                                        alt={`img-${index}`}
                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                    />
                                ))}
                            </div>
                        </div>
                    </Grid>
                    {selectedImage && (
                        <Grid item xs={12}>
                            <img
                                src={selectedImage}
                                alt="Product"
                                style={{ maxWidth: "200px", height: "auto" }}
                            />
                            <div onClick={() => setSelectedImage(null)}>x</div>
                        </Grid>
                    )}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={productData.name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Brand</InputLabel>
                            <Select
                                name="brand"
                                value={productData.brand}
                                onChange={handleChange}
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
                                value={productData.category}
                                onChange={handleChange}
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
                            value={productData.price}
                            onChange={handleChange}
                            type="number"
                        />
                    </Grid>

                    {/* <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Discounted Price"
                            name="discountedPrice"
                            value={productData.discountedPrice}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Discount Percentage"
                            name="discountPersent"
                            value={productData.discountPersent}
                            onChange={handleChange}
                            type="number"
                        />
                    </Grid> */}

                    {/*
                    <Grid item xs={6} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel>Second Level Category</InputLabel>
                            <Select
                                name="secondLavelCategory"
                                value={productData.secondLavelCategory}
                                onChange={handleChange}
                                label="Second Level Category"
                            >
                                <MenuItem value="adidas">Adidas</MenuItem>
                                <MenuItem value="converse">Converse</MenuItem>
                                <MenuItem value="nike">Nike</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel>Third Level Category</InputLabel>
                            <Select
                                name="thirdLavelCategory"
                                value={productData.thirdLavelCategory}
                                onChange={handleChange}
                                label="Third Level Category"
                            >
                                {productData.secondLavelCategory === "nike" && (
                                    <MenuItem value="air_force_1">Air Force 1</MenuItem>
                                )}

                                {productData.secondLavelCategory === "nike" && (
                                    <MenuItem value="air_max">Air Max</MenuItem>
                                )}

                                {productData.secondLavelCategory === "nike" && (
                                    <MenuItem value="basketball">Basketball</MenuItem>
                                )}

                                {productData.secondLavelCategory === "converse" && (
                                    <MenuItem value="chuck_70">Chuck 70</MenuItem>
                                )}

                                {productData.secondLavelCategory === "converse" && (
                                    <MenuItem value="classic_chuck">Classic Chuck</MenuItem>
                                )}

                                {productData.secondLavelCategory === "nike" && (
                                    <MenuItem value="jordan">Jordan</MenuItem>
                                )}

                                {productData.secondLavelCategory === "nike" && (
                                    <MenuItem value="life_style">Lifestyle</MenuItem>
                                )}

                                {productData.secondLavelCategory === "adidas" && (
                                    <MenuItem value="hiking">Hiking</MenuItem>
                                )}

                                {productData.secondLavelCategory === "adidas" && (
                                    <MenuItem value="golf">Golf</MenuItem>
                                )}

                                {productData.secondLavelCategory === "adidas" && (
                                    <MenuItem value="gym">Gym</MenuItem>
                                )}

                                {productData.secondLavelCategory === "adidas" && (
                                    <MenuItem value="running">Running</MenuItem>
                                )}

                                {productData.secondLavelCategory === "adidas" && (
                                    <MenuItem value="soccer">Soccer</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Grid> */}
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
                    {/* {productData.size.map((size, index) => (
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
                        >
                            Add New Product
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
            </form>
        </Fragment>
    );
};

export default CreateProduct;