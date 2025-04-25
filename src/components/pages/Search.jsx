import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Products from '../../assets/products';
import latest_collections from '../../assets/New_collections';
import Card from '../commonfiles/Card';

const Search = () => {
  const [searchParams] = useSearchParams();
  const categoryQuery = searchParams.get('category')?.trim().toLowerCase() || '';
  const [results, setResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  useEffect(() => {
    console.log('Search query:', categoryQuery);

    if (!categoryQuery) {
      setResults([]);
      setSearchPerformed(false);
      return;
    }

    const matchesCategory = (item) =>
      Array.isArray(item.category) &&
      item.category.some(cat => cat.toLowerCase() === categoryQuery);

    const filteredProducts = [
      ...Products.filter(matchesCategory),
      ...latest_collections.filter(matchesCategory),
    ];

    console.log('Filtered Results:', filteredProducts);

    setResults(filteredProducts);
    setSearchPerformed(true);
  }, [categoryQuery]);

  return (
    <div className="new_collections">
      {searchPerformed && <h1>Search result for '{categoryQuery}'</h1>}

      <div className="collections">
        {!searchPerformed ? (
          <p>Loading...</p>
        ) : results.length === 0 ? (
          <p>No products found for '{categoryQuery}'</p>
        ) : (
          results.map((card) => (
            <Card
              key={card.id}
              id={card.id}
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
