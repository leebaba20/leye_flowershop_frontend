import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchProducts } from '../../utils/Api';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();


    if (!trimmedQuery) {
      console.log("Search query is empty.");
      return;
    }

    try {
      const results = await searchProducts(trimmedQuery);

      // Navigate to search results page with the results in state
      navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`, {
        state: { results }
      });

    } catch (error) {
      console.error("❌ Search API error:", error);
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-bar" role="search" aria-label="Search form">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products or categories..."
        className="search-input"
        aria-label="Search"
      />
      <button type="submit" className="search-button">Search</button>
    </form>
  );
};

export default SearchBar;
