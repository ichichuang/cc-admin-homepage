---
title: 指南
sidebar: auto
date: 2025-08-04 16:00:26
permalink: /pages/55bd5d/
categories:
  - guide
tags:
  -
author:
  name: chichuang
  link: https://github.com/ichichuang
---

# cc-admin 框架文档指南

::: tip 🎯 欢迎使用
欢迎使用 cc-admin 企业级后台管理框架！本指南将帮助您快速了解和使用框架的各项功能。
:::

## 📚 文档结构

### 🏗️ 基础架构

::: cardList

```yaml
- name: 技术栈介绍
  desc: 了解框架使用的核心技术
  link: /guide/tech-stack.html
  bgColor: "#CBEAFA"
  textColor: "#6854A1"
- name: 项目结构
  desc: 掌握项目的目录组织和模块划分
  link: /guide/project-structure.html
  bgColor: "#718971"
  textColor: "#fff"
- name: 架构设计
  desc: 掌握项目的架构设计理念
  link: /guide/architecture.html
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
- name: 组件样式
  desc: 组件样式规范
  link: /guide/components.html
  bgColor: "#E6F3FF"
  textColor: "#1E3A8A"
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

### 🛠️ 开发工具

::: cardList

```yaml
- name: 构建配置
  desc: Vite 构建工具配置
  link: /guide/build.html
  bgColor: "#F0DFB1"
  textColor: "#242A38"
- name: 开发脚本
  desc: 自动化开发脚本
  link: /guide/scripts.html
  bgColor: "#E8F4FD"
  textColor: "#2E5B88"
- name: 代码规范
  desc: ESLint + Prettier 配置
  link: /guide/code-standards.html
  bgColor: "#F5E6E8"
  textColor: "#8B5A7C"
- name: 部署指南
  desc: 生产环境部署
  link: /guide/deployment.html
  bgColor: "#E6F3FF"
  textColor: "#1E3A8A"
```

:::

## 🚀 快速开始

### 1. 环境准备

::: warning ⚠️ 环境要求
请确保您的开发环境满足以下要求：
:::

```bash
# 确保 Node.js 版本 >= 22.x
node --version

# 确保 pnpm 版本 >= 8.0.0
pnpm --version
```

### 2. 项目安装

```bash
# 克隆项目
git clone https://github.com/ichichuang/cc-admin.git

# 进入项目目录
cd cc-admin

# 安装依赖
pnpm install
```

### 3. 开发启动

::: details 📋 开发命令详情

```bash
# 启动开发服务器
pnpm dev

# 类型检查
pnpm type-check

# 代码检查
pnpm lint

# 代码格式化
pnpm format
```

:::

### 4. 构建部署

```bash
# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview

# 分析构建包
pnpm build:analyze
```

## 🎯 核心特性

### 现代化技术栈

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

### 企业级功能

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

### 开发体验

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

### 性能优化

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

## 📖 使用指南

### 1. 项目结构理解

::: tip 💡 学习建议
首先阅读 [项目结构](/guide/project-structure.html) 文档，了解框架的目录组织和模块划分。
:::

### 2. 技术栈学习

阅读 [技术栈介绍](/guide/tech-stack.html) 文档，了解框架使用的核心技术。

### 3. 样式系统

学习 [UnoCSS 配置](/guide/unocss.html) 和 [响应式适配](/guide/responsive.html)，掌握样式开发。

### 4. 核心功能

深入了解 [状态管理](/guide/state-management.html)、[路由系统](/guide/router.html)、[HTTP 请求](/guide/http.html) 等核心功能。

### 5. 开发工具

掌握 [构建配置](/guide/build.html) 和 [开发脚本](/guide/scripts.html)，提高开发效率。

## 🎨 设计理念

### 模块化设计

::: cardList

```yaml
- name: 高内聚低耦合
  desc: 模块内部功能紧密相关，模块间依赖最小化
  bgColor: "#CBEAFA"
  textColor: "#6854A1"
- name: 单一职责
  desc: 每个模块只负责一个特定的功能领域
  bgColor: "#718971"
  textColor: "#fff"
- name: 可复用性
  desc: 通用功能抽象为可复用的模块
  bgColor: "#FCDBA0"
  textColor: "#A05F2C"
- name: 可扩展性
  desc: 模块设计支持功能扩展和定制
  bgColor: "#DFEEE7"
  textColor: "#2A3344"
```

:::

### 类型安全

::: cardList

```yaml
- name: 完整的 TypeScript 支持
  desc: 从 API 到组件的完整类型推导
  bgColor: "#F0DFB1"
  textColor: "#242A38"
- name: 严格的类型检查
  desc: 编译时发现潜在错误
  bgColor: "#E8F4FD"
  textColor: "#2E5B88"
- name: 智能提示
  desc: IDE 提供准确的代码补全
  bgColor: "#F5E6E8"
  textColor: "#8B5A7C"
- name: 接口定义
  desc: 清晰的 API 契约
  bgColor: "#E6F3FF"
  textColor: "#1E3A8A"
```

:::

### 开发体验

::: cardList

```yaml
- name: 热重载
  desc: 毫秒级的更新速度
  bgColor: "#CBEAFA"
  textColor: "#6854A1"
- name: 代码规范
  desc: 统一的代码风格和质量标准
  bgColor: "#718971"
  textColor: "#fff"
- name: 自动化
  desc: 完善的构建和部署流程
  bgColor: "#FCDBA0"
  textColor: "#A05F2C"
- name: 文档完善
  desc: 详细的使用文档和示例
  bgColor: "#DFEEE7"
  textColor: "#2A3344"
```

:::

## 🔧 开发规范

### 代码风格

::: details 📋 代码风格详情

- 使用 TypeScript 进行类型安全开发
- 遵循 ESLint 和 Prettier 配置
- 使用 Composition API 编写组件
- 遵循 Vue 3 最佳实践
  :::

### 提交规范

::: details 📋 提交规范详情

- 使用 Conventional Commits 规范
- 提交信息要清晰描述改动内容
- 大型改动需要详细的说明
- 所有代码都需要通过测试
  :::

### 文档维护

::: details 📋 文档维护详情

- 及时更新相关文档
- 提供清晰的使用示例
- 记录重要的设计决策
- 维护 API 文档的准确性
  :::

## 🤝 贡献指南

### 开发流程

::: tip 💡 贡献流程

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request
   :::

### 代码审查

::: details 📋 代码审查要求

- 确保代码符合项目代码风格
- 添加必要的测试用例
- 更新相关文档
- 大型改动需要更详细的说明
  :::

## 📞 技术支持

### 问题反馈

::: cardList

```yaml
- name: GitHub Issues
  desc: 提交问题和建议
  link: https://github.com/ichichuang/cc-admin/issues
  bgColor: "#CBEAFA"
  textColor: "#6854A1"
- name: 在线演示
  desc: 体验框架功能
  link: https://www.cc-admin.wzdxcc.cloudns.org
  bgColor: "#718971"
  textColor: "#fff"
- name: 项目主页
  desc: 查看源代码和贡献
  link: https://github.com/ichichuang/cc-admin
  bgColor: "#FCDBA0"
  textColor: "#A05F2C"
```

:::

### 联系方式

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

## 📄 许可证

::: danger ⚠️ 许可证说明
本项目采用自定义商业限制许可证，仅供非商业用途使用。
:::

---

::: center
**cc-admin** - 让企业级后台开发更简单、更高效！
:::

::: tip 💡 框架特色

> 本框架为 chichuang 原创，采用自定义商业限制许可证，仅供非商业用途使用。
> :::
