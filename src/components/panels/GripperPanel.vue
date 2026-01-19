<template>
  <div class="gripper-panel">
    <!-- 夹爪选择 + 状态一行显示 -->
    <div class="header-row">
      <div class="gripper-tabs">
        <div 
          class="gripper-tab" 
          :class="{ active: selectedGripper === 'left' }"
          @click="selectedGripper = 'left'"
        >
          <SvgIcon name="gripper" :size="14" />
          左夹爪
        </div>
        <div 
          class="gripper-tab" 
          :class="{ active: selectedGripper === 'right' }"
          @click="selectedGripper = 'right'"
        >
          <SvgIcon name="gripper" :size="14" />
          右夹爪
        </div>
      </div>
      <div class="status-badges">
        <span class="badge" :class="currentGripperState.is_activated ? 'success' : 'danger'">
          {{ currentGripperState.is_activated ? '已激活' : '未激活' }}
        </span>
        <span class="badge" :class="currentGripperState.communication_ok ? 'success' : 'danger'">
          {{ currentGripperState.communication_ok ? '通信正常' : '通信断开' }}
        </span>
        <span class="badge info">{{ currentGripperState.object_status_text }}</span>
        <span v-if="currentGripperState.fault_code !== 0" class="badge danger">
          {{ currentGripperState.fault_message }}
        </span>
      </div>
    </div>

    <!-- 实时反馈：位置 + 力 -->
    <div class="feedback-section">
      <div class="feedback-item">
        <div class="feedback-header">
          <span class="feedback-label">当前位置</span>
          <span class="feedback-value position">{{ currentGripperState.current_position }}<small>/255</small></span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill position" :style="{ width: (currentGripperState.current_position / 255 * 100) + '%' }"></div>
        </div>
      </div>
      <div class="feedback-item">
        <div class="feedback-header">
          <span class="feedback-label">力反馈</span>
          <span class="feedback-value force">{{ currentGripperState.current_force }}<small>/255</small></span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill force" :style="{ width: (currentGripperState.current_force / 255 * 100) + '%' }"></div>
        </div>
      </div>
    </div>

    <!-- 快捷操作 -->
    <div class="quick-section">
      <el-button 
        type="success" 
        @click="currentGripperState.is_activated ? quickAction('open') : activateGripper()"
        :loading="loading || activating"
      >
        <SvgIcon name="gripper-open" :size="14" />
        {{ currentGripperState.is_activated ? '全开' : '激活' }}
      </el-button>
      <el-button 
        type="danger" 
        @click="quickAction('close')"
        :loading="loading"
        :disabled="!currentGripperState.is_activated"
      >
        <SvgIcon name="gripper-close" :size="14" />
        全闭
      </el-button>
      <el-button 
        type="warning"
        @click="quickAction('half')"
        :loading="loading"
        :disabled="!currentGripperState.is_activated"
      >
        半开
      </el-button>
      <el-button 
        type="info" 
        @click="quickAction('soft')"
        :loading="loading"
        :disabled="!currentGripperState.is_activated"
      >
        <SvgIcon name="orange" :size="14" />
        轻抓
      </el-button>
    </div>

    <!-- 精确控制 -->
    <div class="control-section">
      <div class="control-grid">
        <div class="control-item">
          <span class="control-label">目标位置</span>
          <div class="slider-wrapper">
            <el-slider v-model="targetPosition" :min="0" :max="255" :show-tooltip="true" />
          </div>
          <span class="control-value">{{ targetPosition }}</span>
        </div>
        <div class="control-item">
          <span class="control-label">速度</span>
          <div class="slider-wrapper">
            <el-slider v-model="speed" :min="0" :max="255" :show-tooltip="true" />
          </div>
          <span class="control-value">{{ speed }}</span>
        </div>
        <div class="control-item">
          <span class="control-label">力限制</span>
          <div class="slider-wrapper">
            <el-slider v-model="force" :min="0" :max="255" :show-tooltip="true" />
          </div>
          <span class="control-value">{{ force }}</span>
        </div>
      </div>
      <el-button 
        type="primary" 
        class="execute-btn"
        @click="executeMove"
        :loading="loading"
        :disabled="!currentGripperState.is_activated"
      >
        <SvgIcon name="execute-move" :size="14" />
        执行移动
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'
import { ref, reactive, computed, onMounted, onUnmounted, watch } from 'vue'
import { ElMessage } from 'element-plus'
import apiClient from '@/api/client'
import { useDataPlane } from '@/composables/useDataPlane'

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
const { robotState, isConnected } = useDataPlane()

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

