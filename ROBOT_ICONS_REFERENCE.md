# 🤖 机器人系统图标参考

## 📋 新增机器人专用图标 (42个)

所有图标已下载到 `public/icons/svg/` 目录。

### 🦾 机器人组件

| 图标名称 | 用途 | 使用示例 |
|---------|------|---------|
| `robot-arm` | 机械臂（通用） | `<SvgIcon name="robot-arm" :size="24" />` |
| `robot-arm-dual` | 双臂模式 | `<SvgIcon name="robot-arm-dual" :size="24" />` |
| `gripper` | 夹爪（闭合） | `<SvgIcon name="gripper" :size="20" />` |
| `gripper-open` | 夹爪（张开） | `<SvgIcon name="gripper-open" :size="20" />` |
| `chassis` | 移动底盘 | `<SvgIcon name="chassis" :size="24" />` |
| `head` | 头部旋转 | `<SvgIcon name="head" :size="20" />` |
| `lift` | 升降机构 | `<SvgIcon name="lift" :size="20" />` |
| `waist` | 腰部旋转 | `<SvgIcon name="waist" :size="20" />` |

### 🎮 控制模式

| 图标名称 | 用途 | 使用示例 |
|---------|------|---------|
| `vr` | VR遥操作 | `<SvgIcon name="vr" :size="24" />` |
| `teach-mode` | 示教模式 | `<SvgIcon name="teach-mode" :size="24" />` |
| `auto-mode` | 自动模式 | `<SvgIcon name="auto-mode" :size="24" />` |
| `manual-mode` | 手动模式 | `<SvgIcon name="manual-mode" :size="24" />` |
| `servo-mode` | 伺服模式 | `<SvgIcon name="servo-mode" :size="24" />` |

### 🎯 运动控制

| 图标名称 | 用途 | 使用示例 |
|---------|------|---------|
| `arm-joint` | 关节空间 | `<SvgIcon name="arm-joint" :size="20" />` |
| `arm-cartesian` | 笛卡尔空间 | `<SvgIcon name="arm-cartesian" :size="20" />` |
| `execute-move` | 执行移动 | `<SvgIcon name="execute-move" :size="24" />` |
| `home-position` | 回正/原点 | `<SvgIcon name="home-position" :size="20" />` |
| `navigate-target` | 导航到目标 | `<SvgIcon name="navigate-target" :size="24" />` |
| `force-control` | 力控模式 | `<SvgIcon name="force-control" :size="20" />` |

### ⚡ 电源与使能

| 图标名称 | 用途 | 使用示例 |
|---------|------|---------|
| `power-on` | 上电 | `<SvgIcon name="power-on" :size="20" class="success" />` |
| `power-off` | 下电 | `<SvgIcon name="power-off" :size="20" class="danger" />` |
| `enable` | 使能 | `<SvgIcon name="enable" :size="20" class="primary" />` |
| `disable` | 去使能 | `<SvgIcon name="disable" :size="20" />` |

### 🚨 安全控制

| 图标名称 | 用途 | 使用示例 |
|---------|------|---------|
| `emergency-stop` | 急停 | `<SvgIcon name="emergency-stop" :size="32" class="danger" />` |
| `slow-obstacle` | 减速避障 | `<SvgIcon name="slow-obstacle" :size="20" class="warning" />` |
| `pause-obstacle` | 障碍暂停 | `<SvgIcon name="pause-obstacle" :size="20" class="warning" />` |
| `collision` | 碰撞检测 | `<SvgIcon name="collision" :size="20" class="danger" />` |

### 🎬 视图控制

| 图标名称 | 用途 | 使用示例 |
|---------|------|---------|
| `scene-3d` | 3D场景 | `<SvgIcon name="scene-3d" :size="24" />` |
| `view-top` | 俯视图 | `<SvgIcon name="view-top" :size="20" />` |
| `view-front` | 前视图 | `<SvgIcon name="view-front" :size="20" />` |
| `view-reset` | 重置视角 | `<SvgIcon name="view-reset" :size="20" />` |

### 🪟 界面布局

| 图标名称 | 用途 | 使用示例 |
|---------|------|---------|
| `window-single` | 单窗口模式 | `<SvgIcon name="window-single" :size="20" />` |
| `window-split` | 分屏模式 | `<SvgIcon name="window-split" :size="20" />` |
| `toggle-panel` | 切换属性面板 | `<SvgIcon name="toggle-panel" :size="20" />` |

### 📊 任务与数据

| 图标名称 | 用途 | 使用示例 |
|---------|------|---------|
| `task` | 任务列表 | `<SvgIcon name="task" :size="24" />` |
| `data-collection` | 数据采集 | `<SvgIcon name="data-collection" :size="24" />` |
| `initializing` | 等待初始化 | `<SvgIcon name="initializing" :size="20" />` |

