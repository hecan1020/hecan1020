import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { searchProPlugin } from "vuepress-plugin-search-pro";
import { autoCatalogPlugin } from "vuepress-plugin-auto-catalog";
import { commentPlugin } from "vuepress-plugin-comment2";



export default defineUserConfig({
	base: "/hecan1020/",
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
		autoCatalogPlugin(),
		commentPlugin({
		      provider: "Giscus",
		      repo: "hecan1020/blog_comment",
		      repoId: "R_kgDOJOfP7g",
		      category: "Announcements",
		      categoryId: "DIC_kwDOJOfP7s4CVJ_x",
		    }),
	],

});