<template>
  <div class="chassis-panel">
    <!-- 顶部状态栏 - 高度集成 -->
    <div class="status-bar">
      <div class="status-group">
        <div class="status-item">
          <span class="status-label">系统</span>
          <el-tag :type="getStatusType(status.system_status)" size="small">
            {{ status.system_status_text }}
          </el-tag>
        </div>
        <div class="status-item">
          <span class="status-label">定位</span>
          <el-tag :type="getLocationStatusType(status.location_status)" size="small">
            {{ status.location_status_text }}
          </el-tag>
          <span class="status-value" style="margin-left: 4px; font-size: 11px; color: #888;">
            ({{ ((status.pose?.confidence ?? 0) * 100).toFixed(0) }}%)
          </span>
        </div>
        <div class="status-item">
          <span class="status-label">运动</span>
          <el-tag :type="status.motion_status === 1 ? '' : 'success'" size="small">
            {{ status.motion_status_text }}
          </el-tag>
        </div>
      </div>

      <div class="status-group">
        <div class="status-item compact">
          <span class="status-label">位置</span>
          <span class="status-value">
            X: {{ status.pose?.x?.toFixed(2) ?? '0.00' }} | 
            Y: {{ status.pose?.y?.toFixed(2) ?? '0.00' }} | 
            θ: {{ ((status.pose?.yaw ?? 0) * 180 / Math.PI).toFixed(0) }}°
          </span>
        </div>
        <div class="status-item compact">
          <span class="status-label">速度</span>
          <span class="status-value">
            {{ status.velocity?.linear_x?.toFixed(2) ?? '0.00' }} m/s | 
            {{ ((status.velocity?.angular_z ?? 0) * 180 / Math.PI).toFixed(0) }}°/s
          </span>
        </div>
      </div>

      <div class="status-group">
        <div class="battery-compact">
          <div class="battery-mini-bar">
            <div class="battery-mini-fill" :style="{ width: status.battery?.percentage + '%' }"></div>
          </div>
          <span class="battery-text" :class="getBatteryClass(status.battery?.percentage)">
            {{ status.battery?.percentage ?? 0 }}%
          </span>
          <span class="battery-voltage">{{ (status.battery?.voltage ?? 0).toFixed(1) }}V</span>
        </div>
      </div>
    </div>

    <el-divider style="margin: 12px 0" />

    <!-- 主控制区域 -->
    <div class="control-area">
      <!-- 左侧：紧急控制 & 系统控制 -->
      <div class="left-panel">
        <!-- 紧急控制 -->
        <div class="panel-section danger-section">
          <h3 class="section-title danger-title">紧急控制</h3>
          <div class="emergency-buttons">
            <el-button 
              type="danger" 
              size="large"
              :disabled="status.flags?.is_emergency_stopped"
              @click="emergencyStop"
            >
              <SvgIcon name="emergency-stop" :size="16" />
              紧急停止
            </el-button>
            <el-button 
              type="warning"
              size="large"
              :disabled="!status.flags?.is_emergency_stopped || !status.flags?.is_emergency_recoverable"
              @click="releaseEmergencyStop"
            >
              <SvgIcon name="unlock" :size="16" />
              解除急停
            </el-button>
          </div>
        </div>

        <!-- 状态标志 -->
        <div class="panel-section">
          <h3 class="section-title">状态标志</h3>
          <div class="flags-grid">
            <div class="flag-item" :class="{ active: status.flags?.is_emergency_stopped }">
              <SvgIcon name="emergency-stop" :size="16" />
              <span>急停</span>
            </div>
            <div class="flag-item" :class="{ active: status.flags?.is_brake_released }">
              <SvgIcon name="unlock" :size="16" />
              <span>抱闸释放</span>
            </div>
            <div class="flag-item" :class="{ active: status.flags?.is_charging, charging: status.flags?.is_charging }">
              <SvgIcon name="lightning" :size="16" />
              <span>充电中</span>
            </div>
            <div class="flag-item" :class="{ active: status.flags?.is_auto_mode }">
              <SvgIcon name="auto-mode" :size="16" />
              <span>自动模式</span>
            </div>
            <div class="flag-item" :class="{ active: status.flags?.is_loaded }">
              <SvgIcon name="box" :size="16" />
              <span>有载荷</span>
            </div>
            <div class="flag-item" :class="{ active: status.flags?.has_wifi, wifi: status.flags?.has_wifi }">
              <SvgIcon name="connection" :size="16" />
              <span>WiFi</span>
            </div>
            <div class="flag-item" :class="{ active: status.flags?.obstacle_slowdown, warning: status.flags?.obstacle_slowdown }">
              <SvgIcon name="slow-obstacle" :size="16" />
              <span>减速避障</span>
            </div>
            <div class="flag-item" :class="{ active: status.flags?.obstacle_paused, danger: status.flags?.obstacle_paused }">
              <SvgIcon name="pause-obstacle" :size="16" />
              <span>障碍暂停</span>
            </div>
          </div>
        </div>

        <!-- 系统控制 -->
        <div class="panel-section">
          <h3 class="section-title">系统控制</h3>
          <div class="system-buttons">
            <el-button type="warning" @click="systemReset" :loading="systemLoading">
              <SvgIcon name="refreshright" :size="16" />
              系统复位
            </el-button>
            <el-button @click="stopLocalization" :loading="locLoading">
              停止定位
            </el-button>
          </div>
        </div>

        <el-divider />

        <!-- 充电控制 -->
        <div class="panel-section">
          <h3 class="section-title">充电控制</h3>
          <div class="charge-buttons">
            <el-button 
              type="success" 
              @click="startCharging"
              :disabled="status.flags?.is_charging"
              :loading="chargeLoading.start"
            >
              <SvgIcon name="lightning" :size="16" />
              开始充电
            </el-button>
            <el-button 
              type="warning" 
              @click="stopCharging"
              :disabled="!status.flags?.is_charging"
              :loading="chargeLoading.stop"
            >
              <SvgIcon name="power-off" :size="16" />
              停止充电
            </el-button>
          </div>
        </div>
      </div>

      <!-- 右侧：导航 & 手动控制 -->
      <div class="right-panel">
        <!-- 站点导航 -->
        <div class="panel-section">
          <h3 class="section-title">
            <SvgIcon name="navigate-target" :size="16" />
            站点导航
          </h3>
          
          <!-- 搜索框 -->
          <div class="station-search">
            <el-input 
              v-model="stationSearchText" 
              placeholder="搜索站点名称或ID..." 
              size="small"
              clearable
            >
              <template #prefix>
                <SvgIcon name="search" :size="16" />
              </template>
            </el-input>
          </div>
          
          <!-- 站点列表 -->
          <div class="station-list-compact">
            <div 
              v-for="station in filteredStations" 
              :key="station.id"
              class="station-item-compact"
              :class="{ selected: selectedStationId === station.id }"
              @click="selectedStationId = station.id"
            >
              <SvgIcon name="locationfilled" :size="14" />
              <span class="station-name">{{ station.name }}</span>
              <span class="station-coord">({{ station.x.toFixed(1) }}, {{ station.y.toFixed(1) }})</span>
            </div>
            <div v-if="filteredStations.length === 0" class="station-empty">
              <span>{{ stationSearchText ? '未找到匹配的站点' : '暂无站点数据' }}</span>
            </div>
          </div>
          
          <!-- 导航按钮 -->
          <el-button 
            type="primary" 
            style="width: 100%; margin-top: 8px"
            :disabled="!selectedStationId"
            :loading="stationNavLoading"
            @click="navigateToSelectedStation"
          >
            <SvgIcon name="navigate-target" :size="16" />
            导航到站点
          </el-button>
        </div>

        <el-divider />

        <!-- 导航参数 -->
        <div class="panel-section">
          <h3 class="section-title">导航参数</h3>
          <div class="nav-params-compact">
            <div class="param-item-compact">
              <span class="param-label">速度</span>
              <el-slider 
                v-model="navParams.speedLevel" 
                :min="1" 
                :max="100" 
                :step="1"
                size="small"
                @change="setSpeedLevel"
              />
              <span class="param-value">{{ navParams.speedLevel }}</span>
            </div>
            <div class="param-item-compact">
              <span class="param-label">音量</span>
              <el-slider 
                v-model="navParams.volume" 
                :min="0" 
                :max="100" 
                :step="1"
                size="small"
                @change="setVolume"
              />
              <span class="param-value">{{ navParams.volume }}</span>
            </div>
          </div>
          
          <!-- 地图信息 -->
          <div class="map-info-compact">
            <span class="map-label">地图:</span>
            <strong class="map-name">{{ status.current_map_name || '未知' }}</strong>
            <el-button 
              type="success" 
              size="small" 
              :loading="syncMapsLoading"
              @click="syncMaps"
            >
              <SvgIcon name="refresh" :size="14" />
            </el-button>
          </div>
        </div>

        <el-divider />

        <!-- 手动控制 -->
        <div class="panel-section">
          <h3 class="section-title">
            <SvgIcon name="manual-mode" :size="16" />
            手动控制 (速度模式)
          </h3>
          
          <div class="manual-toggle">
            <el-switch 
              v-model="manualMode" 
              active-text="启用手动控制" 
              inactive-text="自动控制"
              active-color="#e6a23c"
              @change="toggleManualMode"
            />
          </div>

          <!-- 速度设置 -->
          <div class="speed-controls" v-if="manualMode">
            <div class="speed-item">
              <span class="speed-label">线速度</span>
              <el-slider 
                v-model="manualSpeeds.linear" 
                :min="0" 
                :max="1.5" 
                :step="0.1"
                size="small"
              />
              <span class="speed-value">{{ manualSpeeds.linear.toFixed(1) }} m/s</span>
            </div>
            <div class="speed-item">
              <span class="speed-label">角速度</span>
              <el-slider 
                v-model="manualSpeeds.angular" 
                :min="0" 
                :max="1.5" 
                :step="0.1"
                size="small"
              />
              <span class="speed-value">{{ manualSpeeds.angular.toFixed(1) }} rad/s</span>
            </div>
          </div>

          <!-- 键盘提示 -->
          <div class="keyboard-hint" v-if="manualMode">
            <el-tag type="info" size="small">
              W/S/↑/↓: 前进/后退 | A/D/←/→: 左转/右转
            </el-tag>
          </div>

          <!-- 方向按钮 -->
          <div class="manual-control-grid" v-if="manualMode">
            <div class="direction-pad">
              <div class="pad-row">
                <div class="pad-empty"></div>
                <el-button
                  class="direction-btn"
                  :type="keyStates.forward ? 'primary' : ''"
                  @mousedown="startManualMove('forward')"
                  @mouseup="stopManualMove('forward')"
                  @mouseleave="stopManualMove('forward')"
                  @touchstart.prevent="startManualMove('forward')"
                  @touchend="stopManualMove('forward')"
                  @touchcancel="stopManualMove('forward')"
                >
                  <SvgIcon name="arrowup" :size="16" />
                  <span class="key-hint">W</span>
                </el-button>
                <div class="pad-empty"></div>
              </div>
              <div class="pad-row">
                <el-button
                  class="direction-btn"
                  :type="keyStates.left ? 'primary' : ''"
                  @mousedown="startManualMove('left')"
                  @mouseup="stopManualMove('left')"
                  @mouseleave="stopManualMove('left')"
                  @touchstart.prevent="startManualMove('left')"
                  @touchend="stopManualMove('left')"
                  @touchcancel="stopManualMove('left')"
                >
                  <SvgIcon name="refreshleft" :size="16" />
                  <span class="key-hint">A</span>
                </el-button>
                <el-button
                  class="direction-btn"
                  :type="keyStates.backward ? 'primary' : ''"
                  @mousedown="startManualMove('backward')"
                  @mouseup="stopManualMove('backward')"
                  @mouseleave="stopManualMove('backward')"
                  @touchstart.prevent="startManualMove('backward')"
                  @touchend="stopManualMove('backward')"
                  @touchcancel="stopManualMove('backward')"
                >
                  <SvgIcon name="arrowdown" :size="16" />
                  <span class="key-hint">S</span>
                </el-button>
                <el-button
                  class="direction-btn"
                  :type="keyStates.right ? 'primary' : ''"
                  @mousedown="startManualMove('right')"
                  @mouseup="stopManualMove('right')"
                  @mouseleave="stopManualMove('right')"
                  @touchstart.prevent="startManualMove('right')"
                  @touchend="stopManualMove('right')"
                  @touchcancel="stopManualMove('right')"
                >
                  <SvgIcon name="refreshright" :size="16" />
                  <span class="key-hint">D</span>
                </el-button>
              </div>
            </div>
          </div>

          <!-- 紧急停止按钮 -->
          <el-button 
            v-if="manualMode"
            type="danger" 
            size="large" 
            style="width: 100%; margin-top: 8px" 
            @click="stopChassis"
          >
            <SvgIcon name="emergency-stop" :size="16" />
            紧急停止
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import SvgIcon from '@/components/SvgIcon.vue'
import { chassisApi } from '@/api/chassis'

