---
title: router
date: 2025-08-04 16:32:38
permalink: /pages/699151/
categories:
  - guide
tags:
  -
author:
  name: 文档作者
  link: https://github.com/your-username
---

# 路由系统

cc-admin 框架使用 Vue Router 4 作为路由管理器，提供强大的路由功能和权限控制。

## 🎯 核心特性

### Vue Router 4 优势

- **TypeScript 支持** - 完整的类型推导
- **动态路由** - 支持后端动态路由配置
- **路由守卫** - 完整的路由权限控制
- **懒加载** - 支持路由级别的代码分割
- **嵌套路由** - 支持复杂的路由嵌套

### 路由系统架构

- **模块化设计** - 按功能划分路由模块
- **权限控制** - 基于角色的路由权限
- **动态加载** - 支持动态路由加载
- **类型安全** - 完整的 TypeScript 类型定义

## 📁 目录结构

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

## 🔧 核心配置

### router/index.ts

```typescript
import {
  createDynamicRouteManager,
  createRouteUtils,
  sortRoutes,
} from "@/router/utils";
import { registerRouterGuards } from "@/router/utils/customs";
import { env } from "@/utils/env";
import { autoImportModulesSync } from "@/utils/moduleLoader";
import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import { initDynamicRoutes } from "./utils/helper";

// 自动导入所有路由模块
const routeModules = import.meta.glob("./modules/**/*.ts", { eager: true });
const importedRoutes = autoImportModulesSync<RouteConfig[]>(routeModules);

// 将所有路由模块合并为一个数组并排序
const staticRoutes: RouteConfig[] = (
  Object.values(importedRoutes).flat() as any[]
).filter((r): r is RouteConfig => r && typeof r.path === "string");
const sortedStaticRoutes = sortRoutes(staticRoutes);

// 创建路由工具集（用于菜单渲染、面包屑等）
export const routeUtils = createRouteUtils(sortedStaticRoutes);

// 添加根路径重定向
const rootRedirect: RouteConfig = {
  path: "/",
  name: "RootRedirect",
  redirect: env.rootRedirect,
};

// 合并所有静态路由（包括根重定向）
const allStaticRoutesWithRedirect = [rootRedirect, ...sortedStaticRoutes];

// 转换为 Vue Router 兼容格式
const initialRoutes: RouteRecordRaw[] = allStaticRoutesWithRedirect.map(
  (route) => route as RouteRecordRaw
);

// 创建路由实例
const router = createRouter({
  // history 模式
  history: createWebHistory(env.publicPath),
  routes: initialRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// 创建动态路由管理器
export const dynamicRouteManager = createDynamicRouteManager(router);

// 注册路由守卫
registerRouterGuards(router, {
  initDynamicRoutes,
  sortedStaticRoutes,
  isDebug: env.debug,
});

// 导出路由配置供其他地方使用
export { initialRoutes as routes, sortedStaticRoutes as staticRoutes };

// 按需导出常用路由工具，便于使用
export { registerRouterGuards } from "./utils/customs";
export { initDynamicRoutes } from "./utils/helper";

export default router;
```

## 📦 路由模块详解

### 核心路由 - router/modules/core.ts

```typescript
import type { RouteConfig } from "@/Types";

export const coreRoutes: RouteConfig[] = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
      layout: "fullscreen",
      requiresAuth: false,
      hideInMenu: true,
    },
  },
  {
    path: "/",
    name: "Root",
    redirect: "/dashboard",
    meta: {
      hideInMenu: true,
    },
  },
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
  },
  {
    path: "/user",
    name: "User",
    component: () => import("@/views/user/index.vue"),
    meta: {
      title: "用户管理",
      icon: "user",
      roles: ["admin"],
      auths: ["user:read"],
    },
    children: [
      {
        path: "list",
        name: "UserList",
        component: () => import("@/views/user/list.vue"),
        meta: {
          title: "用户列表",
          roles: ["admin"],
          auths: ["user:read"],
        },
      },
      {
        path: "profile",
        name: "UserProfile",
        component: () => import("@/views/user/profile.vue"),
        meta: {
          title: "个人资料",
          roles: ["admin", "user"],
          auths: ["user:read"],
        },
      },
    ],
  },
];
```

