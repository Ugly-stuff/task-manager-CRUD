const express = require("express"); // using express 
const cors = require("cors"); // connection between frontend-- backeEND

const app = express();
app.use(cors());         // enabling cors for react connection
app.use(express.json()); //to read JSON data needed middleware

let tasks = []; // basically its for temporary memory storage here imnot using any db

// get tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// task add route
app.post("/tasks", (req, res) => {
  const { title } = req.body; // title coming from frontEND

  if (!title) return res.json({ error: "Title required" }); // validation

  const newTask = { // for new task object
    id: Date.now(),
    title,
    completed: false, 
  };

  tasks.push(newTask);  //tasks added in array
  res.json(newTask);
});

// toggle for complete/ incomplete
app.patch("/tasks/:id", (req, res) => {
  const id = req.params.id;

  tasks.forEach(task => { // checking all task
    if (task.id == id) task.completed = !task.completed;
  });

  res.json({ message: "updated" });
});

// deleting  tasks
app.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;

  tasks = tasks.filter(task => task.id != id); // removing

  res.json({ message: "deleted" });
});

app.listen(5000, () => console.log("Server running")); // PORT 5000