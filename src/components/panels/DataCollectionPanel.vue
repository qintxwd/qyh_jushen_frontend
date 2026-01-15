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

    <!-- 动作选择 -->
    <div class="panel-section">
      <h3 class="section-title">选择动作</h3>
      <div class="action-selector">
        <el-select 
          v-model="selectedActionId" 
          placeholder="选择要采集的动作"
          :disabled="collectionState === 'recording'"
          :loading="actionLoading"
          style="width: 100%"
        >
          <el-option 
            v-for="action in actionList"
            :key="action.id" 
            :label="action.name"
            :value="action.id"
          >
            <div class="action-option">
              <span class="action-name">{{ action.name }}</span>
              <span class="action-meta">
                <el-tag v-if="action.status === 'trained'" size="small" type="success">
                  已训练 ({{ action.episode_count }}条)
                </el-tag>
                <el-tag v-else size="small" type="warning">
                  采集中 ({{ action.episode_count }}条)
                </el-tag>
              </span>
            </div>
          </el-option>
        </el-select>
        <div v-if="selectedAction" class="action-info">
          <div class="action-status-bar">
            <el-tag 
              :type="selectedAction.status === 'trained' ? 'success' : 'warning'"
              size="small"
            >
              {{ selectedAction.status === 'trained' ? '✓ 已训练' : '● 数据采集中' }}
            </el-tag>
            <span class="episode-count">已采集 {{ selectedAction.episode_count }} 条轨迹</span>
          </div>
          <p class="action-desc">{{ selectedAction.description || '暂无描述' }}</p>
          <div class="action-topics">
            <span class="label">录制话题:</span>
            <span class="topics">{{ selectedAction.topics.length }} 个</span>
          </div>
        </div>
      </div>
    </div>

    <el-divider />

    <!-- 采集状态 -->
    <div class="panel-section">
      <h3 class="section-title">采集状态</h3>
      <div class="collection-status">
        <div class="status-badge" :class="collectionState">
          <SvgIcon v-if="collectionState === 'idle'" name="videocamera" :size="20" />
          <SvgIcon v-else-if="collectionState === 'recording'" name="videocamera" :size="20" class="recording-icon" />
          <SvgIcon v-else-if="collectionState === 'stopped'" name="videopause" :size="20" />
          <span>{{ stateText }}</span>
        </div>
        <div v-if="collectionState === 'recording'" class="recording-info">
          <span class="recording-time">{{ formatDuration(recordingDuration) }}</span>
          <span class="recording-action">{{ currentActionName }}</span>
        </div>
      </div>
    </div>

    <el-divider />

    <!-- 电磁铁控制 -->
    <div class="panel-section">
      <h3 class="section-title">电磁铁</h3>
      <div class="electromagnet-control">
        <el-tag :type="electromagnetOn ? 'success' : 'info'" size="small">
          {{ electromagnetOn ? '电磁铁开' : '电磁铁关' }}
        </el-tag>
        <el-button
          :type="electromagnetOn ? 'warning' : 'info'"
          size="small"
          :loading="electromagnetLoading"
          @click="toggleElectromagnet"
        >
          {{ electromagnetOn ? '关闭电磁铁' : '开启电磁铁' }}
        </el-button>
      </div>
    </div>

    <el-divider />

    <!-- 控制按钮 -->
    <div class="panel-section">
      <h3 class="section-title">采集控制</h3>
      <div class="control-buttons">
        <!-- 开始采集按钮 -->
        <el-button 
          v-if="collectionState === 'idle'"
          type="success" 
          size="large"
          :disabled="!selectedActionId"
          :loading="startLoading"
          @click="showStartDialog"
          class="control-btn"
        >
          <SvgIcon name="videoplay" :size="16" />
          开始采集
        </el-button>

        <!-- 录制中的控制 -->
        <el-button 
          v-if="collectionState === 'recording'"
          type="danger" 
          size="large"
          @click="stopRecording"
          class="control-btn"
        >
          <SvgIcon name="videopause" :size="16" />
          停止采集
        </el-button>

        <!-- 停止后的控制 -->
        <template v-if="collectionState === 'stopped'">
          <el-button 
            type="success" 
            size="large"
            :loading="saveLoading"
            @click="saveRecording"
            class="control-btn"
          >
            <SvgIcon name="upload" :size="16" />
            保存数据
          </el-button>
          <el-button 
            type="danger" 
            size="large"
            @click="discardDialogVisible = true"
            class="control-btn"
          >
            <SvgIcon name="delete" :size="16" />
            丢弃数据
          </el-button>
        </template>
      </div>
    </div>

    <el-divider />

    <!-- 操作日志 -->
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
          <el-input 
            v-model="recordingForm.actionName"
            disabled
            placeholder="动作名称"
          />
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
          :disabled="recordingForm.topics.length === 0"
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
import SvgIcon from '@/components/SvgIcon.vue'
import { ref, reactive, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import CameraView from '@/components/CameraView.vue'
import { listActions, getActionTopics, type ActionSummary } from '@/api/actions'

// ==================== 动作选择 ====================
const actionList = ref<ActionSummary[]>([])
const selectedActionId = ref<string>('')
const actionLoading = ref(false)

// 加载动作列表
async function loadActionList() {
  actionLoading.value = true
  try {
    actionList.value = await listActions()
    if (actionList.value.length > 0 && !selectedActionId.value) {
      selectedActionId.value = actionList.value[0].id
    }
    addLog(`加载了 ${actionList.value.length} 个可用动作`, 'info')
  } catch (error: any) {
    addLog(`加载动作列表失败: ${error.message}`, 'error')
  } finally {
    actionLoading.value = false
  }
}

// 当前选中的动作详情
const selectedAction = computed(() => {
  return actionList.value.find(a => a.id === selectedActionId.value)
})

// 监听动作选择变化，自动更新话题
watch(selectedActionId, async (newId) => {
  if (newId && collectionState.value === 'idle') {
    try {
      const topics = await getActionTopics(newId)
      recordingForm.topics = topics
      addLog(`已切换到动作: ${selectedAction.value?.name}`, 'info')
      addLog(`录制话题: ${topics.join(', ')}`, 'info')
    } catch (error: any) {
      addLog(`获取动作话题失败: ${error.message}`, 'warning')
    }
  }
})

// ==================== 采集状态 ====================
type CollectionState = 'idle' | 'recording' | 'stopped'
const collectionState = ref<CollectionState>('idle')

const stateText = computed(() => {
  switch (collectionState.value) {
    case 'idle': return '准备就绪'
    case 'recording': return '录制中'
    case 'stopped': return '录制已停止'
    default: return '未知状态'
  }
})

// ==================== 加载状态 ====================
const startLoading = ref(false)
const saveLoading = ref(false)

// ==================== 录制相关 ====================
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

// 电磁铁状态
const electromagnetOn = ref(false)
const electromagnetLoading = ref(false)
let electromagnetInterval: number | null = null

// 默认录制话题（已更新为实际系统话题名称）
const defaultTopics = [
  '/joint_states',
  '/tf',
  '/tf_static',
  '/head_camera/color/image_raw',
  '/head_camera/depth/image_raw'
]

// 所有可能的录制话题（已更新为实际系统话题名称）
const allRecordingTopics = [
  '/joint_states',
  '/tf',
  '/tf_static',
  '/left_arm/joint_states',
  '/right_arm/joint_states',
  '/left/gripper_state',
  '/right/gripper_state',
  '/head/joint_states',
  '/lift/state',
  '/chassis/odom',
  '/head_camera/color/image_raw',
  '/head_camera/depth/image_raw',
  '/left_camera/color/image_raw',
  '/right_camera/color/image_raw'
]

// ==================== 工具函数 ====================
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

// ==================== 话题选择 ====================
function selectAllTopics() {
  recordingForm.topics = [...availableTopics.value]
}

function selectDefaultTopics() {
  recordingForm.topics = defaultTopics.filter(t => availableTopics.value.includes(t))
}

async function fetchAvailableTopics() {
  try {
    const response = await axios.get('/api/v1/recording/topics', getAuthHeaders())
    availableTopics.value = response.data.topics || []
  } catch (error) {
    availableTopics.value = allRecordingTopics
  }
}

async function fetchElectromagnetState() {
  try {
    const response = await axios.get('/api/v1/lift/state', getAuthHeaders())
    if (response.data) {
      electromagnetOn.value = response.data.electromagnet_on ?? false
    }
  } catch (error) {
    // ignore
  }
}

async function toggleElectromagnet() {
  if (electromagnetLoading.value) return
  electromagnetLoading.value = true
  try {
    const enable = !electromagnetOn.value
    const response = await axios.post('/api/v1/lift/electromagnet', { enable }, getAuthHeaders())
    if (response.data?.success) {
      electromagnetOn.value = enable
      addLog(enable ? '电磁铁已开启' : '电磁铁已关闭', 'success')
    } else {
      addLog(response.data?.message || '电磁铁操作失败', 'warning')
    }
  } catch (error: any) {
    addLog(`电磁铁操作失败: ${error.response?.data?.detail || error.message}`, 'error')
  } finally {
    electromagnetLoading.value = false
  }
}

// ==================== 录制控制 ====================
function showStartDialog() {
  if (!selectedAction.value) {
    ElMessage.warning('请先选择一个动作')
    return
  }
  
  recordingForm.actionName = selectedAction.value.name
  recordingForm.note = ''
  
  if (selectedAction.value.topics.length > 0) {
    recordingForm.topics = [...selectedAction.value.topics]
  } else {
    recordingForm.topics = [...defaultTopics]
  }
  
  fetchAvailableTopics()
  startDialogVisible.value = true
}

async function startRecording() {
  if (recordingForm.topics.length === 0) {
    ElMessage.warning('请选择要录制的话题')
    return
  }
  
  startLoading.value = true
  
  try {
    addLog(`开始录制: ${recordingForm.actionName}`, 'info')
    addLog(`录制话题: ${recordingForm.topics.join(', ')}`, 'info')
    
    const response = await axios.post('/api/v1/recording/start', {
      action_name: selectedActionId.value || recordingForm.actionName,
      user_name: localStorage.getItem('username') || 'user',
      version: 'v1',
      topics: recordingForm.topics
    }, getAuthHeaders())
    
    if (response.data.success) {
      currentActionName.value = recordingForm.actionName
      currentBagPath.value = response.data.bag_path || ''
      collectionState.value = 'recording'
      recordingDuration.value = 0
      
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
  
  if (recordingTimer) {
    clearInterval(recordingTimer)
    recordingTimer = null
  }
  
  try {
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

async function saveRecording() {
  saveLoading.value = true
  addLog('保存数据...', 'info')
  
  try {
    addLog(`数据已保存: ${currentBagPath.value}`, 'success')
    
    // 更新动作的轨迹数量
    if (selectedActionId.value) {
      try {
        const { updateEpisodeCount } = await import('@/api/actions')
        const newCount = await updateEpisodeCount(selectedActionId.value)
        addLog(`轨迹数量已更新: ${newCount} 条`, 'info')
        await loadActionList()
      } catch (e: any) {
        addLog(`更新轨迹数量失败: ${e.message}`, 'warning')
      }
    }
    
    ElMessage.success('数据已保存')
    resetState()
  } catch (error: any) {
    addLog(`保存失败: ${error.response?.data?.detail || error.message}`, 'error')
    ElMessage.error('保存失败')
  } finally {
    saveLoading.value = false
  }
}

async function confirmDiscard() {
  addLog('丢弃录制数据...', 'warning')
  
  try {
    await axios.post('/api/v1/recording/discard', {}, getAuthHeaders())
    addLog('数据已丢弃', 'warning')
    ElMessage.warning('录制数据已丢弃')
    resetState()
  } catch (error: any) {
    addLog(`丢弃失败: ${error.response?.data?.detail || error.message}`, 'error')
  } finally {
    discardDialogVisible.value = false
  }
}

function resetState() {
  collectionState.value = 'idle'
  currentActionName.value = ''
  currentBagPath.value = ''
  recordingDuration.value = 0
}

// ==================== 生命周期 ====================
onMounted(() => {
  addLog('数据采集面板已加载', 'info')
  loadActionList()
  fetchElectromagnetState()
  electromagnetInterval = window.setInterval(fetchElectromagnetState, 1000)
})

onUnmounted(() => {
  if (recordingTimer) {
    clearInterval(recordingTimer)
  }
  if (electromagnetInterval) {
    clearInterval(electromagnetInterval)
  }
})
</script>

<style scoped>
.data-collection-panel {
  padding: clamp(12px, 2vw, 20px);
}

.panel-section {
  margin-bottom: clamp(8px, 1.5vw, 16px);
}

.section-title {
  margin: 0 0 var(--spacing-md) 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* 动作选择器 */
.action-selector {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.action-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.action-name {
  font-weight: 500;
}

.action-meta {
  display: flex;
  gap: var(--spacing-xs);
}

.action-info {
  padding: clamp(10px, 1.2vw, 16px);
  background: rgba(30, 41, 59, 0.4);
  border-radius: var(--radius-md);
  border: 1px solid rgba(148, 163, 184, 0.15);
}

.action-status-bar {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xs);
}

.episode-count {
  font-size: 12px;
  color: var(--color-text-secondary);
}

.action-desc {
  margin: 0 0 var(--spacing-xs) 0;
  font-size: 13px;
  color: var(--color-text-secondary);
}

.action-topics {
  font-size: 12px;
  color: var(--color-text-muted);
}

.action-topics .label {
  margin-right: var(--spacing-xs);
}

.action-topics .topics {
  color: var(--color-primary);
}

/* 相机视图 */
.camera-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: clamp(8px, 1.5vw, 16px);
}

.camera-wrapper {
  position: relative;
}

/* 采集状态 */
.collection-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: clamp(12px, 2vw, 20px);
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: var(--radius-lg);
}

.status-badge {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: 8px 18px;
  border-radius: 20px;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.3s var(--transition-smooth);
}

.status-badge.idle {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
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
  font-size: 26px;
  font-weight: 700;
  font-family: 'Consolas', monospace;
  color: #ef4444;
}

.recording-action {
  font-size: 15px;
  color: var(--color-text-secondary);
}

/* 电磁铁控制 */
.electromagnet-control {
  display: flex;
  align-items: center;
  gap: clamp(8px, 1vw, 12px);
  padding: clamp(8px, 1.2vw, 14px);
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(148, 163, 184, 0.15);
  border-radius: var(--radius-md);
}

/* 控制按钮 */
.control-buttons {
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 1.2vw, 14px);
}

.control-btn {
  width: 100%;
  height: 52px;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s var(--transition-smooth);
}

.control-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* 日志容器 */
.log-container {
  max-height: 180px;
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
  font-size: 12px;
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
  font-size: 13px;
}

:deep(.el-divider) {
  margin: var(--spacing-md) 0;
  border-color: rgba(148, 163, 184, 0.2);
}

:deep(.el-dialog) {
  background: rgba(30, 41, 59, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(148, 163, 184, 0.2);
  width: min(520px, 90vw) !important;
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

:deep(.el-button--small) {
  height: 34px;
  padding: 0 14px;
  font-size: 13px;
}

:deep(.el-input__wrapper) {
  min-height: 38px;
}

:deep(.el-select .el-input__inner) {
  height: 38px;
}

@media (max-width: 1200px) {
  .camera-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

@media (max-width: 900px) {
  .camera-grid {
    grid-template-columns: 1fr;
  }
  .status-badge {
    width: 100%;
    justify-content: center;
  }
}
</style>
