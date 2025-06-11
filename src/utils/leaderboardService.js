/**
 * 排行榜服务
 * 提供获取和提交排行榜数据的功能
 */

/**
 * 获取游戏排行榜数据
 * @param {string} gameId - 游戏ID
 * @param {string} type - 排行榜类型 ('global', 'friends', 'weekly')
 * @returns {Promise<Array>} 排行榜数据数组
 */
export const getLeaderboard = async (gameId, type = 'global') => {
  try {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // 在实际应用中，这里应该是API调用
    // 目前使用模拟数据
    
    // 根据排行榜类型获取不同的数据
    if (type === 'global') {
      return getGlobalLeaderboard(gameId);
    } else if (type === 'friends') {
      return getFriendsLeaderboard(gameId);
    } else if (type === 'weekly') {
      return getWeeklyLeaderboard(gameId);
    }
    
    return [];
  } catch (error) {
    console.error('获取排行榜失败:', error);
    throw new Error('获取排行榜数据失败');
  }
};

/**
 * 提交游戏分数到排行榜
 * @param {string} gameId - 游戏ID
 * @param {Object} scoreData - 分数数据
 * @param {string} scoreData.playerName - 玩家名称
 * @param {number} scoreData.score - 游戏分数
 * @returns {Promise<Object>} 提交结果
 */
export const submitScore = async (gameId, scoreData) => {
  try {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 验证数据
    if (!scoreData.playerName || !scoreData.score) {
      throw new Error('请提供玩家名称和分数');
    }
    
    // 在实际应用中，这里应该是API调用
    // 目前只是返回成功响应
    
    return {
      success: true,
      message: '分数提交成功',
      rank: Math.floor(Math.random() * 10) + 1, // 模拟排名
      data: {
        id: `score_${Date.now()}`,
        gameId,
        playerName: scoreData.playerName,
        score: scoreData.score,
        date: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('提交分数失败:', error);
    throw new Error(error.message || '提交分数失败');
  }
};

/**
 * 获取游戏的全球排行榜
 * @param {string} gameId - 游戏ID
 * @returns {Array} 排行榜数据
 */
const getGlobalLeaderboard = (gameId) => {
  // 根据游戏ID返回不同的模拟数据
  const leaderboards = {
    'snake': [
      { id: 'gl1', playerName: '张三', score: 980, date: '2023-07-12T10:30:00Z', avatar: null },
      { id: 'gl2', playerName: '李四', score: 850, date: '2023-07-10T14:25:00Z', avatar: null },
      { id: 'gl3', playerName: '王五', score: 720, date: '2023-07-08T09:15:00Z', avatar: null },
      { id: 'gl4', playerName: '赵六', score: 690, date: '2023-07-07T18:40:00Z', avatar: null },
      { id: 'gl5', playerName: '钱七', score: 650, date: '2023-07-05T11:20:00Z', avatar: null },
      { id: 'gl6', playerName: '孙八', score: 610, date: '2023-07-03T16:10:00Z', avatar: null },
      { id: 'gl7', playerName: '周九', score: 580, date: '2023-07-01T13:45:00Z', avatar: null },
      { id: 'gl8', playerName: '吴十', score: 550, date: '2023-06-29T19:30:00Z', avatar: null },
      { id: 'gl9', playerName: '郑十一', score: 520, date: '2023-06-27T08:55:00Z', avatar: null },
      { id: 'gl10', playerName: '王十二', score: 490, date: '2023-06-25T12:20:00Z', avatar: null }
    ],
    'memory-match': [
      { id: 'gl1', playerName: '刘一', score: 1200, date: '2023-07-11T09:45:00Z', avatar: null },
      { id: 'gl2', playerName: '陈二', score: 1050, date: '2023-07-09T15:30:00Z', avatar: null },
      { id: 'gl3', playerName: '张三', score: 950, date: '2023-07-07T11:20:00Z', avatar: null },
      { id: 'gl4', playerName: '李四', score: 900, date: '2023-07-05T14:15:00Z', avatar: null },
      { id: 'gl5', playerName: '王五', score: 850, date: '2023-07-03T10:10:00Z', avatar: null },
      { id: 'gl6', playerName: '赵六', score: 800, date: '2023-07-01T16:05:00Z', avatar: null },
      { id: 'gl7', playerName: '孙七', score: 750, date: '2023-06-29T13:55:00Z', avatar: null },
      { id: 'gl8', playerName: '周八', score: 700, date: '2023-06-27T09:50:00Z', avatar: null },
      { id: 'gl9', playerName: '吴九', score: 650, date: '2023-06-25T17:45:00Z', avatar: null },
      { id: 'gl10', playerName: '郑十', score: 600, date: '2023-06-23T11:40:00Z', avatar: null }
    ],
    'example-game': [
      { id: 'gl1', playerName: '刘备', score: 500, date: '2023-07-10T10:00:00Z', avatar: null },
      { id: 'gl2', playerName: '关羽', score: 450, date: '2023-07-08T14:00:00Z', avatar: null },
      { id: 'gl3', playerName: '张飞', score: 400, date: '2023-07-06T09:00:00Z', avatar: null },
      { id: 'gl4', playerName: '诸葛亮', score: 350, date: '2023-07-04T18:00:00Z', avatar: null },
      { id: 'gl5', playerName: '曹操', score: 300, date: '2023-07-02T11:00:00Z', avatar: null }
    ]
  };
  
  return leaderboards[gameId] || [];
};

/**
 * 获取游戏的好友排行榜
 * @param {string} gameId - 游戏ID
 * @returns {Array} 排行榜数据
 */
const getFriendsLeaderboard = (gameId) => {
  // 返回模拟的好友排行榜数据
  return [
    { id: 'fr1', playerName: '好友一', score: 830, date: '2023-07-11T10:20:00Z', avatar: null },
    { id: 'fr2', playerName: '好友二', score: 780, date: '2023-07-09T15:15:00Z', avatar: null },
    { id: 'fr3', playerName: '好友三', score: 720, date: '2023-07-07T09:10:00Z', avatar: null },
    { id: 'fr4', playerName: '好友四', score: 650, date: '2023-07-05T14:05:00Z', avatar: null },
    { id: 'fr5', playerName: '好友五', score: 600, date: '2023-07-03T11:00:00Z', avatar: null }
  ];
};

/**
 * 获取游戏的每周排行榜
 * @param {string} gameId - 游戏ID
 * @returns {Array} 排行榜数据
 */
const getWeeklyLeaderboard = (gameId) => {
  // 返回模拟的每周排行榜数据
  return [
    { id: 'wk1', playerName: '玩家A', score: 920, date: '2023-07-12T09:50:00Z', avatar: null },
    { id: 'wk2', playerName: '玩家B', score: 870, date: '2023-07-11T14:45:00Z', avatar: null },
    { id: 'wk3', playerName: '玩家C', score: 810, date: '2023-07-10T10:40:00Z', avatar: null },
    { id: 'wk4', playerName: '玩家D', score: 760, date: '2023-07-09T15:35:00Z', avatar: null },
    { id: 'wk5', playerName: '玩家E', score: 710, date: '2023-07-08T11:30:00Z', avatar: null },
    { id: 'wk6', playerName: '玩家F', score: 680, date: '2023-07-07T16:25:00Z', avatar: null },
    { id: 'wk7', playerName: '玩家G', score: 640, date: '2023-07-06T10:20:00Z', avatar: null }
  ];
}; 