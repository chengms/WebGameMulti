# Cursor编辑器编码规范

本文档提供了在Cursor编辑器中进行WebGameMulti项目开发的最佳实践和配置建议。

## 编辑器配置

### 基本设置

在Cursor编辑器中，建议使用以下基本设置：

```json
{
  "editor.formatOnSave": true,
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.wordWrap": "on",
  "editor.rulers": [100],
  "editor.minimap.enabled": true,
  "editor.fontSize": 14,
  "editor.fontFamily": "Consolas, 'Courier New', monospace",
  "files.eol": "\n",
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true
}
```

### 语言特定设置

对于JavaScript/TypeScript和React开发，推荐以下配置：

```json
{
  "javascript.updateImportsOnFileMove.enabled": "always",
  "typescript.updateImportsOnFileMove.enabled": "always",
  "javascript.format.enable": false,
  "typescript.format.enable": false,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## 代码质量工具配置

### ESLint

在项目根目录创建`.eslintrc.js`文件：

```javascript
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended'
  ],
  plugins: ['react', 'react-hooks', 'jsx-a11y'],
  rules: {
    'react/prop-types': 'warn',
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 'warn'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
```

### Prettier

在项目根目录创建`.prettierrc`文件：

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "arrowParens": "avoid"
}
```

## Cursor AI辅助编码

Cursor编辑器具有强大的AI辅助功能，推荐以下使用方式：

### 有效使用AI补全

1. **编写注释后使用AI补全**：在函数或组件前编写详细的JSDoc注释，然后使用AI补全功能生成代码骨架。

   ```jsx
   /**
    * 游戏卡片组件 - 显示游戏的基本信息和缩略图
    * @param {string} name - 游戏名称
    * @param {string} description - 游戏描述
    * @param {string} thumbnail - 游戏缩略图URL
    * @param {function} onClick - 点击游戏卡片的回调函数
    */
   function GameCard({ /* 使用AI补全参数 */ }) {
     // 使用AI补全组件主体
   }
   ```

2. **分步骤补全复杂功能**：对于复杂功能，先编写高级步骤注释，再逐步使用AI补全每个部分。

   ```jsx
   // 游戏加载功能
   function loadGames() {
     // 1. 从games目录读取所有游戏文件夹
     // 使用AI补全这部分
     
     // 2. 读取每个游戏的meta.json
     // 使用AI补全这部分
     
     // 3. 根据标签分类游戏
     // 使用AI补全这部分
   }
   ```

### AI代码审查

1. 使用Cursor的AI代码审查功能检查以下方面：
   - 代码质量和最佳实践
   - 潜在的性能问题
   - 可访问性(A11y)问题
   - 安全漏洞

2. 解决AI指出的问题，但要保持批判性思考，不要盲目接受所有建议。

### AI重构

使用Cursor的AI重构功能来：
- 提取重复代码为函数
- 将大型组件拆分为小组件
- 优化复杂算法

## 快捷键和工作流

### 推荐快捷键

Cursor基于VS Code，以下是推荐的快捷键：

| 功能 | Windows快捷键 | Mac快捷键 |
|------|--------------|-----------|
| AI补全 | Ctrl+Enter | Cmd+Enter |
| 打开命令面板 | Ctrl+Shift+P | Cmd+Shift+P |
| 格式化文档 | Alt+Shift+F | Option+Shift+F |
| 快速修复 | Ctrl+. | Cmd+. |
| 重命名符号 | F2 | F2 |
| 转到定义 | F12 | F12 |
| 查找所有引用 | Shift+F12 | Shift+F12 |
| 全局搜索 | Ctrl+Shift+F | Cmd+Shift+F |

### 效率工作流

1. **使用多光标编辑**：按住Alt(Windows)或Option(Mac)并点击不同位置，可以创建多个光标进行同时编辑。

2. **使用折叠功能**：对于大型文件，使用代码折叠功能(Ctrl+Shift+[)来隐藏不需要关注的代码块。

3. **利用代码片段**：创建常用的代码片段，快速插入重复性代码结构。

## 版本控制集成

### Git集成

1. 使用Cursor内置的Git功能管理版本：
   - 使用源代码管理视图查看更改
   - 提交前使用差异视图检查更改
   - 使用内置的合并冲突解决工具

2. 遵循以下Git工作流程：
   - 每个功能或修复创建单独的分支
   - 提交消息遵循约定式提交规范(Conventional Commits)
   - 合并前进行代码审查

## 调试技巧

1. **使用内置调试器**：配置调试器来运行和调试应用。
   
2. **浏览器集成**：使用Cursor与浏览器开发工具的集成，直接从浏览器跳转到源代码。

3. **使用日志点**：在不修改代码的情况下添加日志点来输出变量值。

## AI提示工程

为了获得最佳的AI辅助效果，请遵循以下提示工程技巧：

1. **清晰、具体的指令**：
   ```
   // 不好的提示
   // 创建组件
   
   // 好的提示
   // 创建一个React游戏卡片组件，接收游戏名称、描述、缩略图URL和点击回调
   ```

2. **提供上下文**：
   ```
   // 不好的提示
   // 修复这个bug
   
   // 好的提示
   // 修复点击游戏卡片时不触发导航的bug，当前导航使用react-router-dom的useNavigate
   ```

3. **逐步引导AI**：对于复杂任务，将其分解为多个小步骤，逐一让AI完成。

## 团队协作

1. **共享编辑器配置**：将编辑器配置添加到版本控制中，确保团队成员使用一致的环境。

2. **使用实时协作功能**：利用Cursor的实时协作功能进行结对编程和代码审查。

3. **共享AI提示模板**：创建常用AI提示的模板库，以便团队成员可以重用有效的提示。 