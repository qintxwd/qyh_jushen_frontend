<template>
  <div class="main-layout" :class="{ 'fullscreen-mode': scene3DFullscreen }">
    <!-- 顶部标题栏 -->
    <header class="title-bar">
      <div class="title-left">
        <div class="logo" @click="toggleSidebar">
          <SvgIcon name="cpu" :size="24" />
        </div>
        <h1 class="app-title">远昌机器人控制平台</h1>
      </div>
      
      <div class="title-center">
        <!-- 布局切换按钮 -->
        <el-button-group size="default" class="layout-toggle">
          <el-tooltip content="单窗口模式">
            <el-button 
              :type="!layoutStore.splitMode ? 'primary' : 'default'"
              @click="layoutStore.splitMode = false; mergeWindows()"
            >
              <SvgIcon name="window-single" :size="16" />
            </el-button>
          </el-tooltip>
          <el-tooltip content="分屏模式">
            <el-button 
              :type="layoutStore.splitMode ? 'primary' : 'default'"
              @click="layoutStore.splitMode = true"
            >
              <SvgIcon name="window-split" :size="16" />
            </el-button>
          </el-tooltip>
        </el-button-group>
      </div>
      
      <div class="title-right">
        <div class="user-section">
          <el-dropdown trigger="click">
            <span class="user-info">
              <el-avatar :size="28" icon="User" />
              <span class="username">{{ authStore.user?.username || '用户' }}</span>
              <SvgIcon name="arrowdown" :size="14" />
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="openPanel('settings')">
                  <SvgIcon name="setting" :size="16" />
                  设置
                </el-dropdown-item>
                <el-dropdown-item divided @click="handleLogout">
                  <SvgIcon name="switchbutton" :size="16" />
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </header>

    <!-- 主体区域 -->
    <div class="main-body">
      <!-- 侧边栏 -->
      <aside 
        class="sidebar" 
        :class="{ collapsed: layoutStore.sidebarCollapsed }"
        :style="{ width: layoutStore.expandedSidebarWidth + 'px' }"
      >
        <div class="sidebar-content">
          <!-- 功能按钮组 -->
          <div class="nav-group">
            <div 
              v-for="item in mainNavItems" 
              :key="item.id"
              class="nav-item"
              :class="{ active: isNavActive(item.id) }"
              @click="openPanel(item.id)"
            >
              <el-tooltip 
                :content="item.name" 
                placement="right"
                :disabled="!layoutStore.sidebarCollapsed"
              >
                <div class="nav-item-inner">
                  <SvgIcon :name="item.icon" :size="22" />
                  <span class="nav-label" v-show="!layoutStore.sidebarCollapsed">
                    {{ item.name }}
                  </span>
                  <span 
                    class="nav-status" 
                    :class="getNavStatus(item.id)"
                    v-show="!layoutStore.sidebarCollapsed"
                  ></span>
                </div>
              </el-tooltip>
            </div>
          </div>

          <!-- 底部按钮 -->
          <div class="nav-group nav-bottom">
            <div class="nav-item" @click="openPanel('settings')">
              <el-tooltip content="设置" placement="right" :disabled="!layoutStore.sidebarCollapsed">
                <div class="nav-item-inner">
                  <SvgIcon name="setting" :size="22" />
                  <span class="nav-label" v-show="!layoutStore.sidebarCollapsed">设置</span>
                </div>
              </el-tooltip>
            </div>
          </div>
        </div>
      </aside>

      <!-- 工作区容器 -->
      <div class="workspace-container">
        <!-- 单窗口模式：只显示左窗口 -->
        <template v-if="!layoutStore.splitMode || !layoutStore.hasRightTabs">
          <TabWindow
            position="left"
            :tabs="allTabs"
            :activeTabId="activeTabInSingleMode"
            class="single-window"
          />
        </template>

        <!-- 分屏模式 -->
        <template v-else>
          <!-- 左窗口 -->
          <TabWindow
            v-show="layoutStore.hasLeftTabs"
            position="left"
            :tabs="layoutStore.leftTabs"
            :activeTabId="layoutStore.leftActiveTabId"
            class="left-window"
            :style="{ width: layoutStore.leftWindowWidth + '%' }"
          />

          <!-- 分隔条 -->
          <div 
            v-show="layoutStore.hasBothWindows"
            class="resize-handle"
            @mousedown="startResize"
          >
            <div class="resize-line"></div>
          </div>

          <!-- 右窗口 -->
          <TabWindow
            v-show="layoutStore.hasRightTabs"
            position="right"
            :tabs="layoutStore.rightTabs"
            :activeTabId="layoutStore.rightActiveTabId"
            class="right-window"
            :style="{ width: (100 - layoutStore.leftWindowWidth) + '%' }"
          />
        </template>
      </div>
    </div>

    <!-- 底部状态栏 -->
    <footer class="status-bar">
      <div class="status-row">
        <!-- ROS 连接 -->
        <span class="status-item" :class="layoutStore.connectionStatus.ros ? 'status-success' : 'status-danger'">
          <SvgIcon name="connection" :size="16" />
          <span class="status-label">ROS</span>
          <span class="status-value">{{ layoutStore.connectionStatus.ros ? '已连接' : '未连接' }}</span>
        </span>
        
        <span class="status-divider">|</span>
        
        <!-- 双臂状态 -->
        <span 
          class="status-item clickable" 
          :class="'status-' + layoutStore.armStatusInfo.type"
          @click="openPanel('arm-control')"
        >
          <SvgIcon name="cpu" :size="16" />
          <span class="status-label">双臂</span>
          <span class="status-value">{{ layoutStore.armStatusInfo.text }}</span>
        </span>
        
        <span class="status-divider">|</span>
        
        <!-- 相机状态 -->
        <span 
          class="status-item" 
          :class="'status-' + layoutStore.cameraStatusInfo.type"
        >
          <SvgIcon name="videocamera" :size="16" />
          <span class="status-label">相机</span>
          <span class="status-value">{{ layoutStore.cameraStatusInfo.text }}</span>
        </span>
        
        <span class="status-divider">|</span>
        
        <!-- 夹爪状态 -->
        <span 
          class="status-item clickable" 
          :class="'status-' + layoutStore.gripperStatusInfo.type"
          @click="openPanel('gripper')"
        >
          <SvgIcon name="scissor" :size="16" />
          <span class="status-label">夹爪</span>
          <span class="status-value">{{ layoutStore.gripperStatusInfo.text }}</span>
        </span>
        
        <span class="status-divider">|</span>
        
        <!-- 头部状态 -->
        <span 
          class="status-item clickable" 
          :class="'status-' + layoutStore.headStatusInfo.type"
          @click="openPanel('head')"
        >
          <SvgIcon name="camera" :size="16" />
          <span class="status-label">头部</span>
          <span class="status-value">{{ layoutStore.headStatusInfo.text }}</span>
        </span>
        
        <span class="status-divider">|</span>
        
        <!-- 升降状态 -->
        <span 
          class="status-item clickable" 
          :class="'status-' + layoutStore.liftStatusInfo.type"
          @click="openPanel('lift')"
        >
          <SvgIcon name="dcaret" :size="16" />
          <span class="status-label">升降</span>
          <span class="status-value">{{ layoutStore.liftStatusInfo.text }}</span>
        </span>
        
        <span class="status-divider">|</span>
        
        <!-- 底盘状态 -->
        <span 
          class="status-item clickable" 
          :class="'status-' + layoutStore.chassisStatusInfo.type"
          @click="openPanel('chassis')"
        >
          <SvgIcon name="van" :size="16" />
          <span class="status-label">底盘</span>
          <span class="status-value">{{ layoutStore.chassisStatusInfo.text }}</span>
        </span>
        
        <span class="status-divider">|</span>
        
        <!-- 腰部状态 -->
        <span 
          class="status-item clickable" 
          :class="'status-' + layoutStore.waistStatusInfo.type"
          @click="openPanel('waist')"
        >
          <SvgIcon name="refresh" :size="16" />
          <span class="status-label">腰部</span>
          <span class="status-value">{{ layoutStore.waistStatusInfo.text }}</span>
        </span>
        
        <span class="status-divider">|</span>
        
        <!-- VR 状态 -->
        <span 
          class="status-item clickable" 
          :class="'status-' + layoutStore.vrStatusInfo.type"
          @click="openPanel('vr-teleoperation')"
        >
          <SvgIcon name="view" :size="16" />
          <span class="status-label">VR</span>
          <span class="status-value">{{ layoutStore.vrStatusInfo.text }}</span>
        </span>
        
        <!-- 右侧电量与充电状态 -->
        <span class="status-spacer"></span>
        <span class="status-item battery-status" :class="'battery-' + layoutStore.chassisBatteryInfo.level">
          <div class="battery-pill">
            <span class="battery-icon">
              <SvgIcon name="lightning" :size="14" v-if="layoutStore.chassisBatteryInfo.charging" />
              <SvgIcon name="odometer" :size="14" v-else />
            </span>
            <span class="battery-text">
              {{ layoutStore.chassisBatteryInfo.percentage }}%
            </span>
            <span class="battery-voltage" v-if="layoutStore.chassisBatteryInfo.voltage">
              {{ layoutStore.chassisBatteryInfo.voltage.toFixed(1) }}V
            </span>
          </div>
          <span class="battery-badge" v-if="layoutStore.chassisBatteryInfo.charging">充电中</span>
        </span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '@/api/client'
