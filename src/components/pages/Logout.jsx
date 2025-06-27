// logout.jsx
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApiLogout } from '../../utils/Api';
import './logout.css';

const Logout = () => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await ApiLogout();
        logout();

        // Optionally clear saved credentials
        // localStorage.removeItem('last_email');

        toast.success('✅ Successfully logged out! Redirecting...');
      } catch (error) {
        console.error('Logout error:', error);
        toast.error('❌ Logout failed. Clearing local session anyway...');
        logout(); // Ensure forced local logout
      }

      setTimeout(() => navigate('/login'), 2000);
    };

    handleLogout();
  }, [logout, navigate]);

  return (
    <div className="logout-page">
      <ToastContainer position="top-center" autoClose={2500} />
      <div className="loader"></div>
      <h2>Logging you out...</h2>
      <p>Thank you for visiting. See you again soon!</p>
    </div>
  );
};

export default Logout;