// ==================== 类型定义 ====================
interface ChassisStatus {
  system_status?: number
  system_status_text?: string
  location_status?: number
  location_status_text?: string
  motion_status?: number
  motion_status_text?: string
  pose?: {
    x?: number
    y?: number
    yaw?: number
    confidence?: number
  }
  velocity?: {
    linear_x?: number
    angular_z?: number
  }
  battery?: {
    percentage?: number
    voltage?: number
    current?: number
    status?: number
    status_text?: string
  }
  flags?: {
    is_emergency_stopped?: boolean
    is_brake_released?: boolean
    is_charging?: boolean
    is_auto_mode?: boolean
    is_loaded?: boolean
    has_wifi?: boolean
    obstacle_slowdown?: boolean
    obstacle_paused?: boolean
  }
  current_map_name?: string
}

interface Station {
  id: number
  name: string
  x: number
  y: number
  yaw: number
}

// ==================== 响应式数据 ====================
const status = ref<ChassisStatus>({})
const stations = ref<Station[]>([])
const selectedStationId = ref<number | null>(null)
const stationSearchText = ref('')

// 导航参数
const navParams = reactive({
  speedLevel: 50,
  volume: 50
})

// 手动控制
const manualMode = ref(false)
const manualSpeeds = reactive({
  linear: 0.5,
  angular: 0.8
})

