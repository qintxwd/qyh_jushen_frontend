<template>
  <div class="vr-panel-modern">
    <!-- 顶部状态栏 -->
    <div class="vr-status-bar">
      <div class="status-badge" :class="vrStatus.connected ? 'online' : 'offline'">
        <div class="badge-icon">
          <SvgIcon name="videocamera" :size="16" />
        </div>
        <div class="badge-content">
          <span class="badge-title">{{ vrStatus.connected ? 'VR已连接' : 'VR未连接' }}</span>
          <span class="badge-subtitle">{{ vrStatus.connected ? '实时遥操作模式' : '等待设备连接' }}</span>
        </div>
        <div class="pulse-ring" v-if="vrStatus.connected"></div>
      </div>
      
      <!-- 头部姿态紧凑显示 -->
      <div class="head-pose-mini">
        <el-icon class="head-icon"><User /></el-icon>
        <div class="pose-data">
          <div class="data-item">
            <span class="data-label">XYZ</span>
            <span class="data-value">{{ formatPositionShort(vrStatus.head_pose?.position) }}</span>
          </div>
          <div class="data-item">
            <span class="data-label">RPY</span>
            <span class="data-value rpy">{{ formatRPYShort(vrStatus.head_pose?.orientation) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 控制器网格 -->
    <div class="controllers-grid">
      <!-- 左手控制器 -->
      <div class="controller-panel left" :class="{ active: vrStatus.left_controller?.active }">
        <div class="panel-header">
          <el-icon class="controller-icon"><DArrowLeft /></el-icon>
          <span class="controller-name">左手</span>
        </div>

        <!-- Clutch 状态 -->
        <div class="clutch-block" :class="{ locked: vrStatus.left_controller?.clutch_engaged }">
          <div class="clutch-icon-wrapper">
            <el-icon :size="36">
              <component :is="vrStatus.left_controller?.clutch_engaged ? 'Lock' : 'Unlock'" />
            </el-icon>
          </div>
          <div class="clutch-text">{{ vrStatus.left_controller?.clutch_engaged ? 'CLUTCH ON' : 'CLUTCH OFF' }}</div>
          <div class="clutch-glow" v-if="vrStatus.left_controller?.clutch_engaged"></div>
        </div>

        <!-- 摇杆可视化 -->
        <div class="joystick-zone">
          <div class="joystick-visual">
            <div class="joystick-cross">
              <div class="cross-h"></div>
              <div class="cross-v"></div>
            </div>
            <div class="joystick-cursor" :style="getJoystickStyle(vrStatus.left_controller?.joystick)">
              <div class="cursor-ring"></div>
              <div class="cursor-dot"></div>
            </div>
            <div class="joystick-bounds"></div>
          </div>
          <div class="joystick-value">{{ formatJoystick(vrStatus.left_controller?.joystick) }}</div>
        </div>

        <!-- 按钮组 [A, B, X, Y, Menu, JoyClick] -->
        <div class="buttons-row">
          <div class="button-circle" :class="{ pressed: vrStatus.left_controller?.buttons?.[2] }">
            <span>X</span>
          </div>
          <div class="button-circle" :class="{ pressed: vrStatus.left_controller?.buttons?.[3] }">
            <span>Y</span>
          </div>
          <div class="button-pill" :class="{ pressed: vrStatus.left_controller?.buttons?.[4] }">
            <span>Menu</span>
          </div>
          <div class="button-pill" :class="{ pressed: vrStatus.left_controller?.buttons?.[5] }">
            <span>Joy</span>
          </div>
        </div>

        <!-- 扳机/握把 -->
        <div class="axis-section">
          <div class="axis-row">
            <span class="axis-name">Trigger</span>
            <div class="axis-track">
              <div class="axis-fill trigger" :style="{ width: `${(vrStatus.left_controller?.trigger || 0) * 100}%` }"></div>
            </div>
            <span class="axis-percent">{{ Math.round((vrStatus.left_controller?.trigger || 0) * 100) }}%</span>
          </div>
          <div class="axis-row">
            <span class="axis-name">Grip</span>
            <div class="axis-track">
              <div class="axis-fill grip" :style="{ width: `${(vrStatus.left_controller?.grip || 0) * 100}%` }" :class="getGripClass(vrStatus.left_controller?.grip || 0)"></div>
            </div>
            <span class="axis-percent">{{ Math.round((vrStatus.left_controller?.grip || 0) * 100) }}%</span>
          </div>
        </div>

        <!-- 折叠位姿 -->
        <details class="pose-collapse">
          <summary>位姿详情</summary>
          <div class="pose-content">
            <div class="pose-row">
              <span>位置</span>
              <span class="val">{{ formatPositionShort(vrStatus.left_controller?.pose?.position) }}</span>
            </div>
            <div class="pose-row">
              <span>旋转</span>
              <span class="val">{{ formatRPYShort(vrStatus.left_controller?.pose?.orientation) }}</span>
            </div>
          </div>
        </details>
      </div>

      <!-- 右手控制器（镜像） -->
      <div class="controller-panel right" :class="{ active: vrStatus.right_controller?.active }">
        <div class="panel-header">
          <el-icon class="controller-icon"><DArrowRight /></el-icon>
          <span class="controller-name">右手</span>
        </div>

        <div class="clutch-block" :class="{ locked: vrStatus.right_controller?.clutch_engaged }">
          <div class="clutch-icon-wrapper">
            <el-icon :size="36">
              <component :is="vrStatus.right_controller?.clutch_engaged ? 'Lock' : 'Unlock'" />
            </el-icon>
          </div>
          <div class="clutch-text">{{ vrStatus.right_controller?.clutch_engaged ? 'CLUTCH ON' : 'CLUTCH OFF' }}</div>
          <div class="clutch-glow" v-if="vrStatus.right_controller?.clutch_engaged"></div>
        </div>

        <div class="joystick-zone">
          <div class="joystick-visual">
            <div class="joystick-cross">
              <div class="cross-h"></div>
              <div class="cross-v"></div>
            </div>
            <div class="joystick-cursor" :style="getJoystickStyle(vrStatus.right_controller?.joystick)">
              <div class="cursor-ring"></div>
              <div class="cursor-dot"></div>
            </div>
            <div class="joystick-bounds"></div>
          </div>
          <div class="joystick-value">{{ formatJoystick(vrStatus.right_controller?.joystick) }}</div>
        </div>

        <div class="buttons-row">
          <div class="button-circle" :class="{ pressed: vrStatus.right_controller?.buttons?.[0] }">
            <span>A</span>
          </div>
          <div class="button-circle" :class="{ pressed: vrStatus.right_controller?.buttons?.[1] }">
            <span>B</span>
          </div>
          <div class="button-pill" :class="{ pressed: vrStatus.right_controller?.buttons?.[4] }">
            <span>Home</span>
          </div>
          <div class="button-pill" :class="{ pressed: vrStatus.right_controller?.buttons?.[5] }">
            <span>Joy</span>
          </div>
        </div>

        <div class="axis-section">
          <div class="axis-row">
            <span class="axis-name">Trigger</span>
            <div class="axis-track">
              <div class="axis-fill trigger" :style="{ width: `${(vrStatus.right_controller?.trigger || 0) * 100}%` }"></div>
            </div>
            <span class="axis-percent">{{ Math.round((vrStatus.right_controller?.trigger || 0) * 100) }}%</span>
          </div>
          <div class="axis-row">
            <span class="axis-name">Grip</span>
            <div class="axis-track">
              <div class="axis-fill grip" :style="{ width: `${(vrStatus.right_controller?.grip || 0) * 100}%` }" :class="getGripClass(vrStatus.right_controller?.grip || 0)"></div>
            </div>
            <span class="axis-percent">{{ Math.round((vrStatus.right_controller?.grip || 0) * 100) }}%</span>
          </div>
        </div>

        <details class="pose-collapse">
          <summary>位姿详情</summary>
          <div class="pose-content">
            <div class="pose-row">
              <span>位置</span>
              <span class="val">{{ formatPositionShort(vrStatus.right_controller?.pose?.position) }}</span>
            </div>
            <div class="pose-row">
              <span>旋转</span>
              <span class="val">{{ formatRPYShort(vrStatus.right_controller?.pose?.orientation) }}</span>
            </div>
          </div>
        </details>
      </div>
    </div>

    <!-- 操作提示 -->
    <div class="tips-bar">
      <div class="tip">
        <SvgIcon name="infofilled" :size="16" />
        <span>Grip ≥ 80% → Clutch 接合（轴编辑）</span>
      </div>
      <div class="tip">
        <SvgIcon name="infofilled" :size="16" />
        <span>Grip ≤ 20% → Clutch 释放（顺应）</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'
import { reactive, onMounted, onUnmounted } from 'vue'
import axios from 'axios'

const vrStatus = reactive({
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

function getAuthHeaders() {
  const token = localStorage.getItem('token')
  return { headers: { 'Authorization': `Bearer ${token}` } }
}

async function fetchVRStatus() {
  try {
    const response = await axios.get('/api/v1/vr/status', getAuthHeaders())
    if (response.data) Object.assign(vrStatus, response.data)
  } catch (error) {
    // 静默失败
  }
}

function formatPositionShort(position?: number[]): string {
  if (!position || position.length < 3) return '[0.00, 0.00, 0.00]'
  return `[${position[0].toFixed(2)}, ${position[1].toFixed(2)}, ${position[2].toFixed(2)}]`
}

function quaternionToRPY(q?: number[]): { roll: number; pitch: number; yaw: number } {
  if (!q || q.length < 4) return { roll: 0, pitch: 0, yaw: 0 }
  const [x, y, z, w] = q
  const sinr_cosp = 2 * (w * x + y * z)
  const cosr_cosp = 1 - 2 * (x * x + y * y)
  const roll = Math.atan2(sinr_cosp, cosr_cosp)
  const sinp = 2 * (w * y - z * x)
  let pitch: number
  if (Math.abs(sinp) >= 1) {
    pitch = Math.sign(sinp) * Math.PI / 2
  } else {
    pitch = Math.asin(sinp)
  }
  const siny_cosp = 2 * (w * z + x * y)
  const cosy_cosp = 1 - 2 * (y * y + z * z)
  const yaw = Math.atan2(siny_cosp, cosy_cosp)
  return {
    roll: roll * 180 / Math.PI,
    pitch: pitch * 180 / Math.PI,
    yaw: yaw * 180 / Math.PI
  }
}

function formatRPYShort(orientation?: number[]): string {
  const rpy = quaternionToRPY(orientation)
  return `[${rpy.roll.toFixed(0)}°, ${rpy.pitch.toFixed(0)}°, ${rpy.yaw.toFixed(0)}°]`
}

function formatJoystick(joystick?: number[]): string {
  if (!joystick || joystick.length < 2) return '[0.00, 0.00]'
  return `[${joystick[0].toFixed(2)}, ${joystick[1].toFixed(2)}]`
}

function getJoystickStyle(joystick?: number[]): any {
  if (!joystick || joystick.length < 2) {
    return { left: '50%', top: '50%' }
  }
  const x = ((joystick[0] + 1) / 2) * 100
  const y = ((1 - joystick[1]) / 2) * 100
  return { left: `${x}%`, top: `${y}%` }
}

function getGripClass(value: number): string {
  if (value >= 0.8) return 'high'
  if (value >= 0.5) return 'mid'
  return 'low'
}

onMounted(() => {
  fetchVRStatus()
  pollTimer = window.setInterval(fetchVRStatus, 100)
})

onUnmounted(() => {
  if (pollTimer) clearInterval(pollTimer)
})
</script>

<style scoped>
.vr-panel-modern {
  padding: clamp(12px, 2vw, 20px);
  font-family: var(--font-body);
  display: flex;
  flex-direction: column;
  gap: clamp(12px, 2vw, 20px);
}

/* 状态栏 */
.vr-status-bar {
  display: flex;
  gap: clamp(10px, 1.6vw, 16px);
  flex-wrap: wrap;
}

.status-badge {
  flex: 1;
  min-width: 220px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  background: rgba(30, 41, 59, 0.5);
  backdrop-filter: blur(15px);
  border-radius: 14px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  position: relative;
  overflow: hidden;
}

.status-badge.online {
  border-color: rgba(16, 185, 129, 0.4);
  background: rgba(16, 185, 129, 0.08);
}

.badge-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 23, 42, 0.6);
  border-radius: 12px;
  color: #64748B;
  font-size: 22px;
}

.status-badge.online .badge-icon {
  color: #10B981;
  background: rgba(16, 185, 129, 0.15);
}

.badge-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.badge-title {
  font-size: 15px;
  font-weight: 600;
  font-family: var(--font-heading);
  color: #F8FAFC;
}

.badge-subtitle {
  font-size: 12px;
  color: #94A3B8;
}

.pulse-ring {
  position: absolute;
  right: 20px;
  width: 12px;
  height: 12px;
  background: #10B981;
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(16, 185, 129, 1);
  animation: pulse-animation 2s infinite;
}

@keyframes pulse-animation {
  0% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
  }
}

.head-pose-mini {
  flex: 1;
  min-width: 220px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  background: rgba(30, 41, 59, 0.5);
  backdrop-filter: blur(15px);
  border-radius: 14px;
  border: 1px solid rgba(148, 163, 184, 0.2);
}

.head-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(139, 92, 246, 0.15);
  border-radius: 12px;
  color: #A78BFA;
  font-size: 22px;
}

