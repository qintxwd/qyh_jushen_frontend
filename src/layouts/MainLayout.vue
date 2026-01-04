<template>
  <div class="main-layout" :class="{ 'fullscreen-mode': scene3DFullscreen }">
    <!-- 顶部标题栏 -->
    <header class="title-bar">
      <div class="title-left">
        <div class="logo" @click="toggleSidebar">
          <el-icon :size="24"><Cpu /></el-icon>
        </div>
        <h1 class="app-title">远昌机器人控制平台</h1>
      </div>
      
      <div class="title-center">
        <!-- 布局切换按钮 -->
        <el-button-group size="small" class="layout-toggle">
          <el-tooltip content="单窗口模式">
            <el-button 
              :type="!layoutStore.splitMode ? 'primary' : 'default'"
              @click="layoutStore.splitMode = false; mergeWindows()"
            >
              <el-icon><Document /></el-icon>
            </el-button>
          </el-tooltip>
          <el-tooltip content="分屏模式">
            <el-button 
              :type="layoutStore.splitMode ? 'primary' : 'default'"
              @click="layoutStore.splitMode = true"
            >
              <el-icon><Grid /></el-icon>
            </el-button>
          </el-tooltip>
        </el-button-group>
      </div>
      
      <div class="title-right">
        <div class="status-indicators">
          <el-tooltip content="ROS2 连接状态" placement="bottom">
            <span class="status-dot" :class="{ active: layoutStore.connectionStatus.ros }">
              <el-icon><Connection /></el-icon>
            </span>
          </el-tooltip>
          <el-tooltip :content="'双臂: ' + layoutStore.armStatusInfo.text" placement="bottom">
            <span class="status-dot" :class="{ 
              active: layoutStore.armStatus.connected && layoutStore.armStatus.enabled,
              warning: layoutStore.armStatus.connected && !layoutStore.armStatus.enabled,
              error: layoutStore.armStatus.error
            }">
              <el-icon><Cpu /></el-icon>
            </span>
          </el-tooltip>
        </div>
        
        <el-divider direction="vertical" />
        
        <div class="user-section">
          <el-dropdown trigger="click">
            <span class="user-info">
              <el-avatar :size="28" icon="User" />
              <span class="username">{{ authStore.user?.username || '用户' }}</span>
              <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="openPanel('settings')">
                  <el-icon><Setting /></el-icon>
                  设置
                </el-dropdown-item>
                <el-dropdown-item divided @click="handleLogout">
                  <el-icon><SwitchButton /></el-icon>
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
                  <el-icon :size="22">
                    <component :is="item.icon" />
                  </el-icon>
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
                  <el-icon :size="22"><Setting /></el-icon>
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
          <el-icon><Connection /></el-icon>
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
          <el-icon><Cpu /></el-icon>
          <span class="status-label">双臂</span>
          <span class="status-value">{{ layoutStore.armStatusInfo.text }}</span>
        </span>
        
        <span class="status-divider">|</span>
        
        <!-- 相机状态 -->
        <span 
          class="status-item" 
          :class="'status-' + layoutStore.cameraStatusInfo.type"
        >
          <el-icon><VideoCamera /></el-icon>
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
          <el-icon><Scissor /></el-icon>
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
          <el-icon><Camera /></el-icon>
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
          <el-icon><DCaret /></el-icon>
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
          <el-icon><Van /></el-icon>
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
          <el-icon><Refresh /></el-icon>
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
          <el-icon><View /></el-icon>
          <span class="status-label">VR</span>
          <span class="status-value">{{ layoutStore.vrStatusInfo.text }}</span>
        </span>
        
        <!-- 右侧时间 -->
        <span class="status-spacer"></span>
        <span class="status-item status-time">
          <el-icon><Clock /></el-icon>
          {{ currentTime }}
        </span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useLayoutStore, PANEL_DEFINITIONS } from '@/stores/layout'
import { useAuthStore } from '@/stores/auth'
import TabWindow from '@/components/layout/TabWindow.vue'
import { getApiV1BaseUrl } from '@/utils/apiUrl'
import { ElMessageBox, ElMessage } from 'element-plus'
import { chassisApi } from '@/api/chassis'

// API 配置 - 动态获取，支持远程访问
const getApiBase = () => getApiV1BaseUrl()

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

