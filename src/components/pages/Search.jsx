import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Card from '../commonfiles/Card';

const Search = () => {
  const [searchParams] = useSearchParams();
  const categoryQuery = searchParams.get('category')?.trim().toLowerCase() || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!categoryQuery) {
      setResults([]);
      return;
    }

    setLoading(true);

    fetch(`/api/products?category=${encodeURIComponent(categoryQuery)}`)
      .then(res => res.json())
      .then(data => {
        setResults(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setResults([]);
        setLoading(false);
      });
  }, [categoryQuery]);

  return (
    <div className="new_collections">
      {categoryQuery && <h1>Search results for '{categoryQuery}'</h1>}

      <div className="collections">
        {loading ? (
          <p>Loading...</p>
        ) : results.length === 0 ? (
          <p>No products found for '{categoryQuery}'</p>
        ) : (
          results.map(card => (
            <Card
              key={card._id || card.id}
              id={card._id || card.id}
              name={card.name}
              img={card.img}
              new_price={card.new_price}
              old_price={card.old_price}
              description={card.description}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Search;
