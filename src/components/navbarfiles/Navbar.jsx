// src/components/navbarfiles/Navbar.jsx
import React, { useContext } from 'react';
import LOGO from '../../assets/image/page-loader.gif';
import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { BsCart4 } from 'react-icons/bs';
import { useCart } from '../../hooks/useCart';
import { FaUserCircle } from 'react-icons/fa';
import { UserContext } from '../../context/UserContext';

const Navbar = () => {
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const { user, isLoading, logout } = useContext(UserContext);

  const handleSearch = (e) => {
  e.preventDefault();
  const value = e.target.elements.q.value.trim();
  if (value) {
    navigate(`/search?q=${value}`);
  }
};


  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="navbar-container">
      <nav className="navbar fixed-top">
        <div className="container-fluid">
          <Link to="/">
            <img src={LOGO} alt="logo" className="logo" />
          </Link>

          {/* Show user greeting if logged in */}
          {user && (
            <div className="user-info">
              <span className="user-name">
                Welcome, {user.username ?? 'User'}
              </span>
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
                className="btn-close btn-close-dark"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>

            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">

                {/* Auth links (Login / Signup / Logout) */}
                {!isLoading ? (
                  user ? (
                    <li className="nav-item">
                      <button
                        onClick={handleLogout}
                        className="btn btn-link nav-link"
                        style={{ cursor: 'pointer', padding: 0 }}
                      >
                        Logout
                      </button>
                    </li>
                  ) : (
                    <>
                      <li className="nav-item">
                        <Link to="/login" className="nav-link">Login</Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/signup" className="nav-link">Signup</Link>
                      </li>
                    </>
                  )
                ) : (
                  <li className="nav-item">
                    <span className="nav-link">Loading...</span>
                  </li>
                )}

                <li className="nav-item">
                  <Link to="/about" className="nav-link">About</Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact" className="nav-link">Contact</Link>
                </li>
                <li className="nav-item">
                  <Link to="/service" className="nav-link">Service</Link>
                </li>
                <li className="nav-item">
                  <Link to="/bestsellers" className="nav-link">Bestsellers</Link>
                </li>
                <li className="nav-item">
                  <Link to="/latest-collections" className="nav-link">Latest Collections</Link>
                </li>
                <li className="nav-item">
                  <Link to="/all-products" className="nav-link">All Products</Link>
                </li>
                <li className="nav-item">
                  <Link to="/cart" className="nav-link cart-link">
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
                placeholder="Search products"
                aria-label="Search"
                name="q"
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
