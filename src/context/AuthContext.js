import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

// Create context
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // Retrieve wallet from localStorage if available
        const walletAddress = localStorage.getItem("walletAddress");
        if (walletAddress) {
          // Set the wallet address in localStorage for use throughout the app
          localStorage.setItem("walletAddress", walletAddress);
        }
      } else {
        setUser(null);
        localStorage.removeItem("walletAddress"); // Clear wallet address on logout
      }
    });

    return () => unsubscribe(); // Clean up the listener
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};
