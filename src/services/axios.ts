import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Create a new Axios instance
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://foodcorner.zapto.org/api", // Assuming you have set the API base URL in your environment variables
  timeout: 10000, 
});


