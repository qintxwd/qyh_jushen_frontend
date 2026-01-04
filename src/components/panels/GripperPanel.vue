<template>
  <div class="gripper-panel">
    <!-- 夹爪选择 -->
    <div class="panel-section">
      <div class="gripper-tabs">
        <div 
          class="gripper-tab" 
          :class="{ active: selectedGripper === 'left' }"
          @click="selectedGripper = 'left'"
        >
          <el-icon><Scissor /></el-icon>
          左夹爪
        </div>
        <div 
          class="gripper-tab" 
          :class="{ active: selectedGripper === 'right' }"
          @click="selectedGripper = 'right'"
        >
          <el-icon><Scissor /></el-icon>
          右夹爪
        </div>
      </div>
    </div>

    <!-- 当前状态 -->
    <div class="panel-section">
      <h3 class="section-title">当前状态</h3>
      <div class="status-display">
        <div class="status-row">
          <span class="status-label">激活状态</span>
          <el-tag :type="currentGripperState.is_activated ? 'success' : 'danger'" size="small">
            {{ currentGripperState.is_activated ? '已激活' : '未激活' }}
          </el-tag>
        </div>
        <div class="status-row">
          <span class="status-label">通信状态</span>
          <el-tag :type="currentGripperState.communication_ok ? 'success' : 'danger'" size="small">
            {{ currentGripperState.communication_ok ? '正常' : '断开' }}
          </el-tag>
        </div>
        <div class="status-row">
          <span class="status-label">物体检测</span>
          <el-tag :type="currentGripperState.object_status === 2 ? 'success' : 'info'" size="small">
            {{ currentGripperState.object_status_text }}
          </el-tag>
        </div>
        <div class="status-row">
          <span class="status-label">当前位置</span>
          <span class="status-value">{{ currentGripperState.current_position }}</span>
        </div>
        <el-progress 
          :percentage="Math.round(currentGripperState.current_position / 255 * 100)" 
          :stroke-width="12"
          :format="() => currentGripperState.current_position + ' / 255'"
        />
        <div class="status-row" style="margin-top: 8px;">
          <span class="status-label">力反馈</span>
          <span class="status-value force">{{ currentGripperState.current_force }}</span>
        </div>
        <el-progress 
          :percentage="Math.round(currentGripperState.current_force / 255 * 100)" 
          :stroke-width="12"
          status="warning"
          :format="() => currentGripperState.current_force + ' / 255'"
        />
        <div class="status-row" v-if="currentGripperState.fault_code !== 0" style="margin-top: 8px;">
          <span class="status-label">故障信息</span>
          <el-tag type="danger" size="small">{{ currentGripperState.fault_message }}</el-tag>
        </div>
      </div>
    </div>

    <el-divider />

    <!-- 激活按钮 -->
    <div class="panel-section">
      <el-button 
        type="success" 
        style="width: 100%"
        @click="activateGripper"
        :loading="activating"
        :disabled="currentGripperState.is_activated"
      >
        <el-icon><CircleCheck /></el-icon>
        {{ currentGripperState.is_activated ? '已激活' : '激活夹爪' }}
      </el-button>
    </div>

    <el-divider />

    <!-- 快捷操作 -->
    <div class="panel-section">
      <h3 class="section-title">快捷操作</h3>
      <div class="quick-buttons">
        <el-button 
          type="success" 
          @click="quickAction('open')"
          :loading="loading"
          :disabled="!currentGripperState.is_activated"
        >
          <el-icon><Expand /></el-icon>
          全开
        </el-button>
        <el-button 
          type="danger" 
          @click="quickAction('close')"
          :loading="loading"
          :disabled="!currentGripperState.is_activated"
        >
          <el-icon><Fold /></el-icon>
          全闭
        </el-button>
        <el-button 
          type="warning"
          @click="quickAction('half')"
          :loading="loading"
          :disabled="!currentGripperState.is_activated"
        >
          一半开
        </el-button>
        <el-button 
          type="info" 
          @click="quickAction('soft')"
          :loading="loading"
          :disabled="!currentGripperState.is_activated"
        >
          <el-icon><Orange /></el-icon>
          轻抓
        </el-button>
      </div>
    </div>

    <el-divider />

    <!-- 精确控制 -->
    <div class="panel-section">
      <h3 class="section-title">精确控制</h3>
      <div class="control-sliders">
        <div class="control-item">
          <div class="control-header">
            <span class="control-label">目标位置 (0=开, 255=闭)</span>
            <span class="control-value">{{ targetPosition }}</span>
          </div>
          <el-slider 
            v-model="targetPosition" 
            :min="0" 
            :max="255"
            size="small"
          />
        </div>
        <div class="control-item">
          <div class="control-header">
            <span class="control-label">速度 (0-255)</span>
            <span class="control-value">{{ speed }}</span>
          </div>
          <el-slider 
            v-model="speed" 
            :min="0" 
            :max="255"
            size="small"
          />
        </div>
        <div class="control-item">
          <div class="control-header">
            <span class="control-label">力限制 (0-255)</span>
            <span class="control-value">{{ force }}</span>
          </div>
          <el-slider 
            v-model="force" 
            :min="0" 
            :max="255"
            size="small"
          />
        </div>
      </div>
      
      <el-button 
        type="primary" 
        style="width: 100%; margin-top: 12px"
        @click="executeMove"
        :loading="loading"
        :disabled="!currentGripperState.is_activated"
      >
        执行移动
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Scissor, Expand, Fold, Orange, CircleCheck } from '@element-plus/icons-vue'
import axios from 'axios'

