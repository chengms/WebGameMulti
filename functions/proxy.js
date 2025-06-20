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
  // 从查询参数中获取目标URL
  const { searchParams } = new URL(context.request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return new Response('Missing "url" query parameter', { status: 400 });
  }

  try {
    // 验证URL格式
    new URL(targetUrl);
  } catch (e) {
    return new Response('Invalid "url" query parameter', { status: 400 });
  }
  
  // 发起对目标URL的请求
  const response = await fetch(targetUrl, {
    headers: {
      ...context.request.headers,
      'Referer': new URL(targetUrl).origin, // 设置正确的Referer
    }
  });

  // 创建一个新的响应头，并过滤掉安全相关的头
  const headers = new Headers(response.headers);
  headers.delete('X-Frame-Options');
  headers.delete('Content-Security-Policy');
  headers.delete('x-content-security-policy');
  headers.delete('x-webkit-csp');

  // 允许所有来源嵌入
  headers.set('Access-Control-Allow-Origin', '*');

  // 将修改后的响应流式传输回客户端
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: headers
  });
} 