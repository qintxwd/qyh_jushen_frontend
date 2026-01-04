# 🚀 机器人图标快速查找表

## 功能 → 图标名称映射

| 功能/组件 | 图标名称 | 使用示例 |
|----------|---------|---------|
| **机械臂（双臂）** | `robot-arm-dual` | `<SvgIcon name="robot-arm-dual" :size="24" />` |
| **机械臂（单臂）** | `robot-arm` | `<SvgIcon name="robot-arm" :size="24" />` |
| **3D场景** | `scene-3d` | `<SvgIcon name="scene-3d" :size="24" />` |
| **夹爪** | `gripper` | `<SvgIcon name="gripper" :size="20" />` |
| **夹爪（张开）** | `gripper-open` | `<SvgIcon name="gripper-open" :size="20" />` |
| **底盘** | `chassis` | `<SvgIcon name="chassis" :size="24" />` |
| **头部** | `head` | `<SvgIcon name="head" :size="20" />` |
| **升降** | `lift` | `<SvgIcon name="lift" :size="20" />` |
| **腰部** | `waist` | `<SvgIcon name="waist" :size="20" />` |
| **任务** | `task` | `<SvgIcon name="task" :size="24" />` |
| **VR遥操作** | `vr` | `<SvgIcon name="vr" :size="24" />` |
| **数据采集** | `data-collection` | `<SvgIcon name="data-collection" :size="24" />` |
| **单窗口模式** | `window-single` | `<SvgIcon name="window-single" :size="20" />` |
| **分屏模式** | `window-split` | `<SvgIcon name="window-split" :size="20" />` |
| **上电** | `power-on` | `<SvgIcon name="power-on" :size="20" class="success" />` |
| **下电** | `power-off` | `<SvgIcon name="power-off" :size="20" class="danger" />` |
| **使能** | `enable` | `<SvgIcon name="enable" :size="20" class="primary" />` |
| **去使能** | `disable` | `<SvgIcon name="disable" :size="20" />` |
| **俯视图** | `view-top` | `<SvgIcon name="view-top" :size="20" />` |
| **重置视角** | `view-reset` | `<SvgIcon name="view-reset" :size="20" />` |
| **前视图** | `view-front` | `<SvgIcon name="view-front" :size="20" />` |
| **执行移动** | `execute-move` | `<SvgIcon name="execute-move" :size="24" />` |
| **急停** | `emergency-stop` | `<SvgIcon name="emergency-stop" :size="32" class="danger" />` |
| **减速避障** | `slow-obstacle` | `<SvgIcon name="slow-obstacle" :size="20" class="warning" />` |
| **障碍暂停** | `pause-obstacle` | `<SvgIcon name="pause-obstacle" :size="20" class="warning" />` |
| **导航到目标** | `navigate-target` | `<SvgIcon name="navigate-target" :size="24" />` |
| **回正** | `home-position` | `<SvgIcon name="home-position" :size="20" />` |
| **切换属性面板** | `toggle-panel` | `<SvgIcon name="toggle-panel" :size="20" />` |
| **等待初始化** | `initializing` | `<SvgIcon name="initializing" :size="20" />` |
| **关节空间** | `arm-joint` | `<SvgIcon name="arm-joint" :size="20" />` |
| **笛卡尔空间** | `arm-cartesian` | `<SvgIcon name="arm-cartesian" :size="20" />` |
| **慢速** | `speed-slow` | `<SvgIcon name="speed-slow" :size="20" />` |
| **中速** | `speed-medium` | `<SvgIcon name="speed-medium" :size="20" />` |
| **快速** | `speed-fast` | `<SvgIcon name="speed-fast" :size="20" />` |
| **碰撞** | `collision` | `<SvgIcon name="collision" :size="20" class="danger" />` |
| **力控** | `force-control` | `<SvgIcon name="force-control" :size="20" />` |
| **伺服模式** | `servo-mode` | `<SvgIcon name="servo-mode" :size="24" />` |
| **示教模式** | `teach-mode` | `<SvgIcon name="teach-mode" :size="24" />` |
| **自动模式** | `auto-mode` | `<SvgIcon name="auto-mode" :size="24" />` |
| **手动模式** | `manual-mode` | `<SvgIcon name="manual-mode" :size="24" />` |

