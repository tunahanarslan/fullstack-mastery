import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthForm() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const endpoint = mode === "login" ? "/auth/login" : "/auth/register";
      const { data } = await api.post(endpoint, formData);

      if (mode === "login" && data.token) {
        login(data.token);
        setMessage("✅ Login successful! Redirecting...");
        setTimeout(() => navigate("/"), 1200);
      } else {
        setMessage("✅ Registration successful! You can now log in.");
        setMode("login");
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      setMessage("❌ " + (error.response?.data?.message || "An error occurred."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "360px" }}>
        <h3 className="text-center mb-3 fw-bold text-primary">
          {mode === "login" ? "Login to Your Account" : "Create a New Account"}
        </h3>

        {message && (
          <div
            className={`alert ${
              message.startsWith("✅") ? "alert-success" : "alert-danger"
            }`}
            role="alert"
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {mode === "register" && (
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading
              ? "Processing..."
              : mode === "login"
              ? "Login"
              : "Register"}
          </button>
        </form>

        <div className="text-center mt-3">
          {mode === "login" ? (
            <p>
              Don’t have an account?{" "}
              <button className="btn btn-link p-0" onClick={() => setMode("register")}>
                Register here
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button className="btn btn-link p-0" onClick={() => setMode("login")}>
                Login here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
