// src/pages/login/Login.jsx
import React, { useState, useContext } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../context/UserContext';
import { mockLogin } from '../../mocks/mocksApi'

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use the mockLogin function instead of real network request
      const user = await mockLogin(formData.email, formData.password); // Call mockLogin function

      // Login the user
      login(user);

      // Show success message and redirect to homepage
      toast.success('Login successful! Redirecting...', {
        autoClose: 2000,
        onClose: () => navigate('/'),  // Redirect to homepage or another page
      });
    } catch (error) {
      // Handle errors (invalid credentials, etc.)
      toast.error(error.message);  // Display the error message from the mock API
    }

    // Clear the form after submitting
    setFormData({
      email: '',
      password: '',
    });
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <h1 className="text-center mb-4">Login</h1>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn-submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
