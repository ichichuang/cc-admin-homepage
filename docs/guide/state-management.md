---
title: state-management
date: 2025-08-04 16:28:30
permalink: /pages/f058d0/
categories:
  - guide
tags:
  -
author:
  name: 文档作者
  link: https://github.com/your-username
---

# 状态管理

cc-admin 框架使用 Pinia 作为状态管理库，提供类型安全、响应式的状态管理解决方案。

## 🎯 核心特性

### Pinia 优势

- **TypeScript 支持** - 完整的类型推导
- **Composition API** - 与 Vue 3 完美集成
- **开发工具** - 内置 Vue DevTools 支持
- **持久化** - 支持状态持久化
- **模块化** - 支持多个 store 模块

### 状态管理架构

- **集中管理** - 统一的状态管理入口
- **模块化设计** - 按功能划分 store 模块
- **类型安全** - 完整的 TypeScript 类型定义
- **响应式** - 基于 Vue 3 的响应式系统

## 📁 目录结构

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

## 🔧 核心配置

### stores/index.ts

```typescript
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// 创建 Pinia 实例并配置持久化插件
const store = createPinia();
store.use(piniaPluginPersistedstate);

// 导出默认store实例
export default store;

// 导出所有 Store 模块
export * from "./modules/app";
export * from "./modules/color";
export * from "./modules/layout";
export * from "./modules/permission";
export * from "./modules/postcss";
export * from "./modules/size";
export * from "./modules/user";

// 按需导出常用 Store，便于使用
export { useAppStore, useAppStoreWithOut } from "./modules/app";
export { useLayoutStore, useLayoutStoreWithOut } from "./modules/layout";
export { useLocaleStore, useLocaleStoreWithOut } from "./modules/locale";
export {
  usePermissionStore,
  usePermissionStoreWithOut,
} from "./modules/permission";
export { useUserStore, useUserStoreWithOut } from "./modules/user";
```

## 📦 Store 模块详解

### 应用状态 - stores/modules/app.ts

```typescript
import { defineStore } from "pinia";
import type { AppInfo } from "@/Types";

interface AppState {
  appInfo: AppInfo;
  loading: boolean;
  error: string | null;
  sidebarCollapsed: boolean;
  theme: "light" | "dark";
}

export const useAppStore = defineStore("app", {
  state: (): AppState => ({
    appInfo: {
      name: "cc-admin",
      version: "1.0.0",
      description: "企业级后台管理框架",
      author: "chichuang",
    },
    loading: false,
    error: null,
    sidebarCollapsed: false,
    theme: "light",
  }),

  getters: {
    // 获取应用信息
    getAppInfo: (state) => state.appInfo,

    // 获取加载状态
    getLoading: (state) => state.loading,

    // 获取错误信息
    getError: (state) => state.error,

    // 获取侧边栏状态
    getSidebarCollapsed: (state) => state.sidebarCollapsed,

    // 获取主题
    getTheme: (state) => state.theme,

    // 是否有错误
    hasError: (state) => !!state.error,
  },

  actions: {
    // 设置加载状态
    setLoading(loading: boolean) {
      this.loading = loading;
    },

    // 设置错误信息
    setError(error: string | null) {
      this.error = error;
    },

    // 清除错误
    clearError() {
      this.error = null;
    },

    // 切换侧边栏
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    },

    // 设置侧边栏状态
    setSidebarCollapsed(collapsed: boolean) {
      this.sidebarCollapsed = collapsed;
    },

    // 切换主题
    toggleTheme() {
      this.theme = this.theme === "light" ? "dark" : "light";
      // 更新 HTML 类名
      document.documentElement.classList.toggle("dark");
    },

    // 设置主题
    setTheme(theme: "light" | "dark") {
      this.theme = theme;
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },

    // 重置状态
    reset() {
      this.loading = false;
      this.error = null;
      this.sidebarCollapsed = false;
      this.theme = "light";
    },
  },

  persist: {
    key: "app-store",
    storage: localStorage,
    paths: ["sidebarCollapsed", "theme"],
  },
});

// 导出不带响应式的 store 实例
export const useAppStoreWithOut = () => {
  return useAppStore();
};
```

### 用户状态 - stores/modules/user.ts

