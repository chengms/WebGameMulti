import React from 'react';
import { useUserSettings } from '../../contexts/UserSettingsContext';
import ThemeToggle from '../../components/theme/ThemeToggle';
import './Settings.css';

/**
 * Settings page component
 * @returns {JSX.Element} Settings page component
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
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      resetSettings();
    }
  };

  if (isLoading) {
    return (
      <div className="settings">
        <h1 className="settings__title">Settings</h1>
        <div className="settings__loading">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="settings">
      <h1 className="settings__title">Settings</h1>
      
      <div className="settings__section">
        <h2 className="settings__section-title">Display</h2>
        
        <div className="settings__option">
          <label className="settings__label">Theme Mode:</label>
          <ThemeToggle />
        </div>
        
        <div className="settings__option settings__option--select">
          <label htmlFor="theme" className="settings__label">Select Theme:</label>
          <select 
            id="theme" 
            className="settings__select"
            value={settings.theme}
            onChange={handleThemeChange}
          >
            <option value="light">Light Mode</option>
            <option value="dark">Dark Mode</option>
            <option value="system">System Default</option>
          </select>
        </div>
      </div>
      
      <div className="settings__section">
        <h2 className="settings__section-title">Preferences</h2>
        
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
              Enable Sound
            </label>
          </div>
          <p className="settings__description">
            Play sound effects during games and navigation
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
              Show Tutorials
            </label>
          </div>
          <p className="settings__description">
            Display game tutorials and tips
          </p>
        </div>
      </div>
      
      <div className="settings__actions">
        <button 
          className="settings__reset-button"
          onClick={handleReset}
        >
          Reset to Default
        </button>
      </div>
    </div>
  );
}

export default Settings; 