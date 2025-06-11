import React, { memo, useCallback } from 'react';
import { useCart } from '../../hooks/useCart';
import { Link } from 'react-router-dom';
import './card.css';
import { toast } from 'react-toastify';
import defaultImage from '../../assets/image/pinkflower.jpg';

const Card = memo(({ id, name, img, new_price, old_price, description, descriptionClassName }) => {
  const { addToCart } = useCart();

  const formatPrice = (price) => {
    return price ? `₦${parseFloat(price).toLocaleString()}` : 'N/A';
  };

  const handleAddToCart = useCallback(() => {
    const product = { id, name, img, new_price, old_price, description };
    addToCart(product);
    toast.success('Item added to cart');
  }, [id, name, img, new_price, old_price, description, addToCart]);

  const imageSrc = img || defaultImage;
  const productDescription = description || 'No description available';

  return (
    <div className="item card">
      <Link to={`/product/${id}`}>
        <img
          src={imageSrc}
          alt={name}
          className="product-img"
          loading="lazy"
        />
      </Link>

      <div className="item-details card-content">
        <h3 className="item-title">{name}</h3>

        <div className="item-prices">
          <span className="item-price-new">{formatPrice(new_price)}</span>
          {old_price && (
            <span className="item-price-old">{formatPrice(old_price)}</span>
          )}
        </div>

        <p className={`item-description ${descriptionClassName || ''}`}>
          {productDescription}
        </p>

        <button
          className="add-to-cart"
          onClick={handleAddToCart}
          aria-label={`Add ${name} to cart`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
});

export default Card;