// 加载状态
const systemLoading = ref(false)
const locLoading = ref(false)
const stationNavLoading = ref(false)
const syncMapsLoading = ref(false)
const chargeLoading = reactive({
  start: false,
  stop: false
})

// 键盘控制状态
const keyStates = reactive({
  forward: false,
  backward: false,
  left: false,
  right: false
})

// 手动控制循环
let manualControlInterval: number | null = null
const lastManualCommand = reactive({
  linear: 0,
  angular: 0
})

// ==================== 计算属性 ====================
const filteredStations = computed(() => {
  if (!stationSearchText.value) return stations.value
  const search = stationSearchText.value.toLowerCase()
  return stations.value.filter(s => 
    s.name.toLowerCase().includes(search) || 
    s.id.toString().includes(search)
  )
})

// ==================== 状态样式辅助函数 ====================
function getStatusType(status?: number): string {
  switch (status) {
    case 0: return 'danger'
    case 1: return 'warning'
    case 2: return 'success'
    default: return 'info'
  }
}

function getLocationStatusType(status?: number): string {
  switch (status) {
    case 0: return 'danger'
    case 1: return 'warning'
    case 2: return 'success'
    default: return 'info'
  }
}

function getBatteryClass(percentage?: number): string {
  if (!percentage) return 'low'
  if (percentage < 20) return 'low'
  if (percentage < 50) return 'medium'
  return 'high'
}

