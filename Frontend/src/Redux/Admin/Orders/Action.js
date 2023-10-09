import api from "../../../config/api";
import {
  canceledOrderFailure,
  canceledOrderRequest,
  canceledOrderSuccess,
  successOrderFailure,
  successOrderRequest,
  successOrderSuccess,
  confirmedOrderFailure,
  confirmedOrderRequest,
  confirmedOrderSuccess,
  deleteOrderFailure,
  deleteOrderRequest,
  deleteOrderSuccess,
  deliveredOrderFailure,
  deliveredOrderRequest,
  deliveredOrderSuccess,
  getOrdersFailure,
  getOrdersRequest,
  getOrdersSuccess,
  shipOrderFailure,
  shipOrderRequest,
  shipOrderSuccess,
  getFilteredOrdersRequest,
  getFilteredOrdersSuccess,
  getFilteredOrdersFailure,
} from "./ActionCreator";

export const getOrders = (reqData) => {
  console.log("get all orders ", reqData);
  return async (dispatch) => {
    dispatch(getOrdersRequest());
    try {
      const response = await api.get(`/api/admin/orders/`);
      console.log("get all orders ", response.data);
      dispatch(getOrdersSuccess(response.data));
    } catch (error) {
      console.log("catch error ", error);
      dispatch(getOrdersFailure(error.message));
    }
  };
};

export const confirmOrder = (orderId) => async (dispatch) => {
  dispatch(confirmedOrderRequest());

  try {
    const response = await api.put(`/api/admin/orders/${orderId}/confirmed`);
    const data = response.data;
    console.log("confirm_order ", data);
    dispatch(confirmedOrderSuccess(data));
  } catch (error) {
    dispatch(confirmedOrderFailure(error.message));
  }
};

export const shipOrder = (orderId) => {
  return async (dispatch) => {
    try {
      dispatch(shipOrderRequest());
      const { data } = await api.put(`/api/admin/orders/${orderId}/ship`);
      console.log(" shipped order", data);
      dispatch(shipOrderSuccess(data));
    } catch (error) {
      dispatch(shipOrderFailure(error.message));
    }
  };
};

export const deliveredOrder = (orderId) => async (dispatch) => {
  dispatch(deliveredOrderRequest());

  try {
    const response = await api.put(`/api/admin/orders/${orderId}/deliver`);
    const data = response.data;
    console.log("dilivered order ", data);
    dispatch(deliveredOrderSuccess(data));
  } catch (error) {
    dispatch(deliveredOrderFailure(error.message));
  }
};

export const cancelOrder = (orderId) => async (dispatch) => {
  dispatch(canceledOrderRequest());

  try {
    const response = await api.put(`/api/admin/orders/${orderId}/cancel`);
    const data = response.data;
    dispatch(canceledOrderSuccess(data));
  } catch (error) {
    dispatch(canceledOrderFailure(error.message));
  }
};

export const successOrder = (orderId) => {
  return async (dispatch) => {
    dispatch(successOrderRequest());
    try {
      const { data } = await api.put(`/api/admin/orders/${orderId}/success`);
      console.log("success order ", data);
      dispatch(successOrderSuccess(orderId));
    } catch (error) {
      console.log("catch error ", error);
      dispatch(successOrderFailure(error));
    }
  };
};

export const deleteOrder = (orderId) => {
  return async (dispatch) => {
    dispatch(deleteOrderRequest());
    try {
      const { data } = await api.delete(`/api/admin/orders/${orderId}/delete`);
      console.log("delete order ", data);
      dispatch(deleteOrderSuccess(orderId));
    } catch (error) {
      console.log("catch error ", error);
      dispatch(deleteOrderFailure(error));
    }
  };
};

export const getFilteredOrders = (filterCriteria) => async (dispatch) => {
  dispatch(getFilteredOrdersRequest());

  try {
    const response = await api.get(`/api/orders/${filterCriteria.status}`);
    const filteredOrders = response.data;
    dispatch(getFilteredOrdersSuccess(filteredOrders));
  } catch (error) {
    dispatch(getFilteredOrdersFailure(error.message));
  }
};
