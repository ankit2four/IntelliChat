import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logoIntellichat.png';

const Navbar = ({ toggleDarkMode, isDarkMode }) => {
  return (
    <div>
      <nav className="navbar">
        {/* Logo or website name */}
        <Link to="/" className="navbar-logo">
        <img src = {logo} height={" 50rem"} width={"50rem"} alt='logo'></img>
        </Link>
        

        {/* Navigation links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <button className="mode-switch" onClick={toggleDarkMode}>
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </li>
          <li className="nav-item">
            <Link to="/chat" className="nav-link">
              Chat
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">
              About Us
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
