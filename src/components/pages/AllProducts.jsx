import React, { useState, useContext } from 'react';
import Card from '../commonfiles/Card';
import Products from '../../assets/products';
import latest_collections from '../../assets/New_collections';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext'; // Import UserContext
import './AllProducts.css';

const AllProducts = ({ showLimited = false }) => {
  const [searchTerm, setSearchTerm] = useState(''); // For search functionality
  const { user } = useContext(UserContext);  // Get logged-in user from context

  const allProducts = [...Products, ...latest_collections];  // Combine both product lists

  // Filter products based on search term
  const filteredProducts = allProducts.filter((item) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(lowerSearch) ||
      (item.category && item.category.some((cat) => cat.toLowerCase().includes(lowerSearch))) ||
      (item.description && item.description.toLowerCase().includes(lowerSearch))
    );
  });

  // Limiting products to display if needed
  const productsToDisplay = showLimited ? filteredProducts.slice(0, 8) : filteredProducts;

  return (
    <div className="new_collections all-products">
      {user ? (
        <h1>Welcome back, {user.name} 🌸</h1>
      ) : (
        <h1>{showLimited ? 'Explore More' : 'All Products'}</h1>
      )}
      <p>Discover all our latest products and bestsellers in one place.</p>

      {/* Search Form */}
      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search for flowers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </form>

      {/* Display products */}
      <div className="collections">
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

      {/* Show More button */}
      {showLimited && (
        <div className="view-more-container">
          <Link to="/all-products" className="view-more-button">
            Show More
          </Link>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
