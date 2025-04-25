import React from "react";
import { useCart } from '../../hooks/UseCart'
import { Link } from "react-router-dom";
import "./cart.css";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleClearCart = () => {
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your Cart is Empty</h2>
        <Link to="/" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.img} alt={item.name} className="cart-item-img" />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>Price: ${item.new_price.toFixed(2)}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total: ${(item.new_price * item.quantity).toFixed(2)}</p>
            </div>
            <button
              className="remove-item-btn"
              onClick={() => handleRemoveItem(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <h3>
          Total: $
          {cart
            .reduce((acc, item) => acc + item.new_price * item.quantity, 0)
            .toFixed(2)}
        </h3>
      </div>
      <div className="cart-actions">
        <button className="btn-clear" onClick={handleClearCart}>
          Clear Cart
        </button>
        <Link to="/checkout" className="btn-primary">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
