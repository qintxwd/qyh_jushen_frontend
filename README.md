# QYH Jushen Web - Frontend

基于 Vue 3 + TypeScript 的机器人Web控制前端。

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 运行开发服务器

```bash
npm run dev
```

### 3. 访问

打开浏览器访问：http://localhost:3000

### 4. 构建生产版本

```bash
npm run build
```

## 技术栈

- **Vue 3**: 渐进式JavaScript框架
- **TypeScript**: 类型安全
- **Vite**: 快速构建工具
- **Element Plus**: UI组件库
- **Pinia**: 状态管理
- **Vue Router**: 路由管理
- **TresJS**: Three.js Vue封装（3D可视化）
- **Blockly**: 可视化编程

## 项目结构

```
frontend/
├── public/           # 静态资源
├── src/
│   ├── api/          # API 客户端
│   ├── assets/       # 资源文件
│   ├── components/   # Vue 组件
│   ├── router/       # 路由配置
│   ├── stores/       # Pinia 状态管理
│   ├── views/        # 页面组件
│   ├── App.vue       # 根组件
│   └── main.ts       # 应用入口
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 开发指南

参考 `../doc/dev/04_FRONTEND_GUIDE.md`