// ==================== 紧急控制 ====================
async function emergencyStop() {
  try {
    await chassisApi.emergencyStop()
    ElMessage.success('急停已触发')
  } catch (e: any) {
    ElMessage.error(e.message || '急停失败')
  }
}

async function releaseEmergencyStop() {
  try {
    await chassisApi.releaseEmergencyStop()
    ElMessage.success('急停已解除')
  } catch (e: any) {
    ElMessage.error(e.message || '解除急停失败')
  }
}

// ==================== 系统控制 ====================
async function systemReset() {
  systemLoading.value = true
  try {
    await chassisApi.systemReset()
    ElMessage.success('系统复位成功')
  } catch (e: any) {
    ElMessage.error(e.message || '系统复位失败')
  } finally {
    systemLoading.value = false
  }
}

async function stopLocalization() {
  locLoading.value = true
  try {
    await chassisApi.stopLocalization()
    ElMessage.success('定位已停止')
  } catch (e: any) {
    ElMessage.error(e.message || '停止定位失败')
  } finally {
    locLoading.value = false
  }
}

// ==================== 充电控制 ====================
async function startCharging() {
  chargeLoading.start = true
  try {
    await chassisApi.startCharging()
    ElMessage.success('开始充电')
  } catch (e: any) {
    ElMessage.error(e.message || '开始充电失败')
  } finally {
    chargeLoading.start = false
  }
}

