import axios from "./axios";
const LOCALHOST = "https://sneaker-real.onrender.com";

export const API_BASE_URL = LOCALHOST

const axiosApiInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosApiInstance.interceptors.request.use((config) => {
  let [accessToken, refreshToken] = [localStorage.getItem('accessToken'), localStorage.getItem('refreshToken')]
  if (accessToken == null) {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    window.location.href = "/login";
  }

  config.headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Accept': 'application/json',
    // 'Content-Type': 'application/json'
  }

  return config;
});

axiosApiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status == 403) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        let apiResponse = await axios.post(
          axios.defaults.baseURL + `/api/v1/auth/refresh`,
          { token: refreshToken }
        );
        if (apiResponse.data.status && apiResponse) {
          // alert("Da Refresh Token")
          const { accessToken, refreshToken } = apiResponse.data.data;
          // setToken(accessToken, refreshToken);
          //alert("Da set Token moi")
          error.config.headers = {
            Authorization: `Bearer ${accessToken}`,
          };
          window.location.reload();
        } else {
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('accessToken');
          window.location.href = "/login";
        }
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosApiInstance;
