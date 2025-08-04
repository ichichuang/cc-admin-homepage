---
title: unocss
date: 2025-08-04 16:24:38
permalink: /pages/de67b9/
categories:
  - guide
tags:
  -
author:
  name: 文档作者
  link: https://github.com/your-username
---

# UnoCSS 配置

cc-admin 框架采用 UnoCSS 作为原子化 CSS 引擎，提供现代化的样式解决方案。

## 🎯 核心特性

### 原子化 CSS

- **即时生成** - 按需生成 CSS，减少包体积
- **实用优先** - 提供丰富的实用工具类
- **类型安全** - 完整的 TypeScript 支持
- **主题系统** - 灵活的主题配置

### 响应式设计

- **断点系统** - 支持多种屏幕尺寸
- **移动优先** - 移动端优先的设计理念
- **rem 适配** - 基于 rem 的响应式布局

### 设计稿映射

- **精确映射** - 设计稿到像素的精确映射
- **响应式缩放** - 支持不同屏幕尺寸的自动缩放
- **兼容性处理** - 自动处理浏览器兼容性

## 📁 配置文件结构

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

## ⚙️ 主配置文件

### unocss/index.ts

```typescript
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";
import { devOptions, prodOptions } from "./env";
import { createPixelRules } from "./rules/pixelRules";
import { createThemeVariableRules } from "./rules/themeRules";
import { shortcuts } from "./shortcuts";
import { themeConfig } from "./theme";
import { getCustomCollections, getDynamicSafelist } from "./utils/icons";

export default defineConfig({
  // 内容扫描配置
  content: {
    pipeline: {
      include: [
        /\.(vue|js|ts|jsx|tsx|md|mdx|html)($|\?)/,
        /\.(css|scss|sass|less|styl|stylus)($|\?)/,
      ],
      exclude: [
        "node_modules",
        "dist",
        ".git",
        ".nuxt",
        ".next",
        ".vercel",
        ".netlify",
      ],
    },
  },

  // 预设配置
  presets: [
    presetUno({
      dark: "class",
      variablePrefix: "--un-",
    }),
    presetIcons({
      prefix: "icon-",
      warn: process.env.NODE_ENV === "development",
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
        "flex-shrink": "0",
      },
      collections: {
        ...getCustomCollections(),
      },
    }),
    presetAttributify({
      prefix: "un-",
      prefixedOnly: false,
    }),
    presetTypography({
      cssExtend: {
        code: {
          color: "var(--theme-color)",
        },
        blockquote: {
          "border-left-color": "var(--theme-color)",
        },
      },
    }),
  ],

  // 安全列表
  safelist: getDynamicSafelist(),

  // 变换器
  transformers: [
    transformerDirectives({
      enforce: "pre",
    }),
    transformerVariantGroup(),
  ],

  // 自定义变体
  variants: [
    // 深色模式变体
    (matcher) => {
      if (!matcher.startsWith("dark:")) {
        return matcher;
      }
      return {
        matcher: matcher.slice(5),
        selector: (s) => `.dark ${s}`,
      };
    },

    // 响应式断点变体
    (matcher) => {
      const breakpointVariants = [
        "xs:",
        "sm:",
        "md:",
        "lg:",
        "xl:",
        "xls:",
        "xxl:",
        "xxxl:",
      ];
      for (const variant of breakpointVariants) {
        if (matcher.startsWith(variant)) {
          return {
            matcher: matcher.slice(variant.length),
            selector: (s) =>
              `@media (min-width: ${
                themeConfig.breakpoints[variant.slice(0, -1)]
              }) { ${s} }`,
          };
        }
      }
      return matcher;
    },
  ],

  // 快捷方式配置
  shortcuts: shortcuts as any,

  // 自定义规则
  rules: [
    // 设计稿映射规则
    [
      /^w-(\d+)$/,
      ([, d]) => ({ width: `${d}px` }),
      { layer: "design-mapping" },
    ],
    [
      /^h-(\d+)$/,
      ([, d]) => ({ height: `${d}px` }),
      { layer: "design-mapping" },
    ],
    [
      /^text-(\d+)$/,
      ([, d]) => ({ "font-size": `${d}px` }),
      { layer: "design-mapping" },
    ],
    [
      /^p-(\d+)$/,
      ([, d]) => ({ padding: `${d}px` }),
      { layer: "design-mapping" },
    ],
    [
      /^m-(\d+)$/,
      ([, d]) => ({ margin: `${d}px` }),
      { layer: "design-mapping" },
    ],

    // 安全区域规则
    ["safe-top", { "padding-top": "env(safe-area-inset-top)" }],
    ["safe-bottom", { "padding-bottom": "env(safe-area-inset-bottom)" }],

    // 主题变量规则
    ...createThemeVariableRules(),
  ],

  // 主题配置
  theme: themeConfig,

  // 环境配置
  ...devOptions,
  ...prodOptions,
});
```

