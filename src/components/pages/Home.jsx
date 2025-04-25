import React, { useContext } from 'react';
import Hero from '../herosection/Hero';
import LatestCollections from '../latest_collections/Latestcollections';
import Bestseller from '../Bestseller/Bestseller';
import AllProducts from './AllProducts';
import Newsletter from '../forms/Newsletter';
import { UserContext } from '../../context/UserContext';
import './Home.css'; // Ensure this CSS file is imported

const Home = () => {
  const { user } = useContext(UserContext);  // Access logged-in user from context

  return (
    <div className="home-container">
      <Hero />
      
      <div className="welcome-section">
        {user ? (
          <h2 className="welcome-message">Welcome back, <span className="user-name">{user.name}</span> 🌸</h2>  // Personalized greeting
        ) : (
          <h2 className="welcome-message">Welcome to our Flower Shop! Explore our collection</h2>  // General greeting for guests
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
