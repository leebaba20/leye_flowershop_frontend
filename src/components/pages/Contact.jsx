import React, { useState, useEffect } from 'react';
import './contact.css';
import { sendContactMessage } from '../../utils/Api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const { name, email, message } = formData;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address.');
      }

      await sendContactMessage({ name, email, message });

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitted(false);
      setErrorMessage(
        error?.detail || error?.message || 'Failed to send message. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Auto-hide success message after 5 seconds
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => setSubmitted(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      
      <div className="contact-details">
        <h2>Get in Touch</h2>
        <p>If you have any questions or need assistance, feel free to reach out to us.</p>

        <div className="contact-info">
          <div>
            <strong>Phone:</strong> +2348142408571, +2347054618881
          </div>
          <div>
            <strong>Email:</strong> princeleeoye@gmail.com
          </div>
          <div>
            <strong>Address:</strong> 11 Peace Ayomikun Street, Gbelero, Ikola Road, Ipaja, Lagos
          </div>
        </div>
      </div>

      <div className="contact-form">
        <h2>Send Us a Message</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Your Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <label htmlFor="email">Your Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            disabled={loading}
          ></textarea>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Sending...' : 'Submit'}
          </button>
        </form>

        {submitted && (
          <p className="success-msg">Thank you! Your message has been sent. 📩</p>
        )}

        {errorMessage && (
          <p className="error-msg text-danger mt-2">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Contact;
