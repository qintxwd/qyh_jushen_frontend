<template>
  <div class="overview-panel">
    <div class="panel-section">
      <h3 class="section-title">
        <SvgIcon name="connection" :size="16" />
        系统状态
      </h3>
      <div class="status-grid">
        <div class="status-card" :class="{ online: status.ros }">
          <div class="status-icon">
            <el-icon :size="28"><Link /></el-icon>
          </div>
          <div class="status-info">
            <span class="status-label">ROS2</span>
            <span class="status-value">{{ status.ros ? '已连接' : '未连接' }}</span>
          </div>
        </div>
        
        <div class="status-card" :class="{ online: status.leftArm }">
          <div class="status-icon">
            <SvgIcon name="cpu" :size="28" />
          </div>
          <div class="status-info">
            <span class="status-label">左臂</span>
            <span class="status-value">{{ status.leftArm ? '在线' : '离线' }}</span>
          </div>
        </div>
        
        <div class="status-card" :class="{ online: status.rightArm }">
          <div class="status-icon">
            <SvgIcon name="cpu" :size="28" />
          </div>
          <div class="status-info">
            <span class="status-label">右臂</span>
            <span class="status-value">{{ status.rightArm ? '在线' : '离线' }}</span>
          </div>
        </div>
        
        <div class="status-card" :class="{ online: status.gripper }">
          <div class="status-icon">
            <SvgIcon name="scissor" :size="28" />
          </div>
          <div class="status-info">
            <span class="status-label">夹爪</span>
            <span class="status-value">{{ status.gripper ? '在线' : '离线' }}</span>
          </div>
        </div>
      </div>
    </div>

    <el-divider />

    <div class="panel-section">
      <h3 class="section-title">
        <SvgIcon name="odometer" :size="16" />
        实时数据
      </h3>
      <div class="data-list">
        <div class="data-item">
          <span class="data-label">左臂位置</span>
          <span class="data-value">{{ formatPosition(jointData.leftPos) }}</span>
        </div>
        <div class="data-item">
          <span class="data-label">右臂位置</span>
          <span class="data-value">{{ formatPosition(jointData.rightPos) }}</span>
        </div>
        <div class="data-item">
          <span class="data-label">左夹爪</span>
          <span class="data-value">{{ gripperData.left }}%</span>
        </div>
        <div class="data-item">
          <span class="data-label">右夹爪</span>
          <span class="data-value">{{ gripperData.right }}%</span>
        </div>
      </div>
    </div>

    <el-divider />

    <div class="panel-section">
      <h3 class="section-title">
        <SvgIcon name="lightning" :size="16" />
        快捷操作
      </h3>
      <div class="quick-actions">
        <el-button type="primary" @click="goToHome" :loading="loading">
          <SvgIcon name="aim" :size="16" />
          回零位
        </el-button>
        <el-button type="warning" @click="emergencyStop">
          <SvgIcon name="warningfilled" :size="16" />
          急停
        </el-button>
        <el-button @click="refreshStatus">
          <SvgIcon name="refresh" :size="16" />
          刷新
        </el-button>
      </div>
    </div>

    <el-divider />

    <div class="panel-section">
      <h3 class="section-title">
        <SvgIcon name="tickets" :size="16" />
        最近任务
      </h3>
      <div class="task-list">
        <div v-for="task in recentTasks" :key="task.id" class="task-item">
          <el-icon :class="'task-status-' + task.status">
            <SuccessFilled v-if="task.status === 'completed'" />
            <Loading v-else-if="task.status === 'running'" />
            <WarningFilled v-else />
          </el-icon>
          <div class="task-info">
            <span class="task-name">{{ task.name }}</span>
            <span class="task-time">{{ task.time }}</span>
          </div>
        </div>
        <div v-if="recentTasks.length === 0" class="empty-text">
          暂无任务记录
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useLayoutStore } from '@/stores/layout'
import { useDataPlane } from '@/composables/useDataPlane'
import { ElMessage } from 'element-plus'
import apiClient from '@/api/client'
import emergencyApi from '@/api/emergency' // Fallback API

