import { useEffect, useState } from "react";
import { Button, Card, Pagination, Menu, MenuItem } from "@mui/material";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ItemProduct from "../Components/ProductCard";
import axios from "../config/axios";
import { getImage } from "../config/common";
import Filter from "../Components/Filter";
import { sortOptions } from "../Components/FilterData";
import HomeCarousel from "../Components/HomeCarousel";
import React from "react";
import socket from "../config/elastic";
const Homepage = (props) => {
  const lang = useSelector((state) => state.lang);
  var searchStr = useSelector((state) => state.searchStr);
  const { minPrice, maxPrice, listSize } = useSelector((state) => state.filter);
  const [listStore, setListStore] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const pageSize = 12;
  const [sortMenuOpen, setSortMenuOpen] = useState(null);
  const fetchProducts = (page) => {
    axios
      .get(`api/v1/product/get?page=${page}&pageSize=${pageSize}`)
      .then((response) => {
        const productsArray = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        setListProduct([...productsArray]);
        setCurrentPage(page);
        setTotalPages(response.data.totalPage);
        setListStore([...productsArray]);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      });
  };
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);
  useEffect(() => {
    if (searchStr.length != 0) {
      socket.emit("search", searchStr);
      socket.on("search", (data) => {
        setListProduct([...data]);
      });
    } else {
      setListProduct([...listStore]);
    }
  }, [searchStr.length]);
  useEffect(() => {
    console.log(minPrice, maxPrice,listSize)
    if (minPrice != 0 && maxPrice != 0) {
      socket.emit("filter", { minPrice, maxPrice,listSize });
      socket.on("filter", (data) => {
        setListProduct([...data]);
      });
    } else setListProduct([...listStore]);
  }, [minPrice + maxPrice,listSize.lenght]);
  const handlePaginationChange = (event, page) => {
    fetchProducts(page);
  };

  const handleSortMenuOpen = (event) => {
    setSortMenuOpen(event.currentTarget);
  };

  const handleSortMenuClose = () => {
    setSortMenuOpen(null);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <HomeCarousel />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div
          className="grid grid-cols-10"
          style={{ display: "grid", placeItems: "center" }}
        >
          <div className="flex-none col-span-9 border h-100"></div>

          <div className="flex-none col-span-1 border h-100">
            <Card className="">
              <Button onClick={handleSortMenuOpen} className="absolute top-0">
                SORT
              </Button>
              <Menu
                anchorEl={sortMenuOpen}
                keepMounted
                open={Boolean(sortMenuOpen)}
                onClose={handleSortMenuClose}
              >
                {sortOptions.map((option) => (
                  <MenuItem key={option.name} onClick={handleSortMenuClose}>
                    {option.name}
                  </MenuItem>
                ))}
              </Menu>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-11">
          <div className="flex-none col-span-2 border h-100 mt-3 ml-1">
            <Filter />
          </div>
          <div className="grow col-span-9">
            <div className="grid grid-cols-4 gap-4 ">
              {listProduct.length > 0
                ? listProduct.map((item, index) => {
                    let product = {
                      id: item.id,
                      title: item.name,
                      price: item.product_price,
                      discountPersent: item.id_discount_discount?.value || 0,
                      discount_products:item.discount_products,
                      status: 0,
                      imageUrl:
                        item.images.length > 0
                          ? [...item.images]
                          : [{ link: getImage(item) }],
                    };
                    return <ItemProduct product={product}></ItemProduct>;
                  })
                : null}
            </div>
            <div>
              <Card className="mt-2 border">
                <div className="mx-auto px-4 py-4 flex justify-center shadow-lg rounded-md">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  async function getProduct() {
    let data = (await axios.get(`/api/v1/product/get?page=${currentPage}`))
      .data;

    if (data.code.localeCompare("002") != 0) {
      toast(lang[data.code]);
    } else {
      setListProduct([...data.data]);
    }
  }
};

export default Homepage;
