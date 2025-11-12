import axios from "axios";

//  axios instance with base URL
const axiosInstance = axios.create({
  baseURL: "https://tabletogether.vercel.app",
});

export default axiosInstance;
