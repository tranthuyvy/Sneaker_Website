import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import langReducer from "./langReducer";
import cartReducer from "./Customers/cartReducer";
import { authReducer, modalLoginReducer } from "./auth";
import searchReducer from "./searchReducer";
import filterReducer from "./filterReducer";
const rootReducers = combineReducers({
  lang: langReducer,
  cart: cartReducer,
  auth: authReducer,
  openModal: modalLoginReducer,
  searchStr: searchReducer,
  filter: filterReducer
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
