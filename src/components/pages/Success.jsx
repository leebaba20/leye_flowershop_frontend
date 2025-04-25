import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Success.css';

const Success = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const data = localStorage.getItem('orderComplete');
    if (data) {
      setOrder(JSON.parse(data));
      toast.success('🎉 Order completed successfully!', {
        className: 'custom-toast',
        bodyClassName: 'custom-toast-body',
        progressClassName: 'custom-toast-progress',
      });
      localStorage.removeItem('orderComplete');
      localStorage.removeItem('shipping');
    }
  }, []);

  if (!order) {
    return <h3 className='text-center mt-5'>Loading your order...</h3>;
  }

  const total = order.cartItems.reduce(
    (sum, item) => sum + item.new_price * (item.quantity || 1),
    0
  );

  return (
    <div className='container py-5 success-page'>
      <ToastContainer position="top-center" autoClose={3000} theme="light" />

      <h2 className='text-center text-success mb-4'>🎉 Payment Successful!</h2>
      <p className='text-center'>
        Thank you for your order, <strong>{order.Shipping?.name || 'Customer'}</strong>!
      </p>

      <div className='mt-5'>
        <h5>📦 Shipping Details</h5>
        <ul className='list-unstyled'>
          <li><strong>Address:</strong> {order.Shipping?.address}</li>
          <li><strong>City:</strong> {order.Shipping?.city}</li>
          <li><strong>Postal Code:</strong> {order.Shipping?.postalCode}</li>
          <li><strong>Country:</strong> {order.Shipping?.country}</li>
        </ul>
      </div>

      <div className='mt-4'>
        <h5>🛍️ Order Summary</h5>
        {order.cartItems.map(item => (
          <div key={item.id} className='border-bottom py-2'>
            <strong>{item.name}</strong> × {item.quantity || 1} — ${item.new_price.toFixed(2)} each
          </div>
        ))}
        <div className='mt-3 fw-bold'>
          Total: ${total.toFixed(2)}
        </div>
      </div>

      <div className='text-center mt-5'>
        <Link to='/' className='btn btn-outline-primary'>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Success;
