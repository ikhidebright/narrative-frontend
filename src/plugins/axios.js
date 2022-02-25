import axios from "axios";

const errorHandler = () => {
  //   console.log(error);
};

export default axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL,
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    errorHandler(error);
    return error;
  }
);
