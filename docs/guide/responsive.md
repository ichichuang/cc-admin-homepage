---
title: 响应式适配
sidebar: auto
date: 2025-08-04 16:00:26
permalink: /pages/responsive/
categories:
  - guide
tags:
  - 响应式
  - 移动端
  - 适配
author:
  name: chichuang
  link: https://github.com/ichichuang
---

# 响应式适配

::: tip 🎯 响应式设计
cc-admin 框架采用现代化的响应式设计，完美适配桌面端和移动端。
:::

## 📱 移动端适配

### 断点设计

::: cardList

```yaml
- name: 小屏设备
  desc: < 768px，手机竖屏
  bgColor: '#CBEAFA'
  textColor: '#6854A1'
- name: 中屏设备
  desc: 768px - 1024px，平板设备
  bgColor: '#718971'
  textColor: '#fff'
- name: 大屏设备
  desc: > 1024px，桌面端
  bgColor: '#FCDBA0'
  textColor: '#A05F2C'
```

:::

### 移动端特性

::: details 📋 移动端特性详情

- **触摸优化** - 支持触摸手势和滑动操作
- **性能优化** - 针对移动端性能进行优化
- **布局适配** - 响应式布局自动适配
- **交互优化** - 移动端友好的交互设计
  :::

## 🖥️ 桌面端优化

### 桌面端特性

::: cardList

```yaml
- name: 键盘快捷键
  desc: 支持键盘快捷键操作
  bgColor: "#DFEEE7"
  textColor: "#2A3344"
- name: 多窗口支持
  desc: 支持多窗口和标签页操作
  bgColor: "#F0DFB1"
  textColor: "#242A38"
- name: 高分辨率
  desc: 支持高分辨率显示器
  bgColor: "#E8F4FD"
  textColor: "#2E5B88"
```

:::

## 🎨 样式适配

### CSS 媒体查询

```scss
// 移动端样式
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .sidebar {
    display: none;
  }

  .main-content {
    width: 100%;
  }
}

// 平板样式
@media (min-width: 769px) and (max-width: 1024px) {
  .container {
    padding: 1.5rem;
  }
}

// 桌面端样式
@media (min-width: 1025px) {
  .container {
    padding: 2rem;
  }
}
```

### UnoCSS 响应式

```html
<!-- 响应式类名 -->
<div class="w-full md:w-1/2 lg:w-1/3">
  <!-- 内容 -->
</div>

<!-- 响应式间距 -->
<div class="p-4 md:p-6 lg:p-8">
  <!-- 内容 -->
</div>

<!-- 响应式字体 -->
<h1 class="text-2xl md:text-3xl lg:text-4xl">
  <!-- 标题 -->
</h1>
```

## 🔧 组件适配

### 响应式组件

::: details 📋 组件适配详情

- **导航栏** - 移动端折叠菜单
- **侧边栏** - 移动端抽屉式设计
- **表格** - 移动端卡片式展示
- **表单** - 移动端优化布局
  :::

### 交互适配

::: cardList

```yaml
- name: 触摸手势
  desc: 支持滑动、缩放等手势
  bgColor: "#CBEAFA"
  textColor: "#6854A1"
- name: 键盘操作
  desc: 支持键盘快捷键
  bgColor: "#718971"
  textColor: "#fff"
- name: 鼠标操作
  desc: 桌面端鼠标交互
  bgColor: "#FCDBA0"
  textColor: "#A05F2C"
```

:::

## 📊 性能优化

### 移动端优化

::: details 📋 性能优化详情

1. **图片懒加载** - 减少初始加载时间
2. **代码分割** - 按需加载组件
3. **缓存策略** - 优化网络请求
4. **压缩优化** - 减少包体积
   :::

### 桌面端优化

::: cardList

```yaml
- name: 预加载
  desc: 预加载关键资源
  bgColor: "#DFEEE7"
  textColor: "#2A3344"
- name: 缓存优化
  desc: 智能缓存策略
  bgColor: "#F0DFB1"
  textColor: "#242A38"
- name: 渲染优化
  desc: 优化渲染性能
  bgColor: "#E8F4FD"
  textColor: "#2E5B88"
```

:::

## 🎯 最佳实践

### 设计原则

::: tip 💡 设计原则

1. **移动优先** - 优先考虑移动端体验
2. **渐进增强** - 在基础功能上增强体验
3. **性能优先** - 确保在各种设备上的性能
4. **一致性** - 保持跨设备的一致性
   :::

### 开发建议

::: details 📋 开发建议详情

- 使用 CSS Grid 和 Flexbox 进行布局
- 采用相对单位（rem、em、%）而非固定像素
- 测试各种设备和浏览器
- 关注性能指标和用户体验
  :::

---

::: center
**响应式适配** - 让应用在任何设备上都能完美运行！
:::

::: tip 💡 适配特色

> 本响应式适配指南为 chichuang 原创，采用自定义商业限制许可证，仅供非商业用途使用。
> :::
