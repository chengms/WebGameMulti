# Cursor AI 代码生成示例

本文档提供了使用Cursor AI生成功能为WebGameMulti项目创建代码的实际示例。这些示例展示了如何使用有效的提示生成高质量、可用的代码。

## 示例1: 游戏卡片组件

### 提示:

```
生成一个React函数组件，名为GameCard，用于显示游戏信息卡片。
组件需要接收以下props：
- game: Object - 包含id, name, description, thumbnail, tags属性的游戏对象
- onClick: Function - 点击卡片的回调函数

卡片设计应包含：
- 顶部显示游戏缩略图
- 中间显示游戏名称（粗体）
- 下方显示游戏简短描述（最多2行，溢出显示省略号）
- 底部显示游戏标签（水平排列，可换行）

样式使用BEM命名规范，响应式设计适配不同屏幕尺寸。
包含鼠标悬停效果，悬停时轻微上浮并增加阴影。
确保添加适当的PropTypes验证和JSDoc注释。
```

### 生成结果:

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import './GameCard.css';

/**
 * 游戏卡片组件 - 显示游戏的基本信息和缩略图
 * @param {Object} game - 游戏对象，包含游戏的基本信息
 * @param {string} game.id - 游戏唯一标识符
 * @param {string} game.name - 游戏名称
 * @param {string} game.description - 游戏描述
 * @param {string} game.thumbnail - 游戏缩略图URL
 * @param {Array} game.tags - 游戏标签数组
 * @param {Function} onClick - 点击游戏卡片的回调函数，接收游戏id作为参数
 * @returns {JSX.Element} 游戏卡片组件
 */
