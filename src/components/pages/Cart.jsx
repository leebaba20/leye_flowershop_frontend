import React from "react";
import { useCart } from '../../hooks/useCart';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import "./cart.css";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const handleRemoveItem = (id) => {
    removeFromCart(id);
    toast.info('Item removed from cart.');
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('Cart cleared.');
  };

  const calculateTotal = () => {
    return cart?.reduce((acc, item) => {
      const price = Number(item.new_price);
      const quantity = Number(item.quantity);
      const itemTotal = isNaN(price * quantity) ? 0 : price * quantity;
      return acc + itemTotal;
    }, 0) || 0;
  };

  if (!cart?.length) {
    return (
      <div className="empty-cart">
        <br />
        <h2>Your Cart is Empty</h2>
        <Link to="/all-products" className="btn-primary">
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
              <p>Price: ₦{Number(item.new_price).toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total: ₦{(item.new_price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            </div>
            <button
              type="button"
              className="remove-item-btn"
              onClick={() => handleRemoveItem(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-total">
        <h3>Total: ₦{calculateTotal().toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
      </div>

      <div className="cart-actions">
        <button type="button" className="btn-clear" onClick={handleClearCart}>
          Clear Cart
        </button>
        <Link to="/shipping" className="btn-primary">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
