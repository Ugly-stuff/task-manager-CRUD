import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const loadTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
      }
      setMessage(err.response?.data?.message || "Could not load tasks");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      return;
    }
    loadTasks();
  }, []);

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setEditingTask(null);
  };

  const submitTask = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (editingTask) {
        await API.put(`/tasks/${editingTask._id}`, { title, description });
        setMessage("Task updated successfully");
      } else {
        await API.post("/tasks", { title, description });
        setMessage("Task created successfully");
      }

      clearForm();
      loadTasks();
    } catch (err) {
      setMessage(err.response?.data?.message || "Could not save task");
    }
  };

  const editTask = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description || "");
    setMessage("");
  };

  const deleteTask = async (id) => {
    setMessage("");
    try {
      await API.delete(`/tasks/${id}`);
      setMessage("Task deleted successfully");
      loadTasks();
    } catch (err) {
      setMessage(err.response?.data?.message || "Could not delete task");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={{ maxWidth: 760, margin: "40px auto", padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h2>Dashboard</h2>
          <p>Welcome, {user?.name || "User"}</p>
        </div>
        <button onClick={logout} style={{ height: 40 }}>
          Logout
        </button>
      </div>

      {message && (
        <div style={{ marginBottom: 16, color: "green" }}>{message}</div>
      )}

      <form onSubmit={submitTask} style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 10 }}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            style={{ width: "100%", padding: 10 }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            style={{ width: "100%", padding: 10, minHeight: 80 }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px" }}>
          {editingTask ? "Update Task" : "Create Task"}
        </button>
        {editingTask && (
          <button
            type="button"
            onClick={clearForm}
            style={{ marginLeft: 10, padding: "10px 20px" }}
          >
            Cancel
          </button>
        )}
      </form>

      <div>
        {tasks.length === 0 && <p>No tasks available.</p>}
        {tasks.map((task) => (
          <div
            key={task._id}
            style={{
              border: "1px solid #ccc",
              padding: 16,
              marginBottom: 16,
              borderRadius: 6,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <h3>{task.title}</h3>
                <p>{task.description || "No description"}</p>
                <p style={{ color: "#666", fontSize: 14 }}>
                  {task.completed ? "Completed" : "Pending"}
                </p>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => editTask(task)} style={{ padding: "6px 12px" }}>
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task._id)}
                  style={{ padding: "6px 12px" }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
