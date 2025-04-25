import React, { useState } from 'react';
import './contact.css'; // optional CSS file for styling

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add a form submission logic here, like sending data to an API
    alert('Form submitted!'); // Placeholder for now
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      
      <div className="contact-details">
        <h2>Get in Touch</h2>
        <p>If you have any questions or need assistance, feel free to reach out to us.</p>

        <div className="contact-info">
          <div>
            <strong>Phone:</strong> +2348142408571, +234705461888
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
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" className="btn-submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
