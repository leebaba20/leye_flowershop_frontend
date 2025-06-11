// src/context/UserProvider.jsx
import React, { useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { ApiSignup, ApiLogin, ApiLogout, getCurrentUser } from '../utils/Api';

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        console.log("Fetched user:", currentUser); // ✅ For debugging
        setUser(currentUser);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const signup = async (userData) => {
    try {
      await ApiSignup(userData);
      const newUser = await getCurrentUser();
      setUser(newUser);
    } catch (error) {
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      await ApiLogin(credentials);
      const loggedInUser = await getCurrentUser();
      setUser(loggedInUser);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await ApiLogout();
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ user, isLoading, login, logout, signup }}>
      {children}
    </UserContext.Provider>
  );
};
