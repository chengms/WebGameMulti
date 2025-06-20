#!/usr/bin/env node

/**
 * Cloudflare部署检查脚本
 * 检查项目配置是否适合Cloudflare Pages部署
 */

import fs from 'fs';
import path from 'path';

const checkList = [];
let hasErrors = false;

// 检查函数
function check(description, condition, error = false) {
  const status = condition ? '✅' : (error ? '❌' : '⚠️');
  if (!condition && error) hasErrors = true;
  checkList.push(`${status} ${description}`);
}

function checkFileExists(filePath) {
  return fs.existsSync(filePath);
}

function readJsonFile(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    return null;
  }
}

console.log('🔍 Cloudflare Pages 部署检查\n');

// 1. 检查基本文件
console.log('📁 文件结构检查:');
check('wrangler.toml 存在', checkFileExists('wrangler.toml'), true);
check('package.json 存在', checkFileExists('package.json'), true);
check('functions/proxy.js 存在', checkFileExists('functions/proxy.js'), true);
check('public/_headers 存在', checkFileExists('public/_headers'));
check('public/_redirects 存在', checkFileExists('public/_redirects'));
check('public/_routes.json 存在', checkFileExists('public/_routes.json'));

// 2. 检查package.json
console.log('\n📦 构建配置检查:');
const packageJson = readJsonFile('package.json');
if (packageJson) {
  check('build 脚本存在', !!packageJson.scripts?.build, true);
  check('type 设置为 module', packageJson.type === 'module');
  check('wrangler 依赖存在', !!packageJson.devDependencies?.wrangler);
}

// 3. 检查游戏配置
console.log('\n🎮 游戏配置检查:');
check('games 目录存在', checkFileExists('games'), true);
check('games-config.txt 存在', checkFileExists('games/games-config.txt'), true);

if (checkFileExists('games/games-config.txt')) {
  const configText = fs.readFileSync('games/games-config.txt', 'utf8');
  const lines = configText.split('\n').filter(line => 
    line.trim() && !line.startsWith('#')
  );
  check(`游戏配置包含 ${lines.length} 个游戏`, lines.length > 0);
  
  const onlineGames = lines.filter(line => line.includes('|online|'));
  check(`在线游戏 ${onlineGames.length} 个`, onlineGames.length >= 0);
}

// 4. 检查代理配置
console.log('\n🔗 代理配置检查:');
if (checkFileExists('functions/proxy.js')) {
  const proxyContent = fs.readFileSync('functions/proxy.js', 'utf8');
  check('代理函数导出正确', proxyContent.includes('export async function onRequest'));
  check('包含CORS处理', proxyContent.includes('Access-Control-Allow-Origin'));
  check('包含安全头移除', proxyContent.includes('X-Frame-Options'));
  check('包含域名白名单', proxyContent.includes('allowedDomains'));
}

// 5. 检查安全头配置
console.log('\n🔒 安全配置检查:');
if (checkFileExists('public/_headers')) {
  const headersContent = fs.readFileSync('public/_headers', 'utf8');
  check('CSP 配置存在', headersContent.includes('Content-Security-Policy'));
  check('CORS 配置存在', headersContent.includes('Access-Control-Allow-Origin'));
  check('代理路径配置存在', headersContent.includes('/proxy'));
}

// 6. 检查路由配置
console.log('\n🛣️  路由配置检查:');
const routesConfig = readJsonFile('public/_routes.json');
if (routesConfig) {
  check('路由版本正确', routesConfig.version === 1);
  check('包含通配符路由', routesConfig.include?.includes('/*'));
  check('排除静态资源', routesConfig.exclude?.includes('/assets/*'));
}

// 7. 检查构建目录
console.log('\n🏗️  构建检查:');
check('dist 目录可用', !checkFileExists('dist') || fs.statSync('dist').isDirectory());
check('node_modules 存在', checkFileExists('node_modules'));

// 8. 检查环境变量和配置
console.log('\n⚙️  环境配置检查:');
const viteConfigExists = checkFileExists('vite.config.js');
check('vite.config.js 存在', viteConfigExists, true);

if (viteConfigExists) {
  const viteContent = fs.readFileSync('vite.config.js', 'utf8');
  check('React 插件配置', viteContent.includes('@vitejs/plugin-react'));
  check('构建配置存在', viteContent.includes('build:'));
  check('输出目录配置', viteContent.includes('outDir'));
}

// 输出结果
console.log('\n' + checkList.join('\n'));

console.log('\n📋 部署建议:');
console.log('1. 确保在 Cloudflare Pages 中设置正确的构建命令: npm run build');
console.log('2. 设置输出目录为: dist');
console.log('3. 确保域名已正确配置');
console.log('4. 检查游戏URL是否可访问');
console.log('5. 监控代理函数的使用情况');

if (hasErrors) {
  console.log('\n❌ 发现关键错误，请修复后再部署');
  process.exit(1);
} else {
  console.log('\n✅ 配置检查通过，可以部署到 Cloudflare Pages');
  process.exit(0);
} 