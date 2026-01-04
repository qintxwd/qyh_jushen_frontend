<template>
  <div class="vr-teleoperation-panel">
    <!-- VR连接状态 -->
    <div class="panel-section">
      <div class="connection-status">
        <div class="status-indicator" :class="vrStatus.connected ? 'connected' : 'disconnected'">
          <el-icon><VideoCamera /></el-icon>
          <span>{{ vrStatus.connected ? 'VR已连接' : 'VR未连接' }}</span>
        </div>
      </div>
    </div>

    <!-- 头部姿态 -->
    <div class="panel-section">
      <h3 class="section-title">头部姿态</h3>
      <div class="pose-display">
        <div class="pose-row">
          <span class="pose-label">位置 (xyz)</span>
          <span class="pose-value">{{ formatPosition(vrStatus.head_pose?.position) }}</span>
        </div>
        <div class="pose-row">
          <span class="pose-label">旋转 (RPY)</span>
          <span class="pose-value rpy">{{ formatRPY(vrStatus.head_pose?.orientation) }}</span>
        </div>
      </div>
    </div>

    <el-divider />

    <!-- 左/右手控制器状态 -->
    <div class="panel-section">
      <h3 class="section-title">控制器状态</h3>
      <div class="hand-status-grid">
        <!-- 左手 -->
        <div class="hand-card" :class="{ active: vrStatus.left_controller?.active }">
          <div class="hand-header">
            <el-icon><Mouse /></el-icon>
            <span>左手控制器</span>
          </div>
          <div class="hand-content">
            <!-- Clutch状态 -->
            <div class="clutch-indicator" :class="{ engaged: vrStatus.left_controller?.clutch_engaged }">
              <div class="clutch-icon">
                <el-icon size="24">
                  <component :is="vrStatus.left_controller?.clutch_engaged ? 'Lock' : 'Unlock'" />
                </el-icon>
              </div>
              <div class="clutch-text">
                {{ vrStatus.left_controller?.clutch_engaged ? 'CLUTCH ON' : 'CLUTCH OFF' }}
              </div>
            </div>

            <!-- 位置姿态 -->
            <div class="pose-mini">
              <div class="pose-mini-row">
                <span>位置:</span>
                <span>{{ formatPositionShort(vrStatus.left_controller?.pose?.position) }}</span>
              </div>
              <div class="pose-mini-row">
                <span>RPY:</span>
                <span>{{ formatRPYShort(vrStatus.left_controller?.pose?.orientation) }}</span>
              </div>
            </div>

            <!-- 摇杆 -->
            <div class="joystick-display">
              <span class="joystick-label">摇杆</span>
              <div class="joystick-visual">
                <div 
                  class="joystick-dot" 
                  :style="getJoystickStyle(vrStatus.left_controller?.joystick)"
                ></div>
              </div>
              <span class="joystick-value">
                {{ formatJoystick(vrStatus.left_controller?.joystick) }}
              </span>
            </div>

            <!-- 按钮 -->
            <div class="buttons-display">
              <span class="buttons-label">按钮</span>
              <div class="buttons-grid">
                <div class="button-item" :class="{ pressed: vrStatus.left_controller?.buttons?.[0] }">X</div>
                <div class="button-item" :class="{ pressed: vrStatus.left_controller?.buttons?.[1] }">Y</div>
                <div class="button-item" :class="{ pressed: vrStatus.left_controller?.buttons?.[2] }">Menu</div>
                <div class="button-item" :class="{ pressed: vrStatus.left_controller?.buttons?.[3] }">Joy</div>
              </div>
            </div>

            <!-- Trigger和Grip -->
            <div class="axis-bars">
              <div class="axis-bar">
                <span class="axis-label">Trigger</span>
                <el-progress 
                  :percentage="Math.round((vrStatus.left_controller?.trigger || 0) * 100)" 
                  :stroke-width="8"
                  color="#409eff"
                />
              </div>
              <div class="axis-bar">
                <span class="axis-label">Grip</span>
                <el-progress 
                  :percentage="Math.round((vrStatus.left_controller?.grip || 0) * 100)" 
                  :stroke-width="8"
                  :color="getGripColor(vrStatus.left_controller?.grip || 0)"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 右手 -->
        <div class="hand-card" :class="{ active: vrStatus.right_controller?.active }">
          <div class="hand-header">
            <el-icon><Mouse /></el-icon>
            <span>右手控制器</span>
          </div>
          <div class="hand-content">
            <!-- Clutch状态 -->
            <div class="clutch-indicator" :class="{ engaged: vrStatus.right_controller?.clutch_engaged }">
              <div class="clutch-icon">
                <el-icon size="24">
                  <component :is="vrStatus.right_controller?.clutch_engaged ? 'Lock' : 'Unlock'" />
                </el-icon>
              </div>
              <div class="clutch-text">
                {{ vrStatus.right_controller?.clutch_engaged ? 'CLUTCH ON' : 'CLUTCH OFF' }}
              </div>
            </div>

            <!-- 位置姿态 -->
            <div class="pose-mini">
              <div class="pose-mini-row">
                <span>位置:</span>
                <span>{{ formatPositionShort(vrStatus.right_controller?.pose?.position) }}</span>
              </div>
              <div class="pose-mini-row">
                <span>RPY:</span>
                <span>{{ formatRPYShort(vrStatus.right_controller?.pose?.orientation) }}</span>
              </div>
            </div>

            <!-- 摇杆 -->
            <div class="joystick-display">
              <span class="joystick-label">摇杆</span>
              <div class="joystick-visual">
                <div 
                  class="joystick-dot" 
                  :style="getJoystickStyle(vrStatus.right_controller?.joystick)"
                ></div>
              </div>
              <span class="joystick-value">
                {{ formatJoystick(vrStatus.right_controller?.joystick) }}
              </span>
            </div>

            <!-- 按钮 -->
            <div class="buttons-display">
              <span class="buttons-label">按钮</span>
              <div class="buttons-grid">
                <div class="button-item" :class="{ pressed: vrStatus.right_controller?.buttons?.[0] }">A</div>
                <div class="button-item" :class="{ pressed: vrStatus.right_controller?.buttons?.[1] }">B</div>
                <div class="button-item" :class="{ pressed: vrStatus.right_controller?.buttons?.[2] }">Home</div>
                <div class="button-item" :class="{ pressed: vrStatus.right_controller?.buttons?.[3] }">Joy</div>
              </div>
            </div>

            <!-- Trigger和Grip -->
            <div class="axis-bars">
              <div class="axis-bar">
                <span class="axis-label">Trigger</span>
                <el-progress 
                  :percentage="Math.round((vrStatus.right_controller?.trigger || 0) * 100)" 
                  :stroke-width="8"
                  color="#409eff"
                />
              </div>
              <div class="axis-bar">
                <span class="axis-label">Grip</span>
                <el-progress 
                  :percentage="Math.round((vrStatus.right_controller?.grip || 0) * 100)" 
                  :stroke-width="8"
                  :color="getGripColor(vrStatus.right_controller?.grip || 0)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-divider />

    <!-- 操作指南 -->
    <div class="panel-section">
      <h3 class="section-title">操作指南</h3>
      <div class="guide-content">
        <div class="guide-item">
          <el-icon><InfoFilled /></el-icon>
          <span>按住 Grip 键 (>80%) 接合 Clutch，机械臂跟随 VR 手柄移动</span>
        </div>
        <div class="guide-item">
          <el-icon><InfoFilled /></el-icon>
          <span>松开 Grip 键 (<20%) 释放 Clutch，机械臂保持当前位置</span>
        </div>
        <div class="guide-item">
          <el-icon><WarningFilled /></el-icon>
          <span>Clutch 接合时注意周围环境，防止碰撞</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import { VideoCamera, Mouse, Lock, Unlock, InfoFilled, WarningFilled } from '@element-plus/icons-vue'