### 仪表盘路由 - router/modules/dashboard.ts

```typescript
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
          auths: ["dashboard:read"],
        },
      },
      {
        path: "analytics",
        name: "DashboardAnalytics",
        component: () => import("@/views/dashboard/analytics.vue"),
        meta: {
          title: "数据分析",
          roles: ["admin"],
          auths: ["dashboard:analytics"],
        },
      },
      {
        path: "reports",
        name: "DashboardReports",
        component: () => import("@/views/dashboard/reports.vue"),
        meta: {
          title: "报表",
          roles: ["admin"],
          auths: ["dashboard:reports"],
        },
      },
    ],
  },
];
```

### 错误页面路由 - router/modules/error.ts

```typescript
import type { RouteConfig } from "@/Types";

export const errorRoutes: RouteConfig[] = [
  {
    path: "/403",
    name: "Forbidden",
    component: () => import("@/views/notfound/forbidden-page.vue"),
    meta: {
      title: "403 禁止访问",
      layout: "fullscreen",
      hideInMenu: true,
    },
  },
  {
    path: "/404",
    name: "NotFound",
    component: () => import("@/views/notfound/not-found-page.vue"),
    meta: {
      title: "404 页面未找到",
      layout: "fullscreen",
      hideInMenu: true,
    },
  },
  {
    path: "/500",
    name: "ServerError",
    component: () => import("@/views/notfound/server-error-page.vue"),
    meta: {
      title: "500 服务器错误",
      layout: "fullscreen",
      hideInMenu: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    redirect: "/404",
  },
];
```

### 示例路由 - router/modules/example.ts

```typescript
import type { RouteConfig } from "@/Types";

export const exampleRoutes: RouteConfig[] = [
  {
    path: "/example",
    name: "Example",
    component: () => import("@/views/example/index.vue"),
    meta: {
      title: "示例页面",
      icon: "example",
      roles: ["admin", "user"],
      auths: ["example:read"],
    },
    children: [
      {
        path: "color",
        name: "ExampleColor",
        component: () => import("@/views/example/views/example-color.vue"),
        meta: {
          title: "颜色示例",
          roles: ["admin", "user"],
        },
      },
      {
        path: "date",
        name: "ExampleDate",
        component: () => import("@/views/example/views/example-date.vue"),
        meta: {
          title: "日期示例",
          roles: ["admin", "user"],
        },
      },
      {
        path: "i18n",
        name: "ExampleI18n",
        component: () => import("@/views/example/views/example-i18n.vue"),
        meta: {
          title: "国际化示例",
          roles: ["admin", "user"],
        },
      },
      {
        path: "rem",
        name: "ExampleRem",
        component: () => import("@/views/example/views/example-rem.vue"),
        meta: {
          title: "响应式示例",
          roles: ["admin", "user"],
        },
      },
      {
        path: "size",
        name: "ExampleSize",
        component: () => import("@/views/example/views/example-size.vue"),
        meta: {
          title: "尺寸示例",
          roles: ["admin", "user"],
        },
      },
    ],
  },
];
```

## 🔧 路由工具

### 路由工具集 - router/utils/index.ts

