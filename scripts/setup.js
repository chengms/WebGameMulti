#!/usr/bin/env node

/**
 * Cloudflare Pages 部署设置脚本
 * 交互式配置环境变量和测试部署
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 创建输入接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function colorLog(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// 询问用户输入
function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

// 验证必要工具
function checkPrerequisites() {
  colorLog('cyan', '\n🔍 检查前置要求...');
  
  try {
    // 检查 Node.js
    const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
    colorLog('green', `✅ Node.js: ${nodeVersion}`);
    
    // 检查 npm
    const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
    colorLog('green', `✅ npm: ${npmVersion}`);
    
    // 检查 git
    const gitVersion = execSync('git --version', { encoding: 'utf8' }).trim();
    colorLog('green', `✅ Git: ${gitVersion}`);
    
    return true;
  } catch (error) {
    colorLog('red', '❌ 缺少必要工具，请确保已安装 Node.js, npm 和 Git');
    return false;
  }
}

// 安装依赖
function installDependencies() {
  colorLog('cyan', '\n📦 安装项目依赖...');
  try {
    execSync('npm install', { stdio: 'inherit' });
    colorLog('green', '✅ 依赖安装完成');
    return true;
  } catch (error) {
    colorLog('red', '❌ 依赖安装失败');
    return false;
  }
}

// 创建环境配置文件
async function createEnvFile() {
  colorLog('cyan', '\n🔧 配置环境变量...');
  
  const envPath = path.join(process.cwd(), '.env');
  const envExamplePath = path.join(process.cwd(), 'scripts', 'env.example');
  
  // 检查是否已存在 .env 文件
  if (fs.existsSync(envPath)) {
    const overwrite = await question('⚠️  .env 文件已存在，是否覆盖？(y/N): ');
    if (overwrite.toLowerCase() !== 'y') {
      colorLog('yellow', '⏭️  跳过环境变量配置');
      return true;
    }
  }
  
  colorLog('blue', '\n请提供以下信息 (可以从 Cloudflare Dashboard 获取):');
  
  // 获取用户输入
  const accountId = await question('🏢 Cloudflare Account ID: ');
  const apiToken = await question('🔑 Cloudflare API Token: ');
  const projectName = await question('📦 项目名称 (默认: gametime): ') || 'gametime';
  const branch = await question('🌿 部署分支 (默认: main): ') || 'main';
  
  // 验证输入
  if (!accountId || !apiToken) {
    colorLog('red', '❌ Account ID 和 API Token 是必需的');
    return false;
  }
  
  // 创建 .env 文件内容
  const envContent = `# Cloudflare Pages 配置
# 由 setup.js 自动生成

# Cloudflare账户ID
CLOUDFLARE_ACCOUNT_ID=${accountId}

# Cloudflare API Token
CLOUDFLARE_API_TOKEN=${apiToken}

# Cloudflare Pages项目名称
CLOUDFLARE_PROJECT_NAME=${projectName}

# 要部署的Git分支
DEPLOY_BRANCH=${branch}

# 构建环境
NODE_ENV=production

# 生成时间: ${new Date().toISOString()}
`;
  
  try {
    fs.writeFileSync(envPath, envContent);
    colorLog('green', '✅ .env 文件创建成功');
    
    // 设置环境变量到当前进程
    process.env.CLOUDFLARE_ACCOUNT_ID = accountId;
    process.env.CLOUDFLARE_API_TOKEN = apiToken;
    process.env.CLOUDFLARE_PROJECT_NAME = projectName;
    process.env.DEPLOY_BRANCH = branch;
    
    return true;
  } catch (error) {
    colorLog('red', `❌ 创建 .env 文件失败: ${error.message}`);
    return false;
  }
}

// 测试构建
function testBuild() {
  colorLog('cyan', '\n🏗️  测试项目构建...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
    colorLog('green', '✅ 构建测试成功');
    return true;
  } catch (error) {
    colorLog('red', '❌ 构建测试失败');
    return false;
  }
}

// 测试 Wrangler 登录
async function testWranglerLogin() {
  colorLog('cyan', '\n🔐 配置 Wrangler CLI...');
  
  try {
    // 检查是否已登录
    const whoami = execSync('npx wrangler auth whoami', { encoding: 'utf8' });
    colorLog('green', `✅ 已登录 Wrangler: ${whoami.trim()}`);
    return true;
  } catch (error) {
    colorLog('yellow', '⚠️  需要登录 Wrangler CLI');
    
    const shouldLogin = await question('是否现在登录 Wrangler？(Y/n): ');
    if (shouldLogin.toLowerCase() !== 'n') {
      try {
        execSync('npx wrangler auth login', { stdio: 'inherit' });
        colorLog('green', '✅ Wrangler 登录成功');
        return true;
      } catch (loginError) {
        colorLog('red', '❌ Wrangler 登录失败');
        return false;
      }
    } else {
      colorLog('yellow', '⏭️  跳过 Wrangler 登录（可稍后使用 npm run cf:login）');
      return true;
    }
  }
}

// 测试 API 部署
async function testApiDeploy() {
  colorLog('cyan', '\n🚀 测试 API 部署...');
  
  const shouldTest = await question('是否测试 API 部署触发？(Y/n): ');
  if (shouldTest.toLowerCase() === 'n') {
    colorLog('yellow', '⏭️  跳过 API 部署测试');
    return true;
  }
  
  try {
    execSync('npm run deploy:trigger', { stdio: 'inherit' });
    colorLog('green', '✅ API 部署测试成功');
    return true;
  } catch (error) {
    colorLog('red', '❌ API 部署测试失败');
    colorLog('yellow', '💡 请检查 Account ID、API Token 和项目名称是否正确');
    return false;
  }
}

// 显示使用说明
function showUsageInstructions() {
  colorLog('cyan', '\n📚 使用说明:');
  console.log(`
${colors.bright}常用命令:${colors.reset}
  ${colors.green}npm run build${colors.reset}          - 构建项目
  ${colors.green}npm run deploy:force${colors.reset}   - 构建并部署
  ${colors.green}npm run deploy:trigger${colors.reset} - 仅触发部署
  ${colors.green}npm run cf:login${colors.reset}       - 登录 Wrangler CLI
  ${colors.green}npm run cf:whoami${colors.reset}      - 检查登录状态

${colors.bright}自动部署:${colors.reset}
  推送代码到 main 分支会自动触发部署:
  ${colors.blue}git push origin main${colors.reset}

${colors.bright}文档:${colors.reset}
  ${colors.yellow}SETUP_GUIDE.md${colors.reset}  - 详细设置指南
  ${colors.yellow}DEPLOYMENT.md${colors.reset}   - 完整部署文档
  
${colors.bright}故障排查:${colors.reset}
  如遇问题，请查看上述文档或检查 Cloudflare Pages 构建日志
`);
}

// 主函数
async function main() {
  console.log(`
${colors.cyan}${colors.bright}
╔═══════════════════════════════════════════╗
║     🚀 Cloudflare Pages 部署设置向导      ║
║                                           ║
║     GameTime Bar 项目自动配置工具         ║
╚═══════════════════════════════════════════╝
${colors.reset}
`);

  try {
    // 1. 检查前置要求
    if (!checkPrerequisites()) {
      process.exit(1);
    }

    // 2. 安装依赖
    if (!installDependencies()) {
      process.exit(1);
    }

    // 3. 配置环境变量
    if (!await createEnvFile()) {
      process.exit(1);
    }

    // 4. 测试构建
    if (!testBuild()) {
      process.exit(1);
    }

    // 5. 配置 Wrangler
    await testWranglerLogin();

    // 6. 测试 API 部署
    await testApiDeploy();

    // 7. 显示使用说明
    showUsageInstructions();

    colorLog('green', '\n🎉 设置完成！你现在可以开始使用 Cloudflare Pages 部署了。');
    
  } catch (error) {
    colorLog('red', `\n💥 设置过程中出现错误: ${error.message}`);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// 运行脚本
if (require.main === module) {
  main();
}

module.exports = { main }; 