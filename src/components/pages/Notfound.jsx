import React from 'react';
import './notfound.css'; // create and link a CSS file

const Notfound = () => {
  return (
    <div className="notfound-page">
      <div className="content">
        <h1>404</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <a href="/" className="btn-home">Go Home</a>
      </div>
    </div>
  );
};

export default Notfound;
