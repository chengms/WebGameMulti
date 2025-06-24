/**
 * Game loader utility functions
 * This module provides utilities for loading games from text configuration
 * Supports both online games and local games with priority system
 */

// 游戏数据缓存
let gamesCache = null;
let categoriesCache = null;
let gameDetailsCache = new Map();
let configCache = null;

/**
 * 解析游戏配置文本文件
 * @returns {Promise<Array>} 解析后的游戏配置数组
 */
const parseGameConfig = async () => {
  try {
    if (configCache) {
      return configCache;
    }

    console.log('Loading games configuration from text file...');
    
    // 获取配置文件
    const response = await fetch('/games/games-config.txt');
    if (!response.ok) {
      throw new Error(`Failed to load config file: ${response.status}`);
    }
    
    const configText = await response.text();
    const lines = configText.split('\n');
    const games = [];
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // 跳过注释和空行
      if (!trimmedLine || trimmedLine.startsWith('#')) {
        continue;
      }
      
      // 解析游戏配置行
      // 格式: ID|名称|描述|类型|URL/路径|缩略图|本地图标|标签|作者|优先级
      const parts = trimmedLine.split('|');
      if (parts.length >= 9) {
        const [id, name, description, type, url, thumbnail, localThumbnail, tags, author, priority] = parts;
        
        games.push({
          id: id.trim(),
          name: name.trim(),
          description: description.trim(),
          type: type.trim(), // 'online' 或 'local'
          url: url.trim(),
          thumbnail: thumbnail.trim(),
          localThumbnail: localThumbnail.trim(),
          tags: tags.split(',').map(tag => tag.trim()),
          author: author.trim(),
          priority: parseInt(priority) || 1,
          isOnline: type.trim() === 'online'
        });
      }
    }
    
    // 按优先级排序 (优先级高的在前，在线游戏优先)
    games.sort((a, b) => {
      if (a.isOnline && !b.isOnline) return -1;
      if (!a.isOnline && b.isOnline) return 1;
      return b.priority - a.priority;
    });
    
    configCache = games;
    console.log(`Loaded ${games.length} games from configuration`);
    return games;
    
  } catch (error) {
    console.error('Error parsing game config:', error);
    // 如果配置文件加载失败，返回基本的本地游戏列表
    return getFallbackGames();
  }
};

/**
 * 获取备用游戏列表（当配置文件加载失败时使用）
 * @returns {Array} 备用游戏数组
 */
const getFallbackGames = () => {
  return [
    {
      id: 'snake',
      name: 'Snake',
      description: 'Classic snake game. Use arrow keys to control the snake, eat food to grow longer, and avoid hitting yourself or the walls.',
      type: 'local',
      url: '/games/snake/index.html',
      thumbnail: '/games/snake/image/cover.png',
      localThumbnail: '/games/snake/image/cover.png',
      tags: ['Arcade', 'Classic', 'Casual'],
      author: 'GameTime Team',
      priority: 5,
      isOnline: false
    },
    {
      id: 'tetris',
      name: 'Tetris',
      description: 'Classic Tetris game. Arrange the falling blocks to form complete rows to clear them.',
      type: 'local',
      url: '/games/tetris/index.html',
      thumbnail: '/games/tetris/image/screenshot1.jpg',
      localThumbnail: '/games/tetris/image/screenshot1.jpg',
      tags: ['Puzzle', 'Classic', 'Strategy'],
      author: 'GameTime Team',
      priority: 4,
      isOnline: false
    },
    {
      id: '2048',
      name: '2048',
      description: 'Slide numbered tiles to merge those with the same value, aiming to reach the 2048 tile.',
      type: 'local',
      url: '/games/2048/index.html',
      thumbnail: '/games/2048/image/screenshot1.jpg',
      localThumbnail: '/games/2048/image/screenshot1.jpg',
      tags: ['Puzzle', 'Strategy', 'Logic'],
      author: 'GameTime Team',
      priority: 4,
      isOnline: false
    }
  ];
};

/**
 * Load game metadata from meta.json files
 * @returns {Promise<Array>} Array of game metadata objects
 */
