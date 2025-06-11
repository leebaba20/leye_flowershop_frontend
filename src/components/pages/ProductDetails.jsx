import React, { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Products from '../../assets/products';
import latest_collections from '../../assets/New_collections';
import './productdetails.css';
import { FaStar } from 'react-icons/fa';
import { CartContext } from '../../context/CartContextDefinition';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const productId = parseInt(id);
  const product = [...Products, ...latest_collections].find(
    (item) => parseInt(item.id) === productId
  );

  useEffect(() => {
    if (!product) {
      const timeout = setTimeout(() => navigate('/'), 3000);
      return () => clearTimeout(timeout);
    }
  }, [product, navigate]);

  if (!product) {
    return <h2 className="text-center mt-5">Product not Found. Redirecting...</h2>;
  }

  return (
    <div className="product-container">
      <div className="product-row">
        {/* Image Section */}
        <div className="product-image-section">
          <img src={product.img} alt={product.name} className="main-img" />
          <div className="thumbs">
            {[1, 2].map((_, i) => (
              <img
                key={i}
                src={product.img}
                alt={`Thumbnail of ${product.name}`}
                className="thumb-img"
              />
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="product-details-section">
          <h1 className="product-title">{product.name}</h1>

          <div className="rating" aria-label="5 star rating">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>

          <div className="price-section">
            <span className="price-new">₦{(product.new_price ?? 0).toFixed(2)}</span>
            <span className="price-old">₦{(product.old_price ?? 0).toFixed(2)}</span>
          </div>

          <p className="description">
            {product.description || 'This is a beautiful product you should have. Buy now!'}
          </p>

          <div className="button-group">
            <button className="btn-primary" onClick={() => addToCart(product)}>
              Add to Cart
            </button>

            <button className="btn-outline" onClick={() => navigate(-1)}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