.pose-data {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.data-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.data-label {
  font-weight: 600;
  color: #94A3B8;
  min-width: 30px;
}

.data-value {
  font-family: 'Monaco', 'Consolas', monospace;
  color: #3B82F6;
  font-size: 12px;
}

.data-value.rpy {
  color: #10B981;
}

/* 控制器网格 */
.controllers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: clamp(12px, 2vw, 20px);
}

.controller-panel {
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(15px);
  border-radius: 16px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  padding: clamp(14px, 2vw, 20px);
  display: flex;
  flex-direction: column;
  gap: clamp(12px, 1.6vw, 16px);
  transition: all 0.3s ease;
}

.controller-panel.active {
  border-color: rgba(245, 158, 11, 0.5);
  box-shadow: 0 8px 32px rgba(245, 158, 11, 0.2);
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.15);
}

.controller-icon {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(245, 158, 11, 0.15);
  border-radius: 8px;
  color: #F59E0B;
  font-size: 18px;
}

.controller-name {
  font-size: 15px;
  font-weight: 600;
  font-family: var(--font-heading);
  color: #F8FAFC;
}

/* Clutch 块 */
.clutch-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: clamp(14px, 2vw, 20px);
  background: rgba(15, 23, 42, 0.5);
  border-radius: 12px;
  border: 2px solid rgba(148, 163, 184, 0.15);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.clutch-block.locked {
  border-color: rgba(16, 185, 129, 0.6);
  background: rgba(16, 185, 129, 0.1);
}

