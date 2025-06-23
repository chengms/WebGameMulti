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
    {
        name: 'SpeedStarsFree.github.io',
        url: 'https://speedstarsfree.github.io/',
        scraper: scrapeSpeedStarsFree,
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
 * Extract the actual Famobi game URL from HTML5games.com game detail page
 * @param {string} gamePageUrl - URL of the game detail page
 * @returns {Promise<string>} - The actual Famobi game URL
 */
async function extractFamobiUrl(gamePageUrl) {
    try {
        console.log(`  Extracting Famobi URL from: ${gamePageUrl}`);
        const html = await getHTML(gamePageUrl);
        if (!html) return gamePageUrl;
        
        const $ = cheerio.load(html);
        
        // Method 1: Look for direct famobi.com links in the page
        let famobiUrl = $('a[href*="play.famobi.com"]').attr('href');
        
        // Method 2: Look for the "Place the game link on your website!" section
        if (!famobiUrl) {
            const linkSection = $('h2:contains("Place the game link on your website!")').next();
            const linkText = linkSection.text();
            const famobiMatch = linkText.match(/https:\/\/play\.famobi\.com\/[^\s]+/);
            if (famobiMatch) {
                famobiUrl = famobiMatch[0];
            }
        }
        
        // Method 3: Extract from any text content containing famobi.com
        if (!famobiUrl) {
            const bodyText = $('body').text();
            const famobiMatch = bodyText.match(/https:\/\/play\.famobi\.com\/[^\s]+/);
            if (famobiMatch) {
                famobiUrl = famobiMatch[0];
            }
        }
        
        // Method 4: Construct URL based on game name pattern
        if (!famobiUrl) {
            const urlMatch = gamePageUrl.match(/\/Game\/([^\/]+)\//);
            if (urlMatch) {
                const gameName = urlMatch[1].toLowerCase().replace(/\s+/g, '-');
                famobiUrl = `https://play.famobi.com/wrapper/${gameName}/A1000-10`;
                console.log(`  Constructed Famobi URL: ${famobiUrl}`);
            }
        }
        
        // Convert famobi.com URLs to wrapper format if needed
        if (famobiUrl && famobiUrl.includes('play.famobi.com') && !famobiUrl.includes('/wrapper/')) {
            const gameNameMatch = famobiUrl.match(/play\.famobi\.com\/([^\/\?]+)/);
            if (gameNameMatch) {
                const gameName = gameNameMatch[1];
                famobiUrl = `https://play.famobi.com/wrapper/${gameName}/A1000-10`;
            }
        }
        
        return famobiUrl || gamePageUrl;
    } catch (error) {
        console.error(`  Error extracting Famobi URL from ${gamePageUrl}:`, error.message);
        return gamePageUrl;
    }
}

/**
 * Scraper for HTML5Games.com
 * @param {string} html - The HTML content of the page
 * @param {string} baseUrl - The base URL of the site
 * @returns {Array<object>} - An array of game data objects
 */
async function scrapeHtml5Games(html, baseUrl) {
    const $ = cheerio.load(html);
    const games = [];
    const gameLinks = new Set(); // Use Set to avoid duplicates
    
    // Try multiple selectors to find game links
    console.log('Trying different selectors to find game links...');
    
    // Method 1: Look for any links containing "/Game/"
    $('a[href*="/Game/"]').each((i, el) => {
        const url = $(el).attr('href');
        if (url) {
            gameLinks.add(new URL(url, baseUrl).toString());
        }
    });
    
    // Method 2: Look for links with game-related classes
    $('a.game, a.game-link, a.teaser').each((i, el) => {
        const url = $(el).attr('href');
        if (url && url.includes('/Game/')) {
            gameLinks.add(new URL(url, baseUrl).toString());
        }
    });
    
    // Method 3: Look in common container elements
    $('.game-item a, .item a, .game-card a').each((i, el) => {
        const url = $(el).attr('href');
        if (url && url.includes('/Game/')) {
            gameLinks.add(new URL(url, baseUrl).toString());
        }
    });
    
    // Method 4: Broad search for any link containing game names
    $('a').each((i, el) => {
        const url = $(el).attr('href');
        if (url && url.includes('/Game/') && url.includes('-')) {
            gameLinks.add(new URL(url, baseUrl).toString());
        }
    });
    
    console.log(`Found ${gameLinks.size} game links on HTML5Games.com`);
    
    // If still no links found, let's debug what's on the page
    if (gameLinks.size === 0) {
        console.log('No game links found. Debugging page structure...');
        console.log('All links found on page:');
        $('a').each((i, el) => {
            const url = $(el).attr('href');
            if (url && i < 10) { // Show first 10 links for debugging
                console.log(`  ${i + 1}: ${url}`);
            }
        });
        
        // Try to find any pattern that might contain games
        console.log('Looking for any /Game/ patterns in text...');
        const pageText = $('body').text();
        const gameMatches = pageText.match(/\/Game\/[^\/\s]+/g);
        if (gameMatches) {
            console.log('Found game patterns in text:', gameMatches.slice(0, 5));
            gameMatches.forEach(match => {
                gameLinks.add(new URL(match, baseUrl).toString());
            });
        }
    }
    
    console.log(`Final game links count: ${gameLinks.size}`);
    
    // Process each game link (limit to first 5 for testing)
    let processed = 0;
    for (const gameUrl of gameLinks) {
        if (processed >= 5) break; // Reduced limit for testing
        
        try {
            console.log(`Processing game ${processed + 1}/5: ${gameUrl}`);
            
            // Get game detail page
            const gameHtml = await getHTML(gameUrl);
            if (!gameHtml) continue;
            
            const game$ = cheerio.load(gameHtml);
            
            // Extract game information
            const name = game$('h1').first().text().trim();
            if (!name) continue;
            
            const description = game$('p').first().text().trim() || `Play ${name} online, an exciting game from HTML5Games.`;
            
            // Extract the actual Famobi game URL
            const actualGameUrl = await extractFamobiUrl(gameUrl);
            
            // Extract thumbnail
            let thumbnail = game$('img').first().attr('src') || '/placeholder-game.png';
            if (thumbnail && !thumbnail.startsWith('http')) {
                thumbnail = new URL(thumbnail, baseUrl).toString();
            }
            
            games.push({
                id: generateId(name),
                name: name,
                description: description,
                url: actualGameUrl, // Use the extracted Famobi URL
                thumbnail: thumbnail,
                author: 'HTML5Games.com',
                tags: ['Online', 'Arcade']
            });
            
            processed++;
            
            // Add delay to avoid overwhelming the server
            await new Promise(resolve => setTimeout(resolve, 2000)); // Increased delay
            
        } catch (error) {
            console.error(`  Failed to process game ${gameUrl}:`, error.message);
        }
    }
    
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

/**
 * Scraper for SpeedStarsFree.github.io
 * @param {string} html - The HTML content of the page
 * @param {string} baseUrl - The base URL of the site
 * @returns {Array<object>} - An array of game data objects
 */
async function scrapeSpeedStarsFree(html, baseUrl) {
    const $ = cheerio.load(html);
    const games = [];
    
    console.log('🎮 Scraping SpeedStarsFree.github.io...');
    
    // Find all game links on the page
    const gameLinks = new Set();
    
    // Method 1: Look for game links in the main content area
    $('a').each((i, el) => {
        const href = $(el).attr('href');
        const text = $(el).text().trim();
        
        // Skip empty links or navigation links
        if (!href || !text || text.length < 3) return;
        
        // Skip common navigation elements
        const skipTexts = ['Home', 'Speed Stars', 'Subway Surfers', 'Temple Run'];
        if (skipTexts.includes(text)) return;
        
        // Convert relative URLs to absolute
        let gameUrl;
        if (href.startsWith('http')) {
            gameUrl = href;
        } else if (href.startsWith('/')) {
            gameUrl = new URL(href, baseUrl).toString();
        } else {
            gameUrl = new URL(href, baseUrl).toString();
        }
        
        // Only include game URLs that look like actual games
        if (text && text.length > 3 && !gameUrl.includes('#')) {
            gameLinks.add({
                url: gameUrl,
                name: text,
                element: el
            });
        }
    });
    
    console.log(`📋 Found ${gameLinks.size} potential game links`);
    
    // Process each game link
    for (const gameLink of gameLinks) {
        try {
            const { url: gameUrl, name: gameName } = gameLink;
            
            // Generate game ID
            const gameId = generateId(gameName);
            
            // Skip if this looks like a duplicate or invalid game
            if (gameId.length < 3 || gameId === 'speed-stars') continue;
            
            // Determine if it's an external game or hosted game
            let finalUrl = gameUrl;
            let gameType = 'online';
            
            // Check if it's an external game URL
            if (!gameUrl.includes('speedstarsfree.github.io')) {
                // It's an external game, use the URL directly
                finalUrl = gameUrl;
            } else {
                // It's a hosted game, might need to construct the proper URL
                finalUrl = gameUrl;
            }
            
            // Create game description
            const description = `Play ${gameName} unblocked online for free! Experience exciting ${gameName.toLowerCase()} gameplay. No download needed – start playing instantly in your browser!`;
            
            // Determine game tags based on name
            const tags = ['Online', 'Unblocked'];
            const lowerName = gameName.toLowerCase();
            
            if (lowerName.includes('run') || lowerName.includes('runner')) {
                tags.push('Running');
            }
            if (lowerName.includes('car') || lowerName.includes('racing')) {
                tags.push('Racing');
            }
            if (lowerName.includes('3d')) {
                tags.push('3D');
            }
            if (lowerName.includes('subway') || lowerName.includes('temple')) {
                tags.push('Hot');
            }
            if (lowerName.includes('puzzle') || lowerName.includes('block')) {
                tags.push('Puzzle');
            }
            if (lowerName.includes('sport') || lowerName.includes('ball')) {
                tags.push('Sports');
            }
            if (lowerName.includes('shoot') || lowerName.includes('gun')) {
                tags.push('Shooter');
            }
            if (lowerName.includes('adventure')) {
                tags.push('Adventure');
            }
            
            // Create game object
            const gameData = {
                id: gameId,
                name: gameName,
                description: description,
                type: gameType,
                url: finalUrl,
                thumbnail: '/placeholder-game.png', // Default thumbnail
                localThumbnail: '/placeholder-game.png',
                tags: tags.join(','),
                author: 'SpeedStarsFree',
                priority: 20
            };
            
            games.push(gameData);
            console.log(`  ✅ Added: ${gameName} (${gameId})`);
            
        } catch (error) {
            console.error(`  ❌ Error processing game ${gameLink.name}:`, error.message);
        }
    }
    
    console.log(`🎯 Successfully scraped ${games.length} games from SpeedStarsFree.github.io`);
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