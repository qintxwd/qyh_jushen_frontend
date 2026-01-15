<template>
  <div class="lift-control-container">
    <el-container>
      <el-header>
        <div class="header-content">
          <h2>升降电机控制</h2>
          <el-button @click="goBack" size="small">
            <SvgIcon name="back" :size="16" />
            返回
          </el-button>
        </div>
      </el-header>

      <el-main>
        <el-row :gutter="20">
          <!-- 左侧：状态显示 -->
          <el-col :span="10">
            <el-card class="status-card">
              <template #header>
                <div class="card-header">
                  <span>升降电机状态</span>
                  <el-tag :type="state.connected ? 'success' : 'danger'" size="large">
                    {{ state.connected ? '已连接' : '未连接' }}
                  </el-tag>
                </div>
              </template>

              <!-- 连接状态提示 -->
              <el-alert
                v-if="!state.connected"
                title="PLC 未连接"
                type="error"
                description="无法与 PLC 通信，请检查网络连接和 PLC 状态。系统将每 10 秒尝试重连。"
                show-icon
                :closable="false"
                style="margin-bottom: 20px"
              />

              <!-- 报警提示 -->
              <el-alert
                v-if="state.alarm"
                title="报警！"
                type="error"
                description="升降电机发生报警，请检查设备状态并复位。"
                show-icon
                :closable="false"
                style="margin-bottom: 20px"
              />

              <!-- 状态信息 -->
              <el-descriptions :column="1" border size="large">
                <el-descriptions-item label="使能状态">
                  <el-tag :type="state.enabled ? 'success' : 'info'" size="large">
                    {{ state.enabled ? '已使能' : '未使能' }}
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="当前高度">
                  <span class="big-value">{{ state.currentPosition.toFixed(2) }}</span>
                  <span class="unit">mm</span>
                </el-descriptions-item>
                <el-descriptions-item label="当前速度">
                  <span class="big-value">{{ state.currentSpeed.toFixed(0) }}</span>
                  <span class="unit">mm/s</span>
                </el-descriptions-item>
                <el-descriptions-item label="位置到达">
                  <el-tag :type="state.positionReached ? 'success' : 'warning'">
                    {{ state.positionReached ? '已到达' : '运动中' }}
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="报警状态">
                  <el-tag :type="state.alarm ? 'danger' : 'success'">
                    {{ state.alarm ? '有报警' : '正常' }}
                  </el-tag>
                </el-descriptions-item>
              </el-descriptions>

              <!-- 高度可视化 -->
              <div class="height-visualization">
                <div class="height-bar-container">
                  <div class="height-bar">
                    <div 
                      class="height-indicator" 
                      :style="{ bottom: heightPercentage + '%' }"
                    >
                      <div class="indicator-label">{{ state.currentPosition.toFixed(1) }} mm</div>
                    </div>
                    <div class="height-fill" :style="{ height: heightPercentage + '%' }"></div>
                  </div>
                  <div class="height-scale">
                    <span>{{ maxHeight }} mm</span>
                    <span>{{ maxHeight / 2 }} mm</span>
                    <span>0 mm</span>
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>

          <!-- 右侧：控制面板 -->
          <el-col :span="14">
            <el-card class="control-card">
              <template #header>
                <div class="card-header">
                  <span>控制面板</span>
                </div>
              </template>

              <!-- 使能控制 -->
              <div class="control-section">
                <h4>电机使能</h4>
                <el-button
                  :type="state.enabled ? 'danger' : 'primary'"
                  size="large"
                  @click="toggleEnable"
                  :loading="loading.enable"
                  :disabled="!state.connected"
                  style="width: 200px"
                >
                  <SvgIcon v-if="state.enabled" name="switchbutton" :size="16" />
                  <SvgIcon v-else name="videoplay" :size="16" />
                  {{ state.enabled ? '下使能' : '上使能' }}
                </el-button>
              </div>

              <el-divider />

              <!-- 速度设置 -->
              <div class="control-section">
                <h4>速度设置</h4>
                <el-row :gutter="10" align="middle">
                  <el-col :span="12">
                    <el-input-number
                      v-model="inputSpeed"
                      :min="1"
                      :max="100"
                      :step="1"
                      size="large"
                      :disabled="!state.connected || !state.enabled"
                      style="width: 100%"
                    />
                  </el-col>
                  <el-col :span="4">
                    <span class="unit">mm/s</span>
                  </el-col>
                  <el-col :span="8">
                    <el-button
                      type="primary"
                      size="large"
                      @click="setSpeed"
                      :loading="loading.speed"
                      :disabled="!state.connected || !state.enabled"
                    >
                      <SvgIcon name="check" :size="16" />
                      确认
                    </el-button>
                  </el-col>
                </el-row>
              </div>

              <el-divider />

              <!-- 目标位置 -->
              <div class="control-section">
                <h4>目标位置</h4>
                <el-row :gutter="10" align="middle">
                  <el-col :span="12">
                    <el-input-number
                      v-model="inputPosition"
                      :min="0"
                      :max="maxHeight"
                      :step="10"
                      :precision="1"
                      size="large"
                      :disabled="!state.connected || !state.enabled"
                      style="width: 100%"
                    />
                  </el-col>
                  <el-col :span="4">
                    <span class="unit">mm</span>
                  </el-col>
                  <el-col :span="8">
                    <el-button
                      type="success"
                      size="large"
                      @click="goToPosition"
                      :loading="loading.position"
                      :disabled="!state.connected || !state.enabled"
                    >
                      <SvgIcon name="position" :size="16" />
                      GO
                    </el-button>
                  </el-col>
                </el-row>
                <!-- 快捷位置 -->
                <div class="quick-positions">
                  <el-button
                    v-for="pos in quickPositions"
                    :key="pos.value"
                    size="small"
                    @click="inputPosition = pos.value"
                    :disabled="!state.connected || !state.enabled"
                  >
                    {{ pos.label }}
                  </el-button>
                </div>
              </div>

              <el-divider />

              <!-- 手动控制 -->
              <div class="control-section">
                <h4>手动控制</h4>
                <div class="manual-controls">
                  <el-button
                    type="primary"
                    size="large"
                    class="manual-btn up-btn"
                    @mousedown="startManualMove('up')"
                    @mouseup="stopManualMove"
                    @mouseleave="stopManualMove"
                    @touchstart.prevent="startManualMove('up')"
                    @touchend.prevent="stopManualMove"
                    :disabled="!state.connected || !state.enabled"
                  >
                    <SvgIcon name="top" :size="16" />
                    上升
                  </el-button>
                  <el-button
                    type="primary"
                    size="large"
                    class="manual-btn down-btn"
                    @mousedown="startManualMove('down')"
                    @mouseup="stopManualMove"
                    @mouseleave="stopManualMove"
                    @touchstart.prevent="startManualMove('down')"
                    @touchend.prevent="stopManualMove"
                    :disabled="!state.connected || !state.enabled"
                  >
                    <SvgIcon name="bottom" :size="16" />
                    下降
                  </el-button>
                </div>
                <p class="manual-hint">按住按钮持续运动，松开停止</p>
              </div>

              <el-divider />

              <!-- 报警复位 -->
              <div class="control-section">
                <h4>报警处理</h4>
                <el-button
                  type="warning"
                  size="large"
                  @click="resetAlarm"
                  :loading="loading.reset"
                  :disabled="!state.connected"
                  style="width: 200px"
                >
                  <SvgIcon name="refreshright" :size="16" />
                  复位报警
                </el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import { normalizeApiResponse } from '@/api/client'
