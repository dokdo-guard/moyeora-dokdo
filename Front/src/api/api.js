// import baseAxios from "axios";
import axios from 'axios';
const api = axios.create({
  baseURL: 'https://k7d204.p.ssafy.io/api/',
  headers: {
<<<<<<< HEAD
    'Content-Type': 'application/json',
=======
    "Content-Type": "application/json",
>>>>>>> 74230bcba7105378c6cd31c826224a205ebe5757
    // access_token 넣어 줄 것
    // bearer: " access_token",
    Authorization:
      'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNjY3MzcxNDI2LCJleHAiOjE2NjgyMzU0MjZ9.5vrutQ0yy1GLXZ0IxEs8uD1f5kaCUlyFRS91JUyw1Cu3Sgl61WlU7jXc1lU-KgOpUgw8F-Bq0uHD06FC2b42uQ',
  },
});

export default api;