// 当前时间
const currentTime = ref('')
let timeInterval: number | null = null

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

// 更新时间
function updateTime() {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('zh-CN', { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  })
}

// 获取升降电机状态
async function fetchLiftStatus() {
  try {
    const response = await axios.get(`${getApiBase()}/lift/state`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      timeout: 2000
    })
    
    if (response.data) {
      layoutStore.updateLiftStatus({
        connected: response.data.connected ?? false,
        enabled: response.data.enabled ?? false,
        alarm: response.data.alarm ?? false,
        shutdownRequested: response.data.shutdown_requested ?? false
      })
    }
  } catch (error) {
    layoutStore.updateLiftStatus({
      connected: false,
      enabled: false,
      alarm: false,
      shutdownRequested: false
    })
  }
}

// 获取机械臂状态
async function fetchArmStatus() {
  try {
    const response = await axios.get(`${getApiBase()}/arm/state`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      timeout: 2000
    })
    
    if (response.data) {
      layoutStore.updateArmStatus({
        connected: response.data.connected ?? false,
        powered: response.data.powered_on ?? false,  // 修复：使用 powered_on
        enabled: response.data.enabled ?? false,
        servoMode: response.data.servo_mode_enabled ?? false,  // 修复：使用 servo_mode_enabled
        error: response.data.in_error ?? false,  // 修复：使用 in_error
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
    const response = await axios.get(`${getApiBase()}/camera/status`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      timeout: 2000
    })
    
    if (response.data?.cameras) {
      const cameras = response.data.cameras
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
    const response = await axios.get(`${getApiBase()}/gripper/state`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      timeout: 2000
    })
    
    if (response.data) {
      layoutStore.updateGripperStatus('left', {
        communication_ok: response.data.left?.communication_ok ?? false,
        is_activated: response.data.left?.is_activated ?? false,
        fault_code: response.data.left?.fault_code ?? 0
      })
      layoutStore.updateGripperStatus('right', {
        communication_ok: response.data.right?.communication_ok ?? false,
        is_activated: response.data.right?.is_activated ?? false,
        fault_code: response.data.right?.fault_code ?? 0
      })
    }
  } catch {
    // 夹爪状态保持不变
  }
}

// 获取头部状态
async function fetchHeadStatus() {
  try {
    const response = await axios.get(`${getApiBase()}/head/state`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      timeout: 2000
    })
    
    if (response.data) {
      layoutStore.updateHeadStatus({
        connected: response.data.connected ?? false,
        enabled: response.data.enabled ?? false,
        error: response.data.error ?? false
      })
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
      error: (data.system_status === 0x03 || data.system_status >= 0x15) || false
    })
  } catch (error) {
    layoutStore.updateChassisStatus({ 
      connected: false,
      system_status: 0,
      system_status_text: '未知',
      emergency: false,
      error: false
    })
  }
}

// 获取腰部状态
async function fetchWaistStatus() {
  try {
    const response = await axios.get(`${getApiBase()}/waist/state`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      timeout: 2000
    })
    
    if (response.data) {
      layoutStore.updateWaistStatus({
        connected: response.data.connected ?? false,
        enabled: response.data.enabled ?? false,
        error: response.data.error ?? false
      })
    }
  } catch {
    layoutStore.updateWaistStatus({ connected: false })
  }
}

// 获取 VR 状态
async function fetchVRStatus() {
  try {
    const response = await axios.get(`${getApiBase()}/vr/status`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      timeout: 2000
    })
    
    if (response.data) {
      layoutStore.updateVRStatus({
        connected: response.data.connected ?? false,
        headsetActive: response.data.left_hand_active || response.data.right_hand_active,
        leftController: response.data.left_hand_active ?? false,
        rightController: response.data.right_hand_active ?? false
      })
    }
  } catch {
    layoutStore.updateVRStatus({ connected: false })
  }
}

