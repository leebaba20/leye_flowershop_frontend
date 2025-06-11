import React, { useContext } from 'react';
import Hero from '../herosection/Hero';
import LatestCollections from '../../components/latest_collections/Latestcollections';
import Bestseller from '../../components/Bestseller/Bestseller';
import AllProducts from '../../components/pages/AllProducts';
import Newsletter from '../forms/Newsletter';
import { UserContext } from '../../context/UserContext';
import './home.css';

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="home-container">
      <Hero />

      <div className="welcome-section">
        {user?.username ? (
          <marquee behavior="scroll" direction="left" scrollamount="6" className="welcome-marquee">
            WELCOME BACK, <span className="user-name">{user.username.toUpperCase()}</span> 🌸
          </marquee>
        ) : (
          <marquee behavior="scroll" direction="left" scrollamount="10" className="welcome-marquee">
            WELCOME TO OUR FLOWER SHOP! EXPLORE OUR COLLECTIONS
          </marquee>
        )}
      </div>

      <LatestCollections />
      <Bestseller />
      <AllProducts />
      <Newsletter />
    </div>
  );
};

export default Home;
