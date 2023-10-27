import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Pagination,
} from "@mui/material";

import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import Barcode from "react-barcode";
import api from "../../../config/api";
import DisableProduct from "./DisableProduct";

const ProductsTable = () => {
  const navigate = useNavigate();
  //  
  const [open, setOpen] = useState(false);
  const [idProductDelete, setIdProductDelete] = useState('')
  const [nameProductDelete, setNameProductDelete] = useState('')
  //
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 6;

  const fetchProducts = (page) => {
    api
      .get(`api/v1/product/get?page=${page}&pageSize=${pageSize}`)
      .then((response) => {
        const productsArray = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        setProducts(productsArray);
        setCurrentPage(page);
        setTotalPages(response.data.totalPage);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      });
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, []);

  const handlePaginationChange = (event, page) => {
    fetchProducts(page);
  };

  const handleDeleteProduct = (productId, productName) => {
    console.log("delete product ", productId, productName);
    setOpen(true)
    setIdProductDelete(productId)
    setNameProductDelete(productName)
  };

  return (
    <Box width={"100%"}>
      <Card className="p-3">
        {/* <CardHeader
          title="Sort"
          sx={{
            pt: 0,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        /> */}
        <Grid container spacing={2}>
          <Grid item xs={4}>
            {/* <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterValue.category}
                label="Category"
                onChange={(e) => handleFilterChange(e, "category")}
              >
                <MenuItem value={""}>All</MenuItem>
                <MenuItem value={"golf"}>Adidas Golf</MenuItem>
                <MenuItem value={"gym"}>Adidas Gym</MenuItem>
                <MenuItem value={"hiking"}>Adidas Hiking</MenuItem>
                <MenuItem value={"running"}>Adidas Running</MenuItem>
                <MenuItem value={"soccer"}>Adidas Soccer</MenuItem>
                <MenuItem value={"chuck_70"}>Converse Chuck 70</MenuItem>
                <MenuItem value={"classic_chuck"}>
                  Converse Classic Chuck
                </MenuItem>
                <MenuItem value={"air_force_1"}>Nike Air Force 1</MenuItem>
                <MenuItem value={"air_max"}>Nike Air Max</MenuItem>
                <MenuItem value={"basketball"}>Nike Basketball</MenuItem>
                <MenuItem value={"jordan"}>Nike Jordan</MenuItem>
                <MenuItem value={"life_style"}>Nike Lifestyle</MenuItem>
              </Select>
            </FormControl> */}
          </Grid>
          {/* <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Availability
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterValue.availability}
                label="Availability"
                onChange={(e) => handleFilterChange(e, "availability")}
              >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"in_stock"}>Instock</MenuItem>
                <MenuItem value={"out_of_stock"}>Out Of Stock</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
          <Grid item xs={4}>
            {/* <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Sort By Price
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterValue.sort}
                label="Sort By Price"
                onChange={(e) => handleFilterChange(e, "sort")}
              >
                <MenuItem value={"price_high"}>Heigh - Low</MenuItem>
                <MenuItem value={"price_low"}>Low - Heigh</MenuItem>
              </Select>
            </FormControl> */}
          </Grid>
        </Grid>
      </Card>
      <Card className="mt-2">
        <CardHeader
          title={
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ flex: 1 }}>All Products</span>

              <Button
                onClick={() => navigate("/admin/product/create")}
                variant="contained"
                color="primary"
              >
                Create Product
              </Button>
            </div>
          }
          sx={{ pt: 2, "& .MuiCardHeader-action": { mt: 0.6 } }}
        />
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>QR CODE</TableCell>
                <TableCell>BAR CODE</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                {/* <TableCell sx={{ textAlign: "center" }}>Category</TableCell> */}
                <TableCell sx={{ textAlign: "center" }}>Price</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Brand</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Category</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Action</TableCell>
                {/* <TableCell sx={{ textAlign: "center" }}>Delete</TableCell> */}
                <TableCell sx={{ textAlign: "center" }}>Reviews</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow
                  hover
                  key={product.id}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                >
                  <TableCell>
                    {product.id && (
                      <QRCode
                        size={140}
                        bgColor="white"
                        fgColor="black"
                        // value={`http://localhost:3000/product/${item.id}`}
                        value={`https://www.nike.com/t/air-jordan-xxxvii-low-basketball-shoes-00ZHpg/DQ4122-007`}
                      />
                    )}
                  </TableCell>

                  <TableCell>
                    <Barcode
                      style={{ width: "50px", height: "auto" }}
                      value={product.id}
                    />
                  </TableCell>

                  <TableCell>
                    {" "}
                    {
                      product && product.images && product.images.length > 0 && product.images.map((item, index) => {
                        return (
                          <Avatar
                            // alt={product.name}
                            src={item.link}
                            style={{ width: "50px", height: "50px" }}
                          />
                        )

                      })
                    }
                    {" "}
                  </TableCell>
                  {console.log("Product: ", product)}
                  <TableCell
                    sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "0.875rem !important",
                        }}
                      >
                        {product.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  {/* <TableCell sx={{ textAlign: "center" }}>
                    {product.id_category}
                  </TableCell> */}
                  <TableCell sx={{ textAlign: "center" }}>
                    {product.product_price}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {product.id_branch_branch.name}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {product.id_category_category.name}
                  </TableCell>
                  <TableCell style={{}} sx={{ textAlign: "center" }}>
                    <Button
                      onClick={() =>
                        navigate(`/admin/product/update/${product.id}`)
                      }
                      variant="text"
                      color="warning"
                    >
                      <EditIcon />
                    </Button>

                    <Button
                      variant="text"
                      onClick={() => handleDeleteProduct(product.id, product.name)}
                      color="secondary"
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button
                      onClick={() =>
                        navigate(`/admin/product/detail/${product.id}`)
                      }
                      variant="text"
                      color="success"
                    >
                      <VisibilityIcon />
                    </Button>
                  </TableCell>

                </TableRow>

              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <DisableProduct open={open} setOpen={setOpen}
        id={idProductDelete} name={nameProductDelete}
        fetchProducts={(page) => fetchProducts(page)}
        currentPage={currentPage}
      />
      <Card className="mt-2 border">
        <div className="mx-auto px-4 py-5 flex justify-center shadow-lg rounded-md">
          <Pagination
            count={totalPages}
            size="medium"
            page={currentPage}
            color="primary"
            onChange={handlePaginationChange}
            showFirstButton
            showLastButton
          />
        </div>
      </Card>

    </Box>
  );
};

export default ProductsTable;