import { useLayoutStore, PANEL_DEFINITIONS } from '@/stores/layout'
import { useAuthStore } from '@/stores/auth'
import TabWindow from '@/components/layout/TabWindow.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { chassisApi } from '@/api/chassis'

const router = useRouter()
const layoutStore = useLayoutStore()
const authStore = useAuthStore()

const scene3DFullscreen = ref(false)

// 主导航项
const mainNavItems = computed(() => PANEL_DEFINITIONS.filter(p => p.id !== 'settings'))

// 单窗口模式下的所有 tabs
const allTabs = computed(() => [...layoutStore.leftTabs, ...layoutStore.rightTabs])
const activeTabInSingleMode = computed(() => 
  layoutStore.leftActiveTabId || layoutStore.rightActiveTabId
)


// 拖拽状态
let isResizing = false
let startX = 0
let startWidth = 0

// 方法
function toggleSidebar() {
  layoutStore.toggleSidebar()
}

function openPanel(panelId: string) {
  // 智能选择打开位置
  const hasLeft = layoutStore.hasLeftTabs
  const hasRight = layoutStore.hasRightTabs
  
  if (layoutStore.splitMode && hasLeft && !hasRight) {
    // 分屏模式下，左边有内容，右边空，打开到右边
    layoutStore.openPanel(panelId, 'right')
  } else if (layoutStore.splitMode && hasRight) {
    // 分屏模式下，右边有内容，打开到右边
    layoutStore.openPanel(panelId, 'right')
  } else {
    // 单窗口模式或左边空，打开到左边
    layoutStore.openPanel(panelId, 'left')
  }
}

