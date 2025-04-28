import React, { useEffect } from 'react';
import BANNER from '../../assets/image/redrose.jpg'; // Ensure path is correct
import './hero.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';

const Hero = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <div className="hero">
      <div className="container-fluid px-0">
        <div className="row align-items-center">
          {/* Text Section */}
          <div className="col-md-7 ps-md-5">
            <h1 data-aos="fade-up">We value our customer</h1>
            <p data-aos="zoom-in" data-aos-delay="300">
              Welcome to our amazing flower shop, where virtually the best
              flowers are being sold.
            </p>
            <Link to="/signup">
              <button
                className="btn btn-outline-primary btn-lg"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                Create an account
              </button>
            </Link>
          </div>

          {/* Image Section */}
          <div
            className="col-md-5 d-flex justify-content-end pe-0"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            <div className="hero-image">
              <img src={BANNER} alt="banner" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
