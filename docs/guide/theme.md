---
title: 主题系统
sidebar: auto
date: 2025-08-04 16:00:26
permalink: /pages/theme/
categories:
  - guide
tags:
  - 主题
  - 深色模式
  - 样式
author:
  name: chichuang
  link: https://github.com/ichichuang
---

# 主题系统

::: tip 🎯 主题系统
cc-admin 框架提供完整的主题系统，支持深色/浅色模式切换和多色系主题。
:::

## 🌓 深色/浅色模式

### 模式切换

::: cardList

```yaml
- name: 浅色模式
  desc: 明亮清晰的界面设计
  bgColor: "#CBEAFA"
  textColor: "#6854A1"
- name: 深色模式
  desc: 护眼舒适的深色界面
  bgColor: "#718971"
  textColor: "#fff"
- name: 自动模式
  desc: 跟随系统设置自动切换
  bgColor: "#FCDBA0"
  textColor: "#A05F2C"
```

:::

### 主题配置

```typescript
// 主题配置
const themeConfig = {
  // 默认主题模式
  defaultMode: "auto", // 'light' | 'dark' | 'auto'

  // 主题色配置
  colors: {
    primary: "#11a8cd",
    success: "#34c759",
    warning: "#ff9500",
    danger: "#ff3b30",
    info: "#5ac8fa",
  },

  // 深色模式配置
  dark: {
    background: "#1a1a1a",
    surface: "#2d2d2d",
    text: "#ffffff",
    textSecondary: "#a0a0a0",
  },

  // 浅色模式配置
  light: {
    background: "#ffffff",
    surface: "#f8f9fa",
    text: "#2c3e50",
    textSecondary: "#7f8c8d",
  },
};
```

## 🎨 多色系主题

### 预设主题

::: cardList

```yaml
- name: 蓝色主题
  desc: 科技感十足的蓝色系
  bgColor: "#DFEEE7"
  textColor: "#2A3344"
- name: 绿色主题
  desc: 自然清新的绿色系
  bgColor: "#F0DFB1"
  textColor: "#242A38"
- name: 紫色主题
  desc: 优雅神秘的紫色系
  bgColor: "#E8F4FD"
  textColor: "#2E5B88"
- name: 橙色主题
  desc: 活力四射的橙色系
  bgColor: "#F5E6E8"
  textColor: "#8B5A7C"
```

:::

### 自定义主题

```scss
// 自定义主题变量
:root {
  // 主色调
  --primary-color: #11a8cd;
  --primary-light: #4fc3f7;
  --primary-dark: #0277bd;

  // 辅助色
  --success-color: #34c759;
  --warning-color: #ff9500;
  --danger-color: #ff3b30;
  --info-color: #5ac8fa;

  // 中性色
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;
}

// 深色模式变量
[data-theme="dark"] {
  --primary-color: #4fc3f7;
  --background-color: #1a1a1a;
  --surface-color: #2d2d2d;
  --text-color: #ffffff;
  --text-secondary: #a0a0a0;
}
```

## 🔧 主题切换

### 组件使用

```vue
<template>
  <div class="theme-switcher">
    <button
      @click="switchTheme('light')"
      :class="{ active: theme === 'light' }"
    >
      浅色模式
    </button>
    <button @click="switchTheme('dark')" :class="{ active: theme === 'dark' }">
      深色模式
    </button>
    <button @click="switchTheme('auto')" :class="{ active: theme === 'auto' }">
      自动模式
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const theme = ref("auto");

const switchTheme = (mode: string) => {
  theme.value = mode;
  document.documentElement.setAttribute("data-theme", mode);
  localStorage.setItem("theme", mode);
};

onMounted(() => {
  const savedTheme = localStorage.getItem("theme") || "auto";
  switchTheme(savedTheme);
});
</script>
```

### 主题钩子

```typescript
// 主题钩子
import { ref, watch } from "vue";

export function useTheme() {
  const theme = ref("auto");

  const setTheme = (newTheme: string) => {
    theme.value = newTheme;
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme.value === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  // 监听系统主题变化
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleSystemThemeChange = (e: MediaQueryListEvent) => {
    if (theme.value === "auto") {
      setTheme(e.matches ? "dark" : "light");
    }
  };

  mediaQuery.addEventListener("change", handleSystemThemeChange);

  return {
    theme,
    setTheme,
    toggleTheme,
  };
}
```

## 🎯 样式系统

### CSS 变量

```scss
// 主题变量定义
.theme-variables {
  // 颜色变量
  --color-primary: #11a8cd;
  --color-success: #34c759;
  --color-warning: #ff9500;
  --color-danger: #ff3b30;
  --color-info: #5ac8fa;

  // 背景变量
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --bg-tertiary: #e9ecef;

  // 文本变量
  --text-primary: #2c3e50;
  --text-secondary: #7f8c8d;
  --text-muted: #a0a0a0;

  // 边框变量
  --border-color: #e1e5e9;
  --border-radius: 8px;

  // 阴影变量
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
}

// 深色模式变量
[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --bg-tertiary: #404040;

  --text-primary: #ffffff;
  --text-secondary: #a0a0a0;
  --text-muted: #666666;

  --border-color: #404040;
}
```

### 组件样式

```vue
<template>
  <div class="theme-component">
    <div class="card">
      <h3>主题卡片</h3>
      <p>这是一个支持主题切换的组件</p>
      <button class="btn-primary">主要按钮</button>
      <button class="btn-secondary">次要按钮</button>
    </div>
  </div>
</template>

<style scoped>
.theme-component {
  padding: 1rem;
}

.card {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
}

.card h3 {
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.card p {
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.btn-primary {
  background-color: var(--color-primary);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  margin-right: 0.5rem;
}

.btn-secondary {
  background-color: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
}
</style>
```

## 📱 响应式主题

### 移动端适配

::: details 📋 移动端主题详情

- **触摸优化** - 移动端友好的主题切换按钮
- **性能优化** - 减少主题切换时的重绘
- **动画效果** - 平滑的主题切换动画
- **手势支持** - 支持手势切换主题
  :::

### 桌面端特性

::: cardList

```yaml
- name: 快捷键
  desc: 支持键盘快捷键切换主题
  bgColor: "#CBEAFA"
  textColor: "#6854A1"
- name: 系统同步
  desc: 自动跟随系统主题设置
  bgColor: "#718971"
  textColor: "#fff"
- name: 高分辨率
  desc: 支持高分辨率显示器
  bgColor: "#FCDBA0"
  textColor: "#A05F2C"
```

:::

## 🎨 最佳实践

### 设计原则

::: tip 💡 设计原则

1. **一致性** - 保持主题切换的一致性
2. **可访问性** - 确保深色模式的对比度
3. **性能** - 优化主题切换的性能
4. **用户体验** - 提供流畅的切换体验
   :::

### 开发建议

::: details 📋 开发建议详情

- 使用 CSS 变量定义主题颜色
- 避免硬编码颜色值
- 测试各种主题模式下的显示效果
- 考虑色盲用户的体验
- 提供主题预览功能
  :::

---

::: center
**主题系统** - 让应用拥有完美的视觉体验！
:::

::: tip 💡 主题特色

> 本主题系统为 chichuang 原创，采用自定义商业限制许可证，仅供非商业用途使用。
> :::
> title: theme
> date: 2025-08-04 18:10:46
> permalink: /pages/d4ef6b/
> author:
> name: chichuang

## link: https://github.com/ichichuang
