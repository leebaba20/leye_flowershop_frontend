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
          setResults(data);
          setNotFound(data.length === 0);
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
    <div className="container py-5">
      <h2 className="mb-4 fw-bold text-center">
        Results for: <span className="text-danger">"{query}"</span>
      </h2>

      {loading && <p className="text-center">Loading...</p>}
      {!loading && notFound && (
        <p className="text-center text-muted">No products found matching your search.</p>
      )}

      {!loading && results.length > 0 && (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {results.map((product) => (
            <div key={product.id} className="col">
              <div className="card h-100 shadow-sm">
                <img
                  src={product.image}
                  alt={product.name}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="text-success fw-bold">₦{Number(product.price).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
