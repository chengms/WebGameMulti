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
    
    console.log('Loading games data...');
    
    // Get games data (in a production app, this would be loaded dynamically from the server)
    const games = [
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
      },
      {
        id: 'tetris',
        name: 'Tetris',
        description: 'The classic puzzle game where you arrange falling blocks to create complete lines.',
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="%234a6ea9"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle">Tetris</text></svg>',
        tags: ['Puzzle', 'Classic', 'Arcade', 'Strategy'],
        author: 'WebGameMulti Team',
        createdAt: '2023-07-15'
      },
      {
        id: '2048',
        name: '2048',
        description: 'Slide numbered tiles and combine matching values to reach the 2048 tile in this addictive puzzle game.',
        thumbnail: '/games/2048/image/thumbnail.jpg',
        tags: ['Puzzle', 'Strategy', 'Logic', 'Number'],
        author: 'WebGameMulti Team',
        createdAt: '2023-07-18'
      },
      {
        id: 'tic-tac-toe',
        name: 'Tic Tac Toe',
        description: 'The classic game of X\'s and O\'s with three difficulty levels of AI opponents.',
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23a6824a"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle">Tic Tac Toe</text></svg>',
        tags: ['Board', 'Strategy', 'Classic', 'Puzzle'],
        author: 'WebGameMulti Team',
        createdAt: '2023-07-20'
      },
      {
        id: 'crazy-cattle-3d',
        name: 'Crazy Cattle 3D',
        description: 'An exciting 3D cattle adventure game with immersive gameplay and stunning graphics. Navigate through challenging levels and experience the thrill of 3D gaming.',
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%234a90e2;stop-opacity:1" /><stop offset="100%" style="stop-color:%237b68ee;stop-opacity:1" /></linearGradient></defs><rect width="300" height="200" fill="url(%23bg)"/><circle cx="80" cy="120" r="25" fill="white" opacity="0.9"/><circle cx="220" cy="80" r="20" fill="white" opacity="0.7"/><circle cx="250" cy="150" r="15" fill="white" opacity="0.5"/><text x="150" y="90" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white" text-anchor="middle">🐄</text><text x="150" y="120" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="white" text-anchor="middle">Crazy Cattle</text><text x="150" y="145" font-family="Arial, sans-serif" font-size="16" fill="white" text-anchor="middle">3D Adventure</text></svg>',
        tags: ['Action', 'Adventure', '3D', 'Arcade'],
        author: 'Crazy Cattle Games',
        createdAt: '2024-01-15'
      },
      {
        id: 'candy-crush',
        name: 'Candy Crush',
        description: 'A sweet and addictive match-3 puzzle game. Match colorful candies to clear levels and achieve high scores in this delightful candy-themed adventure.',
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><defs><linearGradient id="candyBg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23ff6b9d;stop-opacity:1" /><stop offset="50%" style="stop-color:%23c44569;stop-opacity:1" /><stop offset="100%" style="stop-color:%23f8b500;stop-opacity:1" /></linearGradient></defs><rect width="300" height="200" fill="url(%23candyBg)"/><circle cx="70" cy="60" r="15" fill="white" opacity="0.8"/><circle cx="230" cy="70" r="12" fill="white" opacity="0.6"/><circle cx="80" cy="140" r="10" fill="white" opacity="0.7"/><circle cx="220" cy="150" r="18" fill="white" opacity="0.5"/><text x="150" y="85" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="white" text-anchor="middle">🍬</text><text x="150" y="115" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="white" text-anchor="middle">Candy Crush</text><text x="150" y="140" font-family="Arial, sans-serif" font-size="14" fill="white" text-anchor="middle">Match-3 Puzzle</text></svg>',
        tags: ['Puzzle', 'Match-3', 'Casual', 'Arcade'],
        author: 'WebXinXin Games',
        createdAt: '2024-01-15'
      }
    ];
    
    console.log(`Loaded ${games.length} games:`, games);
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
      },
      'tetris': {
        id: 'tetris',
        name: 'Tetris',
        description: 'The classic puzzle game where you arrange falling blocks to create complete lines.',
        fullDescription: `<p>Tetris is one of the most iconic puzzle games of all time. The goal is simple: rotate and arrange falling blocks (tetrominoes) to create complete horizontal lines. When a line is complete, it disappears, and you earn points.</p><p>The game gets progressively faster as you level up, testing your reflexes and strategic thinking. How long can you last before the blocks stack up to the top?</p>`,
        thumbnail: '/games/tetris/image/thumbnail.jpg',
        screenshots: [
          '/games/tetris/image/screenshot1.jpg',
          '/games/tetris/image/screenshot2.jpg'
        ],
        tags: ['Puzzle', 'Classic', 'Arcade', 'Strategy'],
        author: 'WebGameMulti Team',
        version: '1.0.0',
        controls: 'Use arrow keys to move (←, →, ↓) and rotate (↑) the pieces. Press Space for hard drop.',
        createdAt: '2023-07-15',
        lastUpdated: '2023-07-15',
        gameUrl: '/games/tetris/index.html'
      },
      '2048': {
        id: '2048',
        name: '2048',
        description: 'Slide numbered tiles and combine matching values to reach the 2048 tile in this addictive puzzle game.',
        fullDescription: `<p>2048 is an addictive sliding puzzle game that challenges your strategic thinking. The rules are simple: slide tiles on a grid to combine matching numbers, doubling their value each time they merge. Starting with 2s and 4s, you need to create a tile with the number 2048.</p><p>Every move spawns a new tile (usually a 2, sometimes a 4), gradually filling up the board. Plan your moves carefully to avoid running out of space. Can you reach 2048, or even beyond?</p>`,
        thumbnail: '/games/2048/image/thumbnail.jpg',
        screenshots: [
          '/games/2048/image/screenshot1.jpg',
          '/games/2048/image/screenshot2.jpg'
        ],
        tags: ['Puzzle', 'Strategy', 'Logic', 'Number'],
        author: 'WebGameMulti Team',
        version: '1.0.0',
        controls: 'Use arrow keys to slide tiles in that direction. On mobile, swipe to move tiles.',
        createdAt: '2023-07-18',
        lastUpdated: '2023-07-18',
        gameUrl: '/games/2048/index.html'
      },
      'tic-tac-toe': {
        id: 'tic-tac-toe',
        name: 'Tic Tac Toe',
        description: 'The classic game of X\'s and O\'s with three difficulty levels of AI opponents.',
        fullDescription: `<p>Tic Tac Toe is a classic paper-and-pencil game for two players who take turns marking X and O on a 3×3 grid. The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row is the winner.</p><p>In this digital version, you play as X against a computer opponent (O) with three difficulty levels:</p><ul><li><strong>Easy:</strong> The computer makes random moves</li><li><strong>Medium:</strong> The computer can block your winning moves and make its own winning moves</li><li><strong>Hard:</strong> The computer uses the minimax algorithm to play perfectly</li></ul><p>Challenge yourself against the AI and see if you can outsmart it!</p>`,
        thumbnail: '/games/tic-tac-toe/image/thumbnail.jpg',
        screenshots: [
          '/games/tic-tac-toe/image/screenshot1.jpg',
          '/games/tic-tac-toe/image/screenshot2.jpg'
        ],
        tags: ['Board', 'Strategy', 'Classic', 'Puzzle'],
        author: 'WebGameMulti Team',
        version: '1.0.0',
        controls: 'Click or tap on a cell to place your mark. Select difficulty from the dropdown menu.',
        createdAt: '2023-07-20',
        lastUpdated: '2023-07-20',
        gameUrl: '/games/tic-tac-toe/index.html'
      },
      'crazy-cattle-3d': {
        id: 'crazy-cattle-3d',
        name: 'Crazy Cattle 3D',
        description: 'An exciting 3D cattle adventure game with immersive gameplay and stunning graphics. Navigate through challenging levels and experience the thrill of 3D gaming.',
        fullDescription: `<p>Crazy Cattle 3D is an immersive 3D adventure game that takes you on an exciting journey through a vibrant cattle world.</p>
          <p>Experience stunning 3D graphics and engaging gameplay as you navigate through challenging levels, overcome obstacles, and explore a beautifully crafted game world.</p>
          <h3>Game Features:</h3>
          <ul>
            <li>Stunning 3D graphics and immersive gameplay</li>
            <li>Multiple challenging levels to explore</li>
            <li>Intuitive controls optimized for web browsers</li>
            <li>Engaging adventure storyline</li>
            <li>Smooth performance across different devices</li>
          </ul>
          <p>Embark on this thrilling 3D adventure and discover what makes Crazy Cattle 3D so captivating!</p>`,
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%234a90e2;stop-opacity:1" /><stop offset="100%" style="stop-color:%237b68ee;stop-opacity:1" /></linearGradient></defs><rect width="300" height="200" fill="url(%23bg)"/><circle cx="80" cy="120" r="25" fill="white" opacity="0.9"/><circle cx="220" cy="80" r="20" fill="white" opacity="0.7"/><circle cx="250" cy="150" r="15" fill="white" opacity="0.5"/><text x="150" y="90" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white" text-anchor="middle">🐄</text><text x="150" y="120" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="white" text-anchor="middle">Crazy Cattle</text><text x="150" y="145" font-family="Arial, sans-serif" font-size="16" fill="white" text-anchor="middle">3D Adventure</text></svg>',
        screenshots: [],
        tags: ['Action', 'Adventure', '3D', 'Arcade'],
        author: 'Crazy Cattle Games',
        version: '1.0.0',
        controls: 'Use mouse and keyboard to control the game. Specific controls and instructions will be shown within the game interface.',
        createdAt: '2024-01-15',
        lastUpdated: '2024-01-15',
        gameUrl: '/games/crazy-cattle-3d/index.html',
        isExternal: true,
        externalUrl: 'https://www.crazycattle-3d.info/crazy-cattle-3d.embed'
      },
      'candy-crush': {
        id: 'candy-crush',
        name: 'Candy Crush',
        description: 'A sweet and addictive match-3 puzzle game. Match colorful candies to clear levels and achieve high scores in this delightful candy-themed adventure.',
        fullDescription: `<p>Candy Crush is a delightful match-3 puzzle game that will satisfy your sweet tooth for challenging gameplay.</p>
          <p>Swap adjacent candies to create matches of three or more identical pieces. Clear objectives, overcome obstacles, and progress through increasingly challenging levels in this colorful candy world.</p>
          <h3>Game Features:</h3>
          <ul>
            <li>Hundreds of sweet and challenging levels</li>
            <li>Colorful candy graphics and smooth animations</li>
            <li>Special power-ups and candy combinations</li>
            <li>Progressive difficulty with unique objectives</li>
            <li>Optimized for both desktop and mobile play</li>
            <li>No downloads required - play instantly in your browser</li>
          </ul>
          <h3>How to Play:</h3>
          <ul>
            <li>Click or tap to swap adjacent candies</li>
            <li>Match 3 or more candies of the same type</li>
            <li>Complete level objectives before running out of moves</li>
            <li>Create special candies by matching 4 or more pieces</li>
            <li>Use power-ups strategically to clear difficult levels</li>
          </ul>
          <p>Get ready for a sweet adventure that will keep you coming back for more!</p>`,
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><defs><linearGradient id="candyBg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23ff6b9d;stop-opacity:1" /><stop offset="50%" style="stop-color:%23c44569;stop-opacity:1" /><stop offset="100%" style="stop-color:%23f8b500;stop-opacity:1" /></linearGradient></defs><rect width="300" height="200" fill="url(%23candyBg)"/><circle cx="70" cy="60" r="15" fill="white" opacity="0.8"/><circle cx="230" cy="70" r="12" fill="white" opacity="0.6"/><circle cx="80" cy="140" r="10" fill="white" opacity="0.7"/><circle cx="220" cy="150" r="18" fill="white" opacity="0.5"/><text x="150" y="85" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="white" text-anchor="middle">🍬</text><text x="150" y="115" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="white" text-anchor="middle">Candy Crush</text><text x="150" y="140" font-family="Arial, sans-serif" font-size="14" fill="white" text-anchor="middle">Match-3 Puzzle</text></svg>',
        screenshots: [],
        tags: ['Puzzle', 'Match-3', 'Casual', 'Arcade'],
        author: 'WebXinXin Games',
        version: '1.0.0',
        controls: 'Click or tap to swap adjacent candies and create matches of 3 or more identical candies.',
        createdAt: '2024-01-15',
        lastUpdated: '2024-01-15',
        gameUrl: '/games/candy-crush/index.html',
        isExternal: true,
        externalUrl: 'http://game.webxinxin.com/candy/'
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