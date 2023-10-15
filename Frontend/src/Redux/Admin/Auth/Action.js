export const LOGOUT = "LOGOUT";

export const logout = (token) => {
  return async (dispatch) => {
    dispatch({ type: LOGOUT });
    localStorage.clear();
  };
};
