<template>
  <div class="data-collection-panel">
    <!-- 相机视图区域 -->
    <div class="panel-section">
      <h3 class="section-title">相机视图</h3>
      <div class="camera-grid">
        <div class="camera-wrapper left">
          <CameraView 
            title="左手相机" 
            camera-id="left_hand" 
            :enabled="true"
          />
        </div>
        <div class="camera-wrapper center">
          <CameraView 
            title="主相机（头部）" 
            camera-id="head" 
            :enabled="true"
          />
        </div>
        <div class="camera-wrapper right">
          <CameraView 
            title="右手相机" 
            camera-id="right_hand" 
            :enabled="true"
          />
        </div>
      </div>
    </div>

    <el-divider />

    <!-- 采集状态 -->
    <div class="panel-section">
      <h3 class="section-title">采集状态</h3>
      <div class="collection-status">
        <div class="status-badge" :class="collectionState">
          <el-icon v-if="collectionState === 'idle'"><VideoCamera /></el-icon>
          <el-icon v-else-if="collectionState === 'initializing'" class="rotating"><Loading /></el-icon>
          <el-icon v-else-if="collectionState === 'ready'"><CircleCheckFilled /></el-icon>
          <el-icon v-else-if="collectionState === 'recording'" class="recording-icon"><VideoCameraFilled /></el-icon>
          <el-icon v-else-if="collectionState === 'stopped'"><VideoPause /></el-icon>
          <span>{{ stateText }}</span>
        </div>
        <div v-if="collectionState === 'recording'" class="recording-info">
          <span class="recording-time">{{ formatDuration(recordingDuration) }}</span>
          <span class="recording-action">{{ currentActionName }}</span>
        </div>
      </div>
    </div>

    <el-divider />

    <!-- 设备状态检查 - 紧凑网格布局 -->
    <div class="panel-section">
      <h3 class="section-title">设备状态</h3>
      <div class="device-grid">
        <div class="device-tag" :class="globalArmStatusInfo.type">
          <el-icon><Cpu /></el-icon>
          <span>双臂</span>
          <span class="status-text">{{ globalArmStatusInfo.text }}</span>
        </div>
        <div class="device-tag" :class="globalGripperStatusInfo.type">
          <el-icon><Scissor /></el-icon>
          <span>夹爪</span>
          <span class="status-text">{{ globalGripperStatusInfo.text }}</span>
        </div>
        <div class="device-tag" :class="globalHeadStatusInfo.type">
          <el-icon><Camera /></el-icon>
          <span>头部</span>
          <span class="status-text">{{ globalHeadStatusInfo.text }}</span>
        </div>
        <div class="device-tag" :class="globalLiftStatusInfo.type">
          <el-icon><DCaret /></el-icon>
          <span>升降</span>
          <span class="status-text">{{ globalLiftStatusInfo.text }}</span>
        </div>
        <div class="device-tag" :class="globalChassisStatusInfo.type">
          <el-icon><Van /></el-icon>
          <span>底盘</span>
          <span class="status-text">{{ globalChassisStatusInfo.text }}</span>
        </div>
        <div class="device-tag" :class="globalVrStatusInfo.type">
          <el-icon><View /></el-icon>
          <span>VR</span>
          <span class="status-text">{{ globalVrStatusInfo.text }}</span>
        </div>
      </div>
    </div>

    <el-divider />

    <!-- 控制按钮 -->
    <div class="panel-section">
      <h3 class="section-title">采集控制</h3>
      <div class="control-buttons">
        <!-- 初始化按钮 -->
        <el-button 
          v-if="collectionState === 'idle'"
          type="primary" 
          size="large"
          :loading="initLoading"
          @click="initializeDevices"
          class="control-btn"
        >
          <el-icon><Setting /></el-icon>
          初始化设备
        </el-button>

        <!-- 开始采集按钮 -->
        <el-button 
          v-if="collectionState === 'ready'"
          type="success" 
          size="large"
          @click="showStartDialog"
          class="control-btn"
        >
          <el-icon><VideoPlay /></el-icon>
          开始采集
        </el-button>

        <!-- 录制中的控制 -->
        <template v-if="collectionState === 'recording'">
          <el-button 
            type="danger" 
            size="large"
            @click="stopRecording"
            class="control-btn"
          >
            <el-icon><VideoPause /></el-icon>
            停止采集
          </el-button>
        </template>

        <!-- 停止后的控制 -->
        <template v-if="collectionState === 'stopped'">
          <el-button 
            type="success" 
            size="large"
            :loading="saveLoading"
            @click="saveAndUpload"
            class="control-btn"
          >
            <el-icon><Upload /></el-icon>
            保存上传
          </el-button>
          <el-button 
            type="danger" 
            size="large"
            @click="discardRecording"
            class="control-btn"
          >
            <el-icon><Delete /></el-icon>
            丢弃数据
          </el-button>
        </template>

        <!-- 重新初始化按钮（非 idle 状态可见） -->
        <el-button 
          v-if="collectionState !== 'idle' && collectionState !== 'recording'"
          type="warning" 
          size="large"
          @click="resetToIdle"
          class="control-btn secondary"
        >
          <el-icon><RefreshRight /></el-icon>
          重新初始化
        </el-button>
      </div>
    </div>

    <el-divider />

    <!-- 初始化日志 -->
    <div class="panel-section">
      <h3 class="section-title">操作日志</h3>
      <div class="log-container" ref="logContainer">
        <div 
          v-for="(log, index) in logs" 
          :key="index" 
          class="log-item"
          :class="log.type"
        >
          <span class="log-time">{{ log.time }}</span>
          <span class="log-message">{{ log.message }}</span>
        </div>
        <div v-if="logs.length === 0" class="log-empty">
          暂无日志
        </div>
      </div>
    </div>

    <!-- 开始采集对话框 -->
    <el-dialog 
      v-model="startDialogVisible" 
      title="开始数据采集"
      width="500px"
      :close-on-click-modal="false"
    >
      <el-form :model="recordingForm" label-width="80px">
        <el-form-item label="动作名称">
          <el-select 
            v-model="recordingForm.actionName" 
            filterable 
            allow-create
            default-first-option
            placeholder="选择或输入动作名称"
            style="width: 100%"
          >
            <el-option 
              v-for="action in predefinedActions" 
              :key="action" 
              :label="action" 
              :value="action" 
            />
          </el-select>
        </el-form-item>
        <el-form-item label="录制话题">
          <el-select 
            v-model="recordingForm.topics" 
            multiple 
            filterable
            placeholder="选择要录制的话题"
            style="width: 100%"
          >
            <el-option 
              v-for="topic in availableTopics" 
              :key="topic" 
              :label="topic" 
              :value="topic" 
            />
          </el-select>
          <div class="topic-hint">
            <el-button link type="primary" size="small" @click="selectAllTopics">全选</el-button>
            <el-button link type="primary" size="small" @click="selectDefaultTopics">默认</el-button>
            <el-button link size="small" @click="recordingForm.topics = []">清空</el-button>
          </div>
        </el-form-item>
        <el-form-item label="备注">
          <el-input 
            v-model="recordingForm.note" 
            type="textarea" 
            :rows="2"
            placeholder="可选备注信息"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="startDialogVisible = false">取消</el-button>
        <el-button 
          type="primary" 
          :disabled="!recordingForm.actionName || recordingForm.topics.length === 0"
          :loading="startLoading"
          @click="startRecording"
        >
          开始录制
        </el-button>
      </template>
    </el-dialog>

    <!-- 丢弃确认对话框 -->
    <el-dialog 
      v-model="discardDialogVisible" 
      title="确认丢弃"
      width="350px"
    >
      <p>确定要丢弃本次采集的数据吗？此操作不可恢复。</p>
      <template #footer>
        <el-button @click="discardDialogVisible = false">取消</el-button>
        <el-button type="danger" @click="confirmDiscard">确认丢弃</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { 
  VideoCamera, VideoCameraFilled, VideoPause, VideoPlay,
  CircleCheckFilled, CircleCloseFilled, MoreFilled, Loading,
  Cpu, Scissor, Camera, DCaret, Van, View, Setting,
  Upload, Delete, RefreshRight
} from '@element-plus/icons-vue'
import axios from 'axios'
import CameraView from '@/components/CameraView.vue'
import { useLayoutStore } from '@/stores/layout'

