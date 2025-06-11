import React from 'react';
import { useUserSettings } from '../../contexts/UserSettingsContext';
import ThemeToggle from '../../components/theme/ThemeToggle';
import './Settings.css';

/**
 * 设置页面组件
 * @returns {JSX.Element} 设置页面组件
 */
function Settings() {
  const { 
    settings, 
    updateSettings, 
    resetSettings, 
    isLoading 
  } = useUserSettings();

  const handleThemeChange = (e) => {
    updateSettings({ theme: e.target.value });
  };

  const handleSoundToggle = (e) => {
    updateSettings({ soundEnabled: e.target.checked });
  };

  const handleTutorialsToggle = (e) => {
    updateSettings({ showTutorials: e.target.checked });
  };

  const handleReset = () => {
    if (window.confirm('确定要将所有设置重置为默认值吗？')) {
      resetSettings();
    }
  };

  if (isLoading) {
    return (
      <div className="settings">
        <h1 className="settings__title">设置</h1>
        <div className="settings__loading">加载设置中...</div>
      </div>
    );
  }

  return (
    <div className="settings">
      <h1 className="settings__title">设置</h1>
      
      <div className="settings__section">
        <h2 className="settings__section-title">显示</h2>
        
        <div className="settings__option">
          <label className="settings__label">主题模式:</label>
          <ThemeToggle />
        </div>
        
        <div className="settings__option settings__option--select">
          <label htmlFor="theme" className="settings__label">选择主题:</label>
          <select 
            id="theme" 
            className="settings__select"
            value={settings.theme}
            onChange={handleThemeChange}
          >
            <option value="light">明亮模式</option>
            <option value="dark">暗黑模式</option>
            <option value="system">系统默认</option>
          </select>
        </div>
      </div>
      
      <div className="settings__section">
        <h2 className="settings__section-title">偏好设置</h2>
        
        <div className="settings__option">
          <div className="settings__checkbox-container">
            <input 
              type="checkbox" 
              id="sound" 
              className="settings__checkbox"
              checked={settings.soundEnabled}
              onChange={handleSoundToggle}
            />
            <label htmlFor="sound" className="settings__checkbox-label">
              启用声音
            </label>
          </div>
          <p className="settings__description">
            在游戏和导航过程中播放音效
          </p>
        </div>
        
        <div className="settings__option">
          <div className="settings__checkbox-container">
            <input 
              type="checkbox" 
              id="tutorials" 
              className="settings__checkbox"
              checked={settings.showTutorials}
              onChange={handleTutorialsToggle}
            />
            <label htmlFor="tutorials" className="settings__checkbox-label">
              显示教程
            </label>
          </div>
          <p className="settings__description">
            显示游戏教程和提示
          </p>
        </div>
      </div>
      
      <div className="settings__actions">
        <button 
          className="settings__reset-button"
          onClick={handleReset}
        >
          恢复默认设置
        </button>
      </div>
    </div>
  );
}

export default Settings; 