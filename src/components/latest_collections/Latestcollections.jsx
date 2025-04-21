import React from 'react';
import Card from '../commonfiles/Card'; // Import the Card component
import latest_collections from '../../assets/New_collections'; // Ensure the mock data is correctly imported
import './latestcollections.css';

const Latestcollections = () => {
  return (
    <div>
      <div className="new_collections">
        <h1>Latest Collections 🌹🌺💐</h1>
        <p>Explore our latest collection of flowers across all varieties</p>
        <hr />
        <div className="collections">
          {latest_collections.map((card) => (
            <Card
              key={card.id} // Use the card ID as the key
              id={card.id}
              name={card.name}
              img={card.img}
              new_price={card.new_price}
              old_price={card.old_price}
              description={card.description} // Pass the description as well
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Latestcollections;
