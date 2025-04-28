// src/context/UserProvider.jsx
import React, { useState, useEffect } from 'react';
import { UserContext } from './UserContext';

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false); // Set loading to false after checking localStorage
  }, []);

  const login = (userData) => {
    setUser(userData); // Update the user state
    localStorage.setItem('user', JSON.stringify(userData)); // Store user in localStorage
  };

  const logout = () => {
    setUser(null); // Clear the user from the state
    localStorage.removeItem('user'); // Remove the user from localStorage
    // Optionally, clear cart/localStorage if needed here as well
    // localStorage.removeItem('cart');
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
