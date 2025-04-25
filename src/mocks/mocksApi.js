// src/mocks/mockAPI.js

// Mock Signup function
export const mockSignup = (userData) => {
  const { name, email, password } = userData;

  // Simulate network delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check if email and password are provided
      if (email && password) {
        // Store user data in localStorage as a mock of saving data to a backend
        const user = { name, email, password };
        localStorage.setItem("user", JSON.stringify(user));

        // Return the user data as a resolved promise
        resolve(user);
      } else {
        // Reject the promise with an error if fields are missing
        reject(new Error("Missing required fields"));
      }
    }, 1000); // Simulated network delay (1 second)
  });
};

// Mock Login function
export const mockLogin = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.email === email && storedUser.password === password) {
        resolve(storedUser); // Simulate successful login
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 1000); // Simulated network delay (1 second)
  });
};

// Mock Logout function
export const mockLogout = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem("user"); // Remove user from localStorage
      resolve("User logged out");
    }, 500); // Simulate network delay (0.5 second)
  });
};

// Simulate fetching user data from localStorage
export const getUser = () => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null; // Return the stored user or null if no user is logged in
};
