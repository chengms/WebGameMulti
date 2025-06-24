import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGames } from '../../contexts/GameContext';
import GameCard from './GameCard';
import './RelatedGames.css';

/**
 * Related games component for showing games similar to the current game
 * @param {Object} props Component props
 * @param {Object} props.currentGame Current game object
 * @returns {JSX.Element} Related games component
 */
function RelatedGames({ currentGame }) {
  const navigate = useNavigate();
  const { games } = useGames();
  const [relatedGames, setRelatedGames] = useState([]);

  useEffect(() => {
    if (currentGame && games.length > 0) {
      // Find related games based on different criteria
      const related = findRelatedGames(currentGame, games);
      setRelatedGames(related.slice(0, 4)); // Show up to 4 related games
    }
  }, [currentGame, games]);

  /**
   * Find related games using multiple criteria
   * @param {Object} current Current game
   * @param {Array} allGames All available games
   * @returns {Array} Array of related games
   */
  const findRelatedGames = (current, allGames) => {
    const related = [];
    const seenIds = new Set([current.id]);

    // Filter out the current game
    const otherGames = allGames.filter(game => game.id !== current.id);

    // 1. Games with same tags (highest priority)
    if (current.tags && current.tags.length > 0) {
      const tagMatches = otherGames.filter(game => 
        game.tags && game.tags.some(tag => current.tags.includes(tag))
      ).sort((a, b) => {
        // Sort by number of matching tags
        const aMatches = a.tags.filter(tag => current.tags.includes(tag)).length;
        const bMatches = b.tags.filter(tag => current.tags.includes(tag)).length;
        return bMatches - aMatches;
      });

      tagMatches.forEach(game => {
        if (!seenIds.has(game.id) && related.length < 4) {
          related.push(game);
          seenIds.add(game.id);
        }
      });
    }

    // 2. Games by same author/developer
    if (related.length < 4 && current.author) {
      const authorMatches = otherGames.filter(game => 
        game.author === current.author || 
        game.developer === current.author ||
        game.author === current.developer
      );

      authorMatches.forEach(game => {
        if (!seenIds.has(game.id) && related.length < 4) {
          related.push(game);
          seenIds.add(game.id);
        }
      });
    }

    // 3. Popular games (if still need more)
    if (related.length < 4) {
      const popularGames = otherGames
        .filter(game => !seenIds.has(game.id))
        .sort((a, b) => {
          // Sort by rating or play count if available, otherwise random
          const aRating = a.rating || Math.random();
          const bRating = b.rating || Math.random();
          return bRating - aRating;
        });

      popularGames.forEach(game => {
        if (!seenIds.has(game.id) && related.length < 4) {
          related.push(game);
          seenIds.add(game.id);
        }
      });
    }

    return related;
  };

  const handleGameClick = (gameId) => {
    navigate(`/games/${gameId}`);
  };

  const handleGuideClick = (gameId) => {
    navigate(`/guides/${gameId}`);
  };

  const hasGuide = (gameId) => {
    const guidesAvailable = ['2048', 'tetris', 'snake', 'pacman', 'memory-match'];
    return guidesAvailable.includes(gameId);
  };

  if (relatedGames.length === 0) {
    return null; // Don't render if no related games
  }

  return (
    <div className="related-games">
      <div className="related-games__grid">
        {relatedGames.map(game => (
          <div key={game.id} className="related-games__item">
            <GameCard 
              game={game} 
              onClick={() => handleGameClick(game.id)} 
            />
            <div className="related-games__actions">
              <button 
                onClick={() => handleGameClick(game.id)}
                className="related-games__play-button"
              >
                🎮 Play Now
              </button>
              {hasGuide(game.id) && (
                <button 
                  onClick={() => handleGuideClick(game.id)}
                  className="related-games__guide-button"
                >
                  📖 Guide
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="related-games__more">
        <p>Looking for more games?</p>
        <button 
          onClick={() => navigate('/')}
          className="related-games__browse-button"
        >
          Browse All Games
        </button>
      </div>
    </div>
  );
}

export default RelatedGames; 