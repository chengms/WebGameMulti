import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGames } from '../../contexts/GameContext';
import './Header.css';

/**
 * Header component
 * @returns {JSX.Element} Header component
 */
function Header() {
  const { searchQuery, setSearch } = useGames();
  const [localSearch, setLocalSearch] = useState(searchQuery);
  
  const handleSearchChange = (e) => {
    setLocalSearch(e.target.value);
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(localSearch);
  };
  
  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <div className="header__logo">
            <Link to="/" className="header__logo-link">
              WebGameMulti
            </Link>
          </div>
          
          <div className="header__search">
            <form onSubmit={handleSearchSubmit}>
              <input 
                type="text" 
                placeholder="Search games..." 
                className="header__search-input"
                value={localSearch}
                onChange={handleSearchChange}
              />
              <button 
                type="submit" 
                className="header__search-button"
              >
                Search
              </button>
            </form>
          </div>
          
          <nav className="header__nav">
            <Link to="/" className="header__nav-item">Home</Link>
            <Link to="/about" className="header__nav-item">About</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header; 