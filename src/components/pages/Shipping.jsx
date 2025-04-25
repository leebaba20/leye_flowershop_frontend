import React, { useState, useEffect } from 'react';
import { PaystackButton } from 'react-paystack';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Shipping.css'; // Make sure this is imported

const Shipping = () => {
  const [form, setForm] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const saved = localStorage.getItem('shipping');
    if (saved) setForm(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('shipping', JSON.stringify(form));
  }, [form]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.address.trim()) errs.address = 'Address is required';
    if (!form.city.trim()) errs.city = 'City is required';
    if (!form.postalCode.trim()) errs.postalCode = 'Postal code is required';
    if (!form.country.trim()) errs.country = 'Country is required';
    return errs;
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.qty * item.new_price,
    0
  ) * 100;

  const config = {
    reference: new Date().getTime().toString(),
    email: 'ashuaib1991@gmai.com',
    amount: totalAmount,
    publicKey: 'pk_test_99d8f5a23465707c659bcd34e4658cd6acddaffe'
  };

  const componentProps = {
    ...config,
    text: 'Pay Now',
    onSuccess: () => {
      clearCart();
      localStorage.setItem('orderComplete', JSON.stringify({ cartItems, Shipping: form }));
      toast.success('Payment successful! Redirecting...', {
        autoClose: 2000,
        onClose: () => navigate('/success')
      });
    },
    onClose: () => toast.info('Payment popup closed.')
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    const valid = Object.keys(validationErrors).length === 0;
    setIsFormValid(valid);
    if (!valid) toast.error('Please fix the errors before proceeding.');
  };

  return (
    <div className='shipping-container'>
      <ToastContainer />
      <h2 className='mb-4 text-center'>Shipping Details</h2>
      <form className='row justify-content-center' noValidate onSubmit={handleSubmit}>
        <div className='col-md-8 col-lg-6'>

          <div className='mb-3'>
            <label className='form-label'>Full Name</label>
            <input
              type='text'
              name='name'
              value={form.name}
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              onChange={handleChange}
            />
            {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
          </div>

          <div className='mb-3'>
            <label className='form-label'>Address</label>
            <input
              type='text'
              name='address'
              value={form.address}
              className={`form-control ${errors.address ? 'is-invalid' : ''}`}
              onChange={handleChange}
            />
            {errors.address && <div className='invalid-feedback'>{errors.address}</div>}
          </div>

          <div className='mb-3'>
            <label className='form-label'>City</label>
            <input
              type='text'
              name='city'
              value={form.city}
              className={`form-control ${errors.city ? 'is-invalid' : ''}`}
              onChange={handleChange}
            />
            {errors.city && <div className='invalid-feedback'>{errors.city}</div>}
          </div>

          <div className='mb-3'>
            <label className='form-label'>Postal Code</label>
            <input
              type='text'
              name='postalCode'
              value={form.postalCode}
              className={`form-control ${errors.postalCode ? 'is-invalid' : ''}`}
              onChange={handleChange}
            />
            {errors.postalCode && <div className='invalid-feedback'>{errors.postalCode}</div>}
          </div>

          <div className='mb-3'>
            <label className='form-label'>Country</label>
            <input
              type='text'
              name='country'
              value={form.country}
              className={`form-control ${errors.country ? 'is-invalid' : ''}`}
              onChange={handleChange}
            />
            {errors.country && <div className='invalid-feedback'>{errors.country}</div>}
          </div>

          {isFormValid ? (
            <PaystackButton className='btn btn-success w-100' {...componentProps} />
          ) : (
            <button type='submit' className='btn btn-primary w-100'>Proceed to Payment</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Shipping;
