import React, { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Products from '../../assets/products';
import latest_collections from '../../assets/New_collections';
import './productdetails.css';
import { FaStar } from 'react-icons/fa';
import { CartContext } from '../../context/CartContextDefinition';

const ProductDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const product = [...Products, ...latest_collections].find(
    (item) => item.id === parseInt(id)
  );

  if (!product) {
    return <h2 className="text-center mt-5">Product not Found</h2>;
  }

  return (
    <div className="product-container">
      <div className="product-row">
        <div className="product-image-section">
          <img src={product.img} alt={product.name} className="main-img" />
          <div className="thumbs">
            <img src={product.img} alt="thumb" className="thumb-img" />
            <img src={product.img} alt="thumb" className="thumb-img" />
          </div>
        </div>

        <div className="product-details-section">
          <h1 className="product-title">{product.name}</h1>
          <div className="rating">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
          <div className="price-section">
            <span className="price-new">₦{product.new_price.toFixed(2)}</span>
            <span className="price-old">₦{product.old_price.toFixed(2)}</span>
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
