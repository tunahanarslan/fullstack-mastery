import { useAuth } from "../context/AuthContext";
import ThemeToggle from "../ThemeToggle";
import Header from "../components/Header";
import StatsCard from "../components/StatsCard";
import UserList from "../components/UserList";

export default function Dashboard() {
  const { logout } = useAuth();

  return (
    <>
      <ThemeToggle />
      <div className="container py-5">
        <Header />
        <button className="btn btn-danger float-end mb-3" onClick={logout}>
          Logout
        </button>
        <h1 className="text-center mt-3">Fullstack Mastery Dashboard</h1>
        <div className="row text-center mb-4">
          <StatsCard title="Active Users" value={1320} />
          <StatsCard title="Messages Sent" value={4821} />
          <StatsCard title="System Uptime (%)" value={99.98} />
        </div>
        <UserList />
      </div>
    </>
  );
}
