# 使用说明

## 项目清理完成

我已经成功将 VuePress vdoing 主题框架清理为一个空壳，供您编写自己的文档。

## 已完成的清理工作

### ✅ 删除的内容

- 所有示例文档和文章
- 原有的博客内容
- 不需要的配置文件
- 百度统计、评论等第三方服务配置
- 本地主题包（使用 npm 包）
- 部署脚本和工具

### ✅ 保留的内容

- VuePress 基础框架
- vdoing 主题
- 基本的配置文件
- 必要的插件（代码复制、图片缩放、站点地图）
- 项目结构和依赖

### ✅ 新增的内容

- 简化的配置文件
- 基本的文档结构（guide/、api/）
- 示例文档页面
- 更新的 README 和项目信息

## 当前项目结构

```
docs/
├── .vuepress/          # VuePress 配置
│   ├── config.ts       # 主配置文件
│   ├── enhanceApp.js   # 应用增强
│   ├── public/         # 静态资源
│   ├── styles/         # 样式文件
│   └── plugins/        # 插件配置
├── guide/              # 指南文档
│   └── README.md       # 指南首页
├── api/                # API 文档
│   └── README.md       # API 首页
└── index.md           # 网站首页
```

## 如何开始编写文档

### 1. 启动开发服务器

```bash
npm run dev
```

服务器将在 http://localhost:8080 运行

### 2. 编写文档

- 在 `docs/` 目录下创建 `.md` 文件
- 使用 Markdown 语法编写内容
- 添加 frontmatter 配置页面属性

### 3. 自定义配置

编辑 `docs/.vuepress/config.ts` 文件：

- 修改网站标题和描述
- 调整导航菜单
- 更改主题配置
- 添加或删除插件

### 4. 构建部署

```bash
npm run build
```

构建后的文件在 `docs/.vuepress/dist/` 目录

## 主要配置文件说明

### docs/.vuepress/config.ts

- 网站基本信息
- 导航菜单配置
- 主题配置
- 插件配置

### docs/index.md

- 网站首页内容

### package.json

- 项目依赖
- 构建脚本

## 下一步建议

1. **修改网站信息**：更新 `config.ts` 中的标题、描述、作者信息
2. **添加您的文档**：在 `docs/` 目录下创建您的文档
3. **自定义样式**：在 `docs/.vuepress/styles/` 中添加自定义 CSS
4. **添加静态资源**：将图片等资源放在 `docs/.vuepress/public/` 目录
5. **配置部署**：根据您的部署平台配置相应的部署脚本

## 注意事项

- 确保所有 Markdown 文件都有正确的 frontmatter
- 图片路径使用相对路径或绝对路径
- 代码块支持语法高亮
- 支持 Vue 组件在 Markdown 中使用

现在您可以开始编写您的 Vue3+TypeScript 框架文档了！