import { getApiV1BaseUrl } from '@/utils/apiUrl'

const router = useRouter()

// API 基础 URL - 动态获取
const getApiBase = () => getApiV1BaseUrl()

// 最大高度 (mm)
const maxHeight = ref(500)

// 状态
const state = reactive({
  connected: false,
  enabled: false,
  currentPosition: 0,
  currentSpeed: 20,
  positionReached: true,
  alarm: false
})

// 输入值
const inputSpeed = ref(20)
const inputPosition = ref(0)

// 加载状态
const loading = reactive({
  enable: false,
  speed: false,
  position: false,
  reset: false
})

// 快捷位置
const quickPositions = [
  { label: '最低', value: 0 },
  { label: '1/4', value: 125 },
  { label: '中间', value: 250 },
  { label: '3/4', value: 375 },
  { label: '最高', value: 500 }
]

// 高度百分比（用于可视化）
const heightPercentage = computed(() => {
  return Math.min(100, Math.max(0, (state.currentPosition / maxHeight.value) * 100))
})

// 手动移动状态
let isManualMoving = false

// 发送控制命令
const sendCommand = async (command: number, value: number = 0, hold: boolean = false) => {
  try {
    const response = await axios.post(
      `${getApiBase()}/lift/control`,
      { command, value, hold },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    return normalizeApiResponse(response.data)
  } catch (error: any) {
    console.error('Lift control error:', error)
    throw error
  }
}

// 切换使能
const toggleEnable = async () => {
  loading.enable = true
  try {
    const command = state.enabled ? 2 : 1  // CMD_DISABLE=2, CMD_ENABLE=1
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
const setSpeed = async () => {
  loading.speed = true
  try {
    const result = await sendCommand(3, inputSpeed.value)  // CMD_SET_SPEED=3
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

// 去目标位置
const goToPosition = async () => {
  loading.position = true
  try {
    const result = await sendCommand(4, inputPosition.value)  // CMD_GO_POSITION=4
    if (result.success) {
      ElMessage.success('开始移动到目标位置')
    } else {
      ElMessage.error(result.message)
    }
  } catch (error: any) {
    ElMessage.error('操作失败: ' + (error.response?.data?.detail || error.message))
  } finally {
    loading.position = false
  }
}

// 开始手动移动
const startManualMove = async (direction: 'up' | 'down') => {
  if (!state.enabled || !state.connected || isManualMoving) return
  
  isManualMoving = true
  try {
    const command = direction === 'up' ? 5 : 6  // CMD_MOVE_UP=5, CMD_MOVE_DOWN=6
    await sendCommand(command, 0, true)  // hold=true
  } catch (error) {
    console.error('Manual move start error:', error)
  }
}

// 停止手动移动
const stopManualMove = async () => {
  if (!isManualMoving) return
  
  isManualMoving = false
  try {
    // 发送停止命令 (hold=false)
    await sendCommand(5, 0, false)  // CMD_MOVE_UP with hold=false stops
  } catch (error) {
    console.error('Manual move stop error:', error)
  }
}

// 复位报警
const resetAlarm = async () => {
  loading.reset = true
  try {
    const result = await sendCommand(7)  // CMD_RESET_ALARM=7
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
const fetchState = async () => {
  try {
    const response = await axios.get(`${getApiBase()}/lift/state`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })

    const data = normalizeApiResponse(response.data)
    if (data) {
      state.connected = data.connected ?? false
      state.enabled = data.enabled ?? false
      state.currentPosition = data.current_position ?? 0
      state.currentSpeed = data.current_speed ?? 20
      state.positionReached = data.position_reached ?? true
      state.alarm = data.alarm ?? false
    }
  } catch (error) {
    console.error('获取状态失败:', error)
    state.connected = false
  }
}

// 返回
const goBack = () => {
  router.push('/')
}

// 定时刷新状态
let stateInterval: number | null = null

onMounted(() => {
  fetchState()
  stateInterval = setInterval(fetchState, 500)  // 每 500ms 刷新状态
})

onUnmounted(() => {
  if (stateInterval) {
    clearInterval(stateInterval)
  }
  // 确保停止手动移动
  if (isManualMoving) {
    stopManualMove()
  }
})
</script>

<style scoped>
.lift-control-container {
  height: 100vh;
  background-color: #f5f7fa;
}

.el-header {
  background-color: #545c64;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.header-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content h2 {
  margin: 0;
  font-size: 18px;
}

.el-main {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-card, .control-card {
  height: 100%;
}

.big-value {
  font-size: 28px;
  font-weight: bold;
  color: #409eff;
}

.unit {
  color: #909399;
  margin-left: 5px;
}

/* 高度可视化 */
.height-visualization {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

.height-bar-container {
  display: flex;
  gap: 10px;
  align-items: stretch;
}

.height-bar {
  width: 60px;
  height: 200px;
  background: linear-gradient(to top, #e6f7ff, #bae7ff);
  border: 2px solid #91d5ff;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.height-fill {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, #1890ff, #69c0ff);
  transition: height 0.3s ease;
}

.height-indicator {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 70px;
  height: 4px;
  background-color: #f5222d;
  z-index: 10;
  transition: bottom 0.3s ease;
}

.indicator-label {
  position: absolute;
  left: 75px;
  top: -8px;
  white-space: nowrap;
  font-size: 12px;
  font-weight: bold;
  color: #f5222d;
}

.height-scale {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 12px;
  color: #909399;
  height: 200px;
}

/* 控制面板 */
.control-section {
  margin-bottom: 10px;
}

.control-section h4 {
  margin: 0 0 15px 0;
  color: #303133;
  font-size: 14px;
}

.quick-positions {
  margin-top: 10px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

/* 手动控制按钮 */
.manual-controls {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.manual-btn {
  width: 120px;
  height: 80px;
  font-size: 16px;
}

.manual-btn .el-icon {
  font-size: 24px;
  margin-bottom: 5px;
}

.up-btn {
  background: linear-gradient(135deg, #67c23a, #85ce61);
  border-color: #67c23a;
}

.up-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #85ce61, #67c23a);
}

.down-btn {
  background: linear-gradient(135deg, #e6a23c, #f0b860);
  border-color: #e6a23c;
}

.down-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #f0b860, #e6a23c);
}

.manual-hint {
  text-align: center;
  color: #909399;
  font-size: 12px;
  margin-top: 10px;
}

/* 禁用状态样式 */
:deep(.el-button.is-disabled) {
  opacity: 0.6;
}
</style>
