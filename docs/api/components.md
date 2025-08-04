---
title: components
date: 2025-08-04 16:49:15
permalink: /pages/6fc226/
categories:
  - api
tags:
  - 
author: 
  name: 文档作者
  link: https://github.com/your-username
---
# 组件 API 参考

cc-admin 框架提供了丰富的组件库，支持快速构建企业级后台管理系统。

## 🎯 组件概览

### 基础组件

- **Button** - 按钮组件
- **Input** - 输入框组件
- **Select** - 选择器组件
- **Table** - 表格组件
- **Form** - 表单组件

### 布局组件

- **Layout** - 布局组件
- **Header** - 头部组件
- **Sidebar** - 侧边栏组件
- **Footer** - 底部组件
- **Container** - 容器组件

### 功能组件

- **Modal** - 模态框组件
- **Drawer** - 抽屉组件
- **Tabs** - 标签页组件
- **Breadcrumb** - 面包屑组件
- **Pagination** - 分页组件

## 🔧 基础组件

### Button 按钮组件

```vue
<template>
  <Button type="primary" size="medium" :loading="loading" @click="handleClick">
    点击按钮
  </Button>
</template>
```

#### Props

| 属性     | 类型                                                            | 默认值      | 说明     |
| -------- | --------------------------------------------------------------- | ----------- | -------- |
| type     | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error'` | `'primary'` | 按钮类型 |
| size     | `'small' \| 'medium' \| 'large'`                                | `'medium'`  | 按钮尺寸 |
| loading  | `boolean`                                                       | `false`     | 加载状态 |
| disabled | `boolean`                                                       | `false`     | 禁用状态 |
| icon     | `string`                                                        | -           | 图标名称 |

#### Events

| 事件名 | 参数                | 说明     |
| ------ | ------------------- | -------- |
| click  | `event: MouseEvent` | 点击事件 |

#### Slots

| 插槽名  | 说明     |
| ------- | -------- |
| default | 按钮内容 |
| icon    | 图标插槽 |

### Input 输入框组件

```vue
<template>
  <Input
    v-model="value"
    placeholder="请输入内容"
    :clearable="true"
    @change="handleChange"
  />
</template>
```

#### Props

| 属性        | 类型                                          | 默认值   | 说明       |
| ----------- | --------------------------------------------- | -------- | ---------- |
| modelValue  | `string \| number`                            | -        | 绑定值     |
| placeholder | `string`                                      | -        | 占位符     |
| clearable   | `boolean`                                     | `false`  | 是否可清空 |
| disabled    | `boolean`                                     | `false`  | 禁用状态   |
| readonly    | `boolean`                                     | `false`  | 只读状态   |
| type        | `'text' \| 'password' \| 'email' \| 'number'` | `'text'` | 输入类型   |

#### Events

| 事件名            | 参数                      | 说明         |
| ----------------- | ------------------------- | ------------ |
| update:modelValue | `value: string \| number` | 值更新事件   |
| change            | `value: string \| number` | 值改变事件   |
| focus             | `event: FocusEvent`       | 获得焦点事件 |
| blur              | `event: FocusEvent`       | 失去焦点事件 |

### Select 选择器组件

```vue
<template>
  <Select
    v-model="value"
    :options="options"
    placeholder="请选择"
    :multiple="false"
  />
</template>
```

#### Props

| 属性        | 类型       | 默认值  | 说明       |
| ----------- | ---------- | ------- | ---------- |
| modelValue  | `any`      | -       | 绑定值     |
| options     | `Option[]` | `[]`    | 选项列表   |
| placeholder | `string`   | -       | 占位符     |
| multiple    | `boolean`  | `false` | 是否多选   |
| clearable   | `boolean`  | `false` | 是否可清空 |
| disabled    | `boolean`  | `false` | 禁用状态   |

#### Option 类型

```typescript
interface Option {
  label: string;
  value: any;
  disabled?: boolean;
  children?: Option[];
}
```

## 🎨 布局组件

### Layout 布局组件

```vue
<template>
  <Layout>
    <Header />
    <Sidebar />
    <Container>
      <router-view />
    </Container>
    <Footer />
  </Layout>
</template>
```

#### Props

