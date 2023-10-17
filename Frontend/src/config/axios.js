import axios from "axios";
const LOCALHOST = "http://localhost:8081";

export const API_BASE_URL = LOCALHOST

const axios = axios.create({
  baseURL: API_BASE_URL,
});
export default axios