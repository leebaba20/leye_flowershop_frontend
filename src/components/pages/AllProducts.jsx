import React, { useState, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Card from '../commonfiles/Card';
import allProducts from '../../assets/AllProductData'; // Corrected import
import { UserContext } from '../../context/UserContext';
import { FaSearch } from 'react-icons/fa';
import './allproducts.css';

const AllProducts = ({ showLimited = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useContext(UserContext);
  const location = useLocation();
  const isHomepage = location.pathname === '/';

  // DEBUG logs
  console.log('✅ Loaded products:', allProducts);
  console.log('🔍 Current search term:', searchTerm);

  // Filter products based on search
  const filteredProducts = searchTerm
    ? allProducts.filter((item) => {
        const lowerSearch = searchTerm.toLowerCase();
        return (
          item.name.toLowerCase().includes(lowerSearch) ||
          (item.description && item.description.toLowerCase().includes(lowerSearch)) ||
          (Array.isArray(item.category) &&
            item.category.some((cat) => cat.toLowerCase().includes(lowerSearch)))
        );
      })
    : allProducts;

  console.log('🔎 Filtered products:', filteredProducts);

  const productsToDisplay = isHomepage
    ? filteredProducts.slice(0, 4)
    : showLimited
    ? filteredProducts.slice(0, 8)
    : filteredProducts;

  return (
    <section className="allproducts-wrapper">
      <div className="allproducts-container">
        <div className="new_collections">
          <h1 className="explore-heading">
            {user?.username
              ? `Welcome back, ${user.username} 🌸`
              : showLimited || isHomepage
              ? 'Explore More...'
              : 'All Products'}
          </h1>

          <p className="description-text">
            Discover all our latest products and bestsellers in one place.
          </p>

          <form className="search-form" onSubmit={(e) => e.preventDefault()}>
            <div className="search-input-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search for flowers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
              />
            </div>
          </form>

          <div className="all-products-grid">
            {productsToDisplay.length > 0 ? (
              productsToDisplay.map((card) => (
                <Card
                  key={card.id}
                  id={card.id}
                  name={card.name}
                  img={card.img || card.image} // fallback image support
                  new_price={card.new_price}
                  old_price={card.old_price}
                  description={card.description}
                />
              ))
            ) : (
              <p>No products found for '{searchTerm}'</p>
            )}
          </div>

          {(showLimited || isHomepage) && (
            <div className="view-more-container">
              <Link to="/all-products" className="view-more-button">
                Show More →
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllProducts;
