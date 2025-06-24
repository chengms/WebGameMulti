# 游戏通信机制文档

## 概述

GameTime Bar 支持游戏与主应用之间的通信，允许游戏发送分数、成就、错误信息等到主应用。这种通信机制使用 HTML5 的 `postMessage` API 实现。

## 支持的消息类型

### 1. 分数提交 (Score)
```javascript
// 在游戏结束后发送分数
window.parent.postMessage({
  type: 'score',
  score: 1500, // 玩家得分
  gameData: {
    level: 5,
    time: 120, // 游戏时长（秒）
    difficulty: 'normal'
  }
}, window.location.origin);
```

### 2. 成就解锁 (Achievement)
```javascript
// 当玩家解锁成就时
window.parent.postMessage({
  type: 'achievement',
  achievement: 'First Victory',
  description: 'Win your first game',
  points: 100
}, window.location.origin);
```

### 3. 游戏准备就绪 (Ready)
```javascript
// 游戏加载完成后
window.parent.postMessage({
  type: 'ready',
  gameVersion: '1.0.0',
  features: ['scoring', 'achievements']
}, window.location.origin);
```

### 4. 错误报告 (Error)
```javascript
// 当游戏发生错误时
window.parent.postMessage({
  type: 'error',
  error: 'Failed to load game assets',
  errorCode: 'ASSET_LOAD_ERROR'
}, window.location.origin);
```

## 实现示例

### 完整的游戏通信类

```javascript
class GameCommunicator {
  constructor() {
    this.parentOrigin = window.location.origin;
    this.isReady = false;
  }

  // 发送消息到主应用
  sendMessage(type, data) {
    const message = {
      type: type,
      timestamp: Date.now(),
      ...data
    };
    
    try {
      window.parent.postMessage(message, this.parentOrigin);
      console.log('Message sent:', message);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  }

  // 游戏准备就绪
  ready(gameInfo = {}) {
    this.isReady = true;
    this.sendMessage('ready', {
      gameVersion: '1.0.0',
      ...gameInfo
    });
  }

  // 提交分数
  submitScore(score, gameData = {}) {
    if (!this.isReady) {
      console.warn('Game not ready, score submission delayed');
      return;
    }
    
    this.sendMessage('score', {
      score: score,
      gameData: gameData
    });
  }

  // 解锁成就
  unlockAchievement(achievement, description = '', points = 0) {
    this.sendMessage('achievement', {
      achievement: achievement,
      description: description,
      points: points
    });
  }

  // 报告错误
  reportError(error, errorCode = 'UNKNOWN_ERROR') {
    this.sendMessage('error', {
      error: error,
      errorCode: errorCode
    });
  }
}

// 使用示例
const gameCommunicator = new GameCommunicator();

// 游戏初始化完成后
gameCommunicator.ready({
  features: ['scoring', 'achievements'],
  difficulty: 'normal'
});

// 游戏过程中
gameCommunicator.submitScore(1500, {
  level: 3,
  time: 120,
  perfect: true
});

gameCommunicator.unlockAchievement(
  'Speed Demon',
  'Complete level in under 60 seconds',
  150
);
```

### 简化版本

如果你只需要基本的分数提交功能：

```javascript
// 游戏结束时，提交分数
function submitScore(score) {
  window.parent.postMessage({
    type: 'score',
    score: score,
    timestamp: Date.now()
  }, window.location.origin);
}

// 游戏加载完成时
function gameReady() {
  window.parent.postMessage({
    type: 'ready',
    timestamp: Date.now()
  }, window.location.origin);
}

// 使用
gameReady(); // 游戏加载完成后调用
submitScore(1500); // 游戏结束时调用
```

## 安全注意事项

1. **Origin 验证**: 始终使用 `window.location.origin` 作为目标源，确保消息只发送给正确的父窗口。

2. **数据验证**: 不要在消息中包含敏感信息或可执行代码。

3. **错误处理**: 包装 `postMessage` 调用在 try-catch 中，以处理可能的错误。

## 主应用响应

主应用会自动监听这些消息并：
- 显示分数提交通知
- 记录成就到用户档案
- 显示错误消息给用户
- 在排行榜中更新分数

## 测试

在开发过程中，你可以打开浏览器的开发者工具查看消息是否正确发送：

```javascript
// 在控制台中测试
window.parent.postMessage({
  type: 'score',
  score: 9999
}, window.location.origin);
```

## 未来扩展

我们计划支持更多消息类型：
- 游戏状态保存/加载
- 多人游戏邀请
- 社交分享
- 游戏设置同步

---

*此文档会随着功能的增加而更新。如有问题，请查看项目文档或联系开发团队。* 