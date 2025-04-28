import React, { useContext } from 'react';
import Hero from '../herosection/Hero';
import LatestCollections from '../latest_collections/Latestcollections';
import Bestseller from '../Bestseller/Bestseller';
import AllProducts from './AllProducts';
import Newsletter from '../forms/Newsletter';
import { UserContext } from '../../context/UserContext';
import './Home.css'; // External CSS

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="home-container">
      <Hero />

      <div className="welcome-section">
        {user ? (
          <marquee behavior="scroll" direction="left" scrollamount="6" className="welcome-marquee">
            WELCOME BACK, <span className="user-name">{user.name.toUpperCase()}</span> 🌸
          </marquee>
        ) : (
          <marquee behavior="scroll" direction="left" scrollamount="6" className="welcome-marquee">
            WELCOME TO OUR FLOWER SHOP! EXPLORE OUR COLLECTIONS
          </marquee>
        )}
      </div>

      <LatestCollections showLimited={true} />
      <Bestseller showLimited={true} />
      <AllProducts showLimited={true} />
      <Newsletter />
    </div>
  );
};

export default Home;
