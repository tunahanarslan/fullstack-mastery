import { useEffect, useState } from "react";
import api from "../services/api";

interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // ✏️ Edit modal state
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  // Kullanıcıları getir
  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Yeni kullanıcı ekle
  const handleAddUser = async () => {
    try {
      setLoading(true);
      await api.post("/users", { name, email });
      setName("");
      setEmail("");
      await fetchUsers();
    } catch (error) {
      alert("Failed to add user. Check the console for details.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Kullanıcı sil
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    await api.delete(`/users/${id}`);
    fetchUsers();
  };

  // Kullanıcıyı düzenleme moduna al
  const startEdit = (user: User) => {
    setEditingUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
  };

  // Düzenlenen kullanıcıyı kaydet
  const handleUpdate = async () => {
    if (!editingUser) return;
    try {
      await api.put(`/users/${editingUser._id}`, {
        name: editName,
        email: editEmail,
      });
      setEditingUser(null);
      await fetchUsers();
    } catch (error) {
      alert("Failed to update user.");
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>👥 User Management</h2>

      <div className="d-flex gap-2 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="btn btn-primary"
          onClick={handleAddUser}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add User"}
        </button>
      </div>

      <table className="table table-striped align-middle">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, index) => (
            <tr key={u._id}>
              <td>{index + 1}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{new Date(u.createdAt).toLocaleString()}</td>
              <td className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => startEdit(u)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(u._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center text-muted">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 🧩 Edit Modal */}
      {editingUser && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        >
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <h5>Edit User</h5>
              <input
                className="form-control mb-2"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Name"
              />
              <input
                className="form-control mb-2"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                placeholder="Email"
              />
              <div className="d-flex justify-content-end gap-2 mt-2">
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditingUser(null)}
                >
                  Cancel
                </button>
                <button className="btn btn-success" onClick={handleUpdate}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
