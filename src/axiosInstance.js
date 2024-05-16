import axios from "axios";
import { createRouter as $router } from 'vue-router'

const baseInstance = axios.create({
  baseURL: "https://excited-pipefish-44.rshare.io/api",
  headers: {
    common: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    post: {
      "Content-Type": "application/json",
    },
  },
});

baseInstance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response.status === 401) {
    this.get("/refresh-token").then((response) => {
      if (response && response.status === 200) {
        localStorage.setItem("token", response.token)
      } else {
        localStorage.removeItem("token")
        $router.push("/login");
      }
    })
  }
  return Promise.reject(error);
});

export default baseInstance;
