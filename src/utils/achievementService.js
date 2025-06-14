/**
 * Achievement Service
 * Provides game achievement related functionality
 */

/**
 * Get all achievements for a game
 * @param {string} gameId - Game ID
 * @returns {Promise<Array>} Achievement array
 */
export const getAchievements = async (gameId) => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real application, this would be an API call
    // Currently using mock data
    const achievements = getGameAchievements(gameId);
    
    return achievements;
  } catch (error) {
    console.error('Failed to get achievements:', error);
    throw new Error('Failed to get achievement data');
  }
};

/**
 * Unlock an achievement
 * @param {string} gameId - Game ID
 * @param {string} achievementId - Achievement ID
 * @returns {Promise<Object>} Unlock result
 */
export const unlockAchievement = async (gameId, achievementId) => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // In a real application, this would be an API call
    // Currently just saving to local storage
    
    // Get currently unlocked achievements
    const storageKey = `webgamemulti_achievements_${gameId}`;
    let unlockedAchievements = {};
    
    try {
      const savedData = localStorage.getItem(storageKey);
      if (savedData) {
        unlockedAchievements = JSON.parse(savedData);
      }
    } catch (err) {
      console.error('Failed to read unlocked achievements:', err);
    }
    
    // Update unlock status
    unlockedAchievements[achievementId] = {
      unlockedAt: new Date().toISOString()
    };
    
    // Save to local storage
    localStorage.setItem(storageKey, JSON.stringify(unlockedAchievements));
    
    return {
      success: true,
      message: 'Achievement unlocked',
      achievementId
    };
  } catch (error) {
    console.error('Failed to unlock achievement:', error);
    throw new Error('Failed to unlock achievement');
  }
};

/**
 * Update achievement progress
 * @param {string} gameId - Game ID
 * @param {string} achievementId - Achievement ID
 * @param {number} progress - Achievement progress (0-100)
 * @returns {Promise<Object>} Update result
 */
export const updateAchievementProgress = async (gameId, achievementId, progress) => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Validate progress value
    if (progress < 0 || progress > 100) {
      throw new Error('Progress value must be between 0-100');
    }
    
    // In a real application, this would be an API call
    // Currently just saving to local storage
    
    // Get current achievement progress
    const storageKey = `webgamemulti_achievement_progress_${gameId}`;
    let achievementProgress = {};
    
    try {
      const savedData = localStorage.getItem(storageKey);
      if (savedData) {
        achievementProgress = JSON.parse(savedData);
      }
    } catch (err) {
      console.error('Failed to read achievement progress:', err);
    }
    
    // Update progress
    achievementProgress[achievementId] = progress;
    
    // Save to local storage
    localStorage.setItem(storageKey, JSON.stringify(achievementProgress));
    
    // If progress reaches 100%, automatically unlock achievement
    if (progress >= 100) {
      await unlockAchievement(gameId, achievementId);
    }
    
    return {
      success: true,
      message: 'Achievement progress updated',
      gameId,
      achievementId,
      progress
    };
  } catch (error) {
    console.error('Failed to update achievement progress:', error);
    throw new Error(error.message || 'Failed to update achievement progress');
  }
};

/**
 * Get unlocked achievements for a game
 * @param {string} gameId - Game ID
 * @returns {Object} Unlocked achievements object
 */
export const getUnlockedAchievements = (gameId) => {
  try {
    const storageKey = `webgamemulti_achievements_${gameId}`;
    const savedData = localStorage.getItem(storageKey);
    
    if (savedData) {
      return JSON.parse(savedData);
    }
    
    return {};
  } catch (error) {
    console.error('Failed to get unlocked achievements:', error);
    return {};
  }
};

/**
 * Get achievement progress for a game
 * @param {string} gameId - Game ID
 * @returns {Object} Achievement progress object
 */
export const getAchievementProgress = (gameId) => {
  try {
    const storageKey = `webgamemulti_achievement_progress_${gameId}`;
    const savedData = localStorage.getItem(storageKey);
    
    if (savedData) {
      return JSON.parse(savedData);
    }
    
    return {};
  } catch (error) {
    console.error('Failed to get achievement progress:', error);
    return {};
  }
};

/**
 * Get all achievements for a game, including unlock status and progress
 * @param {string} gameId - Game ID
 * @returns {Array} Achievement array with unlock status and progress
 */
export const getAchievementsWithStatus = (gameId) => {
  // Get all achievements for the game
  const achievements = getGameAchievements(gameId);
  
  // Get unlocked achievements
  const unlockedAchievements = getUnlockedAchievements(gameId);
  
  // Get achievement progress
  const achievementProgress = getAchievementProgress(gameId);
  
  // Merge data
  return achievements.map(achievement => {
    const isUnlocked = !!unlockedAchievements[achievement.id];
    const progress = achievementProgress[achievement.id] || 0;
    
    return {
      ...achievement,
      unlocked: isUnlocked,
      progress: isUnlocked ? 100 : progress
    };
  });
};

/**
 * Get all achievement definitions for a game
 * @param {string} gameId - Game ID
 * @returns {Array} Achievement array
 */
const getGameAchievements = (gameId) => {
  // Achievement definitions for each game
  const gameAchievements = {
    'snake': [
      {
        id: 'snake_beginner',
        title: 'Snake Beginner',
        description: 'Play Snake for the first time',
        icon: null
      },
      {
        id: 'snake_score_100',
        title: 'Small Achievement',
        description: 'Score 100 points',
        icon: null
      },
      {
        id: 'snake_score_500',
        title: 'Snake Master',
        description: 'Score 500 points',
        icon: null
      },
      {
        id: 'snake_score_1000',
        title: 'Snake Legend',
        description: 'Score 1000 points',
        icon: null
      },
      {
        id: 'snake_games_10',
        title: 'Game Enthusiast',
        description: 'Play 10 games',
        icon: null
      }
    ],
    'memory-match': [
      {
        id: 'memory_beginner',
        title: 'Memory Novice',
        description: 'Complete your first memory match game',
        icon: null
      },
      {
        id: 'memory_perfect',
        title: 'Perfect Memory',
        description: 'Complete a game without any errors',
        icon: null
      },
      {
        id: 'memory_speed',
        title: 'Speed Matcher',
        description: 'Complete a game in under 30 seconds',
        icon: null
      },
      {
        id: 'memory_hard',
        title: 'Challenge Accepted',
        description: 'Complete a game on hard difficulty',
        icon: null
      },
      {
        id: 'memory_games_5',
        title: 'Memory Addict',
        description: 'Play 5 games',
        icon: null
      }
    ]
  };
  
  return gameAchievements[gameId] || [];
}; 