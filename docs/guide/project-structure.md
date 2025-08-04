---
title: project-structure
date: 2025-08-04 16:20:00
permalink: /pages/1d3d82/
categories:
  - guide
tags:
  -
author:
  name: 文档作者
  link: https://github.com/your-username
---

# 项目结构

cc-admin 框架采用模块化的项目结构，清晰的目录组织便于开发和维护。

## 📁 目录结构概览

```
cc-admin/
├── 📁 src/                    # 源代码目录
│   ├── 📁 api/               # API 接口管理
│   ├── 📁 assets/            # 静态资源
│   ├── 📁 common/            # 公共模块
│   ├── 📁 components/        # 通用组件
│   ├── 📁 constants/         # 常量定义
│   ├── 📁 hooks/             # 组合式函数
│   ├── 📁 layouts/           # 布局组件
│   ├── 📁 locales/           # 国际化配置
│   ├── 📁 mock/              # Mock 数据
│   ├── 📁 router/            # 路由配置
│   ├── 📁 stores/            # 状态管理
│   ├── 📁 Types/             # 类型定义
│   ├── 📁 utils/             # 工具函数
│   ├── 📁 views/             # 页面组件
│   ├── 📄 App.vue            # 根组件
│   ├── 📄 env.d.ts           # 环境类型声明
│   ├── 📄 main.ts            # 应用入口
│   └── 📄 types.d.ts         # 全局类型声明
├── 📁 unocss/                # UnoCSS 配置
├── 📁 scripts/               # 构建脚本
├── 📁 monitor_reports/       # 监控报告
├── 📄 package.json           # 项目配置
├── 📄 vite.config.ts         # Vite 配置
├── 📄 uno.config.ts          # UnoCSS 配置
├── 📄 tsconfig.json          # TypeScript 配置
└── 📄 README.md              # 项目说明
```

## 🔧 核心目录详解

### 📁 src/api/ - API 接口管理

**作用**: 统一管理所有 API 接口

```
src/api/
├── 📄 index.ts              # API 统一导出
└── 📁 modules/              # API 模块
    ├── 📄 auth.ts           # 认证相关 API
    ├── 📄 user.ts           # 用户相关 API
    └── 📄 dashboard.ts      # 仪表盘相关 API
```

**示例**:

```typescript
// src/api/modules/auth.ts
import { alovaInstance } from "@/utils/http";
import type { LoginParams, LoginResult } from "@/Types";

export const authApi = {
  // 用户登录
  login: (params: LoginParams) =>
    alovaInstance.Post<LoginResult>("/auth/login", params),

  // 用户登出
  logout: () => alovaInstance.Post("/auth/logout"),

  // 刷新令牌
  refreshToken: () => alovaInstance.Post<LoginResult>("/auth/refresh"),
};
```

### 📁 src/assets/ - 静态资源

**作用**: 存放静态资源文件

```
src/assets/
├── 📁 icons/                # 图标资源
│   ├── 📁 custom/           # 自定义图标
│   └── 📁 language/         # 语言图标
└── 📁 styles/               # 样式文件
    └── 📄 reset.scss        # 样式重置
```

### 📁 src/common/ - 公共模块

**作用**: 存放公共的工具和模块

```
src/common/
├── 📄 index.ts              # 公共模块统一导出
└── 📁 modules/              # 公共模块
    ├── 📄 date.ts           # 日期处理
    ├── 📄 function.ts       # 函数工具
    ├── 📄 helpers.ts        # 辅助函数
    └── 📄 router.ts         # 路由工具
```

### 📁 src/components/ - 通用组件

**作用**: 存放可复用的通用组件

```
src/components/
├── 📁 common/               # 通用组件
│   └── 📄 LanguageSwitch.vue # 语言切换组件
└── 📁 layout/               # 布局组件
    └── 📄 Loading.vue       # 加载组件
```

**组件示例**:

```vue
<!-- src/components/common/LanguageSwitch.vue -->
<template>
  <div class="language-switch">
    <select v-model="currentLocale" @change="handleLocaleChange">
      <option
        v-for="locale in supportedLocales"
        :key="locale.key"
        :value="locale.key"
      >
        {{ locale.flag }} {{ locale.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { getCurrentLocale, setLocale, supportedLocales } from "@/locales";

const currentLocale = ref(getCurrentLocale());

const handleLocaleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  setLocale(target.value as SupportedLocale);
};
</script>
```

### 📁 src/constants/ - 常量定义

**作用**: 统一管理应用常量

```
src/constants/
├── 📄 index.ts              # 常量统一导出
└── 📁 modules/              # 常量模块
    ├── 📄 app.ts            # 应用常量
    ├── 📄 http.ts           # HTTP 常量
    ├── 📄 rem.ts            # 响应式常量
    └── 📄 router.ts         # 路由常量
```