// Data Plane 监听
watch(robotState, (state) => {
  if (!state) return

  // 更新左夹爪
  if (state.left_gripper) {
    // 假设 WebSocket 返回 normalized position (0.0-1.0) -> 映射回 0-255
    leftState.current_position = Math.round((state.left_gripper.position || 0) * 255)
    leftState.is_moving = state.left_gripper.in_motion || false
    leftState.object_status = state.left_gripper.object_detected ? 1 : 0
    leftState.object_status_text = state.left_gripper.object_detected ? '抓住' : '空闲'
    // force? 单位不明，暂不更新或假设 N
  }

  // 更新右夹爪
  if (state.right_gripper) {
    rightState.current_position = Math.round((state.right_gripper.position || 0) * 255)
    rightState.is_moving = state.right_gripper.in_motion || false
    rightState.object_status = state.right_gripper.object_detected ? 1 : 0
    rightState.object_status_text = state.right_gripper.object_detected ? '抓住' : '空闲'
  }
}, { deep: true })

let pollTimer: number | null = null

// 获取夹爪状态
async function fetchGripperState() {
  try {
    const data = await apiClient.get('/api/v1/gripper/state')
    if (data) {
      if (isConnected.value) {
        // Data Plane 连接时，仅合并 HTTP 返回的状态位（激活、故障、通信），保留 WS 的实时运动数据
        if (data.left) {
          leftState.is_activated = data.left.is_activated
          leftState.fault_code = data.left.fault_code
          leftState.fault_message = data.left.fault_message
          leftState.communication_ok = data.left.communication_ok
        }
        if (data.right) {
          rightState.is_activated = data.right.is_activated
          rightState.fault_code = data.right.fault_code
          rightState.fault_message = data.right.fault_message
          rightState.communication_ok = data.right.communication_ok
        }
      } else {
        Object.assign(leftState, data.left)
        Object.assign(rightState, data.right)
      }
    }
  } catch (error) {
    // 静默失败，避免刷屏
  }
}

