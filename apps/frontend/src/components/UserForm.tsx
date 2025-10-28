import { useState } from "react";
import api from "../services/api.js";

export default function UserForm({ onUserAdded }: { onUserAdded: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/users", { name, email });
      setName("");
      setEmail("");
      onUserAdded(); // listeyi yenile
    } catch (err) {
      console.error(err);
      setError("Failed to add user. Check the console for details.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-3 border rounded bg-light">
      <h5>Add New User</h5>
      {error && <p className="text-danger">{error}</p>}

      <div className="mb-2">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add User"}
      </button>
    </form>
  );
}
