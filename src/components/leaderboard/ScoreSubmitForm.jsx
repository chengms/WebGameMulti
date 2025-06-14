import React, { useState } from 'react';
import { submitScore } from '../../utils/leaderboardService';
import './ScoreSubmitForm.css';

/**
 * Score submission form component
 * @param {Object} props - Component props
 * @param {string} props.gameId - Game ID
 * @param {number} props.score - Game score
 * @param {Function} props.onSubmitSuccess - Submit success callback
 * @param {Function} props.onCancel - Cancel submission callback
 * @returns {JSX.Element} Score submission form component
 */
function ScoreSubmitForm({ gameId, score, onSubmitSuccess, onCancel }) {
  const [playerName, setPlayerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!playerName.trim()) {
      setError('Please enter a player name');
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
      setError(err.message || 'Failed to submit score, please try again');
      console.error('Failed to submit score:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="score-form">
      <div className="score-form__header">
        <h3 className="score-form__title">Submit Your Score</h3>
        <button 
          className="score-form__close-button" 
          onClick={onCancel}
          aria-label="Close"
        >
          ×
        </button>
      </div>
      
      <div className="score-form__content">
        <div className="score-form__score-display">
          <span className="score-form__score-label">Your Score:</span>
          <span className="score-form__score-value">{score}</span>
        </div>
        
        <form onSubmit={handleSubmit} className="score-form__form">
          <div className="score-form__field">
            <label htmlFor="playerName" className="score-form__label">
              Player Name:
            </label>
            <input
              id="playerName"
              type="text"
              className="score-form__input"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name"
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
              Cancel
            </button>
            <button
              type="submit"
              className="score-form__submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Score'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ScoreSubmitForm; 