| 属性      | 类型                                  | 默认值    | 说明           |
| --------- | ------------------------------------- | --------- | -------------- |
| mode      | `'admin' \| 'fullscreen' \| 'screen'` | `'admin'` | 布局模式       |
| collapsed | `boolean`                             | `false`   | 侧边栏折叠状态 |

### Header 头部组件

```vue
<template>
  <Header>
    <template #logo>
      <img src="/logo.png" alt="Logo" />
    </template>
    <template #actions>
      <UserDropdown />
      <LanguageSwitch />
    </template>
  </Header>
</template>
```

#### Slots

| 插槽名     | 说明         |
| ---------- | ------------ |
| logo       | 品牌 Logo    |
| actions    | 右侧操作区域 |
| breadcrumb | 面包屑导航   |

### Sidebar 侧边栏组件

```vue
<template>
  <Sidebar :collapsed="collapsed">
    <Menu :routes="routes" />
  </Sidebar>
</template>
```

#### Props

| 属性      | 类型                | 默认值    | 说明     |
| --------- | ------------------- | --------- | -------- |
| collapsed | `boolean`           | `false`   | 折叠状态 |
| width     | `number`            | `240`     | 宽度     |
| theme     | `'light' \| 'dark'` | `'light'` | 主题     |

## 📊 功能组件

### Table 表格组件

```vue
<template>
  <Table
    :data="tableData"
    :columns="columns"
    :loading="loading"
    :pagination="pagination"
    @selection-change="handleSelectionChange"
  />
</template>
```

#### Props

| 属性       | 类型               | 默认值  | 说明           |
| ---------- | ------------------ | ------- | -------------- |
| data       | `any[]`            | `[]`    | 表格数据       |
| columns    | `Column[]`         | `[]`    | 列配置         |
| loading    | `boolean`          | `false` | 加载状态       |
| pagination | `PaginationConfig` | -       | 分页配置       |
| selection  | `boolean`          | `false` | 是否显示选择框 |

#### Column 类型

```typescript
interface Column {
  prop: string;
  label: string;
  width?: number | string;
  sortable?: boolean;
  fixed?: "left" | "right";
  render?: (row: any, column: Column, index: number) => VNode;
}
```

### Modal 模态框组件

```vue
<template>
  <Modal
    v-model:visible="visible"
    title="标题"
    :width="600"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <p>模态框内容</p>
  </Modal>
</template>
```

#### Props

| 属性         | 类型               | 默认值  | 说明             |
| ------------ | ------------------ | ------- | ---------------- |
| visible      | `boolean`          | `false` | 显示状态         |
| title        | `string`           | -       | 标题             |
| width        | `number \| string` | `520`   | 宽度             |
| closable     | `boolean`          | `true`  | 是否显示关闭按钮 |
| maskClosable | `boolean`          | `true`  | 点击遮罩是否关闭 |

#### Events

| 事件名 | 参数 | 说明     |
| ------ | ---- | -------- |
| ok     | -    | 确认事件 |
| cancel | -    | 取消事件 |

### Form 表单组件

```vue
<template>
  <Form :model="formData" :rules="rules" ref="formRef" @submit="handleSubmit">
    <FormItem label="用户名" prop="username">
      <Input v-model="formData.username" />
    </FormItem>
    <FormItem label="邮箱" prop="email">
      <Input v-model="formData.email" type="email" />
    </FormItem>
    <FormItem>
      <Button type="primary" html-type="submit">提交</Button>
    </FormItem>
  </Form>
</template>
```

#### Props

| 属性       | 类型                                     | 默认值         | 说明         |
| ---------- | ---------------------------------------- | -------------- | ------------ |
| model      | `object`                                 | -              | 表单数据对象 |
| rules      | `object`                                 | -              | 验证规则     |
| layout     | `'horizontal' \| 'vertical' \| 'inline'` | `'horizontal'` | 布局方式     |
| labelWidth | `number \| string`                       | -              | 标签宽度     |

## 🎯 使用示例

### 完整页面示例

