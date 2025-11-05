import axios, { AxiosError } from "axios";
import type { AxiosResponse } from "axios";
const API_URL_BASE = import.meta.env.VITE_API_URL;
const VITE_CATOLOG_API = import.meta.env.VITE_CATOLOG_API;

// Create axios instances
export const Request = axios.create({
  baseURL: API_URL_BASE,
});

export const catalogRequest = axios.create({
  baseURL: VITE_CATOLOG_API,
});
export const catalogRequestTesting = axios.create({
  baseURL: "https://localhost:7084",
});

export const http = axios.create({
  baseURL: API_URL_BASE,

  timeout: 10000, // 10 seconds timeout
});

// Request interceptor
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    // Debug logging
    console.log(
      "HTTP Interceptor - Token from localStorage:",
      token ? "EXISTS" : "MISSING"
    );
    console.log("HTTP Interceptor - Request URL:", config.url);
    console.log("HTTP Interceptor - Request method:", config.method);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(
        "HTTP Interceptor - Authorization header set:",
        `Bearer ${token.substring(0, 20)}...`
      );
    } else {
      console.log("HTTP Interceptor - No token found in localStorage");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor with automatic token refresh
http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    // Check if error is 401 and we haven't retried yet
    if (
      (error.response?.status === 401 || error.response?.status === 500) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      console.log("Attempting to refresh token...");

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // Call refresh token endpoint  /api/v1/auth/login
        const response = await axios.post(
          `${API_URL_BASE}api/v1/auth/refresh-token`,
          {
            refreshToken,
          }
        );

        if (response.data.success) {
          const { accessToken, refreshToken: newRefreshToken } = response.data;

          // Update stored tokens
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", newRefreshToken);

          // Update authorization header
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          console.log("Token refreshed successfully");
          // Retry the original request
          return http(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, clear tokens and redirect to login
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");

        console.error("Token refresh failed:", refreshError);
        // Redirect to login page
        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Legacy axiosInstance for backward compatibility
export const axiosInstance = http;
