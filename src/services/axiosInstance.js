import axios from "axios";

// const SERVER_URL = "https://just-rent-a-car-server.vercel.app";
const SERVER_URL = "http://localhost:5000";

export const axiosInstance = axios.create({
  baseURL: `${SERVER_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("token") || "";
    config.headers.Authorization = authToken;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
