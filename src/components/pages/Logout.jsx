import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext'; // Import UserContext
import { mockLogout } from '../../mocks/mocksApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Logout = () => {
  const { logout } = useContext(UserContext); // Use the logout function from UserContext
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Perform mock logout (can replace with real API call)
        await mockLogout();

        // Clear user from context
        logout();

        // Show success message
        toast.success('Successfully logged out!', {
          autoClose: 2000,
          onClose: () => navigate('/login'), // Redirect to login page after successful logout
        });
      } catch (error) {
        // Handle any errors during the logout process
        console.error(error);  // Optionally log the error
        toast.error('An error occurred during logout. Please try again.');
      }
    };

    handleLogout(); // Call the logout function when the component is mounted
  }, [logout, navigate]);

  return (
    <div className="logout-page">
      <ToastContainer />
      <h2 className="text-center">Logging out...</h2>
    </div>
  );
};

export default Logout;
