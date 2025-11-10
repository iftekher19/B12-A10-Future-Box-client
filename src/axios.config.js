import axios from "axios";

// replace <your-vercel-server-url> when deployed
const axiosInstance = axios.create({
  baseURL: "https://tabletogether.vercel.app",
});

export default axiosInstance;