```typescript
import type { RouteConfig, RouteUtils } from "@/Types";

// 创建路由工具集
export function createRouteUtils(routes: RouteConfig[]): RouteUtils {
  // 获取所有路由
  const getAllRoutes = () => routes;

  // 获取菜单路由
  const getMenuRoutes = () => {
    return routes.filter((route) => !route.meta?.hideInMenu);
  };

  // 根据权限过滤路由
  const filterRoutesByPermission = (
    userRoles: string[],
    userPermissions: string[]
  ) => {
    return routes.filter((route) => {
      // 检查角色权限
      if (route.meta?.roles) {
        const hasRole = route.meta.roles.some((role) =>
          userRoles.includes(role)
        );
        if (!hasRole) return false;
      }

      // 检查功能权限
      if (route.meta?.auths) {
        const hasAuth = route.meta.auths.some((auth) =>
          userPermissions.includes(auth)
        );
        if (!hasAuth) return false;
      }

      return true;
    });
  };

  // 根据路径查找路由
  const findRouteByPath = (path: string): RouteConfig | undefined => {
    return routes.find((route) => route.path === path);
  };

  // 根据名称查找路由
  const findRouteByName = (name: string): RouteConfig | undefined => {
    return routes.find((route) => route.name === name);
  };

  // 获取面包屑
  const getBreadcrumbs = (path: string): RouteConfig[] => {
    const breadcrumbs: RouteConfig[] = [];
    const pathSegments = path.split("/").filter(Boolean);

    let currentPath = "";
    for (const segment of pathSegments) {
      currentPath += `/${segment}`;
      const route = findRouteByPath(currentPath);
      if (route) {
        breadcrumbs.push(route);
      }
    }

    return breadcrumbs;
  };

  // 获取父路由
  const getParentRoute = (route: RouteConfig): RouteConfig | undefined => {
    const pathSegments = route.path.split("/").filter(Boolean);
    if (pathSegments.length <= 1) return undefined;

    const parentPath = "/" + pathSegments.slice(0, -1).join("/");
    return findRouteByPath(parentPath);
  };

  // 获取子路由
  const getChildRoutes = (route: RouteConfig): RouteConfig[] => {
    return routes.filter((r) => {
      if (r.path === route.path) return false;
      return r.path.startsWith(route.path + "/");
    });
  };

  return {
    getAllRoutes,
    getMenuRoutes,
    filterRoutesByPermission,
    findRouteByPath,
    findRouteByName,
    getBreadcrumbs,
    getParentRoute,
    getChildRoutes,
  };
}

// 排序路由
export function sortRoutes(routes: RouteConfig[]): RouteConfig[] {
  return routes.sort((a, b) => {
    const orderA = a.meta?.order || 0;
    const orderB = b.meta?.order || 0;
    return orderA - orderB;
  });
}
```

### 动态路由管理器 - router/utils/helper.ts

```typescript
import type { RouteConfig, DynamicRouteManager } from "@/Types";
import type { Router } from "vue-router";

// 创建动态路由管理器
export function createDynamicRouteManager(router: Router): DynamicRouteManager {
  // 添加动态路由
  const addDynamicRoutes = (routes: RouteConfig[]) => {
    routes.forEach((route) => {
      router.addRoute(route as any);
    });
  };

  // 移除动态路由
  const removeDynamicRoutes = (routeNames: string[]) => {
    routeNames.forEach((name) => {
      const route = router.getRoutes().find((r) => r.name === name);
      if (route) {
        router.removeRoute(name);
      }
    });
  };

  // 重置动态路由
  const resetDynamicRoutes = () => {
    const routes = router.getRoutes();
    routes.forEach((route) => {
      if (route.name && !route.name.toString().startsWith("static-")) {
        router.removeRoute(route.name);
      }
    });
  };

  // 获取动态路由
  const getDynamicRoutes = () => {
    return router
      .getRoutes()
      .filter(
        (route) => route.name && !route.name.toString().startsWith("static-")
      );
  };

  return {
    addDynamicRoutes,
    removeDynamicRoutes,
    resetDynamicRoutes,
    getDynamicRoutes,
  };
}

// 初始化动态路由
export async function initDynamicRoutes() {
  // 这里可以从后端获取动态路由配置
  const dynamicRoutes: RouteConfig[] = [
    {
      path: "/dynamic",
      name: "Dynamic",
      component: () => import("@/views/dynamic/index.vue"),
      meta: {
        title: "动态页面",
        icon: "dynamic",
        roles: ["admin"],
        auths: ["dynamic:read"],
      },
    },
  ];

  return dynamicRoutes;
}
```

### 路由守卫 - router/utils/customs.ts

