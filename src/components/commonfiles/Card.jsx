// src/components/Card.jsx
import React from 'react';
import { useCart } from '../../hooks/useCart'; // Import the custom hook for cart functionality
import { Link } from 'react-router-dom';
import './card.css';

const Card = ({ id, name, img, new_price, old_price, description }) => {
  const { addToCart } = useCart();

  // Handle adding product to the cart
  const handleAddToCart = () => {
    const product = { id, name, img, new_price, old_price, description };
    addToCart(product);
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
          <span className="item-price-new">{new_price ? `₦${new_price}` : 'N/A'}</span>
          {old_price && <span className="item-price-old">{old_price && `₦${old_price}`}</span>}
        </div>
        <p className="item-description">{productDescription}</p>
        <button className="add-to-cart" onClick={handleAddToCart}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Card;