function mergeWindows() {
  // 将所有 tabs 合并到左窗口
  if (layoutStore.rightTabs.length > 0) {
    layoutStore.rightTabs.forEach(tab => {
      layoutStore.moveTab(tab.id, 'left')
    })
  }
}

function isNavActive(panelId: string) {
  // 检查左右窗口是否有该面板激活
  const leftTab = layoutStore.leftTabs.find(t => t.panelId === panelId)
  const rightTab = layoutStore.rightTabs.find(t => t.panelId === panelId)
  
  return (leftTab && leftTab.id === layoutStore.leftActiveTabId) ||
         (rightTab && rightTab.id === layoutStore.rightActiveTabId)
}

function getNavStatus(panelId: string): string {
  switch (panelId) {
    case 'arm-control':
      return layoutStore.armStatus.connected ? 
        (layoutStore.armStatus.enabled ? 'online' : 'warning') : 'offline'
    case 'gripper':
      return layoutStore.gripperStatus.left.communication_ok || layoutStore.gripperStatus.right.communication_ok ? 
        'online' : 'offline'
    case 'chassis':
      return layoutStore.chassisStatus.connected ? 
        (layoutStore.chassisStatus.emergency ? 'offline' : 'online') : 'offline'
    case 'lift':
      return layoutStore.liftStatus.connected ? 
        (layoutStore.liftStatus.enabled ? 'online' : 'warning') : 'offline'
    case 'head':
      return layoutStore.headStatus.connected ? 'online' : 'offline'
    case 'waist':
      return layoutStore.waistStatus.connected ? 
        (layoutStore.waistStatus.enabled ? 'online' : 'warning') : 'offline'
    case 'vr-teleoperation':
      return layoutStore.vrStatus.connected ? 'online' : 'offline'
    default:
      return ''
  }
}

