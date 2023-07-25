import axios from "axios";

let API_URL = "http://localhost:3003/api/v1/";

let defaultOptions = {
  baseURL: API_URL,
};

const axiosInstance = axios.create(defaultOptions);

const requestHandler = (request) => {
  const token = sessionStorage.getItem("token");
  if (token) request.headers["Authorization"] = `Bearer ${token}`;
  request.headers["request-type"] = "web";
  return request;
};

const responseHandler = (response) => {
  return response.data;
};

axiosInstance.interceptors.request.use((request) => requestHandler(request));

axiosInstance.interceptors.response.use((response) =>
  responseHandler(response)
);

export { API_URL, axiosInstance };
