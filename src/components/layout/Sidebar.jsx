import React from 'react';
import { Link } from 'react-router-dom';
import { useGames } from '../../contexts/GameContext';
import './Sidebar.css';

/**
 * Sidebar component for displaying game categories
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
  
  const handleCategoryClick = (categoryId) => {
    setCategory(categoryId);
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
              <Link 
                to="/" 
                className={`sidebar__category-link ${activeCategory === 'all' ? 'sidebar__category-link--active' : ''}`}
                onClick={() => handleCategoryClick('all')}
              >
                All Games
              </Link>
            </li>
            {categories.map(category => (
              <li key={category.id} className="sidebar__category">
                <Link 
                  to={`/?category=${category.id}`} 
                  className={`sidebar__category-link ${activeCategory === category.id ? 'sidebar__category-link--active' : ''}`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
        
        <div className="sidebar__footer">
          <p>© {new Date().getFullYear()} WebGameMulti</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar; 