import React from 'react';
import { useCart } from '../../hooks/useCart'; // Import the custom hook for cart functionality
import { Link } from 'react-router-dom';
import './card.css';
import { API } from '../../utils/Api';
import { toast } from 'react-toastify'; // For error handling and notifications

const Card = ({ id, name, img, new_price, old_price, description }) => {
  const { addToCart } = useCart();

  // Format price with commas and Naira symbol (₦)
  const formatPrice = (price) => {
    return price ? `₦${parseFloat(price).toLocaleString()}` : 'N/A';
  };

  // Handle adding product to the cart
  const handleAddToCart = () => {
    const product = { id, name, img, new_price, old_price, description };
    addToCart(product);
  };

  // Handle payment initialization
  const handlePayment = () => {
    if (!new_price) {
      toast.error('Product price is missing. Unable to proceed with payment.');
      return;
    }

    const paymentData = {
      email: 'princeleeoye@gmail.com', // Paystack email added here
      amount: new_price, // Pass the amount (in Naira) to the backend
      shippingDetails: 'Some shipping details', // Optional shipping details (modify as needed)
    };

    // Call the backend API to initialize the payment
    API.post('/api/initialize-payment', paymentData)
      .then((response) => {
        const { authorization_url } = response.data;
        // Redirect to Paystack's payment page
        window.location.href = authorization_url;
      })
      .catch((error) => {
        console.error('Error initializing payment:', error);
        toast.error('Error initializing payment. Please try again.');
      });
  };

  // Add default values in case some props are missing
  const imageSrc = img || '/path/to/default-image.jpg'; // Fallback to default image if img is missing
  const productDescription = description || 'No description available'; // Fallback description

  return (
    <div className="item">
      <Link to={`/product/${id}`}>
        {/* Ensure img is accessible and has a fallback */}
        <img src={imageSrc} alt={name} className="product-img" />
      </Link>
      <div className="item-details">
        <h3 className="item-title">{name}</h3>
        <div className="item-prices">
          {/* Conditionally render prices if they exist */}
          <span className="item-price-new">{new_price ? formatPrice(new_price) : 'N/A'}</span>
          {old_price && <span className="item-price-old">{old_price && formatPrice(old_price)}</span>}
        </div>
        <p className="item-description">{productDescription}</p>
        <button className="add-to-cart" onClick={handleAddToCart}>
          Add to cart
        </button>
        <button className="pay-now" onClick={handlePayment}>
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Card;
