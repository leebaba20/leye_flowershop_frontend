import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchProducts } from '../../utils/Api';
import './search.css';

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';
  const [results, setResults] = useState(location.state?.results || []);
  const [loading, setLoading] = useState(!location.state?.results);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!results.length && query) {
        try {
          const data = await searchProducts(query);
          if (data.length === 0) setNotFound(true);
          setResults(data);
        } catch {
          setNotFound(true);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Results for: "{query}"</h2>

      {loading && <p>Loading...</p>}
      {!loading && notFound && <p>No products found.</p>}

      {!loading && results.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {results.map(product => (
            <div key={product.id} className="border p-3 rounded shadow">
              <h3 className="font-semibold">{product.name}</h3>
             <p className="text-green-700 font-bold">₦{product.new_price}</p>
              </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
