// src/pages/Events.js
import React, { useEffect, useState } from 'react';
import './Events.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { db, auth } from '../firebase'; // Import Firebase configuration
import { collection, query, where, getDocs } from 'firebase/firestore';

function Events() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [createdEventsCount, setCreatedEventsCount] = useState(0);
  const [joinedEventsCount, setJoinedEventsCount] = useState(0);
  const [email, setEmail] = useState("");

  // Get current user's email and check for authentication
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      // If no user is authenticated, redirect to login page
      navigate('/login');
    } else {
      setEmail(user.email);
      fetchEventStats(user.email);
    }
  }, [navigate]); // Add navigate to the dependency array

  // Function to fetch event statistics
  const fetchEventStats = async (userEmail) => {
    try {
      const createdEventsQuery = query(collection(db, "events"), where("createdBy", "==", userEmail));
      const createdEventsSnapshot = await getDocs(createdEventsQuery);
      setCreatedEventsCount(createdEventsSnapshot.size);
  
      const joinedEventsQuery = query(collection(db, "joinedevents"), where("email", "==", userEmail));
      const joinedEventsSnapshot = await getDocs(joinedEventsQuery);
      setJoinedEventsCount(joinedEventsSnapshot.size);
    } catch (error) {
      console.error("Error fetching event stats:", error);
    }
  };  

  const handleCreateEvent = () => {
    // Logic to navigate to the Create Event page
    navigate('/createevent'); // Use navigate function
  };

  return (
    <div className="events-container">
      <div className="events-box">
        <h2>Create an Event</h2>
        <button onClick={handleCreateEvent} className="button">
          Let's Go
        </button>
      </div>

      <div className="stats">
        <div className="stat-item">
          <h3>Events Created</h3>
          <p>{createdEventsCount}</p>
        </div>
        <div className="stat-item">
          <h3>Events Joined</h3>
          <p>{joinedEventsCount}</p>
        </div>
      </div>
    </div>
  );
}

export default Events;