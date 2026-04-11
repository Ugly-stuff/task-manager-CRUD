import { useEffect, useState } from "react";

const API = "http://localhost:5000/tasks";   //backEND api url

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // function to fetcch all tasks
  const getTasks = async () => {
    const res = await fetch(API); // getting request 
    const data = await res.json(); // JSON convertion
    setTasks(data); // state update
  };

  useEffect(() => { 
    getTasks();
  }, []);

  // function to add new task
  const addTask = async () => {
    if (!title) return;

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    setTitle("");
    getTasks();
  };

  // task complete toggle
  const toggleTask = async (id) => {
    await fetch(`${API}/${id}`, { method: "PATCH" });
    getTasks();
  };

  // delete
  const deleteTask = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    getTasks();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Task Manager</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            <span
              onClick={() => toggleTask(t.id)}
              style={{
                textDecoration: t.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {t.title}
            </span>

            <button onClick={() => deleteTask(t.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;