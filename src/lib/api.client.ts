import axios from 'axios';

const API_BASE_URL = "http://localhost:5003/api";

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Thêm interceptor để xử lý lỗi và token sau này
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor response để bắt 401 và gọi refresh token
api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      // Nếu lỗi 401 (token hết hạn) và chưa thử refresh
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          const refreshToken = localStorage.getItem("refreshToken");
          interface RefreshTokenResponse {
              accessToken: string;
          }
          const res = await axios.post<RefreshTokenResponse>(`${API_BASE_URL}/auth/refresh-token`, { refreshToken });
          const newAccessToken = res.data.accessToken;
  
          localStorage.setItem("accessToken", newAccessToken);
  
          // Gán lại token mới vào request cũ và gọi lại
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch {
          // Nếu refresh token cũng hết hạn → chuyển về login
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
        }
      }
  
      return Promise.reject(error);
    }
  );

export default api;