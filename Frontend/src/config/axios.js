import axios from "axios";
const baseURL = "http://localhost:8081"
export { baseURL }
export default axios.create({
  // baseURL: "https://sneaker-real.onrender.com",
  baseURL: baseURL,
});
