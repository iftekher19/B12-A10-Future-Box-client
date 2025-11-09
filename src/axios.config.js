import axios from "axios";

// replace <your-vercel-server-url> when deployed
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

export default axiosInstance;
