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
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [loadStartTime, setLoadStartTime] = useState(null);
  const [isGameFocused, setIsGameFocused] = useState(false);

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
    // For local games, ensure proper path resolution
    if (!isOnline) {
      try {
        // For local games, ensure the path starts with /
        let localPath = gameUrl;
        if (!localPath.startsWith('/')) {
          localPath = '/' + localPath;
        }
        
        console.log(`Local game URL: ${localPath}`);
        return localPath; // Use relative path for local games
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

  // 键盘事件处理 - 防止方向键滚动页面当游戏获得焦点时
  useEffect(() => {
    const handleKeyDown = (event) => {
      // 只在游戏获得焦点时阻止方向键的默认行为
      if (isGameFocused && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(event.code)) {
        event.preventDefault();
        console.log(`Blocked ${event.code} from scrolling page - game has focus`);
      }
    };

    if (isGameFocused) {
      document.addEventListener('keydown', handleKeyDown, { passive: false });
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isGameFocused]);

  // 鼠标焦点管理
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseEnter = () => {
      if (!isLoading && !hasError && iframeRef.current) {
        iframeRef.current.focus();
        setIsGameFocused(true);
        console.log('Game focused - keyboard controls now for game');
      }
    };

    const handleMouseLeave = () => {
      setIsGameFocused(false);
      // 将焦点返回给document body，允许页面滚动
      document.body.focus();
      console.log('Game unfocused - keyboard controls now for page');
    };

    const handleClick = () => {
      if (!isLoading && !hasError && iframeRef.current) {
        iframeRef.current.focus();
        setIsGameFocused(true);
      }
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('click', handleClick);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('click', handleClick);
    };
  }, [isLoading, hasError]);

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
      
      // 游戏加载完成后，让iframe获得焦点
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.focus();
          setIsGameFocused(true);
        }
      }, 100);
    };

    const handleError = (event) => {
      setIsLoading(false);
      setHasError(true);
      console.error(`Failed to load game: ${title} (${finalGameUrl})`, event);
      console.error(`Game type: ${isOnline ? 'online' : 'local'}`);
      console.error(`Current URL: ${window.location.href}`);
      
      if (onLoadError) {
        onLoadError(finalGameUrl, isOnline);
      }
    };

    // 对于在线游戏，使用更智能的加载检测
    if (isOnline) {
      // 对于跨域iframe，load事件可能不会触发
      // 我们假设如果3秒后没有明显错误，就认为加载成功
      const optimisticTimeout = setTimeout(() => {
        console.log(`Online game presumed loaded: ${title}`);
        setIsLoading(false);
        setHasError(false);
        // 在线游戏加载完成后也获得焦点
        setTimeout(() => {
          if (iframeRef.current) {
            iframeRef.current.focus();
            setIsGameFocused(true);
          }
        }, 100);
      }, 3000);

      // 设置更长的超时时间作为最后的安全网
      const finalTimeout = setTimeout(() => {
        console.warn(`Game loading final timeout: ${title}`);
        setIsLoading(false);
        // 对于在线游戏，不设置错误状态，让用户自己判断
        // setHasError(true);
      }, 30000); // 30秒超时

      iframe.addEventListener('load', handleLoad);
      iframe.addEventListener('error', handleError);

      return () => {
        clearTimeout(optimisticTimeout);
        clearTimeout(finalTimeout);
        iframe.removeEventListener('load', handleLoad);
        iframe.removeEventListener('error', handleError);
      };
    } else {
      // 本地游戏使用更宽松的加载检测
      const optimisticTimeout = setTimeout(() => {
        console.log(`Local game presumed loaded: ${title}`);
        setIsLoading(false);
        setHasError(false);
        // 本地游戏加载完成后也获得焦点
        setTimeout(() => {
          if (iframeRef.current) {
            iframeRef.current.focus();
            setIsGameFocused(true);
          }
        }, 100);
      }, 5000); // 5秒后认为本地游戏加载成功

      // 设置更长的超时时间作为安全网
      const finalTimeout = setTimeout(() => {
        console.warn(`Local game final timeout: ${title}`);
        setIsLoading(false);
        // 对于本地游戏也不设置错误状态，让用户自己判断
        // setHasError(true);
      }, 20000); // 20秒超时

      iframe.addEventListener('load', handleLoad);
      iframe.addEventListener('error', handleError);

      return () => {
        clearTimeout(optimisticTimeout);
        clearTimeout(finalTimeout);
        iframe.removeEventListener('load', handleLoad);
        iframe.removeEventListener('error', handleError);
      };
    }
  }, [finalGameUrl, title, isOnline, onLoadError]);

  // 重新加载游戏
  const handleReload = () => {
    if (iframeRef.current) {
      setIsLoading(true);
      setHasError(false);
      setLoadStartTime(Date.now());
      iframeRef.current.src = iframeRef.current.src; // 重新加载
    }
  };

  // 手动隐藏加载界面
  const handleHideLoading = () => {
    setIsLoading(false);
    setHasError(false);
    // 手动隐藏后也获得焦点
    setTimeout(() => {
      if (iframeRef.current) {
        iframeRef.current.focus();
        setIsGameFocused(true);
      }
    }, 100);
  };

  // 在新窗口中打开游戏
  const handleOpenInNewWindow = () => {
    window.open(gameUrl, '_blank', 'width=1024,height=768,scrollbars=yes,resizable=yes');
  };

  return (
    <div 
      ref={containerRef}
      className={`game-embed-container ${isGameFocused ? 'game-focused' : ''}`} 
      style={{ height }}
    >
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
          <div className="game-loading-actions">
            <button onClick={handleHideLoading} className="game-loading-button">
              {isOnline ? 'Game Already Loaded? Click Here' : 'Skip Loading - Play Now'}
            </button>
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
          sandbox={isOnline 
            ? "allow-scripts allow-same-origin allow-popups allow-forms allow-modals allow-pointer-lock" 
            : "allow-scripts allow-same-origin"
          }
          loading={isOnline ? "lazy" : "eager"}
          tabIndex={0}
          style={{ 
            display: hasError ? 'none' : 'block',
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out',
            outline: isGameFocused ? '2px solid #4a6ea9' : 'none'
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