.clutch-icon-wrapper {
  color: #64748B;
  transition: all 0.3s ease;
}

.clutch-block.locked .clutch-icon-wrapper {
  color: #10B981;
}

.clutch-text {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #64748B;
  transition: all 0.3s ease;
}

.clutch-block.locked .clutch-text {
  color: #10B981;
}

.clutch-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%);
  pointer-events: none;
  animation: glow-pulse 2s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

/* 摇杆区域 */
.joystick-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.joystick-visual {
  width: clamp(96px, 14vw, 140px);
  height: clamp(96px, 14vw, 140px);
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%);
  border-radius: 50%;
  position: relative;
  border: 2px solid rgba(148, 163, 184, 0.3);
  box-shadow: inset 0 4px 20px rgba(0, 0, 0, 0.4);
}

.joystick-cross .cross-h,
.joystick-cross .cross-v {
  position: absolute;
  background: rgba(148, 163, 184, 0.1);
}

.cross-h {
  width: 100%;
  height: 1px;
  top: 50%;
  left: 0;
}

.cross-v {
  width: 1px;
  height: 100%;
  top: 0;
  left: 50%;
}

.joystick-cursor {
  position: absolute;
  transform: translate(-50%, -50%);
  transition: all 0.1s ease;
}

.cursor-ring {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid #3B82F6;
  box-shadow: 0 0 12px rgba(59, 130, 246, 0.6);
  animation: ring-pulse 1.5s ease-in-out infinite;
}

