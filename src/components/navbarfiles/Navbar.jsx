// src/components/navbarfiles/Navbar.jsx
import React, { useContext } from 'react';
import LOGO from '../../assets/image/page-loader.gif';
import './navbar.css';  // Import external CSS
import { Link, useNavigate } from 'react-router-dom';
import { BsCart4 } from "react-icons/bs";
import { useCart } from '../../hooks/useCart';
import { FaUserCircle } from "react-icons/fa";  // User icon import
import { UserContext } from '../../context/UserContext';

const Navbar = () => {
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target.elements.category.value.trim();

    if (value) {
      navigate(`/search?category=₦{value}`);
    }
  };

  return (
    <div className="navbar-container">
      <nav className="navbar fixed-top">
        <div className="container-fluid">
          <Link to="/">
            <img src={LOGO} alt="logo" className="logo" />
          </Link>

          {/* Check if the user is logged in */}
          {user && (
            <div className="user-info">
              <span className="user-name">Welcome, {user.name.split(' ')[0]}</span> 
              <FaUserCircle className="user-icon" />
            </div>
          )}

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="offcanvas offcanvas-end text-bg-light"
            tabIndex="-1"
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                Leye Flower Shop
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                {user ? (
                  <Link to="/logout">Logout</Link> // Add the logout link
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </li>

                <li className="nav-item">
                  <Link to="/about">About</Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact">Contact</Link>
                </li>
                <li className="nav-item">
                  <Link to="/service">Service</Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup">Signup</Link>
                </li>
                <li className="nav-item">
                  <Link to="/bestsellers">Bestsellers</Link>
                </li>
                <li className="nav-item">
                  <Link to="/latest-collections">Latest Collections</Link>
                </li>
                <Link to="/all-products">All Products</Link>
                <li className="nav-item">
                  <Link to="/cart">
                    <BsCart4 className="cart-icon" />
                    <sup>
                      <span className="cart-number">{totalItems}</span>
                    </sup>
                  </Link>
                </li>
              </ul>

              <form className="d-flex mt-3" role="search" onSubmit={handleSearch}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search category"
                  aria-label="Search"
                  name="category"
                />
                <button className="btn btn-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
