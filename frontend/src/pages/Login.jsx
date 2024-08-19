import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const submitHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("access_token", data.access_token);
        navigate("/events"); // Redirect to Events page after successful login
      } else {
        console.error(data.message);
        alert(data.message); // Show error message
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
          width: "300px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "24px", marginBottom: "20px", color: "#333" }}>
          Login
        </h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={submitHandler}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            border: "1px solid #ced4da",
            borderRadius: "5px",
            fontSize: "16px",
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={submitHandler}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            border: "1px solid #ced4da",
            borderRadius: "5px",
            fontSize: "16px",
          }}
        />
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#ffffff",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
        <Link
          to="/"
          style={{
            display: "block",
            marginTop: "15px",
            color: "#007bff",
            textDecoration: "none",
          }}
        >
          Create an account
        </Link>
      </div>
    </div>
  );
};