.cursor-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  background: #3B82F6;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.8);
}

@keyframes ring-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
}

.joystick-bounds {
  position: absolute;
  inset: 8px;
  border-radius: 50%;
  border: 1px dashed rgba(148, 163, 184, 0.2);
  pointer-events: none;
}

.joystick-value {
  font-size: 12px;
  font-family: 'Monaco', 'Consolas', monospace;
  color: #10B981;
}

/* 按钮行 */
.buttons-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.button-circle,
.button-pill {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 23, 42, 0.6);
  border: 2px solid rgba(148, 163, 184, 0.2);
  border-radius: 50%;
  font-size: 13px;
  font-weight: 700;
  color: #94A3B8;
  transition: all 0.2s ease;
  cursor: default;
}

.button-pill {
  border-radius: 20px;
  font-size: 12px;
}

.button-circle.pressed,
.button-pill.pressed {
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  border-color: #3B82F6;
  color: #fff;
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.5);
  transform: scale(0.95);
}

/* 轴区域 */
.axis-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.axis-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.axis-name {
  font-size: 12px;
  font-weight: 600;
  color: #94A3B8;
  min-width: 50px;
}

.axis-track {
  flex: 1;
  height: 10px;
  background: rgba(15, 23, 42, 0.6);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.axis-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.1s ease, background 0.3s ease;
}

