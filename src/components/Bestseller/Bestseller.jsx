import React from 'react';
import Card from '../commonfiles/Card'
import Products from '../../assets/products'
import './Bestseller.css';

const Bestseller = () => {
  return (
    <div className='new_collections bestseller'>
        <h1>Top rated pick</h1>
        <p>Curated by our shoppers. Trusted, loved and re-ordered continously.</p>

        <div className="collections">
            {Products.map((card, i) =>{return<Card key={i} id={card.id} name={card.name} img={card.img} new_price={card.new_price} old_price={card.old_price}/>
            })}
        </div>
    </div>
  )
}

export default Bestseller;