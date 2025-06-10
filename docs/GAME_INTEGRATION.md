# WebGameMulti 游戏集成指南

本文档详细说明如何将新游戏集成到 WebGameMulti 平台中。

## 概述

WebGameMulti 平台采用文件夹式的游戏集成方式，每个游戏在 `games/` 目录下有独立的文件夹。平台会自动检测和加载这些游戏，并在主页上展示。

## 游戏集成步骤

### 1. 创建游戏目录

在 `games/` 目录下创建一个新的文件夹，文件夹名称应该是游戏的英文名，使用小写字母和连字符，例如：`snake-game`。

```
games/
└── snake-game/
```

### 2. 创建必要文件

每个游戏目录必须包含以下文件：

- `index.html`：游戏主入口文件
- `meta.json`：游戏元信息文件
- `image/`：图片资源目录
  - `cover.png`：游戏封面图（建议尺寸：300x200px）

其他文件可以根据需要添加，例如：

- `game.js`：游戏主脚本
- `style.css`：游戏样式
- 其他资源文件

### 3. 编写游戏元信息

`meta.json` 文件用于描述游戏的基本信息，格式如下：

```json
{
  "name": "贪吃蛇",
  "description": "经典贪吃蛇游戏，通过键盘控制蛇的移动，吃到食物后长大，撞到墙壁或自身则游戏结束。",
  "author": "开发者名称",
  "version": "1.0.0",
  "tags": ["益智", "休闲", "经典"],
  "thumbnail": "image/cover.png",
  "controls": "使用方向键控制蛇的移动",
  "minWidth": 800,
  "minHeight": 600,
  "createdAt": "2023-06-10",
  "updatedAt": "2023-06-15"
}
```

| 字段 | 类型 | 必填 | 描述 |
|------|------|------|------|
| name | 字符串 | 是 | 游戏名称 |
| description | 字符串 | 是 | 游戏描述 |
| author | 字符串 | 否 | 游戏作者 |
| version | 字符串 | 否 | 游戏版本 |
| tags | 字符串数组 | 是 | 游戏标签 |
| thumbnail | 字符串 | 是 | 游戏封面图路径 |
| controls | 字符串 | 否 | 游戏操作说明 |
| minWidth | 数字 | 否 | 游戏最小宽度 |
| minHeight | 数字 | 否 | 游戏最小高度 |
| createdAt | 字符串 | 否 | 创建日期 |
| updatedAt | 字符串 | 否 | 更新日期 |

### 4. 编写游戏入口文件

`index.html` 是游戏的主入口文件，应该包含完整的 HTML 结构。例如：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>贪吃蛇</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div id="game-container">
    <canvas id="game-canvas"></canvas>
    <div id="score">分数: 0</div>
  </div>
  
  <script src="game.js"></script>
</body>
</html>
```

### 5. 游戏实现注意事项

#### 资源路径

游戏内部资源引用应使用相对路径，例如：

```html
<!-- 正确 -->
<img src="image/sprite.png">
<script src="game.js"></script>

<!-- 错误 -->
<img src="/games/snake-game/image/sprite.png">
```

#### 游戏尺寸

游戏应该能够适应不同尺寸的容器。最好使用响应式设计，或者提供 `minWidth` 和 `minHeight` 参数指定最小尺寸。

#### 游戏状态

游戏应该提供暂停和恢复功能，以便用户离开页面后返回时能继续游戏。

#### 全局变量

避免使用全局变量，以防止与平台或其他游戏冲突。建议将游戏逻辑封装在自执行函数或模块中。

```javascript
// 推荐
(function() {
  // 游戏代码
})();

// 或者使用 ES 模块
export default class Game {
  // 游戏代码
}
```

### 6. 测试游戏

集成完成后，启动平台并测试游戏功能是否正常：

1. 游戏能否正常加载
2. 游戏功能是否正常
3. 游戏在不同尺寸下的表现
4. 游戏的错误处理

## 高级集成选项

### 游戏通信

如果游戏需要与平台通信（例如保存分数、获取用户信息等），可以通过 `window.parent.postMessage` 进行：

```javascript
// 游戏内发送消息到平台
window.parent.postMessage({
  type: 'SCORE_UPDATE',
  score: 100
}, '*');

// 监听平台消息
window.addEventListener('message', function(event) {
  if (event.data.type === 'PAUSE_GAME') {
    // 暂停游戏
  }
});
```

### 游戏打包

对于复杂的游戏，建议使用打包工具（如 webpack、rollup 等）将游戏打包成单文件或少量文件，然后集成到平台中。

## 常见问题

### 1. 游戏不显示在主页上

- 检查 `meta.json` 文件格式是否正确
- 确保游戏目录结构符合规范
- 查看控制台是否有错误信息

### 2. 游戏加载出错

- 检查资源路径是否正确
- 确保所有资源都可以正常加载
- 查看控制台错误信息

### 3. 游戏与平台样式冲突

- 使用游戏特定的 CSS 类名，避免与平台样式冲突
- 考虑在游戏中使用 CSS 重置或隔离样式

## 示例游戏

参考 `games/example-game/` 目录，其中包含一个完整的示例游戏，可以作为开发新游戏的参考。 