const loadGamesFromMetaFiles = async () => {
  try {
    console.log('Loading games from meta.json files...');
    
    // 已知的游戏目录列表
    const gameDirectories = [
      'snake', 'tetris', '2048', 'memory-match', 'tic-tac-toe',
      'pacman', 'planewar', 'bike-racing', 'candy-crush', 
      'circle-path', 'endless-run'
    ];
    
    const games = [];
    
    for (const gameId of gameDirectories) {
      try {
        const response = await fetch(`/games/${gameId}/meta.json`);
        if (response.ok) {
          const meta = await response.json();
          
          // 构建完整的游戏对象
          const game = {
            id: meta.id || gameId,
            name: meta.name,
            description: meta.description,
            thumbnail: `/games/${gameId}/${meta.thumbnail}`, // 构建完整的thumbnail路径
            tags: meta.tags || [],
            author: meta.author || 'GameTime Bar Team',
            version: meta.version || '1.0.0',
            controls: meta.controls || 'Use mouse and keyboard to play',
            createdAt: meta.createdAt || new Date().toISOString().split('T')[0],
            lastUpdated: meta.lastUpdated || meta.updatedAt || new Date().toISOString().split('T')[0],
            gameUrl: meta.gameUrl || `/games/${gameId}/index.html`,
            isOnline: meta.isExternal || false,
            externalUrl: meta.externalUrl,
            type: meta.isExternal ? 'online' : 'local',
            minWidth: meta.minWidth,
            minHeight: meta.minHeight,
            priority: 1
          };
          
          games.push(game);
          console.log(`Loaded game: ${game.name} (${gameId})`);
        } else {
          console.warn(`Failed to load meta.json for game: ${gameId}`);
        }
      } catch (error) {
        console.error(`Error loading meta.json for game ${gameId}:`, error);
      }
    }
    
    return games;
  } catch (error) {
    console.error('Error loading games from meta files:', error);
    return [];
  }
};

/**
 * 增强配置文件中的游戏数据，尝试从meta.json读取thumbnail
 * @param {Array} configGames - 从配置文件加载的游戏数组
 * @returns {Promise<Array>} 增强后的游戏数组
 */
const enhanceGamesWithMetaData = async (configGames) => {
  const enhancedGames = [];
  
  for (const game of configGames) {
    let enhancedGame = { ...game };
    
    // 如果是本地游戏，尝试从meta.json读取更多信息
    if (!game.isOnline) {
      try {
        const response = await fetch(`/games/${game.id}/meta.json`);
        if (response.ok) {
          const meta = await response.json();
          
          // 使用meta.json中的thumbnail，如果存在的话
          if (meta.thumbnail) {
            enhancedGame.thumbnail = `/games/${game.id}/${meta.thumbnail}`;
          }
          
          // 可以从meta.json中获取更多信息
          if (meta.controls) enhancedGame.controls = meta.controls;
          if (meta.version) enhancedGame.version = meta.version;
          if (meta.createdAt) enhancedGame.createdAt = meta.createdAt;
          if (meta.lastUpdated || meta.updatedAt) {
            enhancedGame.lastUpdated = meta.lastUpdated || meta.updatedAt;
          }
          if (meta.minWidth) enhancedGame.minWidth = meta.minWidth;
          if (meta.minHeight) enhancedGame.minHeight = meta.minHeight;
          
          console.log(`Enhanced ${game.id} with meta.json data`);
        }
      } catch (error) {
        console.log(`Could not load meta.json for ${game.id}, using config data`);
      }
    }
    
    enhancedGames.push(enhancedGame);
  }
  
  return enhancedGames;
};

/**
 * Load all games metadata
 * @returns {Promise<Array>} Array of game metadata objects
 */
export const loadGames = async () => {
  try {
    // 如果有缓存，直接返回
    if (gamesCache) {
      return gamesCache;
    }

    console.log('Loading games data from configuration...');
    
    // 优先从配置文件加载（保持原有流程）
    const configGames = await parseGameConfig();
    
    // 转换为标准格式并增强本地游戏的元数据
    let games = configGames.map(game => ({
      id: game.id,
      name: game.name,
      description: game.description,
      thumbnail: game.thumbnail,
      localThumbnail: game.localThumbnail,
      tags: game.tags,
      author: game.author,
      type: game.type,
      gameUrl: game.url,
      isOnline: game.isOnline,
      priority: game.priority
    }));
    
    // 增强本地游戏的数据（从meta.json读取thumbnail等信息）
    games = await enhanceGamesWithMetaData(games);
    
    // 如果配置文件加载失败，尝试从meta.json文件加载
    if (games.length === 0) {
      console.log('Config file failed, trying meta.json files...');
      games = await loadGamesFromMetaFiles();
    }
    
    // 如果都失败了，使用备用游戏列表
    if (games.length === 0) {
      console.log('Using fallback games...');
      games = getFallbackGames();
    }
    
    // 按优先级和类型排序
    games.sort((a, b) => {
      if (a.isOnline && !b.isOnline) return 1; // 本地游戏优先
      if (!a.isOnline && b.isOnline) return -1;
      return (b.priority || 1) - (a.priority || 1);
    });
    
    // 缓存数据
    gamesCache = games;
    console.log(`Loaded ${games.length} games (${games.filter(g => g.isOnline).length} online, ${games.filter(g => !g.isOnline).length} local)`);
    return games;
    
  } catch (error) {
    console.error('Error loading games:', error);
    // 返回备用游戏列表
    const fallbackGames = getFallbackGames();
    gamesCache = fallbackGames;
    return fallbackGames;
  }
};