```typescript
import { defineStore } from "pinia";
import type { UserInfo, LoginParams, LoginResult } from "@/Types";
import { userApi } from "@/api/modules/user";

interface UserState {
  userInfo: UserInfo | null;
  token: string | null;
  permissions: string[];
  roles: string[];
  isLoggedIn: boolean;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    userInfo: null,
    token: null,
    permissions: [],
    roles: [],
    isLoggedIn: false,
  }),

  getters: {
    // 获取用户信息
    getUserInfo: (state) => state.userInfo,

    // 获取令牌
    getToken: (state) => state.token,

    // 获取权限列表
    getPermissions: (state) => state.permissions,

    // 获取角色列表
    getRoles: (state) => state.roles,

    // 是否已登录
    getIsLoggedIn: (state) => state.isLoggedIn,

    // 检查是否有权限
    hasPermission: (state) => (permission: string) =>
      state.permissions.includes(permission),

    // 检查是否有角色
    hasRole: (state) => (role: string) => state.roles.includes(role),

    // 检查是否有任意权限
    hasAnyPermission: (state) => (permissions: string[]) =>
      permissions.some((permission) => state.permissions.includes(permission)),

    // 检查是否有任意角色
    hasAnyRole: (state) => (roles: string[]) =>
      roles.some((role) => state.roles.includes(role)),
  },

  actions: {
    // 用户登录
    async login(params: LoginParams) {
      try {
        const result = await userApi.login(params);
        this.setToken(result.token);
        this.setUserInfo(result.userInfo);
        this.setPermissions(result.userInfo.permissions);
        this.setRoles(result.userInfo.roles);
        this.setIsLoggedIn(true);
        return result;
      } catch (error) {
        throw error;
      }
    },

    // 用户登出
    async logout() {
      try {
        await userApi.logout();
        this.clearUserInfo();
      } catch (error) {
        console.error("登出失败:", error);
      } finally {
        this.clearUserInfo();
      }
    },

    // 获取用户信息
    async getUserInfo() {
      try {
        const userInfo = await userApi.getUserInfo();
        this.setUserInfo(userInfo);
        this.setPermissions(userInfo.permissions);
        this.setRoles(userInfo.roles);
        return userInfo;
      } catch (error) {
        throw error;
      }
    },

    // 设置用户信息
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo;
    },

    // 设置令牌
    setToken(token: string) {
      this.token = token;
    },

    // 设置权限
    setPermissions(permissions: string[]) {
      this.permissions = permissions;
    },

    // 设置角色
    setRoles(roles: string[]) {
      this.roles = roles;
    },

    // 设置登录状态
    setIsLoggedIn(isLoggedIn: boolean) {
      this.isLoggedIn = isLoggedIn;
    },

    // 清除用户信息
    clearUserInfo() {
      this.userInfo = null;
      this.token = null;
      this.permissions = [];
      this.roles = [];
      this.isLoggedIn = false;
    },

    // 更新用户信息
    updateUserInfo(userInfo: Partial<UserInfo>) {
      if (this.userInfo) {
        this.userInfo = { ...this.userInfo, ...userInfo };
      }
    },
  },

  persist: {
    key: "user-store",
    storage: localStorage,
    paths: ["token", "userInfo", "permissions", "roles", "isLoggedIn"],
  },
});

// 导出不带响应式的 store 实例
export const useUserStoreWithOut = () => {
  return useUserStore();
};
```

### 布局状态 - stores/modules/layout.ts

