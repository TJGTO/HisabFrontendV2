import axios from "axios";

export const Axios = axios.create({
  baseURL: "https://wfg-kol-backend.onrender.com/",
  timeout: 10000,
});
