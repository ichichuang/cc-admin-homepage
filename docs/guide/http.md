---
title: http
date: 2025-08-04 16:38:48
permalink: /pages/0fec99/
categories:
  - guide
tags:
  -
author:
  name: 文档作者
  link: https://github.com/your-username
---

# HTTP 请求

cc-admin 框架使用 Alova 作为 HTTP 请求库，提供强大的请求管理能力和类型安全。

## 🎯 核心特性

### Alova 优势

- **请求策略** - 支持缓存、重试、预加载等策略
- **类型安全** - 完整的 TypeScript 支持
- **请求拦截** - 支持请求和响应拦截
- **文件上传** - 内置文件上传管理
- **连接管理** - 智能的网络连接管理

## 📁 目录结构

```
src/utils/http/
├── 📄 index.ts              # HTTP 统一导出
├── 📄 instance.ts           # 请求实例
├── 📄 methods.ts            # 请求方法
├── 📄 types.ts              # HTTP 类型
├── 📄 interceptors.ts       # 拦截器
├── 📄 connection.ts         # 连接管理
├── 📄 uploadManager.ts      # 上传管理
└── 📄 examples.ts           # 使用示例
```

## 🔧 核心配置

### HTTP 实例配置

```typescript
// utils/http/instance.ts
import { createAlova } from "alova";
import { GlobalFetch } from "alova/globalFetch";
import { VueHook } from "alova/vue";
import { env } from "@/utils/env";

export const alovaInstance = createAlova({
  requestAdapter: GlobalFetch(),
  responseAdapter: VueHook(),
  baseURL: env.apiBaseUrl,
  timeout: 10000,
  beforeRequest: requestInterceptor,
  responded: responseInterceptor,
  cache: {
    memory: {
      capacity: 1000,
      ttl: 5 * 60 * 1000,
    },
    persistent: {
      storage: localStorage,
      ttl: 30 * 60 * 1000,
    },
  },
  retry: {
    retries: 3,
    delay: 1000,
    backoff: 2,
    retryOnError: true,
  },
});
```

### 请求方法

```typescript
// utils/http/methods.ts
import { alovaInstance } from "./instance";

// GET 请求
export function get<T = any>(
  url: string,
  config?: RequestConfig
): Promise<ApiResponse<T>> {
  return alovaInstance.Get(url, config);
}

// POST 请求
export function post<T = any>(
  url: string,
  data?: any,
  config?: RequestConfig
): Promise<ApiResponse<T>> {
  return alovaInstance.Post(url, data, config);
}

// PUT 请求
export function put<T = any>(
  url: string,
  data?: any,
  config?: RequestConfig
): Promise<ApiResponse<T>> {
  return alovaInstance.Put(url, data, config);
}

// DELETE 请求
export function del<T = any>(
  url: string,
  config?: RequestConfig
): Promise<ApiResponse<T>> {
  return alovaInstance.Delete(url, config);
}

// 文件上传
export function uploadFile<T = any>(
  url: string,
  file: File,
  config?: UploadConfig
): Promise<ApiResponse<T>> {
  const formData = new FormData();
  formData.append("file", file);

  return alovaInstance.Post(url, formData, {
    ...config,
    headers: {
      "Content-Type": "multipart/form-data",
      ...config?.headers,
    },
  });
}
```

### 拦截器配置

```typescript
// utils/http/interceptors.ts
import { useUserStore } from "@/stores";

// 请求拦截器
export function requestInterceptor(config: RequestConfig) {
  const userStore = useUserStore();

  // 添加认证头
  if (userStore.getToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${userStore.getToken}`,
    };
  }

  // 添加请求 ID
  config.headers = {
    ...config.headers,
    "X-Request-ID": generateRequestId(),
  };

  return config;
}

// 响应拦截器
export function responseInterceptor(response: ApiResponse) {
  if (response.code !== 200) {
    throw createHttpError(response);
  }

  return response;
}
```

## 🔧 使用示例

### API 模块示例

```typescript
// api/modules/user.ts
import { alovaInstance } from "@/utils/http";
import type { UserInfo, LoginParams, LoginResult } from "@/Types";

export const userApi = {
  // 用户登录
  login: (params: LoginParams) =>
    alovaInstance.Post<LoginResult>("/auth/login", params),

  // 获取用户信息
  getUserInfo: () => alovaInstance.Get<UserInfo>("/user/info"),

  // 更新用户信息
  updateUserInfo: (userInfo: Partial<UserInfo>) =>
    alovaInstance.Put<UserInfo>("/user/info", userInfo),

  // 上传头像
  uploadAvatar: (file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);
    return alovaInstance.Post<UserInfo>("/user/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
```

### 在组件中使用

```vue
<template>
  <div class="user-management">
    <div v-if="loading" class="loading">加载中...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="user-list">
      <div v-for="user in users" :key="user.id" class="user-item">
        <h3>{{ user.username }}</h3>
        <p>{{ user.email }}</p>
        <button @click="editUser(user)" class="btn">编辑</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { userApi } from "@/api/modules/user";

const users = ref<UserInfo[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

const fetchUsers = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await userApi.getUserList({
      page: 1,
      pageSize: 20,
    });
    users.value = response.data.list;
  } catch (err: any) {
    error.value = err.message || "获取用户列表失败";
  } finally {
    loading.value = false;
  }
};

const editUser = async (user: UserInfo) => {
  try {
    await userApi.updateUser(user.id, {
      username: user.username,
      email: user.email,
    });
  } catch (err: any) {
    console.error("编辑用户失败:", err);
  }
};

onMounted(() => {
  fetchUsers();
});
</script>
```

### 错误处理

```typescript
// utils/http/errorHandler.ts
export function handleHttpError(error: HttpError): string {
  const errorMessages: Record<number, string> = {
    400: "请求参数错误",
    401: "未授权，请重新登录",
    403: "禁止访问",
    404: "请求的资源不存在",
    500: "服务器内部错误",
  };

  if (error.data?.message) {
    return error.data.message;
  }

  if (error.status && errorMessages[error.status]) {
    return errorMessages[error.status];
  }

  return error.message || "未知错误";
}
```

## 🎯 最佳实践

### 1. API 模块化

```typescript
// 按功能模块划分 API
// api/modules/user.ts - 用户相关 API
// api/modules/product.ts - 产品相关 API
// api/modules/order.ts - 订单相关 API
```

### 2. 类型安全

```typescript
interface LoginParams {
  username: string;
  password: string;
  remember?: boolean;
}

interface LoginResult {
  token: string;
  userInfo: UserInfo;
}

const login = async (
  params: LoginParams
): Promise<ApiResponse<LoginResult>> => {
  return alovaInstance.Post<LoginResult>("/auth/login", params);
};
```

### 3. 错误处理

```typescript
try {
  const response = await userApi.login(params);
  // 处理成功响应
} catch (error) {
  if (error instanceof HttpRequestError) {
    showError(error);
  }
}
```

---

这套 HTTP 请求系统为 cc-admin 框架提供了强大、类型安全的请求管理能力。
