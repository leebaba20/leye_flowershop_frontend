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
    <form
      onSubmit={handleSearch}
      className="search-bar d-flex align-items-center gap-2 my-3"
      role="search"
      aria-label="Search for products"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products or categories..."
        className="form-control rounded-pill px-3 py-2"
        aria-label="Search input"
        disabled={false}
      />
      <button
        type="submit"
        className="btn btn-dark rounded-pill px-4 py-2"
        disabled={!query.trim()}
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
