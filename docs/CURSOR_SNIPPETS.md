# Cursor编辑器代码片段

本文档提供了一系列针对WebGameMulti项目的Cursor编辑器代码片段，可以提高开发效率。

## 如何使用代码片段

在Cursor编辑器中，可以通过以下方式使用代码片段：

1. 打开命令面板（Ctrl+Shift+P / Cmd+Shift+P）
2. 输入"Snippets: Configure User Snippets"
3. 选择语言（如JavaScript, TypeScript, React等）
4. 将以下代码片段添加到对应的配置文件中

## React组件代码片段

### 函数组件

```json
"React Function Component": {
  "prefix": "rfc",
  "body": [
    "import React from 'react';",
    "",
    "/**",
    " * ${1:组件描述}",
    " */",
    "function ${2:ComponentName}(${3:props}) {",
    "  return (",
    "    <div>",
    "      $0",
    "    </div>",
    "  );",
    "}",
    "",
    "export default ${2:ComponentName};"
  ],
  "description": "创建React函数组件"
}
```

### 带props类型的函数组件

```json
"React Function Component with PropTypes": {
  "prefix": "rfcp",
  "body": [
    "import React from 'react';",
    "import PropTypes from 'prop-types';",
    "",
    "/**",
    " * ${1:组件描述}",
    " */",
    "function ${2:ComponentName}({ ${3:prop1, prop2} }) {",
    "  return (",
    "    <div>",
    "      $0",
    "    </div>",
    "  );",
    "}",
    "",
    "${2:ComponentName}.propTypes = {",
    "  ${3:prop1}: PropTypes.${4:string},",
    "  ${5:prop2}: PropTypes.${6:func}",
    "};",
    "",
    "export default ${2:ComponentName};"
  ],
  "description": "创建带PropTypes的React函数组件"
}
```

### React Hook 代码片段

```json
"useState Hook": {
  "prefix": "useState",
  "body": [
    "const [${1:state}, set${1/(.*)/${1:/capitalize}/}] = useState(${2:initialState});"
  ],
  "description": "React useState Hook"
},
"useEffect Hook": {
  "prefix": "useEffect",
  "body": [
    "useEffect(() => {",
    "  ${1:// 副作用代码}",
    "  return () => {",
    "    ${2:// 清理函数}",
    "  };",
    "}, [${3:dependencies}]);"
  ],
  "description": "React useEffect Hook"
},
"useCallback Hook": {
  "prefix": "useCallback",
  "body": [
    "const ${1:callbackName} = useCallback((${2:params}) => {",
    "  ${3:// 回调函数代码}",
    "}, [${4:dependencies}]);"
  ],
  "description": "React useCallback Hook"
},
"useMemo Hook": {
  "prefix": "useMemo",
  "body": [
    "const ${1:memoizedValue} = useMemo(() => {",
    "  ${2:// 计算代码}",
    "  return ${3:computedValue};",
    "}, [${4:dependencies}]);"
  ],
  "description": "React useMemo Hook"
}
```

## 游戏相关代码片段

### 游戏卡片组件

```json
"Game Card Component": {
  "prefix": "gamecard",
  "body": [
    "import React from 'react';",
    "import PropTypes from 'prop-types';",
    "import './GameCard.css';",
    "",
    "/**",
    " * 游戏卡片组件，显示游戏信息和缩略图",
    " */",
    "function GameCard({ name, description, thumbnail, tags, onClick }) {",
    "  return (",
    "    <div className=\"game-card\" onClick={onClick}>",
    "      <div className=\"game-card__image\">",
    "        <img src={thumbnail} alt={name} />",
    "      </div>",
    "      <div className=\"game-card__content\">",
    "        <h3 className=\"game-card__title\">{name}</h3>",
    "        <p className=\"game-card__description\">{description}</p>",
    "        <div className=\"game-card__tags\">",
    "          {tags.map(tag => (",
    "            <span key={tag} className=\"game-card__tag\">{tag}</span>",
    "          ))}",
    "        </div>",
    "      </div>",
    "    </div>",
    "  );",
    "}",
    "",
    "GameCard.propTypes = {",
    "  name: PropTypes.string.isRequired,",
    "  description: PropTypes.string.isRequired,",
    "  thumbnail: PropTypes.string.isRequired,",
    "  tags: PropTypes.arrayOf(PropTypes.string),",
    "  onClick: PropTypes.func",
    "};",
    "",
    "GameCard.defaultProps = {",
    "  tags: [],",
    "  onClick: () => {}"
    "};",
    "",
    "export default GameCard;"
  ],
  "description": "创建游戏卡片组件"
}
```

### 游戏加载器

```json
"Game Loader Utility": {
  "prefix": "gameloader",
  "body": [
    "/**",
    " * 从games目录加载所有游戏的元数据",
    " * @returns {Promise<Array>} 游戏元数据数组",
    " */",
    "export async function loadGames() {",
    "  try {",
    "    // 获取游戏目录列表",
    "    const response = await fetch('/api/games');",
    "    const directories = await response.json();",
    "    ",
    "    // 加载每个游戏的meta.json",
    "    const games = await Promise.all(",
    "      directories.map(async (dir) => {",
    "        const metaResponse = await fetch(`/games/${dir}/meta.json`);",
    "        const meta = await metaResponse.json();",
    "        return {",
    "          ...meta,",
    "          id: dir,",
    "          path: `/games/${dir}`",
    "        };",
    "      })",
    "    );",
    "    ",
    "    return games;",
    "  } catch (error) {",
    "    console.error('加载游戏失败:', error);",
    "    return [];",
    "  }",
    "}"
  ],
  "description": "创建游戏加载器工具函数"
}
```

