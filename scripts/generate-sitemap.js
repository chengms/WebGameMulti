import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 游戏集合映射
const GAME_COLLECTIONS = {
  'popular-puzzle-games': {
    title: 'Popular Puzzle Games Collection',
    description: 'The most popular puzzle games that challenge your mind'
  },
  'relaxing-casual-games': {
    title: 'Relaxing Casual Games Collection', 
    description: 'Perfect games for unwinding and stress relief'
  },
  'classic-arcade-games': {
    title: 'Classic Arcade Games Collection',
    description: 'Timeless arcade games that never go out of style'
  },
  'brain-training-games': {
    title: 'Brain Training Games Collection',
    description: 'Games designed to enhance cognitive abilities and mental agility'
  },
  'quick-play-games': {
    title: 'Quick Play Games Collection',
    description: 'Games you can enjoy in short breaks, perfect for busy schedules'
  }
};

// 游戏攻略映射
const GAME_GUIDES = {
  '2048': {
    title: '2048 Game Strategy Guide',
    description: 'Master the 2048 puzzle game with advanced strategies and tips'
  },
  'tetris': {
    title: 'Tetris Mastery Guide',
    description: 'Complete guide to becoming a Tetris expert'
  },
  'snake': {
    title: 'Snake Game Strategy Guide', 
    description: 'Tips and tricks to achieve high scores in the classic Snake game'
  },
  'pacman': {
    title: 'Pac-Man Strategy Guide',
    description: 'Advanced strategies for mastering the classic Pac-Man game'
  },
  'memory-match': {
    title: 'Memory Match Game Guide',
    description: 'Techniques to improve your memory and match cards faster'
  }
};

