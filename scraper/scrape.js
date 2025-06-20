import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

// =================================================================================
// 配置区域
// =================================================================================

const TARGET_SITES = [
    {
        name: 'HTML5Games.com',
        url: 'https://html5games.com/',
        scraper: scrapeHtml5Games,
    },
    {
        name: 'CrazyCattle-3D.info',
        url: 'https://www.crazycattle-3d.info/',
        scraper: scrapeCrazyCattle3D,
    },
];

const DEFAULT_AUTHOR_MAP = {
    'HTML5Games.com': 'HTML5Games',
};

const DEFAULT_PRIORITY = 20;

// =================================================================================
// 核心抓取逻辑
// =================================================================================

/**
 * 获取网页的HTML内容
 * @param {string} url - 目标网页URL
 * @returns {Promise<string>} - 返回网页的HTML字符串
 */
async function getHTML(url) {
    try {
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        return data;
    } catch (error) {
        console.error(`❌ Error fetching URL ${url}:`, error.message);
        return null;
    }
}

/**
 * 将游戏名转换为ID (例如: "Om Nom Run" -> "om-nom-run")
 * @param {string} name - 游戏名称
 * @returns {string} - 格式化后的ID
 */
function generateId(name) {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

/**
 * 格式化抓取到的数据为配置文件行
 * @param {object} gameData - 包含游戏信息的对象
 * @returns {string} - 符合 games-config.txt 格式的单行文本
 */
function formatToConfigLine(gameData) {
    const {
        id,
        name,
        description: rawDescription = 'An exciting new online game.',
        type = 'online',
        url,
        thumbnail,
        localThumbnail = '/placeholder-game.png',
        tags = 'Online,New',
        author = 'Various',
        priority = DEFAULT_PRIORITY
    } = gameData;

    // 清理描述文本：移除换行符和'|'分隔符，确保是单行
    const description = rawDescription
        .replace(/(\r\n|\n|\r)/gm, " ") // 将所有类型的换行符替换为空格
        .replace(/\|/g, '')             // 移除'|'字符，防止破坏格式
        .trim();                        // 移除前后多余的空格

    return [
        id, name, description, type, url, thumbnail, localThumbnail,
        Array.isArray(tags) ? tags.join(',') : tags,
        author, priority
    ].join('|');
}


// =================================================================================
// 网站专属抓取函数
// =================================================================================

/**
 * Scraper for HTML5Games.com
 * @param {string} html - The HTML content of the page
 * @param {string} baseUrl - The base URL of the site
 * @returns {Array<object>} - An array of game data objects
 */
function scrapeHtml5Games(html, baseUrl) {
    const $ = cheerio.load(html);
    const games = [];
    // A more robust selector for game items
    $('div.item a.teaser').each((i, el) => {
        const link = $(el);
        const name = link.attr('title');
        const url = link.attr('href');
        const img = link.find('img.teaser-img');
        
        if (name && url) {
            games.push({
                id: generateId(name),
                name: name,
                description: `Play ${name} online, an exciting game from HTML5Games.`,
                url: new URL(url, baseUrl).toString(),
                thumbnail: new URL(img.attr('data-src') || img.attr('src'), baseUrl).toString(),
                author: 'HTML5Games.com',
                tags: ['Online', 'Arcade']
            });
        }
    });
    return games;
}

/**
 * Scraper for CrazyCattle-3D.info
 * @param {string} html - The HTML content of the page
 * @param {string} baseUrl - The base URL of the site
 * @returns {Array<object>} - An array of game data objects
 */
async function scrapeCrazyCattle3D(html, baseUrl) {
    const $ = cheerio.load(html);
    const games = [];
    // Target the specific section for "Hot Games" to avoid duplicates
    const gameLinks = new Set(); // Use a Set to automatically handle duplicate URLs

    $('h2:contains("Hot Games")').next('div').find('a').each((i, el) => {
        gameLinks.add($(el).attr('href'));
    });

    console.log(`Found ${gameLinks.size} unique games on CrazyCattle-3D.info.`);

    for (const pagePath of gameLinks) {
        try {
            const pageUrl = new URL(pagePath, baseUrl).toString();
            // Directly construct the embed URL based on the user's provided pattern
            const gameUrl = `${pageUrl}.embed`;
            
            // Fetch the detail page to get accurate metadata
            const detailHtml = await getHTML(pageUrl);
            if (!detailHtml) continue;
            
            const $$ = cheerio.load(detailHtml);
            const name = $$('h1').first().text().trim() || 'Unknown Game';
            const description = $$('meta[name="description"]').attr('content') || `Play ${name} online.`;
            const thumbnail = $$('meta[property="og:image"]').attr('content');

            if (name !== 'Unknown Game') {
                 games.push({
                    id: generateId(name),
                    name: name,
                    description: description,
                    url: gameUrl, // Use the direct embed URL
                    thumbnail: new URL(thumbnail, baseUrl).toString(),
                    author: 'CrazyCattle3D Team',
                    tags: ['Online', '3D', 'Hot']
                });
            }
        } catch (error) {
            console.error(`  Failed to scrape details for ${pagePath}: ${error.message}`);
        }
    }

    return games;
}


// =================================================================================
// 主函数
// =================================================================================

(async () => {
    console.log('🚀 Starting game scraper...');
    
    let allGeneratedLines = [];

    for (const site of TARGET_SITES) {
        console.log(`\n--- Scraping ${site.name} ---`);
        const html = await getHTML(site.url);
        if (html) {
            try {
                const results = await site.scraper(html, site.url);
                
                if (results && results.length > 0) {
                    allGeneratedLines.push(`# === Games from ${site.name} ===`);
                    const formattedLines = results.map(formatToConfigLine);
                    allGeneratedLines.push(...formattedLines);
                    console.log(`✅ Scraped ${results.length} games from ${site.name}`);
                } else {
                    console.log(`🟡 No games found on ${site.name}.`);
                }
            } catch (error) {
                console.error(`❌ Error scraping ${site.name}:`, error.message);
            }
        }
    }

    console.log('\n\n================================================================');
    console.log('🎉 Scraping complete!');
    console.log('================================================================\n');
    
    if (allGeneratedLines.length > 0) {
        const outputContent = allGeneratedLines.join('\n');
        const outputPath = path.join(process.cwd(), 'scraped-output.txt');
        
        try {
            fs.writeFileSync(outputPath, outputContent);
            console.log(`✅ Results successfully written to: ${outputPath}`);
            console.log('\nYou can now copy the content from that file to your main games-config.txt');
        } catch (error) {
            console.error(`❌ Error writing to file: ${error.message}`);
            console.log('\n--- Scraper Output ---');
            console.log(outputContent); // Fallback to console output
        }
    } else {
        console.log('No game data was generated.');
    }

    console.log('\n================================================================\n');
})(); 