const layoutStore = useLayoutStore()

// 从 layoutStore 获取全局设备状态
const globalArmStatusInfo = computed(() => layoutStore.armStatusInfo)
const globalGripperStatusInfo = computed(() => layoutStore.gripperStatusInfo)
const globalHeadStatusInfo = computed(() => layoutStore.headStatusInfo)
const globalLiftStatusInfo = computed(() => layoutStore.liftStatusInfo)
const globalChassisStatusInfo = computed(() => layoutStore.chassisStatusInfo)
const globalVrStatusInfo = computed(() => layoutStore.vrStatusInfo)

// 采集状态
type CollectionState = 'idle' | 'initializing' | 'ready' | 'recording' | 'stopped'
const collectionState = ref<CollectionState>('idle')

const stateText = computed(() => {
  switch (collectionState.value) {
    case 'idle': return '等待初始化'
    case 'initializing': return '初始化中...'
    case 'ready': return '准备就绪'
    case 'recording': return '录制中'
    case 'stopped': return '录制已停止'
    default: return '未知状态'
  }
})

// 设备状态
const deviceStatus = reactive({
  arm: { ready: false, error: false, text: '未检查' },
  gripper: { ready: false, error: false, text: '未检查' },
  head: { ready: false, error: false, text: '未检查' },
  lift: { ready: false, error: false, text: '未检查' },
  chassis: { ready: false, error: false, text: '未检查' },
  vr: { ready: false, error: false, text: '未检查' }
})

