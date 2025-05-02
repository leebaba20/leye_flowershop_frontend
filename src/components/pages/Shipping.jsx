import React, { useState, useEffect } from 'react';
import { useCart } from '../../hooks/useCart';
import UseUser from '../../hooks/useUser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { initializePayment } from '../../../Api';
import './shipping.css';

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
  const [loading, setLoading] = useState(false);

  const { cart } = useCart();
  const { user } = UseUser();  // Retrieve user information
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    if (!form.city.trim()) newErrors.city = 'City is required';
    if (!form.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    if (!form.country.trim()) newErrors.country = 'Country is required';
    return newErrors;
  };

  useEffect(() => {
    if (cart.length === 0) {
      toast.warn('Your cart is empty. Redirecting...');
      navigate('/cart');
    }
  }, [cart, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const savedForm = localStorage.getItem('shipping');
    if (savedForm) {
      setForm(JSON.parse(savedForm));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('shipping', JSON.stringify(form));
  }, [form]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const totalAmountUSD = cart.reduce(
    (acc, item) => acc + item.quantity * item.new_price,
    0
  );

  // const totalAmountNGN = Math.round(totalAmountUSD * 1500 * 100); // In kobo for Paystack

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validationErrors = validate();
    setErrors(validationErrors);
    const valid = Object.keys(validationErrors).length === 0;
    setIsFormValid(valid);
  
    if (!valid) {
      toast.error('Please fix the errors before proceeding.');
      return;
    }
  
    setLoading(true);
  
    try {
      const paymentData = {
        email: user?.email || 'princeleeoye@gmail.com',
        amount: totalAmountUSD, // ✅ Send in USD (e.g., 35.5)
        shippingDetails: form,
      };
      const response = await initializePayment(paymentData);
  
      const { authorization_url } = response;
      window.location.href = authorization_url;
    } catch (error) {
      toast.error('Error initializing payment. Please try again.');
      console.error('Payment initialization failed:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="shipping-container">
      <ToastContainer />
      <h2 className="mb-4 text-center">Shipping Details</h2>

      <form className="row justify-content-center" noValidate onSubmit={handleSubmit}>
        <div className="col-md-8 col-lg-6">
          {["name", "address", "city", "postalCode", "country"].map((field) => (
            <div key={field} className="mb-3">
              <label htmlFor={field} className="form-label">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                id={field}
                name={field}
                value={form[field]}
                onChange={handleChange}
                className={`form-control ₦{errors[field] ? 'is-invalid' : ''}`}
                disabled={loading}
              />
              {errors[field] && <div className="invalid-feedback">{errors[field]}</div>}
            </div>
          ))}

          <div className="mb-3 text-end fw-bold">
            Total Amount (USD): ₦{totalAmountUSD.toFixed(2)}
          </div>

          <Button
            type="submit"
            className={`btn w-100 ₦{isFormValid ? 'btn-success' : 'btn-primary'}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Processing...
              </>
            ) : (
              'Proceed to Payment'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Shipping;
