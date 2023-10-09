import React, { useState } from "react";
import { Badge, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CartItem from "../Cart/CartItem";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById, updatePaymentStatus } from "../../../Redux/Customers/Order/Action";
import AddressCard from "../adreess/AdreessCard";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import Modal from 'react-modal';

const OrderSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");
  const dispatch=useDispatch();
  const jwt = localStorage.getItem("jwt");
  const {order} = useSelector(state=>state)

  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')

  console.log("orderId ", order.order)

  useEffect(()=>{
    
    dispatch(getOrderById(orderId))
  },[orderId])

  // const handleCreatePayment=()=>{
  //   const data={orderId:order.order?.id,jwt}
  //   dispatch(createPayment(data))
  // };

  const handlePaymentSuccess = () => {
    // const {payer} = details;
    setSuccess(true);

    dispatch(updatePaymentStatus(order.order?.id));

    navigate("/account/order");
  };

  const handlePaymentFailed = () => {
    setErrorMessage("Payment Failed");
  }

  return (
    <div className="space-y-5">
        <div className="p-5 shadow-lg rounded-md border ">
            <AddressCard address={order.order?.shippingAddress}/>
        </div>
      <div className="lg:grid grid-cols-3 relative justify-between">
        <div className="lg:col-span-2 ">
          <div className=" space-y-3">
            {order.order?.orderItems.map((item) => (
              <>
                <CartItem item={item} showButton={false}/>
              </>
            ))}
          </div>
        </div>
        <div className="sticky top-0 h-[100vh] mt-5 lg:mt-0 ml-5">
          <div className="border p-5 bg-white shadow-lg rounded-md">
            <p className="font-bold opacity-60 pb-4">PRICE DETAILS</p>

            <hr />

            <div className="space-y-3 font-semibold">
              <div className="flex justify-between pt-3 text-black ">
                <span>Price ({order.order?.totalItem} item)</span>
                <span>${order.order?.totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-700">-${order.order?.discounte}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-green-700">Free</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span className="text-green-700">${order.order?.totalDiscountedPrice}</span>
              </div>
            </div>
            <PayPalScriptProvider
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
            </PayPalScriptProvider>
            
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
};

export default OrderSummary;