function handleLogout() {
  authStore.logout()
  router.push('/login')
}

// 拖拽调整窗口宽度
function startResize(e: MouseEvent) {
  isResizing = true
  startX = e.clientX
  startWidth = layoutStore.leftWindowWidth
  
  document.addEventListener('mousemove', onResize)
  document.addEventListener('mouseup', stopResize)
  document.body.style.cursor = 'col-resize'
  document.body.style.userSelect = 'none'
}

function onResize(e: MouseEvent) {
  if (!isResizing) return
  
  const container = document.querySelector('.workspace-container') as HTMLElement
  if (!container) return
  
  const containerWidth = container.clientWidth
  const deltaX = e.clientX - startX
  const deltaPercent = (deltaX / containerWidth) * 100
  const newWidth = startWidth + deltaPercent
  
  layoutStore.setLeftWindowWidth(newWidth)
}

function stopResize() {
  isResizing = false
  document.removeEventListener('mousemove', onResize)
  document.removeEventListener('mouseup', stopResize)
  document.body.style.cursor = ''
  document.body.style.userSelect = ''
}


// 获取升降电机状态 - 使用统一 robot overview API
async function fetchLiftStatus() {
  try {
    const data = await apiClient.get('/api/v1/robot/overview')
    const liftData = data?.data?.lift || data?.lift
    if (liftData) {
      layoutStore.updateLiftStatus({
        connected: true,
        enabled: liftData.enabled ?? false,
        alarm: liftData.alarm ?? false
      })
    } else {
      layoutStore.updateLiftStatus({
        connected: false,
        enabled: false,
        alarm: false
      })
    }
  } catch (error) {
    layoutStore.updateLiftStatus({
      connected: false,
      enabled: false,
      alarm: false
    })
  }
}

// 获取机械臂状态
async function fetchArmStatus() {
  try {
    const data = await apiClient.get('/api/v1/arm/state')
    if (data) {
      layoutStore.updateArmStatus({
        connected: data.connected ?? false,
        powered: data.powered_on ?? false,  // 修复：使用 powered_on
        enabled: data.enabled ?? false,
        servoMode: data.servo_mode_enabled ?? false,  // 修复：使用 servo_mode_enabled
        error: data.in_error ?? false,  // 修复：使用 in_error
        errorCode: 0  // 后端没有error_code字段，暂时设为0
      })
    }
  } catch {
    layoutStore.updateArmStatus({ connected: false })
  }
}

// 获取相机状态
async function fetchCameraStatus() {
  try {
    const data = await apiClient.get('/api/v1/camera/status')
    if (data?.cameras) {
      const cameras = data.cameras
      layoutStore.updateCameraStatus('head', { 
        connected: cameras.head?.available ?? false,
        streaming: cameras.head?.available ?? false
      })
      layoutStore.updateCameraStatus('leftHand', { 
        connected: cameras.left_hand?.available ?? false,
        streaming: cameras.left_hand?.available ?? false
      })
      layoutStore.updateCameraStatus('rightHand', { 
        connected: cameras.right_hand?.available ?? false,
        streaming: cameras.right_hand?.available ?? false
      })
    }
  } catch {
    // 相机状态保持不变
  }
}

// 获取夹爪状态
async function fetchGripperStatus() {
  try {
    const data = await apiClient.get('/api/v1/gripper/state')
    if (data) {
      layoutStore.updateGripperStatus('left', {
        communication_ok: data.left?.communication_ok ?? false,
        is_activated: data.left?.is_activated ?? false,
        fault_code: data.left?.fault_code ?? 0
      })
      layoutStore.updateGripperStatus('right', {
        communication_ok: data.right?.communication_ok ?? false,
        is_activated: data.right?.is_activated ?? false,
        fault_code: data.right?.fault_code ?? 0
      })
    }
  } catch {
    // 夹爪状态保持不变
  }
}

