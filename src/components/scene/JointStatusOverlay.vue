<template>
  <div class="joint-status-overlay" :class="{ collapsed: isCollapsed }">
    <div class="overlay-header" @click="toggleCollapse">
      <span class="overlay-title">关节状态</span>
      <span v-if="!connected" class="disconnected-badge">未连接</span>
      <el-icon :class="{ rotated: isCollapsed }"><ArrowDown /></el-icon>
    </div>
    
    <div class="overlay-content" v-show="!isCollapsed">
      <div class="arm-row">
        <div class="arm-label left">左臂</div>
        <div class="joint-values">
          <span 
            v-for="(angle, i) in leftJoints" 
            :key="'l'+i"
            class="joint-chip"
            :class="{ active: Math.abs(angle) > 1 }"
          >
            {{ angle.toFixed(1) }}°
          </span>
        </div>
      </div>
      <div class="arm-row">
        <div class="arm-label right">右臂</div>
        <div class="joint-values">
          <span 
            v-for="(angle, i) in rightJoints" 
            :key="'r'+i"
            class="joint-chip"
            :class="{ active: Math.abs(angle) > 1 }"
          >
            {{ angle.toFixed(1) }}°
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios'
import { getApiBaseUrl } from '@/utils/apiUrl'
import { normalizeApiResponse } from '@/api/client'

// API 配置 - 动态获取，支持远程访问
const getRobotModelApi = () => `${getApiBaseUrl()}/api/v1/robot-model`

const api = axios.create({
  baseURL: getRobotModelApi(),
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
  }
})
api.interceptors.response.use((response) => ({
  ...response,
  data: normalizeApiResponse(response.data)
}))

const isCollapsed = ref(false)
const connected = ref(false)

// 关节角度 (弧度值，从后端获取)
const leftJoints = ref([0, 0, 0, 0, 0, 0, 0])
const rightJoints = ref([0, 0, 0, 0, 0, 0, 0])

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
}

// 弧度转角度
function radToDeg(rad: number): number {
  return rad * 180 / Math.PI
}

// 关节状态轮询
let jointStateInterval: number | null = null

async function fetchJointStates() {
  try {
    const response = await api.get('/joint_states')
    const data = response.data
    
    // 判断是否是真实的 ROS2 数据
    const isRealData = data.source === 'ros2'
    
    if (isRealData && data.left && data.right) {
      // 真实数据：转换弧度为角度
      leftJoints.value = data.left.map((rad: number) => radToDeg(rad))
      rightJoints.value = data.right.map((rad: number) => radToDeg(rad))
      connected.value = true
    } else {
      // 未连接或 Mock 模式：显示全 0
      leftJoints.value = [0, 0, 0, 0, 0, 0, 0]
      rightJoints.value = [0, 0, 0, 0, 0, 0, 0]
      connected.value = false
    }
  } catch (error) {
    // 请求失败：显示全 0
    leftJoints.value = [0, 0, 0, 0, 0, 0, 0]
    rightJoints.value = [0, 0, 0, 0, 0, 0, 0]
    connected.value = false
  }
}

onMounted(() => {
  fetchJointStates()
  jointStateInterval = window.setInterval(fetchJointStates, 100)
})

onUnmounted(() => {
  if (jointStateInterval) {
    clearInterval(jointStateInterval)
    jointStateInterval = null
  }
})
</script>

<style scoped>
.joint-status-overlay {
  background-color: rgba(30, 30, 46, 0.7);
  border-radius: 8px;
  border: 1px solid rgba(60, 60, 60, 0.6);
  backdrop-filter: blur(12px);
  min-width: 320px;
  transition: all 0.2s;
}

.overlay-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  cursor: pointer;
  border-bottom: 1px solid #3c3c3c;
}

.joint-status-overlay.collapsed .overlay-header {
  border-bottom: none;
}

.overlay-title {
  font-size: 12px;
  font-weight: 500;
  color: #ccc;
}

.overlay-header .el-icon {
  color: #666;
  transition: transform 0.2s;
}

.overlay-header .el-icon.rotated {
  transform: rotate(-90deg);
}

.disconnected-badge {
  font-size: 10px;
  color: #f56c6c;
  background-color: rgba(245, 108, 108, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: auto;
  margin-right: 8px;
}

.overlay-content {
  padding: 8px 12px 12px;
}

.arm-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}

.arm-row:last-child {
  margin-bottom: 0;
}

.arm-label {
  font-size: 11px;
  font-weight: 600;
  min-width: 28px;
}

.arm-label.left {
  color: #409eff;
}

.arm-label.right {
  color: #67c23a;
}

.joint-values {
  display: flex;
  gap: 4px;
  flex: 1;
}

.joint-chip {
  font-size: 10px;
  font-family: 'Consolas', 'Monaco', monospace;
  padding: 2px 6px;
  background-color: #2d2d2d;
  border-radius: 4px;
  color: #909399;
  min-width: 36px;
  text-align: center;
  transition: all 0.2s;
}

.joint-chip.active {
  background-color: #094771;
  color: #fff;
}
</style>
