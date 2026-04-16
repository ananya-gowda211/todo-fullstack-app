import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [search, setSearch] = useState("");

  // ✅ fetch tasks
  const fetchTasks = () => {
    fetch("http://localhost:8080/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ add task
  const addTask = () => {
    if (!input.trim()) return;

    fetch("http://localhost:8080/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: input }),
    })
      .then((res) => res.json())
      .then(() => {
        setInput("");
        fetchTasks();
      });
  };

  // ✅ delete task
  const deleteTask = (id) => {
    fetch(`http://localhost:8080/api/tasks/${id}`, {
      method: "DELETE",
    }).then(() => fetchTasks());
  };

  // ✅ update task
  const updateTask = (id) => {
    if (!editingText.trim()) return;

    fetch(`http://localhost:8080/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: editingText }),
    }).then(() => {
      setEditingId(null);
      setEditingText("");
      fetchTasks();
    });
  };

  return (
    <div className="app">
      <div className="card">
        <h1>✨ To-Do List</h1>

        {/* 🔍 Search */}
        <input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: "10px" }}
        />

        {/* ➕ Add */}
        <div className="inputBox">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your task..."
          />
          <button onClick={addTask}>Add</button>
        </div>

        {/* 📋 List */}
        <ul>
          {tasks
            .filter((task) =>
              task.description
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((task) => (
              <li key={task.id}>
                {editingId === task.id ? (
                  <>
                    <input
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                    />
                    <button onClick={() => updateTask(task.id)}>💾</button>
                  </>
                ) : (
                  <>
                    <span>{task.description}</span>

                    <div className="actions">
  <button
    className="edit-btn"
    onClick={() => {
      setEditingId(task.id);
      setEditingText(task.description);
    }}
  >
    ✏️
  </button>

  <button
    className="delete-btn"
    onClick={() => deleteTask(task.id)}
  >
    ❌
  </button>
</div>
                  </>
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default App;