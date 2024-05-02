import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Create a new Axios instance
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_DEV_BASE_URL, // Assuming you have set the API base URL in your environment variables
  timeout: 10000, 
});