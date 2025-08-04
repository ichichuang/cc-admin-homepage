---
title: 开发指南
date: 2025-08-04 16:17:18
permalink: /pages/development/
categories:
  - guide
tags:
  - development
  - guide
  - setup
author:
  name: cc-admin
  link: https://github.com/ichichuang/cc-admin
---

# 开发指南

本指南将帮助您快速搭建 cc-admin 开发环境，了解开发流程，并掌握调试技巧。

## 🚀 环境准备

### 系统要求

- **Node.js**: >= 22.x
- **包管理器**: pnpm >= 8.0.0
- **操作系统**: Windows 10+, macOS 10.15+, Linux

### 安装 Node.js

#### Windows

```bash
# 使用 nvm-windows
winget install CoreyButler.NVMforWindows
nvm install 22.0.0
nvm use 22.0.0
```

#### macOS

```bash
# 使用 Homebrew
brew install node@22

# 或使用 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 22
nvm use 22
```

#### Linux

```bash
# 使用 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 22
nvm use 22
```

### 安装 pnpm

```bash
# 使用 npm 安装
npm install -g pnpm@10.12.4

# 或使用官方脚本
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

### 验证环境

```bash
# 检查 Node.js 版本
node --version  # 应该 >= 22.x

# 检查 pnpm 版本
pnpm --version  # 应该 >= 8.0.0

# 检查包管理器
pnpm config get packageManager  # 应该显示 pnpm@10.12.4
```

## 📦 项目初始化

### 克隆项目

```bash
# 克隆项目
git clone https://github.com/ichichuang/cc-admin.git
cd cc-admin

# 安装依赖
pnpm install
```

### 环境配置

创建环境配置文件：

```bash
# 复制环境配置模板
cp .env.example .env
```

编辑 `.env` 文件：

```env
# 应用配置
VITE_APP_TITLE=cc-admin
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=development

# 开发服务器配置
VITE_PORT=3000
VITE_PUBLIC_PATH=/

# API 配置
VITE_API_BASE_URL=http://localhost:8080/api

# 功能开关
VITE_MOCK_ENABLE=true
VITE_DEV_TOOLS=true
VITE_CONSOLE_LOG=true

# 构建配置
VITE_BUILD_SOURCEMAP=true
VITE_DROP_CONSOLE=false
VITE_DROP_DEBUGGER=false
VITE_COMPRESSION=none
VITE_LEGACY=false
```

### 启动开发服务器

```bash
# 启动开发服务器
pnpm dev

