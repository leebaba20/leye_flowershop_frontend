import React, {useEffect} from 'react';
import BANNER from '../../assets/image/redrose.jpg';
import './hero.css';
import AOS from 'aos'
import 'aos/dist/aos.css'

const Hero = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
      easing: 'ease-in-out',
    });
  },[]);

  return (
    <div className="hero">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-7">
            <h1 data-aos='fade-up'>We value our customer</h1>
            <p data-aos='zoom-in' data-aos-delay='300'>
              Welcome to our amazing flower shop, where virtually the best
              flowers are being sold.
            </p>
            <button className='btn btn-outline-primary btn-lg' data-aos='fade-up' data-aos-delay='600'>Create an account</button>
          </div>

          <div className="col-md-5" data-aos='fade-left' data-aos-delay='400'>
            <img src={BANNER} alt="banner" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