async function stopCharging() {
  chargeLoading.stop = true
  try {
    await chassisApi.stopCharging()
    ElMessage.success('停止充电')
  } catch (e: any) {
    ElMessage.error(e.message || '停止充电失败')
  } finally {
    chargeLoading.stop = false
  }
}

// ==================== 站点导航 ====================
async function navigateToSelectedStation() {
  if (!selectedStationId.value) return
  
  const station = stations.value.find(s => s.id === selectedStationId.value)
  if (!station) return

  stationNavLoading.value = true
  try {
    await chassisApi.navigateToStation(station.id)
    ElMessage.success(`正在导航到站点: ${station.name}`)
  } catch (e: any) {
    ElMessage.error(e.message || '导航失败')
  } finally {
    stationNavLoading.value = false
  }
}

// ==================== 导航参数设置 ====================
async function setSpeedLevel(value: number) {
  try {
    const result = await chassisApi.setSpeedLevel({ level: value })
    if (result?.success !== false) {
      ElMessage.success(`速度级别已设置为 ${value}`)
    }
  } catch (e: any) {
    console.error('设置速度失败:', e)
    ElMessage.error(e.response?.data?.detail || e.message || '设置速度失败')
  }
}

async function setVolume(value: number) {
  try {
    const result = await chassisApi.setVolume({ volume: value })
    if (result?.success !== false) {
      ElMessage.success(`音量已设置为 ${value}`)
    }
  } catch (e: any) {
    console.error('设置音量失败:', e)
    ElMessage.error(e.response?.data?.detail || e.message || '设置音量失败')
  }
}

// ==================== 地图管理 ====================
async function syncMaps() {
  syncMapsLoading.value = true
  try {
    await chassisApi.syncMaps()
    await loadStations()
    ElMessage.success('地图刷新成功')
  } catch (e: any) {
    ElMessage.error(e.message || '刷新地图失败')
  } finally {
    syncMapsLoading.value = false
  }
}

