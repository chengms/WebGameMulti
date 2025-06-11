import React from 'react';
import { NavLink } from 'react-router-dom';
import { useGames } from '../../contexts/GameContext';
import { useUserSettings } from '../../contexts/UserSettingsContext';
import './Sidebar.css';

/**
 * 侧边栏组件，用于显示游戏分类和导航
 * @returns {JSX.Element} 侧边栏组件
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
        <h3 className="sidebar__title">游戏分类</h3>
        
        {categoriesLoading && <p className="sidebar__loading">加载中...</p>}
        
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
                所有游戏
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
          <h3 className="sidebar__title">导航</h3>
          <ul className="sidebar__nav-list">
            <li className="sidebar__nav-item">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  isActive ? "sidebar__nav-link sidebar__nav-link--active" : "sidebar__nav-link"
                }
                end
              >
                <i className="sidebar__icon">🏠</i> 首页
              </NavLink>
            </li>
            <li className="sidebar__nav-item">
              <NavLink 
                to="/settings" 
                className={({ isActive }) => 
                  isActive ? "sidebar__nav-link sidebar__nav-link--active" : "sidebar__nav-link"
                }
              >
                <i className="sidebar__icon">⚙️</i> 设置
                <span className="sidebar__nav-badge" title={`当前主题: ${settings.theme}`}>
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
                <i className="sidebar__icon">ℹ️</i> 关于
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