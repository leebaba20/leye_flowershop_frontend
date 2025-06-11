import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import './signupsuccess.css';

const SignupSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/products'); // Redirect to products listing
    }, 8000); // You can reduce to 5000ms if you want quicker redirect

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="signup-success-container d-flex flex-column justify-content-center align-items-center vh-100 text-center"
      aria-live="polite"
    >
      <h2 className="mb-3">🎉 Signup Successful!</h2>
      <p className="mb-4">
        Thank you for joining us. We're redirecting you to shop now...
      </p>
      <Spinner animation="border" variant="light" className="signup-success-spinner" />

      <div className="mt-4 signup-success-buttons">
        <p>Or you can browse the following:</p>
        <Link to="/latest-collections" className="btn btn-primary">
          Latest Collections
        </Link>
        <Link to="/bestsellers" className="btn btn-secondary">
          Bestsellers
        </Link>
        <Link to="/products" className="btn btn-outline-primary">
          All Products
        </Link>
      </div>
    </div>
  );
};

export default SignupSuccess;
