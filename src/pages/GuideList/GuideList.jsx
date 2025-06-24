import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useGames } from '../../contexts/GameContext';
import './GuideList.css';

/**
 * Guide list component for displaying all available game guides
 * @returns {JSX.Element} Guide list component
 */
function GuideList() {
  const navigate = useNavigate();
  const { games, loading } = useGames();

  // 有攻略的游戏列表
  const availableGuides = [
    {
      id: '2048',
      title: 'Master the 2048 Game: Complete Strategy Guide',
      description: 'Learn expert strategies, tips, and tricks to reach the 2048 tile and beyond in this addictive puzzle game.',
      difficulty: 'Beginner',
      readTime: '8 min read',
      tags: ['Strategy', 'Puzzle', 'Logic']
    },
    {
      id: 'tetris',
      title: 'Tetris Mastery: From Beginner to Expert',
      description: 'Complete guide to dominating Tetris with advanced techniques, stacking strategies, and line-clearing methods.',
      difficulty: 'Intermediate',
      readTime: '12 min read',
      tags: ['Strategy', 'Puzzle', 'Skill']
    },
    {
      id: 'snake',
      title: 'Snake Game Mastery: High Score Strategies',
      description: 'Learn the best techniques to achieve high scores in the classic Snake game with expert movement patterns and strategies.',
      difficulty: 'Beginner',
      readTime: '6 min read',
      tags: ['Strategy', 'Arcade', 'Classic']
    },
    {
      id: 'pacman',
      title: 'Pac-Man Strategy Guide: Master the Maze',
      description: 'Complete guide to conquering Pac-Man with ghost patterns, power pellet strategies, and maze navigation techniques.',
      difficulty: 'Intermediate',
      readTime: '10 min read',
      tags: ['Strategy', 'Arcade', 'Pattern Recognition']
    },
    {
      id: 'memory-match',
      title: 'Memory Match Game: Boost Your Brain Power',
      description: 'Improve your memory and concentration with proven techniques for mastering memory matching games.',
      difficulty: 'Beginner',
      readTime: '5 min read',
      tags: ['Memory', 'Brain Training', 'Concentration']
    }
  ];

  const handleGuideClick = (gameId) => {
    navigate(`/guides/${gameId}`);
  };

  const handleGameClick = (gameId) => {
    navigate(`/games/${gameId}`);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return '#28a745';
      case 'Intermediate': return '#ffc107';
      case 'Advanced': return '#dc3545';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return (
      <div className="guide-list__loading">
        <div className="guide-list__loading-spinner"></div>
        <p>Loading guides...</p>
      </div>
    );
  }

  return (
    <div className="guide-list">
      <Helmet>
        <title>Game Guides & Strategies | Master Your Favorite Games | GameTime Bar</title>
        <meta name="description" content="Master your favorite games with our comprehensive strategy guides. Learn expert tips, tricks, and techniques for 2048, Tetris, Snake, Pac-Man, and more popular online games." />
        <meta name="keywords" content="game guides, gaming strategies, game tips, how to play games, 2048 guide, tetris strategy, snake game tips, pacman guide, game tutorials" />
        <link rel="canonical" href="https://gametime.bar/guides" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Game Guides & Strategies | GameTime Bar" />
        <meta property="og:description" content="Master your favorite games with our comprehensive strategy guides and expert tips." />
        <meta property="og:image" content="https://gametime.bar/placeholder-game.png" />
        <meta property="og:url" content="https://gametime.bar/guides" />
        <meta property="og:type" content="website" />
        
        {/* Guides collection structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Game Strategy Guides Collection",
            "description": "Comprehensive collection of game guides and strategies",
            "url": "https://gametime.bar/guides",
            "numberOfItems": availableGuides.length,
            "itemListElement": availableGuides.map((guide, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Article",
                "@id": `https://gametime.bar/guides/${guide.id}`,
                "name": guide.title,
                "description": guide.description,
                "url": `https://gametime.bar/guides/${guide.id}`,
                "author": {
                  "@type": "Organization",
                  "name": "GameTime Bar"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "GameTime Bar"
                }
              }
            }))
          })}
        </script>
      </Helmet>

      <div className="guide-list__header">
        <h1 className="guide-list__title">Game Strategy Guides</h1>
        <p className="guide-list__subtitle">
          Master your favorite games with our comprehensive guides, expert strategies, and proven techniques. 
          Level up your gameplay and achieve higher scores!
        </p>
      </div>

      <div className="guide-list__stats">
        <div className="guide-list__stat">
          <span className="guide-list__stat-number">{availableGuides.length}</span>
          <span className="guide-list__stat-label">Expert Guides</span>
        </div>
        <div className="guide-list__stat">
          <span className="guide-list__stat-number">10K+</span>
          <span className="guide-list__stat-label">Players Helped</span>
        </div>
        <div className="guide-list__stat">
          <span className="guide-list__stat-number">95%</span>
          <span className="guide-list__stat-label">Success Rate</span>
        </div>
      </div>

      <div className="guide-list__content">
        <div className="guide-list__guides">
          {availableGuides.map((guide) => {
            const game = games.find(g => g.id === guide.id);
            return (
              <article key={guide.id} className="guide-card">
                <div className="guide-card__image-container">
                  <img 
                    src={game?.thumbnail ? `/games/${guide.id}/${game.thumbnail}` : '/placeholder-game.png'}
                    alt={`${guide.title} - Game Strategy Guide`}
                    className="guide-card__image"
                    loading="lazy"
                  />
                  <div className="guide-card__overlay">
                    <button 
                      onClick={() => handleGuideClick(guide.id)}
                      className="guide-card__read-button"
                    >
                      📖 Read Guide
                    </button>
                    {game && (
                      <button 
                        onClick={() => handleGameClick(guide.id)}
                        className="guide-card__play-button"
                      >
                        🎮 Play Game
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="guide-card__content">
                  <div className="guide-card__meta">
                    <span 
                      className="guide-card__difficulty"
                      style={{ backgroundColor: getDifficultyColor(guide.difficulty) }}
                    >
                      {guide.difficulty}
                    </span>
                    <span className="guide-card__read-time">{guide.readTime}</span>
                  </div>
                  
                  <h2 className="guide-card__title">
                    <button 
                      onClick={() => handleGuideClick(guide.id)}
                      className="guide-card__title-link"
                    >
                      {guide.title}
                    </button>
                  </h2>
                  
                  <p className="guide-card__description">{guide.description}</p>
                  
                  <div className="guide-card__tags">
                    {guide.tags.map((tag, index) => (
                      <span key={index} className="guide-card__tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="guide-list__cta">
        <div className="guide-list__cta-content">
          <h2>Can't Find a Guide for Your Game?</h2>
          <p>We're constantly adding new guides! Check back regularly for updates, or let us know which games you'd like to see covered.</p>
          <button 
            onClick={() => navigate('/')}
            className="guide-list__cta-button"
          >
            🎮 Browse All Games
          </button>
        </div>
      </div>
    </div>
  );
}

export default GuideList; 