/**
 * EdgeOne 边缘函数 - Umami 统计 API 代理
 *
 * 部署步骤：
 * 1. 在 EdgeOne 控制台「边缘函数 → 函数管理」创建函数
 * 2. 将此代码粘贴到在线编辑器
 * 3. 在「函数触发」中添加触发规则：
 *    - 匹配条件：URL 路径 前缀匹配 /api/stats/
 *    - 执行函数：选择此函数
 * 4. 部署并验证：访问 https://你的域名/api/stats/
 *
 * 环境变量（在函数详情页配置）：
 *   UMAMI_BASE_URL  - Umami 服务地址
 *   UMAMI_USERNAME  - Umami 管理员用户名
 *   UMAMI_PASSWORD  - Umami 管理员密码
 *   UMAMI_WEBSITE_ID - Umami 网站 ID
 */

// 缓存 token，避免每次请求都登录
let cachedToken = null;
let tokenExpiry = 0;

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);

  // 只处理 /api/stats/ 路径，其他请求直接回源
  if (!url.pathname.startsWith('/api/stats/')) {
    return fetch(request);
  }

  // 从环境变量读取配置（EdgeOne 函数详情页可配置）
  // 如果未配置环境变量，使用默认值
  const UMAMI_BASE_URL = 'http://123.207.220.12:3000';
  const UMAMI_USERNAME = 'admin';
  const UMAMI_PASSWORD = 'umami';
  const UMAMI_WEBSITE_ID = 'b6532085-fe6c-4da9-a814-b3904b5d930a';

  try {
    // 获取 Umami 认证 token
    const token = await getAuthToken(UMAMI_BASE_URL, UMAMI_USERNAME, UMAMI_PASSWORD);

    // 获取统计信息
    const endAt = Date.now();
    const startAt = endAt - 30 * 24 * 60 * 60 * 1000; // 最近 30 天

    const params = new URLSearchParams({
      startAt: String(startAt),
      endAt: String(endAt),
    });

    // 从原始请求获取 path 参数（用于查询单篇文章阅读量）
    const pathParam = url.searchParams.get('path');
    if (pathParam) {
      params.set('path', pathParam);
    }

    const statsRes = await fetch(
      `${UMAMI_BASE_URL}/api/websites/${UMAMI_WEBSITE_ID}/stats?${params}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!statsRes.ok) {
      return new Response(
        JSON.stringify({ error: `Umami stats fetch failed: ${statsRes.status}` }),
        {
          status: 502,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    const stats = await statsRes.json();

    return new Response(JSON.stringify(stats), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || 'Internal error' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}

/**
 * 获取 Umami API 认证 token（带缓存）
 */
async function getAuthToken(baseUrl, username, password) {
  const now = Date.now();

  // token 有效期内直接复用
  if (cachedToken && now < tokenExpiry) {
    return cachedToken;
  }

  const res = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error(`Umami login failed: ${res.status}`);
  }

  const data = await res.json();
  cachedToken = data.token;
  // token 有效期 1 小时，提前 5 分钟刷新
  tokenExpiry = now + 55 * 60 * 1000;
  return cachedToken;
}