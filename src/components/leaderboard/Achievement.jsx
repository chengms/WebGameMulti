import React from 'react';
import './Achievement.css';

/**
 * 游戏成就组件
 * @param {Object} props - 组件属性
 * @param {Object} props.achievement - 成就对象
 * @param {string} props.achievement.id - 成就ID
 * @param {string} props.achievement.title - 成就标题
 * @param {string} props.achievement.description - 成就描述
 * @param {string} props.achievement.icon - 成就图标
 * @param {boolean} props.achievement.unlocked - 是否已解锁
 * @param {number} props.achievement.progress - 完成进度 (0-100)
 * @returns {JSX.Element} 成就组件
 */
function Achievement({ achievement }) {
  const { title, description, icon, unlocked, progress = 0 } = achievement;
  
  return (
    <div className={`achievement ${unlocked ? 'achievement--unlocked' : ''}`}>
      <div className="achievement__icon">
        {icon ? (
          <img src={icon} alt={title} />
        ) : (
          <div className="achievement__icon-placeholder">🏆</div>
        )}
      </div>
      
      <div className="achievement__content">
        <h4 className="achievement__title">{title}</h4>
        <p className="achievement__description">{description}</p>
        
        {!unlocked && progress > 0 && (
          <div className="achievement__progress">
            <div className="achievement__progress-bar">
              <div 
                className="achievement__progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="achievement__progress-text">{progress}%</span>
          </div>
        )}
      </div>
      
      <div className="achievement__status">
        {unlocked ? (
          <span className="achievement__unlocked-badge">已解锁</span>
        ) : (
          <span className="achievement__locked-badge">未解锁</span>
        )}
      </div>
    </div>
  );
}

export default Achievement; 