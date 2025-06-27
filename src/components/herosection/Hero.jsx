import React, { useEffect } from 'react';
import BANNER from '../../assets/image/redrose.jpg'; 
import './hero.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';

const Hero = () => {
  useEffect(() => {
    AOS.init({
      duration: 1600,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <section className="hero" aria-label="Hero section with flower shop introduction">
      <div className="container-fluid px-0">
        <div className="row align-items-center justify-content-between flex-wrap">
          
          {/* Text Section */}
          <div className="col-md-7 ps-md-5 text-md-start text-center">
            <h1 data-aos="flip-left">We value our customer</h1>
            <p data-aos="slide-right" data-aos-delay="300">
              Welcome to our amazing flower shop, where virtually the best
              flowers are being sold.
            </p>
            <Link to="/signup">
              <button
                className="btn btn-outline-primary btn-lg"
                data-aos="zoom-out-up"
                data-aos-delay="600"
                aria-label="Create an account"
              >
                Create an account
              </button>
            </Link>
          </div>

          {/* Image Section */}
          <div
            className="col-md-5 d-flex justify-content-center justify-content-md-end pe-0 mt-4 mt-md-0"
            data-aos="flip-up"
            data-aos-delay="500"
          >
            <div className="hero-image">
              <img src={BANNER} alt="Red rose banner" className="img-fluid" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
