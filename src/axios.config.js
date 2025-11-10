import axios from "axios";

// replace <your-vercel-server-url> when deployed
const axiosInstance = axios.create({
  baseURL:
    "https://tabletogether-6cxgl7skd-md-iftekher-ahmeds-projects.vercel.app",
});

export default axiosInstance;
