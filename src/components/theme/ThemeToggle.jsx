import React from 'react';
import { useUserSettings } from '../../contexts/UserSettingsContext';
import './ThemeToggle.css';

/**
 * 主题切换组件
 * @returns {JSX.Element} 主题切换组件
 */
function ThemeToggle() {
  const { settings, updateSettings } = useUserSettings();
  
  const handleThemeChange = (theme) => {
    updateSettings({ theme });
  };
  
  return (
    <div className="theme-toggle">
      <div className="theme-toggle__buttons">
        <button
          className={`theme-toggle__button ${settings.theme === 'light' ? 'theme-toggle__button--active' : ''}`}
          onClick={() => handleThemeChange('light')}
          aria-label="明亮模式"
          title="明亮模式"
        >
          <span className="theme-toggle__icon">☀️</span>
          <span className="theme-toggle__text">明亮</span>
        </button>
        
        <button
          className={`theme-toggle__button ${settings.theme === 'dark' ? 'theme-toggle__button--active' : ''}`}
          onClick={() => handleThemeChange('dark')}
          aria-label="暗黑模式"
          title="暗黑模式"
        >
          <span className="theme-toggle__icon">🌙</span>
          <span className="theme-toggle__text">暗黑</span>
        </button>
        
        <button
          className={`theme-toggle__button ${settings.theme === 'system' ? 'theme-toggle__button--active' : ''}`}
          onClick={() => handleThemeChange('system')}
          aria-label="系统主题"
          title="使用系统主题"
        >
          <span className="theme-toggle__icon">💻</span>
          <span className="theme-toggle__text">系统</span>
        </button>
      </div>
      
      <div className="theme-toggle__info">
        <p>选择您喜欢的主题模式</p>
      </div>
    </div>
  );
}

export default ThemeToggle; 