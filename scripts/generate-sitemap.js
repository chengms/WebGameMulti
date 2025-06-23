import fs from 'fs';
import path from 'path';

// 配置
const DOMAIN = 'https://gametime.bar';
const OUTPUT_FILE = 'public/sitemap.xml';
const GAMES_CONFIG_FILE = 'games/games-config.txt';

/**
 * 读取游戏配置文件并解析游戏ID
 * @returns {Array} 游戏ID数组
 */
function parseGamesConfig() {
    try {
        const configContent = fs.readFileSync(GAMES_CONFIG_FILE, 'utf-8');
        const lines = configContent.split('\n');
        const gameIds = [];

        for (const line of lines) {
            const trimmedLine = line.trim();
            // 跳过注释行和空行
            if (trimmedLine.startsWith('#') || trimmedLine === '') {
                continue;
            }

            // 解析游戏配置行 (格式: ID|Name|Description|...)
            const parts = trimmedLine.split('|');
            if (parts.length >= 2) {
                const gameId = parts[0].trim();
                if (gameId) {
                    gameIds.push(gameId);
                }
            }
        }

        return gameIds;
    } catch (error) {
        console.error('❌ Error reading games config:', error.message);
        return [];
    }
}

/**
 * 生成sitemap.xml内容
 * @param {Array} gameIds 游戏ID数组
 * @returns {string} sitemap XML内容
 */
function generateSitemapXML(gameIds) {
    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD格式

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

  <!-- Main Pages -->
  <url>
    <loc>${DOMAIN}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <url>
    <loc>${DOMAIN}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${DOMAIN}/settings</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

  <!-- Game Pages -->
`;

    // 添加所有游戏页面
    for (const gameId of gameIds) {
        // 根据游戏类型设置不同的优先级
        let priority = '0.8';
        
        // 经典游戏设置更高优先级
        const classicGames = ['snake', 'tetris', '2048', 'pacman', 'pokemon-gamma-emerald', 'temple-run-2'];
        if (classicGames.includes(gameId)) {
            priority = '0.9';
        }

        xml += `  <url>
    <loc>${DOMAIN}/games/${gameId}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>

`;
    }

    xml += `</urlset>`;
    return xml;
}

/**
 * 主函数
 */
function main() {
    console.log('🗺️  Generating sitemap.xml for GameTime Bar...');

    // 解析游戏配置
    const gameIds = parseGamesConfig();
    console.log(`📋 Found ${gameIds.length} games`);

    if (gameIds.length === 0) {
        console.log('⚠️  No games found, generating basic sitemap');
    }

    // 生成sitemap XML
    const sitemapXML = generateSitemapXML(gameIds);

    // 写入文件
    try {
        fs.writeFileSync(OUTPUT_FILE, sitemapXML, 'utf-8');
        console.log(`✅ Sitemap generated successfully: ${OUTPUT_FILE}`);
        console.log(`🌐 Domain: ${DOMAIN}`);
        console.log(`📄 Total URLs: ${gameIds.length + 3} (3 main pages + ${gameIds.length} games)`);
    } catch (error) {
        console.error('❌ Error writing sitemap file:', error.message);
        process.exit(1);
    }

    console.log('\n🎯 SEO Tips:');
    console.log('1. Submit sitemap to Google Search Console: https://search.google.com/search-console');
    console.log('2. Submit sitemap to Bing Webmaster Tools: https://www.bing.com/webmasters');
    console.log('3. Verify robots.txt is accessible: https://gametime.bar/robots.txt');
    console.log('4. Re-run this script whenever you add new games');
}

// 运行脚本
if (import.meta.url === `file://${process.argv[1]}`) {
    main();
} 