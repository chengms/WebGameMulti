import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '../../utils/leaderboardService';
import './Leaderboard.css';

/**
 * Game leaderboard component
 * @param {Object} props - Component props
 * @param {string} props.gameId - Game ID
 * @param {string} props.type - Leaderboard type ('global', 'friends', 'weekly')
 * @returns {JSX.Element} Leaderboard component
 */
function Leaderboard({ gameId, type = 'global' }) {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getLeaderboard(gameId, type);
        setLeaderboardData(data);
      } catch (err) {
        setError('Unable to load leaderboard data');
        console.error('Failed to load leaderboard:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLeaderboard();
  }, [gameId, type]);
  
  const renderRankBadge = (rank) => {
    if (rank === 1) {
      return <span className="leaderboard__badge leaderboard__badge--gold">🥇</span>;
    } else if (rank === 2) {
      return <span className="leaderboard__badge leaderboard__badge--silver">🥈</span>;
    } else if (rank === 3) {
      return <span className="leaderboard__badge leaderboard__badge--bronze">🥉</span>;
    }
    return <span className="leaderboard__rank">{rank}</span>;
  };
  
  return (
    <div className="leaderboard">
      <div className="leaderboard__header">
        <h3 className="leaderboard__title">
          {type === 'global' && 'Global Leaderboard'}
          {type === 'friends' && 'Friends Leaderboard'}
          {type === 'weekly' && 'Weekly Leaderboard'}
        </h3>
        
        <div className="leaderboard__tabs">
          <button className={`leaderboard__tab ${type === 'global' ? 'leaderboard__tab--active' : ''}`}>
            Global
          </button>
          <button className={`leaderboard__tab ${type === 'friends' ? 'leaderboard__tab--active' : ''}`}>
            Friends
          </button>
          <button className={`leaderboard__tab ${type === 'weekly' ? 'leaderboard__tab--active' : ''}`}>
            Weekly
          </button>
        </div>
      </div>
      
      {loading && (
        <div className="leaderboard__loading">
          <div className="leaderboard__spinner"></div>
          <p>Loading leaderboard data...</p>
        </div>
      )}
      
      {error && (
        <div className="leaderboard__error">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      )}
      
      {!loading && !error && leaderboardData.length === 0 && (
        <div className="leaderboard__empty">
          <p>No leaderboard data available</p>
        </div>
      )}
      
      {!loading && !error && leaderboardData.length > 0 && (
        <table className="leaderboard__table">
          <thead>
            <tr>
              <th className="leaderboard__header-cell leaderboard__header-cell--rank">Rank</th>
              <th className="leaderboard__header-cell leaderboard__header-cell--player">Player</th>
              <th className="leaderboard__header-cell leaderboard__header-cell--score">Score</th>
              <th className="leaderboard__header-cell leaderboard__header-cell--date">Date</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((entry, index) => (
              <tr key={entry.id} className="leaderboard__row">
                <td className="leaderboard__cell leaderboard__cell--rank">
                  {renderRankBadge(index + 1)}
                </td>
                <td className="leaderboard__cell leaderboard__cell--player">
                  <div className="leaderboard__player">
                    <div className="leaderboard__avatar">
                      {entry.avatar ? (
                        <img src={entry.avatar} alt={entry.playerName} />
                      ) : (
                        <div className="leaderboard__avatar-placeholder">
                          {entry.playerName.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <span className="leaderboard__player-name">{entry.playerName}</span>
                  </div>
                </td>
                <td className="leaderboard__cell leaderboard__cell--score">{entry.score}</td>
                <td className="leaderboard__cell leaderboard__cell--date">
                  {new Date(entry.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      {!loading && !error && (
        <div className="leaderboard__actions">
          <button className="leaderboard__submit-button">Submit My Score</button>
        </div>
      )}
    </div>
  );
}

export default Leaderboard; 