import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await API.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setMessage(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 20 }}>
      <h2>Register</h2>
      <form onSubmit={submit}>
        <div>
          <input
            value={form.name}
            placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={{ width: "100%", padding: 10, marginBottom: 10 }}
          />
        </div>
        <div>
          <input
            type="email"
            value={form.email}
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={{ width: "100%", padding: 10, marginBottom: 10 }}
          />
        </div>
        <div>
          <input
            type="password"
            value={form.password}
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            style={{ width: "100%", padding: 10, marginBottom: 10 }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px" }}>
          Register
        </button>
      </form>
      {message && (
        <p style={{ color: "red", marginTop: 12 }}>{message}</p>
      )}
      <p style={{ marginTop: 20 }}>
        Already registered? <Link to="/">Login</Link>
      </p>
    </div>
  );
}
