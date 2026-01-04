<template>
  <div class="overview-panel">
    <div class="panel-section">
      <h3 class="section-title">
        <el-icon><Connection /></el-icon>
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
            <el-icon :size="28"><Cpu /></el-icon>
          </div>
          <div class="status-info">
            <span class="status-label">左臂</span>
            <span class="status-value">{{ status.leftArm ? '在线' : '离线' }}</span>
          </div>
        </div>
        
        <div class="status-card" :class="{ online: status.rightArm }">
          <div class="status-icon">
            <el-icon :size="28"><Cpu /></el-icon>
          </div>
          <div class="status-info">
            <span class="status-label">右臂</span>
            <span class="status-value">{{ status.rightArm ? '在线' : '离线' }}</span>
          </div>
        </div>
        
        <div class="status-card" :class="{ online: status.gripper }">
          <div class="status-icon">
            <el-icon :size="28"><Scissor /></el-icon>
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
        <el-icon><Odometer /></el-icon>
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
        <el-icon><Lightning /></el-icon>
        快捷操作
      </h3>
      <div class="quick-actions">
        <el-button type="primary" @click="goToHome" :loading="loading">
          <el-icon><Aim /></el-icon>
          回零位
        </el-button>
        <el-button type="warning" @click="emergencyStop">
          <el-icon><WarningFilled /></el-icon>
          急停
        </el-button>
        <el-button @click="refreshStatus">
          <el-icon><Refresh /></el-icon>
          刷新
        </el-button>
      </div>
    </div>

    <el-divider />

    <div class="panel-section">
      <h3 class="section-title">
        <el-icon><Tickets /></el-icon>
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
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useLayoutStore } from '@/stores/layout'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import { getApiBaseUrl } from '@/utils/apiUrl'

// API 配置 - 动态获取，支持远程访问
const getRobotModelApi = () => `${getApiBaseUrl()}/api/v1/robot-model`

const api = axios.create({
  baseURL: getRobotModelApi(),
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
  }
})

const layoutStore = useLayoutStore()

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

function emergencyStop() {
  ElMessage.warning('急停命令已发送')
}

function refreshStatus() {
  ElMessage.info('正在刷新状态...')
  fetchStatus()
  fetchJointStates()
}

async function fetchJointStates() {
  try {
    const response = await api.get('/joint_states')
    const data = response.data
    
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
    const response = await api.get('/joint_states')
    const data = response.data
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
  padding: 16px;
}

.panel-section {
  margin-bottom: 8px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 500;
  color: #e0e0e0;
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.status-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: #2d2d2d;
  border-radius: 8px;
  border-left: 3px solid #555;
  transition: all 0.3s;
}

.status-card.online {
  border-left-color: #67c23a;
}

.status-card.online .status-icon {
  color: #67c23a;
}

.status-icon {
  color: #909399;
}

.status-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.status-label {
  font-size: 12px;
  color: #909399;
}

.status-value {
  font-size: 14px;
  font-weight: 500;
  color: #e0e0e0;
}

.data-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.data-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background-color: #2d2d2d;
  border-radius: 6px;
}

.data-label {
  font-size: 13px;
  color: #909399;
}

.data-value {
  font-size: 13px;
  font-family: 'Consolas', monospace;
  color: #67c23a;
}

.quick-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.quick-actions .el-button {
  flex: 1;
  min-width: 80px;
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
  background-color: #2d2d2d;
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