// 激活夹爪
async function activateGripper() {
  activating.value = true
  try {
    const data = await apiClient.post('/api/v1/gripper/activate', {
      side: selectedGripper.value
    })

    if (data.success) {
      ElMessage.success(data.message)
      await fetchGripperState()
    } else {
      ElMessage.error(data.message)
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
    const data = await apiClient.post(
      `/api/v1/gripper/${selectedGripper.value}/${action}`,
      {}
    )

    if (data.success) {
      const actionNames: Record<string, string> = {
        'open': '全开',
        'close': '全闭',
        'half': '半开',
        'soft': '轻抓'
      }
      ElMessage.success(`${selectedGripper.value === 'left' ? '左' : '右'}夹爪${actionNames[action]}完成`)
    } else {
      ElMessage.error(data.message)
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
    const data = await apiClient.post('/api/v1/gripper/move', {
      side: selectedGripper.value,
      position: targetPosition.value,
      speed: speed.value,
      force: force.value
    })

    if (data.success) {
      ElMessage.success('夹爪移动命令已发送')
    } else {
      ElMessage.error(data.message)
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
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

/* 头部：夹爪选择 + 状态标签 */
.header-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.gripper-tabs {
  display: flex;
  gap: 8px;
}

.gripper-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 13px;
  font-weight: 500;
}

.gripper-tab:hover {
  background: rgba(30, 41, 59, 0.7);
}

.gripper-tab.active {
  background: rgba(245, 158, 11, 0.15);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.status-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  flex: 1;
  justify-content: flex-end;
}

.badge {
  padding: 5px 12px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.badge.success {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.badge.danger {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.badge.info {
  background: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

/* 实时反馈区 - 两列卡片 */
.feedback-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.feedback-item {
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(148, 163, 184, 0.15);
  border-radius: 10px;
  padding: 14px 16px;
}

.feedback-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.feedback-label {
  font-size: 13px;
  color: var(--color-text-tertiary);
  font-weight: 500;
}

.feedback-value {
  font-size: 22px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-weight: 700;
}

.feedback-value small {
  font-size: 12px;
  opacity: 0.6;
  font-weight: 400;
}

.feedback-value.position {
  color: #10b981;
}

.feedback-value.force {
  color: var(--color-primary);
}

.progress-bar {
  height: 10px;
  background: rgba(15, 23, 42, 0.6);
  border-radius: 5px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 5px;
  transition: width 0.3s ease;
}

.progress-fill.position {
  background: linear-gradient(90deg, #10b981, #34d399);
}

.progress-fill.force {
  background: linear-gradient(90deg, var(--color-primary), #fbbf24);
}

/* 快捷操作 */
.quick-section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.quick-section .el-button {
  height: 44px;
  font-size: 14px;
  padding: 0 12px;
  font-weight: 500;
}

/* 精确控制区 - 滑动条单独一行 */
.control-section {
  background: rgba(30, 41, 59, 0.3);
  border: 1px solid rgba(148, 163, 184, 0.12);
  border-radius: 10px;
  padding: 16px;
}

.control-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.control-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.control-label {
  font-size: 13px;
  color: var(--color-text-tertiary);
  font-weight: 500;
  width: 60px;
  flex-shrink: 0;
}

.slider-wrapper {
  flex: 1;
  min-width: 0;
}

.slider-wrapper :deep(.el-slider) {
  width: 100%;
}

.slider-wrapper :deep(.el-slider__runway) {
  height: 6px;
  background: rgba(15, 23, 42, 0.5);
}

.slider-wrapper :deep(.el-slider__bar) {
  height: 6px;
  background: linear-gradient(90deg, var(--color-primary), #fbbf24);
}

.slider-wrapper :deep(.el-slider__button-wrapper) {
  z-index: 1;
}

.slider-wrapper :deep(.el-slider__button) {
  width: 16px;
  height: 16px;
  border: 2px solid var(--color-primary);
  background: #fff;
}

.control-value {
  font-size: 14px;
  font-family: 'Consolas', monospace;
  color: var(--color-primary);
  font-weight: 600;
  width: 36px;
  text-align: right;
  flex-shrink: 0;
}

.execute-btn {
  width: 100%;
  height: 44px;
  font-size: 14px;
  font-weight: 500;
  margin-top: 14px;
}

/* ===== 浅色主题适配 ===== */
:global(html.light) .gripper-panel {
  background: linear-gradient(135deg, #fafbfc 0%, #f1f5f9 100%);
}

:global(html.light) .gripper-tab {
  background: #ffffff;
  border-color: #e2e8f0;
  color: #475569;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

:global(html.light) .gripper-tab:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}

:global(html.light) .gripper-tab.active {
  background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
  color: #c2410c;
  border-color: #fb923c;
  box-shadow: 0 2px 8px rgba(251, 146, 60, 0.2);
}

:global(html.light) .badge.success {
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
  color: #059669;
  border-color: #6ee7b7;
}

:global(html.light) .badge.danger {
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  color: #dc2626;
  border-color: #fca5a5;
}

:global(html.light) .badge.info {
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  color: #2563eb;
  border-color: #93c5fd;
}

:global(html.light) .feedback-item {
  background: #ffffff;
  border-color: #e2e8f0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04), 0 2px 8px rgba(0, 0, 0, 0.02);
}

:global(html.light) .feedback-label {
  color: #64748b;
}

:global(html.light) .feedback-value.position {
  color: #059669;
}

:global(html.light) .feedback-value.force {
  color: #d97706;
}

:global(html.light) .progress-bar {
  background: #e2e8f0;
}

:global(html.light) .progress-fill.position {
  background: linear-gradient(90deg, #10b981, #34d399);
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.3);
}

:global(html.light) .progress-fill.force {
  background: linear-gradient(90deg, #f59e0b, #fbbf24);
  box-shadow: 0 0 8px rgba(245, 158, 11, 0.3);
}

:global(html.light) .control-section {
  background: #ffffff;
  border-color: #e2e8f0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04), 0 2px 8px rgba(0, 0, 0, 0.02);
}

:global(html.light) .control-label {
  color: #64748b;
}

:global(html.light) .control-value {
  color: #d97706;
}

:global(html.light) .slider-wrapper :deep(.el-slider__runway) {
  background: #e2e8f0;
}

:global(html.light) .slider-wrapper :deep(.el-slider__bar) {
  background: linear-gradient(90deg, #f59e0b, #fbbf24);
}

:global(html.light) .slider-wrapper :deep(.el-slider__button) {
  border-color: #f59e0b;
  box-shadow: 0 2px 6px rgba(245, 158, 11, 0.3);
}

/* 亮色主题按钮优化 */
:global(html.light) .quick-section .el-button--success {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-color: transparent;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

:global(html.light) .quick-section .el-button--success:hover {
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
}

:global(html.light) .quick-section .el-button--danger {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  border-color: transparent;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
}

:global(html.light) .quick-section .el-button--danger:hover {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
}

:global(html.light) .quick-section .el-button--warning {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  border-color: transparent;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
  color: #ffffff;
}

:global(html.light) .quick-section .el-button--warning:hover {
  background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
}

:global(html.light) .quick-section .el-button--info {
  background: linear-gradient(135deg, #64748b 0%, #475569 100%);
  border-color: transparent;
  box-shadow: 0 2px 8px rgba(100, 116, 139, 0.3);
}

:global(html.light) .quick-section .el-button--info:hover {
  background: linear-gradient(135deg, #475569 0%, #334155 100%);
}

:global(html.light) .execute-btn {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  border-color: transparent;
  box-shadow: 0 2px 10px rgba(245, 158, 11, 0.35);
}

:global(html.light) .execute-btn:hover {
  background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
  box-shadow: 0 4px 14px rgba(245, 158, 11, 0.45);
}
</style>
