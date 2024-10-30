// src/components/UserDashboard.js
import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase"; // Import Firebase configuration
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import './Dashboard.css'; // Create CSS for styling

const UserDashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [createdEventsCount, setCreatedEventsCount] = useState(0);
  const [joinedEventsCount, setJoinedEventsCount] = useState(0);
  const [email, setEmail] = useState("");
  const [exploreEvents, setExploreEvents] = useState([]); // State for explore events

  // Get current user's email and check if logged in
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setEmail(user.email);
    } else {
      navigate('/login'); // Redirect to login if not logged in
    }
  }, [navigate]);

  // Fetch counts of events created and joined by the user
  useEffect(() => {
    const fetchEvents = async () => {
      const createdEventsQuery = query(collection(db, "events"), where("createdBy", "==", email));
      const createdEventsSnapshot = await getDocs(createdEventsQuery);
      setCreatedEventsCount(createdEventsSnapshot.size);

      // Assuming you have a 'userEvents' collection that tracks joined events
      const joinedEventsQuery = query(collection(db, "userEvents"), where("email", "==", email));
      const joinedEventsSnapshot = await getDocs(joinedEventsQuery);
      setJoinedEventsCount(joinedEventsSnapshot.size);
    };

    if (email) {
      fetchEvents();
    }
  }, [email]);

  // Fetch all events for exploration
  useEffect(() => {
    const fetchExploreEvents = async () => {
      const exploreEventsQuery = collection(db, "events");
      const exploreEventsSnapshot = await getDocs(exploreEventsQuery);
      const events = exploreEventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map to an array of event objects
      setExploreEvents(events); // Set the events to state
    };

    fetchExploreEvents();
  }, []); // Run once when the component mounts

  return (
    <div className="dashboard">
      <h2>User Dashboard</h2>
      <div className="event-boxes">
        <div className="event-box">
          <h3>Events Created</h3>
          <p>{createdEventsCount}</p>
        </div>
        <div className="event-box">
          <h3>Events Joined</h3>
          <p>{joinedEventsCount}</p>
        </div>
      </div>
      <h3>Explore Events</h3>
      <div className="explore-events">
        {exploreEvents.map(event => (
          <div key={event.id} className="explore-event">
            <h4>{event.title}</h4>
            <p>Date: {event.startDate}</p>
            <p>Time: {event.startTime}</p>
            <button>Join Event</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
