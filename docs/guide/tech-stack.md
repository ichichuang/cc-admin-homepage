---
title: tech-stack
date: 2025-08-04 16:17:18
permalink: /pages/cf2ad3/
categories:
  - guide
tags:
  -
author:
  name: 文档作者
  link: https://github.com/your-username
---

# 技术栈介绍

cc-admin 框架采用现代化的前端技术栈，为企业级后台管理系统提供强大的开发能力。

## 🎯 核心技术

### Vue 3.5+

**版本**: 3.5+  
**作用**: 渐进式 JavaScript 框架，提供响应式数据绑定和组件化开发

**特性**:

- **Composition API** - 更好的逻辑复用和类型推导
- **Teleport** - 组件内容传送到指定位置
- **Fragments** - 支持多根节点组件
- **Suspense** - 异步组件加载状态管理
- **更好的 TypeScript 支持** - 完整的类型推导

**使用示例**:

```vue
<script setup lang="ts">
import { ref, computed } from "vue";

const count = ref(0);
const doubleCount = computed(() => count.value * 2);

const increment = () => {
  count.value++;
};
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double: {{ doubleCount }}</p>
    <button @click="increment">+1</button>
  </div>
</template>
```

### TypeScript 5+

**版本**: 5+  
**作用**: JavaScript 的超集，提供静态类型检查

**特性**:

- **严格的类型检查** - 编译时发现潜在错误
- **智能提示** - IDE 提供准确的代码补全
- **接口定义** - 清晰的 API 契约
- **泛型支持** - 可重用的类型安全代码
- **装饰器** - 元数据编程支持

**类型定义示例**:

```typescript
interface UserInfo {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  permissions: Permission[];
}

type UserRole = "admin" | "user" | "guest";
type Permission = "read" | "write" | "delete";

const user: UserInfo = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  role: "admin",
  permissions: ["read", "write"],
};
```

### Vite 7+

**版本**: 7+  
**作用**: 下一代前端构建工具，提供极速的开发体验

**特性**:

- **极速冷启动** - 基于 ES 模块的按需编译
- **热模块替换** - 毫秒级的更新速度
- **丰富的插件生态** - 支持 Vue、TypeScript、UnoCSS 等
- **优化的构建** - 生产环境的高性能构建
- **开发服务器** - 内置开发服务器和代理功能

**配置示例**:

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";

export default defineConfig({
  plugins: [vue(), UnoCSS()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});
```

## 🎨 样式系统

### UnoCSS 66+

**版本**: 66+  
**作用**: 原子化 CSS 引擎，提供即时生成和按需加载

**特性**:

- **原子化 CSS** - 实用优先的 CSS 框架
- **即时生成** - 按需生成 CSS，减少包体积
- **属性化模式** - 支持属性化语法
- **图标支持** - 内置图标系统
- **主题系统** - 灵活的主题配置

**使用示例**:

```vue
<template>
  <!-- 原子化类名 -->
  <div
    class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
  >
    <h1 class="text-2xl font-bold text-gray-900">标题</h1>
    <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      按钮
    </button>
  </div>

  <!-- 属性化模式 -->
  <div
    un:flex="~ items-center justify-between"
    un:p="4"
    un:bg="white"
    un:rounded="lg"
    un:shadow="md"
  >
    <h1 un:text="2xl" un:font="bold" un:text="gray-900">标题</h1>
    <button
      un:px="4"
      un:py="2"
      un:bg="blue-500"
      un:text="white"
      un:rounded
      un:hover:bg="blue-600"
    >
      按钮
    </button>
  </div>
</template>
```

### PostCSS + pxtorem

**作用**: 响应式适配方案，实现设计稿到像素的精确映射

**特性**:

- **设计稿映射** - 精确的设计稿到像素映射
- **响应式缩放** - 支持不同屏幕尺寸的自动缩放
- **rem 适配** - 基于 rem 的响应式布局
- **兼容性处理** - 自动处理浏览器兼容性

**配置示例**:

```javascript
// postcss-pxtorem 配置
postcssPxToRem({
  rootValue: 16, // 基准字体大小
  propList: ["*"], // 转换所有属性
  selectorBlackList: [
    /^\.w-(full|auto)/, // 排除特定类名
    /^\.h-(full|auto)/,
    /^\.text-(xs|sm|base|lg|xl)/,
  ],
  minPixelValue: 1, // 最小转换像素值
  mediaQuery: true, // 允许在媒体查询中转换
});
```

## 🔧 状态管理

### Pinia 3+

**版本**: 3+  
**作用**: Vue 的官方状态管理库，提供类型安全的状态管理

**特性**:

- **TypeScript 支持** - 完整的类型推导
- **Composition API** - 与 Vue 3 完美集成
- **开发工具** - 内置 Vue DevTools 支持
- **持久化** - 支持状态持久化
- **模块化** - 支持多个 store 模块

**使用示例**:

```typescript
// stores/modules/user.ts
import { defineStore } from "pinia";

interface UserState {
  userInfo: UserInfo | null;
  token: string | null;
  permissions: string[];
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    userInfo: null,
    token: null,
    permissions: [],
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    hasPermission: (state) => (permission: string) =>
      state.permissions.includes(permission),
  },

  actions: {
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo;
    },

    setToken(token: string) {
      this.token = token;
    },

    logout() {
      this.userInfo = null;
      this.token = null;
      this.permissions = [];
    },
  },

  persist: {
    key: "user-store",
    storage: localStorage,
    paths: ["token", "userInfo"],
  },
});
```

## 🌐 路由系统

### Vue Router 4+

**版本**: 4+  
**作用**: Vue.js 官方路由管理器

**特性**:

- **动态路由** - 支持后端动态路由配置
- **路由守卫** - 完整的路由权限控制
- **懒加载** - 支持路由级别的代码分割
- **嵌套路由** - 支持复杂的路由嵌套
- **路由元信息** - 丰富的路由元数据支持

**配置示例**:

```typescript
// router/modules/dashboard.ts
import type { RouteConfig } from "@/Types";

