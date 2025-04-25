import React, { useState, useContext } from 'react';
import Card from '../commonfiles/Card'; // Import your Card component
import Products from '../../assets/products'; // Ensure this path and data are correct
import { Link } from 'react-router-dom'; // Import Link for redirection
import './Bestseller.css';
import { UserContext } from '../../context/UserContext';

const Bestseller = () => {
  const [searchTerm, setSearchTerm] = useState(''); // For search functionality

  const { user } = useContext(UserContext);  // Get logged-in user from context

  const limitedBestsellers = Products.slice(0, 4); // Limit to 4 items

  const filteredBestsellers = limitedBestsellers.filter(item => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(lowerSearch) ||
      item.category?.some(cat => cat.toLowerCase().includes(lowerSearch)) ||
      (item.description && item.description.toLowerCase().includes(lowerSearch))
    );
  });

  return (
    <div className="new_collections bestseller">
      {/* Display logged-in user's name or generic greeting */}
      {user ? (
        <h1>Welcome back, {user.name} 🌸</h1> // Display logged-in user's name
      ) : (
        <h1>Top Rated Picks</h1>
      )}
      <p>Curated by our shoppers. Trusted, loved, and re-ordered continuously.</p>

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

      <div className="collections">
        {filteredBestsellers.length > 0 ? (
          filteredBestsellers.map((card) => (
            <Card
              key={card.id} // Use card.id for a unique key
              id={card.id}
              name={card.name}
              img={card.img}
              new_price={card.new_price}
              old_price={card.old_price}
              description={card.description} // Pass description to Card
            />
          ))
        ) : (
          <p>No bestsellers found for '{searchTerm}'</p>
        )}
      </div>

      <div className="view-more-container">
        <Link to="/bestsellers" className="view-more-button">
          Show More
        </Link>
      </div>
    </div>
  );
};

export default Bestseller;
