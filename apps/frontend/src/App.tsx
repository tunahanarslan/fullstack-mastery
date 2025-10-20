import ThemeToggle from "./ThemeToggle";
import Header from "./components/Header";
import StatsCard from "./components/StatsCard";
import { useState } from "react";

export default function App() {
  const [stats, setStats] = useState({
    users: 1320,
    messages: 4821,
    uptime: 99.98,
  });

  return (
    <>
      <ThemeToggle />
      <div className="container py-5">
        <Header />
        <div className="row text-center">
          <StatsCard title="Active Users" value={stats.users} />
          <StatsCard title="Messages Sent" value={stats.messages} />
          <StatsCard title="System Uptime (%)" value={stats.uptime} />
        </div>
      </div>
    </>
  );
}
