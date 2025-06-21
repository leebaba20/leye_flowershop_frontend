import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import allProducts from '../../assets/allProductData';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim().toLowerCase();

    if (!trimmedQuery) return;

    const results = allProducts.filter(product =>
      product.name.toLowerCase().includes(trimmedQuery) ||
      (product.description && product.description.toLowerCase().includes(trimmedQuery)) ||
      (Array.isArray(product.category) &&
        product.category.some(cat => cat.toLowerCase().includes(trimmedQuery)))
    );

    navigate(`/search?q=${encodeURIComponent(query)}`, { state: { results } });
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
