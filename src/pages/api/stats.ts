import type { APIRoute } from "astro";

export const prerender = false;

const UMAMI_BASE_URL = import.meta.env.UMAMI_BASE_URL || "http://123.207.220.12:3000";
const UMAMI_USERNAME = import.meta.env.UMAMI_USERNAME || "";
const UMAMI_PASSWORD = import.meta.env.UMAMI_PASSWORD || "";
const UMAMI_WEBSITE_ID = import.meta.env.UMAMI_WEBSITE_ID || "b6532085-fe6c-4da9-a814-b3904b5d930a";

// 缓存 token 避免每次请求都登录
let cachedToken: string | null = null;
let tokenExpiry = 0;

async function getAuthToken(): Promise<string> {
    // token 有效期内直接复用
    const now = Date.now();
    if (cachedToken && now < tokenExpiry) {
        return cachedToken;
    }

    const res = await fetch(`${UMAMI_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: UMAMI_USERNAME, password: UMAMI_PASSWORD }),
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

async function fetchStats(path?: string) {
    const token = await getAuthToken();
    const endAt = Date.now();
    const startAt = endAt - 30 * 24 * 60 * 60 * 1000; // 最近 30 天

    const params = new URLSearchParams({
        startAt: String(startAt),
        endAt: String(endAt),
    });
    if (path) {
        params.set("path", path);
    }

    const res = await fetch(
        `${UMAMI_BASE_URL}/api/websites/${UMAMI_WEBSITE_ID}/stats?${params}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!res.ok) {
        throw new Error(`Umami stats fetch failed: ${res.status}`);
    }

    return res.json();
}

export const GET: APIRoute = async ({ url }) => {
    try {
        if (!UMAMI_USERNAME || !UMAMI_PASSWORD) {
            return new Response(
                JSON.stringify({ error: "Umami credentials not configured" }),
                { status: 500, headers: { "Content-Type": "application/json" } }
            );
        }

        const path = url.searchParams.get("path") || undefined;
        const stats = await fetchStats(path);

        return new Response(JSON.stringify(stats), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "public, max-age=300", // 缓存 5 分钟
            },
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return new Response(
            JSON.stringify({ error: message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};
