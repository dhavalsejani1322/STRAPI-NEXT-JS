// lib/axios.ts
import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';

const strapiApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to each request (server-safe)
strapiApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = process.env.STRAPI_API_TOKEN;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: log response errors
strapiApi.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    console.error('API Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default strapiApi;