```vue
<template>
  <Layout>
    <Header>
      <template #logo>
        <img src="/logo.png" alt="Logo" />
      </template>
      <template #actions>
        <UserDropdown />
        <LanguageSwitch />
      </template>
    </Header>

    <Sidebar :collapsed="sidebarCollapsed">
      <Menu :routes="menuRoutes" />
    </Sidebar>

    <Container>
      <Breadcrumb :items="breadcrumbItems" />

      <div class="page-content">
        <div class="page-header">
          <h1>{{ pageTitle }}</h1>
          <div class="page-actions">
            <Button type="primary" @click="handleAdd"> 新增 </Button>
          </div>
        </div>

        <Table
          :data="tableData"
          :columns="columns"
          :loading="loading"
          :pagination="pagination"
          @selection-change="handleSelectionChange"
        />
      </div>
    </Container>
  </Layout>

  <!-- 新增模态框 -->
  <Modal v-model:visible="modalVisible" title="新增用户" @ok="handleModalOk">
    <Form :model="formData" :rules="formRules" ref="formRef">
      <FormItem label="用户名" prop="username">
        <Input v-model="formData.username" />
      </FormItem>
      <FormItem label="邮箱" prop="email">
        <Input v-model="formData.email" type="email" />
      </FormItem>
    </Form>
  </Modal>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useUserStore } from "@/stores";

// 状态
const sidebarCollapsed = ref(false);
const loading = ref(false);
const modalVisible = ref(false);
const formRef = ref();

// 表单数据
const formData = reactive({
  username: "",
  email: "",
});

// 表单验证规则
const formRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" },
  ],
};

// 表格配置
const columns = [
  { prop: "username", label: "用户名" },
  { prop: "email", label: "邮箱" },
  { prop: "role", label: "角色" },
  {
    prop: "actions",
    label: "操作",
    render: (row: any) => (
      <div>
        <Button size="small" onClick={() => handleEdit(row)}>
          编辑
        </Button>
        <Button size="small" type="danger" onClick={() => handleDelete(row)}>
          删除
        </Button>
      </div>
    ),
  },
];

// 方法
const handleAdd = () => {
  modalVisible.value = true;
};

const handleModalOk = async () => {
  try {
    await formRef.value.validate();
    // 提交表单逻辑
    modalVisible.value = false;
  } catch (error) {
    console.error("表单验证失败:", error);
  }
};

const handleEdit = (row: any) => {
  // 编辑逻辑
};

const handleDelete = (row: any) => {
  // 删除逻辑
};

const handleSelectionChange = (selection: any[]) => {
  // 选择变化逻辑
};
</script>
```

## 🎨 主题定制

### CSS 变量

```css
:root {
  /* 主色调 */
  --primary-color: #1890ff;
  --primary-hover: #40a9ff;
  --primary-active: #096dd9;

  /* 成功色 */
  --success-color: #52c41a;
  --success-hover: #73d13d;
  --success-active: #389e0d;

  /* 警告色 */
  --warning-color: #faad14;
  --warning-hover: #ffc53d;
  --warning-active: #d48806;

  /* 错误色 */
  --error-color: #f5222d;
  --error-hover: #ff4d4f;
  --error-active: #cf1322;

  /* 文字色 */
  --text-color: #262626;
  --text-color-secondary: #8c8c8c;
  --text-color-disabled: #bfbfbf;

  /* 背景色 */
  --bg-color: #ffffff;
  --bg-color-secondary: #fafafa;
  --bg-color-disabled: #f5f5f5;

  /* 边框色 */
  --border-color: #d9d9d9;
  --border-color-light: #f0f0f0;

  /* 圆角 */
  --border-radius: 6px;
  --border-radius-sm: 4px;
  --border-radius-lg: 8px;

  /* 阴影 */
  --box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  --box-shadow-light: 0 1px 4px rgba(0, 0, 0, 0.1);
}
```

### 深色主题

```css
.dark {
  --primary-color: #40a9ff;
  --primary-hover: #69c0ff;
  --primary-active: #1890ff;

  --text-color: #ffffff;
  --text-color-secondary: #a6a6a6;
  --text-color-disabled: #595959;

  --bg-color: #141414;
  --bg-color-secondary: #1f1f1f;
  --bg-color-disabled: #262626;

  --border-color: #434343;
  --border-color-light: #303030;
}
```

---

这套组件库为 cc-admin 框架提供了丰富的 UI 组件，支持快速构建企业级后台管理系统。
title: components
date: 2025-08-04 16:49:15
permalink: /pages/4bbb87/
categories:

- api
  tags:
- author:
  name: 文档作者
  link: https://github.com/your-username

---
