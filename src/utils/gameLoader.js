/**
 * Game loader utility functions
 * This module provides utilities for loading games from the games directory
 */

/**
 * Load all games metadata
 * @returns {Promise<Array>} Array of game metadata objects
 */
export const loadGames = async () => {
  try {
    // In a real implementation, this would fetch data from an API
    // For now, we'll simulate a network request with a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get games data (in a production app, this would be loaded dynamically from the server)
    const games = [
      {
        id: 'example-game',
        name: 'Example Game',
        description: 'This is an example game that demonstrates how to integrate games into the WebGameMulti platform.',
        thumbnail: '/games/example-game/image/cover.png',
        tags: ['Example', 'Tutorial'],
        author: 'WebGameMulti Team',
        createdAt: '2023-06-10'
      },
      {
        id: 'snake',
        name: 'Snake',
        description: 'Classic snake game. Control the snake using arrow keys, eat food to grow longer, and avoid hitting walls or yourself.',
        thumbnail: '/games/snake/image/cover.png',
        tags: ['Puzzle', 'Casual', 'Classic'],
        author: 'WebGameMulti Team',
        createdAt: '2023-06-15'
      },
      {
        id: 'memory-match',
        name: 'Memory Match',
        description: 'Test your memory by matching pairs of cards. Find all matching pairs in the shortest time possible.',
        thumbnail: '/games/memory-match/image/cover.png',
        tags: ['Puzzle', 'Memory', 'Casual'],
        author: 'WebGameMulti Team',
        createdAt: '2023-06-25'
      }
    ];
    
    return games;
  } catch (error) {
    console.error('Error loading games:', error);
    throw new Error('Failed to load games');
  }
};

/**
 * Load game details by ID
 * @param {string} gameId - The ID of the game to load
 * @returns {Promise<Object>} Game details object
 */
export const loadGameDetails = async (gameId) => {
  try {
    // In a real implementation, this would be a server API call
    // For this demo, we're simulating a network request
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Sample game details (in a real app, this would come from the server)
    const gameDetails = {
      'example-game': {
        id: 'example-game',
        name: 'Example Game',
        description: 'This is an example game that demonstrates how to integrate games into the WebGameMulti platform.',
        fullDescription: `<p>This example game demonstrates the integration process with WebGameMulti platform. It shows how to:</p>
          <ul>
            <li>Structure your game files</li>
            <li>Create game metadata</li>
            <li>Handle communications with the platform</li>
            <li>Implement responsive design</li>
          </ul>
          <p>Use this as a starting point for your own game development.</p>`,
        thumbnail: '/games/example-game/image/cover.png',
        screenshots: [
          '/games/example-game/image/screen1.png',
          '/games/example-game/image/screen2.png'
        ],
        tags: ['Example', 'Tutorial'],
        author: 'WebGameMulti Team',
        version: '1.0.0',
        controls: 'Click buttons to interact',
        createdAt: '2023-06-10',
        lastUpdated: '2023-06-10',
        gameUrl: '/games/example-game/index.html'
      },
      'snake': {
        id: 'snake',
        name: 'Snake',
        description: 'Classic snake game. Control the snake using arrow keys, eat food to grow longer, and avoid hitting walls or yourself.',
        fullDescription: `<p>Snake is one of the most iconic arcade games ever created.</p>
          <p>In this game, you control a snake that moves around the screen. The objective is to eat as much food as possible to grow longer, while avoiding collisions with the walls or the snake's own body.</p>
          <h3>How to Play:</h3>
          <ul>
            <li>Use arrow keys to control the snake's direction</li>
            <li>Eat the food items to grow longer</li>
            <li>Avoid hitting walls or your own body</li>
            <li>The game gets more challenging as your snake grows longer</li>
          </ul>
          <p>Challenge yourself to achieve the highest score possible!</p>`,
        thumbnail: '/games/snake/image/cover.png',
        screenshots: [
          '/games/snake/image/screen1.png',
          '/games/snake/image/screen2.png'
        ],
        tags: ['Puzzle', 'Casual', 'Classic'],
        author: 'WebGameMulti Team',
        version: '1.0.0',
        controls: 'Arrow keys',
        createdAt: '2023-06-15',
        lastUpdated: '2023-06-15',
        gameUrl: '/games/snake/index.html'
      },
      'memory-match': {
        id: 'memory-match',
        name: 'Memory Match',
        description: 'Test your memory by matching pairs of cards. Find all matching pairs in the shortest time possible.',
        fullDescription: `<p>Memory Match is a classic card matching game that tests your memory and concentration.</p>
          <p>The game consists of a grid of face-down cards. Each card has a matching pair somewhere in the grid. Your goal is to find all matching pairs in the fewest moves and shortest time possible.</p>
          <h3>How to Play:</h3>
          <ul>
            <li>Click on a card to flip it over</li>
            <li>Click on a second card to try to find a match</li>
            <li>If the cards match, they stay face up</li>
            <li>If they don't match, they flip back face down</li>
            <li>Remember card positions to find matches more efficiently</li>
            <li>Find all pairs to complete the game</li>
          </ul>
          <p>Choose from three difficulty levels: Easy, Medium, and Hard.</p>`,
        thumbnail: '/games/memory-match/image/cover.png',
        screenshots: [
          '/games/memory-match/image/screen1.png',
          '/games/memory-match/image/screen2.png'
        ],
        tags: ['Puzzle', 'Memory', 'Casual'],
        author: 'WebGameMulti Team',
        version: '1.0.0',
        controls: 'Mouse click',
        createdAt: '2023-06-25',
        lastUpdated: '2023-06-25',
        gameUrl: '/games/memory-match/index.html'
      }
    };
    
    const gameDetail = gameDetails[gameId];
    
    if (!gameDetail) {
      throw new Error('Game not found');
    }
    
    return gameDetail;
  } catch (error) {
    console.error(`Error loading game details for ${gameId}:`, error);
    throw error;
  }
};

