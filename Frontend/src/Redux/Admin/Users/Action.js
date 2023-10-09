import api from "../../../config/api";
import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
} from "./ActionType";

export const getUsersRequest = () => {
  return {
    type: GET_USERS_REQUEST,
  };
};

export const getUsersSuccess = (users) => {
  return {
    type: GET_USERS_SUCCESS,
    payload: users,
  };
};

export const getUsersFailure = (error) => {
  return {
    type: GET_USERS_FAILURE,
    payload: error,
  };
};

export const getUsers = (reqData) => {
  console.log("get all users ", reqData);
  return async (dispatch) => {
    dispatch(getUsersRequest());
    try {
      const response = await api.get(`/api/users/all`);
      console.log("get all users ", response.data);
      dispatch(getUsersSuccess(response.data));
    } catch (error) {
      console.log("catch error ", error);
      dispatch(getUsersFailure(error.message));
    }
  };
};