/**
 * Load game details by ID
 * @param {string} gameId - The ID of the game to load
 * @returns {Promise<Object>} Game details object
 */
export const loadGameDetails = async (gameId) => {
  try {
    // 检查缓存
    if (gameDetailsCache.has(gameId)) {
      return gameDetailsCache.get(gameId);
    }

    // 获取基本游戏信息（优先从配置文件）
    const games = await loadGames();
    const game = games.find(g => g.id === gameId);
    
    if (!game) {
      throw new Error(`Game with ID ${gameId} not found`);
    }
    
    // 构建详细信息
    const gameDetails = {
      id: game.id,
      name: game.name,
      description: game.description,
      fullDescription: generateFullDescription(game),
      thumbnail: game.thumbnail?.includes('/games/') 
        ? game.thumbnail.replace(`/games/${gameId}/`, '') 
        : game.thumbnail || 'image/cover.png', // 确保相对路径
      screenshots: generateScreenshots(game),
      tags: game.tags,
      author: game.author,
      version: game.version || '1.0.0',
      controls: game.controls || generateControls(game),
      createdAt: game.createdAt || new Date().toISOString().split('T')[0],
      lastUpdated: game.lastUpdated || new Date().toISOString().split('T')[0],
      gameUrl: game.gameUrl,
      type: game.type,
      isOnline: game.isOnline,
      externalUrl: game.externalUrl,
      minWidth: game.minWidth,
      minHeight: game.minHeight,
      priority: game.priority
    };
    
    // 缓存详情
    gameDetailsCache.set(gameId, gameDetails);
    return gameDetails;
    
  } catch (error) {
    console.error('Error loading game details:', error);
    throw new Error(`Failed to load game details for ${gameId}`);
  }
};

/**
 * 生成游戏的完整描述（HTML格式）
 * @param {Object} game 游戏对象
 * @returns {string} HTML格式的完整描述
 */
const generateFullDescription = (game) => {
  const baseDescription = `<p>${game.description}</p>`;
  
  if (game.isOnline) {
    return baseDescription + `
      <h3>Online Game Features</h3>
      <ul>
        <li>No download required, play instantly</li>
        <li>Always up-to-date with the latest version</li>
        <li>Multi-platform access supported</li>
        <li>Community interaction and leaderboards</li>
      </ul>
      <h3>Game Description</h3>
      <p>This is a high-quality online game developed by ${game.author}. The game supports modern browsers and provides a smooth gaming experience.</p>
      <p><strong>Note:</strong> Online games require a stable internet connection, and initial loading may take some time.</p>
    `;
  } else {
    return baseDescription + `
      <h3>Local Game Features</h3>
      <ul>
        <li>Playable offline without internet connection</li>
        <li>Fast loading and responsive gameplay</li>
        <li>Stable and reliable, unaffected by network</li>
        <li>Optimized local gaming experience</li>
      </ul>
      <h3>Game Description</h3>
      <p>This is a carefully crafted local game developed by ${game.author}. The game has been optimized for local execution to provide the best gaming experience.</p>
    `;
  }
};

/**
 * 生成游戏截图列表
 * @param {Object} game 游戏对象
 * @returns {Array} 截图URL数组
 */
const generateScreenshots = (game) => {
  if (game.isOnline) {
    // 在线游戏使用缩略图作为截图
    return [game.thumbnail].filter(Boolean);
  } else {
    // 本地游戏尝试查找多个截图
    const gameId = game.id;
    const screenshots = [];
    
    // 添加主缩略图
    if (game.thumbnail) {
      if (game.thumbnail.startsWith('/games/')) {
        screenshots.push(game.thumbnail);
      } else {
        screenshots.push(`/games/${gameId}/${game.thumbnail}`);
      }
    }
    
    // 尝试添加其他截图
    screenshots.push(
      `/games/${gameId}/image/screenshot1.jpg`,
      `/games/${gameId}/image/screenshot2.jpg`
    );
    
    return screenshots.filter(Boolean);
  }
};

