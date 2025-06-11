import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../context/UserContext';
import { useCart } from '../../hooks/useCart'; // Add your custom hook
import { API } from '../../utils/Api';

const PaymentSuccess = () => {
  const { user } = useContext(UserContext);
  const { clearCart } = useCart(); // Clear cart after successful payment
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    const params = new URLSearchParams(location.search);
    const reference = params.get('reference');

    if (!reference) {
      toast.error('⚠️ No payment reference found. Redirecting...');
      setTimeout(() => navigate('/'), 3000);
      return;
    }

    if (!user?._id) {
      toast.error('⚠️ You must be logged in to confirm payment. Redirecting...');
      setTimeout(() => navigate('/login'), 3000);
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await API.get(`/api/payments/verify-payment?reference=${reference}`);
        const { status, message, data } = res.data;

        if (status === 'success') {
          setOrder(data);
          clearCart?.(); // Clear cart only on confirmed success
          toast.success('🎉 Payment successful! Your order is confirmed.');
        } else {
          toast.error(`❌ ${message || 'Payment verification failed.'} Redirecting...`);
          setTimeout(() => navigate('/'), 3000);
        }
      } catch (err) {
        console.error('Error verifying payment:', err);
        toast.error('⚠️ Something went wrong. Please try again.');
        setTimeout(() => navigate('/'), 3000);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [location.search, navigate, user, clearCart]);

  // Prevent user from going back to /shipping or /checkout
  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = () => {
      navigate('/', { replace: true });
    };
  }, [navigate]);

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

  const items = Array.isArray(order.cartItems) ? order.cartItems : [];
  const total = items.reduce((sum, item) => sum + (item.new_price ?? 0) * (item.quantity ?? 1), 0);

  return (
    <div className="container py-5 success-page">
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />

      <div className="text-center mb-5">
        <h2 className="text-success">🎉 Payment Successful!</h2>
        <p>
          Thank you, <strong>{order.shipping?.name || 'Customer'}</strong>! Your order has been placed.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4 mb-4 shadow-sm">
            <h5 className="mb-3">📦 Shipping Information</h5>
            <ul className="list-unstyled">
              <li><strong>Address:</strong> {order.shipping?.addressLine1 || '-'}</li>
              {order.shipping?.addressLine2 && <li><strong>Address Line 2:</strong> {order.shipping.addressLine2}</li>}
              <li><strong>City:</strong> {order.shipping?.city || '-'}</li>
              {order.shipping?.state && <li><strong>State:</strong> {order.shipping.state}</li>}
              <li><strong>Postal Code:</strong> {order.shipping?.postalCode || '-'}</li>
              <li><strong>Country:</strong> {order.shipping?.country || '-'}</li>
              {order.shipping?.phone && <li><strong>Phone:</strong> {order.shipping.phone}</li>}
            </ul>
          </div>

          <div className="card p-4 shadow-sm">
            <h5 className="mb-3">🛒 Order Summary</h5>
            {items.map((item) => (
              <div key={item._id || item.id} className="d-flex justify-content-between border-bottom py-2">
                <div>{item.name} × {item.quantity ?? 1}</div>
                <div>₦{((item.new_price ?? 0) * (item.quantity ?? 1)).toFixed(2)}</div>
              </div>
            ))}
            <div className="d-flex justify-content-between mt-3 fw-bold">
              <div>Total</div>
              <div>₦{total.toFixed(2)}</div>
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

export default PaymentSuccess;
