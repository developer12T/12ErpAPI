const axios = require("axios");
const { ERP_API_BASE_URL } = require("../config/index");

const milliseconds = 5 * 1000;
const seconds = 60 * 1000;
const minutes = 60 * 60 * 1000;

const axiosInstance = axios.create({
  baseURL: ERP_API_BASE_URL,
  // timeout: seconds,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = "YOUR_ACCESS_TOKEN"; // Replace with actual token retrieval logic
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

// Response interceptor
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
      const statusCode = error.response.status;
      let customError;
      const url = error.response.config.url;
      // Handle the error based on status codes
      switch (statusCode) {
        case 401:
          customError = new Error("Unauthorized, redirecting to login...");
          customError.statusCode = 401;
          break;
        case 403:
          customError = new Error("Forbidden");
          customError.statusCode = 403;
          break;
        case 404:
          customError = new Error("Not Found");
          customError.statusCode = 404;
          break;
        default:
          if( typeof error.response.data === "object"){
            customError = new Error(`Error:Request Failed : ${url}`);
            const errorData = error.response.data.message
            const resultArray = errorData.split(',\n').map(str => str.replace('Validation error: ', '').trim());
            customError.statusCode = statusCode;
            customError.validation = resultArray
          }else{
            customError = new Error(`Error: ${statusCode}, ${error.response.data}`);
            customError.statusCode = statusCode;
          }
      }

      console.error(customError.message);
      throw customError;
    } else {
      console.error("Network Error:", error.message);
    }
    return Promise.reject(error);
  }
);

module.exports = axiosInstance;
