import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { IoClose, IoMenu } from 'react-icons/io5';
import { useAuth } from '../authContext';
import './navbar.css';

const Navbar: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { isAuthenticated } = useAuth();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenuOnMobile = () => {
    if (window.innerWidth <= 600) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 600) {
        setShowMenu(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="header">
      <nav className="nav container">
        <NavLink to="/" className="nav__logo">
          FilmFolio
        </NavLink>

        <div className={`nav__menu ${showMenu ? 'show-menu' : ''}`} id="nav-menu">
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink to="/" className="nav__link" onClick={closeMenuOnMobile}>
                Home
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/about-us" className="nav__link" onClick={closeMenuOnMobile}>
                About Us
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/all_movies" className="nav__link" onClick={closeMenuOnMobile}>
                All Movies
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/savedlists" className="nav__link" onClick={closeMenuOnMobile}>
                Saved Lists
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to={isAuthenticated ? '/dashboard' : '/login'}
                className="nav__link nav__cta"
                onClick={closeMenuOnMobile}
              >
                {isAuthenticated ? 'Dashboard' : 'Sign In'}
              </NavLink>
            </li>
          </ul>
          <div className="nav__close" id="nav-close" onClick={toggleMenu} role="button" aria-label="Close menu">
            <IoClose />
          </div>
        </div>

        <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu} role="button" aria-label="Open menu">
          <IoMenu />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