import axios from 'axios'

interface Pose {
  position: number[]
  orientation: number[]
}

interface ControllerState {
  active: boolean
  pose: Pose
  joystick: number[]
  trigger: number
  grip: number
  buttons: number[]
  clutch_engaged: boolean
}

interface VRStatus {
  connected: boolean
  head_pose: Pose
  left_controller: ControllerState
  right_controller: ControllerState
  left_hand_active: boolean
  right_hand_active: boolean
}

const vrStatus = reactive<VRStatus>({
  connected: false,
  head_pose: { position: [0, 0, 0], orientation: [0, 0, 0, 1] },
  left_controller: {
    active: false,
    pose: { position: [0, 0, 0], orientation: [0, 0, 0, 1] },
    joystick: [0, 0],
    trigger: 0,
    grip: 0,
    buttons: [0, 0, 0, 0],
    clutch_engaged: false
  },
  right_controller: {
    active: false,
    pose: { position: [0, 0, 0], orientation: [0, 0, 0, 1] },
    joystick: [0, 0],
    trigger: 0,
    grip: 0,
    buttons: [0, 0, 0, 0],
    clutch_engaged: false
  },
  left_hand_active: false,
  right_hand_active: false
})

let pollTimer: number | null = null

// 获取 token
function getAuthHeaders() {
  const token = localStorage.getItem('token')
  return {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
}

// 获取 VR 状态
async function fetchVRStatus() {
  try {
    const response = await axios.get('/api/v1/vr/status', getAuthHeaders())
    if (response.data) {
      Object.assign(vrStatus, response.data)
    }
  } catch (error) {
    // 静默失败
  }
}

// 格式化位置 (完整)
function formatPosition(position?: number[]): string {
  if (!position || position.length < 3) return '[0.00, 0.00, 0.00]'
  return `[${position[0].toFixed(2)}, ${position[1].toFixed(2)}, ${position[2].toFixed(2)}]`
}

// 格式化位置 (简短)
function formatPositionShort(position?: number[]): string {
  if (!position || position.length < 3) return '[0.00, 0.00, 0.00]'
  return `[${position[0].toFixed(2)}, ${position[1].toFixed(2)}, ${position[2].toFixed(2)}]`
}

// 格式化四元数
function formatQuaternion(orientation?: number[]): string {
  if (!orientation || orientation.length < 4) return '[0.00, 0.00, 0.00, 1.00]'
  return `[${orientation[0].toFixed(2)}, ${orientation[1].toFixed(2)}, ${orientation[2].toFixed(2)}, ${orientation[3].toFixed(2)}]`
}

// 四元数转RPY (Roll, Pitch, Yaw) 单位：度
function quaternionToRPY(q?: number[]): { roll: number; pitch: number; yaw: number } {
  if (!q || q.length < 4) return { roll: 0, pitch: 0, yaw: 0 }
  
  const [x, y, z, w] = q
  
  // Roll (x-axis rotation)
  const sinr_cosp = 2 * (w * x + y * z)
  const cosr_cosp = 1 - 2 * (x * x + y * y)
  const roll = Math.atan2(sinr_cosp, cosr_cosp)
  
  // Pitch (y-axis rotation)
  const sinp = 2 * (w * y - z * x)
  let pitch: number
  if (Math.abs(sinp) >= 1) {
    pitch = Math.sign(sinp) * Math.PI / 2 // Use 90 degrees if out of range
  } else {
    pitch = Math.asin(sinp)
  }
  
  // Yaw (z-axis rotation)
  const siny_cosp = 2 * (w * z + x * y)
  const cosy_cosp = 1 - 2 * (y * y + z * z)
  const yaw = Math.atan2(siny_cosp, cosy_cosp)
  
  // Convert to degrees
  return {
    roll: roll * 180 / Math.PI,
    pitch: pitch * 180 / Math.PI,
    yaw: yaw * 180 / Math.PI
  }
}

// 格式化RPY (完整显示)
function formatRPY(orientation?: number[]): string {
  const rpy = quaternionToRPY(orientation)
  return `[R:${rpy.roll.toFixed(1)}°, P:${rpy.pitch.toFixed(1)}°, Y:${rpy.yaw.toFixed(1)}°]`
}

// 格式化RPY (简短显示)
function formatRPYShort(orientation?: number[]): string {
  const rpy = quaternionToRPY(orientation)
  return `[${rpy.roll.toFixed(0)}°, ${rpy.pitch.toFixed(0)}°, ${rpy.yaw.toFixed(0)}°]`
}

// 格式化摇杆
function formatJoystick(joystick?: number[]): string {
  if (!joystick || joystick.length < 2) return '[0.00, 0.00]'
  return `[${joystick[0].toFixed(2)}, ${joystick[1].toFixed(2)}]`
}

// 获取摇杆点位置样式
function getJoystickStyle(joystick?: number[]): any {
  if (!joystick || joystick.length < 2) {
    return { left: '50%', top: '50%' }
  }
  // 将 [-1, 1] 映射到 [0%, 100%]
  const x = ((joystick[0] + 1) / 2) * 100
  const y = ((1 - joystick[1]) / 2) * 100  // Y轴反转
  return {
    left: `${x}%`,
    top: `${y}%`
  }
}

// 根据 grip 值返回颜色
function getGripColor(value: number): string {
  if (value >= 0.8) return '#67c23a'  // 绿色 - 接合
  if (value >= 0.5) return '#e6a23c'  // 黄色 - 过渡
  return '#909399'  // 灰色 - 释放
}

onMounted(() => {
  fetchVRStatus()
  // 每 100ms 轮询状态 (需要快速响应 clutch 变化)
  pollTimer = window.setInterval(fetchVRStatus, 100)
})

onUnmounted(() => {
  if (pollTimer) {
    clearInterval(pollTimer)
  }
})
</script>

<style scoped>
.vr-teleoperation-panel {
  padding: 16px;
}

.panel-section {
  margin-bottom: 8px;
}

.section-title {
  margin: 0 0 12px 0;
  font-size: 13px;
  font-weight: 500;
  color: #909399;
}

.connection-status {
  display: flex;
  justify-content: center;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
}

.status-indicator.connected {
  background-color: rgba(103, 194, 58, 0.2);
  color: #67c23a;
}

.status-indicator.disconnected {
  background-color: rgba(144, 147, 153, 0.2);
  color: #909399;
}

/* 头部姿态显示 */
.pose-display {
  background-color: #2d2d2d;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pose-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}

.pose-label {
  color: #909399;
  min-width: 100px;
}

.pose-value {
  color: #409eff;
  font-family: monospace;
  font-size: 11px;
}

.pose-value.rpy {
  color: #67c23a;
}

/* 手柄卡片 */
.hand-status-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.hand-card {
  background-color: #2d2d2d;
  border-radius: 8px;
  padding: 12px;
  border: 2px solid transparent;
  transition: all 0.3s;
}

.hand-card.active {
  border-color: #409eff;
  background-color: rgba(64, 158, 255, 0.1);
}

.hand-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
  font-size: 12px;
  color: #ccc;
  font-weight: 500;
}

.hand-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.clutch-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background-color: #1e1e1e;
  border-radius: 6px;
  transition: all 0.3s;
}

