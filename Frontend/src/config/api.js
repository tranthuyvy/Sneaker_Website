import { store } from "../Redux/Store";
import axios from "./axios";
const HOST = axios.defaults.baseURL;
const axiosApiInstance = axios.create({
  baseURL: HOST,
});

axiosApiInstance.interceptors.request.use((config) => {
  let [accessToken, refreshToken] = [
    localStorage.getItem("accessToken"),
    localStorage.getItem("refreshToken"),
  ];
  if (accessToken == null) {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    const location = window.location;
    const currentUrl = location.href;
    currentUrl.includes('/admin') ? window.location.href = '/admin/login' : store.dispatch({ type: "OPEN_MODAL" })

  }

  config.headers = {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/json",
    // 'Content-Type': 'application/json'
  };

  return config;
});
axiosApiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status == 403) {
      const refreshToken = localStorage.getItem("refreshToken");
      const accessToken = localStorage.getItem("accessToken");
      // if(accessToken){
      //   window.location.href='/admin'
      // }
      if (error.response.data.code == 400 || error.response.data.code == 401) {
        window.location.href = '/admin/login'
      }
      else(
        store.dispatch({ type: "OPEN_MODAL" })
      )
      // if (refreshToken) {
      //   let apiResponse = await axios.post(
      //     axios.defaults.baseURL + `/api/v1/auth/refresh`,
      //     { token: refreshToken }
      //   );
      //   if (apiResponse.data.status && apiResponse) {
      //     // alert("Da Refresh Token")
      //     const { accessToken, refreshToken } = apiResponse.data.data;
      //     // setToken(accessToken, refreshToken);
      //     //alert("Da set Token moi")
      //     error.config.headers = {
      //       Authorization: `Bearer ${accessToken}`,
      //     };
      //     window.location.reload();
      //   } else {
      //     localStorage.removeItem("refreshToken");
      //     localStorage.removeItem("accessToken");
      //     store.dispatch({ type: "OPEN_MODAL" })
      //   }
      // }
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosApiInstance;
