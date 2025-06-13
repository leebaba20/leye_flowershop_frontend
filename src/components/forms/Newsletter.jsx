import { useState } from 'react';
import { subscribeNewsletter } from '../../utils/Api';

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

      await subscribeNewsletter(email);
      setSubscribed(true);
      setEmail('');
    } catch (error) {
      console.error('Newsletter error:', error);

      let message = 'Subscription failed. Try again.';

      if (error?.email && Array.isArray(error.email)) {
        message = error.email[0];
      } else if (typeof error?.detail === 'string') {
        message = error.detail;
      } else if (typeof error === 'string') {
        message = error;
      } else if (error?.message) {
        message = error.message;
      }

      setErrorMessage(message);
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
              <p className="mb-4 text-muted">
                Stay in touch with our latest news and offers
              </p>

              {subscribed ? (
                <div className="thank-you-message text-center">
                  <h3 className="text-success fw-bold">Thank you for subscribing! 🌸</h3>
                  <p className="mt-2 text-muted">
                    You’re now part of the Leye Flower Shop family. Watch out for exclusive offers,
                    fresh collections, and floral inspirations — straight to your inbox!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="row g-2">
                  <div className="col-12 col-sm-8">
                    <input
                      type="email"
                      className="form-control form-control-lg rounded-pill shadow-sm"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="col-12 col-sm-4">
                    <button
                      type="submit"
                      className="btn btn-lg w-100 rounded-pill shadow-sm"
                      style={{
                        backgroundColor: '#100c1f',
                        color: '#fff',
                        border: 'none',
                      }}
                      disabled={loading}
                    >
                      {loading ? 'Subscribing...' : 'Subscribe ✉️'}
                    </button>
                  </div>
                </form>
              )}

              {errorMessage && (
                <div className="text-danger mt-3 fw-semibold">
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
