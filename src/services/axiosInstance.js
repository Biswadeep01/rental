import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://just-rent-a-car-server.vercel.app/api",
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
