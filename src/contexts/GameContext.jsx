import React, { createContext, useState, useEffect, useContext, useCallback, useMemo } from 'react';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for categories
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);
  
  // State for filters
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // 使用 useCallback 创建可重用的获取游戏函数
  const fetchGames = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const gamesData = await loadGames();
      setGames(gamesData);
    } catch (err) {
      setError(err.message);
      console.error('Failed to load games:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load initial data
  useEffect(() => {
    fetchGames();
  }, [fetchGames]);
  
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
  
  // 使用 useMemo 优化过滤后的游戏列表计算
  const filteredGames = useMemo(() => {
    if (games.length === 0) return [];
    
    // First filter by category
    let result = filterGamesByCategory(games, activeCategory);
    
    // Then apply search query
    if (searchQuery.trim()) {
      result = searchGames(result, searchQuery);
    }
    
    return result;
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
  
  // 使用 useMemo 优化 context value
  const value = useMemo(() => ({
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
    setSearch,
    refreshGames: fetchGames // 提供刷新游戏列表的方法
  }), [
    games,
    filteredGames,
    loading,
    error,
    categories,
    categoriesLoading,
    categoriesError,
    activeCategory,
    searchQuery,
    getGameDetails,
    setCategory,
    setSearch,
    fetchGames
  ]);
  
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