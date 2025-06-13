import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useUser } from '../../hooks/useUser';
import { saveShippingInfo, initializePayment } from '../../utils/Api';
import { toast } from 'react-toastify';
import './shipping.css';

const Shipping = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useUser();
  const { cart } = useCart();

  const defaultForm = {
    fullName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phoneNumber: '',
  };
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const toSnake = (obj) => ({
    full_name: obj.fullName,
    address: obj.address,
    city: obj.city,
    state: obj.state,
    postal_code: obj.postalCode,
    country: obj.country,
    phone_number: obj.phoneNumber,
  });

  const total = cart.reduce(
    (sum, item) => sum + Number(item.new_price) * Number(item.quantity),
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return toast.info('Loading user...');

    if (!user?.email) {
      toast.error('Please log in first.');
      return navigate('/login');
    }

    if (cart.length === 0) {
      toast.error('Cart is empty.');
      return navigate('/');
    }

    if (
      !form.fullName ||
      !form.address ||
      !form.city ||
      !form.state ||
      !form.postalCode ||
      !form.country
    ) {
      return toast.error('Please fill all required fields.');
    }

    const proceed = window.confirm(
      `Confirm shipping:\n${form.fullName}, ${form.address}, ${form.city}, ${form.state}, ${form.postalCode}, ${form.country}\nProceed to payment?`
    );

    if (!proceed) return;

    setLoading(true);

    try {
      await saveShippingInfo(toSnake(form));

      if (total <= 0 || isNaN(total))
        throw new Error('Invalid cart total.');

      const { authorization_url } = await initializePayment({
        email: user.email,
        amount: total, // ✅ No multiplication here
        metadata: { shipping: toSnake(form), cart },
      });

      if (!authorization_url)
        throw new Error('No pay link received.');

      window.location.href = authorization_url;
    } catch (err) {
      console.error(err);
      toast.error(
        err.error ||
          err.detail ||
          err.message ||
          'Payment initiation failed.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shipping-container">
      <h2>Shipping Information</h2>
      <form onSubmit={handleSubmit}>
        {[
          ['fullName', 'Full Name'],
          ['address', 'Address'],
          ['city', 'City'],
          ['state', 'State'],
          ['postalCode', 'Postal Code'],
          ['country', 'Country'],
        ].map(([key, label]) => (
          <div key={key} className="mb-3">
            <label>{label}</label>
            <input
              name={key}
              value={form[key]}
              onChange={handleChange}
              className="form-control"
              required
              disabled={loading}
            />
          </div>
        ))}
        <div className="mb-3">
          <label>Phone Number</label>
          <input
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            className="form-control"
            disabled={loading}
          />
        </div>

        <button className="btn btn-primary" disabled={loading}>
          {loading
            ? 'Processing…'
            : `Pay ₦${total.toLocaleString()} Now`}
        </button>
      </form>
    </div>
  );
};

export default Shipping;
