import React, { useState } from 'react';
import { subscribeNewsletter } from '../../utils/Api';
import { toast } from 'react-toastify';

const Newsletter = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address.');
      }

      // Call the actual API function
      await subscribeNewsletter(email);

      setSubscribed(true);
      setEmail('');
      toast.success('You’ve successfully subscribed to our newsletter! 📬');
    } catch (error) {
      const message = error?.detail || error?.message || 'Subscription failed. Try again.';
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 my-5 bg-info">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow rounded-4 p-4 text-center">
            <div className="mb-3">
              <h1>Subscribe to our Newsletter</h1>
              <p className='mb-4 text-muted'>Stay in touch with our latest news and offers</p>

              {subscribed ? (
                <div className="thank-you-message text-center">
                  <h3 className="text-xl font-semibold text-success">
                    Thank you for subscribing! 🌸
                  </h3>
                  <p className="mt-2 text-muted">
                    You’re now part of the Leye Flower Shop family.
                    Watch out for exclusive offers, fresh collections, and floral inspirations — straight to your inbox!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className='row g-2'>
                  <div className="col-12 col-sm-8">
                    <input
                      type="email"
                      className='form-control'
                      placeholder='Enter your Email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="col-12 col-sm-4">
                    <button type='submit' className='btn btn-primary w-100' disabled={loading}>
                      {loading ? 'Subscribing...' : 'Subscribe'}
                    </button>
                  </div>
                </form>
              )}

              {errorMessage && (
                <div className="error-message text-danger mt-3">
                  <p>{errorMessage}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
