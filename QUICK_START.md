# 🚀 快速开始 - Cloudflare Pages 部署

## 📦 一键设置

运行自动设置脚本，它会引导你完成所有配置：

```bash
npm run setup
```

这个脚本会：
1. ✅ 检查必要工具 (Node.js, npm, Git)
2. 📦 安装项目依赖
3. 🔧 配置环境变量 (.env文件)
4. 🏗️ 测试项目构建
5. 🔐 配置 Wrangler CLI
6. 🚀 测试 API 部署

## 🎯 手动设置 (如果需要)

### 1. 获取 Cloudflare 信息

#### Account ID
1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 在右侧边栏找到 **Account ID**

#### API Token
1. 点击右上角头像 → **My Profile**
2. 选择 **API Tokens** 标签
3. 点击 **Create Token** → **Custom token**
4. 设置权限：`Cloudflare Pages:Edit`
5. 复制生成的 Token

### 2. 配置环境变量

创建 `.env` 文件：
```bash
CLOUDFLARE_ACCOUNT_ID=你的账户ID
CLOUDFLARE_API_TOKEN=你的API Token
CLOUDFLARE_PROJECT_NAME=gametime
DEPLOY_BRANCH=main
NODE_ENV=production
```

### 3. 测试部署

```bash
# 构建项目
npm run build

# 测试 API 部署
npm run deploy:trigger
```

## 🎮 日常使用

### 构建和部署
```bash
# 仅构建
npm run build

# 构建并部署
npm run deploy:force

# 仅触发部署
npm run deploy:trigger
```

### Wrangler CLI
```bash
# 登录
npm run cf:login

# 检查状态
npm run cf:whoami

# 直接部署
npm run deploy:cf
```

### 自动部署
推送代码到 main 分支会自动触发部署：
```bash
git add .
git commit -m "更新内容"
git push origin main
```

## 📚 更多信息

- 📖 **详细指南**: [SETUP_GUIDE.md](SETUP_GUIDE.md)
- 🔧 **完整文档**: [DEPLOYMENT.md](DEPLOYMENT.md)
- ❓ **故障排查**: 查看上述文档的故障排查部分

## 🆘 需要帮助？

如果遇到问题：
1. 运行 `npm run setup` 重新配置
2. 检查 `.env` 文件中的配置
3. 查看 Cloudflare Pages 构建日志
4. 确认 API Token 权限正确 