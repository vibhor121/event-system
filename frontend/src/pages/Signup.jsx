import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, role }), // Include role
      });

      const result = await response.json();

      if (response.status === 201) {
        alert(result.message);
        navigate('/login');
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
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
          Signup
        </h1>
        <form onSubmit={handleSignup}>
          <input
            type='text'
            placeholder='Username'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              border: "1px solid #ced4da",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          />
          <br />
          <input
            type='email'
            placeholder='Email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              border: "1px solid #ced4da",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          />
          <br />
          <input
            type='password'
            placeholder='Password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              border: "1px solid #ced4da",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          />
          <br />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              border: "1px solid #ced4da",
              borderRadius: "5px",
              fontSize: "16px",
              backgroundColor: "#ffffff",
              color: "#333",
            }}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="organizer">Organizer</option>
          </select>
          <br />
          <button
            type='submit'
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
            Signup
          </button>
          <Link
            to="/login"
            style={{
              display: "block",
              marginTop: "15px",
              color: "#007bff",
              textDecoration: "none",
            }}
          >
            Existing User? Login
          </Link>
        </form>
      </div>
    </div>
  );
};
