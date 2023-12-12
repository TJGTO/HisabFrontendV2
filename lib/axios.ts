import axios from "axios";

const Axios = axios.create({
  baseURL: "https://wfg-kol-backend.onrender.com/",
  timeout: 10000,
});

const AxiosWithAuth = axios.create({
  baseURL: "https://wfg-kol-backend.onrender.com/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosWithAuth.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { Axios, AxiosWithAuth };
