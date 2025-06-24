// src/components/pages/SearchResults.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../commonfiles/Card';
import allProducts from '../../assets/AllProductData';
import './searchresults.css';

const SearchResults = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');

    console.log('🔍 Raw query param:', query);

    if (!query) {
      setResults([]);
      return;
    }

    const trimmedQuery = query.trim().toLowerCase();

    const filtered = allProducts.filter(product =>
      product.name.toLowerCase().includes(trimmedQuery) ||
      (product.description && product.description.toLowerCase().includes(trimmedQuery)) ||
      (
        Array.isArray(product.category)
          ? product.category.some(cat => cat.toLowerCase().includes(trimmedQuery))
          : product.category?.toLowerCase().includes(trimmedQuery)
      )
    );

    console.log('✅ Matched results:', filtered);
    setResults(filtered);
  }, [location.search]);

  return (
    <div className="search-results container py-4">
      <h2>Search Results</h2>
      {results.length > 0 ? (
        <div className="product-grid">
          {results.map(product => (
            <div key={product.id} className="product-card">
              <Card {...product} />
            </div>
          ))}
        </div>
      ) : (
        <p>No matching products found.</p>
      )}
    </div>
  );
};

export default SearchResults;