// 获取游戏列表
function getGamesList() {
  const gamesDir = path.join(__dirname, '../games');
  const games = [];
  
  try {
    const gameDirectories = fs.readdirSync(gamesDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    for (const gameId of gameDirectories) {
      const metaPath = path.join(gamesDir, gameId, 'meta.json');
      let gameData = {
        id: gameId,
        name: gameId.charAt(0).toUpperCase() + gameId.slice(1),
        description: `Play ${gameId} online for free`,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      
      // 尝试读取meta.json文件
      if (fs.existsSync(metaPath)) {
        try {
          const metaContent = fs.readFileSync(metaPath, 'utf8');
          const meta = JSON.parse(metaContent);
          gameData = {
            ...gameData,
            name: meta.name || gameData.name,
            description: meta.description || gameData.description,
            lastUpdated: meta.lastUpdated || meta.updatedAt || gameData.lastUpdated
          };
        } catch (error) {
          console.warn(`Warning: Could not parse meta.json for game ${gameId}:`, error.message);
        }
      }
      
      games.push(gameData);
    }
  } catch (error) {
    console.warn('Warning: Could not read games directory:', error.message);
    // 返回默认游戏列表
    return [
      { id: 'snake', name: 'Snake', description: 'Classic snake game', lastUpdated: '2024-01-01' },
      { id: 'tetris', name: 'Tetris', description: 'Classic Tetris puzzle', lastUpdated: '2024-01-01' },
      { id: '2048', name: '2048', description: 'Number puzzle game', lastUpdated: '2024-01-01' },
      { id: 'memory-match', name: 'Memory Match', description: 'Memory card game', lastUpdated: '2024-01-01' },
      { id: 'tic-tac-toe', name: 'Tic Tac Toe', description: 'Classic tic-tac-toe', lastUpdated: '2024-01-01' }
    ];
  }
  
  return games;
}

// 生成XML sitemap
function generateSitemap(games = []) {
  const baseUrl = 'https://gametime.bar';
  const now = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- Main Pages -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/settings</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  
  <!-- Guides Main Page -->
  <url>
    <loc>${baseUrl}/guides</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;

  // 添加游戏页面
  games.forEach(game => {
    const gameUrl = `${baseUrl}/games/${game.id}`;
    const imageUrl = `${baseUrl}/games/${game.id}/image/cover.png`;
    
    sitemap += `
  <!-- Game: ${game.name} -->
  <url>
    <loc>${gameUrl}</loc>
    <lastmod>${game.lastUpdated || now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:title>${game.name} - Free Online Game</image:title>
      <image:caption>${game.description}</image:caption>
    </image:image>
  </url>`;
  });

  // 添加游戏攻略页面
  Object.entries(GAME_GUIDES).forEach(([gameId, guide]) => {
    sitemap += `
  <!-- Game Guide: ${guide.title} -->
  <url>
    <loc>${baseUrl}/guides/${gameId}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  // 添加游戏集合页面
  Object.entries(GAME_COLLECTIONS).forEach(([collectionId, collection]) => {
    sitemap += `
  <!-- Game Collection: ${collection.title} -->
  <url>
    <loc>${baseUrl}/collections/${collectionId}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
}

// 生成robots.txt
function generateRobotsTxt() {
  const baseUrl = 'https://gametime.bar';
  
  return `# Robots.txt for GameTime Bar
# Generated on ${new Date().toISOString()}

User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Optimize crawling
Crawl-delay: 1

# Allow indexing of games and guides
Allow: /games/
Allow: /guides/
Allow: /collections/

# Disallow admin or development paths (if any exist in future)
Disallow: /admin/
Disallow: /dev/
Disallow: /.git/
Disallow: /node_modules/

# Allow common web assets
Allow: *.css
Allow: *.js
Allow: *.png
Allow: *.jpg
Allow: *.jpeg
Allow: *.gif
Allow: *.svg
Allow: *.ico
Allow: *.woff
Allow: *.woff2
Allow: *.ttf
Allow: *.eot

# Popular search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

# Social media crawlers
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot  
Allow: /

User-agent: LinkedInBot
Allow: /

# Game-specific crawlers (if any)
User-agent: *
Allow: /games/*/meta.json
Allow: /games/*/image/`;
}

// 主函数
function main() {
  try {
    console.log('🚀 Starting sitemap generation...');
    
    // 获取游戏列表
    console.log('📂 Reading games directory...');
    const games = getGamesList();
    console.log(`✅ Found ${games.length} games`);
    
    // 生成sitemap
    console.log('🗺️ Generating sitemap...');
    const sitemapContent = generateSitemap(games);
    
    // 生成robots.txt
    console.log('🤖 Generating robots.txt...');
    const robotsContent = generateRobotsTxt();
    
    // 确保public目录存在
    const publicDir = path.join(__dirname, '../public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    // 写入sitemap文件
    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
    console.log(`✅ Sitemap written to: ${sitemapPath}`);
    
    // 写入robots.txt文件
    const robotsPath = path.join(publicDir, 'robots.txt');
    fs.writeFileSync(robotsPath, robotsContent, 'utf8');
    console.log(`✅ Robots.txt written to: ${robotsPath}`);
    
    // 显示统计信息
    const stats = {
      totalUrls: games.length + Object.keys(GAME_GUIDES).length + Object.keys(GAME_COLLECTIONS).length + 4,
      gameUrls: games.length,
      guideUrls: Object.keys(GAME_GUIDES).length,
      collectionUrls: Object.keys(GAME_COLLECTIONS).length,
      mainPages: 4,
      fileSize: Buffer.byteLength(sitemapContent, 'utf8')
    };
    
    console.log('\n📊 Generation completed successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📄 Total URLs: ${stats.totalUrls}`);
    console.log(`🎮 Game pages: ${stats.gameUrls}`);
    console.log(`📖 Guide pages: ${stats.guideUrls}`);
    console.log(`📚 Collection pages: ${stats.collectionUrls}`);
    console.log(`🏠 Main pages: ${stats.mainPages}`);
    console.log(`📏 Sitemap size: ${(stats.fileSize / 1024).toFixed(2)} KB`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('🌐 Files generated:');
    console.log(`   • ${sitemapPath}`);
    console.log(`   • ${robotsPath}`);
    console.log('');
    console.log('🚀 Upload these files to your web server root directory');
    console.log('📡 Submit sitemap to search engines:');
    console.log('   • Google Search Console: https://search.google.com/search-console');
    console.log('   • Bing Webmaster Tools: https://www.bing.com/webmasters');
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

// 运行脚本
main();

export {
  generateSitemap,
  generateRobotsTxt,
  getGamesList,
  GAME_COLLECTIONS,
  GAME_GUIDES
}; 