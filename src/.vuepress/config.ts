import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { searchProPlugin } from "vuepress-plugin-search-pro";




export default defineUserConfig({
	base: "/",
	locales: {
		"/": {
			lang: "zh-CN",
		}
	},

	theme,
	// Enable it with pwa
	// shouldPrefetch: false,
	plugins: [
		searchProPlugin({
			indexContent: true,
			hotReload: true,
			// 为分类和标签添加索引
			customFields: [
				{
					getter: (page) => page.frontmatter.category,
					formatter: "分类：$content",
				},
				{
					getter: (page) => page.frontmatter.tag,
					formatter: "标签：$content",
				},
			],
		}),
	],

});