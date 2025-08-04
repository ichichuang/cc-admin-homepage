# 我的文档系统

这是一个基于 VuePress 的文档系统，使用 vdoing 主题。

## 功能特性

- 📝 基于 Markdown 的文档编写
- 🎨 美观的 vdoing 主题
- 📱 响应式设计
- 🔍 全文搜索
- 📋 代码块复制
- 🔍 图片缩放
- 📊 自动生成目录

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## 项目结构

```
docs/
├── .vuepress/          # VuePress 配置
│   ├── config.ts       # 主配置文件
│   ├── enhanceApp.js   # 应用增强
│   ├── public/         # 静态资源
│   ├── styles/         # 样式文件
│   └── plugins/        # 插件配置
├── guide/              # 指南文档
├── api/                # API 文档
└── index.md           # 首页
```

## 编写文档

### 创建新页面

在 `docs` 目录下创建 `.md` 文件即可。

### Frontmatter

每个 Markdown 文件可以包含 frontmatter：

```yaml
---
title: 页面标题
sidebar: auto
---
```

### 侧边栏

侧边栏会自动根据文件结构生成，也可以通过配置自定义。

## 自定义配置

主要配置文件：`docs/.vuepress/config.ts`

可以修改：

- 网站标题和描述
- 导航菜单
- 主题配置
- 插件配置

## 部署

构建完成后，`docs/.vuepress/dist` 目录包含静态文件，可以部署到任何静态网站托管服务。

## 更多信息

- [VuePress 官方文档](https://v1.vuepress.vuejs.org/)
- [vdoing 主题文档](https://doc.xugaoyi.com/)
