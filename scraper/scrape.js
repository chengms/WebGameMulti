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
 * 抓取 HTML5Games.com 的游戏
 * @param {string} html - 网页HTML内容
 * @param {string} baseUrl - 网站的基础URL
 * @returns {Array<string>} - 格式化后的配置行数组
 */
function scrapeHtml5Games(html, baseUrl) {
    const $ = cheerio.load(html);
    const games = [];
    
    // 假设游戏都在带有特定class的链接中，这里我们尝试几种可能的选择器
    // 根据搜索结果，游戏分布在 "Best" 和 "New" 区域
    $('h2:contains("Best")').nextUntil('h2').find('a').each((i, el) => {
        const gameName = $(el).text().trim();
        if (!gameName) return;

        const gameUrl = new URL($(el).attr('href'), baseUrl).href;
        // 假设图片是链接内的第一个img元素
        const thumbnailUrl = new URL($(el).find('img').attr('src'), baseUrl).href;

        games.push({
            id: generateId(gameName),
            name: gameName,
            description: `Play ${gameName} online, an exciting game from HTML5Games.`,
            url: gameUrl,
            thumbnail: thumbnailUrl,
            author: 'HTML5Games.com',
            tags: ['Online', 'Arcade']
        });
    });

    console.log(`✅ Scraped ${games.length} games from HTML5Games.com`);
    return games.map(formatToConfigLine);
}

/**
 * 抓取 CrazyCattle-3D.info 的游戏
 * @param {string} html - 网页HTML内容
 * @param {string} baseUrl - 网站的基础URL
 * @returns {Array<string>} - 格式化后的配置行数组
 */
function scrapeCrazyCattle3D(html, baseUrl) {
    const $ = cheerio.load(html);
    const games = [];

    // 1. 抓取主游戏 "Crazy Cattle 3D"
    const mainGameName = $('h1').first().text().trim() || 'Crazy Cattle 3D';
    const mainGameDescription = $('h2:contains("Everything about")').next('p').text().trim();
    // 主游戏的图片可能是页面上的一个突出显示的图片
    const mainGameThumbnail = new URL($('img[alt*="Crazy Cattle 3D"]').first().attr('src'), baseUrl).href;

    games.push({
        id: generateId(mainGameName),
        name: mainGameName,
        description: mainGameDescription || `The official page for ${mainGameName}.`,
        url: baseUrl, // 游戏就在这个主页面上
        thumbnail: mainGameThumbnail,
        author: 'CrazyCattle3D Team',
        tags: ['Battle Royale', '3D', 'Physics']
    });

    // 2. 抓取 "Hot Games" 列表
    $('h2:contains("Hot Games")').nextAll().find('a').each((i, el) => {
        const gameName = $(el).attr('title') || $(el).text().trim();
        if (!gameName || gameName === mainGameName) return;
        
        const gameUrl = new URL($(el).attr('href'), baseUrl).href;
        const thumbnailUrl = new URL($(el).find('img').attr('src'), baseUrl).href;

        games.push({
            id: generateId(gameName),
            name: gameName,
            description: `Play ${gameName}, a popular game.`,
            url: gameUrl,
            thumbnail: thumbnailUrl,
            author: 'Various',
            tags: ['Online', 'Hot']
        });
    });

    console.log(`✅ Scraped ${games.length} games from CrazyCattle-3D.info`);
    return games.map(formatToConfigLine);
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
                const results = site.scraper(html, site.url);
                if (results && results.length > 0) {
                    allGeneratedLines.push(`# === Games from ${site.name} ===`);
                    allGeneratedLines.push(...results);
                } else {
                    console.log(`🟡 No games found on ${site.name}.`);
                }
            } catch (e) {
                console.error(`❌ Error scraping ${site.name}: ${e.message}`);
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