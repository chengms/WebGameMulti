import React, { useState, useEffect } from 'react';
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
        </Helmet>
        <div className="game-detail__error">
          <p>{error || 'Game not found. The game you are looking for does not exist.'}</p>
          <button onClick={handleBackClick}>Back to GameTime Bar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="game-detail game-detail--full-width">
      <Helmet>
        <title>{`${game.name} - Play at GameTime Bar`}</title>
        <meta name="description" content={`Play ${game.name} and many other free online games on GameTime Bar. ${game.fullDescription}`} />
      </Helmet>
      
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

                  {/* 游戏类型说明 */}
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