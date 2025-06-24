import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGames } from '../../contexts/GameContext';
import GameCard from '../../components/game/GameCard';
import { Helmet } from 'react-helmet-async';
import './Home.css';

/**
 * Home page component for displaying game list
 * @returns {JSX.Element} Home page component
 */
function Home() {
  const { filteredGames, loading, error } = useGames();
  const navigate = useNavigate();
  
  // Add debug code
  useEffect(() => {
    console.log('Home component - filteredGames:', filteredGames);
    console.log('Home component - loading:', loading);
    console.log('Home component - error:', error);
  }, [filteredGames, loading, error]);
  
  const handleGameClick = (gameId) => {
    navigate(`/games/${gameId}`);
  };

  return (
    <div className="home">
      <Helmet>
        <title>GameTime Bar - Play Free Online Web Games | Gaming Hub</title>
        <meta name="description" content="Discover and play a huge collection of free online games at GameTime Bar. Including Snake, Tetris, 2048, Memory Match and more. Fun for all ages!" />
        <meta name="keywords" content="free online games, web games, HTML5 games, browser games, GameTime Bar, snake game, tetris, 2048, memory games" />
        <link rel="canonical" href="https://gametime.bar/" />
        
        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content="GameTime Bar - Free Online Games Hub" />
        <meta property="og:description" content="Play amazing free online games including Snake, Tetris, 2048 and more!" />
        <meta property="og:image" content="https://gametime.bar/placeholder-game.png" />
        <meta property="og:url" content="https://gametime.bar/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="GameTime Bar" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GameTime Bar - Free Online Games" />
        <meta name="twitter:description" content="Play amazing free online games including Snake, Tetris, 2048 and more!" />
        <meta name="twitter:image" content="https://gametime.bar/placeholder-game.png" />
        
        {/* 网站结构化数据 */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "https://gametime.bar/#website",
            "name": "GameTime Bar",
            "description": "Free online gaming platform with a collection of HTML5 web games",
            "url": "https://gametime.bar/",
            "inLanguage": "en",
            "isAccessibleForFree": true,
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://gametime.bar/?search={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            },
            "publisher": {
              "@type": "Organization",
              "@id": "https://gametime.bar/#organization",
              "name": "GameTime Bar",
              "url": "https://gametime.bar/",
              "logo": {
                "@type": "ImageObject",
                "url": "https://gametime.bar/favicon.svg"
              }
            }
          })}
        </script>
        
        {/* 游戏集合结构化数据 */}
        {filteredGames.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "Free Online Games Collection",
              "description": "Collection of free online HTML5 games",
              "numberOfItems": filteredGames.length,
              "itemListElement": filteredGames.slice(0, 10).map((game, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "VideoGame",
                  "@id": `https://gametime.bar/games/${game.id}`,
                  "name": game.name,
                  "url": `https://gametime.bar/games/${game.id}`,
                                     "description": game.description,
                   "image": game.thumbnail 
                     ? `${window.location.origin}/games/${game.id}/${game.thumbnail}` 
                     : `${window.location.origin}/games/${game.id}/image/cover.png`,
                   "applicationCategory": "Game",
                  "operatingSystem": "Any",
                  "isAccessibleForFree": true
                }
              }))
            })}
          </script>
        )}
      </Helmet>
      <div className="home__header">
        <h1 className="home__title">Welcome to GameTime Bar</h1>
        <p className="home__subtitle">Your Ultimate Gaming Entertainment Hub</p>
      </div>
      
      {loading && (
        <div className="home__loading">
          <div className="home__loading-spinner"></div>
          <p>Loading games...</p>
        </div>
      )}
      
      {error && (
        <div className="home__error">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      )}
      
      {!loading && !error && (
        <div className="home__games">
          {filteredGames.length === 0 ? (
            <p className="home__empty">No games available</p>
          ) : (
            <>
              <p className="home__debug-info">Found {filteredGames.length} games</p>
              {filteredGames.map(game => (
                <div key={game.id} className="home__game-card">
                  <GameCard 
                    game={game} 
                    onClick={() => handleGameClick(game.id)} 
                  />
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Home; 