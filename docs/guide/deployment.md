---
title: 部署指南
date: 2025-08-04 16:17:18
permalink: /pages/deployment/
categories:
  - guide
tags:
  - deployment
  - ci/cd
  - docker
  - vercel
author:
  name: cc-admin
  link: https://github.com/ichichuang/cc-admin
---

# 部署指南

本指南将帮助您了解如何将 cc-admin 项目部署到各种环境中，包括开发环境、测试环境和生产环境。

## 🚀 环境准备

### 构建前检查

在部署之前，请确保完成以下检查：

```bash
# 1. 运行所有检查
pnpm check

# 2. 类型检查
pnpm type-check

# 3. 代码检查
pnpm lint

# 4. 命名规范检查
pnpm naming-check

# 5. 环境检查
pnpm env-check

# 6. 版权检查
pnpm copyright:check
```

### 环境变量配置

创建生产环境配置文件：

```bash
# 复制生产环境配置
cp .env.example .env.production
```

编辑 `.env.production` 文件：

```env
# 应用配置
VITE_APP_TITLE=cc-admin
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=production

# 构建配置
VITE_PUBLIC_PATH=/
VITE_BUILD_SOURCEMAP=false
VITE_DROP_CONSOLE=true
VITE_DROP_DEBUGGER=true
VITE_COMPRESSION=gzip
VITE_LEGACY=true

# API 配置
VITE_API_BASE_URL=https://api.example.com

# 功能开关
VITE_MOCK_ENABLE=false
VITE_DEV_TOOLS=false
VITE_CONSOLE_LOG=false

# CDN 配置
VITE_CDN=false
```

## 📦 构建配置

### 生产构建

```bash
# 生产环境构建
pnpm build

# 分析构建结果
pnpm build:analyze

# 预览构建结果
pnpm preview
```

### 构建优化

#### 1. 代码分割配置

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vue 相关库
          vue: ["vue", "vue-router", "pinia"],
          // 工具库
          utils: ["alova", "lodash-es"],
          // UI 库
          ui: ["@unocss/reset"],
        },
      },
    },
  },
});
```

#### 2. 压缩配置

```typescript
// vite.config.ts
import compression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    compression({
      algorithm: "gzip",
      ext: ".gz",
    }),
    compression({
      algorithm: "brotliCompress",
      ext: ".br",
    }),
  ],
});
```

#### 3. 资源优化

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    assetsInlineLimit: 4096, // 4KB
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split(".");
          const ext = info[info.length - 1];
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(assetInfo.name)) {
            return `static/img/[name]-[hash].${ext}`;
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return `static/fonts/[name]-[hash].${ext}`;
          }
          return `static/[ext]/[name]-[hash].${ext}`;
        },
      },
    },
  },
});
```

## 🌐 静态部署

### 1. Nginx 部署

#### Nginx 配置

```nginx
# /etc/nginx/sites-available/cc-admin
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/cc-admin;
    index index.html;

    # Gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # 缓存配置
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 路由重写
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API 代理
    location /api {
        proxy_pass http://backend-server;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
```

#### 部署脚本

```bash
#!/bin/bash
# deploy.sh

# 构建项目
echo "Building project..."
pnpm build

# 备份当前版本
if [ -d "/var/www/cc-admin-backup" ]; then
    rm -rf /var/www/cc-admin-backup
fi
cp -r /var/www/cc-admin /var/www/cc-admin-backup

# 部署新版本
echo "Deploying new version..."
rm -rf /var/www/cc-admin/*
cp -r dist/* /var/www/cc-admin/

# 设置权限
chown -R www-data:www-data /var/www/cc-admin
chmod -R 755 /var/www/cc-admin

# 重启 Nginx
systemctl reload nginx

echo "Deployment completed!"
```

### 2. Apache 部署

#### Apache 配置

```apache
# /etc/apache2/sites-available/cc-admin.conf
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /var/www/cc-admin

    # 启用重写模块
    RewriteEngine On

    # 路由重写
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)$ /index.html [QSA,L]

    # 缓存配置
    <FilesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg)$">
        ExpiresActive On
        ExpiresDefault "access plus 1 year"
        Header set Cache-Control "public, immutable"
    </FilesMatch>

    # Gzip 压缩
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/plain
        AddOutputFilterByType DEFLATE text/html
        AddOutputFilterByType DEFLATE text/xml
        AddOutputFilterByType DEFLATE text/css
        AddOutputFilterByType DEFLATE application/xml
        AddOutputFilterByType DEFLATE application/xhtml+xml
        AddOutputFilterByType DEFLATE application/rss+xml
        AddOutputFilterByType DEFLATE application/javascript
        AddOutputFilterByType DEFLATE application/x-javascript
    </IfModule>

    # 安全头
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-XSS-Protection "1; mode=block"
    Header always set X-Content-Type-Options "nosniff"
</VirtualHost>
```

