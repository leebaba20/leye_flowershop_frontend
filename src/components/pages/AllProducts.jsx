import React, { useState, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Card from '../commonfiles/Card';
import Products from '../../assets/products';
import latest_collections from '../../assets/New_collections';
import { UserContext } from '../../context/UserContext';
import { FaSearch } from 'react-icons/fa';
import './allproducts.css';

const AllProducts = ({ showLimited = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useContext(UserContext);
  const location = useLocation();
  const isHomepage = location.pathname === '/';

  // Merge product arrays and remove duplicates by ID
  const combinedProducts = [...Products, ...latest_collections];
  const uniqueProducts = Array.from(
    new Map(combinedProducts.map((item) => [item.id, item])).values()
  );

  // Filter products by search term
  const filteredProducts = uniqueProducts.filter((item) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(lowerSearch) ||
      (Array.isArray(item.category) &&
        item.category.some((cat) => cat.toLowerCase().includes(lowerSearch))) ||
      (item.description && item.description.toLowerCase().includes(lowerSearch))
    );
  });

  // Determine how many products to show
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
                aria-label="Search flowers"
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
                  img={card.img}
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
