import React from 'react';
import './service.css'; // optional CSS file for styling

const Service = () => {
  const services = [
    {
      id: 1,
      title: 'Free Delivery',
      description: 'We offer free delivery within the city for all orders above $50.',
    },
    {
      id: 2,
      title: 'Custom Orders',
      description: 'We provide custom flower arrangements tailored to your needs.',
    },
    {
      id: 3,
      title: 'Gift Wrapping',
      description: 'We offer beautiful gift wrapping for all our flower arrangements.',
    },
  ];

  return (
    <div className="service-container">
      <h1>Our Services</h1>
      
      <div className="service-list">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