// 获取头部状态 - 使用统一 robot overview API
async function fetchHeadStatus() {
  try {
    const data = await apiClient.get('/api/v1/robot/overview')
    const headData = data?.data?.head || data?.head
    if (headData) {
      layoutStore.updateHeadStatus({
        connected: true,
        enabled: headData.enabled ?? false,
        error: headData.error ?? false
      })
    } else {
      layoutStore.updateHeadStatus({ connected: false })
    }
  } catch {
    layoutStore.updateHeadStatus({ connected: false })
  }
}

// 获取底盘状态
async function fetchChassisStatus() {
  try {
    const data = await chassisApi.getStatus()
    layoutStore.updateChassisStatus({
      connected: true,
      system_status: data.system_status || 0,
      system_status_text: data.system_status_text || '未知',
      emergency: data.flags?.is_emergency_stopped || false,
      error: (data.system_status === 0x03 || data.system_status >= 0x15) || false,
      batteryPercentage: data.battery?.percentage ?? 0,
      batteryVoltage: data.battery?.voltage ?? 0,
      isCharging: data.flags?.is_charging ?? false
    })
  } catch (error) {
    layoutStore.updateChassisStatus({ 
      connected: false,
      system_status: 0,
      system_status_text: '未知',
      emergency: false,
      error: false,
      batteryPercentage: 0,
      batteryVoltage: 0,
      isCharging: false
    })
  }
}

// 获取腰部状态 - 使用统一 robot overview API
async function fetchWaistStatus() {
  try {
    const data = await apiClient.get('/api/v1/robot/overview')
    const waistData = data?.data?.waist || data?.waist
    if (waistData) {
      layoutStore.updateWaistStatus({
        connected: true,
        enabled: waistData.enabled ?? false,
        error: waistData.error ?? waistData.alarm ?? false
      })
    } else {
      layoutStore.updateWaistStatus({ connected: false })
    }
  } catch {
    layoutStore.updateWaistStatus({ connected: false })
  }
}

// 获取 VR 状态
async function fetchVRStatus() {
  try {
    const data = await apiClient.get('/api/v1/vr/status')
    if (data) {
      layoutStore.updateVRStatus({
        connected: data.connected ?? false,
        headsetActive: data.left_hand_active || data.right_hand_active,
        leftController: data.left_hand_active ?? false,
        rightController: data.right_hand_active ?? false
      })
    }
  } catch {
    layoutStore.updateVRStatus({ connected: false })
  }
}

// 获取 ROS 连接状态
async function fetchRosStatus() {
  try {
    const data = await apiClient.get('/api/v1/health')
    layoutStore.updateConnectionStatus({
      ros: data?.ros2_connected ?? false
    })
  } catch {
    layoutStore.updateConnectionStatus({ ros: false })
  }
}

// 获取关机状态（独立于其他设备）
let lastShutdownInProgress = false
async function fetchShutdownStatus() {
  try {
    const data = await apiClient.get('/api/v1/shutdown/state')
    if (data) {
      const shutdownInProgress = data.shutdown_in_progress ?? false
      // 检测新的关机请求（硬件按钮触发 trigger_source=1）
      if (shutdownInProgress && !lastShutdownInProgress && data.trigger_source === 1) {
        console.warn('⚠️ 检测到硬件关机按钮触发!')
        window.dispatchEvent(new CustomEvent('hardware-shutdown-requested'))
      }
      lastShutdownInProgress = shutdownInProgress
    }
  } catch {
    // 忽略错误
  }
}

// 统一获取所有设备状态
async function fetchAllStatus() {
  await Promise.all([
    fetchRosStatus(),
    fetchLiftStatus(),
    fetchArmStatus(),
    fetchCameraStatus(),
    fetchGripperStatus(),
    fetchHeadStatus(),
    fetchChassisStatus(),
    fetchWaistStatus(),
    fetchVRStatus(),
    fetchShutdownStatus()
  ])
}

let statusInterval: number | null = null

