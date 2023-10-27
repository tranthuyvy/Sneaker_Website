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
    },
  };
  return (
    <div className="space-y-5">
      {/* <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      ></Modal> */}
      <OrderTraker activeStep={0}></OrderTraker>
      <div className="lg:grid grid-cols-3 relative justify-between">
        <div className="p-5 shadow-lg rounded-md border ">
          <div>Thông tin giao hàng</div>
          <select
            className="w-full"
            onChange={(e) => setAddress(e.target.value)}
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
          >
            Add address
          </button>
          {/* <button
            onClick={() => {
              setModalIsOpen(true);
            }}
            className="h-10 w-40 border"
            style={{
              backgroundColor: "#c9db34d4",
              borderRadius: 10,
              color: "white",
            }}
          >
            Select address
          </button> */}
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

            <hr />

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
    setAddress(data.address[0].id);
    setName(data.user?.name|| null)
    setPhone(data.user?.phone || '0123456786')
  }
  function handleOrder() {
    toast(address);
  }
};

export default OrderSummary;
