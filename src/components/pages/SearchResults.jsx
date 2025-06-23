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
    const query = params.get('q')?.toLowerCase().trim();

    if (!query) {
      setResults([]);
      return;
    }

    const filtered = allProducts.filter(product =>
      product.name.toLowerCase().includes(query) ||
      (product.description && product.description.toLowerCase().includes(query)) ||
      (Array.isArray(product.category) &&
        product.category.some(cat => cat.toLowerCase().includes(query)))
    );

    setResults(filtered);
  }, [location.search]);

  return (
    <div className="search-results container py-4">
      <h2>Search Results</h2>
      {results.length > 0 ? (
        <div className="row">
          {results.map(product => (
            <div key={product.id} className="col-md-4 mb-3">
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