function GameCard({ game, onClick }) {
  const { id, name, description, thumbnail, tags } = game;

  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <div className="game-card" onClick={handleClick}>
      <div className="game-card__image">
        <img src={thumbnail} alt={name} className="game-card__thumbnail" />
      </div>
      <div className="game-card__content">
        <h3 className="game-card__title">{name}</h3>
        <p className="game-card__description">{description}</p>
        {tags && tags.length > 0 && (
          <div className="game-card__tags">
            {tags.map((tag, index) => (
              <span key={`${id}-tag-${index}`} className="game-card__tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

GameCard.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  onClick: PropTypes.func
};

GameCard.defaultProps = {
  onClick: null
};

export default GameCard;
```

### 附带的CSS:

```css
.game-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  background-color: #ffffff;
  margin-bottom: 20px;
}

.game-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.game-card__image {
  width: 100%;
  height: 160px;
  overflow: hidden;
}

.game-card__thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.game-card:hover .game-card__thumbnail {
  transform: scale(1.05);
}

.game-card__content {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.game-card__title {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.game-card__description {
  margin: 0 0 16px 0;
  font-size: 14px;
  color: #666;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
}

.game-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.game-card__tag {
  padding: 4px 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  font-size: 12px;
  color: #555;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .game-card {
    max-width: 100%;
  }
}
```

## 示例2: 游戏加载Hook

### 提示:

```
创建一个名为useGameLoader的自定义React Hook，用于从服务器加载games目录下的游戏数据。
Hook需要：
1. 在组件挂载时自动加载游戏列表
2. 处理加载、错误和成功状态
3. 提供按标签筛选游戏的功能
4. 提供搜索游戏的功能（根据名称或描述）
5. 包含刷新数据的方法

实现要点：
- 使用fetch API从服务器获取数据
- 使用React的useState和useEffect hooks
- 实现缓存机制避免不必要的重复请求
- 处理错误情况
- 提供强类型的返回值
```

### 生成结果:

```jsx
import { useState, useEffect, useCallback, useMemo } from 'react';

/**
 * 自定义Hook，用于加载和管理游戏数据
 * @param {Object} options - 配置选项
 * @param {number} options.cacheTime - 缓存有效时间（毫秒），默认为5分钟
 * @param {string} options.apiEndpoint - API端点，默认为'/api/games'
 * @returns {Object} 游戏数据、加载状态和操作函数
 */
function useGameLoader({ 
  cacheTime = 5 * 60 * 1000, 
  apiEndpoint = '/api/games' 
} = {}) {
  // 状态管理
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetched, setLastFetched] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  /**
   * 从服务器加载游戏数据
   */
  const fetchGames = useCallback(async (forceRefresh = false) => {
    // 检查是否需要从缓存加载
    const now = new Date().getTime();
    if (
      !forceRefresh && 
      lastFetched && 
      now - lastFetched < cacheTime && 
      games.length > 0
    ) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(apiEndpoint);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setGames(data);
      setLastFetched(now);
    } catch (err) {
      setError(err.message || 'Failed to load games');
      console.error('Error loading games:', err);
    } finally {
      setIsLoading(false);
    }
  }, [apiEndpoint, cacheTime, games.length, lastFetched]);

  // 初始加载
  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  /**
   * 根据标签筛选游戏
   * @param {string[]} tags - 标签数组
   */
  const filterByTags = useCallback((tags) => {
    setSelectedTags(tags);
  }, []);

  /**
   * 搜索游戏
   * @param {string} term - 搜索关键词
   */
  const searchGames = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  /**
   * 手动刷新游戏数据
   */
  const refreshGames = useCallback(() => {
    fetchGames(true);
  }, [fetchGames]);

  /**
   * 获取所有可用标签
   */
  const allTags = useMemo(() => {
    const tagSet = new Set();
    games.forEach(game => {
      if (game.tags && Array.isArray(game.tags)) {
        game.tags.forEach(tag => tagSet.add(tag));
      }
    });
    return Array.from(tagSet);
  }, [games]);

  /**
   * 根据搜索条件和标签筛选游戏
   */
  const filteredGames = useMemo(() => {
    return games.filter(game => {
      // 标签筛选
      if (selectedTags.length > 0) {
        if (!game.tags) return false;
        const hasAllTags = selectedTags.every(tag => 
          game.tags.includes(tag)
        );
        if (!hasAllTags) return false;
      }
      
      // 搜索词筛选
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const nameMatch = game.name && game.name.toLowerCase().includes(searchLower);
        const descMatch = game.description && game.description.toLowerCase().includes(searchLower);
        return nameMatch || descMatch;
      }
      
      return true;
    });
  }, [games, selectedTags, searchTerm]);

  return {
    games: filteredGames,
    allGames: games,
    isLoading,
    error,
    searchGames,
    filterByTags,
    refreshGames,
    allTags,
    selectedTags,
    searchTerm
  };
}

export default useGameLoader;
```

## 示例3: 游戏网格组件

### 提示:

```
创建一个React组件GameGrid，用于以网格形式展示多个GameCard组件。
组件要求：
1. 响应式布局，在不同屏幕尺寸下自动调整布局（大屏4列，中屏3列，小屏2列，移动端1列）
2. 支持空状态、加载状态和错误状态
3. 接收游戏数组、加载状态、错误信息和点击回调作为props
4. 使用CSS Grid布局
5. 符合BEM命名规范
6. 包含适当的PropTypes验证

假设已经存在GameCard组件和LoadingSpinner组件。
```

### 生成结果:

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import GameCard from '../GameCard/GameCard';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './GameGrid.css';

/**
 * 游戏网格组件 - 以网格形式展示多个游戏卡片
 * @param {Object} props - 组件属性
 * @param {Array} props.games - 游戏对象数组
 * @param {boolean} props.isLoading - 是否正在加载数据
 * @param {string|null} props.error - 错误信息，如果有的话
 * @param {Function} props.onGameClick - 游戏卡片点击回调函数
 * @returns {JSX.Element} 游戏网格组件
 */
function GameGrid({ games, isLoading, error, onGameClick }) {
  // 渲染加载状态
  if (isLoading) {
    return (
      <div className="game-grid__loading">
        <LoadingSpinner />
        <p className="game-grid__loading-text">正在加载游戏...</p>
      </div>
    );
  }

  // 渲染错误状态
  if (error) {
    return (
      <div className="game-grid__error">
        <p className="game-grid__error-text">加载失败: {error}</p>
        <button className="game-grid__retry-button" onClick={() => window.location.reload()}>
          重试
        </button>
      </div>
    );
  }

  // 渲染空状态
  if (!games || games.length === 0) {
    return (
      <div className="game-grid__empty">
        <p className="game-grid__empty-text">没有找到游戏</p>
      </div>
    );
  }

  // 渲染游戏网格
  return (
    <div className="game-grid">
      {games.map(game => (
        <div className="game-grid__item" key={game.id}>
          <GameCard game={game} onClick={onGameClick} />
        </div>
      ))}
    </div>
  );
}

GameGrid.propTypes = {
  games: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string)
    })
  ),
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  onGameClick: PropTypes.func.isRequired
};

GameGrid.defaultProps = {
  games: [],
  isLoading: false,
  error: null
};

export default GameGrid;
```

### 附带的CSS:

```css
.game-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
  width: 100%;
  padding: 20px 0;
}

/* 响应式网格布局 */
@media (min-width: 576px) {
  .game-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 992px) {
  .game-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1200px) {
  .game-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.game-grid__item {
  display: flex;
  justify-content: center;
}

/* 加载状态样式 */
.game-grid__loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  width: 100%;
}

.game-grid__loading-text {
  margin-top: 20px;
  font-size: 16px;
  color: #666;
}

/* 错误状态样式 */
.game-grid__error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  width: 100%;
  text-align: center;
}

.game-grid__error-text {
  margin-bottom: 20px;
  font-size: 16px;
  color: #e74c3c;
}

.game-grid__retry-button {
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.game-grid__retry-button:hover {
  background-color: #2980b9;
}

/* 空状态样式 */
.game-grid__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  width: 100%;
  text-align: center;
}

.game-grid__empty-text {
  font-size: 18px;
  color: #999;
}
```

## 示例4: 游戏详情页面

### 提示:

```
创建一个React页面组件GameDetailPage，用于显示游戏详情并嵌入游戏iframe。
功能要求：
1. 从URL参数中获取游戏ID（使用React Router的useParams）
2. 使用自定义Hook useGameData获取特定游戏的详情
3. 包含加载、错误和数据展示状态
4. 页面布局：
   - 顶部导航栏，包含返回按钮和游戏名称
   - 左侧信息面板，显示游戏描述、标签、作者等
   - 右侧游戏区域，使用iframe嵌入游戏
5. 响应式设计，在移动设备上改为垂直布局
6. 支持全屏模式切换

假设已存在：
- useGameData hook
- Header, GameInfo, GameFrame 组件
```

### 生成结果:

```jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useGameData from '../../hooks/useGameData';
import Header from '../../components/Header/Header';
import GameInfo from '../../components/GameInfo/GameInfo';
import GameFrame from '../../components/GameFrame/GameFrame';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import './GameDetailPage.css';

/**
 * 游戏详情页面 - 显示游戏详细信息并提供游戏试玩功能
 * @returns {JSX.Element} 游戏详情页面组件
 */
function GameDetailPage() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const { 
    games: game, 
    isLoading, 
    error, 
    refreshGames 
  } = useGameData({ gameId });

  // 返回首页
  const handleBackClick = () => {
    navigate('/');
  };

  // 切换全屏模式
  const toggleFullscreen = () => {
    setIsFullscreen(prev => !prev);
  };

  // 页面标题更新
  useEffect(() => {
    if (game && game.name) {
      document.title = `${game.name} - WebGameMulti`;
    } else {
      document.title = 'Game Detail - WebGameMulti';
    }
    
    return () => {
      document.title = 'WebGameMulti';
    };
  }, [game]);

  // 加载状态
  if (isLoading) {
    return (
      <div className="game-detail-page">
        <Header title="加载中..." onBackClick={handleBackClick} />
        <div className="game-detail-page__loading">
          <LoadingSpinner />
          <p>正在加载游戏信息...</p>
        </div>
      </div>
    );
  }

  // 错误状态
  if (error || !game) {
    return (
      <div className="game-detail-page">
        <Header title="出错了" onBackClick={handleBackClick} />
        <div className="game-detail-page__error">
          <h2>无法加载游戏</h2>
          <p>{error || '游戏不存在或已被移除'}</p>
          <button 
            className="game-detail-page__retry-button" 
            onClick={refreshGames}
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  // 游戏详情
  return (
    <div className={`game-detail-page ${isFullscreen ? 'game-detail-page--fullscreen' : ''}`}>
      <Header 
        title={game.name} 
        onBackClick={handleBackClick} 
        showFullscreenToggle
        isFullscreen={isFullscreen}
        onFullscreenToggle={toggleFullscreen}
      />
      
      <div className="game-detail-page__content">
        {!isFullscreen && (
          <div className="game-detail-page__info">
            <GameInfo 
              name={game.name}
              description={game.description}
              author={game.author}
              tags={game.tags}
              controls={game.controls}
              version={game.version}
              createdAt={game.createdAt}
            />
          </div>
        )}
        
        <div className="game-detail-page__game">
          <GameFrame 
            gameId={gameId} 
            gamePath={`/games/${gameId}/index.html`}
            minWidth={game.minWidth}
            minHeight={game.minHeight}
          />
        </div>
      </div>
    </div>
  );
}

export default GameDetailPage;
```

### 附带的CSS:

```css
.game-detail-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.game-detail-page__content {
  display: flex;
  flex: 1;
  padding: 20px;
  gap: 20px;
}

/* 响应式布局 - 在移动设备上切换到垂直排列 */
@media (max-width: 992px) {
  .game-detail-page__content {
    flex-direction: column;
  }
}

.game-detail-page__info {
  flex: 0 0 300px;
  max-width: 300px;
}

@media (max-width: 992px) {
  .game-detail-page__info {
    flex: none;
    max-width: 100%;
  }
}

.game-detail-page__game {
  flex: 1;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  min-height: 600px;
}

/* 全屏模式 */
.game-detail-page--fullscreen .game-detail-page__content {
  padding: 0;
}

.game-detail-page--fullscreen .game-detail-page__game {
  border-radius: 0;
  box-shadow: none;
}

/* 加载状态 */
.game-detail-page__loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 400px;
  padding: 20px;
}

.game-detail-page__loading p {
  margin-top: 20px;
  font-size: 16px;
  color: #666;
}

/* 错误状态 */
.game-detail-page__error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 400px;
  padding: 20px;
  text-align: center;
}

.game-detail-page__error h2 {
  margin-bottom: 10px;
  color: #e74c3c;
}

.game-detail-page__error p {
  margin-bottom: 20px;
  color: #666;
}

.game-detail-page__retry-button {
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.game-detail-page__retry-button:hover {
  background-color: #2980b9;
}
```

## 示例5: API服务模块

### 提示:

```
创建一个API服务模块gameAPI.js，用于处理WebGameMulti项目的所有游戏数据相关API请求。
模块需包含以下功能：
1. 获取所有游戏列表
2. 获取单个游戏详情
3. 根据标签筛选游戏
4. 搜索游戏
5. 请求错误处理
6. 请求缓存
7. 自动重试机制

使用fetch API实现请求，并确保返回的Promise便于async/await使用。
包含全面的JSDoc注释。
```

### 生成结果:

```javascript
/**
 * 游戏API服务模块 - 处理WebGameMulti项目中的所有游戏数据相关API请求
 * @module gameAPI
 */

// 缓存设置
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存
const cache = {
  games: {
    data: null,
    timestamp: null
  },
  gameDetails: {},
  taggedGames: {}
};

// API基础URL
const API_BASE_URL = '/api';

/**
 * 通用请求函数，包含错误处理和重试功能
 * @param {string} url - 请求URL
 * @param {Object} options - 请求选项
 * @param {number} retries - 重试次数，默认为2
 * @returns {Promise<any>} 解析后的响应数据
 * @throws {Error} 请求错误
 */
async function fetchWithRetry(url, options = {}, retries = 2) {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP Error: ${response.status} - ${errorText || response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    if (retries > 0) {
      console.warn(`Request to ${url} failed. Retrying... (${retries} retries left)`);
      // 等待一段时间后重试，时间随重试次数增加
      await new Promise(resolve => setTimeout(resolve, 1000 * (3 - retries)));
      return fetchWithRetry(url, options, retries - 1);
    }
    
    console.error('Request failed after retries:', error);
    throw error;
  }
}

/**
 * 检查缓存是否有效
 * @param {Object} cacheEntry - 缓存条目
 * @returns {boolean} 缓存是否有效
 */
function isCacheValid(cacheEntry) {
  if (!cacheEntry || !cacheEntry.timestamp || !cacheEntry.data) {
    return false;
  }
  
  const now = Date.now();
  return (now - cacheEntry.timestamp) < CACHE_DURATION;
}

/**
 * 获取所有游戏列表
 * @param {Object} options - 请求选项
 * @param {boolean} options.forceRefresh - 是否强制刷新（忽略缓存）
 * @returns {Promise<Array>} 游戏列表
 */
export async function getAllGames({ forceRefresh = false } = {}) {
  // 检查缓存
  if (!forceRefresh && isCacheValid(cache.games)) {
    return cache.games.data;
  }
  
  try {
    const data = await fetchWithRetry(`${API_BASE_URL}/games`);
    
    // 更新缓存
    cache.games = {
      data,
      timestamp: Date.now()
    };
    
    return data;
  } catch (error) {
    console.error('Error fetching all games:', error);
    throw new Error(`Failed to load games: ${error.message}`);
  }
}

/**
 * 获取指定ID的游戏详情
 * @param {string} gameId - 游戏ID
 * @param {Object} options - 请求选项
 * @param {boolean} options.forceRefresh - 是否强制刷新（忽略缓存）
 * @returns {Promise<Object>} 游戏详情对象
 */
export async function getGameById(gameId, { forceRefresh = false } = {}) {
  if (!gameId) {
    throw new Error('Game ID is required');
  }
  
  // 检查缓存
  if (!forceRefresh && cache.gameDetails[gameId] && isCacheValid(cache.gameDetails[gameId])) {
    return cache.gameDetails[gameId].data;
  }
  
  try {
    const data = await fetchWithRetry(`${API_BASE_URL}/games/${gameId}`);
    
    // 更新缓存
    cache.gameDetails[gameId] = {
      data,
      timestamp: Date.now()
    };
    
    return data;
  } catch (error) {
    console.error(`Error fetching game with ID ${gameId}:`, error);
    throw new Error(`Failed to load game details: ${error.message}`);
  }
}

/**
 * 根据标签筛选游戏
 * @param {string[]} tags - 标签数组
 * @param {Object} options - 请求选项
 * @param {boolean} options.forceRefresh - 是否强制刷新（忽略缓存）
 * @returns {Promise<Array>} 符合标签条件的游戏列表
 */
export async function getGamesByTags(tags, { forceRefresh = false } = {}) {
  if (!tags || !Array.isArray(tags) || tags.length === 0) {
    return getAllGames({ forceRefresh });
  }
  
  // 将标签数组转换成缓存键
  const cacheKey = tags.sort().join(',');
  
  // 检查缓存
  if (!forceRefresh && cache.taggedGames[cacheKey] && isCacheValid(cache.taggedGames[cacheKey])) {
    return cache.taggedGames[cacheKey].data;
  }
  
  try {
    // 构建查询参数
    const queryParams = new URLSearchParams();
    tags.forEach(tag => queryParams.append('tag', tag));
    
    const data = await fetchWithRetry(`${API_BASE_URL}/games/tags?${queryParams.toString()}`);
    
    // 更新缓存
    cache.taggedGames[cacheKey] = {
      data,
      timestamp: Date.now()
    };
    
    return data;
  } catch (error) {
    console.error('Error fetching games by tags:', error);
    throw new Error(`Failed to load games by tags: ${error.message}`);
  }
}

/**
 * 搜索游戏
 * @param {string} query - 搜索关键词
 * @returns {Promise<Array>} 搜索结果
 */
export async function searchGames(query) {
  if (!query) {
    return getAllGames();
  }
  
  try {
    const queryParams = new URLSearchParams({ q: query });
    const data = await fetchWithRetry(`${API_BASE_URL}/games/search?${queryParams.toString()}`);
    return data;
  } catch (error) {
    console.error('Error searching games:', error);
    throw new Error(`Failed to search games: ${error.message}`);
  }
}

/**
 * 清除所有缓存数据
 */
export function clearCache() {
  cache.games = {
    data: null,
    timestamp: null
  };
  cache.gameDetails = {};
  cache.taggedGames = {};
}

/**
 * 清除特定游戏的缓存
 * @param {string} gameId - 游戏ID
 */
export function clearGameCache(gameId) {
  if (gameId && cache.gameDetails[gameId]) {
    delete cache.gameDetails[gameId];
  }
  // 同时清除游戏列表缓存，因为游戏可能已更新
  cache.games = {
    data: null,
    timestamp: null
  };
  cache.taggedGames = {};
}

export default {
  getAllGames,
  getGameById,
  getGamesByTags,
  searchGames,
  clearCache,
  clearGameCache
};
```

## 结论

上述示例展示了如何使用Cursor AI有效地生成WebGameMulti项目中的各种组件和功能。通过提供清晰、结构化的提示，你可以获得高质量的代码，这些代码不仅符合项目的编码规范，还包含了全面的错误处理和边缘情况处理。

在实际开发中，你可能需要根据项目的具体需求对生成的代码进行一些调整，但这些示例为你提供了一个很好的起点，可以显著提高开发效率。