```typescript
import { defineStore } from "pinia";
import type { LayoutMode, LayoutConfig } from "@/Types";

interface LayoutState {
  currentLayout: LayoutMode;
  layoutConfig: LayoutConfig;
  sidebarWidth: number;
  headerHeight: number;
  footerHeight: number;
  contentPadding: number;
}

export const useLayoutStore = defineStore("layout", {
  state: (): LayoutState => ({
    currentLayout: "admin",
    layoutConfig: {
      showHeader: true,
      showSidebar: true,
      showFooter: true,
      showBreadcrumb: true,
      showTabs: true,
      fixedHeader: true,
      fixedSidebar: true,
      collapsedSidebar: false,
    },
    sidebarWidth: 240,
    headerHeight: 64,
    footerHeight: 48,
    contentPadding: 24,
  }),

  getters: {
    // 获取当前布局
    getCurrentLayout: (state) => state.currentLayout,

    // 获取布局配置
    getLayoutConfig: (state) => state.layoutConfig,

    // 获取侧边栏宽度
    getSidebarWidth: (state) => state.sidebarWidth,

    // 获取头部高度
    getHeaderHeight: (state) => state.headerHeight,

    // 获取底部高度
    getFooterHeight: (state) => state.footerHeight,

    // 获取内容内边距
    getContentPadding: (state) => state.contentPadding,

    // 是否显示头部
    showHeader: (state) => state.layoutConfig.showHeader,

    // 是否显示侧边栏
    showSidebar: (state) => state.layoutConfig.showSidebar,

    // 是否显示底部
    showFooter: (state) => state.layoutConfig.showFooter,

    // 是否显示面包屑
    showBreadcrumb: (state) => state.layoutConfig.showBreadcrumb,

    // 是否显示标签页
    showTabs: (state) => state.layoutConfig.showTabs,

    // 是否固定头部
    fixedHeader: (state) => state.layoutConfig.fixedHeader,

    // 是否固定侧边栏
    fixedSidebar: (state) => state.layoutConfig.fixedSidebar,

    // 是否折叠侧边栏
    collapsedSidebar: (state) => state.layoutConfig.collapsedSidebar,
  },

  actions: {
    // 设置当前布局
    setCurrentLayout(layout: LayoutMode) {
      this.currentLayout = layout;
    },

    // 设置布局配置
    setLayoutConfig(config: Partial<LayoutConfig>) {
      this.layoutConfig = { ...this.layoutConfig, ...config };
    },

    // 设置侧边栏宽度
    setSidebarWidth(width: number) {
      this.sidebarWidth = width;
    },

    // 设置头部高度
    setHeaderHeight(height: number) {
      this.headerHeight = height;
    },

    // 设置底部高度
    setFooterHeight(height: number) {
      this.footerHeight = height;
    },

    // 设置内容内边距
    setContentPadding(padding: number) {
      this.contentPadding = padding;
    },

    // 切换侧边栏折叠状态
    toggleSidebarCollapsed() {
      this.layoutConfig.collapsedSidebar = !this.layoutConfig.collapsedSidebar;
    },

    // 设置侧边栏折叠状态
    setSidebarCollapsed(collapsed: boolean) {
      this.layoutConfig.collapsedSidebar = collapsed;
    },

    // 重置布局配置
    resetLayoutConfig() {
      this.layoutConfig = {
        showHeader: true,
        showSidebar: true,
        showFooter: true,
        showBreadcrumb: true,
        showTabs: true,
        fixedHeader: true,
        fixedSidebar: true,
        collapsedSidebar: false,
      };
    },
  },

  persist: {
    key: "layout-store",
    storage: localStorage,
    paths: [
      "currentLayout",
      "layoutConfig",
      "sidebarWidth",
      "headerHeight",
      "footerHeight",
      "contentPadding",
    ],
  },
});

// 导出不带响应式的 store 实例
export const useLayoutStoreWithOut = () => {
  return useLayoutStore();
};
```

### 权限状态 - stores/modules/permission.ts

