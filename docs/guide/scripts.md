---
title: 开发脚本
sidebar: auto
date: 2025-08-04 16:00:26
permalink: /pages/scripts/
categories:
  - guide
tags:
  - 脚本
  - 自动化
  - 开发工具
author:
  name: chichuang
  link: https://github.com/ichichuang
---

# 开发脚本

::: tip 🎯 自动化脚本
cc-admin 框架提供丰富的开发脚本，自动化开发流程，提高开发效率。
:::

## 🚀 基础脚本

### 开发命令

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",
    "serve": "vite preview",
    "type-check": "vue-tsc --noEmit",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore",
    "format": "prettier --write src/",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run"
  }
}
```

### 环境检查

```bash
# 检查 Node.js 版本
node --version

# 检查包管理器版本
npm --version
# 或
pnpm --version
# 或
yarn --version

# 检查全局依赖
npm list -g --depth=0
```

## 🔧 构建脚本

### 生产构建

```bash
#!/bin/bash
# build.sh

echo "开始构建生产版本..."

# 清理构建目录
rm -rf dist

# 类型检查
echo "执行类型检查..."
npm run type-check

# 代码检查
echo "执行代码检查..."
npm run lint

# 运行测试
echo "运行测试..."
npm run test:run

# 构建应用
echo "构建应用..."
npm run build

# 构建分析
echo "生成构建分析..."
npm run build:analyze

echo "构建完成！"
```

### 开发构建

```bash
#!/bin/bash
# dev-build.sh

echo "开始开发构建..."

# 清理缓存
rm -rf node_modules/.vite

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 🧪 测试脚本

### 单元测试

```bash
#!/bin/bash
# test.sh

echo "开始运行测试..."

# 运行所有测试
npm run test

# 生成测试覆盖率报告
npm run test:coverage

# 运行特定测试文件
npm run test -- components/

# 监听模式
npm run test:watch
```

### 集成测试

```bash
#!/bin/bash
# test:e2e.sh

echo "开始端到端测试..."

# 启动测试服务器
npm run test:serve &

# 等待服务器启动
sleep 5

# 运行 E2E 测试
npm run test:e2e

# 停止测试服务器
pkill -f "test:serve"
```

## 📊 分析脚本

### 包分析

```bash
#!/bin/bash
# analyze.sh

echo "开始包分析..."

# 构建应用
npm run build

# 生成包分析报告
npm run build:analyze

# 打开分析报告
open dist/stats.html
```

### 性能分析

```bash
#!/bin/bash
# performance.sh

echo "开始性能分析..."

# 启动性能监控
npm run dev -- --profile

# 生成性能报告
npm run build:profile

echo "性能分析完成！"
```

## 🔍 代码质量脚本

### 代码检查

```bash
#!/bin/bash
# lint.sh

echo "开始代码检查..."

# ESLint 检查
npm run lint

# Prettier 格式化
npm run format

# TypeScript 类型检查
npm run type-check

# 检查未使用的依赖
npm run depcheck

echo "代码检查完成！"
```

### 安全检查

```bash
#!/bin/bash
# security.sh

echo "开始安全检查..."

# 检查依赖漏洞
npm audit

# 修复自动修复的漏洞
npm audit fix

# 检查许可证
npm run license:check

echo "安全检查完成！"
```

## 🚀 部署脚本

### 自动部署

```bash
#!/bin/bash
# deploy.sh

echo "开始自动部署..."

# 构建生产版本
npm run build

# 压缩构建文件
tar -czf dist.tar.gz dist/

# 上传到服务器
scp dist.tar.gz user@server:/path/to/app/

# 在服务器上解压和部署
ssh user@server << 'EOF'
cd /path/to/app
tar -xzf dist.tar.gz
rm dist.tar.gz
sudo systemctl restart nginx
EOF

echo "部署完成！"
```

### Docker 部署

```bash
#!/bin/bash
# deploy:docker.sh

echo "开始 Docker 部署..."

# 构建 Docker 镜像
docker build -t cc-admin .

# 停止旧容器
docker stop cc-admin-container || true

# 删除旧容器
docker rm cc-admin-container || true

# 运行新容器
docker run -d \
  --name cc-admin-container \
  -p 80:80 \
  -e NODE_ENV=production \
  cc-admin

echo "Docker 部署完成！"
```

## 📦 发布脚本

### 版本发布

```bash
#!/bin/bash
# release.sh

echo "开始版本发布..."

# 获取版本号
VERSION=$(npm version patch)

# 构建应用
npm run build

# 创建发布标签
git add .
git commit -m "Release v$VERSION"
git tag v$VERSION

# 推送到远程仓库
git push origin main
git push origin v$VERSION

# 发布到 npm
npm publish

echo "版本 $VERSION 发布完成！"
```

### 文档发布

```bash
#!/bin/bash
# docs:deploy.sh

echo "开始文档发布..."

# 构建文档
npm run docs:build

# 部署到 GitHub Pages
npm run docs:deploy

echo "文档发布完成！"
```

## 🛠️ 工具脚本

### 开发工具

```bash
#!/bin/bash
# dev-tools.sh

echo "启动开发工具..."

# 启动开发服务器
npm run dev &

# 启动文档服务器
npm run docs:dev &

# 启动测试服务器
npm run test:ui &

echo "开发工具已启动！"
```

### 清理脚本

```bash
#!/bin/bash
# clean.sh

echo "开始清理..."

# 清理构建文件
rm -rf dist/
rm -rf .vite/
rm -rf node_modules/.cache/

# 清理测试文件
rm -rf coverage/
rm -rf .nyc_output/

# 清理日志文件
rm -rf logs/
rm -f *.log

echo "清理完成！"
```

## 🎯 最佳实践

### 脚本组织

::: tip 💡 脚本组织建议

1. **分类管理** - 按功能分类脚本
2. **命名规范** - 使用清晰的命名约定
3. **文档注释** - 为脚本添加详细注释
4. **错误处理** - 添加错误处理和回滚机制
   :::

### 开发建议

::: details 📋 开发建议详情

- 使用 shebang 指定解释器
- 添加脚本执行权限
- 使用环境变量管理配置
- 添加日志输出便于调试
- 实现脚本的幂等性
- 添加脚本执行时间统计
  :::

---

::: center
**开发脚本** - 让开发更高效！
:::

::: tip 💡 脚本特色

> 本开发脚本为 chichuang 原创，采用自定义商业限制许可证，仅供非商业用途使用。
> :::
> title: scripts
> date: 2025-08-04 18:12:25
> permalink: /pages/8f83c4/
> author:
> name: chichuang

## link: https://github.com/ichichuang
