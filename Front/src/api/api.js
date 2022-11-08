// import baseAxios from "axios";
import axios from "axios";
import { useSelector } from "react-redux";

const api = axios.create({
  baseURL: "https://k7d204.p.ssafy.io/api/",
  headers: {
    "content-type": "application/json",
    // access_token 넣어 줄 것
    // bearer: " access_token",
    Authorization: ``,
  },
});

export default api;
