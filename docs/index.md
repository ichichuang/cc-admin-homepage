---
title: 首页
date: 2024-01-01
sidebar: false
---

# cc-admin 企业级后台管理框架

> 基于 Vue 3.5+ 和 TypeScript 5+ 的现代化企业级后台管理框架

::: tip 🎯 核心特性
cc-admin 是一个现代化的企业级后台管理框架，采用最新的技术栈，提供完整的开发解决方案。
:::

## 🚀 核心特性

::: cardList

```yaml
- name: 🎯 现代化技术栈
  desc: Vue 3.5+ + TypeScript 5+ + Vite 7+
  bgColor: "#CBEAFA"
  textColor: "#6854A1"
- name: 🎨 原子化 CSS
  desc: 基于 UnoCSS 的现代化样式系统
  bgColor: "#718971"
  textColor: "#fff"
- name: 📱 响应式设计
  desc: 完美适配桌面端和移动端
  bgColor: "#FCDBA0"
  textColor: "#A05F2C"
- name: 🌍 国际化支持
  desc: 内置多语言切换功能
  bgColor: "#DFEEE7"
  textColor: "#2A3344"
- name: 🔐 权限管理
  desc: 基于角色的权限控制系统
  bgColor: "#F0DFB1"
  textColor: "#242A38"
- name: 📊 数据可视化
  desc: 丰富的图表和统计组件
  bgColor: "#E8F4FD"
  textColor: "#2E5B88"
```

:::

## 📚 文档导航

### 🏗️ 基础架构

::: cardList

```yaml
- name: 技术栈介绍
  desc: 了解框架使用的核心技术
  link: /guide/tech-stack.html
  bgColor: "#CBEAFA"
  textColor: "#6854A1"
- name: 架构设计
  desc: 掌握项目的架构设计理念
  link: /guide/architecture.html
  bgColor: "#718971"
  textColor: "#fff"
- name: 项目结构
  desc: 掌握项目的目录组织和模块划分
  link: /guide/project-structure.html
  bgColor: "#FCDBA0"
  textColor: "#A05F2C"
- name: 开发指南
  desc: 快速上手开发流程
  link: /guide/development.html
  bgColor: "#DFEEE7"
  textColor: "#2A3344"
```

:::

### 🎨 样式系统

::: cardList

```yaml
- name: UnoCSS 配置
  desc: 原子化 CSS 引擎配置
  link: /guide/unocss.html
  bgColor: "#F0DFB1"
  textColor: "#242A38"
- name: 响应式适配
  desc: 移动端和桌面端适配
  link: /guide/responsive.html
  bgColor: "#E8F4FD"
  textColor: "#2E5B88"
- name: 主题系统
  desc: 深色/浅色主题切换
  link: /guide/theme.html
  bgColor: "#F5E6E8"
  textColor: "#8B5A7C"
```

:::

### 🔧 核心功能

::: cardList

```yaml
- name: 状态管理
  desc: Pinia 状态管理详解
  link: /guide/state-management.html
  bgColor: "#CBEAFA"
  textColor: "#6854A1"
- name: 路由系统
  desc: Vue Router 路由配置
  link: /guide/router.html
  bgColor: "#718971"
  textColor: "#fff"
- name: HTTP 请求
  desc: Alova 请求库使用
  link: /guide/http.html
  bgColor: "#FCDBA0"
  textColor: "#A05F2C"
- name: 国际化
  desc: Vue I18n 多语言支持
  link: /guide/i18n.html
  bgColor: "#DFEEE7"
  textColor: "#2A3344"
```

:::

## 🚀 快速开始

::: warning ⚠️ 环境要求
请确保您的开发环境满足以下要求：

- Node.js >= 22.x
- pnpm >= 8.0.0
  :::

### 安装和运行

```bash
# 克隆项目
git clone https://github.com/ichichuang/cc-admin.git

# 进入项目目录
cd cc-admin

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

### 开发命令

::: details 📋 完整命令列表

```bash
# 开发环境
pnpm dev

# 类型检查
pnpm type-check

# 代码检查
pnpm lint

# 代码格式化
pnpm format

# 命名规范检查
pnpm naming-check

# 环境检查
pnpm env-check

# 版权保护
pnpm copyright:check
```

:::

## 🎯 核心优势

### 1. 现代化技术栈

::: cardList

```yaml
- name: Vue 3.5+
  desc: 最新的 Vue 版本，支持 Composition API
  bgColor: "#CBEAFA"
  textColor: "#6854A1"
- name: TypeScript 5+
  desc: 完整的类型安全支持
  bgColor: "#718971"
  textColor: "#fff"
- name: Vite 7+
  desc: 极速的开发体验和构建性能
  bgColor: "#FCDBA0"
  textColor: "#A05F2C"
- name: UnoCSS
  desc: 原子化 CSS 引擎，开发效率更高
  bgColor: "#DFEEE7"
  textColor: "#2A3344"
```

:::

### 2. 企业级特性

::: cardList

```yaml
- name: 权限管理
  desc: 基于角色的细粒度权限控制
  bgColor: "#F0DFB1"
  textColor: "#242A38"
