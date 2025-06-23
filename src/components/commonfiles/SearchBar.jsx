import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim().toLowerCase();
    if (!trimmedQuery) return;

    navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <form onSubmit={handleSearch} className="search-bar d-flex gap-2 my-3">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="form-control"
      />
      <button type="submit" className="btn btn-dark" disabled={!query.trim()}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