**常量示例**:

```typescript
// src/constants/modules/app.ts
export const APP_CONFIG = {
  NAME: "cc-admin",
  VERSION: "1.0.0",
  DESCRIPTION: "企业级后台管理框架",
  AUTHOR: "chichuang",
} as const;

export const THEME_COLORS = {
  PRIMARY: "#1890ff",
  SUCCESS: "#52c41a",
  WARNING: "#faad14",
  ERROR: "#f5222d",
} as const;
```

### 📁 src/hooks/ - 组合式函数

**作用**: 存放可复用的组合式函数

```
src/hooks/
├── 📄 index.ts              # hooks 统一导出
├── 📁 layout/               # 布局相关 hooks
│   └── 📄 useLoading.ts     # 加载状态 hook
└── 📁 modules/              # 功能模块 hooks
    ├── 📄 useLocale.ts      # 国际化 hook
    └── 📄 usePageTitle.ts   # 页面标题 hook
```

**Hook 示例**:

```typescript
// src/hooks/modules/useLocale.ts
import { computed } from "vue";
import { getCurrentLocale, setLocale, t } from "@/locales";
import type { SupportedLocale } from "@/locales/types";

export function useLocale() {
  const currentLocale = computed(() => getCurrentLocale());

  const changeLocale = (locale: SupportedLocale) => {
    setLocale(locale);
  };

  const translate = (key: string, params?: Record<string, any>) => {
    return t(key, params);
  };

  return {
    currentLocale,
    changeLocale,
    translate,
  };
}
```

### 📁 src/layouts/ - 布局组件

**作用**: 定义应用的不同布局模式

```
src/layouts/
├── 📄 index.vue             # 布局入口组件
└── 📁 components/           # 布局子组件
    ├── 📄 AppBreadcrumb.vue # 面包屑导航
    ├── 📄 AppContainer.vue  # 容器组件
    ├── 📄 AppFooter.vue     # 页脚组件
    ├── 📄 AppHeader.vue     # 头部组件
    ├── 📄 AppSidebar.vue    # 侧边栏组件
    ├── 📄 AppTabs.vue       # 标签页组件
    ├── 📄 AppTopMenu.vue    # 顶部菜单
    ├── 📄 LayoutAdmin.vue   # 管理布局
    ├── 📄 LayoutFullScreen.vue # 全屏布局
    └── 📄 LayoutScreen.vue  # 屏幕布局
```

**布局示例**:

```vue
<!-- src/layouts/components/LayoutAdmin.vue -->
<template>
  <div class="layout-admin">
    <AppHeader />
    <div class="layout-content">
      <AppSidebar />
      <div class="main-content">
        <AppBreadcrumb />
        <AppContainer>
          <router-view />
        </AppContainer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from "./AppHeader.vue";
import AppSidebar from "./AppSidebar.vue";
import AppBreadcrumb from "./AppBreadcrumb.vue";
import AppContainer from "./AppContainer.vue";
</script>
```

### 📁 src/locales/ - 国际化配置

**作用**: 管理多语言支持

```
src/locales/
├── 📄 index.ts              # 国际化入口
├── 📄 types.ts              # 国际化类型
├── 📁 lang/                 # 语言包
│   ├── 📄 en-US.ts         # 英文
│   ├── 📄 zh-CN.ts         # 简体中文
│   └── 📄 zh-TW.ts         # 繁体中文
└── 📁 modules/              # 国际化模块
    ├── 📄 auth.ts           # 认证相关翻译
    ├── 📄 common.ts         # 通用翻译
    ├── 📄 dashboard.ts      # 仪表盘翻译
    ├── 📄 router.ts         # 路由翻译
    └── 📄 user.ts           # 用户相关翻译
```

### 📁 src/mock/ - Mock 数据

**作用**: 提供开发环境的模拟数据

```
src/mock/
├── 📄 index.ts              # Mock 入口
├── 📄 mock-prod-server.ts   # 生产环境 Mock
├── 📄 mock-service.ts       # Mock 服务
├── 📄 types.ts              # Mock 类型
└── 📁 modules/              # Mock 模块
    ├── 📄 auth.ts           # 认证 Mock
    └── 📄 router.ts         # 路由 Mock
```

### 📁 src/router/ - 路由配置

**作用**: 管理应用路由

