import React, { useState, useEffect } from 'react';
import { useCart } from '../../hooks/useCart';
import UseUser from '../../hooks/useUser';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { initializePayment } from '../../api/api';
import 'react-toastify/dist/ReactToastify.css';
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
  const [loading, setLoading] = useState(false);

  const { cart } = useCart();
  const { user } = UseUser();
  const navigate = useNavigate();

  // ✅ Validate form input
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    if (!form.city.trim()) newErrors.city = 'City is required';
    if (!form.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    if (!form.country.trim()) newErrors.country = 'Country is required';
    return newErrors;
  };

  // ✅ Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      toast.warn('Your cart is empty. Redirecting...');
      navigate('/cart');
    }
  }, [cart, navigate]);

  // ✅ Load and persist form data in localStorage
  useEffect(() => {
    const savedForm = localStorage.getItem('shipping');
    if (savedForm) setForm(JSON.parse(savedForm));
  }, []);

  useEffect(() => {
    localStorage.setItem('shipping', JSON.stringify(form));
  }, [form]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle payment
  const handlePayment = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      toast.error('Please fix the errors before proceeding.');
      return;
    }

    setLoading(true);

    const totalAmountUSD = cart.reduce(
      (acc, item) => acc + item.quantity * item.new_price,
      0
    );
    const totalInNaira = Math.round(totalAmountUSD * 1400); // Convert to NGN

    const paymentData = {
      email: user?.email || 'princeleeoye@gmail.com',
      amount: totalInNaira,
      shippingDetails: {
        name: form.name,
        address: form.address,
        city: form.city,
        postalCode: form.postalCode,
        country: form.country,
        phone: user?.phone || ''
      }
    };

    try {
      const response = await initializePayment(paymentData);
      console.log('Redirecting to Paystack with URL:', response.authorization_url);
      if (response.authorization_url) {
        window.location.href = response.authorization_url;
      } else {
        toast.error('No authorization URL returned from server.');
      }
    } catch (error) {
      toast.error('Payment initialization failed.');
      console.error('Payment init error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shipping-container">
      <ToastContainer />
      <h2 className="mb-4 text-center">Shipping Details</h2>

      <form className="row justify-content-center" noValidate>
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
                className={`form-control ${errors[field] ? 'is-invalid' : ''}`}
                disabled={loading}
              />
              {errors[field] && (
                <div className="invalid-feedback">{errors[field]}</div>
              )}
            </div>
          ))}

          <div className="mb-3 text-end fw-bold">
            Total Amount (NGN): ₦
            {Math.round(
              cart.reduce((acc, item) => acc + item.quantity * item.new_price, 0) * 1400
            ).toLocaleString()}
          </div>

          <Button
            onClick={handlePayment}
            className="btn w-100 btn-success"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Processing...
              </>
            ) : (
              'Proceed to Paystack'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Shipping;
