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
        id: 'crazy-cattle-3d',
        name: 'Crazy Cattle 3D',
        description: '一款充满乐趣的3D物理对战游戏，让你体验独特的绵羊战斗！掌握物理动量系统，在3D竞技场中与其他玩家展开激烈对战。',
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="%236441a5"/><text x="50%" y="40%" font-family="Arial" font-size="20" fill="white" text-anchor="middle" dominant-baseline="middle">🐄</text><text x="50%" y="60%" font-family="Arial" font-size="18" fill="white" text-anchor="middle" dominant-baseline="middle">Crazy Cattle 3D</text><text x="50%" y="80%" font-family="Arial" font-size="12" fill="%23ff5722" text-anchor="middle" dominant-baseline="middle">3D Physics Battle</text></svg>',
        tags: ['3D', '物理引擎', '多人在线', '竞技对战', '动作'],
        author: 'Crazy Cattle Team',
        createdAt: '2025-01-15'
      },
      {
        id: 'snake',
        name: 'Snake',
        description: 'Classic snake game. Control the snake using arrow keys, eat food to grow longer, and avoid hitting walls or yourself.',
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><defs><linearGradient id="snakeBg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%2332cd32;stop-opacity:1" /><stop offset="50%" style="stop-color:%2328a745;stop-opacity:1" /><stop offset="100%" style="stop-color:%23228b22;stop-opacity:1" /></linearGradient></defs><rect width="300" height="200" fill="url(%23snakeBg)"/><rect x="50" y="80" width="20" height="20" rx="10" fill="white" opacity="0.9"/><rect x="70" y="80" width="20" height="20" rx="10" fill="white" opacity="0.8"/><rect x="90" y="80" width="20" height="20" rx="10" fill="white" opacity="0.7"/><rect x="110" y="80" width="20" height="20" rx="10" fill="white" opacity="0.6"/><circle cx="200" cy="120" r="8" fill="%23ff4444"/><text x="150" y="50" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white" text-anchor="middle">🐍</text><text x="150" y="160" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="white" text-anchor="middle">Snake Game</text></svg>',
        tags: ['Arcade', 'Classic', 'Casual'],
        author: 'WebGameMulti Team',
        createdAt: '2023-06-15'
      },
      {
        id: 'memory-match',
        name: 'Memory Match',
        description: 'Test your memory by matching pairs of cards. Find all matching pairs in the shortest time possible.',
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><defs><linearGradient id="memoryBg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%236c5ce7;stop-opacity:1" /><stop offset="50%" style="stop-color:%23a55eea;stop-opacity:1" /><stop offset="100%" style="stop-color:%23fd79a8;stop-opacity:1" /></linearGradient></defs><rect width="300" height="200" fill="url(%23memoryBg)"/><rect x="60" y="60" width="30" height="40" rx="5" fill="white" opacity="0.9"/><rect x="100" y="60" width="30" height="40" rx="5" fill="white" opacity="0.8"/><rect x="140" y="60" width="30" height="40" rx="5" fill="white" opacity="0.7"/><rect x="180" y="60" width="30" height="40" rx="5" fill="white" opacity="0.6"/><rect x="60" y="110" width="30" height="40" rx="5" fill="white" opacity="0.8"/><rect x="100" y="110" width="30" height="40" rx="5" fill="white" opacity="0.9"/><rect x="140" y="110" width="30" height="40" rx="5" fill="white" opacity="0.6"/><rect x="180" y="110" width="30" height="40" rx="5" fill="white" opacity="0.7"/><text x="150" y="40" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white" text-anchor="middle">🧠</text><text x="150" y="180" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="white" text-anchor="middle">Memory Match</text></svg>',
        tags: ['Puzzle', 'Memory', 'Casual'],
        author: 'WebGameMulti Team',
        createdAt: '2023-06-25'
      },
      {
        id: 'tetris',
        name: 'Tetris',
        description: 'The classic puzzle game where you arrange falling blocks to create complete lines.',
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><defs><linearGradient id="tetrisBg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%234a6ea9;stop-opacity:1" /><stop offset="50%" style="stop-color:%233d5a96;stop-opacity:1" /><stop offset="100%" style="stop-color:%23304680;stop-opacity:1" /></linearGradient></defs><rect width="300" height="200" fill="url(%23tetrisBg)"/><rect x="80" y="60" width="20" height="20" fill="%23ff6b6b"/><rect x="100" y="60" width="20" height="20" fill="%23ff6b6b"/><rect x="120" y="60" width="20" height="20" fill="%23ff6b6b"/><rect x="100" y="80" width="20" height="20" fill="%23ff6b6b"/><rect x="160" y="80" width="20" height="20" fill="%234ecdc4"/><rect x="180" y="80" width="20" height="20" fill="%234ecdc4"/><rect x="160" y="100" width="20" height="20" fill="%234ecdc4"/><rect x="180" y="100" width="20" height="20" fill="%234ecdc4"/><rect x="60" y="120" width="20" height="20" fill="%23ffe66d"/><rect x="80" y="120" width="20" height="20" fill="%23ffe66d"/><rect x="100" y="120" width="20" height="20" fill="%23ffe66d"/><rect x="120" y="120" width="20" height="20" fill="%23ffe66d"/><text x="150" y="40" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white" text-anchor="middle">🎮</text><text x="150" y="170" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="white" text-anchor="middle">Tetris</text></svg>',
        tags: ['Puzzle', 'Classic', 'Strategy'],
        author: 'WebGameMulti Team',
        createdAt: '2023-07-15'
      },
      {
        id: '2048',
        name: '2048',
        description: 'Slide numbered tiles and combine matching values to reach the 2048 tile in this addictive puzzle game.',
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><defs><linearGradient id="numberBg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23f4a261;stop-opacity:1" /><stop offset="50%" style="stop-color:%23e76f51;stop-opacity:1" /><stop offset="100%" style="stop-color:%23e9c46a;stop-opacity:1" /></linearGradient></defs><rect width="300" height="200" fill="url(%23numberBg)"/><rect x="60" y="60" width="40" height="40" rx="5" fill="white" opacity="0.9"/><rect x="110" y="60" width="40" height="40" rx="5" fill="white" opacity="0.8"/><rect x="160" y="60" width="40" height="40" rx="5" fill="white" opacity="0.7"/><rect x="60" y="110" width="40" height="40" rx="5" fill="white" opacity="0.8"/><rect x="110" y="110" width="40" height="40" rx="5" fill="white" opacity="0.9"/><rect x="160" y="110" width="40" height="40" rx="5" fill="white" opacity="0.6"/><text x="80" y="85" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="%23264653" text-anchor="middle">2</text><text x="130" y="85" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="%23264653" text-anchor="middle">4</text><text x="180" y="85" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="%23264653" text-anchor="middle">8</text><text x="80" y="135" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="%23264653" text-anchor="middle">16</text><text x="130" y="135" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="%23264653" text-anchor="middle">32</text><text x="150" y="40" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="white" text-anchor="middle">2048</text><text x="150" y="180" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="white" text-anchor="middle">Number Puzzle</text></svg>',
        tags: ['Puzzle', 'Strategy', 'Logic'],
        author: 'WebGameMulti Team',
        createdAt: '2023-07-18'
      },
      {
        id: 'tic-tac-toe',
        name: 'Tic Tac Toe',
        description: 'The classic game of X\'s and O\'s with three difficulty levels of AI opponents.',
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><defs><linearGradient id="ticBg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23a6824a;stop-opacity:1" /><stop offset="50%" style="stop-color:%23b8860b;stop-opacity:1" /><stop offset="100%" style="stop-color:%23daa520;stop-opacity:1" /></linearGradient></defs><rect width="300" height="200" fill="url(%23ticBg)"/><line x1="110" y1="60" x2="110" y2="140" stroke="white" stroke-width="3"/><line x1="190" y1="60" x2="190" y2="140" stroke="white" stroke-width="3"/><line x1="70" y1="100" x2="230" y2="100" stroke="white" stroke-width="3"/><line x1="70" y1="120" x2="230" y2="120" stroke="white" stroke-width="3"/><text x="90" y="85" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white" text-anchor="middle">X</text><text x="150" y="85" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white" text-anchor="middle">O</text><text x="210" y="135" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white" text-anchor="middle">X</text><text x="150" y="40" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="white" text-anchor="middle">Tic Tac Toe</text><text x="150" y="170" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="white" text-anchor="middle">Classic Strategy</text></svg>',
        tags: ['Casual', 'Strategy', 'Classic'],
        author: 'WebGameMulti Team',
        createdAt: '2023-07-20'
      },
      {
        id: 'pacman',
        name: 'Pacman',
        description: 'The classic arcade game! Navigate through the maze, eat dots, avoid ghosts, and collect power pellets to turn the tables on your pursuers.',
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><defs><linearGradient id="pacmanBg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23000080;stop-opacity:1" /><stop offset="50%" style="stop-color:%23000040;stop-opacity:1" /><stop offset="100%" style="stop-color:%23000000;stop-opacity:1" /></linearGradient></defs><rect width="300" height="200" fill="url(%23pacmanBg)"/><circle cx="80" cy="100" r="25" fill="%23ffff00"/><path d="M 80 100 L 105 85 A 25 25 0 0 1 105 115 Z" fill="url(%23pacmanBg)"/><circle cx="130" cy="100" r="3" fill="%23ffff00"/><circle cx="150" cy="100" r="3" fill="%23ffff00"/><circle cx="170" cy="100" r="3" fill="%23ffff00"/><circle cx="190" cy="100" r="3" fill="%23ffff00"/><circle cx="210" cy="100" r="3" fill="%23ffff00"/><circle cx="230" cy="90" r="12" fill="%23ff0000"/><circle cx="228" cy="86" r="2" fill="white"/><circle cx="232" cy="86" r="2" fill="white"/><rect x="70" y="60" width="4" height="20" fill="%230000ff"/><rect x="80" y="60" width="4" height="20" fill="%230000ff"/><rect x="90" y="60" width="4" height="20" fill="%230000ff"/><rect x="70" y="120" width="4" height="20" fill="%230000ff"/><rect x="80" y="120" width="4" height="20" fill="%230000ff"/><rect x="90" y="120" width="4" height="20" fill="%230000ff"/><text x="150" y="40" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="%23ffff00" text-anchor="middle">PAC-MAN</text><text x="150" y="180" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="%23ffff00" text-anchor="middle">Classic Arcade</text></svg>',
        tags: ['Arcade', 'Classic', 'Retro'],
        author: 'WebGameMulti Team',
        createdAt: '2024-01-20'
      },
      {
        id: 'planewar',
        name: 'Plane War',
        description: 'An exciting space shooter game! Pilot your fighter plane, shoot down enemy aircraft, collect power-ups, and survive as long as possible in this intense aerial combat.',
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><defs><linearGradient id="planeBg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23001122;stop-opacity:1" /><stop offset="30%" style="stop-color:%23003366;stop-opacity:1" /><stop offset="70%" style="stop-color:%23004488;stop-opacity:1" /><stop offset="100%" style="stop-color:%230066cc;stop-opacity:1" /></linearGradient></defs><rect width="300" height="200" fill="url(%23planeBg)"/><polygon points="150,60 140,80 160,80" fill="%23ff6600"/><polygon points="150,80 135,100 165,100" fill="%23cccccc"/><polygon points="130,90 170,90 160,110 140,110" fill="%23999999"/><circle cx="80" cy="40" r="3" fill="%23ffff00"/><circle cx="220" cy="50" r="2" fill="%23ffff00"/><circle cx="60" cy="80" r="2" fill="%23ffff00"/><circle cx="240" cy="120" r="3" fill="%23ffff00"/><circle cx="70" cy="160" r="2" fill="%23ffff00"/><polygon points="200,120 190,130 210,130" fill="%23ff0000"/><polygon points="100,140 90,150 110,150" fill="%23ff0000"/><rect x="145" y="120" width="10" height="15" fill="%23ffff00"/><rect x="145" y="140" width="10" height="15" fill="%23ffff00"/><text x="150" y="30" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="%23ffffff" text-anchor="middle">PLANE WAR</text><text x="150" y="185" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="%23ffffff" text-anchor="middle">Space Shooter</text></svg>',
        tags: ['Action', 'Shooter', 'Arcade'],
        author: 'WebGameMulti Team',
        createdAt: '2024-01-20'
      },
      {
        id: 'crazy-cattle-3d',
        name: 'Crazy Cattle 3D',
        description: 'An exciting 3D cattle adventure game with immersive gameplay and stunning graphics. Navigate through challenging levels and experience the thrill of 3D gaming.',
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%234a90e2;stop-opacity:1" /><stop offset="100%" style="stop-color:%237b68ee;stop-opacity:1" /></linearGradient></defs><rect width="300" height="200" fill="url(%23bg)"/><circle cx="80" cy="120" r="25" fill="white" opacity="0.9"/><circle cx="220" cy="80" r="20" fill="white" opacity="0.7"/><circle cx="250" cy="150" r="15" fill="white" opacity="0.5"/><text x="150" y="90" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white" text-anchor="middle">🐄</text><text x="150" y="120" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="white" text-anchor="middle">Crazy Cattle</text><text x="150" y="145" font-family="Arial, sans-serif" font-size="16" fill="white" text-anchor="middle">3D Adventure</text></svg>',
        tags: ['Action', 'Adventure', '3D'],
        author: 'Crazy Cattle Games',
        createdAt: '2024-01-15'
      },
      {
        id: 'candy-crush',
        name: 'Candy Crush',
        description: 'A sweet and addictive match-3 puzzle game. Match colorful candies to clear levels and achieve high scores in this delightful candy-themed adventure.',
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><defs><linearGradient id="candyBg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23ff6b9d;stop-opacity:1" /><stop offset="50%" style="stop-color:%23c44569;stop-opacity:1" /><stop offset="100%" style="stop-color:%23f8b500;stop-opacity:1" /></linearGradient></defs><rect width="300" height="200" fill="url(%23candyBg)"/><circle cx="70" cy="60" r="15" fill="white" opacity="0.8"/><circle cx="230" cy="70" r="12" fill="white" opacity="0.6"/><circle cx="80" cy="140" r="10" fill="white" opacity="0.7"/><circle cx="220" cy="150" r="18" fill="white" opacity="0.5"/><text x="150" y="85" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="white" text-anchor="middle">🍬</text><text x="150" y="115" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="white" text-anchor="middle">Candy Crush</text><text x="150" y="140" font-family="Arial, sans-serif" font-size="14" fill="white" text-anchor="middle">Match-3 Puzzle</text></svg>',
        tags: ['Arcade', 'Match-3', 'Casual'],
        author: 'WebXinXin Games',
        createdAt: '2024-01-15'
      },
      {
        id: 'bike-racing',
        name: 'Bike Racing',
        description: 'Experience thrilling motorcycle racing with realistic physics and challenging tracks. Race through different environments and compete for the best times.',
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><defs><linearGradient id="bikeBg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%231e3c72;stop-opacity:1" /><stop offset="50%" style="stop-color:%232a5298;stop-opacity:1" /><stop offset="100%" style="stop-color:%23ff6b35;stop-opacity:1" /></linearGradient></defs><rect width="300" height="200" fill="url(%23bikeBg)"/><circle cx="60" cy="120" r="20" fill="white" opacity="0.8"/><circle cx="240" cy="80" r="15" fill="white" opacity="0.6"/><circle cx="80" cy="60" r="12" fill="white" opacity="0.7"/><text x="150" y="85" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="white" text-anchor="middle">🏍️</text><text x="150" y="115" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="white" text-anchor="middle">Bike Racing</text><text x="150" y="140" font-family="Arial, sans-serif" font-size="14" fill="white" text-anchor="middle">Racing Adventure</text></svg>',
        tags: ['Sports', 'Racing', 'Action'],
        author: 'WebXinXin Games',
        createdAt: '2024-01-15'
      },
      {
        id: 'rpg-demo',
        name: 'RPG Demo',
        description: 'Embark on an epic role-playing adventure with classic RPG elements. Explore worlds, battle monsters, and level up your character in this engaging demo.',
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><defs><linearGradient id="rpgBg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%232c1810;stop-opacity:1" /><stop offset="30%" style="stop-color:%238b4513;stop-opacity:1" /><stop offset="70%" style="stop-color:%23daa520;stop-opacity:1" /><stop offset="100%" style="stop-color:%23ffd700;stop-opacity:1" /></linearGradient></defs><rect width="300" height="200" fill="url(%23rpgBg)"/><circle cx="70" cy="70" r="18" fill="white" opacity="0.7"/><circle cx="230" cy="60" r="15" fill="white" opacity="0.6"/><circle cx="80" cy="150" r="12" fill="white" opacity="0.8"/><circle cx="220" cy="140" r="20" fill="white" opacity="0.5"/><text x="150" y="85" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="white" text-anchor="middle">⚔️</text><text x="150" y="115" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="white" text-anchor="middle">RPG Demo</text><text x="150" y="140" font-family="Arial, sans-serif" font-size="14" fill="white" text-anchor="middle">Epic Adventure</text></svg>',
        tags: ['Adventure', 'Fantasy', 'Strategy'],
        author: 'WebXinXin Games',
        createdAt: '2024-01-15'
      },
      {
        id: 'circle-path',
        name: 'Circle Path',
        description: 'Navigate through circular paths in this challenging arcade game. Test your timing and precision as you guide your character through rotating obstacles and pathways.',
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><defs><radialGradient id="circleBg" cx="50%" cy="50%" r="50%"><stop offset="0%" style="stop-color:%23667eea;stop-opacity:1" /><stop offset="50%" style="stop-color:%23764ba2;stop-opacity:1" /><stop offset="100%" style="stop-color:%23f093fb;stop-opacity:1" /></radialGradient></defs><rect width="300" height="200" fill="url(%23circleBg)"/><circle cx="150" cy="100" r="60" fill="none" stroke="white" stroke-width="3" opacity="0.8"/><circle cx="150" cy="100" r="40" fill="none" stroke="white" stroke-width="2" opacity="0.6"/><circle cx="150" cy="100" r="20" fill="none" stroke="white" stroke-width="2" opacity="0.7"/><text x="150" y="85" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="white" text-anchor="middle">⭕</text><text x="150" y="115" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="white" text-anchor="middle">Circle Path</text><text x="150" y="140" font-family="Arial, sans-serif" font-size="14" fill="white" text-anchor="middle">Navigate Circles</text></svg>',
        tags: ['Arcade', 'Casual', 'Action'],
        author: 'WebXinXin Games',
        createdAt: '2024-01-15'
      },
      {
        id: 'endless-run',
        name: 'Endless Run',
        description: 'Run as far as you can in this exciting endless running adventure! Jump over obstacles, collect coins, and beat your high score in this fast-paced arcade game.',
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><defs><linearGradient id="runBg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23667eea;stop-opacity:1" /><stop offset="25%" style="stop-color:%23764ba2;stop-opacity:1" /><stop offset="50%" style="stop-color:%23f093fb;stop-opacity:1" /><stop offset="75%" style="stop-color:%23f5576c;stop-opacity:1" /><stop offset="100%" style="stop-color:%234facfe;stop-opacity:1" /></linearGradient></defs><rect width="300" height="200" fill="url(%23runBg)"/><circle cx="60" cy="80" r="15" fill="white" opacity="0.7"/><circle cx="240" cy="120" r="12" fill="white" opacity="0.6"/><circle cx="80" cy="160" r="18" fill="white" opacity="0.8"/><circle cx="220" cy="60" r="10" fill="white" opacity="0.5"/><text x="150" y="85" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="white" text-anchor="middle">🏃</text><text x="150" y="115" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="white" text-anchor="middle">Endless Run</text><text x="150" y="140" font-family="Arial, sans-serif" font-size="14" fill="white" text-anchor="middle">Running Adventure</text></svg>',
        tags: ['Action', 'Running', 'Casual'],
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
      'crazy-cattle-3d': {
        id: 'crazy-cattle-3d',
        name: 'Crazy Cattle 3D',
        description: '一款充满乐趣的3D物理对战游戏，让你体验独特的绵羊战斗！掌握物理动量系统，在3D竞技场中与其他玩家展开激烈对战。',
        fullDescription: `<h3>游戏特色</h3>
          <ul>
            <li>独特的物理引擎系统</li>
            <li>3D战斗竞技场</li>
            <li>多人在线对战</li>
            <li>丰富的战术策略</li>
          </ul>
          <h3>操作说明</h3>
          <ul>
            <li>WASD键：控制移动</li>
            <li>鼠标：精确控制绵羊方向</li>
            <li>空格键：触发特殊碰撞能力</li>
          </ul>
          <h3>游戏技巧</h3>
          <p>在Crazy Cattle 3D中，成功的关键在于掌握物理动量系统。通过下坡加速来积累动能，然后发动强力攻击或快速逃脱。游戏独特的碰撞机制会奖励精准的时机把握 - 精确角度的撞击可以将对手击飞出地图，而时机不当的攻击则会让你陷入危险。</p>
          <p>想要赢得更多比赛，建议从防守开始 - 专注于生存和战略定位。研究每个竞技场的布局，发现最佳攻击位置和危险区域。在失败后，可以观察顶级玩家的技巧来学习。持续练习，你很快就能掌握绵羊战斗的艺术！</p>`,
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="%236441a5"/><text x="50%" y="40%" font-family="Arial" font-size="20" fill="white" text-anchor="middle" dominant-baseline="middle">🐄</text><text x="50%" y="60%" font-family="Arial" font-size="18" fill="white" text-anchor="middle" dominant-baseline="middle">Crazy Cattle 3D</text><text x="50%" y="80%" font-family="Arial" font-size="12" fill="%23ff5722" text-anchor="middle" dominant-baseline="middle">3D Physics Battle</text></svg>',
        screenshots: [
          'https://www.crazycattle-3d.info/images/screenshot1.jpg',
          'https://www.crazycattle-3d.info/images/screenshot2.jpg',
          'https://www.crazycattle-3d.info/images/screenshot3.jpg'
        ],
        tags: ['3D', '物理引擎', '多人在线', '竞技对战', '动作'],
        author: 'Crazy Cattle Team',
        version: '1.0.0',
        controls: 'WASD键移动，鼠标控制方向，空格键触发碰撞能力',
        createdAt: '2025-01-15',
        lastUpdated: '2025-01-15',
        gameUrl: '/games/crazy-cattle-3d/index.html'
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
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><defs><linearGradient id="snakeBg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%2332cd32;stop-opacity:1" /><stop offset="50%" style="stop-color:%2328a745;stop-opacity:1" /><stop offset="100%" style="stop-color:%23228b22;stop-opacity:1" /></linearGradient></defs><rect width="300" height="200" fill="url(%23snakeBg)"/><rect x="50" y="80" width="20" height="20" rx="10" fill="white" opacity="0.9"/><rect x="70" y="80" width="20" height="20" rx="10" fill="white" opacity="0.8"/><rect x="90" y="80" width="20" height="20" rx="10" fill="white" opacity="0.7"/><rect x="110" y="80" width="20" height="20" rx="10" fill="white" opacity="0.6"/><circle cx="200" cy="120" r="8" fill="%23ff4444"/><text x="150" y="50" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white" text-anchor="middle">🐍</text><text x="150" y="160" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="white" text-anchor="middle">Snake Game</text></svg>',
        screenshots: [
          '/games/snake/image/screen1.png',
          '/games/snake/image/screen2.png'
        ],
        tags: ['Arcade', 'Classic', 'Casual'],
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
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><defs><linearGradient id="memoryBg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%236c5ce7;stop-opacity:1" /><stop offset="50%" style="stop-color:%23a55eea;stop-opacity:1" /><stop offset="100%" style="stop-color:%23fd79a8;stop-opacity:1" /></linearGradient></defs><rect width="300" height="200" fill="url(%23memoryBg)"/><rect x="60" y="60" width="30" height="40" rx="5" fill="white" opacity="0.9"/><rect x="100" y="60" width="30" height="40" rx="5" fill="white" opacity="0.8"/><rect x="140" y="60" width="30" height="40" rx="5" fill="white" opacity="0.7"/><rect x="180" y="60" width="30" height="40" rx="5" fill="white" opacity="0.6"/><rect x="60" y="110" width="30" height="40" rx="5" fill="white" opacity="0.8"/><rect x="100" y="110" width="30" height="40" rx="5" fill="white" opacity="0.9"/><rect x="140" y="110" width="30" height="40" rx="5" fill="white" opacity="0.6"/><rect x="180" y="110" width="30" height="40" rx="5" fill="white" opacity="0.7"/><text x="150" y="40" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white" text-anchor="middle">🧠</text><text x="150" y="180" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="white" text-anchor="middle">Memory Match</text></svg>',
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
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><defs><linearGradient id="tetrisBg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%234a6ea9;stop-opacity:1" /><stop offset="50%" style="stop-color:%233d5a96;stop-opacity:1" /><stop offset="100%" style="stop-color:%23304680;stop-opacity:1" /></linearGradient></defs><rect width="300" height="200" fill="url(%23tetrisBg)"/><rect x="80" y="60" width="20" height="20" fill="%23ff6b6b"/><rect x="100" y="60" width="20" height="20" fill="%23ff6b6b"/><rect x="120" y="60" width="20" height="20" fill="%23ff6b6b"/><rect x="100" y="80" width="20" height="20" fill="%23ff6b6b"/><rect x="160" y="80" width="20" height="20" fill="%234ecdc4"/><rect x="180" y="80" width="20" height="20" fill="%234ecdc4"/><rect x="160" y="100" width="20" height="20" fill="%234ecdc4"/><rect x="180" y="100" width="20" height="20" fill="%234ecdc4"/><rect x="60" y="120" width="20" height="20" fill="%23ffe66d"/><rect x="80" y="120" width="20" height="20" fill="%23ffe66d"/><rect x="100" y="120" width="20" height="20" fill="%23ffe66d"/><rect x="120" y="120" width="20" height="20" fill="%23ffe66d"/><text x="150" y="40" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white" text-anchor="middle">🎮</text><text x="150" y="170" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="white" text-anchor="middle">Tetris</text></svg>',
        screenshots: [
          '/games/tetris/image/screenshot1.jpg',
          '/games/tetris/image/screenshot2.jpg'
        ],
        tags: ['Puzzle', 'Classic', 'Strategy'],
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
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><defs><linearGradient id="numberBg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23f4a261;stop-opacity:1" /><stop offset="50%" style="stop-color:%23e76f51;stop-opacity:1" /><stop offset="100%" style="stop-color:%23e9c46a;stop-opacity:1" /></linearGradient></defs><rect width="300" height="200" fill="url(%23numberBg)"/><rect x="60" y="60" width="40" height="40" rx="5" fill="white" opacity="0.9"/><rect x="110" y="60" width="40" height="40" rx="5" fill="white" opacity="0.8"/><rect x="160" y="60" width="40" height="40" rx="5" fill="white" opacity="0.7"/><rect x="60" y="110" width="40" height="40" rx="5" fill="white" opacity="0.8"/><rect x="110" y="110" width="40" height="40" rx="5" fill="white" opacity="0.9"/><rect x="160" y="110" width="40" height="40" rx="5" fill="white" opacity="0.6"/><text x="80" y="85" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="%23264653" text-anchor="middle">2</text><text x="130" y="85" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="%23264653" text-anchor="middle">4</text><text x="180" y="85" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="%23264653" text-anchor="middle">8</text><text x="80" y="135" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="%23264653" text-anchor="middle">16</text><text x="130" y="135" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="%23264653" text-anchor="middle">32</text><text x="150" y="40" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="white" text-anchor="middle">2048</text><text x="150" y="180" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="white" text-anchor="middle">Number Puzzle</text></svg>',
        screenshots: [
          '/games/2048/image/screenshot1.jpg',
          '/games/2048/image/screenshot2.jpg'
        ],
        tags: ['Puzzle', 'Strategy', 'Logic'],
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
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><defs><linearGradient id="ticBg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23a6824a;stop-opacity:1" /><stop offset="50%" style="stop-color:%23b8860b;stop-opacity:1" /><stop offset="100%" style="stop-color:%23daa520;stop-opacity:1" /></linearGradient></defs><rect width="300" height="200" fill="url(%23ticBg)"/><line x1="110" y1="60" x2="110" y2="140" stroke="white" stroke-width="3"/><line x1="190" y1="60" x2="190" y2="140" stroke="white" stroke-width="3"/><line x1="70" y1="100" x2="230" y2="100" stroke="white" stroke-width="3"/><line x1="70" y1="120" x2="230" y2="120" stroke="white" stroke-width="3"/><text x="90" y="85" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white" text-anchor="middle">X</text><text x="150" y="85" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white" text-anchor="middle">O</text><text x="210" y="135" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white" text-anchor="middle">X</text><text x="150" y="40" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="white" text-anchor="middle">Tic Tac Toe</text><text x="150" y="170" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="white" text-anchor="middle">Classic Strategy</text></svg>',
        screenshots: [
          '/games/tic-tac-toe/image/screenshot1.jpg',
          '/games/tic-tac-toe/image/screenshot2.jpg'
        ],
        tags: ['Casual', 'Strategy', 'Classic'],
        author: 'WebGameMulti Team',
        version: '1.0.0',
        controls: 'Click or tap on a cell to place your mark. Select difficulty from the dropdown menu.',
        createdAt: '2023-07-20',
        lastUpdated: '2023-07-20',
        gameUrl: '/games/tic-tac-toe/index.html'
      },
      'pacman': {
        id: 'pacman',
        name: 'Pacman',
        description: 'The classic arcade game! Navigate through the maze, eat dots, avoid ghosts, and collect power pellets to turn the tables on your pursuers.',
        fullDescription: `<p>Pacman is one of the most iconic arcade games of all time, originally released in 1980. Guide Pacman through the maze as he eats dots and avoids the colorful ghosts.</p>
          <p>This classic game combines simple controls with strategic gameplay, as you must navigate the maze efficiently while avoiding the four ghosts: Blinky, Pinky, Inky, and Sue.</p>
          <h3>Game Features:</h3>
          <ul>
            <li>Classic arcade gameplay faithful to the original</li>
            <li>Authentic maze design and ghost AI behavior</li>
            <li>Power pellets that allow you to eat ghosts temporarily</li>
            <li>Progressive difficulty as you advance through levels</li>
            <li>Retro pixel art graphics and authentic sound effects</li>
            <li>High score tracking and achievements</li>
          </ul>
          <h3>How to Play:</h3>
          <ul>
            <li>Use arrow keys to move Pacman through the maze</li>
            <li>Eat all the dots to complete each level</li>
            <li>Avoid the ghosts or they will catch you</li>
            <li>Collect power pellets to temporarily turn ghosts blue</li>
            <li>Eat blue ghosts for bonus points</li>
            <li>Collect fruit bonuses for extra points</li>
          </ul>
          <p>Experience the timeless arcade classic that started it all!</p>`,
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><defs><linearGradient id="pacmanBg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23000080;stop-opacity:1" /><stop offset="50%" style="stop-color:%23000040;stop-opacity:1" /><stop offset="100%" style="stop-color:%23000000;stop-opacity:1" /></linearGradient></defs><rect width="300" height="200" fill="url(%23pacmanBg)"/><circle cx="80" cy="100" r="25" fill="%23ffff00"/><path d="M 80 100 L 105 85 A 25 25 0 0 1 105 115 Z" fill="url(%23pacmanBg)"/><circle cx="130" cy="100" r="3" fill="%23ffff00"/><circle cx="150" cy="100" r="3" fill="%23ffff00"/><circle cx="170" cy="100" r="3" fill="%23ffff00"/><circle cx="190" cy="100" r="3" fill="%23ffff00"/><circle cx="210" cy="100" r="3" fill="%23ffff00"/><circle cx="230" cy="90" r="12" fill="%23ff0000"/><circle cx="228" cy="86" r="2" fill="white"/><circle cx="232" cy="86" r="2" fill="white"/><rect x="70" y="60" width="4" height="20" fill="%230000ff"/><rect x="80" y="60" width="4" height="20" fill="%230000ff"/><rect x="90" y="60" width="4" height="20" fill="%230000ff"/><rect x="70" y="120" width="4" height="20" fill="%230000ff"/><rect x="80" y="120" width="4" height="20" fill="%230000ff"/><rect x="90" y="120" width="4" height="20" fill="%230000ff"/><text x="150" y="40" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="%23ffff00" text-anchor="middle">PAC-MAN</text><text x="150" y="180" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="%23ffff00" text-anchor="middle">Classic Arcade</text></svg>',
        screenshots: [],
        tags: ['Arcade', 'Classic', 'Retro'],
        author: 'WebGameMulti Team',
        version: '1.0.0',
        controls: 'Use arrow keys to move Pacman through the maze. Eat all dots to complete the level while avoiding the colorful ghosts.',
        createdAt: '2024-01-20',
        lastUpdated: '2024-01-20',
        gameUrl: '/games/pacman/index.html'
      },
      'planewar': {
        id: 'planewar',
        name: 'Plane War',
        description: 'An exciting space shooter game! Pilot your fighter plane, shoot down enemy aircraft, collect power-ups, and survive as long as possible in this intense aerial combat.',
        fullDescription: `<p>Plane War is an intense space shooter game that puts you in the cockpit of a fighter plane in the middle of an epic aerial battle.</p>
          <p>Navigate through enemy-filled skies, dodge incoming fire, and unleash your arsenal against waves of enemy aircraft. Collect power-ups to upgrade your weapons and health as you fight for survival in this fast-paced action game.</p>
          <h3>Game Features:</h3>
          <ul>
            <li>Intense aerial combat with smooth controls</li>
            <li>Multiple enemy types with different attack patterns</li>
            <li>Power-up system for weapon and health upgrades</li>
            <li>Progressive difficulty with increasing enemy waves</li>
            <li>Stunning space and sky environments</li>
            <li>High score tracking and achievements</li>
          </ul>
          <h3>How to Play:</h3>
          <ul>
            <li>Drag your plane around the screen to move and avoid enemy fire</li>
            <li>Your plane automatically shoots at enemies</li>
            <li>Collect power-ups to upgrade your weapons</li>
            <li>Collect health power-ups to restore your HP</li>
            <li>Survive as long as possible and achieve the highest score</li>
            <li>Destroy different enemy types for varying point values</li>
          </ul>
          <p>Take to the skies and become the ultimate fighter pilot in this thrilling aerial combat adventure!</p>`,
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><defs><linearGradient id="planeBg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23001122;stop-opacity:1" /><stop offset="30%" style="stop-color:%23003366;stop-opacity:1" /><stop offset="70%" style="stop-color:%23004488;stop-opacity:1" /><stop offset="100%" style="stop-color:%230066cc;stop-opacity:1" /></linearGradient></defs><rect width="300" height="200" fill="url(%23planeBg)"/><polygon points="150,60 140,80 160,80" fill="%23ff6600"/><polygon points="150,80 135,100 165,100" fill="%23cccccc"/><polygon points="130,90 170,90 160,110 140,110" fill="%23999999"/><circle cx="80" cy="40" r="3" fill="%23ffff00"/><circle cx="220" cy="50" r="2" fill="%23ffff00"/><circle cx="60" cy="80" r="2" fill="%23ffff00"/><circle cx="240" cy="120" r="3" fill="%23ffff00"/><circle cx="70" cy="160" r="2" fill="%23ffff00"/><polygon points="200,120 190,130 210,130" fill="%23ff0000"/><polygon points="100,140 90,150 110,150" fill="%23ff0000"/><rect x="145" y="120" width="10" height="15" fill="%23ffff00"/><rect x="145" y="140" width="10" height="15" fill="%23ffff00"/><text x="150" y="30" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="%23ffffff" text-anchor="middle">PLANE WAR</text><text x="150" y="185" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="%23ffffff" text-anchor="middle">Space Shooter</text></svg>',
        screenshots: [],
        tags: ['Action', 'Shooter', 'Arcade'],
        author: 'WebGameMulti Team',
        version: '1.0.0',
        controls: 'Drag your plane to move around the screen. Your plane automatically shoots at enemies. Collect power-ups to upgrade your weapons and health.',
        createdAt: '2024-01-20',
        lastUpdated: '2024-01-20',
        gameUrl: '/games/planewar/index.html'
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
        tags: ['Action', 'Adventure', '3D'],
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
        tags: ['Arcade', 'Match-3', 'Casual'],
        author: 'WebXinXin Games',
        version: '1.0.0',
        controls: 'Click or tap to swap adjacent candies and create matches of 3 or more identical candies.',
        createdAt: '2024-01-15',
        lastUpdated: '2024-01-15',
        gameUrl: '/games/candy-crush/index.html',
        isExternal: true,
        externalUrl: 'http://game.webxinxin.com/candy/'
      },
      'bike-racing': {
        id: 'bike-racing',
        name: 'Bike Racing',
        description: 'Experience thrilling motorcycle racing with realistic physics and challenging tracks. Race through different environments and compete for the best times.',
        fullDescription: `<p>Bike Racing is an adrenaline-pumping motorcycle racing game that puts you in control of powerful bikes on challenging tracks.</p>
          <p>Experience the thrill of high-speed racing with realistic physics, stunning environments, and competitive gameplay that will test your racing skills to the limit.</p>
          <h3>Game Features:</h3>
          <ul>
            <li>Realistic motorcycle physics and handling</li>
            <li>Multiple challenging tracks and environments</li>
            <li>High-speed racing action</li>
            <li>Competitive time-based challenges</li>
            <li>Smooth controls optimized for web browsers</li>
            <li>Stunning graphics and immersive sound effects</li>
          </ul>
          <h3>How to Play:</h3>
          <ul>
            <li>Use arrow keys or WASD to control your bike</li>
            <li>Balance carefully to avoid crashes</li>
            <li>Maintain speed while navigating obstacles</li>
            <li>Complete tracks in the shortest time possible</li>
            <li>Master different terrains and weather conditions</li>
          </ul>
          <p>Get ready for the ultimate motorcycle racing experience!</p>`,
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><defs><linearGradient id="bikeBg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%231e3c72;stop-opacity:1" /><stop offset="50%" style="stop-color:%232a5298;stop-opacity:1" /><stop offset="100%" style="stop-color:%23ff6b35;stop-opacity:1" /></linearGradient></defs><rect width="300" height="200" fill="url(%23bikeBg)"/><circle cx="60" cy="120" r="20" fill="white" opacity="0.8"/><circle cx="240" cy="80" r="15" fill="white" opacity="0.6"/><circle cx="80" cy="60" r="12" fill="white" opacity="0.7"/><text x="150" y="85" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="white" text-anchor="middle">🏍️</text><text x="150" y="115" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="white" text-anchor="middle">Bike Racing</text><text x="150" y="140" font-family="Arial, sans-serif" font-size="14" fill="white" text-anchor="middle">Racing Adventure</text></svg>',
        screenshots: [],
        tags: ['Sports', 'Racing', 'Action'],
        author: 'WebXinXin Games',
        version: '1.0.0',
        controls: 'Use arrow keys or WASD to control your bike. Balance carefully to avoid crashes and maintain speed.',
        createdAt: '2024-01-15',
        lastUpdated: '2024-01-15',
        gameUrl: '/games/bike-racing/index.html',
        isExternal: true,
        externalUrl: 'http://game.webxinxin.com/bike'
      },
      'rpg-demo': {
        id: 'rpg-demo',
        name: 'RPG Demo',
        description: 'Embark on an epic role-playing adventure with classic RPG elements. Explore worlds, battle monsters, and level up your character in this engaging demo.',
        fullDescription: `<p>RPG Demo is an immersive role-playing game that brings classic RPG elements to your browser.</p>
          <p>Embark on an epic adventure through fantastical worlds, battle fearsome monsters, level up your character, and experience the depth and excitement of traditional RPG gameplay.</p>
          <h3>Game Features:</h3>
          <ul>
            <li>Classic RPG gameplay with modern touches</li>
            <li>Character progression and leveling system</li>
            <li>Epic battles against monsters and bosses</li>
            <li>Immersive storyline and world exploration</li>
            <li>Inventory management and equipment system</li>
            <li>Strategic combat mechanics</li>
          </ul>
          <h3>How to Play:</h3>
          <ul>
            <li>Use arrow keys or WASD to move your character</li>
            <li>Click on interface elements to interact</li>
            <li>Engage in battles with monsters</li>
            <li>Manage your inventory and equipment</li>
            <li>Level up your character to become stronger</li>
            <li>Explore the world and complete quests</li>
          </ul>
          <p>Begin your legendary adventure and become the hero of your own story!</p>`,
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><defs><linearGradient id="rpgBg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%232c1810;stop-opacity:1" /><stop offset="30%" style="stop-color:%238b4513;stop-opacity:1" /><stop offset="70%" style="stop-color:%23daa520;stop-opacity:1" /><stop offset="100%" style="stop-color:%23ffd700;stop-opacity:1" /></linearGradient></defs><rect width="300" height="200" fill="url(%23rpgBg)"/><circle cx="70" cy="70" r="18" fill="white" opacity="0.7"/><circle cx="230" cy="60" r="15" fill="white" opacity="0.6"/><circle cx="80" cy="150" r="12" fill="white" opacity="0.8"/><circle cx="220" cy="140" r="20" fill="white" opacity="0.5"/><text x="150" y="85" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="white" text-anchor="middle">⚔️</text><text x="150" y="115" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="white" text-anchor="middle">RPG Demo</text><text x="150" y="140" font-family="Arial, sans-serif" font-size="14" fill="white" text-anchor="middle">Epic Adventure</text></svg>',
        screenshots: [],
        tags: ['Adventure', 'Fantasy', 'Strategy'],
        author: 'WebXinXin Games',
        version: '1.0.0',
        controls: 'Use arrow keys or WASD to move your character. Click on interface elements to interact, battle, and manage your inventory.',
        createdAt: '2024-01-15',
        lastUpdated: '2024-01-15',
        gameUrl: '/games/rpg-demo/index.html',
        isExternal: true,
        externalUrl: 'http://game.webxinxin.com/rpgdemo/'
      },
      'circle-path': {
        id: 'circle-path',
        name: 'Circle Path',
        description: 'Navigate through circular paths in this challenging arcade game. Test your timing and precision as you guide your character through rotating obstacles and pathways.',
        fullDescription: `<p>Circle Path is a challenging arcade game that tests your timing, precision, and reflexes.</p>
          <p>Navigate through intricate circular paths and rotating obstacles in this mesmerizing game that combines simple controls with increasingly complex challenges.</p>
          <h3>Game Features:</h3>
          <ul>
            <li>Unique circular path navigation mechanics</li>
            <li>Progressively challenging levels</li>
            <li>Smooth and responsive controls</li>
            <li>Beautiful geometric visual design</li>
            <li>Addictive gameplay that's easy to learn</li>
            <li>Perfect for quick gaming sessions</li>
          </ul>
          <h3>How to Play:</h3>
          <ul>
            <li>Click or tap to change direction</li>
            <li>Navigate through circular paths carefully</li>
            <li>Time your moves to avoid obstacles</li>
            <li>Follow the path without hitting walls</li>
            <li>Complete levels to unlock new challenges</li>
          </ul>
          <p>Test your precision and timing in this captivating circular adventure!</p>`,
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><defs><radialGradient id="circleBg" cx="50%" cy="50%" r="50%"><stop offset="0%" style="stop-color:%23667eea;stop-opacity:1" /><stop offset="50%" style="stop-color:%23764ba2;stop-opacity:1" /><stop offset="100%" style="stop-color:%23f093fb;stop-opacity:1" /></radialGradient></defs><rect width="300" height="200" fill="url(%23circleBg)"/><circle cx="150" cy="100" r="60" fill="none" stroke="white" stroke-width="3" opacity="0.8"/><circle cx="150" cy="100" r="40" fill="none" stroke="white" stroke-width="2" opacity="0.6"/><circle cx="150" cy="100" r="20" fill="none" stroke="white" stroke-width="2" opacity="0.7"/><text x="150" y="85" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="white" text-anchor="middle">⭕</text><text x="150" y="115" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="white" text-anchor="middle">Circle Path</text><text x="150" y="140" font-family="Arial, sans-serif" font-size="14" fill="white" text-anchor="middle">Navigate Circles</text></svg>',
        screenshots: [],
        tags: ['Arcade', 'Casual', 'Action'],
        author: 'WebXinXin Games',
        version: '1.0.0',
        controls: 'Click or tap to change direction and navigate through the circular paths. Time your moves carefully to avoid obstacles.',
        createdAt: '2024-01-15',
        lastUpdated: '2024-01-15',
        gameUrl: '/games/circle-path/index.html',
        isExternal: true,
        externalUrl: 'http://game.webxinxin.com/circlepath/'
      },
      'endless-run': {
        id: 'endless-run',
        name: 'Endless Run',
        description: 'Run as far as you can in this exciting endless running adventure! Jump over obstacles, collect coins, and beat your high score in this fast-paced arcade game.',
        fullDescription: `<p>Endless Run is an exhilarating endless running game that challenges you to run as far as possible while avoiding obstacles and collecting rewards.</p>
          <p>Experience fast-paced arcade action with smooth controls, challenging obstacles, and addictive gameplay that will keep you coming back to beat your high score.</p>
          <h3>Game Features:</h3>
          <ul>
            <li>Endless running gameplay with increasing difficulty</li>
            <li>Smooth and responsive jump controls</li>
            <li>Collectible coins and power-ups</li>
            <li>High score tracking and achievements</li>
            <li>Challenging obstacles and terrain variations</li>
            <li>Fast-paced arcade action</li>
          </ul>
          <h3>How to Play:</h3>
          <ul>
            <li>Use spacebar or click to jump over obstacles</li>
            <li>Collect coins to boost your score</li>
            <li>Avoid hitting obstacles to keep running</li>
            <li>Time your jumps perfectly for maximum distance</li>
            <li>Collect power-ups for special abilities</li>
            <li>Challenge yourself to beat your high score</li>
          </ul>
          <p>Start running and see how far you can go in this endless adventure!</p>`,
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><defs><linearGradient id="runBg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23667eea;stop-opacity:1" /><stop offset="25%" style="stop-color:%23764ba2;stop-opacity:1" /><stop offset="50%" style="stop-color:%23f093fb;stop-opacity:1" /><stop offset="75%" style="stop-color:%23f5576c;stop-opacity:1" /><stop offset="100%" style="stop-color:%234facfe;stop-opacity:1" /></linearGradient></defs><rect width="300" height="200" fill="url(%23runBg)"/><circle cx="60" cy="80" r="15" fill="white" opacity="0.7"/><circle cx="240" cy="120" r="12" fill="white" opacity="0.6"/><circle cx="80" cy="160" r="18" fill="white" opacity="0.8"/><circle cx="220" cy="60" r="10" fill="white" opacity="0.5"/><text x="150" y="85" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="white" text-anchor="middle">🏃</text><text x="150" y="115" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="white" text-anchor="middle">Endless Run</text><text x="150" y="140" font-family="Arial, sans-serif" font-size="14" fill="white" text-anchor="middle">Running Adventure</text></svg>',
        screenshots: [],
        tags: ['Action', 'Arcade', 'Running', 'Casual'],
        author: 'WebXinXin Games',
        version: '1.0.0',
        controls: 'Use spacebar or click to jump over obstacles. Collect coins and power-ups to boost your score and keep running!',
        createdAt: '2024-01-15',
        lastUpdated: '2024-01-15',
        gameUrl: '/games/endless-run/index.html',
        isExternal: true,
        externalUrl: 'http://game.webxinxin.com/run/'
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