import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGames } from '../../contexts/GameContext';
import Leaderboard from '../../components/leaderboard/Leaderboard';
import AchievementList from '../../components/leaderboard/AchievementList';
import './GameDetail.css';

/**
 * 游戏详情页面组件
 * @returns {JSX.Element} 游戏详情页面组件
 */
function GameDetail() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { getGameDetails } = useGames();
  
  const [game, setGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [iframeHeight, setIframeHeight] = useState('600px');
  const [activeTab, setActiveTab] = useState('game'); // 'game', 'leaderboard', 'achievements'
  
  // 获取游戏详情
  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const gameData = await getGameDetails(gameId);
        setGame(gameData);
      } catch (err) {
        setError(err.message || '加载游戏数据失败');
        console.error('加载游戏详情错误:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGameDetails();
  }, [gameId, getGameDetails]);
  
  // 处理窗口大小变化，使iframe响应式
  useEffect(() => {
    const handleResize = () => {
      // 根据窗口宽度调整iframe高度
      if (window.innerWidth < 768) {
        setIframeHeight('400px');
      } else {
        setIframeHeight('600px');
      }
    };
    
    handleResize(); // 设置初始高度
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const handleBackClick = () => {
    navigate(-1);
  };
  
  const handleFullscreenClick = () => {
    if (game) {
      window.open(game.gameUrl, '_blank');
    }
  };

  return (
    <div className="game-detail">
      {isLoading && (
        <div className="game-detail__loading">
          <div className="game-detail__loading-spinner"></div>
          <p>加载游戏中...</p>
        </div>
      )}
      
      {error && (
        <div className="game-detail__error">
          <p>{error}</p>
          <button onClick={handleBackClick}>返回游戏列表</button>
        </div>
      )}
      
      {!isLoading && !error && game && (
        <>
          <div className="game-detail__header">
            <button className="game-detail__back-button" onClick={handleBackClick}>
              &larr; 返回游戏列表
            </button>
            <h1 className="game-detail__title">{game.name}</h1>
            <div className="game-detail__meta">
              <span className="game-detail__author">作者: {game.author}</span>
              <span className="game-detail__date">更新: {game.lastUpdated}</span>
            </div>
            <div className="game-detail__tags">
              {game.tags.map((tag, index) => (
                <span key={index} className="game-detail__tag">{tag}</span>
              ))}
            </div>
          </div>
          
          <div className="game-detail__content">
            <div className="game-detail__tabs">
              <button 
                className={`game-detail__tab ${activeTab === 'game' ? 'game-detail__tab--active' : ''}`}
                onClick={() => setActiveTab('game')}
              >
                游戏
              </button>
              <button 
                className={`game-detail__tab ${activeTab === 'leaderboard' ? 'game-detail__tab--active' : ''}`}
                onClick={() => setActiveTab('leaderboard')}
              >
                排行榜
              </button>
              <button 
                className={`game-detail__tab ${activeTab === 'achievements' ? 'game-detail__tab--active' : ''}`}
                onClick={() => setActiveTab('achievements')}
              >
                成就
              </button>
            </div>
            
            {activeTab === 'game' && (
              <div className="game-detail__game-container">
                <div className="game-detail__game-wrapper">
                  <iframe 
                    src={game.gameUrl} 
                    title={game.name}
                    className="game-detail__iframe"
                    style={{ height: iframeHeight }}
                    allowFullScreen
                  ></iframe>
                  
                  <div className="game-detail__controls">
                    <button 
                      className="game-detail__fullscreen-button" 
                      onClick={handleFullscreenClick}
                    >
                      全屏游戏
                    </button>
                  </div>
                </div>
                
                <div className="game-detail__info">
                  <h2 className="game-detail__section-title">关于此游戏</h2>
                  <div 
                    className="game-detail__description"
                    dangerouslySetInnerHTML={{ __html: game.fullDescription }}
                  ></div>
                  
                  {game.controls && (
                    <div className="game-detail__controls-info">
                      <h3 className="game-detail__subsection-title">游戏控制</h3>
                      <p>{game.controls}</p>
                    </div>
                  )}
                  
                  {game.screenshots && game.screenshots.length > 0 && (
                    <div className="game-detail__screenshots">
                      <h2 className="game-detail__section-title">游戏截图</h2>
                      <div className="game-detail__screenshots-grid">
                        {game.screenshots.map((screenshot, index) => (
                          <div key={index} className="game-detail__screenshot">
                            <img 
                              src={screenshot} 
                              alt={`${game.name} 截图 ${index + 1}`} 
                              className="game-detail__screenshot-img"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {activeTab === 'leaderboard' && (
              <div className="game-detail__leaderboard-container">
                <Leaderboard gameId={gameId} type="global" />
                
                <div className="game-detail__leaderboard-info">
                  <h3>如何上榜?</h3>
                  <p>在游戏中获得高分后，点击"提交我的分数"按钮提交您的分数到排行榜。</p>
                  <p>排行榜每小时更新一次。</p>
                  
                  <h3>排行榜规则</h3>
                  <ul>
                    <li>每位玩家在全球排行榜中只能有一个最高分记录</li>
                    <li>作弊分数将被移除</li>
                    <li>每周排行榜于每周一凌晨重置</li>
                  </ul>
                </div>
              </div>
            )}
            
            {activeTab === 'achievements' && (
              <div className="game-detail__achievements-container">
                <AchievementList gameId={gameId} />
                
                <div className="game-detail__achievements-info">
                  <h3>关于成就</h3>
                  <p>完成游戏中的特定目标可以解锁成就。解锁所有成就以展示您的游戏技巧！</p>
                  <p>您的成就进度会自动保存，并在所有设备上同步。</p>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default GameDetail; 