```typescript
import type { Router } from "vue-router";
import type { RouteConfig } from "@/Types";
import { useUserStore, usePermissionStore } from "@/stores";

interface RouterGuardOptions {
  initDynamicRoutes: () => Promise<RouteConfig[]>;
  sortedStaticRoutes: RouteConfig[];
  isDebug: boolean;
}

// 注册路由守卫
export function registerRouterGuards(
  router: Router,
  options: RouterGuardOptions
) {
  const { initDynamicRoutes, sortedStaticRoutes, isDebug } = options;

  // 全局前置守卫
  router.beforeEach(async (to, from, next) => {
    if (isDebug) {
      console.log("路由跳转:", { from: from.path, to: to.path });
    }

    const userStore = useUserStore();
    const permissionStore = usePermissionStore();

    // 检查是否需要认证
    if (to.meta?.requiresAuth !== false) {
      // 检查是否已登录
      if (!userStore.getIsLoggedIn) {
        next({ name: "Login", query: { redirect: to.fullPath } });
        return;
      }

      // 检查路由权限
      if (to.meta?.roles || to.meta?.auths) {
        const hasPermission = permissionStore.hasRoutePermission(
          to as RouteConfig
        );
        if (!hasPermission) {
          next({ name: "Forbidden" });
          return;
        }
      }
    }

    // 初始化动态路由（如果需要）
    if (to.meta?.requiresDynamicRoutes) {
      try {
        const dynamicRoutes = await initDynamicRoutes();
        permissionStore.setDynamicRoutes(dynamicRoutes);

        // 添加动态路由到路由器
        dynamicRoutes.forEach((route) => {
          router.addRoute(route as any);
        });

        // 重新导航到目标路由
        next({ ...to, replace: true });
        return;
      } catch (error) {
        console.error("初始化动态路由失败:", error);
        next({ name: "ServerError" });
        return;
      }
    }

    next();
  });

  // 全局后置钩子
  router.afterEach((to) => {
    // 设置页面标题
    if (to.meta?.title) {
      document.title = `${to.meta.title} - cc-admin`;
    }

    // 滚动到顶部
    window.scrollTo(0, 0);
  });

  // 路由错误处理
  router.onError((error) => {
    console.error("路由错误:", error);

    // 如果是组件加载失败，跳转到错误页面
    if (error.message.includes("Loading chunk")) {
      router.push({ name: "ServerError" });
    }
  });
}
```

## 🔧 使用示例

### 在组件中使用路由

```vue
<template>
  <div class="navigation">
    <!-- 路由链接 -->
    <router-link to="/dashboard" class="nav-link"> 仪表盘 </router-link>

    <router-link to="/user/list" class="nav-link"> 用户列表 </router-link>

    <!-- 编程式导航 -->
    <button @click="goToUserProfile" class="btn">个人资料</button>

    <!-- 带参数的导航 -->
    <button @click="goToUserDetail(123)" class="btn">用户详情</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

// 编程式导航
const goToUserProfile = () => {
  router.push({ name: "UserProfile" });
};

const goToUserDetail = (userId: number) => {
  router.push({
    name: "UserDetail",
    params: { id: userId.toString() },
  });
};

// 获取当前路由信息
console.log("当前路由:", route.path);
console.log("路由参数:", route.params);
console.log("查询参数:", route.query);
</script>
```

### 在组合式函数中使用路由

```typescript
// hooks/useRouter.ts
import { useRouter, useRoute } from "vue-router";
import type { RouteLocationRaw } from "vue-router";

export function useRouterUtils() {
  const router = useRouter();
  const route = useRoute();

  // 导航方法
  const navigate = (to: RouteLocationRaw) => {
    return router.push(to);
  };

  const navigateReplace = (to: RouteLocationRaw) => {
    return router.replace(to);
  };

  const goBack = () => {
    return router.back();
  };

  const goForward = () => {
    return router.forward();
  };

  // 获取路由信息
  const getCurrentRoute = () => route;

  const getRouteParams = () => route.params;

  const getRouteQuery = () => route.query;

  const getRouteMeta = () => route.meta;

  // 检查路由
  const isRoute = (name: string) => route.name === name;

  const isRoutePath = (path: string) => route.path === path;

  return {
    // 导航方法
    navigate,
    navigateReplace,
    goBack,
    goForward,

    // 获取信息
    getCurrentRoute,
    getRouteParams,
    getRouteQuery,
    getRouteMeta,

    // 检查方法
    isRoute,
    isRoutePath,
  };
}
```

### 权限路由组件

