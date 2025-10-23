import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import Header from "./components/Header";
import StatsCard from "./components/StatsCard";
import UserList from "./components/UserList";
import AuthForm from "./components/AuthForm";

export default function App() {
  // 🔐 login durumu (token localStorage'dan okunuyor)
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const handleLogin = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  // 📊 örnek istatistikler
  const [stats] = useState({
    users: 1320,
    messages: 4821,
    uptime: 99.98,
  });

  // Eğer giriş yapılmadıysa AuthForm göster
  if (!token) {
    return (
      <div className="d-flex flex-column align-items-center mt-5">
        <AuthForm onLogin={handleLogin} />
        <p className="mt-3 text-muted small">
          👋 Enter your credentials to access the dashboard
        </p>
      </div>
    );
  }

  // ✅ Giriş yapılmışsa dashboard ekranı
  return (
    <>
      <ThemeToggle />
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Header />
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="row text-center mb-4">
          <StatsCard title="Active Users" value={stats.users} />
          <StatsCard title="Messages Sent" value={stats.messages} />
          <StatsCard title="System Uptime (%)" value={stats.uptime} />
        </div>

        <h1 className="text-center mt-3">Fullstack Mastery</h1>
        <UserList />
      </div>
    </>
  );
}
