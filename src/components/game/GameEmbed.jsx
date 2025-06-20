import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/gameEmbed.css';

/**
 * Game Embed Component
 * A reusable component for embedding both online and local games with proper handling
 * 
 * @param {Object} props - Component props
 * @param {string} props.gameUrl - URL of the game to embed
 * @param {string} props.title - Title of the game (for accessibility)
 * @param {string} props.height - Height of the game container (e.g., '80vh')
 * @param {boolean} props.isOnline - Whether this is an online game
 * @param {Function} props.onLoadError - Callback when game fails to load
 * @returns {JSX.Element} Game embed component
 */
const GameEmbed = ({ gameUrl, title, height = '80vh', isOnline = false, onLoadError }) => {
  const iframeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [loadStartTime, setLoadStartTime] = useState(null);

  // 检查是否需要使用代理
  const needsProxy = (url) => {
    try {
      const hostname = new URL(url).hostname;
      // 在这里添加需要代理的域名
      return ['www.crazycattle-3d.info'].includes(hostname);
    } catch (e) {
      return false;
    }
  };

  const getFinalGameUrl = () => {
    // For local games, resolve the path relative to the current origin
    if (!isOnline) {
      try {
        // new URL() will correctly handle absolute vs relative paths
        return new URL(gameUrl, window.location.origin).href;
      } catch (e) {
        console.error(`Invalid local game URL: ${gameUrl}`, e);
        return gameUrl; // Fallback to original URL
      }
    }

    // For online games, use proxy if needed
    if (needsProxy(gameUrl)) {
      // Always use relative path for production deployment
      const proxyUrl = `/proxy?url=${encodeURIComponent(gameUrl)}`;
      console.log(`Using proxy for ${gameUrl}: ${proxyUrl}`);
      return proxyUrl;
    }

    // Default case for online games without proxy
    return gameUrl;
  };

  const finalGameUrl = getFinalGameUrl();

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

  // 处理iframe加载事件
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    setLoadStartTime(Date.now());
    setIsLoading(true);
    setHasError(false);

    const handleLoad = () => {
      setIsLoading(false);
      setHasError(false);
      console.log(`Game loaded successfully: ${title}`);
      
      // 记录加载时间
      if (loadStartTime) {
        const loadTime = Date.now() - loadStartTime;
        console.log(`Game load time: ${loadTime}ms`);
      }
    };

    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
      console.error(`Failed to load game: ${title} (${finalGameUrl})`);
      
      if (onLoadError) {
        onLoadError(finalGameUrl, isOnline);
      }
    };

    // 设置超时处理（在线游戏可能需要更长时间）
    const timeout = setTimeout(() => {
      if (isLoading) {
        console.warn(`Game loading timeout: ${title}`);
        setIsLoading(false);
        setHasError(true);
        if (onLoadError) {
          onLoadError(finalGameUrl, isOnline);
        }
      }
    }, isOnline ? 15000 : 10000); // 在线游戏15秒，本地游戏10秒

    iframe.addEventListener('load', handleLoad);
    iframe.addEventListener('error', handleError);

    return () => {
      clearTimeout(timeout);
      iframe.removeEventListener('load', handleLoad);
      iframe.removeEventListener('error', handleError);
    };
  }, [finalGameUrl, title, isOnline, onLoadError, loadStartTime]);

  // 重新加载游戏
  const handleReload = () => {
    if (iframeRef.current) {
      setIsLoading(true);
      setHasError(false);
      setLoadStartTime(Date.now());
      iframeRef.current.src = iframeRef.current.src; // 重新加载
    }
  };

  // 在新窗口中打开游戏
  const handleOpenInNewWindow = () => {
    window.open(gameUrl, '_blank', 'width=1024,height=768,scrollbars=yes,resizable=yes');
  };

  return (
    <div className="game-embed-container" style={{ height }}>
      {/* Loading State */}
      {isLoading && (
        <div className="game-loading-overlay">
          <div className="game-loading-spinner"></div>
          <div className="game-loading-text">
            {isOnline ? 'Loading Online Game...' : 'Loading Game...'}
          </div>
          <div className="game-loading-subtitle">
            {isOnline ? 'First load may take a moment' : 'Please wait'}
          </div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="game-error-overlay">
          <div className="game-error-icon">⚠️</div>
          <div className="game-error-title">Failed to Load Game</div>
          <div className="game-error-message">
            {isOnline 
              ? 'The online game is temporarily unavailable. This could be due to a network issue or maintenance on the game server.' 
              : 'Could not load local game files. Please check if the game files exist.'
            }
          </div>
          <div className="game-error-actions">
            <button onClick={handleReload} className="game-error-button primary">
              Reload
            </button>
            {isOnline && (
              <button onClick={handleOpenInNewWindow} className="game-error-button secondary">
                Open in New Window
              </button>
            )}
          </div>
        </div>
      )}

      {/* Game iframe */}
      <div className="game-embed-wrapper">
        <iframe 
          ref={iframeRef}
          src={finalGameUrl} 
          title={title}
          allowFullScreen
          allow="gamepad; microphone; camera; midi; encrypted-media; autoplay; fullscreen"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals allow-pointer-lock"
          loading="lazy"
          style={{ 
            display: hasError ? 'none' : 'block',
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out'
          }}
        />
      </div>

      {/* Game Controls */}
      {!hasError && (
        <div className="game-controls">
          <div className="game-info">
            <span className="game-type-badge" data-type={isOnline ? 'online' : 'local'}>
              {isOnline ? 'Online' : 'Local'}
            </span>
            <span className="game-title-small">{title}</span>
          </div>
          <div className="game-actions">
            <button 
              onClick={handleReload} 
              className="game-control-button"
              title="Reload Game"
            >
              🔄
            </button>
            {isOnline && (
              <button 
                onClick={handleOpenInNewWindow} 
                className="game-control-button"
                title="Open in New Window"
              >
                🔗
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

GameEmbed.propTypes = {
  gameUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  height: PropTypes.string,
  isOnline: PropTypes.bool,
  onLoadError: PropTypes.func
};

export default GameEmbed; 