import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../config/axios";
export default function ProductDetails(props) {
  const location = useLocation();
  const [product, setProduct] = useState({});
  const [id,setId]= useState(location.search.match(/id=(.+)/)[1])
  useEffect(() => {
    getProduct().catch(err=>{
        console.log(err)
    })
  }, [id]);
  return (
    <div className="bg-white lg:px-20">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li>
              <div className="flex items-center">
                <a
                  href={"/"}
                  className="mr-2 text-sm font-medium text-gray-900"
                ></a>
                <svg
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>

            <li className="text-sm">
              <a
                // href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {/* {customersProduct.product?.title} */}
              </a>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
  async function getProduct(){
    const data = (await axios.get(`/api/v1/product/get?id=${id}`)).data;
    console.log(data)
  }
}
