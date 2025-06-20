#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 递归复制目录
 * @param {string} src 源目录
 * @param {string} dest 目标目录
 */
function copyDir(src, dest) {
  // 确保目标目录存在
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const files = fs.readdirSync(src);
  
  files.forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

/**
 * 同步games目录到public
 */
function syncGames() {
  const projectRoot = path.resolve(__dirname, '..');
  const gamesDir = path.join(projectRoot, 'games');
  const publicGamesDir = path.join(projectRoot, 'public/games');
  
  console.log('🎮 Syncing games directory...');
  console.log(`From: ${gamesDir}`);
  console.log(`To: ${publicGamesDir}`);
  
  try {
    // 检查源目录是否存在
    if (!fs.existsSync(gamesDir)) {
      console.error(`❌ Source directory does not exist: ${gamesDir}`);
      process.exit(1);
    }
    
    // 删除旧的public/games目录
    if (fs.existsSync(publicGamesDir)) {
      fs.rmSync(publicGamesDir, { recursive: true, force: true });
      console.log('🗑️  Removed old public/games directory');
    }
    
    // 复制games目录到public
    copyDir(gamesDir, publicGamesDir);
    
    console.log('✅ Games directory synced successfully!');
    
    // 显示统计信息
    const gameDirectories = fs.readdirSync(publicGamesDir).filter(item => {
      return fs.statSync(path.join(publicGamesDir, item)).isDirectory();
    });
    console.log(`📊 Synced ${gameDirectories.length} game directories`);
    
  } catch (error) {
    console.error('❌ Failed to sync games directory:', error.message);
    process.exit(1);
  }
}

// 执行同步
syncGames(); 