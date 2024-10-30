// src/components/Signup.jsx
import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Import CSS

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    country: '',
    state: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/dashboard'); // Redirect to dashboard if user is logged in
      }
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, age, country, state, password } = formData;

    if (!name || !email || !age || !country || !state || !password) {
      setError('All fields are required');
      return;
    }

    if (age < 13) {
      setError('You must be at least 13 years old to sign up.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), { name, email, age, country, state });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>Create Your Account</h2>
      <form onSubmit={handleSignup} className="signup-form">
        {['name', 'email', 'age', 'country', 'state', 'password'].map((field) => (
          <input
            key={field}
            type={field === 'password' ? 'password' : field === 'age' ? 'number' : 'text'}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
            required
          />
        ))}
        <button type="submit" disabled={loading} className="signup-button">
          {loading ? 'Signing up...' : 'Signup'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Signup;
