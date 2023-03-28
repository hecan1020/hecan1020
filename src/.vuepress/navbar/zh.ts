import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
	"/",
	"/article/",
	{
		text: "随笔",
		icon: "note",
		children: [
			"/随笔/面试记录/"
		],
	},
	// {
	//   text: "Redis",
	//   icon: "edit",
	//   prefix: "Redis/",
	//   children: [

	// },
	// {
	//   text: "V2 文档",
	//   icon: "note",
	//   link: "https://theme-hope.vuejs.press/",
	// },
]);