import React from 'react';
import { NavLink } from 'react-router-dom';
import { useGames } from '../../contexts/GameContext';
import { useUserSettings } from '../../contexts/UserSettingsContext';
import './Sidebar.css';

/**
 * Sidebar component for displaying game categories and navigation
 * @returns {JSX.Element} Sidebar component
 */
function Sidebar() {
  const { 
    categories, 
    categoriesLoading, 
    categoriesError,
    activeCategory,
    setCategory
  } = useGames();
  
  const { settings } = useUserSettings();
  
  const handleCategoryClick = (categoryId) => {
    setCategory(categoryId);
  };
  
  const getThemeIcon = () => {
    switch (settings.theme) {
      case 'light':
        return '☀️';
      case 'dark':
        return '🌙';
      case 'system':
        return '💻';
      default:
        return '☀️';
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__content">
        <h3 className="sidebar__title">Game Categories</h3>
        
        {categoriesLoading && <p className="sidebar__loading">Loading...</p>}
        
        {categoriesError && <p className="sidebar__error">{categoriesError}</p>}
        
        {!categoriesLoading && !categoriesError && (
          <ul className="sidebar__categories">
            <li className="sidebar__category">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `sidebar__category-link ${activeCategory === 'all' ? 'sidebar__category-link--active' : ''}`
                }
                onClick={() => handleCategoryClick('all')}
                end
              >
                All Games
              </NavLink>
            </li>
            {categories.map(category => (
              <li key={category.id} className="sidebar__category">
                <NavLink 
                  to={`/?category=${category.id}`} 
                  className={({ isActive }) => 
                    `sidebar__category-link ${activeCategory === category.id ? 'sidebar__category-link--active' : ''}`
                  }
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.name}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
        
        <div className="sidebar__nav">
          <h3 className="sidebar__title">Navigation</h3>
          <ul className="sidebar__nav-list">
            <li className="sidebar__nav-item">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  isActive ? "sidebar__nav-link sidebar__nav-link--active" : "sidebar__nav-link"
                }
                end
              >
                <i className="sidebar__icon">🏠</i> Home
              </NavLink>
            </li>
            <li className="sidebar__nav-item">
              <NavLink 
                to="/settings" 
                className={({ isActive }) => 
                  isActive ? "sidebar__nav-link sidebar__nav-link--active" : "sidebar__nav-link"
                }
              >
                <i className="sidebar__icon">⚙️</i> Settings
                <span className="sidebar__nav-badge" title={`Current theme: ${settings.theme}`}>
                  {getThemeIcon()}
                </span>
              </NavLink>
            </li>
            <li className="sidebar__nav-item">
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  isActive ? "sidebar__nav-link sidebar__nav-link--active" : "sidebar__nav-link"
                }
              >
                <i className="sidebar__icon">ℹ️</i> About
              </NavLink>
            </li>
          </ul>
        </div>
        
        <div className="sidebar__footer">
          <p>© {new Date().getFullYear()} WebGameMulti</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar; 