import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Products from '../../assets/products'; // Import your products data
import latest_collections from '../../assets/New_collections'; // Import the latest collections data
import './productdetails.css';
import { FaStar } from 'react-icons/fa';

const ProductDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the component mounts
  }, []);

  const { id } = useParams(); // Get the product id from the URL
  const navigate = useNavigate();

  // Combine both product datasets and find the product by ID
  const product = [
    ...Products,
    ...latest_collections
  ].find(item => item.id === parseInt(id));

  if (!product) {
    return <h2 className="text-center mt-5">Product not Found</h2>; // Show message if product is not found
  }

  return (
    <div className="product-container">
      <div className="product-row">
        {/* Product Image Section */}
        <div className="product-image-section">
          <img
            src={product.img}
            alt={product.name}
            className="main-img"
          />
          <div className="thumbs">
            <img src={product.img} alt="thumb" className="thumb-img" />
            <img src={product.img} alt="thumb" className="thumb-img" />
          </div>
        </div>

        {/* Product Details Section */}
        <div className="product-details-section">
          <h1 className="product-title">{product.name}</h1>
          <div className="rating">
            {/* Display 5 stars for rating */}
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
          <div className="price-section">
            {/* Show new price and old price */}
            <span className="price-new">${product.new_price.toFixed(2)}</span>
            <span className="price-old">${product.old_price.toFixed(2)}</span>
          </div>
          <p className="description">
            {product.description || 'This is a beautiful product you should have. Buy now!'}
          </p>

          <div className="button-group">
            <button className="btn-primary">Add to Cart</button>
            {/* Go back button */}
            <button className="btn-outline" onClick={() => navigate(-1)}>Go Back</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
