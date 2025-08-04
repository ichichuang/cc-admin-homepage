---
title: 构建配置
sidebar: auto
date: 2025-08-04 16:00:26
permalink: /pages/build/
categories:
  - guide
tags:
  - 构建
  - Vite
  - 配置
author:
  name: chichuang
  link: https://github.com/ichichuang
---

# 构建配置

::: tip 🎯 构建系统
cc-admin 框架基于 Vite 构建工具，提供高效的开发和构建体验。
:::

## ⚡ Vite 配置

### 基础配置

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@components": resolve(__dirname, "src/components"),
      "@utils": resolve(__dirname, "src/utils"),
      "@assets": resolve(__dirname, "src/assets"),
    },
  },

  server: {
    port: 3000,
    open: true,
    cors: true,
  },

  build: {
    target: "es2015",
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    minify: "terser",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["vue", "vue-router", "pinia"],
          utils: ["@/utils"],
        },
      },
    },
  },
});
```

### 环境配置

```typescript
// 环境变量配置
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    },

    server: {
      port: env.VITE_PORT || 3000,
      proxy: {
        "/api": {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
```

## 🎯 构建优化

### 代码分割

::: cardList

```yaml
- name: 路由分割
  desc: 按路由自动分割代码
  bgColor: "#CBEAFA"
  textColor: "#6854A1"
- name: 组件分割
  desc: 大型组件独立打包
  bgColor: "#718971"
  textColor: "#fff"
- name: 第三方库分割
  desc: 第三方库独立打包
  bgColor: "#FCDBA0"
  textColor: "#A05F2C"
```

:::

### 性能优化

```typescript
// 构建优化配置
export default defineConfig({
  build: {
    // 压缩配置
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },

    // 代码分割
    rollupOptions: {
      output: {
        manualChunks: {
          // Vue 相关库
          vue: ["vue", "vue-router", "pinia"],

          // UI 组件库
          ui: ["@/components"],

          // 工具库
          utils: ["@/utils"],

          // 第三方库
          vendor: ["lodash", "axios"],
        },
      },
    },

    // 资源优化
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1000,
  },
});
```

## 📦 打包配置

### 生产环境

::: details 📋 生产环境配置

```typescript
// 生产环境配置
export default defineConfig({
  build: {
    // 输出目录
    outDir: "dist",

    // 资源目录
    assetsDir: "assets",

    // 源码映射
    sourcemap: false,

    // 压缩配置
    minify: "terser",

    // 目标浏览器
    target: ["es2015", "chrome63", "firefox67", "safari11.1"],

    // CSS 配置
    cssCodeSplit: true,

    // 资源内联限制
    assetsInlineLimit: 4096,
  },
});
```

:::

### 开发环境

::: cardList

```yaml
- name: 热重载
  desc: 极速的热重载体验
  bgColor: "#DFEEE7"
  textColor: "#2A3344"
- name: 源码映射
  desc: 完整的源码映射支持
  bgColor: "#F0DFB1"
  textColor: "#242A38"
- name: 代理配置
  desc: 灵活的代理配置
  bgColor: "#E8F4FD"
  textColor: "#2E5B88"
```

:::

## 🔧 插件配置

### 常用插件

```typescript
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import legacy from "@vitejs/plugin-legacy";
import unocss from "unocss/vite";

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),

    // UnoCSS
    unocss(),

    // 兼容性支持
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],
});
```

### 自定义插件

```typescript
// 自定义插件示例
function myPlugin() {
  return {
    name: "my-plugin",

    // 构建开始
    buildStart() {
      console.log("构建开始...");
    },

    // 转换代码
    transform(code, id) {
      if (id.endsWith(".vue")) {
        // 处理 Vue 文件
        return code;
      }
    },

    // 构建结束
    buildEnd() {
      console.log("构建完成!");
    },
  };
}
```

## 🚀 部署配置

### 静态部署

```bash
# 构建生产版本
npm run build

# 部署到静态服务器
npm run deploy
```

### Docker 部署

```dockerfile
# Dockerfile
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### CI/CD 配置

```yaml
# GitHub Actions
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy
        run: npm run deploy
```

## 📊 构建分析

### 包分析

```bash
# 安装分析工具
npm install --save-dev rollup-plugin-visualizer

# 构建并分析
npm run build:analyze
```

### 性能监控

```typescript
// 性能监控插件
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      filename: "dist/stats.html",
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
```

## 🎯 最佳实践

### 构建优化

::: tip 💡 优化建议

1. **代码分割** - 合理分割代码减少包体积
2. **资源优化** - 压缩图片和静态资源
3. **缓存策略** - 利用浏览器缓存机制
4. **懒加载** - 实现组件和路由懒加载
   :::

### 开发建议

::: details 📋 开发建议详情

- 使用环境变量管理配置
- 合理配置代理和跨域
- 优化开发服务器性能
- 配置源码映射便于调试
- 使用构建分析工具优化包体积
  :::

---

::: center
**构建配置** - 让应用构建更高效！
:::

::: tip 💡 构建特色

> 本构建配置为 chichuang 原创，采用自定义商业限制许可证，仅供非商业用途使用。
> :::
> title: build
> date: 2025-08-04 18:11:42
> permalink: /pages/848715/
> author:
> name: chichuang

## link: https://github.com/ichichuang