// 统一获取所有设备状态
async function fetchAllStatus() {
  await Promise.all([
    fetchLiftStatus(),
    fetchArmStatus(),
    fetchCameraStatus(),
    fetchGripperStatus(),
    fetchHeadStatus(),
    fetchChassisStatus(),
    fetchWaistStatus(),
    fetchVRStatus()
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
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
  
  // 立即获取所有状态
  fetchAllStatus()
  // 每2秒更新所有状态
  statusInterval = setInterval(fetchAllStatus, 2000)
  
  // 监听硬件关机事件
  window.addEventListener('hardware-shutdown-requested', handleHardwareShutdown)
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
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
  background-color: #1e1e1e;
  color: #cccccc;
  overflow: hidden;
}

/* 顶部标题栏 */
.title-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: 0 12px;
  background-color: #323233;
  border-bottom: 1px solid #3c3c3c;
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
  font-size: 16px;
  font-weight: 500;
  color: #e0e0e0;
}

.title-center {
  display: flex;
  align-items: center;
}

.layout-toggle {
  background-color: #252526;
  border-radius: 6px;
  padding: 2px;
}

.title-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.status-indicators {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-dot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  font-size: 12px;
  font-weight: 600;
  color: #666;
  background-color: #3c3c3c;
  border-radius: 4px;
  transition: all 0.3s;
}

.status-dot.active {
  color: #fff;
  background-color: #67c23a;
}

.status-dot.warning {
  color: #fff;
  background-color: #e6a23c;
}

.status-dot.error {
  color: #fff;
  background-color: #f56c6c;
}

.user-section {
  cursor: pointer;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.user-info:hover {
  background-color: #3c3c3c;
}

.username {
  font-size: 14px;
  color: #e0e0e0;
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
  background-color: #252526;
  border-right: 1px solid #3c3c3c;
  transition: width 0.2s ease;
  flex-shrink: 0;
}

.sidebar.collapsed {
  width: 60px !important;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 8px;
}

.nav-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-bottom {
  margin-top: auto;
  padding-top: 8px;
  border-top: 1px solid #3c3c3c;
}

.nav-item {
  cursor: pointer;
}

.nav-item-inner {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 6px;
  transition: all 0.2s;
  position: relative;
}

.nav-item:hover .nav-item-inner {
  background-color: #2a2d2e;
}

.nav-item.active .nav-item-inner {
  background-color: #37373d;
  color: #fff;
}

.nav-item.active .nav-item-inner::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 20px;
  background-color: #409eff;
  border-radius: 0 2px 2px 0;
}

.nav-label {
  font-size: 14px;
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
  background-color: #1a1a1a;
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
  background-color: #2d2d2d;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background-color 0.2s;
}

.resize-handle:hover {
  background-color: #404040;
}

.resize-line {
  width: 2px;
  height: 40px;
  background-color: #555;
  border-radius: 1px;
}

.resize-handle:hover .resize-line {
  background-color: #409eff;
}

/* 底部状态栏 */
.status-bar {
  display: flex;
  flex-direction: column;
  min-height: 24px;
  padding: 0 8px;
  background-color: #007acc;
  color: #fff;
  font-size: 11px;
  flex-shrink: 0;
}

.status-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 2px;
  padding: 2px 0;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 2px 6px;
  border-radius: 3px;
  white-space: nowrap;
  transition: all 0.2s;
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
  color: rgba(255, 255, 255, 0.3);
  margin: 0 2px;
}

.status-spacer {
  flex: 1;
  min-width: 8px;
}

.status-time {
  color: rgba(255, 255, 255, 0.9);
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
  color: #fff;
}

.status-warning {
  background-color: rgba(230, 162, 60, 0.9);
  color: #fff;
}

.status-danger {
  background-color: rgba(245, 108, 108, 0.9);
  color: #fff;
}

/* 危险状态闪烁效果（仅用于严重问题） */
.status-danger.blink {
  animation: status-blink 1s ease-in-out infinite;
}

@keyframes status-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
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
  border-color: #555;
}

:deep(.el-button) {
  --el-button-bg-color: #3c3c3c;
  --el-button-border-color: #555;
  --el-button-text-color: #ccc;
  --el-button-hover-bg-color: #505050;
  --el-button-hover-border-color: #666;
  --el-button-hover-text-color: #fff;
}

:deep(.el-dropdown-menu) {
  background-color: #2d2d2d;
  border-color: #3c3c3c;
}

:deep(.el-dropdown-menu__item) {
  color: #ccc;
}

:deep(.el-dropdown-menu__item:hover) {
  background-color: #3c3c3c;
  color: #fff;
}
</style>
