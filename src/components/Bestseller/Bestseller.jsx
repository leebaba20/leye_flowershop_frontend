import React, { useState, useContext, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Card from '../commonfiles/Card';
import Products from '../../assets/products';
import NewCollections from '../../assets/New_collections';
import { UserContext } from '../../context/UserContext';
import { FaSearch } from 'react-icons/fa';
import './Bestseller.css';

const Bestseller = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useContext(UserContext);
  const location = useLocation();
  const isHomepage = location.pathname === '/';

  // Merge and deduplicate products
  const combinedProducts = useMemo(() => {
    const merged = [...Products, ...NewCollections];
    return Array.from(new Map(merged.map((item) => [item.id, item])).values());
  }, []);

  // Filter for bestseller category
  const bestsellerCollections = useMemo(() => {
    return combinedProducts.filter(product =>
      product.category?.includes('bestseller')
    );
  }, [combinedProducts]);

  // Filter by search input
  const filteredBestsellers = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return bestsellerCollections.filter((item) =>
      item.name.toLowerCase().includes(lowerSearch) ||
      (item.category && item.category.some((cat) =>
        cat.toLowerCase().includes(lowerSearch)
      )) ||
      (item.description && item.description.toLowerCase().includes(lowerSearch))
    );
  }, [searchTerm, bestsellerCollections]);

  const bestsellersToDisplay = isHomepage
    ? filteredBestsellers.slice(0, 4)
    : filteredBestsellers;

  return (
    <section className="bestseller-wrapper">
      <div className="bestseller-container">
        <div className="new_collections bestseller-products">
          <h1 className="explore-heading">
            {user?.username
              ? `Our Best Picks for You, ${user.username} 🌟`
              : isHomepage
              ? 'Top Picks for You'
              : 'Bestsellers'}
          </h1>

          <p className="description-text">
            These are the most loved flowers by our customers.
          </p>

          {!isHomepage && (
            <form className="search-form" onSubmit={(e) => e.preventDefault()}>
              <div className="search-input-wrapper">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search for bestselling flowers"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-bar"
                />
              </div>
            </form>
          )}

          <div className="bestseller-products-grid">
            {bestsellersToDisplay.length > 0 ? (
              bestsellersToDisplay.map((card) => (
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
            ) : (
              <p>No bestselling products found for '{searchTerm}'</p>
            )}
          </div>

          {isHomepage && (
            <div className="view-more-container">
              <Link to="/bestsellers" className="view-more-button">
                Show More →
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Bestseller;