.clutch-indicator.engaged {
  background-color: rgba(103, 194, 58, 0.2);
}

.clutch-indicator.engaged .clutch-icon {
  color: #67c23a;
}

.clutch-indicator.engaged .clutch-text {
  color: #67c23a;
}

.clutch-icon {
  margin-bottom: 4px;
  color: #909399;
  transition: color 0.3s;
}

.clutch-text {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1px;
  color: #909399;
  transition: color 0.3s;
}

/* 位置姿态迷你显示 */
.pose-mini {
  background-color: #1e1e1e;
  padding: 6px 8px;
  border-radius: 4px;
  font-size: 10px;
}

.pose-mini-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  color: #909399;
}

.pose-mini-row span:last-child {
  color: #409eff;
  font-family: monospace;
}

/* 摇杆显示 */
.joystick-display {
  display: flex;
  flex-direction: column;
  gap: 4px;
  background-color: #1e1e1e;
  padding: 8px;
  border-radius: 6px;
}

.joystick-label {
  font-size: 10px;
  color: #909399;
  text-align: center;
}

.joystick-visual {
  width: 60px;
  height: 60px;
  background-color: #2d2d2d;
  border-radius: 50%;
  position: relative;
  margin: 0 auto;
  border: 2px solid #404040;
}

.joystick-dot {
  width: 12px;
  height: 12px;
  background-color: #409eff;
  border-radius: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 8px rgba(64, 158, 255, 0.6);
  transition: all 0.1s;
}