```
src/router/
├── 📄 index.ts              # 路由入口
├── 📁 modules/              # 路由模块
│   ├── 📄 core.ts           # 核心路由
│   ├── 📄 dashboard.ts      # 仪表盘路由
│   ├── 📄 error.ts          # 错误页面路由
│   └── 📄 example.ts        # 示例路由
└── 📁 utils/                # 路由工具
    ├── 📄 customs.ts        # 自定义路由守卫
    ├── 📄 helper.ts         # 路由辅助函数
    └── 📄 index.ts          # 路由工具统一导出
```

### 📁 src/stores/ - 状态管理

**作用**: 使用 Pinia 管理应用状态

```
src/stores/
├── 📄 index.ts              # 状态管理入口
└── 📁 modules/              # 状态模块
    ├── 📄 app.ts            # 应用状态
    ├── 📄 color.ts          # 颜色主题状态
    ├── 📄 layout.ts         # 布局状态
    ├── 📄 locale.ts         # 国际化状态
    ├── 📄 permission.ts     # 权限状态
    ├── 📄 postcss.ts        # PostCSS 状态
    ├── 📄 size.ts           # 尺寸状态
    └── 📄 user.ts           # 用户状态
```

**Store 示例**:

```typescript
// src/stores/modules/user.ts
import { defineStore } from "pinia";
import type { UserInfo } from "@/Types";

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

### 📁 src/Types/ - 类型定义

**作用**: 统一管理 TypeScript 类型定义

```
src/Types/
├── 📄 index.ts              # 类型统一导出
├── 📄 README.md             # 类型说明文档
└── 📁 modules/              # 类型模块
    ├── 📄 device.ts         # 设备相关类型
    ├── 📄 router.ts         # 路由相关类型
    ├── 📄 user.ts           # 用户相关类型
    ├── 📄 utils.ts          # 工具类型
    └── 📄 vue.ts            # Vue 相关类型
```

**类型示例**:

```typescript
// src/Types/modules/user.ts
export interface UserInfo {
  id: number;
  username: string;
  email: string;
  avatar?: string;
  role: UserRole;
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
}

export type UserRole = "admin" | "user" | "guest";
export type Permission = "read" | "write" | "delete" | "admin";

export interface LoginParams {
  username: string;
  password: string;
  remember?: boolean;
}

export interface LoginResult {
  token: string;
  userInfo: UserInfo;
}
```

### 📁 src/utils/ - 工具函数

**作用**: 存放各种工具函数

```
src/utils/
├── 📄 index.ts              # 工具函数统一导出
├── 📄 deviceInfo.ts         # 设备信息工具
├── 📄 env.ts                # 环境变量工具
├── 📄 http.ts               # HTTP 工具
├── 📄 moduleLoader.ts       # 模块加载器
├── 📄 remAdapter.ts         # rem 适配工具
└── 📁 http/                 # HTTP 相关工具
    ├── 📄 connection.ts     # 连接管理
    ├── 📄 examples.ts       # 使用示例
    ├── 📄 index.ts          # HTTP 入口
    ├── 📄 instance.ts       # 请求实例
    ├── 📄 interceptors.ts   # 拦截器
    ├── 📄 methods.ts        # 请求方法
    ├── 📄 types.ts          # HTTP 类型
    └── 📄 uploadManager.ts  # 上传管理
```

### 📁 src/views/ - 页面组件

**作用**: 存放页面级组件

```
src/views/
├── 📁 dashboard/            # 仪表盘页面
│   └── 📄 index.vue        # 仪表盘首页
├── 📁 example/              # 示例页面
│   ├── 📄 index.vue        # 示例首页
│   └── 📁 views/           # 示例子页面
│       ├── 📄 example-color.vue    # 颜色示例
│       ├── 📄 example-date.vue     # 日期示例
│       ├── 📄 example-i18n.vue     # 国际化示例
│       ├── 📄 example-rem.vue      # 响应式示例
│       └── 📄 example-size.vue     # 尺寸示例
├── 📁 login/                # 登录页面
│   └── 📄 index.vue        # 登录页面
├── 📁 notfound/             # 错误页面
│   ├── 📄 forbidden-page.vue       # 403 页面
│   ├── 📄 not-found-page.vue      # 404 页面
│   └── 📄 server-error-page.vue   # 500 页面
├── 📁 permission/           # 权限页面
│   ├── 📄 index.vue        # 权限首页
│   └── 📁 views/           # 权限子页面
│       ├── 📄 permission-button.vue # 按钮权限
│       └── 📄 permission-page.vue  # 页面权限
└── 📁 user/                 # 用户页面
    └── 📄 index.vue        # 用户首页
