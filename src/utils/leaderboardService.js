/**
 * Leaderboard Service
 * Provides functions for retrieving and submitting leaderboard data
 */

/**
 * Get game leaderboard data
 * @param {string} gameId - Game ID
 * @param {string} type - Leaderboard type ('global', 'friends', 'weekly')
 * @returns {Promise<Array>} Leaderboard data array
 */
export const getLeaderboard = async (gameId, type = 'global') => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real application, this would be an API call
    // Currently using mock data
    
    // Get different data based on leaderboard type
    if (type === 'global') {
      return getGlobalLeaderboard(gameId);
    } else if (type === 'friends') {
      return getFriendsLeaderboard(gameId);
    } else if (type === 'weekly') {
      return getWeeklyLeaderboard(gameId);
    }
    
    return [];
  } catch (error) {
    console.error('Failed to get leaderboard:', error);
    throw new Error('Failed to get leaderboard data');
  }
};

/**
 * Submit game score to leaderboard
 * @param {string} gameId - Game ID
 * @param {Object} scoreData - Score data
 * @param {string} scoreData.playerName - Player name
 * @param {number} scoreData.score - Game score
 * @returns {Promise<Object>} Submission result
 */
export const submitScore = async (gameId, scoreData) => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Validate data
    if (!scoreData.playerName || !scoreData.score) {
      throw new Error('Please provide player name and score');
    }
    
    // In a real application, this would be an API call
    // Currently just returning a success response
    
    return {
      success: true,
      message: 'Score submitted successfully',
      rank: Math.floor(Math.random() * 10) + 1, // Simulated rank
      data: {
        id: `score_${Date.now()}`,
        gameId,
        playerName: scoreData.playerName,
        score: scoreData.score,
        date: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('Failed to submit score:', error);
    throw new Error(error.message || 'Failed to submit score');
  }
};

/**
 * Get global leaderboard for a game
 * @param {string} gameId - Game ID
 * @returns {Array} Leaderboard data
 */
const getGlobalLeaderboard = (gameId) => {
  // Return different mock data based on game ID
  const leaderboards = {
    'snake': [
      { id: 'gl1', playerName: 'John', score: 980, date: '2023-07-12T10:30:00Z', avatar: null },
      { id: 'gl2', playerName: 'Emily', score: 850, date: '2023-07-10T14:25:00Z', avatar: null },
      { id: 'gl3', playerName: 'Michael', score: 720, date: '2023-07-08T09:15:00Z', avatar: null },
      { id: 'gl4', playerName: 'Sarah', score: 690, date: '2023-07-07T18:40:00Z', avatar: null },
      { id: 'gl5', playerName: 'David', score: 650, date: '2023-07-05T11:20:00Z', avatar: null },
      { id: 'gl6', playerName: 'Jessica', score: 610, date: '2023-07-03T16:10:00Z', avatar: null },
      { id: 'gl7', playerName: 'Daniel', score: 580, date: '2023-07-01T13:45:00Z', avatar: null },
      { id: 'gl8', playerName: 'Alex', score: 550, date: '2023-06-29T19:30:00Z', avatar: null },
      { id: 'gl9', playerName: 'Olivia', score: 520, date: '2023-06-27T08:55:00Z', avatar: null },
      { id: 'gl10', playerName: 'James', score: 490, date: '2023-06-25T12:20:00Z', avatar: null }
    ],
    'memory-match': [
      { id: 'gl1', playerName: 'Emma', score: 1200, date: '2023-07-11T09:45:00Z', avatar: null },
      { id: 'gl2', playerName: 'Noah', score: 1050, date: '2023-07-09T15:30:00Z', avatar: null },
      { id: 'gl3', playerName: 'Sophia', score: 950, date: '2023-07-07T11:20:00Z', avatar: null },
      { id: 'gl4', playerName: 'Liam', score: 900, date: '2023-07-05T14:15:00Z', avatar: null },
      { id: 'gl5', playerName: 'Ava', score: 850, date: '2023-07-03T10:10:00Z', avatar: null },
      { id: 'gl6', playerName: 'William', score: 800, date: '2023-07-01T16:05:00Z', avatar: null },
      { id: 'gl7', playerName: 'Isabella', score: 750, date: '2023-06-29T13:55:00Z', avatar: null },
      { id: 'gl8', playerName: 'Benjamin', score: 700, date: '2023-06-27T09:50:00Z', avatar: null },
      { id: 'gl9', playerName: 'Mia', score: 650, date: '2023-06-25T17:45:00Z', avatar: null },
      { id: 'gl10', playerName: 'Lucas', score: 600, date: '2023-06-23T11:40:00Z', avatar: null }
    ]
  };
  
  return leaderboards[gameId] || [];
};

/**
 * Get friends leaderboard for a game
 * @param {string} gameId - Game ID
 * @returns {Array} Leaderboard data
 */
const getFriendsLeaderboard = (gameId) => {
  // Return mock friends leaderboard data
  return [
    { id: 'fr1', playerName: 'Friend1', score: 830, date: '2023-07-11T10:20:00Z', avatar: null },
    { id: 'fr2', playerName: 'Friend2', score: 780, date: '2023-07-09T15:15:00Z', avatar: null },
    { id: 'fr3', playerName: 'Friend3', score: 720, date: '2023-07-07T09:10:00Z', avatar: null },
    { id: 'fr4', playerName: 'Friend4', score: 650, date: '2023-07-05T14:05:00Z', avatar: null },
    { id: 'fr5', playerName: 'Friend5', score: 600, date: '2023-07-03T11:00:00Z', avatar: null }
  ];
};

/**
 * Get weekly leaderboard for a game
 * @param {string} gameId - Game ID
 * @returns {Array} Leaderboard data
 */
const getWeeklyLeaderboard = (gameId) => {
  // Return mock weekly leaderboard data
  return [
    { id: 'wk1', playerName: 'PlayerA', score: 920, date: '2023-07-12T09:50:00Z', avatar: null },
    { id: 'wk2', playerName: 'PlayerB', score: 870, date: '2023-07-11T14:45:00Z', avatar: null },
    { id: 'wk3', playerName: 'PlayerC', score: 810, date: '2023-07-10T10:40:00Z', avatar: null },
    { id: 'wk4', playerName: 'PlayerD', score: 760, date: '2023-07-09T15:35:00Z', avatar: null },
    { id: 'wk5', playerName: 'PlayerE', score: 710, date: '2023-07-08T11:30:00Z', avatar: null },
    { id: 'wk6', playerName: 'PlayerF', score: 680, date: '2023-07-07T16:25:00Z', avatar: null },
    { id: 'wk7', playerName: 'PlayerG', score: 640, date: '2023-07-06T10:20:00Z', avatar: null }
  ];
}; 