// 加载状态
const initLoading = ref(false)
const startLoading = ref(false)
const saveLoading = ref(false)

// 录制相关
const currentActionName = ref('')
const currentBagPath = ref('')
const recordingDuration = ref(0)
let recordingTimer: number | null = null

// 日志
const logs = ref<Array<{ time: string; message: string; type: 'info' | 'success' | 'warning' | 'error' }>>([])
const logContainer = ref<HTMLElement | null>(null)

// 对话框
const startDialogVisible = ref(false)
const discardDialogVisible = ref(false)

const recordingForm = reactive({
  actionName: '',
  note: '',
  topics: [] as string[]
})

// 可用话题列表
const availableTopics = ref<string[]>([])

// 默认录制话题
const defaultRecordingTopics = [
  '/joint_states',
  '/tf',
  '/tf_static',
  '/left_arm/joint_states',
  '/right_arm/joint_states',
  '/left_gripper/state',
  '/right_gripper/state',
  '/head/joint_states',
  '/lift/state',
  '/chassis/odom'
]

// 预定义动作
const predefinedActions = [
  '拿取杯子',
  '放置杯子',
  '开门',
  '关门',
  '拿取物品',
  '放置物品',
  '按按钮',
  '拉抽屉',
  '推抽屉',
  '擦桌子',
  '整理物品',
  '其他'
]

// 工具函数
function getAuthHeaders() {
  const token = localStorage.getItem('token')
  return {
    headers: { 'Authorization': `Bearer ${token}` }
  }
}

