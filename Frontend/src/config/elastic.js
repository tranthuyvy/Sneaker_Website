import { io } from "socket.io-client";
import { baseURL } from "./axios";
const socket = io(baseURL);
export default socket