/**
 * XML Sitemap Generator for GameTime Bar
 * Generates comprehensive sitemap including games, guides, and collections
 */

// Game collections mapping
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

// Game guides mapping
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

/**
 * Generate XML sitemap for all pages
 * @param {Array} games - Array of game objects
 * @returns {string} Complete XML sitemap
 */
export const generateSitemap = (games = []) => {
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

  // Add individual game pages
  games.forEach(game => {
    const gameUrl = `${baseUrl}/games/${game.id}`;
    const imageUrl = game.thumbnail 
      ? `${baseUrl}/games/${game.id}/${game.thumbnail}`
      : `${baseUrl}/games/${game.id}/image/cover.png`;
    
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

  // Add game guide pages
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

  // Add game collection pages
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
};

/**
 * Generate robots.txt content
 * @returns {string} robots.txt content
 */
export const generateRobotsTxt = () => {
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
};

/**
 * Generate advanced sitemap with additional metadata
 * @param {Array} games - Array of game objects
 * @returns {string} Advanced XML sitemap with news and mobile annotations
 */
export const generateAdvancedSitemap = (games = []) => {
  const baseUrl = 'https://gametime.bar';
  const now = new Date().toISOString();
  const dateOnly = now.split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">

  <!-- Homepage with mobile annotation -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <mobile:mobile/>
    <xhtml:link rel="alternate" media="only screen and (max-width: 640px)" href="${baseUrl}/" />
  </url>`;

  // Add games with rich metadata
  games.forEach(game => {
    const gameUrl = `${baseUrl}/games/${game.id}`;
    const imageUrl = game.thumbnail 
      ? `${baseUrl}/games/${game.id}/${game.thumbnail}`
      : `${baseUrl}/games/${game.id}/image/cover.png`;
    
    sitemap += `
  <url>
    <loc>${gameUrl}</loc>
    <lastmod>${game.lastUpdated || dateOnly}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <mobile:mobile/>
    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:title>${game.name} - Play Free Online</image:title>
      <image:caption>${game.description} | GameTime Bar</image:caption>
      <image:geo_location>Global</image:geo_location>
      <image:license>${baseUrl}/</image:license>
    </image:image>
  </url>`;
  });

  // Add guides with news annotation (for recent guides)
  Object.entries(GAME_GUIDES).forEach(([gameId, guide]) => {
    sitemap += `
  <url>
    <loc>${baseUrl}/guides/${gameId}</loc>
    <lastmod>${dateOnly}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <mobile:mobile/>
    <news:news>
      <news:publication>
        <news:name>GameTime Bar</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${now}</news:publication_date>
      <news:title>${guide.title}</news:title>
      <news:keywords>gaming guide, strategy, tips, ${gameId}</news:keywords>
    </news:news>
  </url>`;
  });

  // Add collections
  Object.entries(GAME_COLLECTIONS).forEach(([collectionId, collection]) => {
    sitemap += `
  <url>
    <loc>${baseUrl}/collections/${collectionId}</loc>
    <lastmod>${dateOnly}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
    <mobile:mobile/>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
};

/**
 * Download sitemap as file
 * @param {string} sitemapContent - XML sitemap content
 * @param {string} filename - Filename for download
 */
export const downloadSitemap = (sitemapContent, filename = 'sitemap.xml') => {
  const blob = new Blob([sitemapContent], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Generate sitemap index for large sites
 * @returns {string} Sitemap index XML
 */
export const generateSitemapIndex = () => {
  const baseUrl = 'https://gametime.bar';
  const now = new Date().toISOString().split('T')[0];
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap-main.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-games.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-guides.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-collections.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
</sitemapindex>`;
};

/**
 * Validate sitemap XML
 * @param {string} sitemapXml - XML sitemap content
 * @returns {Object} Validation result
 */
export const validateSitemap = (sitemapXml) => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(sitemapXml, 'text/xml');
    
    // Check for parsing errors
    const parseError = xmlDoc.getElementsByTagName('parsererror');
    if (parseError.length > 0) {
      return {
        valid: false,
        error: 'XML parsing error',
        details: parseError[0].textContent
      };
    }
    
    // Count URLs
    const urls = xmlDoc.getElementsByTagName('url');
    const sitemaps = xmlDoc.getElementsByTagName('sitemap');
    
    return {
      valid: true,
      urlCount: urls.length,
      sitemapCount: sitemaps.length,
      size: new Blob([sitemapXml]).size,
      maxSize: 50 * 1024 * 1024, // 50MB limit
      maxUrls: 50000 // 50K URL limit
    };
  } catch (error) {
    return {
      valid: false,
      error: 'Validation failed',
      details: error.message
    };
  }
};

export default {
  generateSitemap,
  generateRobotsTxt,
  generateAdvancedSitemap,
  downloadSitemap,
  generateSitemapIndex,
  validateSitemap,
  GAME_COLLECTIONS,
  GAME_GUIDES
}; 