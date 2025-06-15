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
      window.open(game.gameUrl, '_blank');
    }
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
          <button onClick={handleBackClick}>Back to Games</button>
        </div>
      )}
      
      {!isLoading && !error && game && (
        <>
          <div className="game-detail__header">
            <button className="game-detail__back-button" onClick={handleBackClick}>
              &larr; Back to Games
            </button>
            <h1 className="game-detail__title">{game.name}</h1>
            <div className="game-detail__meta">
              <span className="game-detail__author">Author: {game.author}</span>
              <span className="game-detail__date">Updated: {game.lastUpdated}</span>
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
                Game
              </button>
              <button 
                className={`game-detail__tab ${activeTab === 'leaderboard' ? 'game-detail__tab--active' : ''}`}
                onClick={() => setActiveTab('leaderboard')}
              >
                Leaderboard
              </button>
              <button 
                className={`game-detail__tab ${activeTab === 'achievements' ? 'game-detail__tab--active' : ''}`}
                onClick={() => setActiveTab('achievements')}
              >
                Achievements
              </button>
            </div>
            
            {activeTab === 'game' && (
              <div className="game-detail__game-container game-detail__game-container--full">
                <div className="game-detail__game-wrapper">
                  <GameEmbed 
                    gameUrl={game.gameUrl} 
                    title={game.name} 
                    height={iframeHeight}
                  />
                  
                  <div className="game-detail__controls">
                    <button 
                      className="game-detail__fullscreen-button" 
                      onClick={handleFullscreenClick}
                    >
                      Fullscreen
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