import React, { useEffect, useState } from "react";

export const CreateEvent = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [maxPeoples, setMaxPeoples] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setToken(token);

    fetch("http://localhost:8080/events/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setEvents(data))
      .catch((err) => setError("Failed to fetch events."));
  }, []);

  const handleCreateEvent = (e) => {
    e.preventDefault();

    if (!title || !location || !startingDate || !endDate || !maxPeoples) {
      setError("All fields are required.");
      return;
    }

    fetch("http://localhost:8080/events/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${token}`,
      },
      body: JSON.stringify({ title, location, startingdate: startingDate, enddate: endDate, maxpeoples: maxPeoples }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => Promise.reject(data));
        }
        return response.json();
      })
      .then((data) => {
        alert(data.message);
        setEvents([...events, { title, location, startingdate: startingDate, enddate: endDate, maxpeoples: maxPeoples }]);
        setTitle("");
        setLocation("");
        setStartingDate("");
        setEndDate("");
        setMaxPeoples("");
        setError("");
      })
      .catch((err) => setError(err.message || "Failed to create event."));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Smart Event Management System</h1>

      <form style={styles.form} onSubmit={handleCreateEvent}>
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={styles.input}
        />
        <input
          type="date"
          placeholder="Starting Date"
          value={startingDate}
          onChange={(e) => setStartingDate(e.target.value)}
          style={styles.input}
        />
        <input
          type="date"
          placeholder="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Max People"
          value={maxPeoples}
          onChange={(e) => setMaxPeoples(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Create Event</button>
      </form>

      {error && <p style={styles.error}>{error}</p>}

      {events.length > 0 ? (
        events.map((event) => (
          <div key={event._id} style={styles.eventCard}>
            <div style={styles.eventDetail}><strong>Title:</strong> {event.title}</div>
            <div style={styles.eventDetail}><strong>Location:</strong> {event.location}</div>
            <div style={styles.eventDetail}><strong>Starting Date:</strong> {new Date(event.startingdate).toLocaleDateString()}</div>
            <div style={styles.eventDetail}><strong>End Date:</strong> {new Date(event.enddate).toLocaleDateString()}</div>
            <div style={styles.eventDetail}><strong>Max People:</strong> {event.maxpeoples}</div>
          </div>
        ))
      ) : (
        <div style={styles.noEvents}>No events found</div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#45a049",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
  eventCard: {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    marginTop: "20px",
  },
  eventDetail: {
    marginBottom: "5px",
  },
  noEvents: {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "18px",
    color: "#777",
  },
};