// 硬件关机事件处理
function handleHardwareShutdown() {
  ElMessageBox.alert(
    '检测到硬件关机按钮被按下，系统将在数秒后关机。',
    '系统关机提示',
    {
      confirmButtonText: '知道了',
      type: 'warning',
      center: true
    }
  )
  ElMessage.warning('硬件关机按钮已触发，系统即将关机...')
}

onMounted(() => {
  layoutStore.initLayout()
  
  // 立即获取所有状态
  fetchAllStatus()
  // 每2秒更新所有状态
  statusInterval = setInterval(fetchAllStatus, 2000)
  
  // 监听硬件关机事件
  window.addEventListener('hardware-shutdown-requested', handleHardwareShutdown)
})

onUnmounted(() => {
  if (statusInterval) {
    clearInterval(statusInterval)
  }
  // 移除硬件关机事件监听
  window.removeEventListener('hardware-shutdown-requested', handleHardwareShutdown)
})
</script>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--color-bg-primary);
  color: var(--color-text-secondary);
  overflow: hidden;
}

/* 顶部标题栏 */
.title-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 12px;
  background-color: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}

.title-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #409eff 0%, #36cfc9 100%);
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
}

.logo:hover {
  transform: scale(1.05);
}

.logo .el-icon {
  color: #fff;
}

.app-title {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.title-center {
  display: flex;
  align-items: center;
}

.layout-toggle {
  background-color: var(--color-bg-tertiary);
  border-radius: 6px;
  padding: 2px;
}

.title-right {
  display: flex;
  align-items: center;
  gap: 16px;
}


.user-section {
  cursor: pointer;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.user-info:hover {
  background-color: var(--color-surface-hover);
}

.username {
  font-size: 15px;
  color: var(--color-text-primary);
}

/* 主体区域 */
.main-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* 侧边栏 */
.sidebar {
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  backdrop-filter: blur(20px);
  border-right: 1px solid var(--color-border);
  transition: all 0.3s ease;
  flex-shrink: 0;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.2);
}

.sidebar.collapsed {
  width: 60px !important;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 12px 8px;
  font-family: var(--font-body);
}

.nav-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.nav-bottom {
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid rgba(148, 163, 184, 0.2);
}

.nav-item {
  cursor: pointer;
}

.nav-item-inner {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border-radius: 10px;
  transition: all 0.3s ease;
  position: relative;
  color: var(--color-text-secondary);
  font-weight: 500;
}

.nav-item:hover .nav-item-inner {
  background: rgba(245, 158, 11, 0.12);
  color: var(--color-text-primary);
  transform: translateX(4px);
}

.nav-item.active .nav-item-inner {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(245, 158, 11, 0.1) 100%);
  color: var(--color-primary);
  border: 1px solid rgba(245, 158, 11, 0.35);
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2);
}

.nav-item.active .nav-item-inner::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 20px;
  background-color: var(--color-primary);
  border-radius: 0 2px 2px 0;
}

.nav-label {
  font-size: 15px;
  white-space: nowrap;
}

.nav-status {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-left: auto;
}

.nav-status.online {
  background-color: #67c23a;
}

.nav-status.warning {
  background-color: #e6a23c;
}

.nav-status.offline {
  background-color: #909399;
}

/* 工作区容器 */
.workspace-container {
  flex: 1;
  display: flex;
  overflow: hidden;
  background: transparent;
  position: relative;
}

.workspace-container::before {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%);
  top: 20%;
  right: 10%;
  pointer-events: none;
  animation: float 10s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(30px, 30px); }
}

.single-window {
  flex: 1;
}

.left-window,
.right-window {
  flex-shrink: 0;
  min-width: 300px;
}