function addLog(message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') {
  const now = new Date()
  const time = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  logs.value.push({ time, message, type })
  // 滚动到底部
  nextTick(() => {
    if (logContainer.value) {
      logContainer.value.scrollTop = logContainer.value.scrollHeight
    }
  })
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// 设备初始化 - 执行所有初始化动作
async function initializeDevices() {
  initLoading.value = true
  collectionState.value = 'initializing'
  
  // 重置设备状态
  Object.keys(deviceStatus).forEach(key => {
    const k = key as keyof typeof deviceStatus
    deviceStatus[k] = { ready: false, error: false, text: '等待中...' }
  })
  
  addLog('========== 开始初始化所有设备 ==========', 'info')
  
  let allSuccess = true
  
  // 1. 初始化双臂（连接 -> 上电 -> 使能 -> 伺服模式）
  const armOk = await initArm()
  if (!armOk) allSuccess = false
  
  // 2. 初始化夹爪（使能）
  const gripperOk = await initGripper()
  if (!gripperOk) allSuccess = false
  
  // 3. 初始化头部（使能）
  const headOk = await initHead()
  if (!headOk) allSuccess = false
  
  // 4. 初始化升降（使能）
  const liftOk = await initLift()
  if (!liftOk) allSuccess = false
  
  // 5. 初始化底盘（手动速度模式）
  const chassisOk = await initChassis()
  if (!chassisOk) allSuccess = false
  
  // 6. 检查 VR 连接
  const vrOk = await checkVR()
  if (!vrOk) allSuccess = false
  
  addLog('==========================================', 'info')
  
  if (allSuccess) {
    collectionState.value = 'ready'
    addLog('✓ 所有设备初始化成功！可以开始采集', 'success')
    ElMessage.success('设备初始化成功，可以开始采集')
  } else {
    collectionState.value = 'idle'
    addLog('✗ 部分设备初始化失败，请检查后重试', 'error')
    ElMessage.error('设备初始化失败，请查看日志')
  }
  
  initLoading.value = false
}

// 初始化双臂：连接 -> 上电 -> 使能 -> 伺服模式
async function initArm(): Promise<boolean> {
  deviceStatus.arm = { ready: false, error: false, text: '初始化中...' }
  addLog('[双臂] 开始初始化...', 'info')
  
  try {
    // Step 1: 连接
    addLog('[双臂] 执行连接...', 'info')
    try {
      await axios.post('/api/v1/arm/connect', {}, getAuthHeaders())
      await delay(1500)
      addLog('[双臂] 连接成功', 'success')
    } catch (e: any) {
      // 可能已经连接，继续
      addLog('[双臂] 连接请求完成（可能已连接）', 'info')
    }
    
    // Step 2: 上电
    addLog('[双臂] 执行上电...', 'info')
    try {
      await axios.post('/api/v1/arm/power_on', {}, getAuthHeaders())
      await delay(2000)
      addLog('[双臂] 上电成功', 'success')
    } catch (e: any) {
      addLog('[双臂] 上电请求完成（可能已上电）', 'info')
    }
    
    // Step 3: 使能
    addLog('[双臂] 执行使能...', 'info')
    try {
      await axios.post('/api/v1/arm/enable', {}, getAuthHeaders())
      await delay(1000)
      addLog('[双臂] 使能成功', 'success')
    } catch (e: any) {
      addLog('[双臂] 使能请求完成（可能已使能）', 'info')
    }
    
    // Step 4: 开启伺服模式
    addLog('[双臂] 开启伺服模式...', 'info')
    await axios.post('/api/v1/arm/servo_mode', { enable: true }, getAuthHeaders())
    await delay(500)
    addLog('[双臂] 伺服模式已开启', 'success')
    
    // 最终确认状态
    const finalState = (await axios.get('/api/v1/arm/state', getAuthHeaders())).data
    if (finalState.connected && finalState.enabled && finalState.servo_mode) {
      deviceStatus.arm = { ready: true, error: false, text: '伺服中' }
      addLog('[双臂] ✓ 初始化完成', 'success')
      return true
    } else {
      throw new Error(`状态异常: connected=${finalState.connected}, enabled=${finalState.enabled}, servo=${finalState.servo_mode}`)
    }
  } catch (error: any) {
    const msg = error.response?.data?.detail || error.message || '未知错误'
    deviceStatus.arm = { ready: false, error: true, text: '初始化失败' }
    addLog(`[双臂] ✗ 初始化失败: ${msg}`, 'error')
    return false
  }
}

// 初始化夹爪：使能左右夹爪
async function initGripper(): Promise<boolean> {
  deviceStatus.gripper = { ready: false, error: false, text: '初始化中...' }
  addLog('[夹爪] 开始初始化...', 'info')
  
  try {
    // 使能左夹爪
    addLog('[夹爪] 使能左夹爪...', 'info')
    await axios.post('/api/v1/gripper/left/enable', {}, getAuthHeaders())
    await delay(500)
    
    // 使能右夹爪
    addLog('[夹爪] 使能右夹爪...', 'info')
    await axios.post('/api/v1/gripper/right/enable', {}, getAuthHeaders())
    await delay(500)
    
    deviceStatus.gripper = { ready: true, error: false, text: '已使能' }
    addLog('[夹爪] ✓ 初始化完成', 'success')
    return true
  } catch (error: any) {
    const msg = error.response?.data?.detail || error.message || '未知错误'
    deviceStatus.gripper = { ready: false, error: true, text: '初始化失败' }
    addLog(`[夹爪] ✗ 初始化失败: ${msg}`, 'error')
    return false
  }
}

// 初始化头部：使能
async function initHead(): Promise<boolean> {
  deviceStatus.head = { ready: false, error: false, text: '初始化中...' }
  addLog('[头部] 开始初始化...', 'info')
  
  try {
    addLog('[头部] 执行使能...', 'info')
    await axios.post('/api/v1/head/enable', {}, getAuthHeaders())
    await delay(500)
    
    deviceStatus.head = { ready: true, error: false, text: '已使能' }
    addLog('[头部] ✓ 初始化完成', 'success')
    return true
  } catch (error: any) {
    const msg = error.response?.data?.detail || error.message || '未知错误'
    deviceStatus.head = { ready: false, error: true, text: '初始化失败' }
    addLog(`[头部] ✗ 初始化失败: ${msg}`, 'error')
    return false
  }
}

// 初始化升降：使能
async function initLift(): Promise<boolean> {
  deviceStatus.lift = { ready: false, error: false, text: '初始化中...' }
  addLog('[升降] 开始初始化...', 'info')
  
  try {
    addLog('[升降] 执行使能...', 'info')
    await axios.post('/api/v1/lift/enable', {}, getAuthHeaders())
    await delay(500)
    
    deviceStatus.lift = { ready: true, error: false, text: '已使能' }
    addLog('[升降] ✓ 初始化完成', 'success')
    return true
  } catch (error: any) {
    const msg = error.response?.data?.detail || error.message || '未知错误'
    deviceStatus.lift = { ready: false, error: true, text: '初始化失败' }
    addLog(`[升降] ✗ 初始化失败: ${msg}`, 'error')
    return false
  }
}

// 初始化底盘：开启手动速度模式
async function initChassis(): Promise<boolean> {
  deviceStatus.chassis = { ready: false, error: false, text: '初始化中...' }
  addLog('[底盘] 开始初始化...', 'info')
  
  try {
    addLog('[底盘] 切换到手动速度模式...', 'info')
    await axios.post('/api/v1/chassis/manual_mode', { enable: true, mode: 'velocity' }, getAuthHeaders())
    await delay(500)
    
    deviceStatus.chassis = { ready: true, error: false, text: '手动速度模式' }
    addLog('[底盘] ✓ 初始化完成', 'success')
    return true
  } catch (error: any) {
    const msg = error.response?.data?.detail || error.message || '未知错误'
    deviceStatus.chassis = { ready: false, error: true, text: '初始化失败' }
    addLog(`[底盘] ✗ 初始化失败: ${msg}`, 'error')
    return false
  }
}

// 检查 VR 连接状态（只检查，不能主动连接）
async function checkVR(): Promise<boolean> {
  deviceStatus.vr = { ready: false, error: false, text: '检查中...' }
  addLog('[VR] 检查连接状态...', 'info')
  
  try {
    const response = await axios.get('/api/v1/vr/status', getAuthHeaders())
    
    if (response.data.connected) {
      deviceStatus.vr = { ready: true, error: false, text: '已连接' }
      addLog('[VR] ✓ 已连接', 'success')
      return true
    } else {
      deviceStatus.vr = { ready: false, error: true, text: '未连接' }
      addLog('[VR] ✗ 未连接，请确保 VR 设备已启动并连接', 'warning')
      return false
    }
  } catch (error: any) {
    const msg = error.response?.data?.detail || error.message || '未知错误'
    deviceStatus.vr = { ready: false, error: true, text: '检查失败' }
    addLog(`[VR] ✗ 状态检查失败: ${msg}`, 'error')
    return false
  }
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// 话题选择相关
function selectAllTopics() {
  recordingForm.topics = [...availableTopics.value]
}

function selectDefaultTopics() {
  recordingForm.topics = defaultRecordingTopics.filter(t => availableTopics.value.includes(t))
}

async function fetchAvailableTopics() {
  try {
    const response = await axios.get('/api/v1/recording/topics', getAuthHeaders())
    availableTopics.value = response.data.topics || []
  } catch (error) {
    // 使用默认话题列表
    availableTopics.value = defaultRecordingTopics
  }
}

// 录制控制
function showStartDialog() {
  recordingForm.actionName = ''
  recordingForm.note = ''
  recordingForm.topics = [...defaultRecordingTopics]  // 默认选中常用话题
  fetchAvailableTopics()  // 获取可用话题
  startDialogVisible.value = true
}

async function startRecording() {
  if (!recordingForm.actionName) {
    ElMessage.warning('请输入或选择动作名称')
    return
  }
  
  if (recordingForm.topics.length === 0) {
    ElMessage.warning('请选择要录制的话题')
    return
  }
  
  startLoading.value = true
  
  try {
    addLog(`开始录制: ${recordingForm.actionName}`, 'info')
    addLog(`录制话题: ${recordingForm.topics.join(', ')}`, 'info')
    
    // 调用后端开始录制 API
    const response = await axios.post('/api/v1/recording/start', {
      action_name: recordingForm.actionName,
      user_name: localStorage.getItem('username') || 'user',
      version: 'v1',
      topics: recordingForm.topics  // 传入选中的话题
    }, getAuthHeaders())
    
    if (response.data.success) {
      currentActionName.value = recordingForm.actionName
      currentBagPath.value = response.data.bag_path || ''
      collectionState.value = 'recording'
      recordingDuration.value = 0
      
      // 开始计时
      recordingTimer = window.setInterval(() => {
        recordingDuration.value++
      }, 1000)
      
      startDialogVisible.value = false
      addLog(`录制已开始，保存路径: ${response.data.bag_path}`, 'success')
      ElMessage.success('开始录制')
    } else {
      throw new Error(response.data.message || '启动录制失败')
    }
  } catch (error: any) {
    addLog(`启动录制失败: ${error.response?.data?.detail || error.message}`, 'error')
    ElMessage.error('启动录制失败')
  } finally {
    startLoading.value = false
  }
}

async function stopRecording() {
  addLog('停止录制...', 'info')
  
  // 停止计时
  if (recordingTimer) {
    clearInterval(recordingTimer)
    recordingTimer = null
  }
  
  try {
    // 调用后端停止录制 API
    const response = await axios.post('/api/v1/recording/stop', {}, getAuthHeaders())
    
    if (response.data.success) {
      collectionState.value = 'stopped'
      addLog(`录制已停止，时长: ${formatDuration(Math.floor(response.data.duration_sec || recordingDuration.value))}`, 'success')
      addLog(`数据保存于: ${response.data.bag_path}`, 'info')
      currentBagPath.value = response.data.bag_path || ''
      ElMessage.info('录制已停止，请选择保存或丢弃')
    } else {
      collectionState.value = 'stopped'
      addLog(`停止录制: ${response.data.message}`, 'warning')
    }
  } catch (error: any) {
    collectionState.value = 'stopped'
    addLog(`停止录制失败: ${error.response?.data?.detail || error.message}`, 'error')
  }
}

async function saveAndUpload() {
  saveLoading.value = true
  addLog('保存并上传数据...', 'info')
  
  try {
    // 录制已在停止时自动保存到 bag 文件
    // 这里可以添加额外的上传逻辑，比如上传到云端
    addLog(`数据已保存: ${currentBagPath.value}`, 'success')
    ElMessage.success('数据已保存')
    
    // 重置为 ready 状态，可以继续采集
    collectionState.value = 'ready'
    currentActionName.value = ''
    currentBagPath.value = ''
    recordingDuration.value = 0
  } catch (error: any) {
    addLog(`保存失败: ${error.response?.data?.detail || error.message}`, 'error')
    ElMessage.error('保存失败')
  } finally {
    saveLoading.value = false
  }
}

function discardRecording() {
  discardDialogVisible.value = true
}

async function confirmDiscard() {
  addLog('丢弃录制数据...', 'warning')
  
  try {
    // 调用后端丢弃 API（会删除 bag 文件）
    const response = await axios.post('/api/v1/recording/discard', {}, getAuthHeaders())
    
    addLog('数据已丢弃', 'warning')
    ElMessage.warning('录制数据已丢弃')
    
    // 重置为 ready 状态
    collectionState.value = 'ready'
    currentActionName.value = ''
    currentBagPath.value = ''
    recordingDuration.value = 0
  } catch (error: any) {
    addLog(`丢弃失败: ${error.response?.data?.detail || error.message}`, 'error')
  } finally {
    discardDialogVisible.value = false
  }
}

function resetToIdle() {
  collectionState.value = 'idle'
  currentActionName.value = ''
  currentBagPath.value = ''
  recordingDuration.value = 0
  
  // 重置设备状态
  Object.keys(deviceStatus).forEach(key => {
    const k = key as keyof typeof deviceStatus
    deviceStatus[k] = { ready: false, error: false, text: '未检查' }
  })
  
  logs.value = []
  addLog('已重置，请重新初始化', 'info')
}

// 状态轮询
let statusTimer: number | null = null

async function fetchDeviceStatus() {
  // 只在非初始化状态下更新状态显示
  if (collectionState.value !== 'initializing') {
    // 从 layoutStore 获取状态
    deviceStatus.arm.text = layoutStore.armStatusInfo.text
    deviceStatus.arm.ready = layoutStore.armStatus.connected && layoutStore.armStatus.enabled && layoutStore.armStatus.servoMode
    
    deviceStatus.vr.text = layoutStore.vrStatusInfo.text
    deviceStatus.vr.ready = layoutStore.vrStatus.connected
  }
}

onMounted(() => {
  addLog('数据采集面板已加载', 'info')
  statusTimer = window.setInterval(fetchDeviceStatus, 2000)
})

onUnmounted(() => {
  if (recordingTimer) {
    clearInterval(recordingTimer)
  }
  if (statusTimer) {
    clearInterval(statusTimer)
  }
})
</script>

<style scoped>
.data-collection-panel {
  padding: var(--spacing-lg);
}

.panel-section {
  margin-bottom: var(--spacing-sm);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.section-title {
  margin: 0 0 var(--spacing-md) 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.section-header .section-title {
  margin: 0;
}

/* 相机视图 */
.camera-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  gap: var(--spacing-sm);
}

.camera-wrapper {
  position: relative;
}

/* 采集状态 */
.collection-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-md);
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: var(--radius-lg);
}

.status-badge {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s var(--transition-smooth);
}

.status-badge.idle {
  background: rgba(148, 163, 184, 0.2);
  color: rgba(148, 163, 184, 0.8);
}

.status-badge.initializing {
  background: rgba(59, 130, 246, 0.2);
  color: #3b82f6;
  box-shadow: 0 0 12px rgba(59, 130, 246, 0.3);
}

.status-badge.ready {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.3);
}

