import React, { useState, useEffect } from 'react';
import './Bestseller.css';
import Card from '../commonfiles/Card'; // Import your Card component
import latest_collections from '../../assets/New_collections'; // Mock API for latest collections

const Bestseller = () => {
  const [bestsellers, setBestsellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch bestsellers (can be similar to how you fetch latest collections)
  const fetchBestsellers = async () => {
    try {
      setLoading(true);
      setError(null); // Reset any previous errors
      // Simulating the API call (replace this with your actual API call)
      const data = latest_collections;  // Assuming 'latest_collections' has the bestsellers data
      setBestsellers(data); // Set fetched data to state
    } catch (err) {
      setError('Failed to fetch bestsellers');
      console.error('Error fetching bestsellers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBestsellers(); // Fetch data when the component mounts
  }, []); // Empty dependency array ensures it only runs once

  // Filter bestsellers based on search term
  const filteredBestsellers = bestsellers.filter(item => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(lowerSearch) ||
      (item.category && item.category.some(cat => cat.toLowerCase().includes(lowerSearch))) ||
      (item.description && item.description.toLowerCase().includes(lowerSearch))
    );
  });

  // Limit to first 4 cards
  const displayedBestsellers = filteredBestsellers.slice(0, 4);

  return (
    <div className="new_collections bestseller">
      <h1>Top Rated Picks</h1>
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

      {/* Display loading or error messages */}
      {loading && <p>Loading bestsellers...</p>}
      {error && <p>{error}</p>}

      {/* Display Bestsellers */}
      <div className="collections">
        {displayedBestsellers.length > 0 ? (
          displayedBestsellers.map((card) => (
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
          <p>No bestsellers found for '{searchTerm}'</p>
        )}
      </div>

      <div className="view-more-container">
        <a href="/bestsellers" className="view-more-button">
          Show More
        </a>
      </div>
    </div>
  );
};

export default Bestseller;
