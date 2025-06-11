/**
 * 成就服务
 * 提供游戏成就相关的功能
 */

/**
 * 获取游戏的所有成就
 * @param {string} gameId - 游戏ID
 * @returns {Promise<Array>} 成就数组
 */
export const getAchievements = async (gameId) => {
  try {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // 在实际应用中，这里应该是API调用
    // 目前使用模拟数据
    const achievements = getGameAchievements(gameId);
    
    return achievements;
  } catch (error) {
    console.error('获取成就失败:', error);
    throw new Error('获取成就数据失败');
  }
};

/**
 * 解锁一个成就
 * @param {string} gameId - 游戏ID
 * @param {string} achievementId - 成就ID
 * @returns {Promise<Object>} 解锁结果
 */
export const unlockAchievement = async (gameId, achievementId) => {
  try {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // 在实际应用中，这里应该是API调用
    // 目前只是保存到本地存储
    
    // 获取当前已解锁的成就
    const storageKey = `webgamemulti_achievements_${gameId}`;
    let unlockedAchievements = {};
    
    try {
      const savedData = localStorage.getItem(storageKey);
      if (savedData) {
        unlockedAchievements = JSON.parse(savedData);
      }
    } catch (err) {
      console.error('读取已解锁成就失败:', err);
    }
    
    // 更新解锁状态
    unlockedAchievements[achievementId] = {
      unlockedAt: new Date().toISOString()
    };
    
    // 保存到本地存储
    localStorage.setItem(storageKey, JSON.stringify(unlockedAchievements));
    
    return {
      success: true,
      message: '成就已解锁',
      achievementId
    };
  } catch (error) {
    console.error('解锁成就失败:', error);
    throw new Error('解锁成就失败');
  }
};

/**
 * 更新成就进度
 * @param {string} gameId - 游戏ID
 * @param {string} achievementId - 成就ID
 * @param {number} progress - 成就进度 (0-100)
 * @returns {Promise<Object>} 更新结果
 */
export const updateAchievementProgress = async (gameId, achievementId, progress) => {
  try {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 验证进度值
    if (progress < 0 || progress > 100) {
      throw new Error('进度值必须在0-100之间');
    }
    
    // 在实际应用中，这里应该是API调用
    // 目前只是保存到本地存储
    
    // 获取当前成就进度
    const storageKey = `webgamemulti_achievement_progress_${gameId}`;
    let achievementProgress = {};
    
    try {
      const savedData = localStorage.getItem(storageKey);
      if (savedData) {
        achievementProgress = JSON.parse(savedData);
      }
    } catch (err) {
      console.error('读取成就进度失败:', err);
    }
    
    // 更新进度
    achievementProgress[achievementId] = progress;
    
    // 保存到本地存储
    localStorage.setItem(storageKey, JSON.stringify(achievementProgress));
    
    // 如果进度达到100%，自动解锁成就
    if (progress >= 100) {
      await unlockAchievement(gameId, achievementId);
    }
    
    return {
      success: true,
      message: '成就进度已更新',
      gameId,
      achievementId,
      progress
    };
  } catch (error) {
    console.error('更新成就进度失败:', error);
    throw new Error(error.message || '更新成就进度失败');
  }
};

/**
 * 获取游戏的已解锁成就
 * @param {string} gameId - 游戏ID
 * @returns {Object} 已解锁成就对象
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
    console.error('获取已解锁成就失败:', error);
    return {};
  }
};

/**
 * 获取游戏的成就进度
 * @param {string} gameId - 游戏ID
 * @returns {Object} 成就进度对象
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
    console.error('获取成就进度失败:', error);
    return {};
  }
};

/**
 * 获取游戏的所有成就，包括解锁状态和进度
 * @param {string} gameId - 游戏ID
 * @returns {Array} 包含解锁状态和进度的成就数组
 */
export const getAchievementsWithStatus = (gameId) => {
  // 获取游戏的所有成就
  const achievements = getGameAchievements(gameId);
  
  // 获取已解锁的成就
  const unlockedAchievements = getUnlockedAchievements(gameId);
  
  // 获取成就进度
  const achievementProgress = getAchievementProgress(gameId);
  
  // 合并数据
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
 * 获取游戏的所有成就定义
 * @param {string} gameId - 游戏ID
 * @returns {Array} 成就数组
 */
const getGameAchievements = (gameId) => {
  // 每个游戏的成就定义
  const gameAchievements = {
    'snake': [
      {
        id: 'snake_beginner',
        title: '新手蛇道',
        description: '第一次玩蛇类游戏',
        icon: null
      },
      {
        id: 'snake_score_100',
        title: '小有成就',
        description: '获得100分',
        icon: null
      },
      {
        id: 'snake_score_500',
        title: '蛇神在世',
        description: '获得500分',
        icon: null
      },
      {
        id: 'snake_score_1000',
        title: '蛇坛传说',
        description: '获得1000分',
        icon: null
      },
      {
        id: 'snake_games_10',
        title: '热爱游戏',
        description: '玩10局游戏',
        icon: null
      }
    ],
    'memory-match': [
      {
        id: 'memory_beginner',
        title: '记忆新手',
        description: '完成第一局记忆匹配游戏',
        icon: null
      },
      {
        id: 'memory_perfect',
        title: '完美记忆',
        description: '无错误完成一局游戏',
        icon: null
      },
      {
        id: 'memory_hard',
        title: '硬核玩家',
        description: '完成一局困难模式',
        icon: null
      },
      {
        id: 'memory_speed',
        title: '闪电记忆',
        description: '在30秒内完成一局游戏',
        icon: null
      },
      {
        id: 'memory_games_5',
        title: '记忆大师',
        description: '完成5局游戏',
        icon: null
      }
    ],
    'example-game': [
      {
        id: 'example_play',
        title: '尝鲜者',
        description: '玩示例游戏',
        icon: null
      },
      {
        id: 'example_score',
        title: '有才之人',
        description: '在示例游戏中获得分数',
        icon: null
      }
    ]
  };
  
  return gameAchievements[gameId] || [];
}; 