## 🎨 主题配置

### unocss/theme.ts

```typescript
export const themeConfig = {
  // 颜色配置
  colors: {
    primary: {
      50: "#e6f7ff",
      100: "#bae7ff",
      200: "#91d5ff",
      300: "#69c0ff",
      400: "#40a9ff",
      500: "#1890ff",
      600: "#096dd9",
      700: "#0050b3",
      800: "#003a8c",
      900: "#002766",
    },
    success: {
      50: "#f6ffed",
      100: "#d9f7be",
      200: "#b7eb8f",
      300: "#95de64",
      400: "#73d13d",
      500: "#52c41a",
      600: "#389e0d",
      700: "#237804",
      800: "#135200",
      900: "#092b00",
    },
    warning: {
      50: "#fffbe6",
      100: "#fff1b8",
      200: "#ffe58f",
      300: "#ffd666",
      400: "#ffc53d",
      500: "#faad14",
      600: "#d48806",
      700: "#ad6800",
      800: "#874d00",
      900: "#613400",
    },
    error: {
      50: "#fff2f0",
      100: "#ffccc7",
      200: "#ffa39e",
      300: "#ff7875",
      400: "#ff4d4f",
      500: "#f5222d",
      600: "#cf1322",
      700: "#a8071a",
      800: "#820014",
      900: "#5c0011",
    },
  },

  // 断点配置
  breakpoints: {
    xs: "480px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    xls: "1440px",
    xxl: "1600px",
    xxxl: "1920px",
  },

  // 字体配置
  fontFamily: {
    sans: ["Inter", "system-ui", "sans-serif"],
    serif: ["Georgia", "serif"],
    mono: ["Fira Code", "monospace"],
  },

  // 字体大小配置
  fontSize: {
    xs: ["12px", "16px"],
    sm: ["14px", "20px"],
    base: ["16px", "24px"],
    lg: ["18px", "28px"],
    xl: ["20px", "28px"],
    "2xl": ["24px", "32px"],
    "3xl": ["30px", "36px"],
    "4xl": ["36px", "40px"],
    "5xl": ["48px", "48px"],
    "6xl": ["60px", "60px"],
  },

  // 间距配置
  spacing: {
    0: "0px",
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "20px",
    6: "24px",
    7: "28px",
    8: "32px",
    9: "36px",
    10: "40px",
    12: "48px",
    14: "56px",
    16: "64px",
    20: "80px",
    24: "96px",
    28: "112px",
    32: "128px",
    36: "144px",
    40: "160px",
    44: "176px",
    48: "192px",
    52: "208px",
    56: "224px",
    60: "240px",
    64: "256px",
    72: "288px",
    80: "320px",
    96: "384px",
  },

  // 圆角配置
  borderRadius: {
    none: "0px",
    sm: "2px",
    base: "4px",
    md: "6px",
    lg: "8px",
    xl: "12px",
    "2xl": "16px",
    "3xl": "24px",
    full: "9999px",
  },

  // 阴影配置
  boxShadow: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    base: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
    none: "none",
  },
};
```

## 🔧 自定义规则

### unocss/rules/pixelRules.ts

