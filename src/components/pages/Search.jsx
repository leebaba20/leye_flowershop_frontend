import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Products from '../../assets/products';
import Card from '../commonfiles/Card';

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryQuery = searchParams.get('category')?.toLowerCase() || '';
  const [result, setResult] = useState([]);

  useEffect(() => {
    const filtered = Products.filter((item) => item.category.toLowerCase() === categoryQuery);

    if (filtered.length === 0) {
      navigate('/');
    } else {
      setResult(filtered);
    }
  }, [categoryQuery, navigate]);

  return (
    <div>
      {result.map((product) => (
        <Card key={product.id} {...product} />
      ))}
    </div>
  );
};

export default Search;