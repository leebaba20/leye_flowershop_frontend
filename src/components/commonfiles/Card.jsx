import React from 'react';
import { useCart } from '../../context/CartContext'; // Import useCart hook to add items to the cart
import { Link } from 'react-router-dom';
import './card.css';

const Card = ({ id, name, img, new_price, old_price, description }) => {
  const { addToCart } = useCart(); // Get the addToCart function from Cart Context

  const handleAddToCart = () => {
    const product = { id, name, img, new_price, old_price, description }; // Create a product object
    addToCart(product); // Add product to cart
  };

  return (
    <div className="item">
      <Link to={`/product/${id}`}>
        <img src={img} alt={name} />
      </Link>
      <div className="item-details">
        <h3 className="item-title">{name}</h3>
        <div className="item-prices">
          <span className="item-price-new">${new_price}</span>
          <span className="item-price-old">${old_price}</span>
        </div>
        <p className="item-description">{description}</p> {/* Show the description here */}
        <button className="add-to-cart" onClick={handleAddToCart}>Add to cart</button>
      </div>
    </div>
  );
};

export default Card;
