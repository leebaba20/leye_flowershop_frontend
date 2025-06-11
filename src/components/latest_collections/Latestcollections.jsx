import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Products from '../../assets/New_collections';
import Card from '../commonfiles/Card';
import './latestcollections.css';

const LatestCollections = () => {
  const location = useLocation();
  const isHomepage = location.pathname === '/';
  const displayedProducts = isHomepage ? Products.slice(0, 4) : Products;

  return (
    <section className="latest-wrapper">
      <div className="latest-collections-container">
        <div className="new_collections">
          <h1>Latest Collections 🌸</h1>
          <p>Freshly picked just for you</p>
          <hr />
          <div className="latest-collections-grid">
            {displayedProducts.map((product) => (
              <Card
                key={product.id}
                id={product.id}
                name={product.name}
                img={product.img}
                new_price={product.new_price}
                old_price={product.old_price}
                description={product.description}
                descriptionClassName="latest-description"
              />
            ))}
          </div>
          {isHomepage && (
            <div className="show-more-wrapper">
              <Link to="/latestcollections" className="show-more-button">
                Show More →
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LatestCollections;