.axis-fill.trigger {
  background: linear-gradient(90deg, #3B82F6 0%, #60A5FA 100%);
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.5);
}

.axis-fill.grip.low {
  background: linear-gradient(90deg, #64748B 0%, #94A3B8 100%);
}

.axis-fill.grip.mid {
  background: linear-gradient(90deg, #F59E0B 0%, #FBBF24 100%);
  box-shadow: 0 0 8px rgba(245, 158, 11, 0.5);
}

.axis-fill.grip.high {
  background: linear-gradient(90deg, #10B981 0%, #34D399 100%);
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
}

.axis-percent {
  font-size: 12px;
  font-weight: 600;
  font-family: 'Monaco', 'Consolas', monospace;
  color: #CBD5E1;
  min-width: 40px;
  text-align: right;
}

/* 位姿折叠 */
.pose-collapse {
  background: rgba(15, 23, 42, 0.4);
  border-radius: 8px;
  overflow: hidden;
}

.pose-collapse summary {
  padding: 12px 14px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  color: #94A3B8;
  user-select: none;
  transition: all 0.2s ease;
}

.pose-collapse summary:hover {
  background: rgba(30, 41, 59, 0.5);
  color: #F8FAFC;
}

.pose-content {
  padding: 12px 14px;
  border-top: 1px solid rgba(148, 163, 184, 0.1);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pose-row {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #94A3B8;
}

.pose-row .val {
  font-family: 'Monaco', 'Consolas', monospace;
  color: #3B82F6;
}

/* 提示栏 */
.tips-bar {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.tip {
  flex: 1;
  min-width: 220px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 10px;
  font-size: 13px;
  color: #93C5FD;
}

@media (max-width: 1200px) {
  .vr-status-bar {
    flex-direction: column;
  }
}

@media (max-width: 900px) {
  .controllers-grid {
    grid-template-columns: 1fr;
  }
}

.tip .el-icon {
  color: #3B82F6;
  flex-shrink: 0;
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
</style>