.status-badge.recording {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
  box-shadow: 0 0 12px rgba(239, 68, 68, 0.3);
}

.status-badge.stopped {
  background: rgba(245, 158, 11, 0.2);
  color: var(--color-primary);
  box-shadow: 0 0 12px rgba(245, 158, 11, 0.3);
}

.rotating {
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.recording-icon {
  animation: blink 1s ease-in-out infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.recording-info {
  margin-top: var(--spacing-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
}

.recording-time {
  font-size: 24px;
  font-weight: 700;
  font-family: 'Consolas', monospace;
  color: #ef4444;
}

.recording-action {
  font-size: 14px;
  color: var(--color-text-secondary);
}

/* 设备状态网格 - 紧凑布局 */
.device-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-sm);
}

.device-tag {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-sm);
  font-size: 12px;
  border: 1px solid rgba(148, 163, 184, 0.15);
  transition: all 0.3s var(--transition-smooth);
}

.device-tag:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.device-tag .el-icon {
  font-size: 14px;
}

.device-tag .status-text {
  margin-left: auto;
  font-size: 11px;
  opacity: 0.8;
}

.device-tag.success {
  border-color: rgba(16, 185, 129, 0.4);
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
}

.device-tag.warning {
  border-color: rgba(245, 158, 11, 0.4);
  background: rgba(245, 158, 11, 0.15);
  color: var(--color-primary);
}

