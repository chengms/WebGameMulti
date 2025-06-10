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
    // In a real implementation, this would be a server API call
    // For this demo, we're hard-coding some sample games
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Sample games data (in a real app, this would come from the server)
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
        id: 'tetris',
        name: 'Tetris',
        description: 'The classic Tetris game. Control falling blocks and clear as many lines as possible.',
        thumbnail: '/games/tetris/image/cover.png',
        tags: ['Puzzle', 'Classic'],
        author: 'WebGameMulti Team',
        createdAt: '2023-06-20'
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
    // For this demo, we're hard-coding some sample game details
    
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
      'tetris': {
        id: 'tetris',
        name: 'Tetris',
        description: 'The classic Tetris game. Control falling blocks and clear as many lines as possible.',
        fullDescription: `<p>Tetris is a timeless puzzle game that has captivated players for decades.</p>
          <p>The game involves manipulating different shaped blocks (tetrominoes) as they fall from the top of the screen. The goal is to create complete horizontal lines, which then disappear and award points.</p>
          <h3>How to Play:</h3>
          <ul>
            <li>Use arrow keys to move and rotate the falling blocks</li>
            <li>Complete horizontal lines to clear them and score points</li>
            <li>The game ends when the blocks reach the top of the screen</li>
            <li>Try to clear multiple lines at once for bonus points</li>
          </ul>
          <p>Tetris is easy to learn but challenging to master. Can you keep up as the blocks fall faster?</p>`,
        thumbnail: '/games/tetris/image/cover.png',
        screenshots: [
          '/games/tetris/image/screen1.png',
          '/games/tetris/image/screen2.png'
        ],
        tags: ['Puzzle', 'Classic'],
        author: 'WebGameMulti Team',
        version: '1.0.0',
        controls: 'Arrow keys, Space bar',
        createdAt: '2023-06-20',
        lastUpdated: '2023-06-20',
        gameUrl: '/games/tetris/index.html'
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
    
    // Sample categories (in a real app, this would be derived from game tags)
    const categories = [
      { id: 'action', name: 'Action' },
      { id: 'puzzle', name: 'Puzzle' },
      { id: 'strategy', name: 'Strategy' },
      { id: 'arcade', name: 'Arcade' },
      { id: 'casual', name: 'Casual' }
    ];
    
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
  
  // Map category IDs to corresponding tags
  const categoryTagMap = {
    'action': 'Action',
    'puzzle': 'Puzzle',
    'strategy': 'Strategy',
    'arcade': 'Arcade',
    'casual': 'Casual'
  };
  
  const categoryTag = categoryTagMap[categoryId];
  
  if (!categoryTag) {
    return games;
  }
  
  return games.filter(game => 
    game.tags && game.tags.includes(categoryTag)
  );
};

/**
 * Search games by keyword
 * @param {Array} games - Array of game objects
 * @param {string} keyword - Search keyword
 * @returns {Array} Filtered array of games
 */
export const searchGames = (games, keyword) => {
  if (!keyword || keyword.trim() === '') {
    return games;
  }
  
  const normalizedKeyword = keyword.toLowerCase().trim();
  
  return games.filter(game => {
    const nameMatch = game.name && game.name.toLowerCase().includes(normalizedKeyword);
    const descriptionMatch = game.description && game.description.toLowerCase().includes(normalizedKeyword);
    const tagMatch = game.tags && game.tags.some(tag => tag.toLowerCase().includes(normalizedKeyword));
    const authorMatch = game.author && game.author.toLowerCase().includes(normalizedKeyword);
    
    return nameMatch || descriptionMatch || tagMatch || authorMatch;
  });
}; 