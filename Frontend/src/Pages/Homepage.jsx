import { useEffect, useState } from "react";
import {
  Card,
  Pagination,
} from "@mui/material";
import {toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import ItemProduct from "../Components/ProductCard";
import axios from "../config/axios";
import { getImage } from "../config/common";
import Filter from "../Components/Filter";
const Homepage = (props) => {
  const lang = useSelector((state) => state.lang)
  const [listProduct, setListProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  useEffect(() => {
   
    getProduct().catch(err => {
      toast(lang['003']);
      console.error(err)
    })
  }, [])
  return (
    <div className="">
      <div className="">
        <div className="relative h-9">
          <button className="right-10 absolute top-0">SORT</button>
        </div>
        <div className="grid grid-cols-10">
          <div className="flex-none col-span-2 border h-100">
            <Filter/>
          </div>
          <div className="grow col-span-7">
            <div className="grid grid-cols-3 gap-3 ">
              {listProduct.length > 0 ?
                listProduct.map((item, index) => {
                  let product = {
                    id: item.id,
                    title: item.name,
                    price: item.product_price,
                    discountPersent: item.id_discount_discount?.value || 0,
                    discountedPrice: item.product_price - (item.id_discount_discount?.value || 0),
                    status: 0,
                    imageUrl: getImage(item)
                  }
                  return <ItemProduct product={product}></ItemProduct>
                })
                : null}
            </div>
            <div>
              <Card className="mt-2 border">
                <div className="mx-auto px-4 py-5 flex justify-center shadow-lg rounded-md">
                  <Pagination
                    count={totalPages}
                    size="medium"
                    page={currentPage}
                    color="primary"
                    // onChange={handlePaginationChange}
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
    let data = (await axios.get(`/api/v1/product/get?page=${currentPage}`)).data;
  
    if (data.code.localeCompare("002") != 0) {
      toast(lang[data.code])
    }
    else {
      setListProduct([...data.data])
    }
  }
  
};


export default Homepage;
