import React from 'react';
import Card from '../commonfiles/Card';
import latest_collections from '../../assets/New_collections';
import './latestcollections.css'

const Latestcollections = () => {
  return (
    <div>
      <div className="new_collections">
        <h1>Latest collections 🌹🌺💐</h1>
        <p>Explore our Latest collections  of flowers across all our varieties</p>
        <hr />
        <div className="collections">
          {latest_collections.map((card, i) =>{return<Card key={i} id={card.id} name={card.name} img={card.img} new_price={card.new_price} old_price={card.old_price}/>
            
})}
        </div>
      </div>
    </div>
  );
};

export default Latestcollections;
