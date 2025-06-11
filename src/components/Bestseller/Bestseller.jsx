import React, { useState, useContext, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Card from '../commonfiles/Card';
import latestCollections from '../../assets/New_collections';
import allProducts from '../../assets/New_collections'; // You may want to import a different file if this is intentional
import { UserContext } from '../../context/UserContext';
import { FaSearch } from 'react-icons/fa';
import './bestseller.css';

const Bestseller = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useContext(UserContext);
  const location = useLocation();
  const isHomepage = location.pathname === '/';

  // Merge and filter bestseller items
  const bestsellerCollections = useMemo(() => {
    const mergedProducts = [...latestCollections, ...allProducts];
    return mergedProducts.filter(product =>
      product.category?.includes('bestseller')
    );
  }, []);

  // Filter based on search term
  const filteredBestsellers = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return bestsellerCollections.filter((item) => {
      return (
        item.name.toLowerCase().includes(lowerSearch) ||
        (item.category && item.category.some((cat) => cat.toLowerCase().includes(lowerSearch))) ||
        (item.description && item.description.toLowerCase().includes(lowerSearch))
      );
    });
  }, [searchTerm, bestsellerCollections]);

  // Limit on homepage
  const bestsellersToDisplay = isHomepage
    ? filteredBestsellers.slice(0, 4)
    : filteredBestsellers;

  return (
    <section className="bestseller-wrapper">
      <div className="bestseller-container">
        <div className="new_collections bestseller-products">
          <h1 className="explore-heading">
            {user ? `Our Best Picks for You, ${user.name} 🌟` : (isHomepage ? 'Top Picks for You' : 'Bestsellers')}
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
              bestsellersToDisplay.map((card, index) => (
                <Card
                  key={`${card.id}-${index}`} // ✅ Unique key using ID + index
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