```typescript
import { defineStore } from "pinia";
import type { RouteConfig, Permission } from "@/Types";

interface PermissionState {
  routes: RouteConfig[];
  dynamicRoutes: RouteConfig[];
  permissions: Permission[];
  roles: string[];
  menuPermissions: string[];
  buttonPermissions: string[];
}

export const usePermissionStore = defineStore("permission", {
  state: (): PermissionState => ({
    routes: [],
    dynamicRoutes: [],
    permissions: [],
    roles: [],
    menuPermissions: [],
    buttonPermissions: [],
  }),

  getters: {
    // 获取所有路由
    getRoutes: (state) => state.routes,

    // 获取动态路由
    getDynamicRoutes: (state) => state.dynamicRoutes,

    // 获取权限列表
    getPermissions: (state) => state.permissions,

    // 获取角色列表
    getRoles: (state) => state.roles,

    // 获取菜单权限
    getMenuPermissions: (state) => state.menuPermissions,

    // 获取按钮权限
    getButtonPermissions: (state) => state.buttonPermissions,

    // 检查路由权限
    hasRoutePermission: (state) => (route: RouteConfig) => {
      if (!route.meta?.roles && !route.meta?.auths) {
        return true;
      }

      const hasRole =
        !route.meta?.roles ||
        route.meta.roles.some((role) => state.roles.includes(role));

      const hasAuth =
        !route.meta?.auths ||
        route.meta.auths.some((auth) => state.permissions.includes(auth));

      return hasRole && hasAuth;
    },

    // 检查菜单权限
    hasMenuPermission: (state) => (menuKey: string) =>
      state.menuPermissions.includes(menuKey),

    // 检查按钮权限
    hasButtonPermission: (state) => (buttonKey: string) =>
      state.buttonPermissions.includes(buttonKey),
  },

  actions: {
    // 设置路由
    setRoutes(routes: RouteConfig[]) {
      this.routes = routes;
    },

    // 设置动态路由
    setDynamicRoutes(routes: RouteConfig[]) {
      this.dynamicRoutes = routes;
    },

    // 添加路由
    addRoute(route: RouteConfig) {
      this.routes.push(route);
    },

    // 添加动态路由
    addDynamicRoute(route: RouteConfig) {
      this.dynamicRoutes.push(route);
    },

    // 设置权限
    setPermissions(permissions: Permission[]) {
      this.permissions = permissions;
      // 分离菜单权限和按钮权限
      this.menuPermissions = permissions
        .filter((p) => p.type === "menu")
        .map((p) => p.key);
      this.buttonPermissions = permissions
        .filter((p) => p.type === "button")
        .map((p) => p.key);
    },

    // 设置角色
    setRoles(roles: string[]) {
      this.roles = roles;
    },

    // 检查权限
    hasPermission(permission: string) {
      return this.permissions.includes(permission);
    },

    // 检查角色
    hasRole(role: string) {
      return this.roles.includes(role);
    },

    // 检查任意权限
    hasAnyPermission(permissions: string[]) {
      return permissions.some((permission) =>
        this.permissions.includes(permission)
      );
    },

    // 检查任意角色
    hasAnyRole(roles: string[]) {
      return roles.some((role) => this.roles.includes(role));
    },

    // 清除权限
    clearPermissions() {
      this.routes = [];
      this.dynamicRoutes = [];
      this.permissions = [];
      this.roles = [];
      this.menuPermissions = [];
      this.buttonPermissions = [];
    },
  },

  persist: {
    key: "permission-store",
    storage: localStorage,
    paths: [
      "routes",
      "dynamicRoutes",
      "permissions",
      "roles",
      "menuPermissions",
      "buttonPermissions",
    ],
  },
});

// 导出不带响应式的 store 实例
export const usePermissionStoreWithOut = () => {
  return usePermissionStore();
};
```

## 🔧 使用示例

### 在组件中使用

```vue
<template>
  <div class="user-profile">
    <!-- 用户信息 -->
    <div v-if="userInfo" class="user-info">
      <img :src="userInfo.avatar" :alt="userInfo.username" class="avatar" />
      <div class="info">
        <h3>{{ userInfo.username }}</h3>
        <p>{{ userInfo.email }}</p>
        <p>角色: {{ userInfo.role }}</p>
      </div>
    </div>

    <!-- 权限检查 -->
    <div v-if="hasPermission('user:edit')" class="actions">
      <button @click="editUser" class="btn btn-primary">编辑用户</button>
    </div>

    <!-- 主题切换 -->
    <button @click="toggleTheme" class="btn btn-secondary">
      {{ theme === "light" ? "深色模式" : "浅色模式" }}
    </button>

    <!-- 侧边栏控制 -->
    <button @click="toggleSidebar" class="btn btn-outline">
      {{ sidebarCollapsed ? "展开" : "折叠" }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useUserStore, useAppStore, useLayoutStore } from "@/stores";

// 获取 store 实例
const userStore = useUserStore();
const appStore = useAppStore();
const layoutStore = useLayoutStore();

// 计算属性
const userInfo = computed(() => userStore.getUserInfo);
const hasPermission = computed(() => userStore.hasPermission);
const theme = computed(() => appStore.getTheme);
const sidebarCollapsed = computed(() => layoutStore.collapsedSidebar);

// 方法
const editUser = () => {
  // 编辑用户逻辑
  console.log("编辑用户");
};

const toggleTheme = () => {
  appStore.toggleTheme();
};

const toggleSidebar = () => {
  layoutStore.toggleSidebarCollapsed();
};
</script>
```

### 在组合式函数中使用

