import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useGames } from '../../contexts/GameContext';
import GameCard from '../../components/game/GameCard';
import ShareButton from '../../components/game/ShareButton';
import './GameCollection.css';

/**
 * Game collection component for displaying themed game collections
 * @returns {JSX.Element} Game collection component
 */
function GameCollection() {
  const { collectionId } = useParams();
  const navigate = useNavigate();
  const { games, loading } = useGames();
  const [collection, setCollection] = useState(null);
  const [collectionGames, setCollectionGames] = useState([]);

  // 游戏集合数据
  const gameCollections = {
    'popular-puzzle-games': {
      title: 'Top 10 Most Popular Puzzle Games',
      description: 'Challenge your mind with our handpicked selection of the most popular puzzle games. From classic 2048 to brain-bending Tetris, discover games that will keep you thinking for hours.',
      longDescription: 'Puzzle games are perfect for exercising your brain while having fun. These carefully selected games offer the perfect balance of challenge and entertainment, suitable for players of all skill levels.',
      gameIds: ['2048', 'tetris', 'memory-match'],
      tags: ['Puzzle', 'Strategy', 'Brain Training'],
      difficulty: 'Mixed',
      benefits: [
        'Improves problem-solving skills',
        'Enhances cognitive function',
        'Develops pattern recognition',
        'Boosts memory and concentration'
      ],
      tips: [
        'Start with easier levels and gradually increase difficulty',
        'Take breaks to avoid mental fatigue',
        'Practice regularly to improve your skills',
        'Don\'t rush - puzzle games reward patience and strategy'
      ]
    },
    'relaxing-casual-games': {
      title: 'Best Relaxing Games for Stress Relief',
      description: 'Unwind and de-stress with our collection of calming, casual games. Perfect for relaxation after a long day or during short breaks.',
      longDescription: 'Sometimes you just need to relax and unwind. These games are designed to provide a peaceful gaming experience without intense competition or time pressure.',
      gameIds: ['memory-match', '2048'],
      tags: ['Casual', 'Relaxing', 'Stress Relief'],
      difficulty: 'Easy',
      benefits: [
        'Reduces stress and anxiety',
        'Promotes mindfulness and focus',
        'Provides gentle mental stimulation',
        'Perfect for short relaxation breaks'
      ],
      tips: [
        'Play at your own pace without pressure',
        'Focus on the process rather than winning',
        'Use games as meditation breaks',
        'Create a calm environment while playing'
      ]
    },
    'classic-arcade-games': {
      title: 'Classic Arcade Games Collection',
      description: 'Relive the golden age of gaming with our collection of timeless arcade classics. These games have entertained players for decades.',
      longDescription: 'Experience the nostalgia of classic arcade gaming. These timeless games have stood the test of time and continue to provide endless entertainment with their simple yet addictive gameplay.',
      gameIds: ['snake', 'tetris', 'pacman'],
      tags: ['Classic', 'Arcade', 'Retro'],
      difficulty: 'Mixed',
      benefits: [
        'Experience gaming history',
        'Simple controls, endless fun',
        'Perfect for all ages',
        'Nostalgic entertainment'
      ],
      tips: [
        'Master the basics before attempting high scores',
        'Learn classic strategies and patterns',
        'Practice makes perfect with these timeless games',
        'Appreciate the elegant simplicity of retro design'
      ]
    },
    'brain-training-games': {
      title: 'Brain Training & Memory Games',
      description: 'Sharpen your mind with games specifically designed to improve cognitive function, memory, and mental agility.',
      longDescription: 'Keep your brain sharp and healthy with these scientifically-inspired brain training games. Regular play can help improve various cognitive abilities.',
      gameIds: ['memory-match', '2048'],
      tags: ['Brain Training', 'Memory', 'Cognitive'],
      difficulty: 'Progressive',
      benefits: [
        'Improves working memory',
        'Enhances attention span',
        'Develops mental flexibility',
        'Supports cognitive health'
      ],
      tips: [
        'Practice consistently for best results',
        'Challenge yourself with progressive difficulty',
        'Track your improvement over time',
        'Combine different types of brain training'
      ]
    },
    'quick-play-games': {
      title: 'Quick 5-Minute Games',
      description: 'Perfect games for short breaks! Each game can be enjoyed in just a few minutes, making them ideal for busy schedules.',
      longDescription: 'Short on time but need a quick mental break? These games are designed for quick sessions that fit perfectly into your busy day.',
      gameIds: ['snake', 'memory-match', 'tic-tac-toe'],
      tags: ['Quick Play', 'Short Sessions', 'Casual'],
      difficulty: 'Easy to Medium',
      benefits: [
        'Perfect for short breaks',
        'Quick mental refreshment',
        'Easy to start and stop',
        'No long-term commitment needed'
      ],
      tips: [
        'Set a timer for focused short sessions',
        'Use as transition activities between tasks',
        'Perfect for waiting periods',
        'Great for micro-breaks at work'
      ]
    }
  };

  useEffect(() => {
    if (collectionId && gameCollections[collectionId]) {
      const currentCollection = gameCollections[collectionId];
      setCollection(currentCollection);
      
      if (games.length > 0) {
        const filteredGames = games.filter(game => 
          currentCollection.gameIds.includes(game.id)
        );
        setCollectionGames(filteredGames);
      }
    }
  }, [collectionId, games]);

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

  if (loading) {
    return (
      <div className="game-collection__loading">
        <div className="game-collection__loading-spinner"></div>
        <p>Loading collection...</p>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="game-collection">
        <Helmet>
          <title>Collection Not Found - GameTime Bar</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="game-collection__error">
          <h1>Collection Not Found</h1>
          <p>The game collection you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/collections')}>Browse All Collections</button>
        </div>
      </div>
    );
  }

  return (
    <div className="game-collection">
      <Helmet>
        <title>{collection.title} | GameTime Bar</title>
        <meta name="description" content={collection.description} />
        <meta name="keywords" content={`${collection.tags.join(', ')}, online games, free games, web games, ${collection.title.toLowerCase()}`} />
        <link rel="canonical" href={`https://gametime.bar/collections/${collectionId}`} />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={collection.title} />
        <meta property="og:description" content={collection.description} />
        <meta property="og:image" content="https://gametime.bar/placeholder-game.png" />
        <meta property="og:url" content={`https://gametime.bar/collections/${collectionId}`} />
        <meta property="og:type" content="website" />
        
        {/* Collection structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": collection.title,
            "description": collection.description,
            "url": `https://gametime.bar/collections/${collectionId}`,
            "numberOfItems": collectionGames.length,
            "itemListElement": collectionGames.map((game, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "VideoGame",
                "@id": `https://gametime.bar/games/${game.id}`,
                "name": game.name,
                "description": game.description,
                "url": `https://gametime.bar/games/${game.id}`,
                "image": game.thumbnail 
                  ? `${window.location.origin}/games/${game.id}/${game.thumbnail}` 
                  : `${window.location.origin}/placeholder-game.png`,
                "applicationCategory": "Game",
                "isAccessibleForFree": true
              }
            }))
          })}
        </script>
      </Helmet>

      <div className="game-collection__header">
        <button 
          className="game-collection__back-button" 
          onClick={() => navigate('/collections')}
        >
          ← Back to Collections
        </button>
        
        <div className="game-collection__hero">
          <h1 className="game-collection__title">{collection.title}</h1>
          <p className="game-collection__description">{collection.description}</p>
          
          <div className="game-collection__meta">
            <div className="game-collection__meta-item">
              <span className="game-collection__meta-label">Games:</span>
              <span className="game-collection__meta-value">{collectionGames.length}</span>
            </div>
            <div className="game-collection__meta-item">
              <span className="game-collection__meta-label">Difficulty:</span>
              <span className="game-collection__meta-value">{collection.difficulty}</span>
            </div>
            <div className="game-collection__meta-tags">
              {collection.tags.map((tag, index) => (
                <span key={index} className="game-collection__tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Share Button */}
      <ShareButton 
        url={`${window.location.origin}/collections/${collectionId}`}
        title={collection.title}
        description={`${collection.description} - Curated collection of games at GameTime Bar`}
        compact={true}
        platforms={['facebook', 'twitter', 'linkedin', 'reddit']}
      />

      <div className="game-collection__content">
        <section className="game-collection__about">
          <h2>About This Collection</h2>
          <p>{collection.longDescription}</p>
        </section>

        <section className="game-collection__benefits">
          <h2>Why Play These Games?</h2>
          <ul className="game-collection__benefits-list">
            {collection.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </section>

        <section className="game-collection__games">
          <h2>Games in This Collection</h2>
          <div className="game-collection__games-grid">
            {collectionGames.map(game => (
              <div key={game.id} className="game-collection__game-item">
                <GameCard 
                  game={game} 
                  onClick={() => handleGameClick(game.id)} 
                />
                {hasGuide(game.id) && (
                  <button 
                    onClick={() => handleGuideClick(game.id)}
                    className="game-collection__guide-button"
                  >
                    📖 Strategy Guide
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="game-collection__tips">
          <h2>Pro Tips for Success</h2>
          <ul className="game-collection__tips-list">
            {collection.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </section>
      </div>

      <div className="game-collection__cta">
        <h2>Ready to Start Playing?</h2>
        <p>Jump into any game from this collection and start having fun!</p>
        <div className="game-collection__cta-buttons">
          <button 
            onClick={() => navigate('/collections')}
            className="game-collection__cta-button game-collection__cta-button--secondary"
          >
            Browse More Collections
          </button>
          <button 
            onClick={() => navigate('/')}
            className="game-collection__cta-button game-collection__cta-button--primary"
          >
            🎮 Play All Games
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameCollection; 