async function loadStations() {
  try {
    const response = await chassisApi.getStations()
    stations.value = response.stations || []
  } catch (e) {
    console.error('加载站点失败', e)
  }
}

// ==================== 手动控制 ====================
async function toggleManualMode(enabled: boolean) {
  try {
    if (enabled) {
      // 切换到速度模式
      await chassisApi.setControlMode(0) // 0 = 速度模式
      ElMessage.success('已启用手动控制（速度模式）')
      // 开始监听键盘
      window.addEventListener('keydown', handleKeyDown)
      window.addEventListener('keyup', handleKeyUp)
      startManualLoop()
    } else {
      // 停止手动控制
      await chassisApi.setControlMode(1) // 1 = 自动模式
      ElMessage.success('已切换到自动控制')
      // 停止监听键盘
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      stopManualLoop()
      // 停止机器人
      stopChassis()
    }
  } catch (e: any) {
    ElMessage.error(e.message || '切换控制模式失败')
    manualMode.value = !enabled
  }
}

function handleKeyDown(event: KeyboardEvent) {
  if (!manualMode.value) return
  if (event.repeat) return

  if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(event.key.toLowerCase())) {
    event.preventDefault()
  }

  switch (event.key.toLowerCase()) {
    case 'w':
    case 'arrowup':
      keyStates.forward = true
      break
    case 's':
    case 'arrowdown':
      keyStates.backward = true
      break
    case 'a':
    case 'arrowleft':
      keyStates.left = true
      break
    case 'd':
    case 'arrowright':
      keyStates.right = true
      break
  }
  
  updateManualControl()
}

function handleKeyUp(event: KeyboardEvent) {
  if (!manualMode.value) return

  if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(event.key.toLowerCase())) {
    event.preventDefault()
  }

  switch (event.key.toLowerCase()) {
    case 'w':
    case 'arrowup':
      keyStates.forward = false
      break
    case 's':
    case 'arrowdown':
      keyStates.backward = false
      break
    case 'a':
    case 'arrowleft':
      keyStates.left = false
      break
    case 'd':
    case 'arrowright':
      keyStates.right = false
      break
  }
  
  updateManualControl()
}

function startManualLoop() {
  if (manualControlInterval) return
  manualControlInterval = window.setInterval(() => {
    updateManualControl()
  }, 100)
}

function stopManualLoop() {
  if (manualControlInterval) {
    clearInterval(manualControlInterval)
    manualControlInterval = null
  }
  lastManualCommand.linear = 0
  lastManualCommand.angular = 0
}

function startManualMove(direction: keyof typeof keyStates) {
  if (!manualMode.value) {
    ElMessage.warning('请先启用手动控制模式')
    return
  }
  keyStates[direction] = true
  updateManualControl()
}

function stopManualMove(direction: keyof typeof keyStates) {
  keyStates[direction] = false
  updateManualControl()
}

async function updateManualControl() {
  let linear = 0
  let angular = 0

  if (keyStates.forward) linear += manualSpeeds.linear
  if (keyStates.backward) linear -= manualSpeeds.linear
  if (keyStates.left) angular += manualSpeeds.angular
  if (keyStates.right) angular -= manualSpeeds.angular

  const moving = linear !== 0 || angular !== 0
  const changed = linear !== lastManualCommand.linear || angular !== lastManualCommand.angular

  if (!moving && !changed) return

  try {
    await chassisApi.moveBySpeed(linear, angular)
    lastManualCommand.linear = linear
    lastManualCommand.angular = angular
  } catch (e: any) {
    console.error('手动控制失败', e)
  }
}

async function stopChassis() {
  keyStates.forward = false
  keyStates.backward = false
  keyStates.left = false
  keyStates.right = false
  try {
    await chassisApi.moveBySpeed(0, 0)
    ElMessage.success('已停止')
  } catch (e: any) {
    ElMessage.error(e.message || '停止失败')
  }
}

