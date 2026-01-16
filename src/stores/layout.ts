import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 面板定义
export interface PanelDef {
  id: string
  name: string
  icon: string
  component: string
  closable?: boolean
  minWidth?: number
  defaultWidth?: number
}

// 已打开的Tab
export interface OpenTab {
  id: string
  panelId: string
  title: string
  icon: string
  closable: boolean
}

// 窗口位置
export type WindowPosition = 'left' | 'right'

// 预定义的功能面板 - 将 3D 场景作为普通 Tab
export const PANEL_DEFINITIONS: PanelDef[] = [
  {
    id: 'scene3d',
    name: '3D场景',
    icon: 'scene-3d',
    component: 'Scene3DPanel',
    closable: true,
    minWidth: 400,
    defaultWidth: 600
  },
  {
    id: 'arm-control',
    name: '机械臂',
    icon: 'robot-arm-dual',
    component: 'ArmControlPanel',
    closable: true,
    minWidth: 320,
    defaultWidth: 400
  },
  {
    id: 'gripper',
    name: '夹爪',
    icon: 'gripper',
    component: 'GripperPanel',
    closable: true,
    minWidth: 280,
    defaultWidth: 350
  },
  {
    id: 'chassis',
    name: '底盘',
    icon: 'chassis',
    component: 'ChassisPanel',
    closable: true,
    minWidth: 300,
    defaultWidth: 380
  },
  {
    id: 'head',
    name: '头部',
    icon: 'head',
    component: 'HeadPanel',
    closable: true,
    minWidth: 280,
    defaultWidth: 350
  },
  {
    id: 'lift',
    name: '升降',
    icon: 'lift',
    component: 'LiftPanel',
    closable: true,
    minWidth: 300,
    defaultWidth: 380
  },
  {
    id: 'waist',
    name: '腰部',
    icon: 'waist',
    component: 'WaistPanel',
    closable: true,
    minWidth: 300,
    defaultWidth: 380
  },
  {
    id: 'task',
    name: '任务',
    icon: 'task',
    component: 'TaskPanel',
    closable: true,
    minWidth: 400,
    defaultWidth: 600
  },
  {
    id: 'settings',
    name: '设置',
    icon: 'setting',
    component: 'SettingsPanel',
    closable: true,
    minWidth: 350,
    defaultWidth: 420
  },
  {
    id: 'vr-teleoperation',
    name: 'VR遥操作',
    icon: 'vr',
    component: 'VRTeleoperationPanel',
    closable: true,
    minWidth: 320,
    defaultWidth: 400
  },
  {
    id: 'data-collection',
    name: '数据采集',
    icon: 'data-collection',
    component: 'DataCollectionPanel',
    closable: true,
    minWidth: 400,
    defaultWidth: 500
  },
  {
    id: 'terminal',
    name: '终端',
    icon: 'monitor',
    component: 'TerminalPanel',
    closable: true,
    minWidth: 400,
    defaultWidth: 600
  }
]

