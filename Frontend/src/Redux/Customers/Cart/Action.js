import axios from "axios";

import { API_BASE_URL } from "../../../config/api";
import {
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  ADD_ITEM_TO_CART_FAILURE,
  GET_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
  UPDATE_TOTAL,
  CLEAR_CART_FAILURE,
  CLEAR_CART_SUCCESS,
} from "./ActionType";

export const addItemToCart = (reqData) => async (dispatch) => {
  console.log("req data ", reqData);
  try {
    dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${reqData.jwt}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `${API_BASE_URL}/api/cart/add`,
      reqData.data,
      config
    );
    console.log("add item to cart ", data);
    dispatch({
      type: ADD_ITEM_TO_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_ITEM_TO_CART_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getCart = (jwt) => async (dispatch) => {
  try {
    dispatch({ type: GET_CART_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`${API_BASE_URL}/api/cart/`, config);
    console.log("cart ", data);
    dispatch({
      type: GET_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CART_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeCartItem = (reqData) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_CART_ITEM_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${reqData.jwt}`,
        "Content-Type": "application/json",
      },
    };
    await axios.delete(
      `${API_BASE_URL}/api/cart_items/${reqData.cartItemId}`,
      config
    );

    dispatch({
      type: REMOVE_CART_ITEM_SUCCESS,
      payload: reqData.cartItemId,
    });
    dispatch(updateTotal());
  } catch (error) {
    dispatch({
      type: REMOVE_CART_ITEM_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCartItem = (reqData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CART_ITEM_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${reqData.jwt}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `${API_BASE_URL}/api/cart_items/${reqData.cartItemId}`,
      reqData.data,
      config
    );
    console.log("updated cartitem ", data);
    dispatch({
      type: UPDATE_CART_ITEM_SUCCESS,
      payload: data,
    });
    dispatch(updateTotal());
  } catch (error) {
    dispatch({
      type: UPDATE_CART_ITEM_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateTotal = () => (dispatch, getState) => {
  const { cartItems } = getState().cart;
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.product.discountedPrice * item.quantity;
  }, 0);

  dispatch({
    type: UPDATE_TOTAL,
    payload: totalPrice,
  });
};

export const clearCart = (jwt) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };

    // Thực hiện POST request đến endpoint để xóa giỏ hàng
    await axios.post(`${API_BASE_URL}/api/cart/clear`, {}, config);

    // Sau khi xóa thành công, gửi action để cập nhật state của ứng dụng
    dispatch({
      type: CLEAR_CART_SUCCESS,
    });
  } catch (error) {
    // Xử lý lỗi (nếu có)
    dispatch({
      type: CLEAR_CART_FAILURE,
      payload: error.message, // Hoặc thông báo lỗi khác (tuỳ theo cần thiết)
    });
  }
};
