import React from 'react';
import { Link } from 'react-router-dom';
import { BsCart4 } from 'react-icons/bs';
import { useCart } from '../../context/CartContext'; // ✅ Corrected import path
import LOGO from '../../assets/image/page-loader.gif';
import './navbar.css';

const Navbar = () => {
    const { cart } = useCart();

    return (
        <div className='down'>
            <nav className="navbar fixed-top">
                <div className="container-fluid">
                    <Link to='/'>
                        <img src={LOGO} alt="logo" />
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Our Flower Shop</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>

                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <Link to='/about'>About Us</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/service'>Service</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/contact'>Contact</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/signup'>Signup</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/cart'>
                                        <BsCart4 className="cart" />
                                        <sup><span className="cartnumber">{cart.length}</span></sup>
                                    </Link>
                                </li>
                            </ul>

                            <form className="d-flex mt-3" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
