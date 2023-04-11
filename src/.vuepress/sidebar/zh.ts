import { sidebar } from "vuepress-theme-hope";
import { note } from "./note.js";
import { code } from "./code.js";


export const zhSidebar = sidebar({
	"/": [
		"",
		// "intro",
		// "slides",
		// {
		// 	text: "如何使用",
		// 	icon: "creative",
		// 	prefix: "demo/",
		// 	link: "demo/",
		// 	children: "structure",
		// },
		// {
		// 	text: "文章",
		// 	icon: "note",
		// 	prefix: "posts/",
		// 	children: "structure",
		// },

		// {
		// 	text: "学习笔记",
		// 	icon: "note",
		// 	prefix: "Java学习/",
		// 	children: "structure",
		// },
	],
	"/note/": note,
	"/code/": code,
});