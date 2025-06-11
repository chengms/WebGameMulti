import React, { useState } from 'react';
import { submitScore } from '../../utils/leaderboardService';
import './ScoreSubmitForm.css';

/**
 * 分数提交表单组件
 * @param {Object} props - 组件属性
 * @param {string} props.gameId - 游戏ID
 * @param {number} props.score - 游戏分数
 * @param {Function} props.onSubmitSuccess - 提交成功回调
 * @param {Function} props.onCancel - 取消提交回调
 * @returns {JSX.Element} 分数提交表单组件
 */
function ScoreSubmitForm({ gameId, score, onSubmitSuccess, onCancel }) {
  const [playerName, setPlayerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!playerName.trim()) {
      setError('请输入玩家名称');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      const result = await submitScore(gameId, {
        playerName: playerName.trim(),
        score
      });
      
      if (result.success) {
        if (onSubmitSuccess) {
          onSubmitSuccess(result);
        }
      }
    } catch (err) {
      setError(err.message || '提交分数失败，请重试');
      console.error('提交分数失败:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="score-form">
      <div className="score-form__header">
        <h3 className="score-form__title">提交您的分数</h3>
        <button 
          className="score-form__close-button" 
          onClick={onCancel}
          aria-label="关闭"
        >
          ×
        </button>
      </div>
      
      <div className="score-form__content">
        <div className="score-form__score-display">
          <span className="score-form__score-label">您的分数:</span>
          <span className="score-form__score-value">{score}</span>
        </div>
        
        <form onSubmit={handleSubmit} className="score-form__form">
          <div className="score-form__field">
            <label htmlFor="playerName" className="score-form__label">
              玩家名称:
            </label>
            <input
              id="playerName"
              type="text"
              className="score-form__input"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="输入您的名称"
              disabled={isSubmitting}
              maxLength={20}
              required
            />
          </div>
          
          {error && (
            <div className="score-form__error">
              {error}
            </div>
          )}
          
          <div className="score-form__actions">
            <button
              type="button"
              className="score-form__cancel-button"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              取消
            </button>
            <button
              type="submit"
              className="score-form__submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? '提交中...' : '提交分数'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ScoreSubmitForm; 