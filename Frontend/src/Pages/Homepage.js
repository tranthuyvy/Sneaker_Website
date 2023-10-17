import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import ItemProduct from "../Components/ProductCard";
import Navbar from "../Components/Navbar";
import axios from "../config/axios";
const Homepage = (props) => {
  const lang = useSelector((state) => state.lang)
  const [listProduct, setListProduct] = useState([]);
  const [page, setPage] = useState(1)
  useEffect(() => {
    getProduct().catch(err => {
      toast(lang['003']);
      console.error(err)
    })
  }, [])
  return (
    <div className="">
      <Navbar></Navbar>
      <div className="relative m-0">
        <div className="right-10 absolute top-0 m-1">SORT</div>
        <div className="flex m-7">
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
      </div>
    </div>
  );
  async function getProduct() {
    let data = (await axios.get(`/api/v1/product/get?page=${page}`)).data;
    if (data.code.localeCompare("002") != 0) {
      toast(lang[data.code])
    }
    else {
      setListProduct([...data.data])
    }
  }
  function getImage(product) {
    for (let i of product.product_details) {
      if (i.image.localeCompare("") != 0)
        return i.image
    }
    return "https://w7.pngwing.com/pngs/296/367/png-transparent-shoe-sneakers-graphy-canvas-cartoon-shoes-miscellaneous-white-photography-thumbnail.png"
  }
};


export default Homepage;