/**
 * 生成游戏控制说明
 * @param {Object} game 游戏对象
 * @returns {string} 控制说明
 */
const generateControls = (game) => {
  // 根据游戏类型和标签生成通用控制说明
  const tags = game.tags.map(tag => tag.toLowerCase());
  
  if (tags.includes('arcade') || tags.includes('action')) {
    return 'Use arrow keys or WASD to move, spacebar for actions, mouse click for interactions';
  } else if (tags.includes('puzzle')) {
    return 'Mouse click to select and move, arrow keys to navigate, spacebar to confirm';
  } else if (tags.includes('racing') || tags.includes('sports')) {
    return 'Arrow keys to control direction, spacebar to accelerate or brake, mouse to control camera';
  } else if (tags.includes('shooter')) {
    return 'WASD to move, mouse to aim and shoot, spacebar to jump or perform special actions';
  } else {
    return 'Use mouse and keyboard to play. For specific controls, please refer to the in-game instructions';
  }
};

/**
 * Get game categories from loaded games
 * @returns {Promise<Array>} Array of category objects
 */
export const getGameCategories = async () => {
  try {
    if (categoriesCache) {
      return categoriesCache;
    }

    const games = await loadGames();
    const categoryMap = new Map();

    // 统计每个标签的游戏数量
    games.forEach(game => {
      game.tags.forEach(tag => {
        if (categoryMap.has(tag)) {
          categoryMap.set(tag, categoryMap.get(tag) + 1);
        } else {
          categoryMap.set(tag, 1);
        }
      });
    });

    // 转换为分类数组
    const categories = Array.from(categoryMap.entries()).map(([name, count]) => ({
      id: name.toLowerCase(),
      name: name,
      count: count
    }));

    // 按游戏数量排序
    categories.sort((a, b) => b.count - a.count);

    categoriesCache = categories;
    return categories;
  } catch (error) {
    console.error('Error getting categories:', error);
    return [];
  }
};

/**
 * Filter games by category
 * @param {Array} games - Array of games
 * @param {string} categoryId - Category ID to filter by
 * @returns {Array} Filtered games array
 */
export const filterGamesByCategory = (games, categoryId) => {
  if (!categoryId || categoryId === 'all') {
    return games;
  }
  
  return games.filter(game => 
    game.tags.some(tag => tag.toLowerCase() === categoryId.toLowerCase())
  );
};

/**
 * Search games by keyword
 * @param {Array} games - Array of games
 * @param {string} keyword - Search keyword
 * @returns {Array} Filtered games array
 */
export const searchGames = (games, keyword) => {
  if (!keyword) {
    return games;
  }
  
  const searchTerm = keyword.toLowerCase();
  return games.filter(game => 
    game.name.toLowerCase().includes(searchTerm) ||
    game.description.toLowerCase().includes(searchTerm) ||
    game.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    game.author.toLowerCase().includes(searchTerm)
  );
};

/**
 * 刷新游戏配置（清除缓存，重新加载）
 * @returns {Promise<Array>} 新的游戏列表
 */
export const refreshGameConfig = async () => {
  // 清除所有缓存
  gamesCache = null;
  categoriesCache = null;
  gameDetailsCache.clear();
  configCache = null;
  
  console.log('Refreshing game configuration...');
  return await loadGames();
};

/**
 * 获取游戏统计信息
 * @returns {Promise<Object>} 统计信息对象
 */
export const getGameStats = async () => {
  try {
    const games = await loadGames();
    const onlineGames = games.filter(g => g.isOnline);
    const localGames = games.filter(g => !g.isOnline);
    const categories = await getGameCategories();
    
    return {
      total: games.length,
      online: onlineGames.length,
      local: localGames.length,
      categories: categories.length,
      topCategory: categories[0]?.name || 'None',
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error getting game stats:', error);
    return {
      total: 0,
      online: 0,
      local: 0,
      categories: 0,
      topCategory: 'None',
      lastUpdated: new Date().toISOString()
    };
  }
};

// 兼容性函数（保持向后兼容）
export const saveGamePreferences = (gameId, preferences) => {
  try {
    const key = `game_preferences_${gameId}`;
    localStorage.setItem(key, JSON.stringify(preferences));
    return true;
  } catch (error) {
    console.error('Error saving game preferences:', error);
    return false;
  }
};

export const loadGamePreferences = (gameId) => {
  try {
    const key = `game_preferences_${gameId}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading game preferences:', error);
    return null;
  }
};
