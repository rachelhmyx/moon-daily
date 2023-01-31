import axios from "axios";
import { API_URL } from "../constants/URLS";

const axiosClient = axios.create({
  baseURL: API_URL,
  // timeout: 10000,
  //axiosClient sẽ lấy token trong localstrorage để bỏ vào phần header -bearerToken
  headers: {
    "Content-Type": "application/json",
  },
});
export { axiosClient };