```typescript
export function createPixelRules() {
  return [
    // 像素值规则
    [/^w-(\d+)px$/, ([, d]) => ({ width: `${d}px` })],
    [/^h-(\d+)px$/, ([, d]) => ({ height: `${d}px` })],
    [/^text-(\d+)px$/, ([, d]) => ({ "font-size": `${d}px` })],
    [/^p-(\d+)px$/, ([, d]) => ({ padding: `${d}px` })],
    [/^m-(\d+)px$/, ([, d]) => ({ margin: `${d}px` })],

    // 百分比规则
    [/^w-(\d+)%$/, ([, d]) => ({ width: `${d}%` })],
    [/^h-(\d+)%$/, ([, d]) => ({ height: `${d}%` })],

    // 视口单位规则
    [/^w-(\d+)vw$/, ([, d]) => ({ width: `${d}vw` })],
    [/^h-(\d+)vh$/, ([, d]) => ({ height: `${d}vh` })],

    // 最小/最大尺寸规则
    [/^min-w-(\d+)$/, ([, d]) => ({ "min-width": `${d}px` })],
    [/^max-w-(\d+)$/, ([, d]) => ({ "max-width": `${d}px` })],
    [/^min-h-(\d+)$/, ([, d]) => ({ "min-height": `${d}px` })],
    [/^max-h-(\d+)$/, ([, d]) => ({ "max-height": `${d}px` })],
  ];
}
```

### unocss/rules/themeRules.ts

```typescript
export function createThemeVariableRules() {
  return [
    // 主题颜色规则
    [
      /^bg-theme-(\d+)$/,
      ([, opacity]) => ({
        "background-color": `rgba(var(--theme-color-rgb), ${
          Number(opacity) / 100
        })`,
      }),
    ],
    [
      /^text-theme-(\d+)$/,
      ([, opacity]) => ({
        color: `rgba(var(--theme-color-rgb), ${Number(opacity) / 100})`,
      }),
    ],
    [
      /^border-theme-(\d+)$/,
      ([, opacity]) => ({
        "border-color": `rgba(var(--theme-color-rgb), ${
          Number(opacity) / 100
        })`,
      }),
    ],

    // 渐变规则
    [
      /^bg-gradient-theme$/,
      () => ({
        "background-image":
          "linear-gradient(135deg, var(--theme-color), var(--primary-color))",
      }),
    ],
    [
      /^bg-gradient-primary$/,
      () => ({
        "background-image":
          "linear-gradient(135deg, var(--primary-color), var(--primary-light))",
      }),
    ],

    // 阴影规则
    [
      /^shadow-theme$/,
      () => ({
        "box-shadow": "0 4px 12px rgba(var(--theme-color-rgb), 0.15)",
      }),
    ],
    [
      /^shadow-theme-lg$/,
      () => ({
        "box-shadow": "0 8px 24px rgba(var(--theme-color-rgb), 0.2)",
      }),
    ],
  ];
}
```

## ⚡ 快捷方式

### unocss/shortcuts/index.ts

```typescript
import { buttonShortcuts } from "./button";
import { layoutShortcuts } from "./layout";
import { textShortcuts } from "./text";

export const shortcuts = {
  // 按钮快捷方式
  ...buttonShortcuts,

  // 布局快捷方式
  ...layoutShortcuts,

  // 文本快捷方式
  ...textShortcuts,

  // 通用快捷方式
  "btn-primary":
    "px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors",
  "btn-secondary":
    "px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors",
  "btn-success":
    "px-4 py-2 bg-success-500 text-white rounded hover:bg-success-600 transition-colors",
  "btn-warning":
    "px-4 py-2 bg-warning-500 text-white rounded hover:bg-warning-600 transition-colors",
  "btn-error":
    "px-4 py-2 bg-error-500 text-white rounded hover:bg-error-600 transition-colors",

  // 卡片快捷方式
  card: "bg-white rounded-lg shadow-md p-6",
  "card-hover": "card hover:shadow-lg transition-shadow",

  // 输入框快捷方式
  input:
    "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
  "input-error": "input border-error-500 focus:ring-error-500",

  // 表格快捷方式
  table: "w-full border-collapse",
  "table-cell": "px-4 py-2 border border-gray-200",
  "table-header": "table-cell bg-gray-50 font-medium",
};
```

### unocss/shortcuts/button.ts

```typescript
export const buttonShortcuts = {
  // 基础按钮
  btn: "inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors",

  // 按钮尺寸
  "btn-sm": "btn px-3 py-1.5 text-xs",
  "btn-lg": "btn px-6 py-3 text-base",
  "btn-xl": "btn px-8 py-4 text-lg",

  // 按钮变体
  "btn-solid":
    "btn bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500",
  "btn-outline":
    "btn border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-primary-500",
  "btn-ghost":
    "btn text-primary-500 hover:bg-primary-50 focus:ring-primary-500",

  // 按钮状态
  "btn-loading": "btn opacity-75 cursor-not-allowed",
  "btn-disabled": "btn opacity-50 cursor-not-allowed",
};
```

