# WebGameMulti 项目结构说明

本文档详细说明WebGameMulti项目的目录结构和文件组织方式。

## 顶级目录结构

```
WebGameMulti/
├── src/               # 源代码目录
├── public/            # 公共资源目录
├── games/             # 游戏资源目录
├── docs/              # 项目文档
├── node_modules/      # 依赖包
├── package.json       # 项目配置
├── vite.config.js     # Vite配置
└── README.md          # 项目说明
```

## 源代码目录 (src/)

```
src/
├── components/        # 可复用组件
│   ├── common/        # 通用组件
│   ├── layout/        # 布局组件
│   └── game/          # 游戏相关组件
├── pages/             # 页面组件
│   ├── Home/          # 主页
│   ├── GameDetail/    # 游戏详情页
│   └── NotFound/      # 404页面
├── utils/             # 工具函数
│   ├── api.js         # API请求
│   ├── gameLoader.js  # 游戏加载
│   └── helpers.js     # 辅助函数
├── styles/            # 样式文件
│   ├── global.css     # 全局样式
│   └── variables.css  # 变量
├── App.jsx            # 应用入口
├── main.jsx           # 主入口
└── router.jsx         # 路由配置
```

## 游戏目录 (games/)

每个游戏都应该有自己的目录，结构如下：

```
games/
├── example-game/      # 示例游戏
│   ├── index.html     # 游戏入口
│   ├── meta.json      # 游戏元信息
│   ├── game.js        # 游戏脚本
│   ├── style.css      # 游戏样式
│   └── image/         # 游戏图片资源
│       ├── cover.png  # 游戏封面
│       └── ...        # 其他图片
├── another-game/      # 另一个游戏
│   └── ...
└── ...
```

### 游戏元信息 (meta.json)

每个游戏目录下必须包含一个`meta.json`文件，用于描述游戏的基本信息，格式如下：

```json
{
  "name": "示例游戏",
  "description": "这是一个示例游戏，展示游戏集成方式",
  "author": "开发者名称",
  "version": "1.0.0",
  "tags": ["益智", "休闲"],
  "thumbnail": "image/cover.png",
  "controls": "使用方向键移动，空格键跳跃",
  "minWidth": 800,
  "minHeight": 600
}
```

## 组件结构

每个组件都应该有自己的目录，包含组件文件、样式和测试，例如：

```
components/game/GameCard/
├── GameCard.jsx       # 组件
├── GameCard.css       # 样式
└── GameCard.test.jsx  # 测试
```

## 页面结构

每个页面也有类似的结构：

```
pages/Home/
├── Home.jsx           # 页面组件
├── Home.css           # 样式
└── components/        # 页面特有组件
    └── GameGrid.jsx   # 游戏网格组件
```

## 文档目录 (docs/)

```
docs/
├── CODING_STANDARDS.md  # 编码规范
├── PROJECT_STRUCTURE.md # 项目结构
├── GAME_INTEGRATION.md  # 游戏集成指南
└── API_DOCS.md          # API文档
```

## 构建和部署

项目使用Vite进行构建，构建后的文件输出到`dist/`目录：

```
dist/
├── index.html         # 入口HTML
├── assets/            # 打包后的资源
│   ├── js/            # JavaScript文件
│   └── css/           # CSS文件
└── games/             # 游戏资源（复制自games/）
``` 