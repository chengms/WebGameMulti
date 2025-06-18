import React, { memo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './GameCard.css';

/**
 * Game card component for displaying game information
 * @param {Object} props Component props
 * @param {Object} props.game Game object with id, name, description, thumbnail and tags
 * @param {Function} props.onClick Click handler for the game card
 * @returns {JSX.Element} Game card component
 */
const GameCard = memo(({ game, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(true);
  }, []);

  const { name, description, thumbnail, tags } = game;
  
  // 生成标签显示文本，限制显示数量
  const displayTags = tags ? tags.slice(0, 3) : [];

  return (
    <Link to={`/game/${game.id}`} className="game-card-link" onClick={onClick}>
      <div className="game-card">
        <div className="game-card-image-container">
          {!imageLoaded && (
            <div className="game-card-image-placeholder">
              <div className="loading-spinner"></div>
            </div>
          )}
          <img 
            src={imageError ? '/placeholder-game.png' : thumbnail}
            alt={name}
            className={`game-card-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="game-card-content">
          <h3 className="game-card-title">{name}</h3>
          <p className="game-card-description">
            {description.length > 100 
              ? `${description.substring(0, 100)}...` 
              : description
            }
          </p>
          <div className="game-card-tags">
            {displayTags.map((tag, index) => (
              <span key={index} className="game-card-tag">
                {tag}
              </span>
            ))}
            {tags && tags.length > 3 && (
              <span className="game-card-tag-more">
                +{tags.length - 3}
              </span>
            )}
          </div>
          <div className="game-card-footer">
            <button className="game-card-button">Play Now</button>
          </div>
        </div>
      </div>
    </Link>
  );
});

GameCard.displayName = 'GameCard';

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