### unocss/shortcuts/layout.ts

```typescript
export const layoutShortcuts = {
  // 容器
  container: "mx-auto px-4 sm:px-6 lg:px-8",
  "container-sm": "container max-w-3xl",
  "container-md": "container max-w-4xl",
  "container-lg": "container max-w-6xl",
  "container-xl": "container max-w-7xl",

  // 网格
  "grid-cols-auto":
    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  "grid-cols-responsive": "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",

  // 间距
  "space-y": "space-y-4",
  "space-x": "space-x-4",
  "space-y-sm": "space-y-2",
  "space-x-sm": "space-x-2",
  "space-y-lg": "space-y-6",
  "space-x-lg": "space-x-6",

  // 定位
  center: "flex items-center justify-center",
  "center-x": "flex justify-center",
  "center-y": "flex items-center",
  between: "flex items-center justify-between",
  around: "flex items-center justify-around",
};
```

### unocss/shortcuts/text.ts

```typescript
export const textShortcuts = {
  // 文本颜色
  "text-primary": "text-primary-500",
  "text-success": "text-success-500",
  "text-warning": "text-warning-500",
  "text-error": "text-error-500",
  "text-muted": "text-gray-500",

  // 文本大小
  "text-xs": "text-xs leading-4",
  "text-sm": "text-sm leading-5",
  "text-base": "text-base leading-6",
  "text-lg": "text-lg leading-7",
  "text-xl": "text-xl leading-8",
  "text-2xl": "text-2xl leading-9",
  "text-3xl": "text-3xl leading-10",

  // 文本权重
  "font-light": "font-light",
  "font-normal": "font-normal",
  "font-medium": "font-medium",
  "font-semibold": "font-semibold",
  "font-bold": "font-bold",

  // 文本对齐
  "text-left": "text-left",
  "text-center": "text-center",
  "text-right": "text-right",
  "text-justify": "text-justify",

  // 文本装饰
  underline: "underline",
  "line-through": "line-through",
  "no-underline": "no-underline",
};
```

## 🎨 环境配置

### unocss/env.ts

```typescript
// 开发环境配置
export const devOptions = {
  // 开发环境特定配置
  ...(process.env.NODE_ENV === "development" && {
    // 启用调试模式
    debug: true,
    // 显示未使用的类警告
    warn: true,
  }),
};

// 生产环境配置
export const prodOptions = {
  // 生产环境特定配置
  ...(process.env.NODE_ENV === "production" && {
    // 禁用调试模式
    debug: false,
    // 禁用警告
    warn: false,
    // 优化输出
    minify: true,
  }),
};
```

## 🔧 图标工具

### unocss/utils/icons.ts

```typescript
import { getIconCollections } from "@iconify/json";

// 获取自定义图标集合
export function getCustomCollections() {
  return {
    // 自定义图标集合
    custom: {
      // 添加自定义图标
    },
  };
}

// 获取动态安全列表
export function getDynamicSafelist() {
  return [
    // 动态生成的类名
    "icon-home",
    "icon-user",
    "icon-settings",
    "icon-dashboard",
    "icon-chart",
    "icon-table",
    "icon-form",
    "icon-calendar",
    "icon-notification",
    "icon-search",
  ];
}
```

## 📱 响应式设计

### 断点系统

```css
/* 断点配置 */
:root {
  --breakpoint-xs: 480px;
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-xls: 1440px;
  --breakpoint-xxl: 1600px;
  --breakpoint-xxxl: 1920px;
}
```

### 使用示例

```vue
<template>
  <!-- 响应式布局 -->
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
  >
    <div class="card">卡片 1</div>
    <div class="card">卡片 2</div>
    <div class="card">卡片 3</div>
    <div class="card">卡片 4</div>
  </div>

  <!-- 响应式文本 -->
  <h1 class="text-lg md:text-xl lg:text-2xl xl:text-3xl">响应式标题</h1>

  <!-- 响应式间距 -->
  <div class="p-4 md:p-6 lg:p-8 xl:p-10">响应式内容</div>

  <!-- 响应式显示/隐藏 -->
  <div class="hidden md:block">桌面端显示</div>
  <div class="block md:hidden">移动端显示</div>
</template>
```

