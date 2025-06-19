import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGames } from '../../contexts/GameContext';
import Leaderboard from '../../components/leaderboard/Leaderboard';
import AchievementList from '../../components/leaderboard/AchievementList';
import GameEmbed from '../../components/game/GameEmbed';
import './GameDetail.css';

/**
 * Game detail page component
 * @returns {JSX.Element} Game detail page component
 */
function GameDetail() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { getGameDetails } = useGames();
  
  const [game, setGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [iframeHeight, setIframeHeight] = useState('85vh'); // 增加默认高度
  const [activeTab, setActiveTab] = useState('game'); // 'game', 'leaderboard', 'achievements'
  const [isFullWidth, setIsFullWidth] = useState(true); // Default to full-width (widescreen) mode
  
  // Get game details
  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const gameData = await getGameDetails(gameId);
        setGame(gameData);
      } catch (err) {
        setError(err.message || 'Failed to load game data');
        console.error('Error loading game details:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGameDetails();
  }, [gameId, getGameDetails]);
  
  // Handle window resize to make iframe responsive
  useEffect(() => {
    const handleResize = () => {
      // Adjust iframe height based on window width
      if (window.innerWidth < 768) {
        setIframeHeight('70vh');
      } else {
        setIframeHeight('85vh');
      }
    };
    
    handleResize(); // Set initial height
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
      // Use game URL directly
      const targetUrl = game.gameUrl;
      window.open(targetUrl, '_blank', 'width=1024,height=768,scrollbars=yes,resizable=yes');
    }
  };

  // 处理游戏加载错误
  const handleGameLoadError = (gameUrl, isOnline) => {
    console.error('Game load error:', { gameUrl, isOnline });
    // 可以在这里添加错误统计或用户通知
  };

  return (
    <div className="game-detail game-detail--full-width">
      {isLoading && (
        <div className="game-detail__loading">
          <div className="game-detail__loading-spinner"></div>
          <p>Loading game...</p>
        </div>
      )}
      
      {error && (
        <div className="game-detail__error">
          <p>{error}</p>
          <button onClick={handleBackClick}>Back to GameTime Bar</button>
        </div>
      )}
      
      {!isLoading && !error && game && (
        <>
          <div className="game-detail__header">
            <button className="game-detail__back-button" onClick={handleBackClick}>
              &larr; Back to GameTime Bar
            </button>
            <h1 className="game-detail__title">{game.name}</h1>
            <div className="game-detail__meta">
              <span className="game-detail__author">Developer: {game.author}</span>
              <span className="game-detail__date">Updated: {game.lastUpdated}</span>
              {game.isOnline && (
                <span className="game-detail__type game-detail__type--online">在线游戏</span>
              )}
              {!game.isOnline && (
                <span className="game-detail__type game-detail__type--local">本地游戏</span>
              )}
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
                <span className="game-detail__tab-icon">🎮</span> Play Game
              </button>
              <button 
                className={`game-detail__tab ${activeTab === 'leaderboard' ? 'game-detail__tab--active' : ''}`}
                onClick={() => setActiveTab('leaderboard')}
              >
                <span className="game-detail__tab-icon">🏆</span> Leaderboard
              </button>
              <button 
                className={`game-detail__tab ${activeTab === 'achievements' ? 'game-detail__tab--active' : ''}`}
                onClick={() => setActiveTab('achievements')}
              >
                <span className="game-detail__tab-icon">🌟</span> Achievements
              </button>
            </div>
            
            {activeTab === 'game' && (
              <div className="game-detail__game-container game-detail__game-container--full">
                <div className="game-detail__game-wrapper">
                  <GameEmbed 
                    gameUrl={game.gameUrl} 
                    title={game.name} 
                    height={iframeHeight}
                    isOnline={game.isOnline || false}
                    onLoadError={handleGameLoadError}
                  />
                  
                  <div className="game-detail__controls">
                    <button 
                      className="game-detail__fullscreen-button" 
                      onClick={handleFullscreenClick}
                    >
                      <span className="game-detail__button-icon">⛶</span> Fullscreen
                    </button>
                  </div>
                </div>
                
                <div className="game-detail__info">
                  <h2 className="game-detail__section-title">About this Game</h2>
                  <div 
                    className="game-detail__description"
                    dangerouslySetInnerHTML={{ __html: game.fullDescription }}
                  ></div>
                  
                  {game.controls && (
                    <div className="game-detail__controls-info">
                      <h3 className="game-detail__subsection-title">Game Controls</h3>
                      <p>{game.controls}</p>
                    </div>
                  )}

                  {/* 游戏类型说明 */}
                  <div className="game-detail__type-info">
                    <h3 className="game-detail__subsection-title">游戏类型</h3>
                    {game.isOnline ? (
                      <div className="game-detail__online-info">
                        <p><strong>在线游戏：</strong>此游戏托管在外部服务器上，需要稳定的网络连接。</p>
                        <ul>
                          <li>无需下载，即开即玩</li>
                          <li>实时更新，体验最新版本</li>
                          <li>可能需要较长的首次加载时间</li>
                          <li>游戏性能取决于网络状况</li>
                        </ul>
                      </div>
                    ) : (
                      <div className="game-detail__local-info">
                        <p><strong>本地游戏：</strong>此游戏文件存储在本地服务器上，提供稳定快速的游戏体验。</p>
                        <ul>
                          <li>加载速度快，响应迅速</li>
                          <li>离线可玩（在缓存后）</li>
                          <li>稳定可靠的游戏体验</li>
                          <li>针对本地运行优化</li>
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  {game.screenshots && game.screenshots.length > 0 && (
                    <div className="game-detail__screenshots">
                      <h2 className="game-detail__section-title">Screenshots</h2>
                      <div className="game-detail__screenshots-grid">
                        {game.screenshots.map((screenshot, index) => (
                          <div key={index} className="game-detail__screenshot">
                            <img 
                              src={screenshot} 
                              alt={`${game.name} screenshot ${index + 1}`} 
                              className="game-detail__screenshot-img"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
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
                  <h3>How to Get on the Leaderboard?</h3>
                  <p>After achieving a high score in the game, click the "Submit My Score" button to submit your score to the leaderboard.</p>
                  <p>Leaderboards are updated hourly.</p>
                  
                  <h3>Leaderboard Rules</h3>
                  <ul>
                    <li>Each player can have only one highest score record on the global leaderboard</li>
                    <li>Cheating scores will be removed</li>
                    <li>Weekly leaderboards reset every Monday at midnight</li>
                  </ul>
                </div>
              </div>
            )}
            
            {activeTab === 'achievements' && (
              <div className="game-detail__achievements-container">
                <AchievementList gameId={gameId} />
                
                <div className="game-detail__achievements-info">
                  <h3>About Achievements</h3>
                  <p>Complete specific objectives in the game to unlock achievements. Unlock all achievements to showcase your gaming skills!</p>
                  <p>Your achievement progress is automatically saved and synchronized across all devices.</p>
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