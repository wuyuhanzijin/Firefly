import type { FriendLink, FriendsPageConfig } from "../types/friendsConfig";

// 可以在src/content/spec/friends.md中编写友链页面下方的自定义内容

// 友链页面配置
export const friendsPageConfig: FriendsPageConfig = {
	// 页面标题，如果留空则使用 i18n 中的翻译
	title: "",

	// 页面描述文本，如果留空则使用 i18n 中的翻译
	description: "",

	// 是否显示底部自定义内容（friends.mdx 中的内容）
	showCustomContent: true,

	// 是否显示评论区，需要先在commentConfig.ts启用评论系统
	showComment: true,

	// 是否开启随机排序配置，如果开启，就会忽略权重，构建时进行一次随机排序
	randomizeSort: false,
};

// 友链配置
export const friendsConfig: FriendLink[] = [
	{
		title: "没用的小废鼠的Blog",
		imgurl: "https://image.linyunlink.top/links/xiao-feishu.jpg",
		desc: "做学问可不是赶潮流、没有冷门热门之说",
		siteurl: "https://blog.xiao-feishu.top/",
		tags: ["友人"],
		weight: 1000,
		enabled: true,
	},
	{
		title: "Wcowin's Web",
		imgurl: "https://image.linyunlink.top/links/wcowin.jpg",
		desc: "循此苦旅，以达星辰",
		siteurl: "https://wcowin.work/",
		tags: ["友人"],
		weight: 999,
		enabled: true,
	},
	{
		title: "清羽飞扬",
		imgurl: "https://image.linyunlink.top/links/qyliu.jpg",
		desc: "柳影曳曳，清酒孤灯，扬笔撒墨，心境如霜",
		siteurl: "https://blog.liushen.fun/",
		tags: ["友人"],
		weight: 998,
		enabled: true,
	},
	{
		title: "Thun888's Blog",
		imgurl: "https://image.linyunlink.top/links/thun888.jpg",
		desc: "夏日当空，心如深渊",
		siteurl: "https://blog.hzchu.top/",
		tags: ["友人"],
		weight: 997,
		enabled: true,
	},
	{
		title: "bbb-lsy07の博客",
		imgurl: "https://image.linyunlink.top/links/bbb-lsy07.jpg",
		desc: "科技激荡人文，洞见智慧本真。",
		siteurl: "https://blog.tsoo.net/",
		tags: ["友人"],
		weight: 996,
		enabled: true,
	},
	{
		title: "小竹の笔记本",
		imgurl: "https://image.linyunlink.top/links/smallbamboo.jpg",
		desc: "非才耀目，心灯自明；好奇之光，照我前行。",
		siteurl: "https://notes.smallbamboo.cn",
		tags: ["友人"],
		weight: 995,
		enabled: true,
	},
	{
		title: "Honaisu",
		imgurl: "https://image.linyunlink.top/links/denvoshome.jpg",
		desc: "时光流转,岁月更迭",
		siteurl: "https://www.denvoshome.xyz/",
		tags: ["友人"],
		weight: 994,
		enabled: true,
	},
];

// 获取启用的友链并进行排序
export const getEnabledFriends = (): FriendLink[] => {
	const friends = friendsConfig.filter((friend) => friend.enabled);

	if (friendsPageConfig.randomizeSort) {
		return friends.sort(() => Math.random() - 0.5);
	}

	return friends.sort((a, b) => b.weight - a.weight);
};
