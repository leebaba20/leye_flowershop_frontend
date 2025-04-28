import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css'

const Footer = () => {
  return (
    <footer className="footer-custom">
      <div className="container">
        <div className="footer-grid">
          {/* About Our Store Section */}
          <div className="footer-section">
            <h5>About Our Store</h5>
            <p>Your real destination for exclusive deals, quality flowers, affordable prices, and seamless online flower shopping.</p>
          </div>

          {/* Pages Section */}
          <div className="footer-section">
            <h5>Pages</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-white">Home</Link></li>
              <li><Link to="/about" className="text-white">About</Link></li>
              <li><Link to="/service" className="text-white">Service</Link></li>
              <li><Link to="/contact" className="text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div className="footer-section">
            <h5>Follow Us</h5>
            <ul className="social-links">
              <li><a href="https://facebook.com" className="text-white" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://instagram.com" className="text-white" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://twitter.com" className="text-white" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Leye Flower Shop. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
