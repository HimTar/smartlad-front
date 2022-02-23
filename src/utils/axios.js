import axios from "axios";

const local = "http://localhost:8800/api";
const global = "https://smartlad.herokuapp.com/api";

const baseURL = process.env.REACT_APP_ENV ? local : global;

const axiosConfig = axios.create({
  baseURL: baseURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export default axiosConfig;
