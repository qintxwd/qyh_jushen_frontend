# 📦 SVG图标使用指南

## 📂 图标位置

所有SVG图标都保存在：
```
public/icons/svg/
├── document.svg
├── setting.svg
├── camera.svg
├── ... (共70个)
└── index.html  ← 浏览器预览所有图标
```

## 🎨 使用方式

### 方式1: 使用 SvgIcon 组件（推荐）

```vue
<script setup>
import SvgIcon from '@/components/SvgIcon.vue'
</script>

<template>
  <!-- 基础使用 -->
  <SvgIcon name="document" />
  
  <!-- 自定义大小 -->
  <SvgIcon name="setting" :size="24" />
  
  <!-- 使用主题色 -->
  <SvgIcon name="camera" :size="20" class="primary" />
  <SvgIcon name="delete" :size="20" class="danger" />
  <SvgIcon name="check" :size="20" class="success" />
  
  <!-- 在按钮中使用 -->
  <el-button type="primary">
    <SvgIcon name="document" :size="16" class="primary" />
    查看文档
  </el-button>
</template>
```

### 方式2: 直接使用 img 标签

```vue
<template>
  <img src="/icons/svg/document.svg" width="24" height="24" alt="文档">
  <img src="/icons/svg/setting.svg" width="20" height="20" alt="设置">
</template>
```

### 方式3: CSS 背景图

```vue
<template>
  <div class="icon-document"></div>
</template>

<style scoped>
.icon-document {
  width: 24px;
  height: 24px;
  background-image: url('/icons/svg/document.svg');
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
```

### 方式4: 内联 SVG（需要手动复制）

```vue
<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <!-- SVG路径 -->
  </svg>
</template>
```

## 📋 完整图标列表

查看所有可用图标，在浏览器打开：
```
public/icons/svg/index.html
```

或访问：`http://localhost:5173/icons/svg/index.html`（开发服务器运行时）

### 常用图标

| 图标名 | 用途 | 使用示例 |
|-------|-----|---------|
| `document` | 文档 | `<SvgIcon name="document" :size="20" />` |
| `setting` | 设置 | `<SvgIcon name="setting" :size="20" />` |
| `camera` | 相机 | `<SvgIcon name="camera" :size="20" />` |
| `videocamera` | 摄像机 | `<SvgIcon name="videocamera" :size="20" />` |
| `delete` | 删除 | `<SvgIcon name="delete" :size="20" />` |
| `edit` | 编辑 | `<SvgIcon name="edit" :size="20" />` |
| `search` | 搜索 | `<SvgIcon name="search" :size="20" />` |
| `refresh` | 刷新 | `<SvgIcon name="refresh" :size="20" />` |
| `upload` | 上传 | `<SvgIcon name="upload" :size="20" />` |
| `download` | 下载 | `<SvgIcon name="download" :size="20" />` |
| `close` | 关闭 | `<SvgIcon name="close" :size="20" />` |
| `menu` | 菜单 | `<SvgIcon name="menu" :size="20" />` |
| `check` | 勾选 | `<SvgIcon name="check" :size="20" />` |
| `lock` | 锁定 | `<SvgIcon name="lock" :size="20" />` |
| `unlock` | 解锁 | `<SvgIcon name="unlock" :size="20" />` |

## 🎨 主题色类名

SvgIcon 组件支持主题色类名：

```vue
<SvgIcon name="document" class="primary" />   <!-- 橙色 #F59E0B -->
<SvgIcon name="check" class="success" />      <!-- 绿色 #10B981 -->
<SvgIcon name="delete" class="danger" />      <!-- 红色 #EF4444 -->
<SvgIcon name="warning" class="warning" />    <!-- 橙色 #F59E0B -->
```

## 📏 尺寸规范

```vue
<!-- 小 - 按钮内图标 -->
<SvgIcon name="document" :size="16" />

<!-- 中 - 菜单/列表图标 -->
<SvgIcon name="document" :size="20" />

<!-- 大 - 工具栏图标 -->
<SvgIcon name="document" :size="24" />

<!-- 特大 - 功能区图标 -->
<SvgIcon name="document" :size="32" />
```

## 🔧 在 Element Plus 组件中使用

### 按钮
```vue
<el-button type="primary">
  <SvgIcon name="document" :size="16" class="primary" />
  <span style="margin-left: 8px">文档</span>
</el-button>
```

### 菜单
```vue
<el-menu-item>
  <SvgIcon name="setting" :size="18" />
  <span>系统设置</span>
</el-menu-item>
```

### 标签页
```vue
<el-tab-pane>
  <template #label>
    <span style="display: flex; align-items: center; gap: 6px;">
      <SvgIcon name="camera" :size="16" />
      相机控制
    </span>
  </template>
</el-tab-pane>
```

### 表格操作列
```vue
<el-table-column label="操作">
  <template #default="scope">
    <el-button link @click="handleEdit(scope.row)">
      <SvgIcon name="edit" :size="16" class="primary" />
    </el-button>
    <el-button link @click="handleDelete(scope.row)">
      <SvgIcon name="delete" :size="16" class="danger" />
    </el-button>
  </template>
</el-table-column>
```

## 💡 实用技巧

### 1. 图标动画

```vue
<template>
  <SvgIcon name="refresh" :size="24" class="spin-icon" />
</template>

<style scoped>
.spin-icon {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
```

### 2. 悬停效果

```vue
<template>
  <SvgIcon name="setting" :size="24" class="hover-icon" />
</template>

<style scoped>
.hover-icon {
  transition: transform 0.3s;
  cursor: pointer;
}

.hover-icon:hover {
  transform: scale(1.2);
}
</style>
```

### 3. 响应式尺寸

```vue
<script setup>
import { computed } from 'vue'

const isMobile = computed(() => window.innerWidth < 768)
const iconSize = computed(() => isMobile.value ? 16 : 24)
</script>

<template>
  <SvgIcon name="document" :size="iconSize" />
</template>
```

## 🔍 查找图标

1. 打开 `public/icons/svg/index.html`
2. 使用搜索框过滤图标
3. 点击图标复制文件路径
4. 使用路径中的文件名（不含.svg）作为name属性

## 📦 全部图标名称

```
aim, arrowdown, arrowup, back, bottom, box, camera, caretright, 
check, circlecheck, circleclosefilled, clock, close, closebold, 
connection, copydocument, cpu, dataline, dcaret, delete, document, 
documentchecked, documentcopy, download, edit, expand, files, fold, 
folderopened, folderremove, fullscreen, goods, grid, infofilled, 
lightning, location, locationfilled, lock, maplocation, menu, minus, 
monitor, moon, morefilled, odometer, orange, plus, pointer, position, 
refresh, refreshleft, refreshright, scissor, search, setting, star, 
sunny, switchbutton, tickets, top, unlock, upload, van, videocamera, 
videopause, videoplay, view, warningfilled, warntrianglefilled, zoomin
```

## ⚠️ 注意事项

1. **图标名称全部小写**：文件名是小写，使用时也要小写
2. **检查文件是否存在**：确保SVG文件在 `public/icons/svg/` 目录中
3. **开发服务器**：确保开发服务器正在运行才能访问 `/icons/svg/` 路径
4. **颜色限制**：CSS filter 改色对复杂多色SVG效果有限，建议使用单色SVG

---

**创建时间**: 2026-01-04  
**图标总数**: 70  
**图标来源**: Material Design Icons (Iconify)