- name: 动态路由
  desc: 支持后端动态路由配置
  bgColor: "#E8F4FD"
  textColor: "#2E5B88"
- name: 国际化
  desc: 内置多语言支持，支持 RTL 布局
  bgColor: "#F5E6E8"
  textColor: "#8B5A7C"
- name: 主题系统
  desc: 深色/浅色模式 + 多色系支持
  bgColor: "#E6F3FF"
  textColor: "#1E3A8A"
```

:::

### 3. 开发体验

::: cardList

```yaml
- name: 热重载
  desc: 极速的开发体验
  bgColor: "#CBEAFA"
  textColor: "#6854A1"
- name: 类型安全
  desc: 完整的 TypeScript 支持
  bgColor: "#718971"
  textColor: "#fff"
- name: 代码规范
  desc: ESLint + Prettier + Husky
  bgColor: "#FCDBA0"
  textColor: "#A05F2C"
- name: 自动化
  desc: 完善的 CI/CD 流程
  bgColor: "#DFEEE7"
  textColor: "#2A3344"
```

:::

### 4. 性能优化

::: cardList

```yaml
- name: 代码分割
  desc: 按需加载，减少包体积
  bgColor: "#F0DFB1"
  textColor: "#242A38"
- name: 缓存策略
  desc: 智能的 HTTP 缓存管理
  bgColor: "#E8F4FD"
  textColor: "#2E5B88"
- name: 压缩优化
  desc: 支持 Gzip/Brotli 压缩
  bgColor: "#F5E6E8"
  textColor: "#8B5A7C"
- name: CDN 支持
  desc: 支持静态资源 CDN 部署
  bgColor: "#E6F3FF"
  textColor: "#1E3A8A"
```

:::

## 🎨 项目展示

::: cardImgList

```yaml
- img: https://fastly.jsdelivr.net/gh/xugaoyi/image_store/blog/20200529162253.jpg
  link: https://github.com/ichichuang/cc-admin
  name: 现代化界面设计
  desc: 采用最新的设计理念，提供美观的用户界面
  author: chichuang
  avatar: https://fastly.jsdelivr.net/gh/xugaoyi/image_store/blog/20200103123203.jpg
- img: https://fastly.jsdelivr.net/gh/xugaoyi/image_store/blog/20200530100256.jpg
  link: https://github.com/ichichuang/cc-admin
  name: 响应式布局
  desc: 完美适配各种设备尺寸，提供一致的用户体验
  author: chichuang
  avatar: https://fastly.jsdelivr.net/gh/xugaoyi/image_store/blog/20200103123203.jpg
- img: https://fastly.jsdelivr.net/gh/xugaoyi/image_store/blog/20200530100257.jpg
  link: https://github.com/ichichuang/cc-admin
  name: 丰富的组件库
  desc: 内置大量企业级组件，快速构建应用
  author: chichuang
  avatar: https://fastly.jsdelivr.net/gh/xugaoyi/image_store/blog/20200103123203.jpg
```

:::

## 🤝 贡献指南

::: tip 💡 贡献方式
我们欢迎所有形式的贡献！请查看我们的贡献指南了解详情。
:::

### 开发流程

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 代码规范

::: details 📋 代码规范详情

- 使用 TypeScript 进行类型安全开发
- 遵循 ESLint 和 Prettier 配置
- 提交信息遵循 Conventional Commits 规范
- 所有代码都需要通过测试
  :::

## 📄 许可证

::: danger ⚠️ 许可证说明
本项目采用自定义商业限制许可证，仅供非商业用途使用。
:::

## 🔗 相关链接

::: cardList

```yaml
- name: GitHub 仓库
  desc: 查看源代码和贡献
  link: https://github.com/ichichuang/cc-admin
  bgColor: "#CBEAFA"
  textColor: "#6854A1"
- name: 在线演示
  desc: 体验框架功能
  link: https://www.cc-admin.wzdxcc.cloudns.org
  bgColor: "#718971"
  textColor: "#fff"
- name: 问题反馈
  desc: 提交问题和建议
  link: https://github.com/ichichuang/cc-admin/issues
  bgColor: "#FCDBA0"
  textColor: "#A05F2C"
- name: 更新日志
  desc: 查看版本更新记录
  link: /changelog/
  bgColor: "#DFEEE7"
  textColor: "#2A3344"
```

:::

## 📞 联系我们

::: center

### 联系方式

:::

::: cardList

```yaml
- name: 作者
  desc: chichuang
  bgColor: "#F0DFB1"
  textColor: "#242A38"
- name: 邮箱
  desc: 通过 GitHub Issues 联系
  link: https://github.com/ichichuang/cc-admin/issues
  bgColor: "#E8F4FD"
  textColor: "#2E5B88"
- name: 项目主页
  desc: https://github.com/ichichuang/cc-admin
  link: https://github.com/ichichuang/cc-admin
  bgColor: "#F5E6E8"
  textColor: "#8B5A7C"
```

:::

---

::: center
**cc-admin** - 让企业级后台开发更简单、更高效！
:::

::: tip 💡 框架特色

> 本框架为 chichuang 原创，采用自定义商业限制许可证，仅供非商业用途使用。
> :::
