#!/usr/bin/env node

/**
 * Cloudflare Pages 部署触发脚本
 * 通过API主动触发部署
 */

const https = require('https');

// 配置信息 - 请替换为你的实际值
const config = {
  accountId: process.env.CLOUDFLARE_ACCOUNT_ID || 'your-account-id',
  projectName: process.env.CLOUDFLARE_PROJECT_NAME || 'gametime',
  apiToken: process.env.CLOUDFLARE_API_TOKEN || 'your-api-token',
  branch: process.env.DEPLOY_BRANCH || 'main'
};

/**
 * 触发Cloudflare Pages部署
 */
async function triggerDeploy() {
  const postData = JSON.stringify({
    branch: config.branch,
    // 可以添加其他部署参数
  });

  const options = {
    hostname: 'api.cloudflare.com',
    port: 443,
    path: `/client/v4/accounts/${config.accountId}/pages/projects/${config.projectName}/deployments`,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.apiToken}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (res.statusCode === 200 || res.statusCode === 201) {
            console.log('✅ 部署触发成功!');
            console.log(`📦 部署ID: ${response.result?.id || 'N/A'}`);
            console.log(`🌿 分支: ${config.branch}`);
            console.log(`🔗 项目: ${config.projectName}`);
            resolve(response);
          } else {
            console.error('❌ 部署触发失败:', response);
            reject(new Error(`HTTP ${res.statusCode}: ${response.errors?.[0]?.message || 'Unknown error'}`));
          }
        } catch (error) {
          console.error('❌ 解析响应失败:', error.message);
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ 请求失败:', error.message);
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

/**
 * 检查部署状态
 */
async function checkDeploymentStatus(deploymentId) {
  const options = {
    hostname: 'api.cloudflare.com',
    port: 443,
    path: `/client/v4/accounts/${config.accountId}/pages/projects/${config.projectName}/deployments/${deploymentId}`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${config.apiToken}`,
      'Content-Type': 'application/json'
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (res.statusCode === 200) {
            resolve(response.result);
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${response.errors?.[0]?.message || 'Unknown error'}`));
          }
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

/**
 * 主函数
 */
async function main() {
  console.log('🚀 开始触发Cloudflare Pages部署...');
  console.log(`📋 项目: ${config.projectName}`);
  console.log(`🌿 分支: ${config.branch}`);
  
  try {
    // 检查必要的配置
    if (!config.accountId || config.accountId === 'your-account-id') {
      throw new Error('请设置 CLOUDFLARE_ACCOUNT_ID 环境变量');
    }
    if (!config.apiToken || config.apiToken === 'your-api-token') {
      throw new Error('请设置 CLOUDFLARE_API_TOKEN 环境变量');
    }

    // 触发部署
    const deployment = await triggerDeploy();
    
    if (deployment.result?.id) {
      console.log('\n⏳ 正在检查部署状态...');
      
      // 等待几秒钟让部署开始
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // 检查部署状态
      const status = await checkDeploymentStatus(deployment.result.id);
      console.log(`📊 当前状态: ${status.latest_stage?.name || 'unknown'}`);
      console.log(`🔗 部署URL: ${status.url || 'N/A'}`);
    }
    
  } catch (error) {
    console.error('💥 部署失败:', error.message);
    process.exit(1);
  }
}

// 运行脚本
if (require.main === module) {
  main();
}

module.exports = { triggerDeploy, checkDeploymentStatus }; 