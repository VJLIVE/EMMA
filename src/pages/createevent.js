import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase"; // Import Firebase configuration
import { collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import './CreateEvent.css';

const CreateEvent = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(""); // Start date state
  const [startTime, setStartTime] = useState(""); // Start time state
  const [endDate, setEndDate] = useState(""); // End date state
  const [endTime, setEndTime] = useState(""); // End time state
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // Listen for changes in auth state to get the current user's email
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
      } else {
        setEmail("");
        navigate('/login'); // Redirect to login if user is not authenticated
      }
    });
    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, [navigate]); // Add navigate to the dependency array

  // Function to get the current date and time in local format
  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString('en-CA'); // Format to 'YYYY-MM-DD'
    const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }); // Format to 'HH:MM'
    return { date, time };
  };

  // Set initial values for start and end time
  useEffect(() => {
    const { date, time } = getCurrentDateTime();
    setStartDate(date);
    setEndDate(date); // Default end date to today's date
    setStartTime(time);
    // Calculate end time as 30 minutes after the start time
    const startTimeDate = new Date(`${date}T${time}`);
    const endTimeDate = new Date(startTimeDate.getTime() + 30 * 60000); // Add 30 minutes in milliseconds
    const endFormattedTime = endTimeDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }); // Format to 'HH:MM'
    setEndTime(endFormattedTime);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert to IST by adjusting the time zone
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC +5:30
    const startDateTime = new Date(`${startDate}T${startTime}:00Z`);
    const endDateTime = new Date(`${endDate}T${endTime}:00Z`);

    // Adjusting time to IST
    const startIST = new Date(startDateTime.getTime() + istOffset);
    const endIST = new Date(endDateTime.getTime() + istOffset);

    const currentTime = new Date(); // Current date and time in UTC

    // Check if start time is valid
    if (startIST < currentTime) {
      setError("Start time must be in the future.");
      return;
    }
    // Check if end time is valid
    if (endIST <= startIST) {
      setError("End time must be after start time.");
      return;
    }

    console.log({
      title,
      location,
      description,
      startDate,
      startTime,
      endDate,
      endTime,
      startTimeIST: startIST.toISOString(),
      endTimeIST: endIST.toISOString(),
      createdBy: email,
    });

    try {
      await addDoc(collection(db, "events"), {
        title,
        location,
        description,
        startDate, // Save start date
        startTime, // Save start time
        endDate, // Save end date
        endTime, // Save end time
        startTimeIST: startIST.toISOString(), // Save start time in IST
        endTimeIST: endIST.toISOString(), // Save end time in IST
        createdBy: email,
        timestamp: new Date(),
      });
      alert("Event created successfully!");
      // Clear form fields
      setTitle("");
      setLocation("");
      setDescription("");
      setStartDate("");
      setStartTime(""); 
      setEndDate(""); 
      setEndTime(""); 
      setError(""); // Clear any previous errors
    } catch (error) {
      console.error("Error adding document: ", error.message);
      setError("Failed to create event. " + error.message);
    }
  };

  return (
    <div className="wrapper">
      <div className="container">
        <h2>Create Event</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </label>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </label>
          <label>
            Start Time:
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </label>
          <label>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </label>
          <label>
            End Time:
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </label>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Create Event</button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
