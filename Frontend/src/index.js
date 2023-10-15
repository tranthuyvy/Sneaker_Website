import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider, useGoogleOneTapLogin } from "@react-oauth/google";
import { Provider } from "react-redux";
// import { store } from "./Redux/Store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>   
    <GoogleOAuthProvider clientId="156409993558-716kd0g7s83nht2hekpd3vvkmqbne265.apps.googleusercontent.com"  >
        {/* <Provider> */}
          <App />
        {/* </Provider> */}
        </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
