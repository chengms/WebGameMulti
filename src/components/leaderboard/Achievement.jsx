import React from 'react';
import './Achievement.css';

/**
 * Game achievement component
 * @param {Object} props - Component props
 * @param {Object} props.achievement - Achievement object
 * @param {string} props.achievement.id - Achievement ID
 * @param {string} props.achievement.title - Achievement title
 * @param {string} props.achievement.description - Achievement description
 * @param {string} props.achievement.icon - Achievement icon
 * @param {boolean} props.achievement.unlocked - Whether it's unlocked
 * @param {number} props.achievement.progress - Completion progress (0-100)
 * @returns {JSX.Element} Achievement component
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
          <span className="achievement__unlocked-badge">Unlocked</span>
        ) : (
          <span className="achievement__locked-badge">Locked</span>
        )}
      </div>
    </div>
  );
}

export default Achievement; 