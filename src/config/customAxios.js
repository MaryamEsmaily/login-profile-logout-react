import axios from "axios";
import { baseURL } from "../constant/baseURL";

const customAxios = axios.create({ baseURL });

customAxios.interceptors.request.use(
  function (config) {
    const AUTH_TOKEN = localStorage.getItem("TOKEN");
    if (AUTH_TOKEN) config.headers.Authorization = "Bearer " + AUTH_TOKEN;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

customAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/Login";
    }
    return Promise.reject(error);
  }
);

export default customAxios;
