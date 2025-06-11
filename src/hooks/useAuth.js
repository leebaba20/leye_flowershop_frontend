import { useState, useEffect } from 'react';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check current logged-in user on mount
  useEffect(() => {
    fetch(`${apiBaseUrl}/auth/current-user`, {
      credentials: 'include',
    })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Not logged in');
      })
      .then(data => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  // Login function
  async function login(email, password) {
    const res = await fetch(`${apiBaseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Login failed');
    }
    const data = await res.json();
    setUser(data.user);
    return data.user;
  }

  // Signup function
  async function signup(name, email, password) {
    const res = await fetch(`${apiBaseUrl}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Signup failed');
    }
    const data = await res.json();
    setUser(data.user);
    return data.user;
  }

  // Logout function
  async function logout() {
    const res = await fetch(`${apiBaseUrl}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    if (res.ok) {
      setUser(null);
    } else {
      throw new Error('Logout failed');
    }
  }

  return { user, loading, login, signup, logout };
}
