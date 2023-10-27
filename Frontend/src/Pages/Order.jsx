import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { toast } from "react-toastify";
// import { getOrderById, updatePaymentStatus } from "../../../Redux/Customers/Order/Action";
import { findQuantity, getCart } from "../config/common";
import CartItem from "../Components/CartItem";
import axios from "../config/axios";
import OrderTraker from "../Components/OrderTracker";
import axiosApiInstance from "../config/api";
const OrderSummary = (order) => {
  const navigate = useNavigate();
  const location = useLocation();
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
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
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
      height: "30%",
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
        {/* <div className="flex-column min-h-full">
          <div className="grow h-40">
            <div>
              Name:{" "}
              <input
                className="w-full"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></input>
            </div>
            <div>
              Phone:{" "}
              <input
                className="w-full"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              ></input>
            </div>
            <div>
              Address:{" "}
              <input
                className="w-full"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              ></input>
            </div>
          </div>
          <div className="grid justify-items-center flex-row">
            <div
              className="h-10 w-40 border"
              style={{
                backgroundColor: "#c9db34d4",
                borderRadius: 10,
                color: "white",
              }}
            >
              Save
            </div>
            <div
              className="h-10 w-40 border"
              style={{
                backgroundColor: "red",
                borderRadius: 10,
                color: "white",
                right: 0,
              }}
            >
              Close
            </div>
          </div>
        </div> */}
        <form class="w-full max-w-lg">
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                First Name
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Jane"
              />
              <p class="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Last Name
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="Doe"
              />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-password"
              >
                Password
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="password"
                placeholder="******************"
              />
              <p class="text-gray-600 text-xs italic">
                Make it as long and as crazy as you'd like
              </p>
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-2">
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-city"
              >
                City
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="text"
                placeholder="Albuquerque"
              />
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-state"
              >
                State
              </label>
              <div class="relative">
                <select
                  class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                >
                  <option>New Mexico</option>
                  <option>Missouri</option>
                  <option>Texas</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-zip"
              >
                Zip
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-zip"
                type="text"
                placeholder="90210"
              />
            </div>
          </div>
        </form>
      </Modal>
      <OrderTraker activeStep={0}></OrderTraker>
      <div className="lg:grid grid-cols-3 relative justify-between">
        <div className="p-5 shadow-lg rounded-md border ">
          <div>Thông tin giao hàng</div>
          <select
            className="w-full"
            onChange={(e) => setAddressSelect(e.target.value)}
          >
            {listAddress.length > 0
              ? listAddress.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {`${item.name},
                         ${item.phone},
                        ${item.address}`}
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
        <div className="lg:col-span-2 ">
          <div className=" space-y-3">
            {listCart.length > 0
              ? listCart.map((item, index) => (
                  <>
                    <CartItem key={index} detail={item} showButton={false} />
                  </>
                ))
              : null}
          </div>
        </div>
        <div className="sticky top-0 h-[100vh] mt-5 lg:mt-0 ml-5">
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
  );
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
      return { ...item.data.data, quantity: quantity };
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
    setAddressSelect(data.address[0].id);
    setName(data.user?.name || null);
    setPhone(data.user?.phone || "0123456786");
  }
  function handleOrder() {
    toast(address);
  }
};

export default OrderSummary;
