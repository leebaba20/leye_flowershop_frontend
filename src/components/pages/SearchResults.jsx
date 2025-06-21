import React from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../commonfiles/Card';
import './searchResults.css'; 

const SearchResults = () => {
  const location = useLocation();
  const results = location.state?.results || [];

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
