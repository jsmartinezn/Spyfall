import axios from "axios";
import store from "../store";
import { finishProgress, startProgress } from "../store/actions/app";

const Http = axios.create({
  baseURL: process.env.BACK_URL,
  timeout: 5000,
});

export const http = axios.create({
  baseURL: "https://spyfall-backend.herokuapp.com",
  timeout: 5000,
});

Http.interceptors.request.use(
  (config) => {
    store.dispatch(startProgress());
    return config;
  },
  (error) => {
    store.dispatch(finishProgress());
    return Promise.reject(error);
  }
);

Http.interceptors.response.use(
  (config) => {
    store.dispatch(finishProgress());
    return config;
  },
  (error) => {
    store.dispatch(finishProgress());
    return Promise.reject(error);
  }
);

export default Http;
