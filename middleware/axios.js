const axios = require("axios");
const { ERP_API_BASE_URL } = require("../config/index");
const milliseconds = 5 * 1000;
const seconds = 60 * 1000;
const mintues = 60 * 60 * 1000;
const axiosInstance = axios.create({
  baseURL: ERP_API_BASE_URL,
  timeout: seconds,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = "YOUR_ACCESS_TOKEN";
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    console.log("Request sent at:", new Date().toLocaleString());
    console.log("Request details:", {
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers,
    });
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response received at:", new Date().toLocaleString());
    console.log("Response details:", {
      url: response.config.url,
      method: response.config.method,
      status: response.status,
      data: response.data,
    });
    return response;
  },

  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error("Unauthorized, redirecting to login...");
          break;
        case 403:
          console.error("Forbidden");
          break;
        case 404:
          console.error("Not Found");
          break;
        default:
          console.error("Error:", error.response.status, error.response.data);
      }
    } else {
      console.error("Network Error:", error.message);
    }
    return Promise.reject(error);
  }
);

module.exports = axiosInstance;
