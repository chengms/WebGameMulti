# WebGameMulti 编码规范

本文档定义了WebGameMulti项目的编码规范和最佳实践，以确保代码质量和一致性。

## 代码风格

### 通用规则

- 使用2个空格作为缩进
- 每行代码不超过100个字符
- 使用UTF-8编码
- 文件末尾留一个空行
- 删除不必要的空格

### JavaScript/TypeScript 规则

- 使用ESLint检查代码质量
- 使用Prettier自动格式化代码
- 优先使用ES6+语法
- 优先使用`const`，其次是`let`，避免使用`var`
- 使用箭头函数定义匿名函数
- 使用解构赋值
- 使用模板字符串
- 避免使用jQuery等不必要的库

### React 规则

- 组件文件使用JSX/TSX扩展名
- 组件命名使用大驼峰命名法(PascalCase)
- 组件属性使用小驼峰命名法(camelCase)
- 每个组件应该有适当的PropTypes定义
- 使用函数组件和Hooks，避免使用类组件
- 把逻辑抽离成自定义Hooks

### CSS/样式规则

- 使用Tailwind CSS组织样式
- 避免使用内联样式
- 使用CSS变量存储颜色、字体等主题变量
- 使用BEM命名规范命名自定义CSS类

## 命名约定

### 文件命名

- 组件文件：大驼峰(PascalCase)，如`GameCard.jsx`
- 工具函数文件：小驼峰(camelCase)，如`gameUtils.js`
- CSS文件：小写加连字符(kebab-case)，如`game-card.css`
- 测试文件：`[组件名].test.jsx`或`[组件名].spec.jsx`

### 变量命名

- 变量和函数：小驼峰(camelCase)，如`gameList`
- 常量：全大写下划线分隔，如`MAX_GAMES`
- 布尔变量：使用`is`/`has`/`can`等前缀，如`isLoading`
- 事件处理函数：使用`handle`前缀，如`handleClick`

### 组件命名

- 组件名应该是描述性的，如`GameCard`而不是`Card`
- 高阶组件使用`with`前缀，如`withAuth`
- 自定义Hook使用`use`前缀，如`useGameData`

## 项目结构

### 文件组织

- 每个组件一个文件
- 公共组件放在`components`目录
- 页面组件放在`pages`目录
- 工具函数放在`utils`目录
- 样式文件放在`styles`目录
- 游戏资源放在`games`目录

### 导入顺序

1. 外部库
2. 项目内部组件
3. 工具函数
4. 样式文件

示例：

```jsx
// 外部库
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 内部组件
import GameCard from '../components/GameCard';
import Loading from '../components/Loading';

// 工具函数
import { fetchGames } from '../utils/gameUtils';

// 样式
import '../styles/game-list.css';
```

## 注释规范

- 使用JSDoc风格注释函数和组件
- 复杂逻辑需要添加注释
- 避免添加不必要的注释
- 注释应该解释"为什么"而不是"是什么"

示例：

```jsx
/**
 * 游戏卡片组件
 * @param {Object} props - 组件属性
 * @param {string} props.name - 游戏名称
 * @param {string} props.description - 游戏描述
 * @param {string} props.thumbnail - 游戏缩略图路径
 * @param {function} props.onClick - 点击事件处理函数
 * @returns {JSX.Element} 游戏卡片组件
 */
function GameCard({ name, description, thumbnail, onClick }) {
  // ...
}
```

## 版本控制

- 提交信息使用明确的动词开头，如"Add"、"Fix"、"Update"
- 提交信息简洁明了，不超过50个字符
- 较大的更改分成多个小的提交
- 每个提交只做一件事

## 性能优化

- 使用React.memo包装纯展示组件
- 使用useMemo和useCallback优化渲染性能
- 懒加载组件和路由
- 避免不必要的重新渲染
- 合理使用状态管理

## Cursor编辑器配置

推荐在Cursor编辑器中使用以下配置：

```json
{
  "editor.formatOnSave": true,
  "editor.tabSize": 2,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "javascript.updateImportsOnFileMove.enabled": "always",
  "typescript.updateImportsOnFileMove.enabled": "always"
}
```

## 自动化工具

- ESLint：代码质量检查
- Prettier：代码格式化
- Husky：Git钩子
- lint-staged：提交前检查