```typescript
// hooks/useAuth.ts
import { computed } from "vue";
import { useUserStore, usePermissionStore } from "@/stores";

export function useAuth() {
  const userStore = useUserStore();
  const permissionStore = usePermissionStore();

  // 用户状态
  const isLoggedIn = computed(() => userStore.getIsLoggedIn);
  const userInfo = computed(() => userStore.getUserInfo);
  const token = computed(() => userStore.getToken);

  // 权限检查
  const hasPermission = (permission: string) => {
    return userStore.hasPermission(permission);
  };

  const hasRole = (role: string) => {
    return userStore.hasRole(role);
  };

  const hasRoutePermission = (route: RouteConfig) => {
    return permissionStore.hasRoutePermission(route);
  };

  // 登录方法
  const login = async (params: LoginParams) => {
    return await userStore.login(params);
  };

  // 登出方法
  const logout = async () => {
    return await userStore.logout();
  };

  return {
    // 状态
    isLoggedIn,
    userInfo,
    token,

    // 方法
    hasPermission,
    hasRole,
    hasRoutePermission,
    login,
    logout,
  };
}
```

### 在路由守卫中使用

```typescript
// router/guards/auth.ts
import { useUserStore, usePermissionStore } from "@/stores";
import type { RouteLocationNormalized } from "vue-router";

export async function authGuard(to: RouteLocationNormalized) {
  const userStore = useUserStore();
  const permissionStore = usePermissionStore();

  // 检查是否已登录
  if (!userStore.getIsLoggedIn) {
    return { name: "Login" };
  }

  // 检查路由权限
  if (to.meta?.roles || to.meta?.auths) {
    const hasPermission = permissionStore.hasRoutePermission(to as RouteConfig);
    if (!hasPermission) {
      return { name: "Forbidden" };
    }
  }

  return true;
}
```

## 🔄 持久化配置

### 持久化策略

```typescript
// 持久化配置示例
persist: {
  key: 'store-key',           // 存储键名
  storage: localStorage,       // 存储方式
  paths: ['key1', 'key2'],    // 需要持久化的字段
  serializer: {                // 序列化配置
    serialize: JSON.stringify,
    deserialize: JSON.parse
  }
}
```

### 存储方式

```typescript
// localStorage - 本地存储
persist: {
  storage: localStorage
}

// sessionStorage - 会话存储
persist: {
  storage: sessionStorage
}

// 自定义存储
persist: {
  storage: {
    getItem: (key: string) => {
      return localStorage.getItem(key)
    },
    setItem: (key: string, value: string) => {
      localStorage.setItem(key, value)
    },
    removeItem: (key: string) => {
      localStorage.removeItem(key)
    }
  }
}
```

## 🎯 最佳实践

### 1. 状态设计原则

```typescript
// ✅ 好的状态设计
interface UserState {
  userInfo: UserInfo | null;
  token: string | null;
  permissions: string[];
  isLoggedIn: boolean;
}

// ❌ 避免的状态设计
interface UserState {
  // 避免存储计算得出的值
  fullName: string;
  displayName: string;
  // 避免存储可以计算的状态
  hasAdminPermission: boolean;
}
```

### 2. 异步操作处理

```typescript
// 在 store 中处理异步操作
export const useUserStore = defineStore("user", {
  state: () => ({
    loading: false,
    error: null,
  }),

  actions: {
    async login(params: LoginParams) {
      this.loading = true;
      this.error = null;

      try {
        const result = await userApi.login(params);
        this.setUserInfo(result.userInfo);
        this.setToken(result.token);
        return result;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
```

### 3. 模块化设计

```typescript
// 按功能模块划分 store
// stores/modules/user.ts - 用户相关状态
// stores/modules/app.ts - 应用相关状态
// stores/modules/layout.ts - 布局相关状态
// stores/modules/permission.ts - 权限相关状态
```

### 4. 类型安全

```typescript
// 定义完整的类型
interface UserState {
  userInfo: UserInfo | null
  token: string | null
  permissions: Permission[]
  roles: UserRole[]
  isLoggedIn: boolean
}

// 使用类型安全的 actions
actions: {
  setUserInfo(userInfo: UserInfo) {
    this.userInfo = userInfo
  },

  hasPermission(permission: Permission): boolean {
    return this.permissions.includes(permission)
  }
}
```

---

这套状态管理方案为 cc-admin 框架提供了强大、类型安全的状态管理能力，支持复杂的企业级应用需求。
title: state-management
date: 2025-08-04 16:28:30
permalink: /pages/9b038a/
categories:

- guide
  tags:
- author:
  name: 文档作者
  link: https://github.com/your-username

---