.device-tag.danger {
  border-color: rgba(239, 68, 68, 0.4);
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
}

/* 控制按钮 */
.control-buttons {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.control-btn {
  width: 100%;
  height: 40px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s var(--transition-smooth);
}

.control-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.control-btn.secondary {
  height: 36px;
  font-size: 13px;
}

/* 日志容器 */
.log-container {
  max-height: 120px;
  overflow-y: auto;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(148, 163, 184, 0.15);
  border-radius: var(--radius-md);
  padding: var(--spacing-xs);
}

.log-item {
  display: flex;
  gap: var(--spacing-xs);
  padding: 2px var(--spacing-xs);
  font-size: 11px;
  font-family: 'Consolas', monospace;
  border-radius: 3px;
}

.log-item.info {
  color: var(--color-text-secondary);
}

.log-item.success {
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
}

.log-item.warning {
  color: var(--color-primary);
  background: rgba(245, 158, 11, 0.1);
}

.log-item.error {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.log-time {
  color: rgba(148, 163, 184, 0.5);
  flex-shrink: 0;
}

.log-empty {
  text-align: center;
  color: rgba(148, 163, 184, 0.5);
  padding: var(--spacing-md);
  font-size: 12px;
}

:deep(.el-divider) {
  margin: var(--spacing-md) 0;
  border-color: rgba(148, 163, 184, 0.2);
}

:deep(.el-dialog) {
  background: rgba(30, 41, 59, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(148, 163, 184, 0.2);
}

:deep(.el-dialog__header) {
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
}

:deep(.el-dialog__title) {
  color: var(--color-text-primary);
}

.topic-hint {
  margin-top: var(--spacing-sm);
  display: flex;
  gap: var(--spacing-sm);
}
</style>
