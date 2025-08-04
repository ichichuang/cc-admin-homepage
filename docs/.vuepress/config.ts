/**
 * VuePress 配置文件
 */
import { resolve } from "path";
import { defineConfig4CustomTheme, UserPlugins } from "vuepress/config";
import { VdoingThemeConfig } from "vuepress-theme-vdoing/types";

export default defineConfig4CustomTheme<VdoingThemeConfig>({
  theme: "vdoing", // 使用npm主题包

  locales: {
    "/": {
      lang: "zh-CN",
      title: "cc-admin 企业级后台管理框架",
      description: "基于 Vue 3.5+ 和 TypeScript 5+ 的现代化企业级后台管理框架",
    },
  },

  // 主题配置
  themeConfig: {
    // 导航配置
    nav: [
      { text: "首页", link: "/" },
      { text: "指南", link: "/guide/" },
      { text: "API", link: "/api/" },
      { text: "案例", link: "/examples/" },
      { text: "更新日志", link: "/changelog/" },
    ],

    sidebarDepth: 2, // 侧边栏显示深度，默认1，最大2（显示到h3标题）
    logo: "/img/logo.png", // 导航栏logo
    repo: "ichichuang/cc-admin", // 导航栏右侧生成Github链接
    searchMaxSuggestions: 10, // 搜索结果显示最大数
    lastUpdated: "上次更新", // 开启更新时间，并配置前缀文字
    docsDir: "docs", // 编辑的文件夹
    editLinks: true, // 启用编辑
    editLinkText: "编辑",

    // 侧边栏
    sidebar: "structuring",

    // 文章默认的作者信息
    author: {
      name: "chichuang", // 必需
      link: "https://github.com/ichichuang", // 可选的
    },

    // 博主信息 (显示在首页侧边栏)
    blogger: {
      avatar: "/img/avatar.png",
      name: "chichuang",
      slogan: "让企业级后台开发更简单、更高效！",
    },

    // 社交图标
    social: {
      icons: [
        {
          iconClass: "icon-github",
          title: "GitHub",
          link: "https://github.com/ichichuang",
        },
        {
          iconClass: "icon-youjian",
          title: "邮箱",
          link: "mailto:contact@cc-admin.com",
        },
        {
          iconClass: "icon-QQ",
          title: "QQ群",
          link: "https://qm.qq.com/cgi-bin/qm/qr?k=xxx",
        },
        {
          iconClass: "icon-weixin",
          title: "微信",
          link: "https://mp.weixin.qq.com/s/xxx",
        },
      ],
    },

    // 页脚信息
    footer: {
      createYear: 2024, // 博客创建年份
      copyrightInfo: "chichuang | cc-admin 企业级后台管理框架 | MIT License",
    },

    // 扩展自动生成frontmatter
    extendFrontmatter: {
      author: {
        name: "chichuang",
        link: "https://github.com/ichichuang",
      },
    },

    // 分类配置
    category: false, // 是否打开分类功能,默认true
    tag: false, // 是否打开标签功能,默认true
    archive: false, // 是否打开归档功能,默认true
    categoryText: "分类", // 碎片化文章（_posts文件夹的文章）预设生成的分类值 默认 [碎片化文章]

    // 页面切换
    pageStyle: "line", // 页面切换风格, 可选值：'card'卡片 | 'line' 线
    bodyBgImg: [
      "https://fastly.jsdelivr.net/gh/xugaoyi/image_store/blog/20200507175828.jpeg",
      "https://fastly.jsdelivr.net/gh/xugaoyi/image_store/blog/20200507175845.jpeg",
      "https://fastly.jsdelivr.net/gh/xugaoyi/image_store/blog/20200507175846.jpeg",
    ], // body背景大图，默认不。 单张图片 String | 多张图片 Array, 多张图片时每隔15秒换一张。
    bodyBgImgOpacity: 0.5, // body背景图透明度，选值 0.1~1.0, 默认0.5
    titleBadge: false, // 文章标题前的图标是否显示，默认true
    titleBadgeIcons: [
      // 文章标题前图标的地址，默认主题内置图标
      "https://img.shields.io/badge/one-1-blue",
      "https://img.shields.io/badge/two-2-orange",
      "https://img.shields.io/badge/three-3-red",
    ],
    contentBgStyle: 1, // 文章内容块的背景风格, 默认无. 1 方格 | 2 横线 | 3 竖线 | 4 左斜线 | 5 右斜线 | 6 点状

    // 更新提示
    updateBar: {
      showToArticle: true, // 显示到文章页底部，默认true
      moreArticle: "/archives", // "更多文章"链接的地址，默认/archives
    },
    rightMenuBar: false, // 是否显示右侧文章大纲栏, 默认true(屏宽小于1300px下无论如何都不显示)
    sidebarOpen: false, // 初始状态是否打开侧边栏，默认true
    pageButton: false, // 是否显示快捷翻页按钮，默认true

    // 默认模式
    defaultMode: "auto", // 默认模式，auto(auto, light, dark) | light | dark
  },

  // 注入到页面<head>中的标签
  head: [
    ["link", { rel: "icon", href: "/img/favicon.ico" }], //favicons，资源放在public文件夹
    [
      "meta",
      {
        name: "keywords",
        content: "Vue3,TypeScript,Vite,UnoCSS,企业级,后台管理,管理框架",
      },
    ],
    ["meta", { name: "theme-color", content: "#11a8cd" }], // 移动浏览器主题颜色
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
    ["meta", { name: "format-detection", content: "telephone=no" }],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
  ],

  // 插件配置
  plugins: <UserPlugins>[
    [
      "sitemap", // 网站地图
      {
        hostname: "https://cc-admin.wzdxcc.cloudns.org",
      },
    ],

    [
      "one-click-copy", // 代码块复制按钮
      {
        copySelector: [
          'div[class*="language-"] pre',
          'div[class*="aside-code"] aside',
        ],
        copyMessage: "复制成功",
        duration: 1000,
        showInMobile: false,
      },
    ],

    [
      "vuepress-plugin-zooming", // 放大图片
      {
        selector: ".theme-vdoing-content img:not(.no-zoom)",
        options: {
          bgColor: "rgba(0,0,0,0.6)",
        },
      },
    ],

    [
      "vuepress-plugin-container",
      {
        type: "tip",
        defaultTitle: {
          "/": "提示",
        },
      },
    ],
    [
      "vuepress-plugin-container",
      {
        type: "warning",
        defaultTitle: {
          "/": "注意",
        },
      },
    ],
    [
      "vuepress-plugin-container",
      {
        type: "danger",
        defaultTitle: {
          "/": "警告",
        },
      },
    ],
    [
      "vuepress-plugin-container",
      {
        type: "details",
        before: (info) => `<details class="custom-block details">${info}`,
        after: "</details>",
      },
    ],
  ],

  markdown: {
    lineNumbers: true,
    extractHeaders: ["h2", "h3", "h4", "h5", "h6"], // 提取标题到侧边栏的级别，默认['h2', 'h3']
  },

  // 监听文件变化并重新构建
  extraWatchFiles: [".vuepress/config.ts"],
});
