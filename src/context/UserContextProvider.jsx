import React, { useState, useEffect } from 'react';
import { UserContext } from './UserContext';

export const UserProvider = ({ children }) => {  
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage when the app first loads
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function to set user data and save to localStorage
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Logout function to clear user data from state and localStorage
  const logout = () => {
    setUser(null); // Clear user from state
    localStorage.removeItem('user'); // Remove user from localStorage

    // Optionally, clear other session data if needed (e.g., cart items)
    // localStorage.removeItem('cart');

    // Add toast or other feedback mechanism if needed
    // Example: toast.success("Logged out successfully!");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
