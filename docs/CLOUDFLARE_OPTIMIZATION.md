# Cloudflare 优化配置指南

## 概述

本文档提供了针对 GameTime Bar 项目的 Cloudflare 优化配置建议，涵盖性能、安全和SEO相关设置。

## 基础优化设置

### 1. Speed (速度优化)

#### Auto Minify (自动压缩)
在 Cloudflare 控制台中：
1. 进入 **Speed** → **Optimization**
2. 开启以下选项：
   - ✅ HTML
   - ✅ CSS  
   - ✅ JavaScript
3. 这将自动压缩静态文件，减少传输大小约15-30%

#### Brotli Compression (Brotli 压缩)
1. 进入 **Speed** → **Optimization**  
2. 确保 **Brotli** 已开启
3. Brotli 比 gzip 压缩率更高，特别适合文本文件

### 2. Caching (缓存优化)

#### Browser Cache TTL
1. 进入 **Caching** → **Configuration**
2. 设置 **Browser Cache TTL** 为：
   - 静态资源（图片、CSS、JS）：**1 month** 或更长
   - HTML 文件：**4 hours** 到 **1 day**
   - 游戏文件：**1 week** 到 **1 month**

#### Page Rules (页面规则)
创建以下页面规则以优化不同类型内容的缓存：

```
优先级 1: *.gametime.bar/games/*/assets/*
设置：
- Cache Level: Cache Everything
- Edge Cache TTL: 1 month
- Browser Cache TTL: 1 month

优先级 2: *.gametime.bar/games/*
设置：
- Cache Level: Cache Everything  
- Edge Cache TTL: 1 week
- Browser Cache TTL: 1 week

优先级 3: *.gametime.bar/*.js
设置：
- Cache Level: Cache Everything
- Edge Cache TTL: 1 month
- Browser Cache TTL: 1 month

优先级 4: *.gametime.bar/*.css
设置：
- Cache Level: Cache Everything
- Edge Cache TTL: 1 month
- Browser Cache TTL: 1 month
```

### 3. Security (安全设置)

#### Security Level
1. 进入 **Security** → **Settings**
2. 设置 **Security Level** 为 **Medium**
3. 这将阻止大部分恶意流量，同时不影响正常用户

#### SSL/TLS
1. 进入 **SSL/TLS** → **Overview**
2. 确保设置为 **Full (strict)**
3. 开启 **Always Use HTTPS**

#### Firewall Rules
创建以下防火墙规则：

```javascript
// 阻止明显的攻击尝试
(http.request.uri.path contains "admin" and not cf.client.bot) or
(http.request.uri.path contains "wp-admin") or  
(http.request.uri.path contains ".env") or
(http.request.uri.path contains "config")
Action: Block

// 限制游戏页面的访问频率
(http.request.uri.path matches "^/games/[^/]+/?$" and rate(5m) > 50)
Action: Challenge

// 保护API端点（如果有的话）
(http.request.uri.path contains "/api/" and rate(1m) > 10)
Action: Challenge
```

## 高级优化

### 1. Workers (边缘计算)

如果需要更高级的功能，可以使用 Cloudflare Workers：

```javascript
// 游戏预加载优化 Worker
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  // 为游戏页面添加预加载头部
  if (url.pathname.startsWith('/games/')) {
    const response = await fetch(request)
    const newResponse = new Response(response.body, response)
    
    // 添加游戏资源预加载
    newResponse.headers.set(
      'Link', 
      '</games/common/phaser.min.js>; rel=preload; as=script'
    )
    
    return newResponse
  }
  
  return fetch(request)
}
```

### 2. Image Optimization (图片优化)

#### Polish (图片优化)
1. 进入 **Speed** → **Optimization**
2. 开启 **Polish** (需要付费计划)
3. 选择 **Lossy** 模式以获得最佳压缩效果

#### Image Resizing
对于游戏缩略图，使用 Cloudflare 的图片调整功能：

```html
<!-- 原始图片 -->
<img src="/games/snake/image/cover.png" alt="Snake Game">

<!-- 优化后的多尺寸版本 -->
<img src="/cdn-cgi/image/width=300,height=200,format=webp/games/snake/image/cover.png" 
     alt="Snake Game">
```

### 3. Analytics & Monitoring (分析和监控)

#### Web Analytics
1. 进入 **Analytics & Logs** → **Web Analytics**
2. 开启 **Web Analytics**
3. 这提供了无需第三方脚本的隐私友好分析

#### Real User Monitoring (RUM)
1. 开启 **Real User Monitoring**
2. 监控实际用户的页面加载性能
3. 基于数据进行进一步优化

## 性能测试和验证

### 使用工具验证优化效果：

1. **GTmetrix** (https://gtmetrix.com)
   - 测试页面加载速度
   - 检查缓存配置
   - 分析优化建议

2. **Google PageSpeed Insights**
   - 测试移动端和桌面端性能
   - 获取 Core Web Vitals 数据
   - 检查SEO相关指标

3. **WebPageTest** (https://webpagetest.org)
   - 详细的瀑布图分析
   - 多地点测试
   - 网络模拟测试

### 预期改进效果：

- **页面加载时间**：减少 30-50%
- **首次内容绘制 (FCP)**：改善 20-40%  
- **最大内容绘制 (LCP)**：改善 25-45%
- **累积布局偏移 (CLS)**：接近 0
- **服务器响应时间**：减少 40-60%

## 配置检查清单

- [ ] 开启 Auto Minify (HTML, CSS, JS)
- [ ] 开启 Brotli 压缩
- [ ] 配置合适的 Browser Cache TTL
- [ ] 创建页面规则优化静态资源缓存
- [ ] 设置 Security Level 为 Medium
- [ ] 开启 SSL/TLS Full (strict)
- [ ] 开启 Always Use HTTPS
- [ ] 创建基础防火墙规则
- [ ] 开启 Web Analytics
- [ ] 测试和验证配置效果

## 注意事项

1. **渐进式优化**：一次只改变一项配置，观察效果后再进行下一项
2. **监控影响**：某些缓存设置可能影响开发时的文件更新，可以通过清除缓存解决
3. **成本考虑**：某些功能（如Polish、Workers）可能需要付费计划
4. **定期检查**：每月检查一次性能指标，根据需要调整配置

## 故障排除

### 常见问题：

**缓存未生效**
- 检查页面规则优先级
- 确认文件路径匹配
- 使用开发模式临时禁用缓存

**游戏加载慢**  
- 检查游戏资源是否正确缓存
- 考虑使用预加载策略
- 优化游戏资源大小

**安全规则误伤**
- 调整防火墙规则敏感度
- 添加白名单例外
- 使用挑战而非直接阻止

---

*此配置建议基于当前的 GameTime Bar 项目结构。随着项目发展，配置可能需要相应调整。* 