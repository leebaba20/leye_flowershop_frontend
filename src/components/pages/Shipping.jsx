import React, { useState, useEffect } from 'react';
import { useCart } from '../../hooks/UseCart'; 
import useUser from '../../hooks/UseUser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Spinner } from 'react-bootstrap'; // Spinner import
import axios from 'axios'; // Import axios
import './Shipping.css';

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
  const [loading, setLoading] = useState(false); // Loading state
  const { cart } = useCart();
  const { user } = useUser();

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

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    if (!form.city.trim()) newErrors.city = 'City is required';
    if (!form.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    if (!form.country.trim()) newErrors.country = 'Country is required';
    return newErrors;
  };

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.quantity * item.new_price,
    0
  ) * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate the form fields
    const validationErrors = validate();
    setErrors(validationErrors);
    const valid = Object.keys(validationErrors).length === 0;
    setIsFormValid(valid);
  
    if (!valid) {
      toast.error('Please fix the errors before proceeding.');
      return;
    }
  
    setLoading(true); // Start loading
  
    try {
      // Send the amount in USD (frontend handles it as dollars)
      const response = await axios.post('/api/initialize-payment', {
        email: user?.email || 'guest@example.com',
        amount: totalAmount, // Total amount is in dollars
      });
  
      const { authorization_url } = response.data;
      window.location.href = authorization_url; // Redirect to Paystack payment page
    } catch (error) {
      toast.error('Error initializing payment. Please try again.');
      console.error('Payment initialization failed:', error);
    } finally {
      setLoading(false); // Stop loading
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
                className={`form-control ${errors[field] ? 'is-invalid' : ''}`}
                disabled={loading} // Disable while loading
              />
              {errors[field] && <div className="invalid-feedback">{errors[field]}</div>}
            </div>
          ))}

          <Button
            type="submit"
            className={`btn w-100 ${isFormValid ? 'btn-success' : 'btn-primary'}`}
            disabled={loading} // Disable while loading
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="mr-2" /> {/* Spinner here */}
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
