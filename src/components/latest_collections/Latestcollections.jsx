import React, { useState, useContext } from 'react';
import Card from '../commonfiles/Card'; // Import the Card component
import latest_collections from '../../assets/New_collections'; // Ensure the mock data is correctly imported
import { Link } from 'react-router-dom'; // Import Link for redirection
import './latestcollections.css';
import { UserContext } from '../../context/UserContext'; // Import UserContext

const Latestcollections = () => {
  const [searchTerm, setSearchTerm] = useState(''); // For search functionality

  const { user } = useContext(UserContext);  // Get logged-in user from context

  const limitedCollections = latest_collections.slice(0, 4); // Limit to 4 items

  const filteredCollections = limitedCollections.filter(item => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(lowerSearch) ||
      item.category?.some(cat => cat.toLowerCase().includes(lowerSearch)) ||
      (item.description && item.description.toLowerCase().includes(lowerSearch))
    );
  });

  return (
    <div className="new_collections">
      {user ? (
        <h1>Welcome back, {user.name} 🌹</h1>  // Display logged-in user's name
      ) : (
        <h1>Latest Collections 🌹🌺💐</h1>
      )}
      <p>Explore our latest collection of flowers across all varieties</p>
      <hr />
      
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
        {filteredCollections.length > 0 ? (
          filteredCollections.map((card) => (
            <Card
              key={card.id} // Use the card ID as the key
              id={card.id}
              name={card.name}
              img={card.img}
              new_price={card.new_price}
              old_price={card.old_price}
              description={card.description} // Pass the description as well
            />
          ))
        ) : (
          <p>No collections found for '{searchTerm}'</p>
        )}
      </div>

      <div className="view-more-container">
        <Link to="/latest-collections" className="view-more-button">
          Show More
        </Link>
      </div>
    </div>
  );
};

export default Latestcollections;
