import axios from "axios";
import store from "../store";

const errorHandler = (e) => {
  store.dispatch("snackbars/setSnack", {
    message: e.data.message[0].message,
    show: true,
    type: "red",
  });
};

export const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL,
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    errorHandler(error.response);
    return new Promise.reject(error);
  }
);
