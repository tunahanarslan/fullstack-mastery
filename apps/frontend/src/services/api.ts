import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 👈 fallback kaldırdık
});

// 🔐 Token’ı otomatik ekle
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 🚨 401'de doğru path'e yönlendir
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      // HashRouter kullandığımız için:
      window.location.href = "/fullstack-mastery/#/auth";
    }
    return Promise.reject(error);
  }
);

export default api;