### 3. CDN 部署

#### 配置 CDN

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split(".");
          const ext = info[info.length - 1];
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(assetInfo.name)) {
            return `static/img/[name]-[hash].${ext}`;
          }
          return `static/[ext]/[name]-[hash].${ext}`;
        },
      },
    },
  },
  define: {
    __VITE_CDN__: JSON.stringify("https://cdn.example.com"),
  },
});
```

#### CDN 配置示例

```bash
# 上传到 CDN
aws s3 sync dist/ s3://your-bucket/ --delete

# 设置缓存策略
aws s3api put-bucket-policy --bucket your-bucket --policy file://cdn-policy.json
```

## 🐳 Docker 部署

### 1. 多阶段构建

```dockerfile
# Dockerfile
FROM node:22-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制包管理文件
COPY package.json pnpm-lock.yaml ./

# 安装 pnpm
RUN npm install -g pnpm

# 安装依赖
RUN pnpm install --frozen-lockfile

# 复制源代码
COPY . .

# 构建应用
RUN pnpm build

# 生产阶段
FROM nginx:alpine AS production

# 复制构建结果
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制 Nginx 配置
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
```

### 2. Nginx 配置

```nginx
# nginx.conf
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        # 缓存配置
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # 路由重写
        location / {
            try_files $uri $uri/ /index.html;
        }

        # 安全头
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header X-Content-Type-Options "nosniff" always;
    }
}
```

### 3. Docker Compose

```yaml
# docker-compose.yml
version: "3.8"

services:
  cc-admin:
    build: .
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    networks:
      - cc-admin-network

  # 可选：后端 API 服务
  api:
    image: your-api-image
    ports:
      - "8080:8080"
    environment:
      - DB_HOST=database
    depends_on:
      - database
    networks:
      - cc-admin-network

  # 可选：数据库
  database:
    image: postgres:15
    environment:
      POSTGRES_DB: cc_admin
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - cc-admin-network

volumes:
  postgres_data:

networks:
  cc-admin-network:
    driver: bridge
```

### 4. 部署脚本

```bash
#!/bin/bash
# docker-deploy.sh

# 构建镜像
echo "Building Docker image..."
docker build -t cc-admin:latest .

# 停止旧容器
echo "Stopping old container..."
docker stop cc-admin || true
docker rm cc-admin || true

# 启动新容器
echo "Starting new container..."
docker run -d \
  --name cc-admin \
  --restart unless-stopped \
  -p 80:80 \
  cc-admin:latest

echo "Deployment completed!"
```

## ☁️ 云平台部署

### 1. Vercel 部署

#### 项目配置

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
  ],
  "headers": [
    {
      "source": "/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

#### 环境变量配置

在 Vercel 控制台中设置环境变量：

```env
VITE_APP_TITLE=cc-admin
VITE_API_BASE_URL=https://api.example.com
VITE_APP_ENV=production
```

### 2. Netlify 部署

#### 项目配置

```toml
# netlify.toml
[build]
  command = "pnpm build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "22"
  NPM_FLAGS = "--version"