const layoutStore = useLayoutStore()
const { sendEmergencyStop, isConnected } = useDataPlane()

const loading = ref(false)

const status = reactive({
  ros: false,
  leftArm: false,
  rightArm: false,
  gripper: false
})

const jointData = reactive({
  leftPos: [0, 0, 0, 0, 0, 0, 0],
  rightPos: [0, 0, 0, 0, 0, 0, 0]
})

const gripperData = reactive({
  left: 0,
  right: 0
})

const recentTasks = ref([
  { id: 1, name: '抓取物体 A', status: 'completed', time: '10:30' },
  { id: 2, name: '移动到位置 B', status: 'running', time: '10:35' },
  { id: 3, name: '放置物体', status: 'pending', time: '10:40' }
])

function formatPosition(pos: number[]): string {
  // 弧度转角度并格式化显示
  return pos.map(v => (v * 180 / Math.PI).toFixed(1)).join(', ')
}

async function goToHome() {
  loading.value = true
  try {
    // TODO: 调用API
    await new Promise(r => setTimeout(r, 1000))
    ElMessage.success('回零位命令已发送')
  } catch (e) {
    ElMessage.error('操作失败')
  } finally {
    loading.value = false
  }
}

async function emergencyStop() {
  try {
    // WebSocket Priority
    if (isConnected.value) {
      sendEmergencyStop(true, 'OverviewPanel user triggered')
      ElMessage.success('急停已触发 (WebSocket)')
      return
    }
    
    // HTTP Fallback
    await emergencyApi.triggerEmergencyStop('OverviewPanel user triggered (HTTP)')
    ElMessage.success('急停已触发 (HTTP)')
  } catch (e: any) {
    ElMessage.error(e.message || '急停触发失败')
  }
}

function refreshStatus() {
  ElMessage.info('正在刷新状态...')
  fetchStatus()
  fetchJointStates()
}

async function fetchJointStates() {
  try {
    const data = await apiClient.get('/api/v1/robot-model/joint_states')
    
    // 判断是否是真实的 ROS2 数据
    const isRealData = data.source === 'ros2'
    
    if (isRealData && data.left && data.right) {
      jointData.leftPos = data.left
      jointData.rightPos = data.right
      status.ros = true
      status.leftArm = true
      status.rightArm = true
    } else {
      // 未连接：显示全 0
      jointData.leftPos = [0, 0, 0, 0, 0, 0, 0]
      jointData.rightPos = [0, 0, 0, 0, 0, 0, 0]
      status.ros = false
      status.leftArm = false
      status.rightArm = false
    }
    
    layoutStore.updateConnectionStatus({
      ros: status.ros,
      leftArm: status.leftArm,
      rightArm: status.rightArm,
      gripper: status.gripper
    })
  } catch (error) {
    // 请求失败
    jointData.leftPos = [0, 0, 0, 0, 0, 0, 0]
    jointData.rightPos = [0, 0, 0, 0, 0, 0, 0]
    status.ros = false
    status.leftArm = false
    status.rightArm = false
  }
}

async function fetchStatus() {
  // 从 API 获取机械臂状态
  try {
    const data = await apiClient.get('/api/v1/robot-model/joint_states')
    const isRealData = data.source === 'ros2'
    
    status.ros = isRealData
    status.leftArm = isRealData
    status.rightArm = isRealData
    // TODO: 获取夹爪状态
    status.gripper = false
  } catch (error) {
    status.ros = false
    status.leftArm = false
    status.rightArm = false
    status.gripper = false
  }
  
  layoutStore.updateConnectionStatus({
    ros: status.ros,
    leftArm: status.leftArm,
    rightArm: status.rightArm,
    gripper: status.gripper
  })
}

let statusInterval: number | null = null
let jointInterval: number | null = null

onMounted(() => {
  fetchStatus()
  fetchJointStates()
  statusInterval = setInterval(fetchStatus, 5000)  // 状态 5s 更新一次
  jointInterval = setInterval(fetchJointStates, 200)  // 关节数据 200ms 更新一次
})

