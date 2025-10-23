import { useState } from "react";
import api from "../services/api";

interface AuthFormProps {
  onLogin: (token: string) => void;
}

export default function AuthForm({ onLogin }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const payload = isLogin ? { email, password } : { name, email, password };
      const res = await api.post(endpoint, payload);

      const token = res.data.token;
      onLogin(token); // 🔥 parent’a token’ı ilet
      alert(`${isLogin ? "Logged in" : "Registered"} successfully!`);
    } catch (err: any) {
      alert(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4">{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            className="form-control mb-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="form-control mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="form-control mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary w-100" type="submit">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <div className="text-center mt-3">
        <button
          className="btn btn-link"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Create an account" : "Already have an account?"}
        </button>
      </div>
    </div>
  );
}
