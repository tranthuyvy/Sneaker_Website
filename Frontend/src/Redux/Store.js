import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import langReducer from "./langReducer";
import cartReducer from "./Customers/cartReducer";
// import authReducer from "./Auth/Reducer";
// import customerProductReducer from "./Customers/Product/Reducer";
// import productReducer from "./Admin/Product/Reducer";
// import cartReducer from "./Customers/Cart/Reducer";
// import { orderReducer } from "./Customers/Order/Reducer";
// import usersReducer from "./Admin/Users/Reducer";
// import adminOrderReducer from "./Admin/Orders/Reducer";
// import ReviewReducer from "./Customers/Review/Reducer";

const rootReducers = combineReducers({
  lang: langReducer,
  cart: cartReducer
  // auth: authReducer,
  // customersProduct: customerProductReducer,
  // cart: cartReducer,
  // order: orderReducer,
  // review: ReviewReducer,
  // admin
  // adminsProduct: productReducer,
  // adminsOrder: adminOrderReducer,
  // adminsUser: usersReducer,
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
