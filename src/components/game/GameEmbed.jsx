import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../../styles/gameEmbed.css';

/**
 * Game Embed Component
 * A reusable component for embedding games with proper centering
 * 
 * @param {Object} props - Component props
 * @param {string} props.gameUrl - URL of the game to embed
 * @param {string} props.title - Title of the game (for accessibility)
 * @param {string} props.height - Height of the game container (e.g., '80vh')
 * @returns {JSX.Element} Game embed component
 */
const GameEmbed = ({ gameUrl, title, height = '80vh' }) => {
  const iframeRef = useRef(null);

  // 调整iframe大小以适应容器
  useEffect(() => {
    const adjustIframeSize = () => {
      if (iframeRef.current) {
        const container = iframeRef.current.parentElement;
        if (container) {
          const containerWidth = container.clientWidth;
          const containerHeight = container.clientHeight;
          
          // 设置iframe尺寸以填满容器
          iframeRef.current.style.width = `${containerWidth}px`;
          iframeRef.current.style.height = `${containerHeight}px`;
        }
      }
    };

    // 初始调整
    adjustIframeSize();
    
    // 监听窗口大小变化
    window.addEventListener('resize', adjustIframeSize);
    
    return () => {
      window.removeEventListener('resize', adjustIframeSize);
    };
  }, []);

  return (
    <div className="game-embed-container" style={{ height }}>
      <div className="game-embed-wrapper">
        <iframe 
          ref={iframeRef}
          src={gameUrl} 
          title={title}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

GameEmbed.propTypes = {
  gameUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  height: PropTypes.string
};

export default GameEmbed; 