// ==================== 数据轮询 ====================
let statusInterval: number | null = null

async function loadStatus() {
  try {
    const response = await chassisApi.getStatus()
    status.value = response || {}
  } catch (e) {
    console.error('加载状态失败', e)
  }
}

// ==================== 生命周期 ====================
onMounted(() => {
  loadStatus()
  loadStations()
  statusInterval = window.setInterval(loadStatus, 1000)
})

onUnmounted(() => {
  if (statusInterval) {
    clearInterval(statusInterval)
  }
  if (manualMode.value) {
    window.removeEventListener('keydown', handleKeyDown)
    window.removeEventListener('keyup', handleKeyUp)
  }
  stopManualLoop()
})
</script>

<style scoped>
.chassis-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
  overflow-y: auto;
  background-color: var(--color-bg-primary, #1a1a1a);
  color: var(--color-text-primary, #e0e0e0);
}

/* 顶部状态栏 */
.status-bar {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: var(--color-surface, linear-gradient(135deg, #2c2c2c 0%, #1e1e1e 100%));
  border-radius: 8px;
  border: 1px solid var(--color-border, #3c3c3c);
  flex-wrap: wrap;
}

.status-group {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-item.compact {
  gap: 4px;
}

.status-label {
  font-size: 13px;
  color: var(--color-text-muted, #888);
  font-weight: 500;
}

.status-value {
  font-size: 13px;
  color: var(--color-text-primary, #e0e0e0);
  font-family: 'Consolas', monospace;
}

/* 电池状态 */
.battery-compact {
  display: flex;
  align-items: center;
  gap: 8px;
}

.battery-mini-bar {
  width: 80px;
  height: 24px;
  background-color: var(--color-bg-tertiary, #2c2c2c);
  border-radius: 4px;
  border: 1px solid var(--color-border, #3c3c3c);
  overflow: hidden;
  position: relative;
}

.battery-mini-fill {
  height: 100%;
  background: linear-gradient(90deg, #67c23a 0%, #85ce61 100%);
  transition: width 0.3s;
}

.battery-text {
  font-size: 13px;
  font-weight: 600;
  font-family: 'Consolas', monospace;
}

.battery-text.low {
  color: #f56c6c;
}

.battery-text.medium {
  color: #e6a23c;
}

.battery-text.high {
  color: #67c23a;
}

.battery-voltage {
  font-size: 12px;
  color: var(--color-text-muted, #888);
  font-family: 'Consolas', monospace;
}

/* 主控制区域 */
.control-area {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 12px;
}

.left-panel,
.right-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 面板区块 */
.panel-section {
  background-color: var(--color-bg-secondary, #252526);
  padding: 18px;
  border-radius: 8px;
  border: 1px solid var(--color-border, #3c3c3c);
}

.section-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-primary, #e0e0e0);
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.danger-section {
  border-color: #f56c6c;
  background: linear-gradient(135deg, rgba(245, 108, 108, 0.1) 0%, rgba(245, 108, 108, 0.05) 100%);
}

.danger-title {
  color: #f56c6c;
}

/* 紧急按钮 */
.emergency-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

/* 状态标志 */
.flags-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.flag-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 10px;
  background-color: var(--color-bg-secondary, #1e1e1e);
  border-radius: 6px;
  border: 1px solid var(--color-border, #3c3c3c);
  color: var(--color-text-muted, #666);
  font-size: 12px;
  transition: all 0.3s;
}

.flag-item.active {
  color: #67c23a;
  border-color: #67c23a;
  background-color: rgba(103, 194, 58, 0.1);
}

.flag-item.warning {
  color: #e6a23c;
  border-color: #e6a23c;
  background-color: rgba(230, 162, 60, 0.1);
}

.flag-item.danger {
  color: #f56c6c;
  border-color: #f56c6c;
  background-color: rgba(245, 108, 108, 0.1);
}

.flag-item.charging {
  color: #409eff;
  border-color: #409eff;
  background-color: rgba(64, 158, 255, 0.1);
}

.flag-item.wifi {
  color: #409eff;
  border-color: #409eff;
  background-color: rgba(64, 158, 255, 0.1);
}

/* 系统按钮 */
.system-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

/* 充电按钮 */
.charge-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

/* 站点导航 */
.station-search {
  margin-bottom: 8px;
}

.station-list-compact {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid var(--color-border, #3c3c3c);
  border-radius: 6px;
  background-color: var(--color-bg-secondary, #1e1e1e);
}

.station-item-compact {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  cursor: pointer;
  border-bottom: 1px solid var(--color-bg-tertiary, #2c2c2c);
  transition: all 0.2s;
  font-size: 13px;
}

.station-item-compact:last-child {
  border-bottom: none;
}

.station-item-compact:hover {
  background-color: var(--color-surface-hover, #2a2d2e);
}

.station-item-compact.selected {
  background-color: rgba(64, 158, 255, 0.15);
  border-left: 3px solid #409eff;
}

.station-name {
  flex: 1;
  color: var(--color-text-primary, #e0e0e0);
  font-weight: 500;
}

.station-coord {
  color: var(--color-text-muted, #888);
  font-size: 11px;
  font-family: 'Consolas', monospace;
}

.station-empty {
  padding: 28px;
  text-align: center;
  color: var(--color-text-muted, #666);
  font-size: 13px;
}

/* 导航参数 */
.nav-params-compact {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 12px;
}

.param-item-compact {
  display: grid;
  grid-template-columns: 50px 1fr 40px;
  align-items: center;
  gap: 8px;
}

.param-label {
  font-size: 13px;
  color: var(--color-text-muted, #888);
}

.param-value {
  font-size: 13px;
  color: var(--color-text-primary, #e0e0e0);
  text-align: right;
  font-family: 'Consolas', monospace;
}

/* 地图信息 */
.map-info-compact {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  background-color: var(--color-bg-secondary, #1e1e1e);
  border-radius: 6px;
  border: 1px solid var(--color-border, #3c3c3c);
}

.map-label {
  font-size: 13px;
  color: var(--color-text-muted, #888);
}

.map-name {
  flex: 1;
  font-size: 13px;
  color: #409eff;
}

/* 手动控制 */
.manual-toggle {
  margin-bottom: 12px;
}

.speed-controls {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
}

.speed-item {
  display: grid;
  grid-template-columns: 60px 1fr 70px;
  align-items: center;
  gap: 8px;
}

.speed-label {
  font-size: 13px;
  color: #888;
}

.speed-value {
  font-size: 13px;
  color: #e0e0e0;
  text-align: right;
  font-family: 'Consolas', monospace;
}

.keyboard-hint {
  margin-top: 12px;
}

/* 手动控制方向按钮 */
.manual-control-grid {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.direction-pad {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.pad-row {
  display: flex;
  gap: 6px;
  justify-content: center;
}

.pad-empty {
  width: 70px;
  height: 70px;
}

.direction-btn {
  width: 70px;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  font-size: 11px;
}

/* 滚动条样式 */
.chassis-panel::-webkit-scrollbar,
.station-list-compact::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.chassis-panel::-webkit-scrollbar-thumb,
.station-list-compact::-webkit-scrollbar-thumb {
  background-color: #555;
  border-radius: 3px;
}

.chassis-panel::-webkit-scrollbar-track,
.station-list-compact::-webkit-scrollbar-track {
  background-color: var(--color-bg-tertiary, #2c2c2c);
}

/* 响应式布局 */
@media (max-width: 1200px) {
  .control-area {
    grid-template-columns: 1fr;
  }
  
  .flags-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .status-bar {
    flex-direction: column;
  }
  
  .flags-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .emergency-buttons {
    grid-template-columns: 1fr;
  }
}
</style>
