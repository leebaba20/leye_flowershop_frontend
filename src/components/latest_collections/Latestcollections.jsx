import React, { useContext, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Products from '../../assets/products';
import NewCollections from '../../assets/New_collections';
import Card from '../commonfiles/Card';
import { UserContext } from '../../context/UserContext';
import './latestcollections.css';

const LatestCollections = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const isHomepage = location.pathname === '/';

  // Merge and deduplicate products
  const combinedProducts = useMemo(() => {
    const merged = [...Products, ...NewCollections];
    return Array.from(new Map(merged.map((item) => [item.id, item])).values());
  }, []);

  // Filter for "latest" category
  const latestProducts = useMemo(() => {
    return combinedProducts.filter(product =>
      product.category?.includes('latest')
    );
  }, [combinedProducts]);

  const displayedProducts = isHomepage
    ? latestProducts.slice(0, 4)
    : latestProducts;

  return (
    <section className="latest-wrapper">
      <div className="latest-collections-container">
        <div className="new_collections">
          <h1 className="explore-heading">
            {user?.username
              ? `Fresh Picks for You, ${user.username} 🌼`
              : 'Latest Collections 🌸'}
          </h1>
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
