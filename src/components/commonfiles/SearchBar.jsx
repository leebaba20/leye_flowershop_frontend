import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim().toLowerCase();

    console.log("Search query:", trimmedQuery);

    if (trimmedQuery) {
      navigate(`/search?category=${encodeURIComponent(trimmedQuery)}`);
    } else {
      console.log("Search query is empty, not navigating.");
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-bar" role="search" aria-label="Search form">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by category..."
        className="search-input"
        aria-label="Search category"
      />
      <button type="submit" className="search-button">Search</button>
    </form>
  );
};

export default SearchBar;
