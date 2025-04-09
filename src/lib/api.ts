import { RefreshTokenResponse } from '@/types/index';
import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = "http://localhost:5003/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token from cookies
api.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");
  if (token) {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Handle token refresh
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = Cookies.get("refreshToken");

        const res = await axios.post<RefreshTokenResponse>(`${API_BASE_URL}/auth/refresh-token`, { refreshToken });
        const newAccessToken = res.data.accessToken;
        Cookies.set("accessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);
