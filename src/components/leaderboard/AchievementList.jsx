import React, { useState, useEffect } from 'react';
import { getAchievementsWithStatus } from '../../utils/achievementService';
import Achievement from './Achievement';
import './AchievementList.css';

/**
 * 成就列表组件
 * @param {Object} props - 组件属性
 * @param {string} props.gameId - 游戏ID
 * @returns {JSX.Element} 成就列表组件
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
        
        // 获取成就列表及状态
        const achievementsData = getAchievementsWithStatus(gameId);
        setAchievements(achievementsData);
      } catch (err) {
        setError('无法加载成就数据');
        console.error('加载成就失败:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadAchievements();
    
    // 每30秒刷新一次成就状态
    const refreshInterval = setInterval(loadAchievements, 30000);
    
    return () => {
      clearInterval(refreshInterval);
    };
  }, [gameId]);
  
  // 根据筛选条件过滤成就
  const filteredAchievements = achievements.filter(achievement => {
    if (filter === 'all') return true;
    if (filter === 'unlocked') return achievement.unlocked;
    if (filter === 'locked') return !achievement.unlocked;
    return true;
  });
  
  // 计算成就解锁进度
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const progressPercentage = totalCount > 0 ? (unlockedCount / totalCount) * 100 : 0;
  
  return (
    <div className="achievement-list">
      <div className="achievement-list__header">
        <h3 className="achievement-list__title">游戏成就</h3>
        
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
            全部
          </button>
          <button 
            className={`achievement-list__filter ${filter === 'unlocked' ? 'achievement-list__filter--active' : ''}`}
            onClick={() => setFilter('unlocked')}
          >
            已解锁
          </button>
          <button 
            className={`achievement-list__filter ${filter === 'locked' ? 'achievement-list__filter--active' : ''}`}
            onClick={() => setFilter('locked')}
          >
            未解锁
          </button>
        </div>
      </div>
      
      {loading && (
        <div className="achievement-list__loading">
          <div className="achievement-list__spinner"></div>
          <p>加载成就数据...</p>
        </div>
      )}
      
      {error && (
        <div className="achievement-list__error">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>重试</button>
        </div>
      )}
      
      {!loading && !error && filteredAchievements.length === 0 && (
        <div className="achievement-list__empty">
          <p>没有找到符合条件的成就</p>
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