export const useLayoutStore = defineStore('layout', () => {
  // 侧边栏状态
  const sidebarCollapsed = ref(false)
  const sidebarWidth = ref(60) // 收缩时60px，展开时180px
  
  // 双窗口布局状态
  const splitMode = ref(true) // 是否为分屏模式
  const leftWindowWidth = ref(50) // 左窗口宽度百分比
  
  // 左窗口 Tabs
  const leftTabs = ref<OpenTab[]>([])
  const leftActiveTabId = ref<string | null>(null)
  
  // 右窗口 Tabs
  const rightTabs = ref<OpenTab[]>([])
  const rightActiveTabId = ref<string | null>(null)
  
  // 拖拽状态
  const draggingTab = ref<{ tab: OpenTab; from: WindowPosition } | null>(null)
  const dropTarget = ref<WindowPosition | null>(null)
  
  // 3D场景状态（保持兼容）
  const scene3DFullscreen = ref(false)
  
  // 系统连接状态
  const connectionStatus = ref({
    ros: false,
    leftArm: false,
    rightArm: false,
    gripper: false,
    chassis: false,
    lift: false
  })

  // ROS 连接状态去抖（避免瞬时抖动）
  const rosLastTrueAt = ref(0)
  const rosHoldMs = 5000

  // ========== 各设备详细状态 ==========
  
  // 双臂状态（合并为一个控制器）
  const armStatus = ref<{
    connected: boolean
    powered: boolean      // 上电
    enabled: boolean      // 使能
    servoMode: boolean    // 伺服模式
    error: boolean        // 有错误
    errorCode: number     // 错误码
  }>({
    connected: false,
    powered: false,
    enabled: false,
    servoMode: false,
    error: false,
    errorCode: 0
  })

  // 相机状态
  const cameraStatus = ref<{
    head: { connected: boolean; streaming: boolean }
    leftHand: { connected: boolean; streaming: boolean }
    rightHand: { connected: boolean; streaming: boolean }
  }>({
    head: { connected: false, streaming: false },
    leftHand: { connected: false, streaming: false },
    rightHand: { connected: false, streaming: false }
  })

  // 夹爪状态
  const gripperStatus = ref<{
    left: { communication_ok: boolean; is_activated: boolean; fault_code: number }
    right: { communication_ok: boolean; is_activated: boolean; fault_code: number }
  }>({
    left: { communication_ok: false, is_activated: false, fault_code: 0 },
    right: { communication_ok: false, is_activated: false, fault_code: 0 }
  })

  // 头部电机状态
  const headStatus = ref<{
    connected: boolean
    enabled: boolean
    error: boolean
  }>({
    connected: false,
    enabled: false,
    error: false
  })

  // 升降电机详细状态
  const liftStatus = ref<{
    connected: boolean
    enabled: boolean
    alarm: boolean
  }>({
    connected: false,
    enabled: false,
    alarm: false
  })

  // 底盘状态
  const chassisStatus = ref<{
    connected: boolean
    system_status: number        // 系统状态码
    system_status_text: string   // 系统状态文本（如"待机"、"运行"等）
    emergency: boolean           // 急停状态
    error: boolean
    batteryPercentage: number
    batteryVoltage: number
    isCharging: boolean
  }>({
    connected: false,
    system_status: 0,
    system_status_text: '未知',
    emergency: false,
    error: false,
    batteryPercentage: 0,
    batteryVoltage: 0,
    isCharging: false
  })

  // VR 状态
  const vrStatus = ref<{
    connected: boolean
    headsetActive: boolean
    leftController: boolean
    rightController: boolean
  }>({
    connected: false,
    headsetActive: false,
    leftController: false,
    rightController: false
  })

  // 腰部电机状态
  const waistStatus = ref<{
    connected: boolean
    enabled: boolean
    error: boolean
  }>({
    connected: false,
    enabled: false,
    error: false
  })

  // ========== 状态显示信息计算 ==========

  // 双臂状态信息
  const armStatusInfo = computed(() => {
    if (!armStatus.value.connected) {
      return { text: '未连接', type: 'danger' as const, icon: 'CloseBold' }
    }
    if (armStatus.value.error) {
      return { text: '故障', type: 'danger' as const, icon: 'WarningFilled' }
    }
    if (armStatus.value.servoMode) {
      return { text: '伺服运行中', type: 'success' as const, icon: 'VideoPlay' }
    }
    if (armStatus.value.enabled) {
      return { text: '已使能', type: 'success' as const, icon: 'Unlock' }
    }
    if (armStatus.value.powered) {
      return { text: '已上电', type: 'success' as const, icon: 'CircleCheck' }
    }
    return { text: '已连接', type: 'info' as const, icon: 'CircleCheckFilled' }
  })

  // 相机状态汇总
  const cameraStatusInfo = computed(() => {
    const cameras = cameraStatus.value
    const connectedCount = [cameras.head, cameras.leftHand, cameras.rightHand]
      .filter(c => c.connected).length
    
    if (connectedCount === 0) {
      return { text: '0/3', type: 'danger' as const }
    }
    if (connectedCount < 3) {
      return { text: `${connectedCount}/3`, type: 'warning' as const }
    }
    return { text: '3/3', type: 'success' as const }
  })

  // 夹爪状态汇总
  const gripperStatusInfo = computed(() => {
    const g = gripperStatus.value
    // 检查通信状态
    if (!g.left.communication_ok && !g.right.communication_ok) {
      return { text: '通信断开', type: 'danger' as const }
    }
    if (!g.left.communication_ok || !g.right.communication_ok) {
      return { text: '部分断开', type: 'warning' as const }
    }
    // 检查故障
    if (g.left.fault_code !== 0 || g.right.fault_code !== 0) {
      return { text: '故障', type: 'danger' as const }
    }
    // 检查激活状态
    if (!g.left.is_activated && !g.right.is_activated) {
      return { text: '未激活', type: 'warning' as const }
    }
    if (!g.left.is_activated || !g.right.is_activated) {
      return { text: '部分激活', type: 'warning' as const }
    }
    return { text: '正常', type: 'success' as const }
  })

  // 头部状态信息（头部舵机没有使能概念，连接即可使用）
  const headStatusInfo = computed(() => {
    if (!headStatus.value.connected) {
      return { text: '未连接', type: 'danger' as const }
    }
    if (headStatus.value.error) {
      return { text: '故障', type: 'danger' as const }
    }
    return { text: '正常', type: 'success' as const }
  })

  // 升降电机状态文本和类型
  const liftStatusInfo = computed(() => {
    if (!liftStatus.value.connected) {
      return { text: '未连接', type: 'danger' as const }
    }
    if (liftStatus.value.alarm) {
      return { text: '报警', type: 'danger' as const }
    }
    if (!liftStatus.value.enabled) {
      return { text: '未使能', type: 'warning' as const }
    }
    return { text: '正常', type: 'success' as const }
  })

  // 底盘状态信息
  const chassisStatusInfo = computed(() => {
    if (!chassisStatus.value.connected) {
      return { text: '未连接', type: 'danger' as const }
    }
    if (chassisStatus.value.emergency) {
      return { text: '急停', type: 'danger' as const }
    }
    if (chassisStatus.value.error) {
      return { text: '故障', type: 'danger' as const }
    }
    // 使用system_status判断状态类型，与ChassisPanel一致
    const systemStatus = chassisStatus.value.system_status
    if (systemStatus === 0x02) {
      return { text: chassisStatus.value.system_status_text, type: 'success' as const } // 空闲/待机
    }
    if (systemStatus === 0x03 || systemStatus >= 0x15) {
      return { text: chassisStatus.value.system_status_text, type: 'danger' as const } // 错误
    }
    if (systemStatus >= 0x08 && systemStatus <= 0x0A) {
      return { text: chassisStatus.value.system_status_text, type: 'warning' as const } // 障碍
    }
    return { text: chassisStatus.value.system_status_text || '未知', type: 'info' as const }
  })

  const chassisBatteryInfo = computed(() => {
    const percentage = Math.max(0, Math.min(100, chassisStatus.value.batteryPercentage || 0))
    let level: 'low' | 'medium' | 'high' = 'high'
    if (percentage < 20) level = 'low'
    else if (percentage < 50) level = 'medium'

    return {
      percentage,
      voltage: chassisStatus.value.batteryVoltage || 0,
      charging: chassisStatus.value.isCharging,
      level
    }
  })

  // VR 状态信息
  const vrStatusInfo = computed(() => {
    if (!vrStatus.value.connected) {
      return { text: '未连接', type: 'danger' as const }
    }
    if (!vrStatus.value.headsetActive) {
      return { text: '待机', type: 'warning' as const }
    }
    const controllers = [vrStatus.value.leftController, vrStatus.value.rightController]
      .filter(Boolean).length
    if (controllers < 2) {
      return { text: `控制器${controllers}/2`, type: 'warning' as const }
    }
    return { text: '活跃', type: 'success' as const }
  })

  // 腰部状态信息
  const waistStatusInfo = computed(() => {
    if (!waistStatus.value.connected) {
      return { text: '未连接', type: 'danger' as const }
    }
    if (waistStatus.value.error) {
      return { text: '故障', type: 'danger' as const }
    }
    if (!waistStatus.value.enabled) {
      return { text: '未使能', type: 'warning' as const }
    }
    return { text: '正常', type: 'success' as const }
  })

  // 计算属性
  const expandedSidebarWidth = computed(() => sidebarCollapsed.value ? 60 : 180)
  
  const hasLeftTabs = computed(() => leftTabs.value.length > 0)
  const hasRightTabs = computed(() => rightTabs.value.length > 0)
  const hasBothWindows = computed(() => splitMode.value && hasLeftTabs.value && hasRightTabs.value)
  
  // 获取当前激活的面板定义
  const leftActivePanel = computed(() => {
    if (!leftActiveTabId.value) return null
    const tab = leftTabs.value.find(t => t.id === leftActiveTabId.value)
    if (!tab) return null
    return PANEL_DEFINITIONS.find(p => p.id === tab.panelId)
  })

  const rightActivePanel = computed(() => {
    if (!rightActiveTabId.value) return null
    const tab = rightTabs.value.find(t => t.id === rightActiveTabId.value)
    if (!tab) return null
    return PANEL_DEFINITIONS.find(p => p.id === tab.panelId)
  })

  // 旧版兼容
  const openTabs = computed(() => [...leftTabs.value, ...rightTabs.value])
  const activeTabId = computed(() => rightActiveTabId.value || leftActiveTabId.value)
  const hasOpenTabs = computed(() => openTabs.value.length > 0)
  const rightPanelVisible = computed(() => hasRightTabs.value)
  const rightPanelWidth = ref(400)
  const minRightPanelWidth = 280
  const maxRightPanelWidth = 800
  const activePanel = computed(() => rightActivePanel.value || leftActivePanel.value)

  // 方法
  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  function toggleSplitMode() {
    if (splitMode.value) {
      // 合并到单窗口 - 将右边的 tabs 移到左边
      leftTabs.value = [...leftTabs.value, ...rightTabs.value]
      rightTabs.value = []
      rightActiveTabId.value = null
    }
    splitMode.value = !splitMode.value
  }

  function setLeftWindowWidth(percent: number) {
    leftWindowWidth.value = Math.max(20, Math.min(80, percent))
  }

  // 打开面板
  function openPanel(panelId: string, position: WindowPosition = 'right') {
    const panelDef = PANEL_DEFINITIONS.find(p => p.id === panelId)
    if (!panelDef) return

    // 检查是否已经在任一窗口打开
    const existingLeftTab = leftTabs.value.find(t => t.panelId === panelId)
    const existingRightTab = rightTabs.value.find(t => t.panelId === panelId)

    if (existingLeftTab) {
      leftActiveTabId.value = existingLeftTab.id
      return
    }
    if (existingRightTab) {
      rightActiveTabId.value = existingRightTab.id
      return
    }

    // 创建新 Tab
    const newTab: OpenTab = {
      id: `${panelId}-${Date.now()}`,
      panelId: panelId,
      title: panelDef.name,
      icon: panelDef.icon,
      closable: panelDef.closable !== false
    }

    // 根据位置添加到对应窗口
    if (position === 'left') {
      leftTabs.value.push(newTab)
      leftActiveTabId.value = newTab.id
    } else {
      rightTabs.value.push(newTab)
      rightActiveTabId.value = newTab.id
    }
  }

  // 关闭 Tab
  function closeTab(tabId: string) {
    // 尝试在左窗口找
    let index = leftTabs.value.findIndex(t => t.id === tabId)
    if (index !== -1) {
      const tab = leftTabs.value[index]
      if (!tab.closable) return
      leftTabs.value.splice(index, 1)
      if (leftActiveTabId.value === tabId) {
        leftActiveTabId.value = leftTabs.value.length > 0 
          ? leftTabs.value[Math.min(index, leftTabs.value.length - 1)].id 
          : null
      }
      return
    }

    // 尝试在右窗口找
    index = rightTabs.value.findIndex(t => t.id === tabId)
    if (index !== -1) {
      const tab = rightTabs.value[index]
      if (!tab.closable) return
      rightTabs.value.splice(index, 1)
      if (rightActiveTabId.value === tabId) {
        rightActiveTabId.value = rightTabs.value.length > 0 
          ? rightTabs.value[Math.min(index, rightTabs.value.length - 1)].id 
          : null
      }
    }
  }

  // 设置活动 Tab
  function setActiveTab(tabId: string, position?: WindowPosition) {
    if (position === 'left' || leftTabs.value.find(t => t.id === tabId)) {
      leftActiveTabId.value = tabId
    } else if (position === 'right' || rightTabs.value.find(t => t.id === tabId)) {
      rightActiveTabId.value = tabId
    }
  }

  // 拖拽开始
  function startDrag(tab: OpenTab, from: WindowPosition) {
    draggingTab.value = { tab, from }
  }

  // 拖拽结束
  function endDrag() {
    draggingTab.value = null
    dropTarget.value = null
  }

  // 移动 Tab 到另一个窗口
  function moveTab(tabId: string, to: WindowPosition) {
    let tab: OpenTab | undefined
    let fromPosition: WindowPosition | null = null

    const leftIndex = leftTabs.value.findIndex(t => t.id === tabId)
    if (leftIndex !== -1) {
      tab = leftTabs.value[leftIndex]
      fromPosition = 'left'
    } else {
      const rightIndex = rightTabs.value.findIndex(t => t.id === tabId)
      if (rightIndex !== -1) {
        tab = rightTabs.value[rightIndex]
        fromPosition = 'right'
      }
    }

    if (!tab || !fromPosition || fromPosition === to) return

    // 从原位置移除
    if (fromPosition === 'left') {
      leftTabs.value = leftTabs.value.filter(t => t.id !== tabId)
      if (leftActiveTabId.value === tabId) {
        leftActiveTabId.value = leftTabs.value.length > 0 ? leftTabs.value[0].id : null
      }
    } else {
      rightTabs.value = rightTabs.value.filter(t => t.id !== tabId)
      if (rightActiveTabId.value === tabId) {
        rightActiveTabId.value = rightTabs.value.length > 0 ? rightTabs.value[0].id : null
      }
    }

    // 添加到新位置
    if (to === 'left') {
      leftTabs.value.push(tab)
      leftActiveTabId.value = tab.id
    } else {
      rightTabs.value.push(tab)
      rightActiveTabId.value = tab.id
    }

    // 如果移动后有两边都有 tabs，开启分屏模式
    if (hasLeftTabs.value && hasRightTabs.value) {
      splitMode.value = true
    }
  }

  function setDropTarget(position: WindowPosition | null) {
    dropTarget.value = position
  }

  function closeAllTabs() {
    leftTabs.value = leftTabs.value.filter(t => !t.closable)
    rightTabs.value = rightTabs.value.filter(t => !t.closable)
    leftActiveTabId.value = leftTabs.value.length > 0 ? leftTabs.value[0].id : null
    rightActiveTabId.value = rightTabs.value.length > 0 ? rightTabs.value[0].id : null
  }

  function closeOtherTabs(keepTabId: string) {
    const isInLeft = leftTabs.value.some(t => t.id === keepTabId)
    
    if (isInLeft) {
      leftTabs.value = leftTabs.value.filter(t => t.id === keepTabId || !t.closable)
      rightTabs.value = rightTabs.value.filter(t => !t.closable)
      leftActiveTabId.value = keepTabId
      rightActiveTabId.value = rightTabs.value.length > 0 ? rightTabs.value[0].id : null
    } else {
      rightTabs.value = rightTabs.value.filter(t => t.id === keepTabId || !t.closable)
      leftTabs.value = leftTabs.value.filter(t => !t.closable)
      rightActiveTabId.value = keepTabId
      leftActiveTabId.value = leftTabs.value.length > 0 ? leftTabs.value[0].id : null
    }
  }

  function toggle3DFullscreen() {
    scene3DFullscreen.value = !scene3DFullscreen.value
  }

  function toggleRightPanel() {
    if (hasRightTabs.value) {
      leftTabs.value = [...leftTabs.value, ...rightTabs.value]
      if (!leftActiveTabId.value && rightActiveTabId.value) {
        leftActiveTabId.value = rightActiveTabId.value
      }
      rightTabs.value = []
      rightActiveTabId.value = null
    }
  }

  function setRightPanelWidth(width: number) {
    rightPanelWidth.value = Math.max(minRightPanelWidth, Math.min(maxRightPanelWidth, width))
  }

  function updateConnectionStatus(status: Partial<typeof connectionStatus.value>) {
    const now = Date.now()

    if (status.ros === true) {
      rosLastTrueAt.value = now
    }

    if (status.ros === false) {
      // 如果最近刚连上，保持为 true，避免闪断
      if (now - rosLastTrueAt.value < rosHoldMs) {
        status = { ...status }
        delete status.ros
      }
    }

    Object.assign(connectionStatus.value, status)
  }

  function updateLiftStatus(status: Partial<typeof liftStatus.value>) {
    Object.assign(liftStatus.value, status)
    connectionStatus.value.lift = status.connected ?? liftStatus.value.connected
  }

  // 更新双臂状态
  function updateArmStatus(status: Partial<typeof armStatus.value>) {
    Object.assign(armStatus.value, status)
    connectionStatus.value.leftArm = status.connected ?? armStatus.value.connected
    connectionStatus.value.rightArm = status.connected ?? armStatus.value.connected
  }

  // 更新相机状态
  function updateCameraStatus(cameraId: 'head' | 'leftHand' | 'rightHand', status: Partial<typeof cameraStatus.value.head>) {
    Object.assign(cameraStatus.value[cameraId], status)
  }

  // 更新夹爪状态
  function updateGripperStatus(side: 'left' | 'right', status: Partial<typeof gripperStatus.value.left>) {
    Object.assign(gripperStatus.value[side], status)
    connectionStatus.value.gripper = gripperStatus.value.left.communication_ok || gripperStatus.value.right.communication_ok
  }

  // 更新头部状态
  function updateHeadStatus(status: Partial<typeof headStatus.value>) {
    Object.assign(headStatus.value, status)
  }

  // 更新底盘状态
  function updateChassisStatus(status: Partial<typeof chassisStatus.value>) {
    Object.assign(chassisStatus.value, status)
    connectionStatus.value.chassis = status.connected ?? chassisStatus.value.connected
  }

  // 更新 VR 状态
  function updateVRStatus(status: Partial<typeof vrStatus.value>) {
    Object.assign(vrStatus.value, status)
  }

  // 更新腰部状态
  function updateWaistStatus(status: Partial<typeof waistStatus.value>) {
    Object.assign(waistStatus.value, status)
  }

  // 最大化某个窗口
  function maximizeWindow(position: WindowPosition) {
    if (position === 'left') {
      leftTabs.value = [...leftTabs.value, ...rightTabs.value]
      rightTabs.value = []
      rightActiveTabId.value = null
    } else {
      rightTabs.value = [...rightTabs.value, ...leftTabs.value]
      leftTabs.value = []
      leftActiveTabId.value = null
    }
    splitMode.value = false
  }

  function restoreSplit() {
    splitMode.value = true
  }

  // 初始化 - 默认左边显示3D场景，右边显示底盘
  function initLayout() {
    if (leftTabs.value.length === 0 && rightTabs.value.length === 0) {
      openPanel('scene3d', 'left')
      openPanel('chassis', 'right')
      splitMode.value = true
      leftWindowWidth.value = 50
    }
  }

  return {
    // 状态
    sidebarCollapsed,
    sidebarWidth,
    splitMode,
    leftWindowWidth,
    leftTabs,
    leftActiveTabId,
    rightTabs,
    rightActiveTabId,
    draggingTab,
    dropTarget,
    scene3DFullscreen,
    connectionStatus,
    
    // 设备详细状态
    armStatus,
    cameraStatus,
    gripperStatus,
    headStatus,
    liftStatus,
    chassisStatus,
    vrStatus,
    waistStatus,
    
    // 状态显示信息
    armStatusInfo,
    cameraStatusInfo,
    gripperStatusInfo,
    headStatusInfo,
    liftStatusInfo,
    chassisStatusInfo,
    chassisBatteryInfo,
    vrStatusInfo,
    waistStatusInfo,
    
    // 旧版兼容
    openTabs,
    activeTabId,
    hasOpenTabs,
    rightPanelVisible,
    rightPanelWidth,
    minRightPanelWidth,
    maxRightPanelWidth,
    activePanel,
    
    // 计算属性
    expandedSidebarWidth,
    hasLeftTabs,
    hasRightTabs,
    hasBothWindows,
    leftActivePanel,
    rightActivePanel,
    
    // 方法
    toggleSidebar,
    toggleSplitMode,
    setLeftWindowWidth,
    openPanel,
    closeTab,
    setActiveTab,
    startDrag,
    endDrag,
    moveTab,
    setDropTarget,
    closeAllTabs,
    closeOtherTabs,
    toggle3DFullscreen,
    toggleRightPanel,
    setRightPanelWidth,
    updateConnectionStatus,
    updateArmStatus,
    updateCameraStatus,
    updateGripperStatus,
    updateHeadStatus,
    updateLiftStatus,
    updateChassisStatus,
    updateVRStatus,
    updateWaistStatus,
    maximizeWindow,
    restoreSplit,
    initLayout
  }
})