interface GripperState {
  is_activated: boolean
  is_moving: boolean
  object_status: number
  object_status_text: string
  target_position: number
  current_position: number
  target_speed: number
  current_speed: number
  target_force: number
  current_force: number
  fault_code: number
  fault_message: string
  communication_ok: boolean
}

const selectedGripper = ref<'left' | 'right'>('left')
const loading = ref(false)
const activating = ref(false)

const leftState = reactive<GripperState>({
  is_activated: false,
  is_moving: false,
  object_status: 0,
  object_status_text: '未知',
  target_position: 0,
  current_position: 0,
  target_speed: 255,
  current_speed: 0,
  target_force: 150,
  current_force: 0,
  fault_code: 0,
  fault_message: '',
  communication_ok: false
})

const rightState = reactive<GripperState>({
  is_activated: false,
  is_moving: false,
  object_status: 0,
  object_status_text: '未知',
  target_position: 0,
  current_position: 0,
  target_speed: 255,
  current_speed: 0,
  target_force: 150,
  current_force: 0,
  fault_code: 0,
  fault_message: '',
  communication_ok: false
})

const currentGripperState = computed(() => {
  return selectedGripper.value === 'left' ? leftState : rightState
})

const targetPosition = ref(0)
const speed = ref(255)
const force = ref(150)

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

// 获取夹爪状态
async function fetchGripperState() {
  try {
    const response = await axios.get('/api/v1/gripper/state', getAuthHeaders())
    if (response.data) {
      Object.assign(leftState, response.data.left)
      Object.assign(rightState, response.data.right)
    }
  } catch (error) {
    // 静默失败，避免刷屏
  }
}

// 激活夹爪
async function activateGripper() {
  activating.value = true
  try {
    const response = await axios.post('/api/v1/gripper/activate', {
      side: selectedGripper.value
    }, getAuthHeaders())
    
    if (response.data.success) {
      ElMessage.success(response.data.message)
      await fetchGripperState()
    } else {
      ElMessage.error(response.data.message)
    }
  } catch (error: any) {
    ElMessage.error(error.response?.data?.detail || '激活失败')
  } finally {
    activating.value = false
  }
}

// 快捷操作
async function quickAction(action: string) {
  loading.value = true
  try {
    const response = await axios.post(
      `/api/v1/gripper/${selectedGripper.value}/${action}`,
      {},
      getAuthHeaders()
    )
    
    if (response.data.success) {
      const actionNames: Record<string, string> = {
        'open': '全开',
        'close': '全闭',
        'half': '半开',
        'soft': '轻抓'
      }
      ElMessage.success(`${selectedGripper.value === 'left' ? '左' : '右'}夹爪${actionNames[action]}完成`)
    } else {
      ElMessage.error(response.data.message)
    }
  } catch (error: any) {
    ElMessage.error(error.response?.data?.detail || '操作失败')
  } finally {
    loading.value = false
  }
}

// 执行移动
async function executeMove() {
  loading.value = true
  try {
    const response = await axios.post('/api/v1/gripper/move', {
      side: selectedGripper.value,
      position: targetPosition.value,
      speed: speed.value,
      force: force.value
    }, getAuthHeaders())
    
    if (response.data.success) {
      ElMessage.success('夹爪移动命令已发送')
    } else {
      ElMessage.error(response.data.message)
    }
  } catch (error: any) {
    ElMessage.error(error.response?.data?.detail || '移动失败')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  // 立即获取一次状态
  fetchGripperState()
  // 每 500ms 轮询状态
  pollTimer = window.setInterval(fetchGripperState, 500)
})

onUnmounted(() => {
  if (pollTimer) {
    clearInterval(pollTimer)
  }
})
</script>

<style scoped>
.gripper-panel {
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

.gripper-tabs {
  display: flex;
  gap: var(--spacing-sm);
}

.gripper-tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.3s var(--transition-smooth);
}

.gripper-tab:hover {
  background: rgba(30, 41, 59, 0.6);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.gripper-tab.active {
  background: rgba(245, 158, 11, 0.15);
  border-color: var(--color-primary);
  color: var(--color-primary);
  box-shadow: 0 0 20px rgba(245, 158, 11, 0.2);
}

.status-display {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: var(--radius-lg);
}

.status-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-label {
  font-size: 12px;
  color: var(--color-text-tertiary);
  min-width: 60px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.status-value {
  font-size: 14px;
  font-family: 'Consolas', monospace;
  color: #10b981;
  font-weight: 700;
}

.status-value.force {
  color: var(--color-primary);
}

.quick-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-sm);
}

.control-sliders {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.control-item {
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(148, 163, 184, 0.15);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
}

.control-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-sm);
}

.control-label {
  font-size: 12px;
  color: var(--color-text-secondary);
  font-weight: 600;
}

.control-value {
  font-size: 12px;
  font-family: 'Consolas', monospace;
  color: var(--color-primary);
  font-weight: 700;
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: var(--radius-lg);
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: var(--color-text-primary);
}

:deep(.el-divider) {
  margin: var(--spacing-lg) 0;
  border-color: rgba(148, 163, 184, 0.2);
}

:deep(.el-progress-bar__outer) {
  background: rgba(15, 23, 42, 0.6);
}

:deep(.el-progress-bar__inner) {
  background: linear-gradient(90deg, #10b981, #34d399);
}
</style>
