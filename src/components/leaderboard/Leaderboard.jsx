import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '../../utils/leaderboardService';
import './Leaderboard.css';

/**
 * 游戏排行榜组件
 * @param {Object} props - 组件属性
 * @param {string} props.gameId - 游戏ID
 * @param {string} props.type - 排行榜类型 ('global', 'friends', 'weekly')
 * @returns {JSX.Element} 排行榜组件
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
        setError('无法加载排行榜数据');
        console.error('加载排行榜失败:', err);
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
          {type === 'global' && '全球排行榜'}
          {type === 'friends' && '好友排行榜'}
          {type === 'weekly' && '每周排行榜'}
        </h3>
        
        <div className="leaderboard__tabs">
          <button className={`leaderboard__tab ${type === 'global' ? 'leaderboard__tab--active' : ''}`}>
            全球
          </button>
          <button className={`leaderboard__tab ${type === 'friends' ? 'leaderboard__tab--active' : ''}`}>
            好友
          </button>
          <button className={`leaderboard__tab ${type === 'weekly' ? 'leaderboard__tab--active' : ''}`}>
            每周
          </button>
        </div>
      </div>
      
      {loading && (
        <div className="leaderboard__loading">
          <div className="leaderboard__spinner"></div>
          <p>加载排行榜数据...</p>
        </div>
      )}
      
      {error && (
        <div className="leaderboard__error">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>重试</button>
        </div>
      )}
      
      {!loading && !error && leaderboardData.length === 0 && (
        <div className="leaderboard__empty">
          <p>暂无排行数据</p>
        </div>
      )}
      
      {!loading && !error && leaderboardData.length > 0 && (
        <table className="leaderboard__table">
          <thead>
            <tr>
              <th className="leaderboard__header-cell leaderboard__header-cell--rank">排名</th>
              <th className="leaderboard__header-cell leaderboard__header-cell--player">玩家</th>
              <th className="leaderboard__header-cell leaderboard__header-cell--score">得分</th>
              <th className="leaderboard__header-cell leaderboard__header-cell--date">日期</th>
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
          <button className="leaderboard__submit-button">提交我的分数</button>
        </div>
      )}
    </div>
  );
}

export default Leaderboard; 