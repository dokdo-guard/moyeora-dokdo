// import baseAxios from "axios";
import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:8443/api/',
  // baseURL: 'http://localhost:8443/api/',
  headers: {
    'Content-Type': 'application/json',
    // access_token 넣어 줄 것
    // bearer: " access_token",
    Authorization:
      `Bearer ${sessionStorage.getItem("accessToken")}`,
  },
});

export default api;