[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### 3. GitHub Pages 部署

#### GitHub Actions 配置

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "22"

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 10.12.4

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm build
        env:
          VITE_APP_ENV: production
          VITE_API_BASE_URL: ${{ secrets.API_BASE_URL }}

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 4. AWS S3 + CloudFront

#### S3 配置

```bash
# 创建 S3 存储桶
aws s3 mb s3://your-app-bucket

# 配置静态网站托管
aws s3 website s3://your-app-bucket --index-document index.html --error-document index.html

# 上传构建文件
aws s3 sync dist/ s3://your-app-bucket --delete

# 设置缓存策略
aws s3api put-bucket-policy --bucket your-app-bucket --policy file://s3-policy.json
```

#### CloudFront 配置

```json
// cloudfront-config.json
{
  "CallerReference": "cc-admin-deployment",
  "Comment": "cc-admin CDN distribution",
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-your-app-bucket",
    "ViewerProtocolPolicy": "redirect-to-https",
    "TrustedSigners": {
      "Enabled": false,
      "Quantity": 0
    },
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": {
        "Forward": "none"
      }
    },
    "MinTTL": 0,
    "DefaultTTL": 86400,
    "MaxTTL": 31536000
  },
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "S3-your-app-bucket",
        "DomainName": "your-app-bucket.s3.amazonaws.com",
        "S3OriginConfig": {
          "OriginAccessIdentity": ""
        }
      }
    ]
  },
  "Enabled": true,
  "PriceClass": "PriceClass_100"
}
```

## 🔧 CI/CD 配置

### 1. GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "22"

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 10.12.4

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run tests
        run: pnpm test

      - name: Type check
        run: pnpm type-check

      - name: Lint
        run: pnpm lint

      - name: Build
        run: pnpm build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "22"

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 10.12.4

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm build
        env:
          VITE_APP_ENV: production

      - name: Deploy to production
        run: |
          # 部署逻辑
          echo "Deploying to production..."
```

### 2. GitLab CI

```yaml
# .gitlab-ci.yml
stages:
  - test
  - build
  - deploy

variables:
  NODE_VERSION: "22"

cache:
  paths:
    - node_modules/

test:
  stage: test
  image: node:22-alpine
  before_script:
    - npm install -g pnpm
    - pnpm install --frozen-lockfile
  script:
    - pnpm test
    - pnpm type-check
    - pnpm lint

build:
  stage: build
  image: node:22-alpine
  before_script:
    - npm install -g pnpm
    - pnpm install --frozen-lockfile
  script:
    - pnpm build
  artifacts:
    paths:
      - dist/
    expire_in: 1 week

deploy:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache openssh-client
    - eval $(ssh-agent -s)
    - echo "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add -
    - mkdir -p ~/.ssh
    - chmod 700 ~/.ssh
  script:
    - scp -r dist/* user@server:/var/www/cc-admin/
    - ssh user@server "systemctl reload nginx"
  only:
    - main
```

## 📊 性能监控

### 1. 构建分析

```bash
# 分析构建包大小
pnpm build:analyze

# 查看构建报告
pnpm report
```

### 2. 性能监控

```typescript
// src/utils/performance.ts
export function trackPerformance() {
  // 监控页面加载性能
  window.addEventListener("load", () => {
    const navigation = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;

    console.log("页面加载时间:", {
      DNS查询: navigation.domainLookupEnd - navigation.domainLookupStart,
      TCP连接: navigation.connectEnd - navigation.connectStart,
      请求响应: navigation.responseEnd - navigation.requestStart,
      DOM解析:
        navigation.domContentLoadedEventEnd -
        navigation.domContentLoadedEventStart,
      页面完全加载: navigation.loadEventEnd - navigation.loadEventStart,
    });
  });
}
```

### 3. 错误监控

```typescript
// src/utils/error-tracking.ts
export function setupErrorTracking() {
  window.addEventListener("error", (event) => {
    console.error("JavaScript 错误:", {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error,
    });

    // 发送错误报告
    if (import.meta.env.PROD) {
      sendErrorReport(event);
    }
  });

  window.addEventListener("unhandledrejection", (event) => {
    console.error("未处理的 Promise 拒绝:", event.reason);

    if (import.meta.env.PROD) {
      sendErrorReport(event);
    }
  });
}
```

## 🔒 安全配置

### 1. HTTPS 配置

```nginx
# Nginx HTTPS 配置
server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # 其他配置...
}
```

### 2. 安全头配置

```nginx
# 安全头配置
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

### 3. CSP 配置

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    headers: {
      "Content-Security-Policy": [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https:",
        "font-src 'self'",
        "connect-src 'self' https:",
        "frame-ancestors 'none'",
      ].join("; "),
    },
  },
});
```

## 📚 最佳实践

### 1. 环境分离

- **开发环境**: 使用 Mock 数据，开启调试工具
- **测试环境**: 连接测试 API，开启详细日志
- **生产环境**: 关闭调试工具，优化性能

### 2. 缓存策略

- **静态资源**: 长期缓存（1 年）
- **HTML 文件**: 短期缓存（1 小时）
- **API 响应**: 根据业务需求设置

### 3. 监控告警

- 设置性能监控
- 配置错误告警
- 监控服务器资源

### 4. 备份策略

- 定期备份数据库
- 备份配置文件
- 建立回滚机制

通过本指南，您应该能够成功部署 cc-admin 项目到各种环境中，并确保应用的安全性和性能。
title: deployment
date: 2025-08-04 17:10:36
permalink: /pages/f4bd50/
categories:

- guide
  tags:
- author:
  name: 文档作者
  link: https://github.com/your-username

---
