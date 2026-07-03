import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setMessage(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 20 }}>
      <h2>Login</h2>
      <form onSubmit={submit}>
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
          Login
        </button>
      </form>
      {message && (
        <p style={{ color: "red", marginTop: 12 }}>{message}</p>
      )}
      <p style={{ marginTop: 20 }}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
