<template>
  <div class="gripper-panel">
    <!-- 夹爪选择 + 状态显示 -->
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

    <!-- 实时反馈 + 力控 -->
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
          <span class="feedback-label">当前力度</span>
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
        {{ currentGripperState.is_activated ? '松开' : '激活' }}
      </el-button>
      <el-button 
        type="danger" 
        @click="quickAction('close')"
        :loading="loading"
        :disabled="!currentGripperState.is_activated"
      >
        <SvgIcon name="gripper-close" :size="14" />
        闭合
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
        柔抓
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
          <span class="control-label">力度</span>
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
        执行动作
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useDataPlaneSingleton } from '@/composables/useDataPlane'

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
const targetPosition = ref(0)
const speed = ref(255)
const force = ref(150)

const dataPlane = useDataPlaneSingleton()
const {
  isConnected,
  isAuthenticated,
  connect,
  subscribe,
  leftGripperState,
  rightGripperState,
  sendGripperCommand,
} = dataPlane

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
  communication_ok: false,
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
  communication_ok: false,
})

const currentGripperState = computed(() => {
  return selectedGripper.value === 'left' ? leftState : rightState
})

const positionScaleMax = ref(1)

function normalizePosition(raw: number) {
  if (raw > 1.5) {
    positionScaleMax.value = 255
  }
  return positionScaleMax.value === 255 ? raw / 255 : raw
}

function toCommandPositionFromNormalized(normalized: number) {
  if (positionScaleMax.value === 255) {
    return Math.round(Math.max(0, Math.min(1, normalized)) * 255)
  }
  return Math.max(0, Math.min(1, normalized))
}

function toCommandPositionFromUi(uiValue: number) {
  const clamped = Math.max(0, Math.min(255, uiValue))
  return positionScaleMax.value === 255 ? clamped : clamped / 255
}

const actionLabels: Record<string, string> = {
  open: '松开',
  close: '闭合',
  half: '半开',
  soft: '柔抓',
}

function applyWsState(source: any, target: GripperState, side: 'left' | 'right') {
  if (source && (source.position !== undefined || source.gripperId === side || source.gripper_id === side)) {
    const rawPosition = Number(source.position ?? source.current_position ?? 0)
    const normalizedPosition = normalizePosition(rawPosition)
    target.current_position = Math.round(normalizedPosition * 255)
    target.current_force = Math.round(source.force ?? source.current_force ?? 0)
    target.is_moving = !!source.in_motion
    target.object_status = source.object_detected ? 1 : 0
    target.object_status_text = source.object_detected ? '检测到物体' : '未检测到'
    target.communication_ok = true
    target.is_activated = true
    return
  }

  if (!isConnected.value) {
    target.communication_ok = false
    target.is_activated = false
    target.object_status_text = '已离线'
  }
}

watch([leftGripperState, rightGripperState], () => {
  applyWsState(leftGripperState as any, leftState, 'left')
  applyWsState(rightGripperState as any, rightState, 'right')
}, { deep: true })

function sendCommand(position: number, appliedForce: number, successMessage: string) {
  if (!isAuthenticated.value) {
    ElMessage.warning('未登录/未认证')
    return false
  }

  const sent = sendGripperCommand(selectedGripper.value, position, appliedForce)
  if (!sent) {
    ElMessage.error('发送指令失败')
    return false
  }

  ElMessage.success(successMessage)
  return true
}

async function activateGripper() {
  activating.value = true
  try {
    const sideLabel = selectedGripper.value === 'left' ? '左' : '右'
    sendCommand(toCommandPositionFromNormalized(1.0), force.value, `${sideLabel}夹爪激活指令已发送`)
  } finally {
    activating.value = false
  }
}

async function quickAction(action: string) {
  loading.value = true
  try {
    const actionMap: Record<string, number> = {
      open: 1.0,
      close: 0.0,
      half: 0.5,
      soft: 0.7,
    }
    const position = toCommandPositionFromNormalized(actionMap[action] ?? 0.0)
    const appliedForce = action === 'soft' ? Math.max(10, Math.round(force.value * 0.3)) : force.value
    const sideLabel = selectedGripper.value === 'left' ? '左' : '右'
    const label = actionLabels[action] ?? '未知'

    sendCommand(position, appliedForce, `${sideLabel}夹爪${label}指令已发送`)
  } finally {
    loading.value = false
  }
}

async function executeMove() {
  loading.value = true
  try {
    const position = toCommandPositionFromUi(targetPosition.value)
    const sideLabel = selectedGripper.value === 'left' ? '左' : '右'
    sendCommand(position, force.value, `${sideLabel}夹爪运动指令已发送`)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  connect()

  watch(isAuthenticated, (authed) => {
    if (!authed) return
    subscribe(['gripper_state'])
  }, { immediate: true })
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

/* 瀹炴椂鍙嶉鍖?- 涓ゅ垪鍗＄墖 */
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

/* 蹇嵎鎿嶄綔 */
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

/* 绮剧‘鎺у埗鍖?- 婊戝姩鏉″崟鐙竴琛?*/
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

/* ===== 娴呰壊涓婚閫傞厤 ===== */
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

/* 浜壊涓婚鎸夐挳浼樺寲 */
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














