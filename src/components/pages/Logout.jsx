
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

        toast.success('Successfully logged out! Redirecting...');
        setTimeout(() => navigate('/login'), 2000);
      } catch (error) {
        console.error('Logout error:', error);
        toast.error('An error occurred during logout. Please try again.');
      }
    };

    handleLogout();
  }, [logout, navigate]);

  return (
    <div className="logout-page">
      <ToastContainer />
      <div className="loader"></div>
      <h2>Logging you out...</h2>
      <p>Thank you for visiting. See you again soon!</p>
    </div>
  );
};

export default Logout;