onUnmounted(() => {
  if (statusInterval) clearInterval(statusInterval)
  if (jointInterval) clearInterval(jointInterval)
})
</script>

<style scoped>
.overview-panel {
  padding: 24px;
  background: transparent;
  font-family: var(--font-body);
}

.panel-section {
  margin-bottom: 24px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  font-family: var(--font-heading);
  color: #F8FAFC;
  letter-spacing: -0.3px;
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.status-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  background: var(--color-surface, rgba(30, 41, 59, 0.4));
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid var(--color-border, rgba(148, 163, 184, 0.2));
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.status-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--color-border, rgba(148, 163, 184, 0.3));
  transition: all 0.3s ease;
}

.status-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  border-color: rgba(245, 158, 11, 0.3);
}

.status-card.online::before {
  background: linear-gradient(180deg, #10B981 0%, #059669 100%);
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.5);
}

.status-card.online {
  border-color: rgba(16, 185, 129, 0.3);
  background: var(--color-surface-hover, rgba(30, 41, 59, 0.5));
}

.status-card.online .status-icon {
  color: #10B981;
}

.status-icon {
  color: var(--color-text-disabled, #64748B);
}

.status-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.status-label {
  font-size: 12px;
  color: var(--color-text-muted, #94A3B8);
  font-weight: 500;
}

.status-value {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-primary, #F8FAFC);
  font-family: var(--font-body);
}

.data-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.data-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: var(--color-surface, rgba(30, 41, 59, 0.4));
  backdrop-filter: blur(10px);
  border: 1px solid var(--color-border, rgba(148, 163, 184, 0.15));
  border-radius: 10px;
  transition: all 0.3s ease;
}

.data-item:hover {
  background: var(--color-surface-hover, rgba(30, 41, 59, 0.6));
  border-color: rgba(245, 158, 11, 0.2);
  transform: translateX(4px);
}

.data-label {
  font-size: 14px;
  color: var(--color-text-secondary, #CBD5E1);
  font-weight: 500;
}

.data-value {
  font-size: 14px;
  font-family: 'Consolas', 'Monaco', monospace;
  color: #10B981;
  font-weight: 600;
  background: rgba(16, 185, 129, 0.1);
  padding: 4px 10px;
  border-radius: 6px;
}

.quick-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.quick-actions :deep(.el-button) {
  flex: 1;
  min-width: 100px;
  border-radius: 10px;
  padding: 12px 20px;
  font-weight: 600;
  font-size: 14px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  transition: all 0.3s ease;
}

.quick-actions :deep(.el-button--primary) {
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  border: none;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.quick-actions :deep(.el-button--primary:hover) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.quick-actions :deep(.el-button--warning) {
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  border: none;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
}

.quick-actions :deep(.el-button--warning:hover) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4);
}

.quick-actions :deep(.el-button:not(.el-button--primary):not(.el-button--warning)) {
  background: rgba(30, 41, 59, 0.5);
  color: #CBD5E1;
}

.quick-actions :deep(.el-button:not(.el-button--primary):not(.el-button--warning):hover) {
  background: rgba(30, 41, 59, 0.7);
  border-color: rgba(245, 158, 11, 0.3);
  transform: translateY(-2px);
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background-color: var(--color-bg-tertiary, #2d2d2d);
  border-radius: 6px;
}

.task-status-completed {
  color: #67c23a;
}

.task-status-running {
  color: #409eff;
  animation: spin 1s linear infinite;
}

.task-status-pending {
  color: #e6a23c;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.task-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.task-name {
  font-size: 13px;
  color: #e0e0e0;
}

.task-time {
  font-size: 11px;
  color: #909399;
}

.empty-text {
  text-align: center;
  color: #666;
  padding: 20px;
  font-size: 13px;
}

:deep(.el-divider) {
  margin: 16px 0;
  border-color: #3c3c3c;
}
</style>
