import React, { useState, useEffect } from 'react';
import { getAchievementsWithStatus } from '../../utils/achievementService';
import Achievement from './Achievement';
import './AchievementList.css';

/**
 * Achievement list component
 * @param {Object} props - Component props
 * @param {string} props.gameId - Game ID
 * @returns {JSX.Element} Achievement list component
 */
function AchievementList({ gameId }) {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'unlocked', 'locked'
  
  useEffect(() => {
    const loadAchievements = () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get achievements list and status
        const achievementsData = getAchievementsWithStatus(gameId);
        setAchievements(achievementsData);
      } catch (err) {
        setError('Unable to load achievement data');
        console.error('Failed to load achievements:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadAchievements();
    
    // Refresh achievement status every 30 seconds
    const refreshInterval = setInterval(loadAchievements, 30000);
    
    return () => {
      clearInterval(refreshInterval);
    };
  }, [gameId]);
  
  // Filter achievements based on criteria
  const filteredAchievements = achievements.filter(achievement => {
    if (filter === 'all') return true;
    if (filter === 'unlocked') return achievement.unlocked;
    if (filter === 'locked') return !achievement.unlocked;
    return true;
  });
  
  // Calculate achievement unlock progress
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const progressPercentage = totalCount > 0 ? (unlockedCount / totalCount) * 100 : 0;
  
  return (
    <div className="achievement-list">
      <div className="achievement-list__header">
        <h3 className="achievement-list__title">Game Achievements</h3>
        
        <div className="achievement-list__progress">
          <div className="achievement-list__progress-bar">
            <div 
              className="achievement-list__progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <span className="achievement-list__progress-text">
            {unlockedCount}/{totalCount} ({Math.round(progressPercentage)}%)
          </span>
        </div>
        
        <div className="achievement-list__filters">
          <button 
            className={`achievement-list__filter ${filter === 'all' ? 'achievement-list__filter--active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`achievement-list__filter ${filter === 'unlocked' ? 'achievement-list__filter--active' : ''}`}
            onClick={() => setFilter('unlocked')}
          >
            Unlocked
          </button>
          <button 
            className={`achievement-list__filter ${filter === 'locked' ? 'achievement-list__filter--active' : ''}`}
            onClick={() => setFilter('locked')}
          >
            Locked
          </button>
        </div>
      </div>
      
      {loading && (
        <div className="achievement-list__loading">
          <div className="achievement-list__spinner"></div>
          <p>Loading achievement data...</p>
        </div>
      )}
      
      {error && (
        <div className="achievement-list__error">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      )}
      
      {!loading && !error && filteredAchievements.length === 0 && (
        <div className="achievement-list__empty">
          <p>No achievements found matching the criteria</p>
        </div>
      )}
      
      {!loading && !error && filteredAchievements.length > 0 && (
        <div className="achievement-list__items">
          {filteredAchievements.map(achievement => (
            <Achievement 
              key={achievement.id} 
              achievement={achievement} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AchievementList; 