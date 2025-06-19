# 🚀 Cloudflare Pages 部署设置指南

## 📋 前置要求

1. **GitHub 账户** - 用于代码托管
2. **Cloudflare 账户** - 用于部署服务
3. **Node.js 18+** - 本地开发环境

## 🔧 第一步：创建 Cloudflare Pages 项目

### 1.1 登录 Cloudflare
1. 访问 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 使用你的账户登录

### 1.2 创建 Pages 项目
1. 在左侧菜单中点击 **"Pages"**
2. 点击 **"Create a project"**
3. 选择 **"Connect to Git"**
4. 授权连接你的 GitHub 账户
5. 选择你的项目仓库 (WebGameMulti)
6. 配置构建设置：
   - **项目名称**: `gametime` (或你喜欢的名称)
   - **生产分支**: `main`
   - **构建命令**: `npm run build`
   - **构建输出目录**: `dist`
   - **Node.js 版本**: `18.x`

### 1.3 记录重要信息
部署完成后，记录以下信息（后续需要用到）：
- **Account ID** (在右侧边栏可以找到)
- **项目名称** (你刚才设置的名称)

## 🔐 第二步：获取 API Token

### 2.1 创建 API Token
1. 在 Cloudflare Dashboard 中，点击右上角头像
2. 选择 **"My Profile"**
3. 点击 **"API Tokens"** 标签
4. 点击 **"Create Token"**
5. 选择 **"Custom token"**

### 2.2 配置 Token 权限
设置以下权限：
- **Account**: `Cloudflare Pages:Edit`
- **Zone Resources**: `Include - All zones`
- **Client IP Address Filtering**: 可选，建议留空

### 2.3 保存 Token
1. 点击 **"Continue to summary"**
2. 点击 **"Create Token"**
3. **重要**: 复制并保存生成的 Token（只显示一次）

## 🛠️ 第三步：配置本地环境

### 3.1 安装 Wrangler CLI
```bash
npm install -g wrangler
# 或者项目本地安装（已包含在package.json中）
npm install
```

### 3.2 登录 Wrangler
```bash
npm run cf:login
# 或者直接使用
wrangler auth login
```

### 3.3 验证登录
```bash
npm run cf:whoami
# 应该显示你的账户信息
```

## 🔧 第四步：配置环境变量

### 4.1 创建本地环境文件
```bash
# 复制示例文件
cp scripts/env.example .env
```

### 4.2 编辑 .env 文件
使用你喜欢的编辑器打开 `.env` 文件，填入实际值：
```bash
# Cloudflare账户ID (在Dashboard右侧边栏)
CLOUDFLARE_ACCOUNT_ID=你的账户ID

# Cloudflare API Token (刚才创建的)
CLOUDFLARE_API_TOKEN=你的API Token

# Cloudflare Pages项目名称
CLOUDFLARE_PROJECT_NAME=gametime

# 要部署的分支
DEPLOY_BRANCH=main

# 构建环境
NODE_ENV=production
```

### 4.3 加载环境变量 (Windows)
```powershell
# PowerShell 中加载环境变量
Get-Content .env | ForEach-Object {
    if ($_ -match '^([^=]+)=(.*)$') {
        [Environment]::SetEnvironmentVariable($matches[1], $matches[2], 'Process')
    }
}
```

或者手动设置：
```powershell
$env:CLOUDFLARE_ACCOUNT_ID="你的账户ID"
$env:CLOUDFLARE_API_TOKEN="你的API Token"
$env:CLOUDFLARE_PROJECT_NAME="gametime"
```

## 🧪 第五步：测试部署

### 5.1 本地构建测试
```bash
npm run build
```

### 5.2 测试 API 触发
```bash
npm run deploy:trigger
```

### 5.3 完整部署测试
```bash
npm run deploy:force
```

如果成功，你应该看到类似输出：
```
✅ 部署触发成功!
📦 部署ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
🌿 分支: main
🔗 项目: gametime
```

## 🤖 第六步：设置 GitHub Actions (可选)

### 6.1 设置 GitHub Secrets
1. 进入你的 GitHub 仓库页面
2. 点击 **"Settings"** 标签
3. 在左侧菜单选择 **"Secrets and variables"** → **"Actions"**
4. 点击 **"New repository secret"**
5. 添加以下 secrets：
   - `CLOUDFLARE_API_TOKEN`: 你的 API Token
   - `CLOUDFLARE_ACCOUNT_ID`: 你的账户 ID

### 6.2 推送代码测试
```bash
git add .
git commit -m "测试 GitHub Actions 部署"
git push origin main
```

## 📱 第七步：使用方法

### 7.1 日常使用命令
```bash
# 仅构建
npm run build

# 构建并部署
npm run deploy:force

# 仅触发部署（不重新构建）
npm run deploy:trigger

# 使用 Wrangler 部署
npm run deploy:cf

# 查看部署日志
npm run cf:tail
```

### 7.2 自动部署
推送代码到 main 分支会自动触发部署：
```bash
git push origin main
```

### 7.3 手动部署
在 Cloudflare Dashboard 中：
1. 进入 Pages 项目
2. 点击 **"Create deployment"**
3. 选择分支并部署

## 🔍 故障排查

### 常见问题

#### 1. API Token 权限不足
```
错误: HTTP 403: Forbidden
解决: 检查 API Token 权限设置
```

#### 2. Account ID 错误
```
错误: HTTP 404: Not Found
解决: 确认 CLOUDFLARE_ACCOUNT_ID 正确
```

#### 3. 项目名称不匹配
```
错误: Project not found
解决: 确认 CLOUDFLARE_PROJECT_NAME 与实际项目名称一致
```

#### 4. 构建失败
```bash
# 清理并重新安装依赖
npm run clean
npm install
npm run build
```

### 调试命令
```bash
# 检查登录状态
npm run cf:whoami

# 查看环境变量
echo $env:CLOUDFLARE_ACCOUNT_ID
echo $env:CLOUDFLARE_API_TOKEN

# 查看构建输出
dir dist
```

## 📞 获取帮助

如果遇到问题：
1. 查看 `DEPLOYMENT.md` 获取详细文档
2. 检查 Cloudflare Pages 构建日志
3. 查看 GitHub Actions 运行日志
4. 确认所有环境变量设置正确

## ✅ 完成检查清单

- [ ] Cloudflare Pages 项目已创建
- [ ] API Token 已获取并配置
- [ ] Wrangler CLI 已安装并登录
- [ ] 环境变量已正确设置
- [ ] 本地构建测试成功
- [ ] API 触发测试成功
- [ ] GitHub Actions 已配置（可选）
- [ ] 自动部署测试成功

完成以上步骤后，你就可以使用多种方式来部署和更新你的网站了！ 