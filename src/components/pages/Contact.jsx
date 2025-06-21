import React, { useState } from 'react';
import './contact.css';
import { sendContactMessage } from '../../utils/Api';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { name, email, message } = formData;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address.');
      }

      const res = await sendContactMessage({ name, email, message });

      toast.success(res.message || '📩 Your message has been sent!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error(
        error?.detail || error?.message || '❌ Failed to send message. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

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
      </div>
    </div>
  );
};

export default Contact;