```vue
<template>
  <div>
    <!-- 基于角色的显示 -->
    <div v-if="hasRole('admin')" class="admin-section">
      <h3>管理员功能</h3>
      <button @click="adminAction">管理员操作</button>
    </div>

    <!-- 基于权限的显示 -->
    <div v-if="hasPermission('user:edit')" class="edit-section">
      <button @click="editUser">编辑用户</button>
    </div>

    <!-- 基于路由权限的显示 -->
    <div v-if="canAccessRoute('/admin/settings')" class="settings-section">
      <router-link to="/admin/settings">系统设置</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useUserStore, usePermissionStore } from "@/stores";
import { routeUtils } from "@/router";

const userStore = useUserStore();
const permissionStore = usePermissionStore();

// 权限检查
const hasRole = (role: string) => {
  return userStore.hasRole(role);
};

const hasPermission = (permission: string) => {
  return userStore.hasPermission(permission);
};

const canAccessRoute = (path: string) => {
  const route = routeUtils.findRouteByPath(path);
  if (!route) return false;

  return permissionStore.hasRoutePermission(route);
};

// 方法
const adminAction = () => {
  console.log("管理员操作");
};

const editUser = () => {
  console.log("编辑用户");
};
</script>
```

## 🎯 最佳实践

### 1. 路由命名规范

```typescript
// ✅ 好的路由命名
{
  path: '/user',
  name: 'User',
  children: [
    {
      path: 'list',
      name: 'UserList'
    },
    {
      path: 'detail/:id',
      name: 'UserDetail'
    }
  ]
}

// ❌ 避免的路由命名
{
  path: '/user',
  name: 'user', // 使用小写
  children: [
    {
      path: 'list',
      name: 'list' // 名称冲突
    }
  ]
}
```

### 2. 路由元信息设计

```typescript
// 完整的路由元信息
meta: {
  title: '用户管理',           // 页面标题
  icon: 'user',              // 菜单图标
  roles: ['admin', 'user'],  // 允许的角色
  auths: ['user:read'],      // 需要的权限
  layout: 'admin',           // 布局模式
  hideInMenu: false,         // 是否在菜单中隐藏
  keepAlive: true,           // 是否缓存
  requiresAuth: true,        // 是否需要认证
  order: 1                  // 排序
}
```

### 3. 动态路由处理

```typescript
// 动态路由加载
export async function loadDynamicRoutes() {
  try {
    const response = await api.getRoutes();
    const dynamicRoutes = response.data.map((route) => ({
      path: route.path,
      name: route.name,
      component: () => import(`@/views/${route.component}.vue`),
      meta: {
        title: route.title,
        icon: route.icon,
        roles: route.roles,
        auths: route.auths,
      },
    }));

    return dynamicRoutes;
  } catch (error) {
    console.error("加载动态路由失败:", error);
    return [];
  }
}
```

### 4. 路由懒加载

```typescript
// 路由懒加载
const routes: RouteConfig[] = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/dashboard/index.vue"),
    meta: {
      title: "仪表盘",
    },
  },
  {
    path: "/user",
    name: "User",
    component: () => import("@/views/user/index.vue"),
    meta: {
      title: "用户管理",
    },
  },
];
```

### 5. 路由守卫优化

```typescript
// 优化的路由守卫
router.beforeEach(async (to, from, next) => {
  // 1. 白名单检查
  const whiteList = ["/login", "/register", "/forgot-password"];
  if (whiteList.includes(to.path)) {
    next();
    return;
  }

  // 2. 认证检查
  const userStore = useUserStore();
  if (!userStore.getIsLoggedIn) {
    next({ name: "Login", query: { redirect: to.fullPath } });
    return;
  }

  // 3. 权限检查
  const permissionStore = usePermissionStore();
  if (to.meta?.roles || to.meta?.auths) {
    const hasPermission = permissionStore.hasRoutePermission(to as RouteConfig);
    if (!hasPermission) {
      next({ name: "Forbidden" });
      return;
    }
  }

  // 4. 动态路由检查
  if (to.meta?.requiresDynamicRoutes) {
    await loadDynamicRoutes();
    next({ ...to, replace: true });
    return;
  }

  next();
});
```

---

这套路由系统为 cc-admin 框架提供了强大、灵活的路由管理能力，支持复杂的企业级应用需求。
