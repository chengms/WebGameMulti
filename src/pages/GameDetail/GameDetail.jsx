import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGames } from '../../contexts/GameContext';
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
  const [iframeHeight, setIframeHeight] = useState('600px');
  
  // Fetch game details
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
      // Adjust iframe height based on window width for responsive design
      if (window.innerWidth < 768) {
        setIframeHeight('400px');
      } else {
        setIframeHeight('600px');
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
    <div className="game-detail">
      {isLoading && (
        <div className="game-detail__loading">
          <div className="game-detail__loading-spinner"></div>
          <p>Loading game...</p>
        </div>
      )}
      
      {error && (
        <div className="game-detail__error">
          <p>{error}</p>
          <button onClick={handleBackClick}>Return to Game List</button>
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
              <span className="game-detail__author">By {game.author}</span>
              <span className="game-detail__date">Updated: {game.lastUpdated}</span>
            </div>
            <div className="game-detail__tags">
              {game.tags.map((tag, index) => (
                <span key={index} className="game-detail__tag">{tag}</span>
              ))}
            </div>
          </div>
          
          <div className="game-detail__content">
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
                    Play Fullscreen
                  </button>
                </div>
              </div>
              
              <div className="game-detail__info">
                <h2 className="game-detail__section-title">About This Game</h2>
                <div 
                  className="game-detail__description"
                  dangerouslySetInnerHTML={{ __html: game.fullDescription }}
                ></div>
                
                {game.controls && (
                  <div className="game-detail__controls-info">
                    <h3 className="game-detail__subsection-title">Controls</h3>
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
          </div>
        </>
      )}
    </div>
  );
}

export default GameDetail; 