### ⚙️ 速度控制

| 图标名称 | 用途 | 使用示例 |
|---------|------|---------|
| `speed-slow` | 慢速 | `<SvgIcon name="speed-slow" :size="20" />` |
| `speed-medium` | 中速 | `<SvgIcon name="speed-medium" :size="20" />` |
| `speed-fast` | 快速 | `<SvgIcon name="speed-fast" :size="20" />` |

## 💡 使用示例

### 1. 基础使用

```vue
<template>
  <!-- 机械臂控制按钮 -->
  <el-button>
    <SvgIcon name="robot-arm" :size="20" />
    机械臂控制
  </el-button>
  
  <!-- 急停按钮 -->
  <el-button type="danger">
    <SvgIcon name="emergency-stop" :size="24" class="danger" />
    急停
  </el-button>
</template>
```

### 2. 状态指示

```vue
<template>
  <!-- 电机使能状态 -->
  <div class="status-indicator">
    <SvgIcon 
      :name="motorEnabled ? 'enable' : 'disable'" 
      :size="20" 
      :class="motorEnabled ? 'success' : 'danger'"
    />
    {{ motorEnabled ? '已使能' : '未使能' }}
  </div>
</template>
```

### 3. 视图切换

```vue
<template>
  <el-button-group>
    <el-button @click="setView('top')">
      <SvgIcon name="view-top" :size="16" />
      俯视
    </el-button>
    <el-button @click="setView('front')">
      <SvgIcon name="view-front" :size="16" />
      前视
    </el-button>
    <el-button @click="resetView()">
      <SvgIcon name="view-reset" :size="16" />
      重置
    </el-button>
  </el-button-group>
</template>
```

### 4. 窗口布局控制

```vue
<template>
  <div class="layout-controls">
    <el-tooltip content="单窗口模式">
      <el-button :type="isSingleWindow ? 'primary' : ''" @click="setSingleWindow">
        <SvgIcon name="window-single" :size="18" />
      </el-button>
    </el-tooltip>
    <el-tooltip content="分屏模式">
      <el-button :type="!isSingleWindow ? 'primary' : ''" @click="setSplitWindow">
        <SvgIcon name="window-split" :size="18" />
      </el-button>
    </el-tooltip>
  </div>
</template>
```

### 5. 安全警告

```vue
<template>
  <!-- 障碍物警告 -->
  <el-alert v-if="obstacleDetected" type="warning" :closable="false">
    <template #title>
      <SvgIcon name="slow-obstacle" :size="20" class="warning" />
      检测到障碍物，正在减速
    </template>
  </el-alert>
  
  <!-- 碰撞警告 -->
  <el-alert v-if="collisionRisk" type="error" :closable="false">
    <template #title>
      <SvgIcon name="collision" :size="20" class="danger" />
      碰撞风险！请立即停止
    </template>
  </el-alert>
</template>
```

## 🎨 主题色配合

```vue
<!-- 成功状态 - 绿色 -->
<SvgIcon name="enable" :size="20" class="success" />

<!-- 警告状态 - 橙色 -->
<SvgIcon name="slow-obstacle" :size="20" class="warning" />

<!-- 危险状态 - 红色 -->
<SvgIcon name="emergency-stop" :size="24" class="danger" />

<!-- 主题色 - 橙色 -->
<SvgIcon name="robot-arm" :size="24" class="primary" />
```

## 📝 完整图标列表（文件名）

```
robot-arm.svg
robot-arm-dual.svg
scene-3d.svg
gripper.svg
gripper-open.svg
chassis.svg
head.svg
lift.svg
waist.svg
task.svg
vr.svg
data-collection.svg
window-single.svg
window-split.svg
power-on.svg
power-off.svg
enable.svg
disable.svg
view-top.svg
view-reset.svg
view-front.svg
execute-move.svg
emergency-stop.svg
slow-obstacle.svg
pause-obstacle.svg
navigate-target.svg
home-position.svg
toggle-panel.svg
initializing.svg
arm-joint.svg
arm-cartesian.svg
speed-slow.svg
speed-medium.svg
speed-fast.svg
collision.svg
force-control.svg
servo-mode.svg
teach-mode.svg
auto-mode.svg
manual-mode.svg
```

## 🔄 更新图标预览页面

运行以下命令重新生成预览页面：

```bash
cd qyh_jushen_frontend
python scripts/download_svg_only.py
```

然后访问：`http://localhost:5173/icons/svg/index.html`

---

**图标来源**: Material Design Icons (MDI)  
**总计数量**: 42个新增 + 71个原有 = 113个图标  
**下载时间**: 2026-01-04
