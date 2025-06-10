import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { 
  loadGames,
  loadGameDetails,
  getGameCategories,
  filterGamesByCategory,
  searchGames
} from '../utils/gameLoader';

// Create context
const GameContext = createContext();

/**
 * Game context provider component
 * @param {Object} props - Component props
 * @returns {JSX.Element} Context provider
 */
export function GameProvider({ children }) {
  // State for games
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for categories
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);
  
  // State for filters
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Load initial data
  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        setError(null);
        const gamesData = await loadGames();
        setGames(gamesData);
        setFilteredGames(gamesData);
      } catch (err) {
        setError(err.message);
        console.error('Failed to load games:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchGames();
  }, []);
  
  // Load categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        setCategoriesError(null);
        const categoriesData = await getGameCategories();
        setCategories(categoriesData);
      } catch (err) {
        setCategoriesError(err.message);
        console.error('Failed to load categories:', err);
      } finally {
        setCategoriesLoading(false);
      }
    };
    
    fetchCategories();
  }, []);
  
  // Apply filters when dependencies change
  useEffect(() => {
    if (games.length === 0) return;
    
    // First filter by category
    let result = filterGamesByCategory(games, activeCategory);
    
    // Then apply search query
    result = searchGames(result, searchQuery);
    
    setFilteredGames(result);
  }, [games, activeCategory, searchQuery]);
  
  /**
   * Get game details by ID
   * @param {string} gameId - Game ID to load
   * @returns {Promise<Object>} Game details
   */
  const getGameDetails = useCallback(async (gameId) => {
    try {
      return await loadGameDetails(gameId);
    } catch (err) {
      throw err;
    }
  }, []);
  
  /**
   * Set active category for filtering
   * @param {string} categoryId - Category ID
   */
  const setCategory = useCallback((categoryId) => {
    setActiveCategory(categoryId);
  }, []);
  
  /**
   * Set search query for filtering
   * @param {string} query - Search query
   */
  const setSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);
  
  // Context value
  const value = {
    // Games
    games,
    filteredGames,
    loading,
    error,
    
    // Categories
    categories,
    categoriesLoading,
    categoriesError,
    activeCategory,
    
    // Search
    searchQuery,
    
    // Methods
    getGameDetails,
    setCategory,
    setSearch
  };
  
  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

/**
 * Custom hook to use the game context
 * @returns {Object} Game context value
 */
export function useGames() {
  const context = useContext(GameContext);
  
  if (!context) {
    throw new Error('useGames must be used within a GameProvider');
  }
  
  return context;
}

export default GameContext; 