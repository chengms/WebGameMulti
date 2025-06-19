# Cloudflare Pages 部署指南

## 部署问题修复

### 主要问题
1. **Vite配置问题**: `assetsInclude: ['**/*.html']` 导致HTML文件被错误处理
2. **代码分割问题**: 空的chunk文件导致构建异常
3. **路由配置**: SPA路由需要正确的重定向配置

### 修复措施

#### 1. Vite配置优化 (vite.config.js)
- 移除 `assetsInclude: ['**/*.html']` 配置
- 简化代码分割策略，避免空chunk
- 优化构建输出和压缩配置

#### 2. 构建验证
```bash
npm run build
```
构建成功后应该看到：
- `dist/index.html` - 正确的HTML文件
- `dist/assets/` - 包含JS和CSS文件
- `dist/games/` - 游戏文件复制

#### 3. Cloudflare Pages配置

**构建设置:**
- 构建命令: `npm run build`
- 构建输出目录: `dist`
- Node.js版本: 18.x

**环境变量:**
- `NODE_ENV=production`
- `CF_PAGES_BRANCH=main`

#### 4. 静态文件配置

**_redirects文件:**
```
/* /index.html 200
```

**_headers文件:**
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Content-Security-Policy: default-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src 'self' data: blob: https:; font-src 'self' data:;

/assets/*.js
  Cache-Control: public, max-age=31536000, immutable

/assets/*.css
  Cache-Control: public, max-age=31536000, immutable
```

**_routes.json文件:**
```json
{
  "version": 1,
  "include": ["/*"],
  "exclude": ["/assets/*"]
}
```

## 部署步骤

### 1. 本地测试
```bash
# 构建项目
npm run build

# 本地预览
npm run preview
```

### 2. 推送到Git
```bash
git add .
git commit -m "修复Cloudflare Pages部署问题"
git push origin main
```

### 3. Cloudflare Pages设置
1. 登录Cloudflare Dashboard
2. 进入Pages部分
3. 连接Git仓库
4. 配置构建设置：
   - 构建命令: `npm run build`
   - 构建输出目录: `dist`
   - Node.js版本: 18.x

### 4. 自定义域名 (可选)
1. 在Cloudflare Pages项目中添加自定义域名
2. 配置DNS记录指向Cloudflare Pages

## 常见问题排查

### 1. 构建失败
- 检查 `package.json` 中的依赖版本
- 确认Node.js版本兼容性
- 查看构建日志中的错误信息

### 2. 页面无法访问
- 检查 `_redirects` 文件是否正确
- 确认路由配置是否匹配
- 检查浏览器开发者工具中的网络请求

### 3. 静态资源404
- 确认 `publicDir` 配置正确
- 检查 `_routes.json` 配置
- 验证资源路径是否正确

### 4. CSP错误
- 检查 `_headers` 文件中的CSP配置
- 根据需要调整安全策略

## 性能优化

### 1. 缓存策略
- 静态资源使用长期缓存
- HTML文件使用短期缓存
- 利用Cloudflare CDN加速

### 2. 代码分割
- React和第三方库分离
- 按需加载组件
- 优化bundle大小

### 3. 图片优化
- 使用WebP格式
- 实现懒加载
- 压缩图片大小

## 监控和维护

### 1. 性能监控
- 使用Cloudflare Analytics
- 监控页面加载时间
- 跟踪用户行为

### 2. 错误监控
- 检查Cloudflare Pages日志
- 监控构建状态
- 设置告警通知

### 3. 定期更新
- 更新依赖包
- 优化构建配置
- 改进用户体验 