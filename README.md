# WebGameMulti

一个聚合多款网页小游戏的站点，支持自动发现和展示`games`目录下的所有小游戏。

## 项目说明

WebGameMulti是一个小游戏平台网站，主要功能是：
- 自动读取并展示games目录下的各种小游戏
- 按照目录分类展示游戏内容
- 提供游戏搜索和过滤功能
- 支持游戏试玩和详情展示

## 目录结构

- `games/`：所有小游戏资源，每个子文件夹为一个独立游戏
- `src/`：前端页面和组件
  - `components/`：可复用组件
  - `pages/`：页面组件
  - `utils/`：工具函数
  - `styles/`：样式文件
- `docs/`：项目文档

## 游戏接入规范

1. 在`games/`下新建文件夹，如`mygame/`
2. 必须包含：
   - `index.html`（游戏主入口）
   - `meta.json`（游戏元信息，见下方格式）
   - `image/`（至少一张缩略图`cover.png`）
3. `meta.json`格式：
   ```json
   {
     "name": "游戏名称",
     "description": "一句话描述",
     "tags": ["标签1", "标签2"],
     "thumbnail": "image/cover.png"
   }
   ```

## 技术栈

- 前端框架：React
- 构建工具：Vite
- 样式：推荐使用Tailwind CSS

## 开发指南

1. 克隆代码库
2. 安装依赖：`npm install`
3. 启动开发服务器：`npm run dev`
4. 打包：`npm run build`

## 贡献指南

欢迎贡献小游戏！请确保遵循游戏接入规范和编码规范。 