import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "主页",
	subtitle: "Everything is possible. ",
	lang: "zh_CN", // Language code, e.g. 'en', 'zh_CN', 'ja', etc.
	themeColor: {
		hue: 355, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
		fixed: false, // Hide the theme color picker for visitors
	},
	banner: {
		enable: false,
		src: "assets/images/demo-banner.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
		position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: false, // Display the credit text of the banner image
			text: "", // Credit text to be displayed
			url: "", // (Optional) URL link to the original artwork or artist's page
		},
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 2, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [
		// Leave this array empty to use the default favicon
		// {
		//   src: '/favicon/icon.png',    // Path of the favicon, relative to the /public directory
		//   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
		//   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
		// }
	],
	background: {
		enable: false,
		src: "",
		position: undefined,
		size: undefined,
		repeat: undefined,
		attachment: undefined,
		opacity: undefined
	}
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		{
			name: "GitHub",
			url: "https://github.com/saicaca/fuwari", // Internal links should not include the base path, as it is automatically added
			external: true, // Show an external link icon and will open in a new tab
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "/sponsors/mytouxiang.jpg", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "mrxuxuxu",
	bio: "及时行乐",
	links: [
		{
			name: "TikTok",
			icon: "fa6-brands:tiktok", // Visit https://icones.js.org/ for icon codes
			// You will need to install the corresponding icon set if it's not already included
			// `pnpm add @iconify-json/<icon-set-name>`
			url: "https://v.douyin.com/B-b7Hr-XI6w/",
		},
		{
			name: "Steam",
			icon: "fa6-brands:steam",
			url: "https://store.steampowered.com",
		},
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/saicaca/fuwari",
		},
		{
			name: "GitHub",
			icon: "fa6-brands:bilibili",
			url: "https://space.bilibili.com/670929139",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
	// Please select a dark theme, as this blog theme currently only supports dark background color
	theme: "github-dark",
};
// --- 请将这些添加到 src/config.ts 末尾 ---

// 1. 图片加载失败时的备用配置 (修复 ImageWrapper.astro 报错)
export const imageFallbackConfig = {
  enable: false, // 是否启用备用图片
  src: "",       // 备用图片的地址，例如 "/images/fallback.png"
  alt: "Image load failed",
};

// 2. Umami 统计配置 (修复 Profile.astro 报错，即使你不用也建议加上以防万一)
export const umamiConfig = {
  enable: false, // 设为 false 即可禁用相关功能
  websiteId: "", 
  host: "",      // 或者 baseUrl: ""
  shareId: "",
  timezone: "UTC",
};

// 3. (可选) 如果还有其他组件报错，通常也是缺这种开关式配置
// 保持文件结构完整，防止后续构建再次中断
// src/config.ts (在现有配置的最后添加)

// --- 在这里添加新的 noticeConfig ---

/**
 * 公告栏配置
 */
export const noticeConfig = {
  enable: false, // 是否启用公告栏，设为 true 开启
  level: 'info', // 公告级别: 'info', 'warning', 'error' 等
  content: '这是一条示例公告内容。', // 公告显示的文字
};

// --- 文件结束 ---