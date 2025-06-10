# WebGameMulti

## 项目概述

WebGameMulti 是一个开源的网页游戏平台，旨在为用户提供一个集中的地方来发现和玩各种网页小游戏。该平台使用统一的英文界面，为玩家提供直观、易用的游戏体验。

## 主要特性

- **自动游戏加载**：系统自动从 `games` 目录加载小游戏
- **分类浏览**：按照游戏类型分类浏览
- **响应式设计**：适配各种屏幕尺寸
- **英文界面**：统一的英文用户界面，提升国际化体验
- **游戏详情**：每个游戏都有详细介绍页面
- **游戏集成标准**：标准化的游戏集成方式

## 技术栈

- React 18
- React Router 6
- Vite
- CSS Modules
- ESLint & Prettier

## 项目结构

```
WebGameMulti/
├── docs/               # 文档
├── games/              # 游戏目录
│   └── example-game/   # 示例游戏
│       ├── image/      # 游戏图片资源
│       └── index.html  # 游戏入口文件
├── src/                # 源代码
│   ├── components/     # 组件
│   ├── pages/          # 页面
│   ├── styles/         # 全局样式
│   └── utils/          # 工具函数
└── public/             # 静态资源
```

## 开发指南

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## 游戏集成

要将新游戏添加到平台，请按照以下步骤操作：

1. 在 `games` 目录下为你的游戏创建一个新文件夹
2. 添加游戏的 HTML 入口文件 (`index.html`)
3. 在 `image` 子目录中添加游戏封面图和截图
4. 游戏必须适配平台的嵌入式环境

详细集成指南请参考 [游戏集成文档](docs/GAME_INTEGRATION.md)。

## 界面语言

WebGameMulti 采用统一的英文用户界面，这有助于：

- 提高平台的国际化程度
- 保持界面的一致性
- 扩大受众范围

界面语言规范详见 [界面语言规范](docs/INTERFACE_LANGUAGE.md)。

## 贡献指南

我们欢迎各种形式的贡献，包括但不限于：

- 提交 bug 报告
- 改进文档
- 提交功能请求
- 贡献代码

请确保遵循我们的 [编码规范](docs/CODING_STANDARDS.md)。

## 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 联系方式

- GitHub: [github.com/webgamemulti](https://github.com/webgamemulti)
- Email: info@webgamemulti.com 