## CSS代码片段

### 游戏卡片样式

```json
"Game Card CSS": {
  "prefix": "gamecardcss",
  "body": [
    ".game-card {",
    "  display: flex;",
    "  flex-direction: column;",
    "  width: 100%;",
    "  max-width: 300px;",
    "  border-radius: 8px;",
    "  overflow: hidden;",
    "  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);",
    "  transition: transform 0.2s, box-shadow 0.2s;",
    "  cursor: pointer;",
    "}",
    "",
    ".game-card:hover {",
    "  transform: translateY(-5px);",
    "  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);",
    "}",
    "",
    ".game-card__image {",
    "  width: 100%;",
    "  height: 200px;",
    "  overflow: hidden;",
    "}",
    "",
    ".game-card__image img {",
    "  width: 100%;",
    "  height: 100%;",
    "  object-fit: cover;",
    "}",
    "",
    ".game-card__content {",
    "  padding: 15px;",
    "  background-color: #fff;",
    "}",
    "",
    ".game-card__title {",
    "  margin: 0 0 10px 0;",
    "  font-size: 18px;",
    "  font-weight: 600;",
    "}",
    "",
    ".game-card__description {",
    "  margin: 0 0 10px 0;",
    "  font-size: 14px;",
    "  color: #666;",
    "  display: -webkit-box;",
    "  -webkit-line-clamp: 2;",
    "  -webkit-box-orient: vertical;",
    "  overflow: hidden;",
    "}",
    "",
    ".game-card__tags {",
    "  display: flex;",
    "  flex-wrap: wrap;",
    "  gap: 5px;",
    "}",
    "",
    ".game-card__tag {",
    "  padding: 3px 8px;",
    "  background-color: #f0f0f0;",
    "  border-radius: 4px;",
    "  font-size: 12px;",
    "  color: #333;",
    "}"
  ],
  "description": "游戏卡片CSS样式"
}
```

## ESLint规则片段

```json
"ESLint Config": {
  "prefix": "eslintconfig",
  "body": [
    "module.exports = {",
    "  extends: [",
    "    'eslint:recommended',",
    "    'plugin:react/recommended',",
    "    'plugin:react-hooks/recommended',",
    "    'plugin:jsx-a11y/recommended'",
    "  ],",
    "  plugins: ['react', 'react-hooks', 'jsx-a11y'],",
    "  rules: {",
    "    'react/prop-types': 'warn',",
    "    'react/react-in-jsx-scope': 'off',",
    "    'no-unused-vars': 'warn',",
    "    'react-hooks/rules-of-hooks': 'error',",
    "    'react-hooks/exhaustive-deps': 'warn'",
    "  },",
    "  settings: {",
    "    react: {",
    "      version: 'detect'",
    "    }",
    "  },",
    "  env: {",
    "    browser: true,",
    "    node: true,",
    "    es6: true",
    "  },",
    "  parserOptions: {",
    "    ecmaVersion: 2020,",
    "    sourceType: 'module',",
    "    ecmaFeatures: {",
    "      jsx: true",
    "    }",
    "  }",
    "};"
  ],
  "description": "ESLint配置"
}
```

## 测试代码片段

```json
"React Component Test": {
  "prefix": "comptest",
  "body": [
    "import React from 'react';",
    "import { render, screen, fireEvent } from '@testing-library/react';",
    "import ${1:ComponentName} from './${1:ComponentName}';",
    "",
    "describe('${1:ComponentName}', () => {",
    "  test('renders correctly', () => {",
    "    render(<${1:ComponentName} ${2:props} />);",
    "    expect(screen.getByText('${3:textToFind}')).toBeInTheDocument();",
    "  });",
    "",
    "  test('handles click events', () => {",
    "    const handleClick = jest.fn();",
    "    render(<${1:ComponentName} onClick={handleClick} ${4:otherProps} />);",
    "    fireEvent.click(screen.getByText('${5:buttonText}'));",
    "    expect(handleClick).toHaveBeenCalledTimes(1);",
    "  });",
    "});"
  ],
  "description": "React组件测试"
}
```

## Cursor AI 提示模板

以下是一些在Cursor编辑器中使用AI功能的提示模板。复制这些提示并在AI面板中使用：

### 代码生成提示

```
生成一个React组件，用于显示游戏详情页面。组件应该接收游戏ID作为参数，从API获取游戏信息，并显示游戏名称、描述、截图、标签和游戏内容（嵌入iframe）。包含加载状态和错误处理。
```

### 代码审查提示

```
审查以下代码，检查潜在的性能问题、可访问性问题、安全漏洞和React最佳实践：

[粘贴你的代码]
```

### 重构提示

```
重构以下代码，将重复逻辑提取为自定义Hook，将大型组件拆分为小组件，并优化性能：

[粘贴你的代码]
```

### 调试帮助提示

```
我在以下代码中遇到问题：[描述问题]

[粘贴你的代码]

错误信息是：[错误信息]

请帮我找出问题所在并提供解决方案。
```

## 结论

这些代码片段和提示模板可以帮助提高在Cursor编辑器中的开发效率。根据项目需求，可以自定义或扩展这些片段。 