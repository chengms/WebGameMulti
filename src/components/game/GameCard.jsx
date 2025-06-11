import React from 'react';
import PropTypes from 'prop-types';
import './GameCard.css';

/**
 * Game card component for displaying game information
 * @param {Object} props Component props
 * @param {Object} props.game Game object with id, name, description, thumbnail and tags
 * @param {Function} props.onClick Click handler for the game card
 * @returns {JSX.Element} Game card component
 */
function GameCard({ game, onClick }) {
  const { name, description, thumbnail, tags } = game;
  
  // Handle missing thumbnail - use data URI instead of external image
  const handleImageError = (e) => {
    // Simple colored rectangle as placeholder (light blue)
    e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="%234a6ea9"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle">Game Image</text></svg>';
  };

  return (
    <div className="game-card" onClick={onClick}>
      <div className="game-card__image-container">
        <img 
          src={thumbnail} 
          alt={name} 
          className="game-card__image"
          onError={handleImageError}
        />
      </div>
      
      <div className="game-card__content">
        <h3 className="game-card__title">{name}</h3>
        
        <p className="game-card__description">
          {description.length > 100 
            ? `${description.substring(0, 100)}...` 
            : description}
        </p>
        
        <div className="game-card__tags">
          {tags && tags.map((tag, index) => (
            <span key={index} className="game-card__tag">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="game-card__footer">
          <button className="game-card__button">Play Now</button>
        </div>
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
  onClick: () => {}
};

export default GameCard; 