.joystick-value {
  font-size: 9px;
  color: #67c23a;
  font-family: monospace;
  text-align: center;
}

/* 按钮显示 */
.buttons-display {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.buttons-label {
  font-size: 10px;
  color: #909399;
}

.buttons-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
}

.button-item {
  background-color: #1e1e1e;
  border: 2px solid #404040;
  border-radius: 4px;
  padding: 6px 4px;
  font-size: 10px;
  font-weight: 600;
  text-align: center;
  color: #909399;
  transition: all 0.2s;
}

.button-item.pressed {
  background-color: #409eff;
  border-color: #409eff;
  color: #fff;
  box-shadow: 0 0 8px rgba(64, 158, 255, 0.6);
}

/* Trigger和Grip进度条 */
.axis-bars {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.axis-bar {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.axis-label {
  font-size: 10px;
  color: #909399;
}

/* 操作指南 */
.guide-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  background-color: #2d2d2d;
  border-radius: 8px;
}

.guide-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 12px;
  color: #b0b0b0;
  line-height: 1.5;
}

.guide-item .el-icon {
  margin-top: 2px;
  color: #409eff;
  flex-shrink: 0;
}

:deep(.el-divider) {
  margin: 16px 0;
  border-color: #3c3c3c;
}

:deep(.el-progress-bar__outer) {
  background-color: #404040;
}
</style>
