import React, { useState } from 'react';
import { subscribeNewsletter } from '../../utils/Api';
import { toast } from 'react-toastify';


const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address.');
      }

      const res = await subscribeNewsletter(email);
      toast.success(res.message || '🎉 Subscribed successfully!');
      setEmail('');
    } catch (error) {
      toast.error(
        error?.detail || error?.message || '❌ Subscription failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="newsletter-container">
      <h2>Subscribe to Our Newsletter</h2>
      <p>Get the latest flower updates, promotions, and deals!</p>

      <form onSubmit={handleSubmit} className="newsletter-form">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
