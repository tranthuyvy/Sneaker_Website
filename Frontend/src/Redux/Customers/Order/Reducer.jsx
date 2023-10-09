import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  GET_ORDER_HISTORY_REQUEST,
  GET_ORDER_HISTORY_SUCCESS,
  GET_ORDER_HISTORY_FAILURE,
  GET_FILTERED_ORDERS_REQUEST,
  GET_FILTERED_ORDERS_SUCCESS,
  GET_FILTERED_ORDERS_FAILURE,
  UPDATE_PAYMENT_STATUS_REQUEST,
  UPDATE_PAYMENT_STATUS_SUCCESS,
  UPDATE_PAYMENT_STATUS_FAILURE,
} from "./ActionType";

const initialState = {
  orders: [],
  order: null,
  error: null,
  loading: false,
  paymentStatusUpdated: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        loading: true,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case CREATE_ORDER_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_ORDER_BY_ID_REQUEST:
      return {
        loading: true,
      };
    case GET_ORDER_BY_ID_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case GET_ORDER_BY_ID_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_ORDER_HISTORY_REQUEST:
      return {
        loading: true,
        orders: [],
      };
    case GET_ORDER_HISTORY_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case GET_ORDER_HISTORY_FAILURE:
      return {
        loading: false,
        error: action.payload,
        orders: [],
      };
    case GET_FILTERED_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_FILTERED_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case GET_FILTERED_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_PAYMENT_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PAYMENT_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case UPDATE_PAYMENT_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
