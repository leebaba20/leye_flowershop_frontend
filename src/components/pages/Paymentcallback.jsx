// src/components/pages/PaymentCallback.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API } from '../../utils/Api';
import './paymentcallback.css';

const PaymentCallback = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const reference = query.get('reference');

    if (!reference) {
      setStatus('failed');
      setMessage('No payment reference found.');
      setLoading(false);
      return;
    }

    const verifyPayment = async () => {
      try {
        // Make sure you send the auth token if needed
        const token = localStorage.getItem('access_token');
const response = await API.get(`/api/verify-payment?reference=${reference}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

    if (response?.data?.status === 'success') {
          setStatus('success');
          setMessage('🎉 Payment verified successfully! Thank you for your purchase.');

          // Auto redirect to orders page after 5 seconds
          setTimeout(() => navigate('/orders'), 5000);
        } else {
          setStatus('failed');
          setMessage(response.data?.message || 'Payment verification failed.');
        }
      } catch (error) {
        setStatus('failed');
        setMessage(error.response?.data?.message || 'An error occurred during verification.');
        console.error('Payment verification error:', error);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [navigate]);

  return (
    <div className="payment-callback-wrapper">
      <ToastContainer />
      {loading ? (
        <div className="callback-loader">
          <div className="spinner"></div>
          <p>Verifying your payment, please wait...</p>
        </div>
      ) : (
        <div className={`callback-result ${status}`}>
          <h2>{status === 'success' ? '✅ Payment Successful' : '❌ Payment Failed'}</h2>
          <p>{message}</p>
          <div className="callback-buttons">
            {status === 'success' ? (
              <>
                <button onClick={() => navigate('/')} className="btn-primary">
                  Go to Home
                </button>
                <button onClick={() => navigate('/orders')} className="btn-secondary">
                  View Orders
                </button>
              </>
            ) : (
              <>
                <button onClick={() => navigate('/shipping')} className="btn-primary">
                  Try Again
                </button>
                <button onClick={() => navigate('/')} className="btn-secondary">
                  Go to Home
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentCallback;
