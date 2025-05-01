import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const Success = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Extract the reference from URL query parameters
    const params = new URLSearchParams(location.search);
    const reference = params.get('reference');

    if (!reference) {
      toast.error('⚠️ No payment reference found. Redirecting...');
      setTimeout(() => {
        navigate('/');
      }, 3000);
      return;
    }

    // Call backend to verify payment
    const verifyPayment = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/verify-payment`,
          { reference }
        );

        const { message, data } = response.data;
        if (message === 'Payment successful') {
          setOrder(data);
          toast.success('🎉 Payment successful! Your order is confirmed.', {
            className: 'custom-toast',
            bodyClassName: 'custom-toast-body',
            progressClassName: 'custom-toast-progress',
          });
        } else {
          toast.error('⚠️ Payment verification failed. Please try again.');
          setTimeout(() => {
            navigate('/');
          }, 3000);
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
        toast.error('⚠️ Something went wrong. Please try again.');
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [location.search, navigate]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <ToastContainer />
        <h4>Verifying payment...</h4>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center mt-5">
        <ToastContainer />
        <h4>Payment verification failed. Redirecting...</h4>
      </div>
    );
  }

  const total = order.cartItems.reduce(
    (sum, item) => sum + item.new_price * (item.quantity || 1),
    0
  );

  return (
    <div className="container py-5 success-page">
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />

      <div className="text-center mb-5">
        <h2 className="text-success">🎉 Payment Successful!</h2>
        <p>Thank you, <strong>{order.Shipping?.name || 'Customer'}</strong>! Your order is confirmed.</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4 mb-4 shadow-sm">
            <h5 className="mb-3">📦 Shipping Information</h5>
            <ul className="list-unstyled">
              <li><strong>Address:</strong> {order.Shipping?.address}</li>
              <li><strong>City:</strong> {order.Shipping?.city}</li>
              <li><strong>Postal Code:</strong> {order.Shipping?.postalCode}</li>
              <li><strong>Country:</strong> {order.Shipping?.country}</li>
            </ul>
          </div>

          <div className="card p-4 shadow-sm">
            <h5 className="mb-3">🛒 Order Summary</h5>
            {order.cartItems.map((item) => (
              <div key={item.id} className="d-flex justify-content-between border-bottom py-2">
                <div>{item.name} × {item.quantity || 1}</div>
                <div>${(item.new_price * (item.quantity || 1)).toFixed(2)}</div>
              </div>
            ))}
            <div className="d-flex justify-content-between mt-3 fw-bold">
              <div>Total</div>
              <div>${total.toFixed(2)}</div>
            </div>
          </div>

          <div className="text-center mt-4">
            <Link to="/" className="btn btn-primary">Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