## 📋 复制即用代码片段

### 控制面板标题

```vue
<!-- 机械臂控制 -->
<h3><SvgIcon name="robot-arm-dual" :size="20" /> 双臂控制</h3>

<!-- 夹爪控制 -->
<h3><SvgIcon name="gripper" :size="20" /> 夹爪控制</h3>

<!-- 底盘控制 -->
<h3><SvgIcon name="chassis" :size="20" /> 底盘导航</h3>

<!-- 任务管理 -->
<h3><SvgIcon name="task" :size="20" /> 任务管理</h3>
```

### 按钮组

```vue
<el-button-group>
  <el-button>
    <SvgIcon name="view-top" :size="16" />
    俯视
  </el-button>
  <el-button>
    <SvgIcon name="view-front" :size="16" />
    前视
  </el-button>
  <el-button>
    <SvgIcon name="view-reset" :size="16" />
    重置
  </el-button>
</el-button-group>
```

### 状态指示器

```vue
<!-- 使能状态 -->
<el-tag :type="enabled ? 'success' : 'info'">
  <SvgIcon :name="enabled ? 'enable' : 'disable'" :size="14" />
  {{ enabled ? '已使能' : '未使能' }}
</el-tag>

<!-- 电源状态 -->
<el-tag :type="powered ? 'success' : 'danger'">
  <SvgIcon :name="powered ? 'power-on' : 'power-off'" :size="14" />
  {{ powered ? '已上电' : '已下电' }}
</el-tag>
```

### 安全警告

```vue
<!-- 急停按钮 -->
<el-button type="danger" size="large">
  <SvgIcon name="emergency-stop" :size="32" class="danger" />
  急停
</el-button>

<!-- 障碍警告 -->
<el-alert v-if="obstacleDetected" type="warning">
  <SvgIcon name="slow-obstacle" :size="20" />
  检测到障碍物
</el-alert>

<!-- 碰撞风险 -->
<el-alert v-if="collisionRisk" type="error">
  <SvgIcon name="collision" :size="20" />
  碰撞风险！
</el-alert>
```

### 模式切换

```vue
<el-radio-group v-model="controlMode">
  <el-radio-button value="auto">
    <SvgIcon name="auto-mode" :size="16" />
    自动
  </el-radio-button>
  <el-radio-button value="manual">
    <SvgIcon name="manual-mode" :size="16" />
    手动
  </el-radio-button>
  <el-radio-button value="teach">
    <SvgIcon name="teach-mode" :size="16" />
    示教
  </el-radio-button>
</el-radio-group>
```

### 速度控制

```vue
<el-radio-group v-model="speed">
  <el-radio-button value="slow">
    <SvgIcon name="speed-slow" :size="16" />
    慢速
  </el-radio-button>
  <el-radio-button value="medium">
    <SvgIcon name="speed-medium" :size="16" />
    中速
  </el-radio-button>
  <el-radio-button value="fast">
    <SvgIcon name="speed-fast" :size="16" />
    快速
  </el-radio-button>
</el-radio-group>
```

### 任务操作

```vue
<!-- 执行任务 -->
<el-button type="primary">
  <SvgIcon name="execute-move" :size="20" />
  执行移动
</el-button>

<!-- 回正 -->
<el-button>
  <SvgIcon name="home-position" :size="20" />
  回正
</el-button>

<!-- 导航 -->
<el-button>
  <SvgIcon name="navigate-target" :size="20" />
  导航到目标
</el-button>
```

---

💡 **提示**: 所有图标支持 `:size` 属性调整大小，支持 `class="primary|success|warning|danger"` 应用主题色。
