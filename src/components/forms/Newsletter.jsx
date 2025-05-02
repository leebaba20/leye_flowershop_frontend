import { subscribeToNewsletter } from '../../utils/Api'; // Import the API function for subscribing to the newsletter
import { useState } from 'react';

const Newsletter = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages

    try {
      const response = await subscribeToNewsletter(email);

      if (response.message === "Subscription successful!") {
        setSubscribed(true); // Set the subscription status
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Subscription failed.'); // Display error message
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
                      onChange={(e) => setEmail(e.target.value)} // Bind the email input field
                      required
                    />
                  </div>
                  <div className="col-12 col-sm-4">
                    <button type='submit' className='btn btn-primary w-100'>
                      Subscribe
                    </button>
                  </div>
                </form>
              )}

              {errorMessage && (
                <div className="error-message text-danger mt-3">
                  <p>{errorMessage}</p> {/* Display error message */}
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
