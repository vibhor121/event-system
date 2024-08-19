import React, { useEffect, useState } from "react";

export const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    console.log(token);
    setToken(token);

    fetch("http://localhost:8080/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${token}`,
      },
    })
      .then((d) => d.json())
      .then((d) => setTodos(d.todos))
      .catch((err) => console.log(err));
  }, []);

  const handleAddTodo = (e) => {
    e.preventDefault();
    console.log(title);
    fetch("http://localhost:8080/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        setTodos([...todos, { title, status: false }]);
        setTitle(""); 
      })
      .catch((err) => console.log(err));
  };

  const handleToggleStatus = (id, currentStatus) => {
    fetch(`http://localhost:8080/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${token}`,
      },
      body: JSON.stringify({ status: !currentStatus }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos(todos.map(todo => 
          todo._id === id ? { ...todo, status: !currentStatus } : todo
        ));
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteTodo = (id) => {
    fetch(`http://localhost:8080/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Todos</h1>

      <form style={{ display: "flex", gap: "10px" }} onSubmit={handleAddTodo}>
        <input
          type="text"
          placeholder="Enter your todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {todos.length > 0 ? (
        todos.map((e, index) => (
          <div key={e._id} style={{ display: "flex", gap: "30px", alignItems: "center",marginTop:"20px" }}>
            <div>Title: {e.title}</div>
            <div>Status: {e.status ? "True" : "False"}</div>
            <button onClick={() => handleToggleStatus(e._id, e.status)}>
              Toggle Status
            </button>
              <button onClick={() => handleDeleteTodo(e._id)}>delete</button>

          </div>
        ))
      ) : (
        <div>No todos found</div>
      )}
    </div>
  );
};
