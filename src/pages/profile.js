// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // Import the CSS file

function Profile({ user }) {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Redirect to login if user is not logged in
    if (!user) {
      navigate('/login'); // Redirect to the login page
      return;
    }

    const fetchUserData = async () => {
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          setError('No user data found');
        }
      } catch (err) {
        setError('Failed to load user data');
      }
    };

    fetchUserData();
  }, [user, navigate]); // Add navigate to the dependency array

  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {userData ? (
        <div className="profile-details">
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Age:</strong> {userData.age}</p>
          <p><strong>Country:</strong> {userData.country}</p>
          <p><strong>State:</strong> {userData.state}</p>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
}

export default Profile;
