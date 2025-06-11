import React from 'react';
import { useUserSettings } from '../../contexts/UserSettingsContext';
import './ThemeToggle.css';

/**
 * Theme toggle component for switching between light, dark, and system themes
 * @returns {JSX.Element} Theme toggle component
 */
function ThemeToggle() {
  const { settings, setTheme } = useUserSettings();

  // Get the icon based on current theme
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

  // Get the next theme when toggling
  const getNextTheme = () => {
    switch (settings.theme) {
      case 'light':
        return 'dark';
      case 'dark':
        return 'system';
      case 'system':
        return 'light';
      default:
        return 'light';
    }
  };

  // Handle theme toggle click
  const handleThemeToggle = () => {
    setTheme(getNextTheme());
  };

  return (
    <button
      className="theme-toggle"
      onClick={handleThemeToggle}
      title={`Current theme: ${settings.theme}. Click to change.`}
    >
      <span className="theme-toggle__icon">{getThemeIcon()}</span>
      <span className="theme-toggle__name">{settings.theme}</span>
    </button>
  );
}

export default ThemeToggle; 