import React from 'react';
import Card from '../commonfiles/Card'; // Import your Card component
import Products from '../../assets/products'; // Ensure this path and data are correct
import './Bestseller.css';

const Bestseller = () => {
  return (
    <div className="new_collections bestseller">
      <h1>Top Rated Picks</h1>
      <p>Curated by our shoppers. Trusted, loved, and re-ordered continuously.</p>

      <div className="collections">
        {Products.map((card) => (
          <Card
            key={card.id} // Use card.id for a unique key
            id={card.id}
            name={card.name}
            img={card.img}
            new_price={card.new_price}
            old_price={card.old_price}
            description={card.description} // Pass description to Card
          />
        ))}
      </div>
    </div>
  );
};

export default Bestseller;
