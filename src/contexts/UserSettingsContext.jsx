import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const UserSettingsContext = createContext();

// Default settings
const defaultSettings = {
  theme: 'system', // 'light', 'dark', 'system'
  soundEnabled: true,
  showTutorials: true,
  gamePreferences: {},
};

/**
 * UserSettings context provider component
 * @param {Object} props - Component props
 * @returns {JSX.Element} Context provider
 */
export function UserSettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  // Load settings from localStorage on mount
  useEffect(() => {
    const loadSettings = () => {
      try {
        const savedSettings = localStorage.getItem('webgamemulti_settings');
        if (savedSettings) {
          setSettings(JSON.parse(savedSettings));
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
        // If there's an error, use default settings
        setSettings(defaultSettings);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('webgamemulti_settings', JSON.stringify(settings));
      } catch (error) {
        console.error('Failed to save settings:', error);
      }
    }
  }, [settings, isLoading]);

  // Apply theme
  useEffect(() => {
    if (!isLoading) {
      // Set html data-theme attribute
      document.documentElement.setAttribute('data-theme', settings.theme);
      
      // If it's system theme, add listener for system theme change
      if (settings.theme === 'system') {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Set initial theme
        document.documentElement.setAttribute(
          'data-theme', 
          mediaQuery.matches ? 'dark' : 'light'
        );
        
        // Listen for system theme change
        const handleThemeChange = (e) => {
          document.documentElement.setAttribute(
            'data-theme',
            e.matches ? 'dark' : 'light'
          );
        };
        
        mediaQuery.addEventListener('change', handleThemeChange);
        
        return () => {
          mediaQuery.removeEventListener('change', handleThemeChange);
        };
      }
    }
  }, [settings.theme, isLoading]);

  /**
   * Update settings
   * @param {Object} newSettings - New settings to apply
   */
  const updateSettings = (newSettings) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      ...newSettings,
    }));
  };

  /**
   * Update game-specific preferences
   * @param {string} gameId - Game ID
   * @param {Object} preferences - Game preferences
   */
  const updateGamePreferences = (gameId, preferences) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      gamePreferences: {
        ...prevSettings.gamePreferences,
        [gameId]: {
          ...prevSettings.gamePreferences[gameId],
          ...preferences,
        },
      },
    }));
  };

  /**
   * Get game-specific preferences
   * @param {string} gameId - Game ID
   * @returns {Object} Game preferences
   */
  const getGamePreferences = (gameId) => {
    return settings.gamePreferences?.[gameId] || {};
  };

  /**
   * Reset all settings to default
   */
  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  /**
   * Set theme
   * @param {string} theme - Theme value ('light', 'dark', 'system')
   */
  const setTheme = (theme) => {
    if (['light', 'dark', 'system'].includes(theme)) {
      updateSettings({ theme });
    }
  };

  // Context value
  const value = {
    settings,
    isLoading,
    updateSettings,
    updateGamePreferences,
    getGamePreferences,
    resetSettings,
    setTheme,
  };

  return (
    <UserSettingsContext.Provider value={value}>
      {children}
    </UserSettingsContext.Provider>
  );
}

/**
 * Custom hook to use the user settings context
 * @returns {Object} User settings context value
 */
export function useUserSettings() {
  const context = useContext(UserSettingsContext);

  if (!context) {
    throw new Error('useUserSettings must be used within a UserSettingsProvider');
  }

  return context;
}

export default UserSettingsContext; 