```

## 🔧 配置文件

### 📄 package.json - 项目配置

**作用**: 定义项目依赖和脚本

```json
{
  "name": "cc-admin",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "pnpm exec tsx scripts/dev-parallel.ts",
    "build": "vue-tsc --noEmit && vite build",
    "preview": "vite preview",
    "type-check": "vue-tsc --noEmit",
    "lint": "eslint . --fix",
    "format": "prettier --write src/"
  },
  "dependencies": {
    "vue": "^3.5.12",
    "vue-router": "^4.4.5",
    "pinia": "^3.0.3",
    "alova": "^3.3.3",
    "vue-i18n": "^10.0.8",
    "unocss": "^66.3.2"
  }
}
```

### 📄 vite.config.ts - Vite 配置

**作用**: 配置构建工具

```typescript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";

export default defineConfig({
  plugins: [vue(), UnoCSS()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
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

### 📄 uno.config.ts - UnoCSS 配置

**作用**: 配置原子化 CSS

```typescript
import { defineConfig } from "unocss";
import presetUno from "@unocss/preset-uno";
import presetIcons from "@unocss/preset-icons";

export default defineConfig({
  presets: [presetUno(), presetIcons()],
  shortcuts: {
    btn: "px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600",
  },
});
```

## 📁 特殊目录

### 📁 unocss/ - UnoCSS 配置

**作用**: 存放 UnoCSS 相关配置

```
unocss/
├── 📄 env.ts               # 环境配置
├── 📄 index.ts             # 主配置
├── 📄 theme.ts             # 主题配置
├── 📁 rules/              # 自定义规则
│   ├── 📄 pixelRules.ts   # 像素规则
│   └── 📄 themeRules.ts   # 主题规则
├── 📁 shortcuts/          # 快捷方式
│   ├── 📄 button.ts       # 按钮快捷方式
│   ├── 📄 index.ts        # 快捷方式入口
│   ├── 📄 layout.ts       # 布局快捷方式
│   └── 📄 text.ts         # 文本快捷方式
└── 📁 utils/              # 工具函数
    └── 📄 icons.ts        # 图标工具
```

### 📁 scripts/ - 构建脚本

**作用**: 存放各种构建和开发脚本

```
scripts/
├── 📄 README.md           # 脚本说明
├── 📄 dev-parallel.ts     # 并行开发环境
├── 📄 monitor.ts          # 代码监控
├── 📄 naming-rules.ts     # 命名规范检查
├── 📄 watch-naming.ts     # 命名规范监听
├── 📄 check-env.ts        # 环境检查
├── 📄 copyright-protection.ts # 版权保护
├── 📄 test-token.ts       # Token 测试
├── 📄 quick-search.ts     # 快速搜索
└── 📄 init.ts             # 项目初始化
```

### 📁 monitor_reports/ - 监控报告

**作用**: 存放代码监控报告

```
monitor_reports/
├── 📄 README.md           # 监控说明
├── 📄 config.md           # 监控配置
├── 📄 template.md         # 报告模板
├── 📄 cleanup.sh          # 清理脚本
└── 📁 latest/             # 最新报告
    ├── 📄 cc_admin_monitor_report.md # 监控报告
    ├── 📄 copyright_violations.txt   # 版权违规
    ├── 📄 structure_similarities.txt # 结构相似性
    └── 📄 techstack_matches.txt     # 技术栈匹配
```

## 🎯 目录命名规范

### 文件命名

- **组件文件**: 使用 PascalCase，如 `UserProfile.vue`
- **工具文件**: 使用 camelCase，如 `dateUtils.ts`
- **常量文件**: 使用 camelCase，如 `appConstants.ts`
- **类型文件**: 使用 camelCase，如 `userTypes.ts`

### 目录命名

- **功能目录**: 使用 camelCase，如 `userManagement/`
- **组件目录**: 使用 camelCase，如 `commonComponents/`
- **工具目录**: 使用 camelCase，如 `utilityFunctions/`

### 模块组织

- **按功能分组**: 相关功能放在同一目录
- **按类型分组**: 相同类型的文件放在同一目录
- **按层级分组**: 按组件层级组织目录结构

## 🔄 模块化原则

### 1. 单一职责

每个模块只负责一个特定的功能领域

### 2. 高内聚低耦合

模块内部功能紧密相关，模块间依赖最小化

### 3. 可复用性

通用功能抽象为可复用的模块

### 4. 可扩展性

模块设计支持功能扩展和定制

### 5. 可维护性

清晰的目录结构和命名规范便于维护

---

这种模块化的项目结构为 cc-admin 框架提供了良好的可维护性和可扩展性，是企业级项目开发的理想选择。
title: project-structure
date: 2025-08-04 16:20:00
permalink: /pages/b0fbff/
categories:

- guide
  tags:
- author:
  name: 文档作者
  link: https://github.com/your-username

---