/* 拖拽分隔条 */
.resize-handle {
  width: 6px;
  cursor: col-resize;
  background: var(--color-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
  position: relative;
}

.resize-handle:hover {
  background: rgba(245, 158, 11, 0.18);
}

.resize-line {
  width: 2px;
  height: 40px;
  background: var(--color-border);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.resize-handle:hover .resize-line {
  background: var(--color-primary);
  height: 60px;
  box-shadow: 0 0 12px rgba(245, 158, 11, 0.5);
}

/* 底部状态栏 */
.status-bar {
  display: flex;
  flex-direction: column;
  min-height: 28px;
  padding: 0 12px;
  background: var(--color-surface);
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  font-size: 14px;
  flex-shrink: 0;
  font-family: var(--font-body);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
}

.status-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  padding: 4px 0;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  border-radius: 6px;
  white-space: nowrap;
  transition: all 0.3s ease;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
}

.status-item .el-icon {
  font-size: 12px;
}

.status-label {
  font-weight: 500;
}

.status-value {
  opacity: 0.9;
}

.status-divider {
  color: var(--color-text-muted);
  margin: 0 2px;
}

.status-spacer {
  flex: 1;
  min-width: 8px;
}


.battery-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
}

.battery-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background: var(--color-bg-tertiary);
  border-radius: 999px;
  border: 1px solid var(--color-border);
}

.battery-icon {
  display: inline-flex;
  align-items: center;
  color: var(--color-primary);
}

.battery-text {
  font-weight: 600;
  color: var(--color-text-primary);
}

.battery-voltage {
  font-size: 12px;
  color: var(--color-text-muted);
}

.battery-badge {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 999px;
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.35);
}

.battery-low .battery-pill {
  border-color: rgba(239, 68, 68, 0.5);
}

.battery-low .battery-text,
.battery-low .battery-icon {
  color: #f87171;
}

.battery-medium .battery-pill {
  border-color: rgba(245, 158, 11, 0.5);
}

.battery-medium .battery-text,
.battery-medium .battery-icon {
  color: #fbbf24;
}

.battery-high .battery-pill {
  border-color: rgba(16, 185, 129, 0.5);
}

.battery-high .battery-text,
.battery-high .battery-icon {
  color: #34d399;
}

/* 可点击状态项 */
.status-item.clickable {
  cursor: pointer;
}

.status-item.clickable:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

/* 状态类型样式 */
.status-success {
  background: rgba(16, 185, 129, 0.2);
  border-color: rgba(16, 185, 129, 0.4);
  color: #6EE7B7;
}

.status-warning {
  background: rgba(245, 158, 11, 0.2);
  border-color: rgba(245, 158, 11, 0.4);
  color: #FCD34D;
}

.status-danger {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.4);
  color: #FCA5A5;
}

.status-item.clickable:hover {
  background: rgba(245, 158, 11, 0.15);
  border-color: rgba(245, 158, 11, 0.5);
  transform: translateY(-1px);
}

/* 危险状态闪烁效果（仅用于严重问题） */
.status-danger.blink {
  animation: status-blink 1.5s ease-in-out infinite;
}

@keyframes status-blink {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 rgba(239, 68, 68, 0); }
  50% { opacity: 0.7; box-shadow: 0 0 12px rgba(239, 68, 68, 0.6); }
}

/* 响应式：在窄屏幕上隐藏标签文字 */
@media (max-width: 1400px) {
  .status-label {
    display: none;
  }
  
  .status-item {
    padding: 2px 4px;
  }
}

/* 极窄屏幕：换行显示 */
@media (max-width: 1100px) {
  .status-row {
    justify-content: center;
  }
  
  .status-spacer {
    display: none;
  }
  
  .status-time {
    width: 100%;
    justify-content: center;
    margin-top: 2px;
  }
}

/* 全屏模式 */
.fullscreen-mode .sidebar {
  display: none;
}

/* 覆盖Element Plus在暗色主题下的样式 */
:deep(.el-divider--vertical) {
  border-color: var(--color-border);
}

:deep(.el-button) {
  --el-button-bg-color: var(--color-bg-tertiary);
  --el-button-border-color: var(--color-border);
  --el-button-text-color: var(--color-text-secondary);
  --el-button-hover-bg-color: var(--color-surface-hover);
  --el-button-hover-border-color: var(--color-border-hover);
  --el-button-hover-text-color: var(--color-text-primary);
}

:deep(.el-dropdown-menu) {
  background-color: var(--color-bg-secondary);
  border-color: var(--color-border);
}

:deep(.el-dropdown-menu__item) {
  color: var(--color-text-secondary);
}

:deep(.el-dropdown-menu__item:hover) {
  background-color: var(--color-surface-hover);
  color: var(--color-text-primary);
}
</style>