# 或使用并行模式（推荐）
pnpm dev:parallel
```

## 🛠️ 开发工具配置

### VS Code 配置

安装推荐的扩展：

```json
// .vscode/extensions.json
{
  "recommendations": [
    "Vue.volar",
    "Vue.vscode-typescript-vue-plugin",
    "bradlc.vscode-tailwindcss",
    "antfu.unocss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

### 编辑器设置

```json
// .vscode/settings.json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "unocss.root": "src",
  "unocss.unoConfig": "uno.config.ts"
}
```

### 调试配置

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

## 📝 开发流程

### 1. 创建新功能

#### 创建功能分支

```bash
# 从 master 分支创建新功能分支
git checkout master
git pull origin master
git checkout -b feat/your-feature-name

# 或使用项目脚本
pnpm init:project
```

#### 分支命名规范

- **新功能**: `feat/description`
- **Bug 修复**: `fix/description`
- **文档更新**: `docs/description`
- **代码重构**: `refactor/description`
- **样式修改**: `style/description`

### 2. 开发新页面

#### 创建页面组件

```bash
# 在 views 目录下创建新页面
mkdir src/views/example
touch src/views/example/index.vue
```

#### 页面组件模板

```vue
<template>
  <div class="example-page">
    <h1 class="text-2xl font-bold mb-4">{{ t("example.title") }}</h1>
    <div class="bg-white rounded-lg p-6 shadow-sm">
      <!-- 页面内容 -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

// 页面逻辑
</script>

<style scoped>
.example-page {
  @apply p-6;
}
</style>
```

#### 添加路由配置

```typescript
// src/router/modules/example.ts
export default {
  path: "/example",
  name: "Example",
  component: () => import("@/views/example/index.vue"),
  meta: {
    title: "示例页面",
    requiresAuth: true,
    icon: "i-carbon-example",
  },
};
```

### 3. 开发新组件

#### 创建组件

```bash
# 在 components 目录下创建新组件
mkdir src/components/common/ExampleComponent
touch src/components/common/ExampleComponent/index.vue
touch src/components/common/ExampleComponent/types.ts
```

#### 组件模板

```vue
<template>
  <div class="example-component" :class="componentClass">
    <slot name="header">
      <h3 class="text-lg font-semibold">{{ title }}</h3>
    </slot>
    <div class="content">
      <slot />
    </div>
    <slot name="footer" />
  </div>
</template>

<script setup lang="ts">
import type { ExampleComponentProps } from "./types";

// 定义组件属性
const props = withDefaults(defineProps<ExampleComponentProps>(), {
  title: "",
  variant: "default",
});

// 计算属性
const componentClass = computed(() => [
  "example-component",
  `example-component--${props.variant}`,
]);
</script>

<style scoped>
.example-component {
  @apply border rounded-lg p-4;
}

.example-component--default {
  @apply border-gray-200 bg-white;
}

.example-component--primary {
  @apply border-blue-200 bg-blue-50;
}
</style>
```

#### 类型定义

```typescript
// src/components/common/ExampleComponent/types.ts
export interface ExampleComponentProps {
  title?: string;
  variant?: "default" | "primary" | "success" | "warning" | "danger";
}

export interface ExampleComponentEmits {
  (e: "click", value: string): void;
  (e: "change", value: any): void;
}
```

### 4. 添加 API 接口

#### 创建 API 模块

```typescript
// src/api/modules/example.ts
import { http } from "@/utils/http";

export interface ExampleData {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}

export interface CreateExampleRequest {
  name: string;
  description: string;
}

export const exampleApi = {
  // 获取列表
  getList: (params?: any) =>
    http.get<ExampleData[]>("/api/examples", { params }),

  // 获取详情
  getDetail: (id: number) => http.get<ExampleData>(`/api/examples/${id}`),

  // 创建
  create: (data: CreateExampleRequest) =>
    http.post<ExampleData>("/api/examples", data),

  // 更新
  update: (id: number, data: Partial<CreateExampleRequest>) =>
    http.put<ExampleData>(`/api/examples/${id}`, data),

  // 删除
  delete: (id: number) => http.delete(`/api/examples/${id}`),
};
```

### 5. 添加状态管理

#### 创建 Store

```typescript
// src/stores/modules/example.ts
import { defineStore } from "pinia";
import { exampleApi, type ExampleData } from "@/api/modules/example";

export const useExampleStore = defineStore("example", {
  state: () => ({
    list: [] as ExampleData[],
    loading: false,
    currentItem: null as ExampleData | null,
  }),

  getters: {
    getById: (state) => (id: number) =>
      state.list.find((item) => item.id === id),
  },

  actions: {
    async fetchList() {
      this.loading = true;
      try {
        const data = await exampleApi.getList();
        this.list = data;
      } catch (error) {
        console.error("获取列表失败:", error);
      } finally {
        this.loading = false;
      }
    },

    async createItem(item: CreateExampleRequest) {
      try {
        const data = await exampleApi.create(item);
        this.list.push(data);
        return data;
      } catch (error) {
        console.error("创建失败:", error);
        throw error;
      }
    },
  },

  persist: {
    key: "cc-admin_example",
    storage: localStorage,
    paths: ["list"],
  },
});
```

## 🔍 调试技巧

### 1. 浏览器调试

#### Vue DevTools

安装 Vue DevTools 浏览器扩展：

```bash
# Chrome 扩展
# 访问 Chrome Web Store 搜索 "Vue.js devtools"

# Firefox 扩展
# 访问 Firefox Add-ons 搜索 "Vue.js devtools"
```

#### 控制台调试

```typescript
// 在组件中使用
const debug = (data: any) => {
  if (import.meta.env.DEV) {
    console.log("[DEBUG]", data);
  }
};

// 使用
debug({ userInfo, permissions });
```

### 2. 网络调试

#### 启用网络日志

```typescript
// src/utils/http/index.ts
const http = createAlova({
  beforeRequest: (config) => {
    if (import.meta.env.DEV) {
      console.log("[HTTP Request]", config);
    }
  },
  responded: (response) => {
    if (import.meta.env.DEV) {
      console.log("[HTTP Response]", response);
    }
    return response.json();
  },
});
```

#### 使用浏览器网络面板

1. 打开开发者工具 (F12)
2. 切换到 Network 标签
3. 筛选 XHR/Fetch 请求
4. 查看请求详情和响应

### 3. 性能调试

#### 性能监控

```typescript
// src/hooks/usePerformance.ts
import { onMounted, onUnmounted } from "vue";

export function usePerformanceMonitor(componentName: string) {
  const startTime = performance.now();

  onMounted(() => {
    const mountTime = performance.now() - startTime;
    console.log(`[${componentName}] 挂载耗时: ${mountTime.toFixed(2)}ms`);
  });

  onUnmounted(() => {
    const totalTime = performance.now() - startTime;
    console.log(`[${componentName}] 总生命周期: ${totalTime.toFixed(2)}ms`);
  });
}
```

#### 内存泄漏检测

```typescript
// 在组件中使用
import { usePerformanceMonitor } from "@/hooks/usePerformance";

export default {
  setup() {
    usePerformanceMonitor("ExampleComponent");

    // 组件逻辑
  },
};
```

### 4. 错误调试

#### 全局错误处理

```typescript
// src/main.ts
app.config.errorHandler = (err, instance, info) => {
  console.error("应用错误:", {
    error: err,
    component: instance?.$options.name,
    info,
    stack: err instanceof Error ? err.stack : undefined,
  });

  // 发送错误报告
  if (import.meta.env.PROD) {
    reportError(err, info);
  }
};
```

#### 组件错误边界

```vue
<template>
  <div>
    <ErrorBoundary v-if="hasError" :error="error" />
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
import { ref, onErrorCaptured } from "vue";

const hasError = ref(false);
const error = ref<Error | null>(null);

onErrorCaptured((err, instance, info) => {
  hasError.value = true;
  error.value = err;
  console.error("组件错误:", err, info);
  return false; // 阻止错误继续传播
});
</script>
```

## 🧪 测试

### 1. 单元测试

#### 安装测试工具

```bash
pnpm add -D vitest @vue/test-utils jsdom
```

#### 测试配置

```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: "jsdom",
    globals: true,
  },
});
```

#### 编写测试

```typescript
// src/components/__tests__/ExampleComponent.test.ts
import { mount } from "@vue/test-utils";
import ExampleComponent from "../ExampleComponent/index.vue";

describe("ExampleComponent", () => {
  it("renders correctly", () => {
    const wrapper = mount(ExampleComponent, {
      props: {
        title: "Test Title",
      },
    });

    expect(wrapper.text()).toContain("Test Title");
  });

  it("emits click event", async () => {
    const wrapper = mount(ExampleComponent);

    await wrapper.trigger("click");

    expect(wrapper.emitted("click")).toBeTruthy();
  });
});
```

### 2. E2E 测试

#### 安装 Playwright

```bash
pnpm add -D @playwright/test
npx playwright install
```

#### 编写 E2E 测试

```typescript
// tests/example.spec.ts
import { test, expect } from "@playwright/test";

test("example page", async ({ page }) => {
  await page.goto("/example");

  await expect(page.locator("h1")).toContainText("示例页面");

  await page.click('button[data-testid="create-btn"]');

  await expect(page.locator(".modal")).toBeVisible();
});
```

## 📦 构建与部署

### 1. 开发构建

```bash
# 开发环境构建
pnpm build:dev

# 生产环境构建
pnpm build

# 分析构建结果
pnpm build:analyze
```

### 2. 部署配置

#### Vercel 部署

```json
// vercel.json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

#### Docker 部署

```dockerfile
# Dockerfile
FROM node:22-alpine as builder

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install

COPY . .
RUN pnpm build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🔧 常用命令

### 开发命令

```bash
# 启动开发服务器
pnpm dev

# 类型检查
pnpm type-check

# 代码检查
pnpm lint

# 代码格式化
pnpm format

# 运行所有检查
pnpm check
```

### 构建命令

```bash
# 生产构建
pnpm build

# 预览构建结果
pnpm preview

# 分析构建包
pnpm report
```

### 工具命令

```bash
# 命名规范检查
pnpm naming-check

# 监控项目状态
pnpm monitor

# 测试 GitHub Token
pnpm token:test
```

## 📚 最佳实践

### 1. 代码组织

- 按功能模块组织代码
- 使用清晰的命名规范
- 保持文件结构的一致性
- 及时重构和优化代码

### 2. 性能优化

- 使用懒加载和代码分割
- 合理使用缓存
- 优化图片和静态资源
- 监控性能指标

### 3. 安全考虑

- 验证用户输入
- 使用 HTTPS
- 实现适当的权限控制
- 定期更新依赖

### 4. 用户体验

- 提供加载状态
- 实现错误处理
- 优化响应式设计
- 支持无障碍访问

## 🆘 常见问题

### Q: 开发服务器启动失败

**A**: 检查以下几点：

1. Node.js 版本是否符合要求
2. 依赖是否正确安装
3. 端口是否被占用
4. 环境变量是否正确配置

### Q: 类型检查失败

**A**: 检查以下几点：

1. TypeScript 配置是否正确
2. 类型定义是否完整
3. 导入路径是否正确
4. 是否有循环依赖

### Q: 构建失败

**A**: 检查以下几点：

1. 代码是否有语法错误
2. 依赖是否完整
3. 环境变量是否正确
4. 构建配置是否有问题

### Q: 性能问题

**A**: 检查以下几点：

1. 是否使用了懒加载
2. 是否有内存泄漏
3. 网络请求是否优化
4. 静态资源是否压缩

## 📞 获取帮助

- **文档**: 查看项目文档
- **Issues**: 在 GitHub 上提交问题
- **Discussions**: 参与社区讨论
- **代码审查**: 提交 Pull Request

通过本指南，您应该能够快速上手 cc-admin 开发，并掌握各种开发技巧和最佳实践。
title: development
date: 2025-08-04 17:03:24
permalink: /pages/1b5a73/
categories:

- guide
  tags:
- author:
  name: 文档作者
  link: https://github.com/your-username

---
