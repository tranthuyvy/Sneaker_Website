import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { toast } from "react-toastify";
import validator from "validator";
// import { getOrderById, updatePaymentStatus } from "../../../Redux/Customers/Order/Action";
import { findQuantity, getCart, setCart } from "../config/common";
import CartItem from "../Components/CartItem";
import axios from "../config/axios";
import OrderTraker from "../Components/OrderTracker";
import axiosApiInstance from "../config/api";
const province_vi = require("../config/province_vi.json");
const OrderSummary = (order) => {
  const navigate = useNavigate();
  const isLogin = useSelector(state=>state.auth)
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [total, setTotal] = useState(0);
  const [discount, setDisCount] = useState(0);
  const [listCart, setListCart] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const cart = useSelector((store) => store.cart);
  const lang = useSelector((state) => state.lang);
  const [listAddress, setListAddress] = useState([]);
  const [addressSelect, setAddressSelect] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState(0);
  const [district, setDistrict] = useState(0);
  const [ward, setWard] = useState(0);
  const [addressName, setAddressName] = useState("");
  const [listProvince, setListProvince] = useState([...province_vi]);
  const [listDistrict, setListDictrict] = useState([
    ...province_vi[0].districts,
  ]);
  const [listWard, setListWard] = useState([
    ...province_vi[0].districts[0].wards,
  ]);
  useEffect(()=>{
     if(!isLogin){
      dispatch({type:'OPEN_MODAL'})
     }
  },[])
  useEffect(() => {
    getData()
      .catch((err) => {
        console.error(err);
        toast(lang["003"]);
      })
      .finally(() => {});
    getAddress()
      .catch((err) => {
        console.error(err);
        toast(lang["003"]);
      })
      .finally(() => {});
  }, []);
   
  // const handleCreatePayment=()=>{
  //   const data={orderId:order.order?.id,jwt}
  //   dispatch(createPayment(data))
  // };

  const handlePaymentSuccess = () => {
    // const {payer} = details;
    setSuccess(true);

    // dispatch(updatePaymentStatus(order.order?.id));

    navigate("/account/order");
  };

  const handlePaymentFailed = () => {
    setErrorMessage("Payment Failed");
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "50%",
      width: "40%",
      padding: 0,
    },
  };
  return (
    <div className="space-y-5">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form className="w-full min-h-full max-w-lg p-5">
          <div className="flex flex-wrap -mx-3 mb-4 h-24">
            <div className="w-full md:w-1/2 px-3 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Name Address
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Name address"
                value={addressName}
                onChange={(e) => handleChange(e, 2)}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Recipient name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => handleChange(e, 0)}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/2 px-3  md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Phone
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                onChange={(e) => handleChange(e, 1)}
                value={phone}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Address
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="97 Man Thiện"
                value={address}
                onChange={(e) => handleChange(e, 3)}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-state"
              >
                Province
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  onChange={(e) => {
                    setProvince(e.target.value);
                    setListDictrict([
                      ...province_vi[e.target.value]?.districts,
                    ]);
                    setDistrict(0);
                    setWard(0);
                    setListWard([
                      ...province_vi[e.target.value]?.districts[0].wards,
                    ]);
                  }}
                >
                  {listProvince.length > 0
                    ? listProvince.map((item, index) => {
                        return <option value={index}>{item.name}</option>;
                      })
                    : null}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-state"
              >
                District
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  onClick={(e) => {
                    setDistrict(e.target.value);
                    setWard(0);
                    setListWard([
                      ...province_vi[province]?.districts[e.target.value].wards,
                    ]);
                  }}
                >
                  {listDistrict.length > 0
                    ? listDistrict.map((item, index) => {
                        return <option value={index}>{item.name}</option>;
                      })
                    : null}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-state"
              >
                Ward
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  onClick={(e) => {
                    setWard(e.target.value);
                  }}
                >
                  {listWard.length > 0
                    ? listWard.map((item, index) => {
                        return <option value={index}>{item.name}</option>;
                      })
                    : null}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="flex justify-around font-bold text-lg">
              <button
                className="h-10 w-40 border"
                style={{
                  backgroundColor: "#9155FD",
                  borderRadius: 10,
                  color: "white",
                }}
                onClick={(e) =>
                  saveAddress(e).catch((err) => toast(lang["001"]))
                }
              >
                Save
              </button>
            </div>
            <div className="flex justify-around font-bold text-lg">
              <button
                className="h-10 w-40 border"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  color: "white",
                }}
                onClick={() => setModalIsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </form>
      </Modal>

      <div className="mt-5">
        <OrderTraker activeStep={2}></OrderTraker>
      </div>

      <div className="lg:grid grid-cols-1 relative justify-between">
        <div className="p-5 shadow-lg rounded-md border mt-3 mx-5">
          <div>Thông tin giao hàng</div>
          <select
            className="w-full"
            onChange={(e) => setAddressSelect(e.target.value)}
          >
            {listAddress.length > 0
              ? listAddress.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {`${item?.name},
                         ${item?.phone || "Phone number"},
                        ${item?.address}, ${item?.ward},  ${item?.district},  ${
                        item?.province
                      }`}
                    </option>
                  );
                })
              : null}
          </select>
          <button
            className="h-10 w-40 border"
            style={{
              backgroundColor: "#c9db34d4",
              borderRadius: 10,
              color: "white",
            }}
            onClick={() => setModalIsOpen(true)}
          >
            Add address
          </button>
        </div>
      </div>

      <div className="lg:grid grid-cols-6 relative justify-between">
        <div className="lg:col-span-4 ml-12 mt-3">
          <div className="space-y-3">
            {listCart.length > 0
              ? listCart.map((item, index) => (
                  <>
                    <CartItem key={index} detail={item} showButton={false} />
                  </>
                ))
              : null}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="sticky top-0 h-[150vh] lg:mt-0 mx-5 mt-3">
            <div className="border p-5 bg-white shadow-lg rounded-md">
              <p className="font-bold opacity-60 pb-4">PRICE DETAILS</p>
              <div className="space-y-3 font-semibold">
                <div className="flex justify-between pt-3 text-black ">
                  <span>Price ({listCart?.length || 0} item)</span>
                  <span>${total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span className="text-green-700">-${discount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="text-green-700">Free</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Amount</span>
                  <span className="text-green-700">${total - discount}</span>
                </div>
                <div className="flex justify-around font-bold text-lg">
                  <button
                    className="h-10 w-40 border"
                    style={{
                      backgroundColor: "#9155FD",
                      borderRadius: 10,
                      color: "white",
                    }}
                    onClick={handleOrder}
                  >
                    CONFIRM
                  </button>
                  <button
                    className="h-10 w-40 border"
                    style={{
                      backgroundColor: "#c9db34d4",
                      borderRadius: 10,
                      color: "white",
                    }}
                  >
                    Digital Wallets
                  </button>
                </div>
              </div>
              {/* <PayPalScriptProvider
              options={{
                "client-id": "AVR129jGmpPplO0U5gNQnlPlfCeRffQ1r6E0GUJkJGyRTUP8Ce16qs3xocDzt7OwphQaRHDB0XdEuzzC"
              }}
            >
              <PayPalButtons
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        description: 'Sneaker',
                        amount: {
                          currency_code: 'USD',
                          value: order.order?.totalDiscountedPrice.toString(),
                        },
                      },
                    ],
                    application_context: {
                      shipping_preference:'NO_SHIPPING'
                    }
                  })
                  .then((orderId) => {
                    return orderId
                  })
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then(function (details) {
                    handlePaymentSuccess();
                  });
                }}

              onError = {(data, actions) => {
                handlePaymentFailed();
              }}
              
              />
              <Modal
                isOpen = {success}
                contentLabel="Payment Successful"
                onRequestClose={() => setSuccess(false)}
                shouldCloseOnOverlayClick = {true}
                closeTimeoutMS={5000}
              >
                <h1>Payment Successful</h1>
              </Modal>
            </PayPalScriptProvider> */}

              {/* <Button
              onClick={handleCreatePayment}
              variant="contained"
              type="submit"
              sx={{ padding: ".8rem 2rem", marginTop: "2rem", width: "100%" }}
            >
              PAYMENT HI
            </Button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  function handleChange(e, type) {
    if (type == 0) {
      setName(e.target.value);
      return;
    }
    if (type == 1) {
      if (validator.isNumeric(e.target.value)) {
        setPhone(e.target.value);
      }
      return;
    }
    if (type == 2) {
      setAddressName(e.target.value);
      return;
    }
    setAddress(e.target.value);
  }
  function getTotal() {
    let totalTmp = 0;
    listCart.forEach((item) => {
      totalTmp +=
        findQuantity(item.id, cart) * item.id_product_product.product_price;
    });
    setTotal(totalTmp);
  }
  async function getData() {
    const listPromise = [];
    for (let i of cart) {
      listPromise.push(
        await axios.get(`/api/v1/product_detail/get?id=${i.id}`)
      );
    }
    const listTmp = [];
    const data = (await Promise.all(listPromise)).map((item) => {
      let quantity = findQuantity(item.data.data.id, cart);
      return { ...item.data.data, quantity: quantity, isValid: true };
    });
    for (let a of data) {
      listTmp.push({ ...a });
    }
    let totalTmp = 0;
    listTmp.forEach((item) => {
      totalTmp +=
        findQuantity(item.id, cart) * item.id_product_product.product_price;
    });
    setTotal(totalTmp);
    setListCart([...listTmp]);
  }
  async function getAddress() {
    const data = (await axiosApiInstance.get("/api/v1/address/get")).data.data;
    setListAddress([...data.address]);
    setAddressSelect(data.address[0]?.id);
    setName(data.user?.name || "");
    setPhone(data.user?.phone || "");
  }
  async function saveAddress(e) {
    e.preventDefault();
    const body = {
      phone,
      name: addressName,
      recipient_name: name,
      address,
      ward: province_vi[province].districts[district].wards[ward].name,
      district: province_vi[province].districts[district].name,
      province: province_vi[province].name,
    };
    // console.log(body)
    const data = (await axiosApiInstance.post("/api/v1/address/create", body))
      .data;
    setListAddress([...listAddress, data.data]);
    setModalIsOpen(false);
    toast(lang[data.code]);
  }
  async function handleOrder() {
    const body = {
      id_address: Number.parseInt(addressSelect),
      payment_method: 1,
      listDetail: [
        ...listCart.map((item) => {
          return {
            id_product_detail: item.id,
            quantity: item.quantity,
            price: item.id_product_product.product_price,
          };
        }),
      ],
    };
    const data = (await axiosApiInstance.post("/api/v1/order/create", body))
      .data;
    toast(lang[data.code], { autoClose: 1000 });
    setCart([]);
    dispatch({ type: "DELETE_CART" });
    setTimeout(() => {
      navigate("/home");
    }, 1100);
  }
};

export default OrderSummary;
