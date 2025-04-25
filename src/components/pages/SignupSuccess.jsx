// src/pages/SignupSuccess.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap'; // Optional, if you're using Bootstrap
import { Link } from 'react-router-dom'; // Import Link for navigation

const SignupSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/product-details'); // Adjust this path as needed
    }, 8000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center">
      <h2 className="mb-3 text-success">🎉 Signup Successful!</h2>
      <p className="mb-4">Thank you for joining us. We're redirecting you to shop now...</p>
      <Spinner animation="border" variant="success" />
      
      {/* Add Links to Products, Latest Collections, and Bestsellers */}
      <div className="mt-4">
        <p>Or you can browse the following:</p>
        <div>
          <Link to="/latest-collections" className="btn btn-primary mx-2">
            Latest Collections
          </Link>
          <Link to="/bestsellers" className="btn btn-secondary mx-2">
            Bestsellers
          </Link>
          <Link to="/products" className="btn btn-outline-primary mx-2">
            ProductDetails
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupSuccess;