/**
 * Get all game categories
 * @returns {Promise<Array>} Array of category objects
 */
export const getGameCategories = async () => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get all unique tags from games and create categories
    const games = await loadGames();
    const allTags = games.flatMap(game => game.tags);
    const uniqueTags = [...new Set(allTags)];
    
    const categories = uniqueTags.map(tag => ({
      id: tag.toLowerCase(),
      name: tag
    }));
    
    // Add "All" category
    categories.unshift({ id: 'all', name: 'All Games' });
    
    return categories;
  } catch (error) {
    console.error('Error loading categories:', error);
    throw new Error('Failed to load categories');
  }
};

/**
 * Filter games by category
 * @param {Array} games - Array of game objects
 * @param {string} categoryId - Category ID to filter by
 * @returns {Array} Filtered array of games
 */
export const filterGamesByCategory = (games, categoryId) => {
  if (!categoryId || categoryId === 'all') {
    return games;
  }
  
  return games.filter(game => 
    game.tags.some(tag => tag.toLowerCase() === categoryId)
  );
};

/**
 * Search games by keyword
 * @param {Array} games - Array of game objects
 * @param {string} keyword - Keyword to search for
 * @returns {Array} Filtered array of games
 */
export const searchGames = (games, keyword) => {
  if (!keyword || keyword.trim() === '') {
    return games;
  }
  
  const searchTerm = keyword.toLowerCase().trim();
  
  return games.filter(game => 
    game.name.toLowerCase().includes(searchTerm) ||
    game.description.toLowerCase().includes(searchTerm) ||
    game.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    (game.author && game.author.toLowerCase().includes(searchTerm))
  );
};

/**
 * Save user game preferences
 * @param {string} gameId - Game ID
 * @param {Object} preferences - User preferences for the game
 */
export const saveGamePreferences = (gameId, preferences) => {
  try {
    const storageKey = `webgamemulti_pref_${gameId}`;
    localStorage.setItem(storageKey, JSON.stringify(preferences));
    return true;
  } catch (error) {
    console.error('Error saving game preferences:', error);
    return false;
  }
};

/**
 * Load user game preferences
 * @param {string} gameId - Game ID
 * @returns {Object|null} User preferences for the game or null if not found
 */
export const loadGamePreferences = (gameId) => {
  try {
    const storageKey = `webgamemulti_pref_${gameId}`;
    const data = localStorage.getItem(storageKey);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading game preferences:', error);
    return null;
  }
}; 