## 🎯 设计稿映射

### 像素到 rem 转换

```typescript
// 设计稿基准尺寸
const DESIGN_WIDTH = 1920; // 设计稿宽度
const DESIGN_HEIGHT = 1080; // 设计稿高度

// 基准字体大小
const BASE_FONT_SIZE = 16; // 基准字体大小

// 计算 rem 值
function pxToRem(px: number): string {
  return `${px / BASE_FONT_SIZE}rem`;
}

// 计算响应式尺寸
function responsiveSize(px: number): string {
  const rem = px / BASE_FONT_SIZE;
  return `${rem}rem`;
}
```

### 使用示例

```vue
<template>
  <!-- 设计稿映射 -->
  <div class="w-1920 h-1080">
    <!-- 1920x1080 的容器 -->
  </div>

  <!-- 响应式尺寸 -->
  <div class="w-400 h-300 md:w-600 md:h-450 lg:w-800 lg:h-600">
    <!-- 响应式容器 -->
  </div>

  <!-- 精确像素 -->
  <div class="w-100px h-100px">
    <!-- 100x100 像素容器 -->
  </div>
</template>
```

## 🔧 主题切换

### 深色模式支持

```vue
<template>
  <div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
    <h1 class="text-2xl font-bold text-primary-500 dark:text-primary-400">
      主题切换示例
    </h1>
    <p class="text-gray-600 dark:text-gray-400">支持深色模式的内容</p>
  </div>
</template>

<script setup lang="ts">
import { useColorStore } from "@/stores";

const colorStore = useColorStore();

// 切换主题
const toggleTheme = () => {
  colorStore.toggleTheme();
};
</script>
```

## 📊 性能优化

### 按需生成

```typescript
// 只生成使用到的类
export default defineConfig({
  content: {
    pipeline: {
      include: [
        /\.(vue|js|ts|jsx|tsx|md|mdx|html)($|\?)/,
        /\.(css|scss|sass|less|styl|stylus)($|\?)/,
      ],
      exclude: ["node_modules", "dist", ".git"],
    },
  },
});
```

### 安全列表

```typescript
// 预生成常用类名
export function getDynamicSafelist() {
  return [
    // 布局类
    "container",
    "grid",
    "flex",
    "block",
    "inline",
    "hidden",

    // 间距类
    "p-4",
    "m-4",
    "px-4",
    "py-4",
    "mx-4",
    "my-4",

    // 颜色类
    "bg-primary-500",
    "text-white",
    "border-gray-300",

    // 响应式类
    "md:grid-cols-2",
    "lg:grid-cols-3",
    "xl:grid-cols-4",
  ];
}
```

## 🎨 最佳实践

### 1. 类名组织

```vue
<template>
  <!-- 按功能分组 -->
  <div
    class="
    /* 布局 */
    flex items-center justify-between
    /* 间距 */
    p-4 m-2
    /* 样式 */
    bg-white rounded-lg shadow-md
    /* 响应式 */
    md:p-6 lg:p-8
    /* 状态 */
    hover:shadow-lg transition-shadow
  "
  >
    内容
  </div>
</template>
```

### 2. 组件封装

```vue
<template>
  <button
    :class="[
      'btn',
      `btn-${variant}`,
      `btn-${size}`,
      { 'btn-loading': loading, 'btn-disabled': disabled },
    ]"
    :disabled="disabled || loading"
  >
    <span v-if="loading" class="icon-spinner animate-spin mr-2" />
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  variant: "solid",
  size: "md",
  loading: false,
  disabled: false,
});
</script>
```

### 3. 主题变量

```css
/* 使用 CSS 变量 */
:root {
  --theme-color: #1890ff;
  --theme-color-rgb: 24, 144, 255;
  --primary-color: #1890ff;
  --primary-light: #40a9ff;
}

.dark {
  --theme-color: #40a9ff;
  --theme-color-rgb: 64, 169, 255;
  --primary-color: #40a9ff;
  --primary-light: #69c0ff;
}
```

---

这套 UnoCSS 配置为 cc-admin 框架提供了强大的样式系统，支持现代化的响应式设计和主题切换功能。
title: unocss
date: 2025-08-04 16:24:38
permalink: /pages/edcb18/
categories:

- guide
  tags:
- author:
  name: 文档作者
  link: https://github.com/your-username

---
