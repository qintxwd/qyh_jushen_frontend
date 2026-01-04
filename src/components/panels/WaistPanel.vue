<template>
  <div class="waist-panel">
    <!-- 连接状态提示 -->
    <div v-if="!state.connected" class="panel-section">
      <el-alert
        title="PLC 未连接"
        type="error"
        description="无法与腰部电机通信"
        show-icon
        :closable="false"
      />
    </div>

    <!-- 报警提示 -->
    <div v-if="state.alarm" class="panel-section">
      <el-alert
        title="电机报警"
        type="error"
        show-icon
        :closable="false"
      >
        <template #default>
          <el-button type="danger" size="small" @click="resetAlarm" :loading="loading.reset">
            复位报警
          </el-button>
        </template>
      </el-alert>
    </div>

    <!-- 当前状态 -->
    <div class="panel-section">
      <h3 class="section-title">当前状态</h3>
      <div class="status-visual">
        <!-- 角度可视化 -->
        <div class="angle-column">
          <div class="angle-visual">
            <div class="body-base"></div>
            <div 
              class="body-torso" 
              :style="{ transform: `rotate(${-state.currentAngle}deg)` }"
            >
              <div class="torso-line"></div>
              <div class="torso-head"></div>
            </div>
            <div class="angle-label">{{ state.currentAngle.toFixed(1) }}°</div>
          </div>
          <div class="angle-scale">
            <span>45°</span>
            <span>22°</span>
            <span>0°</span>
          </div>
        </div>

        <!-- 状态信息 -->
        <div class="status-info">
          <div class="info-row">
            <span class="info-label">连接</span>
            <el-tag :type="state.connected ? 'success' : 'danger'" size="small">
              {{ state.connected ? '已连接' : '断开' }}
            </el-tag>
          </div>
          <div class="info-row">
            <span class="info-label">使能</span>
            <el-tag :type="state.enabled ? 'success' : 'info'" size="small">
              {{ state.enabled ? '已使能' : '未使能' }}
            </el-tag>
          </div>
          <div class="info-row">
            <span class="info-label">角度</span>
            <span class="info-value">{{ state.currentAngle.toFixed(1) }}°</span>
          </div>
          <div class="info-row">
            <span class="info-label">位置</span>
            <span class="info-value">{{ state.currentPosition }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">状态</span>
            <el-tag :type="state.positionReached ? 'success' : 'warning'" size="small">
              {{ state.positionReached ? '已到位' : '运动中' }}
            </el-tag>
          </div>
        </div>
      </div>
    </div>

    <el-divider />

    <!-- 使能控制 -->
    <div class="panel-section">
      <h3 class="section-title">电机使能</h3>
      <el-button
        :type="state.enabled ? 'danger' : 'primary'"
        @click="toggleEnable"
        :loading="loading.enable"
        :disabled="!state.connected"
        style="width: 100%"
      >
        <el-icon v-if="state.enabled"><VideoPause /></el-icon>
        <el-icon v-else><VideoPlay /></el-icon>
        {{ state.enabled ? '下使能' : '上使能' }}
      </el-button>
    </div>

    <el-divider />

    <!-- 速度设置 -->
    <div class="panel-section">
      <h3 class="section-title">速度设置</h3>
      <div class="speed-control">
        <el-input-number
          v-model="inputSpeed"
          :min="100"
          :max="5000"
          :step="100"
          size="small"
          :disabled="!state.connected || !state.enabled"
          style="width: 120px"
        />
        <el-button
          type="primary"
          size="small"
          @click="setSpeed"
          :loading="loading.speed"
          :disabled="!state.connected || !state.enabled"
        >
          设置
        </el-button>
      </div>
    </div>

    <el-divider />

    <!-- 目标角度 -->
    <div class="panel-section">
      <h3 class="section-title">目标角度</h3>
      <div class="angle-control">
        <div class="angle-input">
          <el-slider
            v-model="inputAngle"
            :min="0"
            :max="45"
            :step="1"
            :disabled="!state.connected || !state.enabled"
            show-input
            :show-input-controls="false"
            style="flex: 1"
          />
          <span class="unit">°</span>
        </div>
        <div class="angle-buttons">
          <el-button
            type="success"
            size="small"
            @click="goToAngle"
            :loading="loading.angle"
            :disabled="!state.connected || !state.enabled"
          >
            <el-icon><Position /></el-icon>
            GO
          </el-button>
          <el-button
            type="primary"
            size="small"
            @click="goUpright"
            :loading="loading.upright"
            :disabled="!state.connected || !state.enabled"
          >
            <el-icon><Aim /></el-icon>
            回正
          </el-button>
          <el-button
            type="danger"
            size="small"
            @click="stopMove"
            :loading="loading.stop"
            :disabled="!state.connected || !state.enabled"
          >
            <el-icon><VideoPause /></el-icon>
            STOP
          </el-button>
        </div>
        
        <!-- 快捷角度 -->
        <div class="quick-angles">
          <el-button
            v-for="pos in quickAngles"
            :key="pos.value"
            size="small"
            @click="setQuickAngle(pos.value)"
            :disabled="!state.connected || !state.enabled"
          >
            {{ pos.label }}
          </el-button>
        </div>
      </div>
    </div>

    <el-divider />

    <!-- 手动控制 -->
    <div class="panel-section">
      <h3 class="section-title">手动控制</h3>
      <div class="manual-controls">
        <el-button
          type="warning"
          size="large"
          class="jog-btn"
          @mousedown="startManualMove('forward')"
          @mouseup="stopManualMove"
          @mouseleave="stopManualMove"
          @touchstart.prevent="startManualMove('forward')"
          @touchend.prevent="stopManualMove"
          :disabled="!state.connected || !state.enabled"
        >
          <el-icon :size="24"><Top /></el-icon>
          <span>前倾</span>
        </el-button>
        <el-button
          type="success"
          size="large"
          class="jog-btn"
          @mousedown="startManualMove('back')"
          @mouseup="stopManualMove"
          @mouseleave="stopManualMove"
          @touchstart.prevent="startManualMove('back')"
          @touchend.prevent="stopManualMove"
          :disabled="!state.connected || !state.enabled"
        >
          <el-icon :size="24"><Bottom /></el-icon>
          <span>后仰</span>
        </el-button>
      </div>
      <p class="jog-hint">按住按钮持续运动，松开停止</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import { getApiV1BaseUrl } from '@/utils/apiUrl'

// API 基础 URL - 动态获取
const getApiBase = () => getApiV1BaseUrl()

// 最大角度
const maxAngle = 45

// 状态 - 对应 WaistState
const state = reactive({
  connected: false,
  enabled: false,
  currentPosition: 230715,
  currentAngle: 0,
  currentSpeed: 1000,
  positionReached: true,
  alarm: false
})

// 输入值
const inputSpeed = ref(1000)
const inputAngle = ref(0)

// 加载状态
const loading = reactive({
  enable: false,
  speed: false,
  angle: false,
  upright: false,
  reset: false,
  stop: false
})

// 快捷角度
const quickAngles = [
  { label: '竖直', value: 0 },
  { label: '15°', value: 15 },
  { label: '30°', value: 30 },
  { label: '45°', value: 45 }
]

// 手动移动状态
let isManualMoving = false

// 命令常量 - 对应 WaistControl.srv
const CMD = {
  ENABLE: 1,
  DISABLE: 2,
  SET_SPEED: 3,
  GO_POSITION: 4,
  GO_ANGLE: 5,
  LEAN_FORWARD: 6,
  LEAN_BACK: 7,
  RESET_ALARM: 8,
  STOP: 9,
  GO_UPRIGHT: 10
}

// 发送控制命令
async function sendCommand(command: number, value: number = 0, hold: boolean = false) {
  try {
    const response = await axios.post(
      `${getApiBase()}/waist/control`,
      { command, value, hold },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    return response.data
  } catch (error: any) {
    console.error('Waist control error:', error)
    throw error
  }
}

// 切换使能
async function toggleEnable() {
  loading.enable = true
  try {
    const command = state.enabled ? CMD.DISABLE : CMD.ENABLE
    const result = await sendCommand(command)
    if (result.success) {
      ElMessage.success(result.message)
    } else {
      ElMessage.error(result.message)
    }
  } catch (error: any) {
    ElMessage.error('操作失败: ' + (error.response?.data?.detail || error.message))
  } finally {
    loading.enable = false
  }
}

// 设置速度
async function setSpeed() {
  loading.speed = true
  try {
    const result = await sendCommand(CMD.SET_SPEED, inputSpeed.value)
    if (result.success) {
      ElMessage.success('速度设置成功')
    } else {
      ElMessage.error(result.message)
    }
  } catch (error: any) {
    ElMessage.error('设置失败: ' + (error.response?.data?.detail || error.message))
  } finally {
    loading.speed = false
  }
}

// 去目标角度
async function goToAngle() {
  loading.angle = true
  try {
    const result = await sendCommand(CMD.GO_ANGLE, inputAngle.value)
    if (result.success) {
      ElMessage.success('开始移动')
    } else {
      ElMessage.error(result.message)
    }
  } catch (error: any) {
    ElMessage.error('操作失败: ' + (error.response?.data?.detail || error.message))
  } finally {
    loading.angle = false
  }
}

// 回到竖直位置
async function goUpright() {
  loading.upright = true
  try {
    const result = await sendCommand(CMD.GO_UPRIGHT)
    if (result.success) {
      ElMessage.success('回到竖直位置')
    } else {
      ElMessage.error(result.message)
    }
  } catch (error: any) {
    ElMessage.error('操作失败: ' + (error.response?.data?.detail || error.message))
  } finally {
    loading.upright = false
  }
}

// 停止运动
async function stopMove() {
  loading.stop = true
  try {
    const result = await sendCommand(CMD.STOP)
    if (result.success) {
      ElMessage.warning('运动已停止')
    } else {
      ElMessage.error(result.message)
    }
  } catch (error: any) {
    ElMessage.error('停止失败: ' + (error.response?.data?.detail || error.message))
  } finally {
    loading.stop = false
  }
}

// 设置快捷角度
function setQuickAngle(value: number) {
  inputAngle.value = value
  goToAngle()
}

// 开始手动移动
async function startManualMove(direction: 'forward' | 'back') {
  if (!state.enabled || !state.connected || isManualMoving) return
  
  isManualMoving = true
  try {
    const command = direction === 'forward' ? CMD.LEAN_FORWARD : CMD.LEAN_BACK
    await sendCommand(command, 0, true)  // hold=true 开始运动
  } catch (error) {
    console.error('Manual move start error:', error)
    isManualMoving = false
  }
}

// 停止手动移动
async function stopManualMove() {
  if (!isManualMoving) return
  
  isManualMoving = false
  try {
    await sendCommand(CMD.LEAN_FORWARD, 0, false)  // hold=false 停止运动
  } catch (error) {
    console.error('Manual move stop error:', error)
  }
}

// 复位报警
async function resetAlarm() {
  loading.reset = true
  try {
    const result = await sendCommand(CMD.RESET_ALARM)
    if (result.success) {
      ElMessage.success('报警已复位')
    } else {
      ElMessage.error(result.message)
    }
  } catch (error: any) {
    ElMessage.error('复位失败: ' + (error.response?.data?.detail || error.message))
  } finally {
    loading.reset = false
  }
}

// 获取状态
async function fetchState() {
  try {
    const response = await axios.get(`${getApiBase()}/waist/state`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    
    if (response.data) {
      state.connected = response.data.connected ?? false
      state.enabled = response.data.enabled ?? false
      state.currentPosition = response.data.current_position ?? 230715
      state.currentAngle = response.data.current_angle ?? 0
      state.currentSpeed = response.data.current_speed ?? 1000
      state.positionReached = response.data.position_reached ?? true
      state.alarm = response.data.alarm ?? false
    }
  } catch (error) {
    console.error('获取状态失败:', error)
    state.connected = false
  }
}

// 定时刷新状态
let stateInterval: number | null = null

onMounted(() => {
  fetchState()
  stateInterval = setInterval(fetchState, 500)
})

onUnmounted(() => {
  if (stateInterval) {
    clearInterval(stateInterval)
  }
  if (isManualMoving) {
    stopManualMove()
  }
})
</script>

<style scoped>
.waist-panel {
  padding: var(--spacing-lg);
}

.panel-section {
  margin-bottom: var(--spacing-sm);
}

.section-title {
  margin: 0 0 var(--spacing-md) 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* 状态可视化 */
.status-visual {
  display: flex;
  gap: var(--spacing-lg);
  padding: var(--spacing-md);
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: var(--radius-lg);
  transition: all 0.3s var(--transition-smooth);
}

.status-visual:hover {
  background: rgba(30, 41, 59, 0.6);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.angle-column {
  display: flex;
  gap: var(--spacing-xs);
}

.angle-visual {
  width: 80px;
  height: 100px;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: rgba(15, 23, 42, 0.3);
  border-radius: var(--radius-md);
  border: 1px solid rgba(148, 163, 184, 0.1);
}

.body-base {
  position: absolute;
  bottom: 5px;
  width: 40px;
  height: 20px;
  background: rgba(148, 163, 184, 0.3);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-sm);
  border: 1px solid rgba(148, 163, 184, 0.2);
}

.body-torso {
  position: absolute;
  bottom: 18px;
  width: 4px;
  height: 60px;
  transform-origin: bottom center;
  transition: transform 0.3s ease;
}

.torso-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 4px;
  height: 50px;
  background: linear-gradient(to top, var(--color-primary), #fbbf24);
  border-radius: var(--radius-xs);
  box-shadow: 0 0 15px rgba(245, 158, 11, 0.5);
}

.torso-head {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 16px;
  background: linear-gradient(135deg, var(--color-primary), #fbbf24);
  border-radius: 50%;
  box-shadow: 0 0 12px rgba(245, 158, 11, 0.6);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.angle-label {
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  font-weight: 700;
  color: var(--color-primary);
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(10px);
  padding: var(--spacing-xs) var(--spacing-xs);
  border-radius: var(--radius-xs);
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.angle-scale {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 9px;
  color: var(--color-text-tertiary);
  height: 100px;
  padding: 2px 0;
}

.status-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-xs) var(--spacing-sm);
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: var(--radius-sm);
}

.info-label {
  font-size: 11px;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.info-value {
  font-size: 12px;
  font-family: 'Consolas', monospace;
  color: #10b981;
  font-weight: 700;
}

/* 速度控制 */
.speed-control {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

/* 角度控制 */
.angle-control {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.angle-input {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.angle-buttons {
  display: flex;
  gap: var(--spacing-sm);
}

.unit {
  font-size: 12px;
  color: var(--color-text-tertiary);
  min-width: 20px;
}

.quick-angles {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.quick-angles .el-button {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: 12px;
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(148, 163, 184, 0.2);
  transition: all 0.3s var(--transition-smooth);
}

.quick-angles .el-button:hover {
  background: rgba(30, 41, 59, 0.6);
  border-color: var(--color-primary);
  transform: translateY(-2px);
}

/* 手动控制 */
.manual-controls {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
}

.jog-btn {
  width: 100px;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
}

.jog-btn span {
  font-size: 12px;
  font-weight: 600;
}

.jog-hint {
  text-align: center;
  font-size: 11px;
  color: var(--color-text-tertiary);
  margin: var(--spacing-sm) 0 0 0;
}

:deep(.el-divider) {
  margin: var(--spacing-lg) 0;
  border-color: rgba(148, 163, 184, 0.2);
}

:deep(.el-alert) {
  padding: var(--spacing-sm) var(--spacing-md);
}

:deep(.el-alert .el-alert__title) {
  font-size: 12px;
}

:deep(.el-input-number--small) {
  width: auto;
}

:deep(.el-slider) {
  --el-slider-main-bg-color: var(--color-primary);
  --el-slider-runway-bg-color: rgba(15, 23, 42, 0.6);
  --el-slider-button-wrapper-size: 36px;
  --el-slider-button-size: 16px;
}

:deep(.el-slider__bar) {
  background: linear-gradient(90deg, var(--color-primary), #fbbf24);
}

:deep(.el-slider__button) {
  border: 2px solid var(--color-primary);
  background: rgba(15, 23, 42, 0.9);
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.4);
}
</style>
