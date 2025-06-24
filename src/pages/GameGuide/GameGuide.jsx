import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useGames } from '../../contexts/GameContext';
import GameCard from '../../components/game/GameCard';
import './GameGuide.css';

/**
 * Game guide component for displaying detailed game guides and strategies
 * @returns {JSX.Element} Game guide component
 */
function GameGuide() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { games, loading } = useGames();
  const [game, setGame] = useState(null);
  const [guide, setGuide] = useState(null);
  const [relatedGames, setRelatedGames] = useState([]);

  // 游戏攻略数据
  const gameGuides = {
    '2048': {
      title: 'Master the 2048 Game: Complete Strategy Guide',
      description: 'Learn expert strategies, tips, and tricks to reach the 2048 tile and beyond in this addictive puzzle game.',
      content: {
        overview: 'The 2048 game is a sliding puzzle that challenges you to combine tiles with the same number to reach the 2048 tile. While it seems simple, mastering this game requires strategy, patience, and forward thinking.',
        basicRules: [
          'Use arrow keys to slide tiles in four directions (up, down, left, right)',
          'When two tiles with the same number touch, they merge into one',
          'A new tile (2 or 4) appears after each move',
          'The game ends when the board is full and no moves are possible',
          'Goal: Create a tile with the number 2048 to win'
        ],
        strategies: [
          {
            title: 'Corner Strategy',
            description: 'Keep your highest number tile in one corner throughout the game.',
            details: 'Choose a corner (preferably bottom-right) and never move your highest tile away from it. Build your tiles in a descending pattern from the corner.'
          },
          {
            title: 'Edge Building',
            description: 'Build your highest numbers along one edge of the board.',
            details: 'Focus on building a snake-like pattern along the bottom edge, keeping higher numbers towards your chosen corner.'
          },
          {
            title: 'Avoid Up Movement',
            description: 'If your corner is bottom-right, avoid pressing the up arrow.',
            details: 'This prevents accidentally moving your highest tile away from the corner and maintains your building pattern.'
          },
          {
            title: 'Plan Ahead',
            description: 'Think 2-3 moves ahead before making any move.',
            details: 'Consider where new tiles might appear and how they affect your strategy. Always have a backup plan.'
          }
        ],
        tips: [
          'Start each game by moving tiles towards your chosen corner',
          'Keep the board as organized as possible',
          'Try to merge smaller tiles first to clear space',
          'Be patient - rushing leads to mistakes',
          'Practice the corner strategy until it becomes second nature',
          'Watch for opportunities to set up chain reactions',
          'If you get stuck, try to create space by merging any available tiles'
        ],
        commonMistakes: [
          'Moving tiles randomly without a strategy',
          'Changing your corner choice mid-game',
          'Focusing only on creating 2048 and ignoring board management',
          'Making moves too quickly without thinking',
          'Giving up too early when the board looks messy'
        ],
        advanced: [
          'Once you reach 2048, continue playing to reach 4096, 8192, or higher',
          'Learn the "snake pattern" for optimal tile organization',
          'Master the art of setting up multiple merges in sequence',
          'Practice different corner strategies to find your preference',
          'Study probability - 90% chance of getting a 2, 10% chance of getting a 4'
        ]
      },
      relatedSearches: ['2048 strategy', '2048 tips', '2048 corner method', 'how to win 2048', '2048 game guide']
    },
    'tetris': {
      title: 'Tetris Mastery: From Beginner to Expert',
      description: 'Complete guide to dominating Tetris with advanced techniques, stacking strategies, and line-clearing methods.',
      content: {
        overview: 'Tetris is the ultimate puzzle game that has captivated players for decades. Success requires quick thinking, spatial awareness, and strategic planning.',
        basicRules: [
          'Seven different shaped blocks (Tetrominoes) fall from the top',
          'Rotate and move pieces to fit them together',
          'Complete horizontal lines to clear them and score points',
          'Game speed increases as you progress',
          'Game ends when pieces reach the top of the playing field'
        ],
        strategies: [
          {
            title: 'T-Spin Mastery',
            description: 'Learn to perform T-spins for maximum points.',
            details: 'T-spins are advanced moves where you rotate a T-piece into position, clearing lines for bonus points. Practice T-spin setups to dramatically increase your score.'
          },
          {
            title: 'Stack Management',
            description: 'Keep your stack flat and organized.',
            details: 'Avoid creating high columns and deep holes. Maintain a relatively flat surface to give yourself more placement options.'
          },
          {
            title: 'Line Clearing Strategy',
            description: 'Prioritize Tetrises (4-line clears) for maximum points.',
            details: 'Build up your stack while leaving a single column open for I-pieces to create Tetrises. This scoring method is the most efficient.'
          },
          {
            title: 'Piece Preview Usage',
            description: 'Use the next piece preview to plan ahead.',
            details: 'Always look at the next 1-6 pieces (depending on game version) to plan your moves. This foresight is crucial for advanced play.'
          }
        ],
        tips: [
          'Learn the rotation system of your Tetris version',
          'Practice playing at higher speeds to improve reaction time',
          'Focus on efficiency over speed when starting',
          'Master the hard drop for quick piece placement',
          'Learn to hold pieces strategically for better sequences',
          'Practice opening strategies like TKI-3 or DT Cannon',
          'Watch professional players to learn advanced techniques'
        ],
        commonMistakes: [
          'Creating holes in your stack',
          'Panicking at higher speeds',
          'Not using the hold function effectively',
          'Focusing only on clearing single lines',
          'Poor rotation timing',
          'Not planning for upcoming pieces'
        ],
        advanced: [
          'Master modern stacking methods like LST or TKI',
          'Learn advanced T-spin setups and combos',
          'Practice sprint modes for speed improvement',
          'Study opening sequences and transitions',
          'Develop muscle memory for common piece placements',
          'Learn finesse (optimal key sequences) for each piece'
        ]
      },
      relatedSearches: ['tetris strategy', 'tetris t-spin', 'tetris stacking', 'how to play tetris', 'tetris guide']
    },
    'snake': {
      title: 'Snake Game Mastery: High Score Strategies',
      description: 'Learn the best techniques to achieve high scores in the classic Snake game with expert movement patterns and strategies.',
      content: {
        overview: 'The Snake game is a classic that tests your planning, reflexes, and spatial awareness. The goal is simple: eat food, grow longer, and avoid crashing into walls or yourself.',
        basicRules: [
          'Control the snake using arrow keys or WASD',
          'Eat food to grow longer and increase your score',
          'Avoid hitting walls or the snake\'s own body',
          'The snake moves continuously and cannot stop',
          'Game speed may increase as you grow longer'
        ],
        strategies: [
          {
            title: 'Wall Hugging',
            description: 'Stay close to walls to create predictable paths.',
            details: 'Following the perimeter of the game area gives you a reliable path and helps avoid accidentally running into your own body.'
          },
          {
            title: 'Spiral Pattern',
            description: 'Create spiral patterns to fill space efficiently.',
            details: 'When the snake gets longer, create spirals from the outside in. This maximizes space usage and creates clear paths.'
          },
          {
            title: 'Corner Strategy',
            description: 'Use corners to your advantage for tight turns.',
            details: 'Corners provide natural turning points and help you maintain control when the snake gets very long.'
          },
          {
            title: 'Food Positioning',
            description: 'Plan your route to food based on your tail position.',
            details: 'Don\'t just head straight for food. Consider where your tail will be and plan a safe path that won\'t trap you.'
          }
        ],
        tips: [
          'Always think about where your tail will be',
          'Don\'t chase your tail - maintain safe distances',
          'Use the edges of the screen as guides',
          'Practice smooth turns to avoid accidental crashes',
          'Stay calm as the snake gets longer',
          'Plan your route to food before moving',
          'Create safe zones by coiling properly'
        ],
        commonMistakes: [
          'Moving too fast without planning',
          'Getting trapped in your own body',
          'Panicking when the snake gets long',
          'Not paying attention to tail position',
          'Taking unnecessary risks for food',
          'Poor turning technique leading to crashes'
        ],
        advanced: [
          'Master the hamiltonian cycle for guaranteed survival',
          'Learn shortcut techniques for faster scoring',
          'Practice emergency maneuvers for tight situations',
          'Develop rhythm and timing for consistent play',
          'Study optimal space-filling patterns',
          'Learn to recover from near-collision situations'
        ]
      },
      relatedSearches: ['snake game strategy', 'snake game tips', 'snake game high score', 'how to play snake', 'snake game guide']
    },
    'pacman': {
      title: 'Pac-Man Strategy Guide: Master the Maze',
      description: 'Complete guide to conquering Pac-Man with ghost patterns, power pellet strategies, and maze navigation techniques.',
      content: {
        overview: 'Pac-Man is an iconic arcade game that requires quick reflexes, pattern recognition, and strategic thinking to navigate mazes while avoiding ghosts.',
        basicRules: [
          'Navigate Pac-Man through the maze using arrow keys',
          'Eat all dots and power pellets to clear each level',
          'Avoid the four ghosts: Blinky (red), Pinky (pink), Inky (cyan), and Sue (orange)',
          'Eat power pellets to temporarily turn ghosts blue and vulnerable',
          'Bonus fruits appear for extra points',
          'Game ends when all lives are lost'
        ],
        strategies: [
          {
            title: 'Ghost Pattern Recognition',
            description: 'Learn each ghost\'s unique behavior pattern.',
            details: 'Blinky chases directly, Pinky aims ahead of you, Inky uses complex patterns, and Sue alternates between chasing and running away. Understanding these patterns is key to survival.'
          },
          {
            title: 'Power Pellet Timing',
            description: 'Save power pellets for strategic moments.',
            details: 'Don\'t use power pellets immediately. Save them for when you\'re surrounded or need to clear a specific area safely.'
          },
          {
            title: 'Corner Strategy',
            description: 'Use corners and tunnels to escape ghosts.',
            details: 'Corners allow you to quickly change direction, while side tunnels let you warp to the other side of the screen.'
          },
          {
            title: 'Clearing Patterns',
            description: 'Develop systematic approaches to clearing each maze.',
            details: 'Clear one section at a time, starting with safer areas and saving dangerous spots for when you have power pellets available.'
          }
        ],
        tips: [
          'Learn the ghost AI patterns for each level',
          'Use the maze tunnels to escape when surrounded',
          'Clear easier areas first, save dangerous corners for last',
          'Watch ghost movement patterns before entering new areas',
          'Time your power pellet usage for maximum ghost eating',
          'Practice quick direction changes for tight escapes',
          'Learn fruit point values and spawning patterns'
        ],
        commonMistakes: [
          'Using power pellets too early or too late',
          'Not paying attention to ghost positions',
          'Getting cornered in dead-end areas',
          'Rushing through mazes without strategy',
          'Not utilizing tunnels for escape',
          'Ignoring bonus fruits'
        ],
        advanced: [
          'Master the ghost cornering technique',
          'Learn advanced patterns for maximum point scoring',
          'Practice speed runs for completing levels quickly',
          'Memorize fruit spawning times and locations',
          'Develop muscle memory for common escape routes',
          'Study level-specific ghost behavior changes'
        ]
      },
      relatedSearches: ['pacman strategy', 'pacman ghost patterns', 'pacman tips', 'how to play pacman', 'pacman maze guide']
    },
    'memory-match': {
      title: 'Memory Match Game: Boost Your Brain Power',
      description: 'Improve your memory and concentration with proven techniques for mastering memory matching games.',
      content: {
        overview: 'Memory Match games challenge your working memory and concentration. Success comes from developing systematic approaches and memory techniques.',
        basicRules: [
          'Click cards to flip them and reveal images',
          'Find pairs of matching cards',
          'Only two cards can be flipped at a time',
          'Matched pairs remain face up',
          'Goal is to match all pairs in minimum time/moves',
          'Game tracks your performance and best scores'
        ],
        strategies: [
          {
            title: 'Systematic Scanning',
            description: 'Develop a consistent pattern for revealing cards.',
            details: 'Start from one corner and work systematically across the board. This ensures you don\'t miss areas and helps with spatial memory.'
          },
          {
            title: 'Memory Palace Technique',
            description: 'Use spatial memory to remember card locations.',
            details: 'Associate card positions with familiar locations or create mental stories linking the images to their positions.'
          },
          {
            title: 'Chunking Method',
            description: 'Group cards into sections for easier memorization.',
            details: 'Divide the board into quadrants or rows and focus on memorizing one section at a time before moving to the next.'
          },
          {
            title: 'Pattern Recognition',
            description: 'Look for visual patterns in card arrangements.',
            details: 'Some games have patterns in how cards are distributed. Recognizing these can give you strategic advantages.'
          }
        ],
        tips: [
          'Start with corner and edge cards for reference points',
          'Use verbal rehearsal to remember card positions',
          'Take your time on the first few reveals to build a mental map',
          'Focus on one pair at a time rather than trying to remember everything',
          'Use the process of elimination as the board empties',
          'Practice regularly to improve working memory capacity',
          'Stay relaxed - stress impairs memory performance'
        ],
        commonMistakes: [
          'Flipping cards too quickly without memorizing',
          'Not using a systematic approach',
          'Getting frustrated and losing concentration',
          'Trying to remember too many cards at once',
          'Not taking advantage of revealed information',
          'Giving up too quickly when the grid seems overwhelming'
        ],
        advanced: [
          'Practice with larger grids to expand memory capacity',
          'Time yourself to improve speed while maintaining accuracy',
          'Try playing with different themes to challenge adaptability',
          'Experiment with different memory techniques to find your best method',
          'Practice memory exercises outside the game to boost overall capacity',
          'Challenge yourself with custom difficulty settings'
        ]
      },
      relatedSearches: ['memory games', 'memory match strategy', 'improve memory', 'concentration games', 'brain training games']
    }
  };

  useEffect(() => {
    if (games.length > 0) {
      const currentGame = games.find(g => g.id === gameId);
      setGame(currentGame);
      
      if (currentGame) {
        setGuide(gameGuides[gameId]);
        
        // Find related games (same tags)
        const related = games
          .filter(g => 
            g.id !== gameId && 
            g.tags && 
            currentGame.tags && 
            g.tags.some(tag => currentGame.tags.includes(tag))
          )
          .slice(0, 4);
        setRelatedGames(related);
      }
    }
  }, [gameId, games]);

  const handleGameClick = (gameId) => {
    navigate(`/games/${gameId}`);
  };

  const handleRelatedGuideClick = (gameId) => {
    navigate(`/guides/${gameId}`);
  };

  if (loading) {
    return (
      <div className="game-guide__loading">
        <div className="game-guide__loading-spinner"></div>
        <p>Loading guide...</p>
      </div>
    );
  }

  if (!game || !guide) {
    return (
      <div className="game-guide">
        <Helmet>
          <title>Game Guide Not Found - GameTime Bar</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="game-guide__error">
          <h1>Guide Not Found</h1>
          <p>The game guide you're looking for is not available yet.</p>
          <button onClick={() => navigate('/guides')}>Browse All Guides</button>
        </div>
      </div>
    );
  }

  return (
    <div className="game-guide">
      <Helmet>
        <title>{guide.title} | GameTime Bar</title>
        <meta name="description" content={guide.description} />
        <meta name="keywords" content={`${game.name} guide, ${game.name} strategy, ${game.name} tips, ${guide.relatedSearches.join(', ')}`} />
        <link rel="canonical" href={`https://gametime.bar/guides/${game.id}`} />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={guide.title} />
        <meta property="og:description" content={guide.description} />
        <meta property="og:image" content={
          game.thumbnail 
            ? `${window.location.origin}/games/${game.id}/${game.thumbnail}` 
            : `${window.location.origin}/placeholder-game.png`
        } />
        <meta property="og:url" content={`https://gametime.bar/guides/${game.id}`} />
        <meta property="og:type" content="article" />
        
        {/* Article structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": guide.title,
            "description": guide.description,
            "image": game.thumbnail 
              ? `${window.location.origin}/games/${game.id}/${game.thumbnail}` 
              : `${window.location.origin}/placeholder-game.png`,
            "author": {
              "@type": "Organization",
              "name": "GameTime Bar"
            },
            "publisher": {
              "@type": "Organization",
              "name": "GameTime Bar",
              "logo": {
                "@type": "ImageObject",
                "url": `${window.location.origin}/favicon.svg`
              }
            },
            "datePublished": new Date().toISOString(),
            "dateModified": new Date().toISOString(),
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://gametime.bar/guides/${game.id}`
            },
            "about": {
              "@type": "VideoGame",
              "name": game.name,
              "description": game.description
            }
          })}
        </script>
      </Helmet>

      <div className="game-guide__header">
        <button 
          className="game-guide__back-button" 
          onClick={() => navigate('/guides')}
        >
          ← Back to All Guides
        </button>
        
        <div className="game-guide__game-info">
          <img 
            src={game.thumbnail ? `/games/${game.id}/${game.thumbnail}` : '/placeholder-game.png'} 
            alt={`${game.name} Game Guide`}
            className="game-guide__game-image"
          />
          <div className="game-guide__game-details">
            <h1 className="game-guide__title">{guide.title}</h1>
            <p className="game-guide__description">{guide.description}</p>
            <div className="game-guide__game-actions">
              <button 
                onClick={() => handleGameClick(game.id)}
                className="game-guide__play-button"
              >
                🎮 Play {game.name} Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="game-guide__content">
        <section className="game-guide__section">
          <h2>Game Overview</h2>
          <p>{guide.content.overview}</p>
        </section>

        <section className="game-guide__section">
          <h2>Basic Rules</h2>
          <ul className="game-guide__list">
            {guide.content.basicRules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </section>

        <section className="game-guide__section">
          <h2>Winning Strategies</h2>
          {guide.content.strategies.map((strategy, index) => (
            <div key={index} className="game-guide__strategy">
              <h3>{strategy.title}</h3>
              <p className="game-guide__strategy-description">{strategy.description}</p>
              <p className="game-guide__strategy-details">{strategy.details}</p>
            </div>
          ))}
        </section>

        <section className="game-guide__section">
          <h2>Pro Tips</h2>
          <ul className="game-guide__list">
            {guide.content.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </section>

        <section className="game-guide__section">
          <h2>Common Mistakes to Avoid</h2>
          <ul className="game-guide__list game-guide__list--mistakes">
            {guide.content.commonMistakes.map((mistake, index) => (
              <li key={index}>{mistake}</li>
            ))}
          </ul>
        </section>

        <section className="game-guide__section">
          <h2>Advanced Techniques</h2>
          <ul className="game-guide__list">
            {guide.content.advanced.map((technique, index) => (
              <li key={index}>{technique}</li>
            ))}
          </ul>
        </section>
      </div>

      {relatedGames.length > 0 && (
        <section className="game-guide__related">
          <h2>Related Games You Might Enjoy</h2>
          <div className="game-guide__related-games">
            {relatedGames.map(relatedGame => (
              <div key={relatedGame.id} className="game-guide__related-game">
                <GameCard 
                  game={relatedGame} 
                  onClick={() => handleGameClick(relatedGame.id)} 
                />
                {gameGuides[relatedGame.id] && (
                  <button 
                    onClick={() => handleRelatedGuideClick(relatedGame.id)}
                    className="game-guide__related-guide-button"
                  >
                    📖 Read Guide
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="game-guide__cta">
        <h2>Ready to Master {game.name}?</h2>
        <p>Put these strategies into practice and start improving your gameplay!</p>
        <button 
          onClick={() => handleGameClick(game.id)}
          className="game-guide__final-cta"
        >
          🎮 Play {game.name} Now
        </button>
      </section>
    </div>
  );
}

export default GameGuide; 