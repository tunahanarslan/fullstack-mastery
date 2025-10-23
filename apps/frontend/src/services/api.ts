import axios from "axios";

// ✅ Ortam değişkeninden API adresini al
// .env içinde: VITE_API_URL=http://localhost:8000/api
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // gerekirse true yapılabilir (auth eklenirse)
});

export default api;
