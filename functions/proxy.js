/**
 * Cloudflare Worker for proxying game content to bypass CORS/X-Frame-Options issues.
 *
 * How it works:
 * 1. It's a Cloudflare Pages Function, triggered by requests to `/proxy`.
 * 2. It expects a `url` query parameter, which is the target game URL to fetch.
 * 3. It fetches the content from the target URL.
 * 4. It streams the response back to the client, modifying headers on the fly.
 * 5. Crucially, it removes security headers like `X-Frame-Options` and `Content-Security-Policy`
 *    that would otherwise prevent the game from being embedded in an iframe.
 */
export async function onRequest(context) {
  const { request } = context;
  
  // 处理 CORS 预检请求
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Max-Age': '86400'
      }
    });
  }
  
  // 从查询参数中获取目标URL
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return new Response('Missing "url" query parameter', { 
      status: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain'
      }
    });
  }

  try {
    // 验证URL格式和安全性
    const parsedUrl = new URL(targetUrl);
    
    // 安全检查：只允许HTTPS和特定域名
    if (parsedUrl.protocol !== 'https:') {
      return new Response('Only HTTPS URLs are allowed', { 
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'text/plain'
        }
      });
    }
    
    // 白名单检查
    const allowedDomains = [
      'www.crazycattle-3d.info',
      'play.famobi.com',
      'html5games.com'
    ];
    
    if (!allowedDomains.includes(parsedUrl.hostname)) {
      return new Response('Domain not allowed', { 
        status: 403,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'text/plain'
        }
      });
    }
    
  } catch (e) {
    return new Response('Invalid "url" query parameter', { 
      status: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain'
      }
    });
  }
  
  try {
    // 发起对目标URL的请求
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': new URL(targetUrl).origin,
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9'
      },
      cf: {
        // Cloudflare 特定配置
        cacheTtl: 300, // 5分钟缓存
        cacheEverything: true
      }
    });

    // 创建一个新的响应头，并过滤掉安全相关的头
    const headers = new Headers(response.headers);
    
    // 移除阻止嵌入的头
    headers.delete('X-Frame-Options');
    headers.delete('Content-Security-Policy');
    headers.delete('x-content-security-policy');
    headers.delete('x-webkit-csp');

    // 设置CORS头
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', '*');
    
    // 确保缓存控制
    if (!headers.get('Cache-Control')) {
      headers.set('Cache-Control', 'public, max-age=300');
    }

    // 将修改后的响应流式传输回客户端
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: headers
    });
    
  } catch (error) {
    console.error('Proxy error:', error);
    return new Response('Failed to fetch target URL', { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain'
      }
    });
  }
} 