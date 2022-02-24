import axios from "axios";

const local = "http://localhost:8800/api";
const global = "https://smartlad.herokuapp.com/api";

const baseURL = global;

const axiosConfig = axios.create({
  baseURL: baseURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export default axiosConfig;
