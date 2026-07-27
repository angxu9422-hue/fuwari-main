/**
 * EdgeOne Pages 边缘函数 - Umami 统计 API 代理
 * 文件路径 edge-functions/api/stats.js → 处理 /api/stats 请求
 */

// 缓存 token，避免每次请求都登录
let cachedToken = null;
let tokenExpiry = 0;

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);

  const UMAMI_BASE_URL = 'http://123.207.220.12:3000';
  const UMAMI_USERNAME = 'admin';
  const UMAMI_PASSWORD = 'umami';
  const UMAMI_WEBSITE_ID = 'b6532085-fe6c-4da9-a814-b3904b5d930a';

  try {
    const token = await getAuthToken(UMAMI_BASE_URL, UMAMI_USERNAME, UMAMI_PASSWORD);

    const endAt = Date.now();
    const startAt = endAt - 30 * 24 * 60 * 60 * 1000; // 最近 30 天

    const params = new URLSearchParams({
      startAt: String(startAt),
      endAt: String(endAt),
    });

    // 从请求获取 path 参数（用于查询单篇文章阅读量）
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

async function getAuthToken(baseUrl, username, password) {
  const now = Date.now();
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
  tokenExpiry = now + 55 * 60 * 1000;
  return cachedToken;
}