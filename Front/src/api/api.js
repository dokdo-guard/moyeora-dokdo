// import baseAxios from "axios";
import axios from "axios";
const api = axios.create({
  baseURL: "https://k7d204.p.ssafy.io/api/",
  headers: {
    "content-type": "application/json",
    // access_token 넣어 줄 것
    // bearer: " access_token",
  },
});

export default api;