export const dashboardRoutes: RouteConfig[] = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/dashboard/index.vue"),
    meta: {
      title: "仪表盘",
      icon: "dashboard",
      roles: ["admin", "user"],
      auths: ["dashboard:read"],
    },
    children: [
      {
        path: "overview",
        name: "DashboardOverview",
        component: () => import("@/views/dashboard/overview.vue"),
        meta: {
          title: "概览",
          roles: ["admin", "user"],
        },
      },
    ],
  },
];
```

## 📡 HTTP 请求

### Alova 3+

**版本**: 3+  
**作用**: 轻量级请求策略库，提供强大的请求管理能力

**特性**:

- **请求策略** - 支持缓存、重试、预加载等策略
- **类型安全** - 完整的 TypeScript 支持
- **请求拦截** - 支持请求和响应拦截
- **文件上传** - 内置文件上传管理
- **连接管理** - 智能的网络连接管理

**使用示例**:

```typescript
// api/modules/user.ts
import { alovaInstance } from "@/utils/http";
import type { UserInfo, LoginParams } from "@/Types";

// 用户相关 API
export const userApi = {
  // 登录
  login: (params: LoginParams) => alovaInstance.Post("/auth/login", params),

  // 获取用户信息
  getUserInfo: () => alovaInstance.Get<UserInfo>("/user/info"),

  // 更新用户信息
  updateUserInfo: (userInfo: Partial<UserInfo>) =>
    alovaInstance.Put("/user/info", userInfo),

  // 上传头像
  uploadAvatar: (file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);
    return alovaInstance.Post("/user/avatar", formData);
  },
};
```

## 🌍 国际化

### Vue I18n 10+

**版本**: 10+  
**作用**: Vue.js 的国际化插件

**特性**:

- **多语言支持** - 支持中文、英文、繁体中文
- **动态切换** - 运行时语言切换
- **格式化** - 支持数字、日期格式化
- **复数规则** - 支持复数形式处理
- **RTL 支持** - 支持从右到左的布局

**配置示例**:

```typescript
// locales/lang/zh-CN.ts
export default {
  common: {
    confirm: "确认",
    cancel: "取消",
    save: "保存",
    delete: "删除",
    edit: "编辑",
    add: "添加",
  },
  auth: {
    login: "登录",
    logout: "退出登录",
    username: "用户名",
    password: "密码",
  },
  dashboard: {
    title: "仪表盘",
    overview: "概览",
    statistics: "统计",
  },
};
```

## 🛠️ 开发工具

### ESLint + Prettier

**作用**: 代码质量检查和格式化

**特性**:

- **代码检查** - 静态代码分析
- **格式化** - 统一的代码风格
- **TypeScript 支持** - 完整的 TS 规则
- **Vue 支持** - 专门的 Vue 规则
- **自动修复** - 支持自动修复问题

### Husky + lint-staged

**作用**: Git 钩子和代码质量保证

**特性**:

- **Git 钩子** - 提交前自动检查
- **代码格式化** - 自动格式化暂存文件
- **类型检查** - 提交前类型检查
- **测试运行** - 提交前运行测试

### TypeScript 编译器

**作用**: TypeScript 类型检查和编译

**特性**:

- **类型检查** - 编译时类型检查
- **类型推导** - 智能的类型推导
- **错误报告** - 详细的错误信息
- **增量编译** - 高效的增量编译

## 📦 构建工具

### Vite 构建

**特性**:

- **快速构建** - 基于 Rollup 的高效构建
- **代码分割** - 智能的代码分割策略
- **资源优化** - 自动的资源优化
- **多环境支持** - 开发、测试、生产环境

### 压缩和优化

**特性**:

- **Terser 压缩** - JavaScript 代码压缩
- **CSS 压缩** - CSS 代码压缩
- **Gzip/Brotli** - 支持多种压缩格式
- **Tree Shaking** - 自动移除未使用代码

## 🔒 版权保护

### 代码监控系统

**特性**:

- **版权检查** - 自动检查版权信息
- **相似性检测** - 检测代码相似性
- **技术栈匹配** - 监控技术栈使用
- **报告生成** - 生成详细的监控报告

## 📊 性能优化

### 代码分割

- **路由级别分割** - 按路由分割代码
- **组件级别分割** - 按需加载组件
- **第三方库分割** - 分离第三方库

### 缓存策略

- **HTTP 缓存** - 智能的 HTTP 缓存
- **浏览器缓存** - 利用浏览器缓存
- **CDN 缓存** - 支持 CDN 部署

### 资源优化

- **图片优化** - 自动图片压缩
- **字体优化** - 字体文件优化
- **CSS 优化** - CSS 代码优化

---

这套技术栈为 cc-admin 框架提供了强大的开发能力和优秀的用户体验，是企业级后台管理系统开发的理想选择。
title: tech-stack
date: 2025-08-04 16:17:18
permalink: /pages/3b0a24/
categories:

- guide
  tags:
- author:
  name: 文档作者
  link: https://github.com/your-username

---
