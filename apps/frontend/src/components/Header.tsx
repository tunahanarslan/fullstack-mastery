import { memo } from "react";

const Header = memo(function Header() {
  console.log("Header rendered");
  return (
    <header className="text-center py-4 border-bottom mb-4">
      <h1 className="text-primary fw-bold">Pulse UI</h1>
      <p className="lead">Smart dashboard with responsive design</p>
    </header>
  );
});

export default Header;
