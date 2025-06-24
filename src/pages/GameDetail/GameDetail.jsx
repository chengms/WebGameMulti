import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
  const [gameMessage, setGameMessage] = useState(null); // 用于显示来自游戏的消息
  
  // Handle messages from game iframe
  const handleGameMessage = useCallback((event) => {
    // 安全性检查：确保消息来源是可信的
    if (event.origin !== window.location.origin) {
      return;
    }

    const { type, score, achievement, error: gameError } = event.data;
    
    switch (type) {
      case 'score':
        console.log('Received score from game:', score);
        setGameMessage({ type: 'score', content: `Game Score: ${score}` });
        // 这里可以触发分数提交表单或直接保存到排行榜
        break;
      case 'achievement':
        console.log('Achievement unlocked:', achievement);
        setGameMessage({ type: 'achievement', content: `Achievement Unlocked: ${achievement}` });
        break;
      case 'error':
        console.error('Game error:', gameError);
        setGameMessage({ type: 'error', content: `Game Error: ${gameError}` });
        break;
      case 'ready':
        console.log('Game is ready');
        setGameMessage({ type: 'success', content: 'Game loaded successfully!' });
        break;
      default:
        console.log('Unknown message from game:', event.data);
    }
  }, []);

  // Set up game message listener
  useEffect(() => {
    window.addEventListener('message', handleGameMessage);
    
    return () => {
      window.removeEventListener('message', handleGameMessage);
    };
  }, [handleGameMessage]);

  // Clear game messages after 5 seconds
  useEffect(() => {
    if (gameMessage) {
      const timer = setTimeout(() => {
        setGameMessage(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [gameMessage]);
  
  // Get game details with improved error handling
  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // 验证gameId是否存在
        if (!gameId) {
          throw new Error('Game ID is required');
        }
        
        const gameData = await getGameDetails(gameId);
        
        // 验证游戏数据是否有效
        if (!gameData) {
          throw new Error('Game not found');
        }
        
        setGame(gameData);
      } catch (err) {
        const errorMessage = err.message || 'Failed to load game data';
        setError(errorMessage);
        console.error('Error loading game details:', err);
        
        // 如果是404错误，3秒后自动返回主页
        if (err.message === 'Game not found' || err.message.includes('404')) {
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 3000);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGameDetails();
  }, [gameId, getGameDetails, navigate]);
  
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

  if (isLoading) {
    return (
      <div className="game-detail__loading">
        <div className="game-detail__loading-spinner"></div>
        <p>Loading game...</p>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="game-detail game-detail--full-width">
        <Helmet>
          <title>Game Not Found - GameTime Bar</title>
          <meta name="description" content="The requested game could not be found. Browse our collection of free online games at GameTime Bar." />
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="game-detail__error">
          <h1>游戏未找到</h1>
          <p>{error || 'Game not found. The game you are looking for does not exist.'}</p>
          <p>您将在3秒后自动返回主页，或者点击下面的按钮立即返回。</p>
          <button onClick={handleBackClick}>Back to GameTime Bar</button>
        </div>
      </div>
    );
  }

  // 创建游戏的结构化数据
  const gameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "@id": `https://gametime.bar/games/${game.id}`,
    "name": game.name,
    "url": `https://gametime.bar/games/${game.id}`,
    "description": game.fullDescription,
    "image": game.imageUrl || `https://gametime.bar/games/${game.id}/image/cover.png`,
    "applicationCategory": "Game",
    "operatingSystem": "Any",
    "playMode": game.isMultiplayer ? "MultiPlayer" : "SinglePlayer",
    "gamePlatform": "PC",
    "genre": game.tags || [],
    "author": {
      "@type": "Person",
      "name": game.author || game.developer || "GameTime Bar"
    },
    "dateModified": game.lastUpdated || new Date().toISOString(),
    "inLanguage": "en",
    "isAccessibleForFree": true,
    "aggregateRating": game.rating ? {
      "@type": "AggregateRating",
      "ratingValue": game.rating,
      "ratingCount": game.ratingCount || 1,
      "bestRating": 5,
      "worstRating": 1
    } : undefined
  };

  return (
    <div className="game-detail game-detail--full-width">
      <Helmet>
        <title>{`${game.name} - Play Free Online at GameTime Bar`}</title>
        <meta name="description" content={`Play ${game.name} online for free at GameTime Bar. ${game.fullDescription ? game.fullDescription.slice(0, 150) + '...' : 'Enjoy hours of entertainment with this exciting game.'}`} />
        <meta name="keywords" content={`${game.name}, free online game, ${game.tags ? game.tags.join(', ') : ''}, web game, GameTime Bar`} />
        <link rel="canonical" href={`https://gametime.bar/games/${game.id}`} />
        
        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content={`${game.name} - Play Free Online`} />
        <meta property="og:description" content={`Play ${game.name} online for free at GameTime Bar`} />
        <meta property="og:image" content={game.imageUrl || `https://gametime.bar/games/${game.id}/image/cover.png`} />
        <meta property="og:url" content={`https://gametime.bar/games/${game.id}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="GameTime Bar" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${game.name} - Play Free Online`} />
        <meta name="twitter:description" content={`Play ${game.name} online for free at GameTime Bar`} />
        <meta name="twitter:image" content={game.imageUrl || `https://gametime.bar/games/${game.id}/image/cover.png`} />
        
        {/* 结构化数据 */}
        <script type="application/ld+json">
          {JSON.stringify(gameSchema)}
        </script>
      </Helmet>

      {/* 游戏消息通知 */}
      {gameMessage && (
        <div className={`game-detail__message game-detail__message--${gameMessage.type}`}>
          <span>{gameMessage.content}</span>
          <button onClick={() => setGameMessage(null)}>×</button>
        </div>
      )}
      
      <div className="game-detail__header">
        <button className="game-detail__back-button" onClick={handleBackClick}>
          &larr; Back to GameTime Bar
        </button>
        <h1 className="game-detail__title">{game.name}</h1>
        <div className="game-detail__meta">
          <span className="game-detail__author">Developer: {game.author}</span>
          <span className="game-detail__date">Updated: {game.lastUpdated}</span>
          {game.isOnline && (
            <span className="game-detail__type game-detail__type--online">Online Game</span>
          )}
          {!game.isOnline && (
            <span className="game-detail__type game-detail__type--local">Local Game</span>
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
              
              <div className="game-detail__main-content">
                <div className="game-detail__description">
                  <h2 className="game-detail__section-title">Game Controls</h2>
                  <p>
                    Use the mouse and keyboard to play. For specific controls, please refer to the in-game instructions.
                  </p>
                </div>

                <div className="game-detail__info-card">
                  {game.controls && (
                    <div className="game-detail__controls-info">
                      <h3 className="game-detail__subsection-title">Game Controls</h3>
                      <p>{game.controls}</p>
                    </div>
                  )}

                  {/* Game type information */}
                  <div className="game-detail__type-info">
                    <h3 className="game-detail__subsection-title">Game Type</h3>
                    {game.isOnline ? (
                      <div className="game-detail__online-info">
                        <p><strong>Online Game:</strong> This game is hosted on an external server and requires a stable network connection.</p>
                        <ul>
                          <li>No download required, play instantly.</li>
                          <li>Always up-to-date with the latest version.</li>
                          <li>May have a longer initial loading time.</li>
                          <li>Performance depends on network conditions.</li>
                        </ul>
                      </div>
                    ) : (
                      <div className="game-detail__local-info">
                        <p><strong>Local Game:</strong> This game is stored locally and can be played offline.</p>
                        <ul>
                          <li>Playable offline without an internet connection.</li>
                          <li>Instant loading times.</li>
                          <li>Game version is fixed until the next update.</li>
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
    </div>
  );
}

export default GameDetail; 