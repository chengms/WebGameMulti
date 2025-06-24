import React, { useState } from 'react';
import './ShareButton.css';

const SOCIAL_PLATFORMS = {
  facebook: {
    name: 'Facebook',
    icon: '📘',
    url: (url, title, description) => 
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title + ' - ' + description)}`,
    color: '#1877f2'
  },
  twitter: {
    name: 'Twitter',
    icon: '🐦',
    url: (url, title, description) => 
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title + ' - ' + description)}&hashtags=games,online,free`,
    color: '#1da1f2'
  },
  linkedin: {
    name: 'LinkedIn',
    icon: '💼',
    url: (url, title, description) => 
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`,
    color: '#0a66c2'
  },
  reddit: {
    name: 'Reddit',
    icon: '🔗',
    url: (url, title, description) => 
      `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title + ' - ' + description)}`,
    color: '#ff4500'
  },
  telegram: {
    name: 'Telegram',
    icon: '✈️',
    url: (url, title, description) => 
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title + ' - ' + description)}`,
    color: '#0088cc'
  },
  whatsapp: {
    name: 'WhatsApp',
    icon: '💬',
    url: (url, title, description) => 
      `https://wa.me/?text=${encodeURIComponent(title + ' - ' + description + ' ' + url)}`,
    color: '#25d366'
  }
};

const ShareButton = ({ 
  url = window.location.href, 
  title = document.title,
  description = 'Play free online games at GameTime Bar',
  className = '',
  compact = false,
  platforms = ['facebook', 'twitter', 'linkedin', 'reddit', 'telegram', 'whatsapp']
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async (platform) => {
    const platformConfig = SOCIAL_PLATFORMS[platform];
    if (!platformConfig) return;

    const shareUrl = platformConfig.url(url, title, description);
    
    // 打开新窗口分享
    const shareWindow = window.open(
      shareUrl,
      'share',
      'width=600,height=400,scrollbars=yes,resizable=yes'
    );

    // 跟踪分享事件（如果有分析工具）
    if (window.gtag) {
      window.gtag('event', 'share', {
        method: platform,
        content_type: 'game',
        item_id: title
      });
    }

    setIsOpen(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      // 跟踪复制事件
      if (window.gtag) {
        window.gtag('event', 'share', {
          method: 'copy_link',
          content_type: 'game', 
          item_id: title
        });
      }
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      // 降级到传统方法
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Fallback copy failed:', err);
      }
      document.body.removeChild(textArea);
    }
  };

  if (compact) {
    return (
      <div className={`share-button-compact ${className}`}>
        <button 
          className="share-toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Share this game"
        >
          🔗 Share
        </button>
        
        {isOpen && (
          <div className="share-dropdown">
            <div className="share-platforms">
              {platforms.map(platformKey => {
                const platform = SOCIAL_PLATFORMS[platformKey];
                return (
                  <button
                    key={platformKey}
                    className="share-platform-btn"
                    onClick={() => handleShare(platformKey)}
                    style={{ '--platform-color': platform.color }}
                    title={`Share on ${platform.name}`}
                  >
                    <span className="platform-icon">{platform.icon}</span>
                  </button>
                );
              })}
              <button
                className="share-platform-btn copy-btn"
                onClick={copyToClipboard}
                title="Copy link"
              >
                <span className="platform-icon">{copied ? '✅' : '📋'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`share-button ${className}`}>
      <div className="share-header">
        <h3>Share This Game</h3>
        <p>Spread the fun with your friends!</p>
      </div>
      
      <div className="share-platforms">
        {platforms.map(platformKey => {
          const platform = SOCIAL_PLATFORMS[platformKey];
          return (
            <button
              key={platformKey}
              className="share-platform-btn"
              onClick={() => handleShare(platformKey)}
              style={{ '--platform-color': platform.color }}
            >
              <span className="platform-icon">{platform.icon}</span>
              <span className="platform-name">{platform.name}</span>
            </button>
          );
        })}
      </div>
      
      <div className="share-copy-section">
        <div className="copy-url-container">
          <input 
            type="text" 
            value={url} 
            readOnly 
            className="copy-url-input"
          />
          <button 
            className={`copy-btn ${copied ? 'copied' : ''}`}
            onClick={copyToClipboard}
          >
            {copied ? '✅ Copied!' : '📋 Copy'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareButton; 