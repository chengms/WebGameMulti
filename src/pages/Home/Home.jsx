import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGames } from '../../contexts/GameContext';
import GameCard from '../../components/game/GameCard';
import './Home.css';

/**
 * Home page component for displaying game list
 * @returns {JSX.Element} Home page component
 */
function Home() {
  const { filteredGames, loading, error } = useGames();
  const navigate = useNavigate();
  
  const handleGameClick = (gameId) => {
    navigate(`/games/${gameId}`);
  };

  return (
    <div className="home">
      <div className="home__header">
        <h1 className="home__title">Welcome to WebGameMulti</h1>
        <p className="home__subtitle">Discover and play a variety of fun web games</p>
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
            filteredGames.map(game => (
              <div key={game.id} className="home__game-card">
                <GameCard 
                  game={game} 
                  onClick={() => handleGameClick(game.id)} 
                />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Home; 