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
async function scrapeCrazyCattle3D(html, baseUrl) {
    const $ = cheerio.load(html);
    const games = [];
    // 选择所有指向游戏页面的链接
    const gameLinks = $('a[href*="/crazy-cow-3d"], a[href*="/cheese-chompers-3d"], a[href*="/brainrot-clicker"], a[href*="/basketball-bros-unblocked"], a[href*="/pokemon-gamma-emerald"], a[href*="/crazy-chicken-3d"], a[href*="/sprunki-incredibox"], a[href*="/speed-stars"]');

    console.log(`Found ${gameLinks.length} potential games on CrazyCattle-3D.info. Fetching details...`);

    for (const element of gameLinks.get()) {
        const link = $(element);
        const pageUrl = new URL(link.attr('href'), baseUrl).toString();
        const name = link.find('h2').text().trim() || link.attr('title') || 'Unknown Game';
        
        try {
            console.log(`  Scraping details from: ${pageUrl}`);
            const detailHtml = await getHTML(pageUrl);
            if (!detailHtml) continue;

            const $$ = cheerio.load(detailHtml);
            // 寻找游戏 iframe，这是关键一步
            const gameIframe = $$('iframe[src*="embed"], iframe[src*="game"], iframe#game-iframe');
            
            let gameUrl = pageUrl; // 默认使用页面URL
            if (gameIframe.length > 0) {
                const embedSrc = gameIframe.attr('src');
                if (embedSrc) {
                    gameUrl = new URL(embedSrc, baseUrl).toString();
                    console.log(`    Found direct game embed URL: ${gameUrl}`);
                }
            } else {
                console.log(`    Could not find a direct game iframe, using page URL as fallback.`);
            }

            const thumbnail = $$('meta[property="og:image"]').attr('content') || link.find('img').attr('src');
            const description = $$('meta[property="og:description"]').attr('content') || `Play ${name} online.`;

            games.push({
                id: name.toLowerCase().replace(/\\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
                name: name,
                description: description,
                url: gameUrl, // 使用找到的直接链接
                thumbnail: new URL(thumbnail, baseUrl).toString(),
            });

        } catch (error) {
            console.error(`  Failed to scrape details for ${name}: ${error.message}`);
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