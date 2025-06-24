import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGames } from '../../contexts/GameContext';
import ThemeToggle from '../theme/ThemeToggle';
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

  const handleLogoClick = () => {
    // 滚动到页面顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <div className="header__logo">
            <Link to="/" className="header__logo-link" onClick={handleLogoClick}>
              <span className="header__logo-icon">🎮</span>
              GameTime Bar
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
            <Link to="/guides" className="header__nav-item">Guides</Link>
            <div className="header__nav-dropdown">
              <span className="header__nav-item header__nav-item--dropdown">Collections</span>
              <div className="header__nav-dropdown-menu">
                <Link to="/collections/popular-puzzle-games" className="header__nav-dropdown-item">
                  Popular Puzzle Games
                </Link>
                <Link to="/collections/classic-arcade-games" className="header__nav-dropdown-item">
                  Classic Arcade Games
                </Link>
                <Link to="/collections/relaxing-casual-games" className="header__nav-dropdown-item">
                  Relaxing Games
                </Link>
                <Link to="/collections/brain-training-games" className="header__nav-dropdown-item">
                  Brain Training
                </Link>
                <Link to="/collections/quick-play-games" className="header__nav-dropdown-item">
                  Quick Play Games
                </Link>
              </div>
            </div>
            <Link to="/about" className="header__nav-item">About</Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header; 