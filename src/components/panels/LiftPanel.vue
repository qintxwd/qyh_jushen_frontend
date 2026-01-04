<template>
  <div class="lift-panel">
    <!-- 连接状态提示 -->
    <div v-if="!state.connected" class="panel-section">
      <el-alert
        title="PLC 未连接"
        type="error"
        description="无法与升降电机通信"
        show-icon
        :closable="false"
      />
    </div>

    <!-- 报警提示 -->
    <div v-if="state.alarm" class="panel-section">
      <el-alert
        title="电机报警"
        type="error"
        show-icon
        :closable="false"
      >
        <template #default>
          <el-button type="danger" size="small" @click="resetAlarm" :loading="loading.reset">
            复位报警
          </el-button>
        </template>
      </el-alert>
    </div>

    <!-- 当前状态 -->
    <div class="panel-section">
      <h3 class="section-title">当前状态</h3>
      <div class="status-visual">
        <!-- 高度可视化 -->
        <div class="height-column">
          <div class="height-track">
            <div 
              class="height-fill" 
              :style="{ height: heightPercentage + '%' }"
            ></div>
            <div 
              class="height-indicator" 
              :style="{ bottom: heightPercentage + '%' }"
            >
              <span class="height-label">{{ state.currentPosition.toFixed(1) }}</span>
            </div>
          </div>
          <div class="height-scale">
            <span>{{ maxHeight }}</span>
            <span>{{ maxHeight / 2 }}</span>
            <span>0</span>
          </div>
        </div>

        <!-- 状态信息 -->
        <div class="status-info">
          <div class="info-row">
            <span class="info-label">连接</span>
            <el-tag :type="state.connected ? 'success' : 'danger'" size="small">
              {{ state.connected ? '已连接' : '断开' }}
            </el-tag>
          </div>
          <div class="info-row">
            <span class="info-label">使能</span>
            <el-tag :type="state.enabled ? 'success' : 'info'" size="small">
              {{ state.enabled ? '已使能' : '未使能' }}
            </el-tag>
          </div>
          <div class="info-row">
            <span class="info-label">高度</span>
            <span class="info-value">{{ state.currentPosition.toFixed(1) }} mm</span>
          </div>
          <div class="info-row">
            <span class="info-label">速度</span>
            <span class="info-value">{{ state.currentSpeed.toFixed(0) }} mm/s</span>
          </div>
          <div class="info-row">
            <span class="info-label">状态</span>
            <el-tag :type="state.positionReached ? 'success' : 'warning'" size="small">
              {{ state.positionReached ? '已到位' : '运动中' }}
            </el-tag>
          </div>
        </div>
      </div>
    </div>

    <el-divider />

    <!-- 使能控制 -->
    <div class="panel-section">
      <h3 class="section-title">电机使能</h3>
      <el-button
        :type="state.enabled ? 'danger' : 'primary'"
        @click="toggleEnable"
        :loading="loading.enable"
        :disabled="!state.connected"
        style="width: 100%"
      >
        <SvgIcon v-if="state.enabled" name="videopause" :size="16" />
        <SvgIcon v-else name="videoplay" :size="16" />
        {{ state.enabled ? '下使能' : '上使能' }}
      </el-button>
    </div>

    <el-divider />

    <!-- 速度设置 -->
    <div class="panel-section">
      <h3 class="section-title">速度设置</h3>
      <div class="speed-control">
        <el-input-number
          v-model="inputSpeed"
          :min="1"
          :max="100"
          :step="5"
          size="small"
          :disabled="!state.connected || !state.enabled"
          style="width: 120px"
        />
        <span class="unit">mm/s</span>
        <el-button
          type="primary"
          size="small"
          @click="setSpeed"
          :loading="loading.speed"
          :disabled="!state.connected || !state.enabled"
        >
          设置
        </el-button>
      </div>
    </div>

    <el-divider />

    <!-- 目标位置 -->
    <div class="panel-section">
      <h3 class="section-title">目标位置</h3>
      <div class="position-control">
        <div class="position-input">
          <el-input-number
            v-model="inputPosition"
            :min="0"
            :max="maxHeight"
            :step="10"
            :precision="1"
            size="small"
            :disabled="!state.connected || !state.enabled"
            style="width: 120px"
          />
          <span class="unit">mm</span>
          <el-button
            type="success"
            size="small"
            @click="goToPosition"
            :loading="loading.position"
            :disabled="!state.connected || !state.enabled"
          >
            <SvgIcon name="position" :size="16" />
            GO
          </el-button>
          <el-button
            type="danger"
            size="small"
            @click="stopMove"
            :loading="loading.stop"
            :disabled="!state.connected || !state.enabled"
          >
            <SvgIcon name="videopause" :size="16" />
            STOP
          </el-button>
        </div>
        
        <!-- 快捷位置 -->
        <div class="quick-positions">
          <el-button
            v-for="pos in quickPositions"
            :key="pos.value"
            size="small"
            @click="setQuickPosition(pos.value)"
            :disabled="!state.connected || !state.enabled"
          >
            {{ pos.label }}
          </el-button>
        </div>
      </div>
    </div>

    <el-divider />

    <!-- 点位管理 -->
    <div class="panel-section">
      <h3 class="section-title">
        <span>预设点位</span>
        <el-button type="primary" size="small" @click="handleAddPoint">
          <SvgIcon name="plus" :size="14" />
          添加
        </el-button>
      </h3>
      
      <div class="point-list">
        <div v-if="liftPoints.length === 0" class="empty-hint">
          暂无点位
        </div>
        
        <div 
          v-for="point in liftPoints" 
          :key="point.id"
          class="point-item"
          :class="{ builtin: point.is_builtin, selected: selectedPointId === point.id }"
          @click="selectedPointId = point.id"
        >
          <div class="point-info">
            <div class="point-name">
              <SvgIcon v-if="point.is_builtin" name="star" :size="14" />
              {{ point.name }}
            </div>
            <div class="point-value">{{ point.height }}mm</div>
            <div v-if="point.description" class="point-desc">{{ point.description }}</div>
          </div>
          <div class="point-actions">
            <el-button text size="small" @click.stop="goToPoint(point)">
              <SvgIcon name="position" :size="14" />
              前往
            </el-button>
            <el-button 
              v-if="!point.is_builtin"
              text 
              size="small" 
              @click.stop="updatePointPosition(point)"
            >
              <SvgIcon name="refresh" :size="14" />
              更新
            </el-button>
            <el-button 
              v-if="!point.is_builtin"
              text 
              size="small" 
              @click.stop="openEditDialog(point)"
            >
              <SvgIcon name="edit" :size="14" />
              编辑
            </el-button>
            <el-button 
              v-if="!point.is_builtin"
              text 
              size="small" 
              type="danger"
              @click.stop="deletePoint(point)"
            >
              <SvgIcon name="delete" :size="14" />
              删除
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <el-divider />

    <!-- 手动控制 -->
    <div class="panel-section">
      <h3 class="section-title">手动控制</h3>
      <div class="manual-controls">
        <el-button
          type="success"
          size="large"
          class="jog-btn"
          @mousedown="startManualMove('up')"
          @mouseup="stopManualMove"
          @mouseleave="stopManualMove"
          @touchstart.prevent="startManualMove('up')"
          @touchend.prevent="stopManualMove"
          :disabled="!state.connected || !state.enabled"
        >
          <SvgIcon name="top" :size="24" />
          <span>上升</span>
        </el-button>
        <el-button
          type="warning"
          size="large"
          class="jog-btn"
          @mousedown="startManualMove('down')"
          @mouseup="stopManualMove"
          @mouseleave="stopManualMove"
          @touchstart.prevent="startManualMove('down')"
          @touchend.prevent="stopManualMove"
          :disabled="!state.connected || !state.enabled"
        >
          <SvgIcon name="bottom" :size="24" />
          <span>下降</span>
        </el-button>
      </div>
      <p class="jog-hint">按住按钮持续运动，松开停止</p>
    </div>
    
    <!-- 添加点位对话框 -->
    <el-dialog
      v-model="addPointDialogVisible"
      title="添加升降点位"
      width="400px"
    >
      <el-form label-width="80px">
        <el-form-item label="点位名称">
          <el-input v-model="newPointForm.name" placeholder="请输入点位名称" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="newPointForm.description" placeholder="可选" />
        </el-form-item>
        <el-form-item label="高度">
          <el-input-number
            v-model="newPointForm.height"
            :min="0"
            :max="500"
            :step="10"
            style="width: 100%"
          />
          <span class="unit" style="margin-left: 8px">mm (当前: {{ state.currentPosition }}mm)</span>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="addPointDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmAddPoint">确定</el-button>
      </template>
    </el-dialog>

    <!-- 编辑点位对话框 -->
    <el-dialog
      v-model="editPointDialogVisible"
      title="编辑升降点位"
      width="400px"
    >
      <el-form label-width="80px">
        <el-form-item label="点位名称">
          <el-input v-model="editPointForm.name" placeholder="请输入点位名称" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="editPointForm.description" placeholder="可选" />
        </el-form-item>
        <el-form-item label="高度">
          <el-input-number
            v-model="editPointForm.height"
            :min="0"
            :max="500"
            :step="10"
            style="width: 100%"
          />
          <span class="unit" style="margin-left: 8px">mm</span>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editPointDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmEditPoint">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios'
import { getApiV1BaseUrl } from '@/utils/apiUrl'

// API 基础 URL - 动态获取
const getApiBase = () => getApiV1BaseUrl()

// 最大高度 (mm)
const maxHeight = 500

// 状态 - 对应 LiftState.msg
const state = reactive({
  connected: false,
  enabled: false,
  currentPosition: 0,
  currentSpeed: 20,
  positionReached: true,
  alarm: false
})

// 输入值
const inputSpeed = ref(20)
const inputPosition = ref(0)

// 加载状态
const loading = reactive({
  enable: false,
  speed: false,
  position: false,
  reset: false,
  stop: false
})

// 快捷位置
const quickPositions = [
  { label: '最低', value: 0 },
  { label: '1/4', value: 125 },
  { label: '中间', value: 250 },
  { label: '3/4', value: 375 },
  { label: '最高', value: 500 }
]

// 高度百分比
const heightPercentage = computed(() => {
  return Math.min(100, Math.max(0, (state.currentPosition / maxHeight) * 100))
})

// 手动移动状态
let isManualMoving = false

// ==================== 点位管理 ====================
interface LiftPoint {
  id: string
  name: string
  description: string
  height: number
  is_builtin: boolean
}

const liftPoints = ref<LiftPoint[]>([])
const selectedPointId = ref<string>('')
const addPointDialogVisible = ref(false)
const editPointDialogVisible = ref(false)

const newPointForm = reactive({
  name: '',
  description: '',
  height: 0
})

const editPointForm = reactive({
  id: '',
  name: '',
  description: '',
  height: 0
})

// 获取点位列表
async function fetchLiftPoints() {
  try {
    const response = await axios.get(`${getApiBase()}/lift/points`)
    liftPoints.value = response.data
  } catch (error) {
    console.error('获取升降点位列表失败:', error)
  }
}

// 打开添加点位对话框
function handleAddPoint() {
  newPointForm.name = ''
  newPointForm.description = ''
  newPointForm.height = state.currentPosition
  addPointDialogVisible.value = true
}

// 确认添加点位
async function confirmAddPoint() {
  if (!newPointForm.name.trim()) {
    ElMessage.warning('请输入点位名称')
    return
  }
  
  try {
    await axios.post(`${getApiBase()}/lift/points`, newPointForm)
    ElMessage.success('点位添加成功')
    addPointDialogVisible.value = false
    await fetchLiftPoints()
  } catch (error: any) {
    console.error('添加点位失败:', error)
    ElMessage.error(error.response?.data?.detail || '添加点位失败')
  }
}

// 打开编辑点位对话框
function openEditDialog(point: LiftPoint) {
  if (point.is_builtin) {
    ElMessage.warning('内置点位无法编辑')
    return
  }
  
  editPointForm.id = point.id
  editPointForm.name = point.name
  editPointForm.description = point.description
  editPointForm.height = point.height
  editPointDialogVisible.value = true
}

// 确认编辑点位
async function confirmEditPoint() {
  if (!editPointForm.name.trim()) {
    ElMessage.warning('请输入点位名称')
    return
  }
  
  try {
    await axios.put(`${getApiBase()}/lift/points/${editPointForm.id}`, {
      name: editPointForm.name,
      description: editPointForm.description,
      height: editPointForm.height
    })
    ElMessage.success('点位更新成功')
    editPointDialogVisible.value = false
    await fetchLiftPoints()
  } catch (error: any) {
    console.error('更新点位失败:', error)
    ElMessage.error(error.response?.data?.detail || '更新点位失败')
  }
}

// 删除点位
async function deletePoint(point: LiftPoint) {
  if (point.is_builtin) {
    ElMessage.warning('内置点位无法删除')
    return
  }
  
  try {
    await ElMessageBox.confirm(
      `确定要删除点位 "${point.name}" 吗？`,
      '删除确认',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    await axios.delete(`${getApiBase()}/lift/points/${point.id}`)
    ElMessage.success('点位删除成功')
    if (selectedPointId.value === point.id) {
      selectedPointId.value = ''
    }
    await fetchLiftPoints()
  } catch (error: any) {
    if (error !== 'cancel') {
      console.error('删除点位失败:', error)
      ElMessage.error(error.response?.data?.detail || '删除点位失败')
    }
  }
}

// 前往指定点位
async function goToPoint(point: LiftPoint) {
  inputPosition.value = point.height
  await goToPosition()
}

// 使用当前位置更新点位
async function updatePointPosition(point: LiftPoint) {
  if (point.is_builtin) {
    ElMessage.warning('内置点位无法更新')
    return
  }
  
  try {
    await ElMessageBox.confirm(
      `确定要将点位 "${point.name}" 更新为当前位置吗？`,
      '更新确认',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }
    )
    
    await axios.put(`${getApiBase()}/lift/points/${point.id}`, {
      name: point.name,
      description: point.description,
      height: state.currentPosition
    })
    ElMessage.success('点位位置已更新')
    await fetchLiftPoints()
  } catch (error: any) {
    if (error !== 'cancel') {
      console.error('更新点位失败:', error)
      ElMessage.error(error.response?.data?.detail || '更新点位失败')
    }
  }
}

// 命令常量 - 对应 LiftControl.srv
const CMD = {
  ENABLE: 1,
  DISABLE: 2,
  SET_SPEED: 3,
  GO_POSITION: 4,
  MOVE_UP: 5,
  MOVE_DOWN: 6,
  RESET_ALARM: 7,
  STOP: 8
}

// 发送控制命令
async function sendCommand(command: number, value: number = 0, hold: boolean = false) {
  try {
    const response = await axios.post(
      `${getApiBase()}/lift/control`,
      { command, value, hold },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    return response.data
  } catch (error: any) {
    console.error('Lift control error:', error)
    throw error
  }
}

// 切换使能
async function toggleEnable() {
  loading.enable = true
  try {
    const command = state.enabled ? CMD.DISABLE : CMD.ENABLE
    const result = await sendCommand(command)
    if (result.success) {
      ElMessage.success(result.message)
    } else {
      ElMessage.error(result.message)
    }
  } catch (error: any) {
    ElMessage.error('操作失败: ' + (error.response?.data?.detail || error.message))
  } finally {
    loading.enable = false
  }
}

// 设置速度
async function setSpeed() {
  loading.speed = true
  try {
    const result = await sendCommand(CMD.SET_SPEED, inputSpeed.value)
    if (result.success) {
      ElMessage.success('速度设置成功')
    } else {
      ElMessage.error(result.message)
    }
  } catch (error: any) {
    ElMessage.error('设置失败: ' + (error.response?.data?.detail || error.message))
  } finally {
    loading.speed = false
  }
}

// 去目标位置
async function goToPosition() {
  loading.position = true
  try {
    const result = await sendCommand(CMD.GO_POSITION, inputPosition.value)
    if (result.success) {
      ElMessage.success('开始移动')
    } else {
      ElMessage.error(result.message)
    }
  } catch (error: any) {
    ElMessage.error('操作失败: ' + (error.response?.data?.detail || error.message))
  } finally {
    loading.position = false
  }
}

// 停止运动
async function stopMove() {
  loading.stop = true
  try {
    const result = await sendCommand(CMD.STOP)
    if (result.success) {
      ElMessage.warning('运动已停止')
    } else {
      ElMessage.error(result.message)
    }
  } catch (error: any) {
    ElMessage.error('停止失败: ' + (error.response?.data?.detail || error.message))
  } finally {
    loading.stop = false
  }
}

// 设置快捷位置
function setQuickPosition(value: number) {
  inputPosition.value = value
  goToPosition()
}

// 开始手动移动
async function startManualMove(direction: 'up' | 'down') {
  if (!state.enabled || !state.connected || isManualMoving) return
  
  isManualMoving = true
  try {
    const command = direction === 'up' ? CMD.MOVE_UP : CMD.MOVE_DOWN
    await sendCommand(command, 0, true)  // hold=true 开始运动
  } catch (error) {
    console.error('Manual move start error:', error)
    isManualMoving = false
  }
}

// 停止手动移动
async function stopManualMove() {
  if (!isManualMoving) return
  
  isManualMoving = false
  try {
    await sendCommand(CMD.MOVE_UP, 0, false)  // hold=false 停止运动
  } catch (error) {
    console.error('Manual move stop error:', error)
  }
}

// 复位报警
async function resetAlarm() {
  loading.reset = true
  try {
    const result = await sendCommand(CMD.RESET_ALARM)
    if (result.success) {
      ElMessage.success('报警已复位')
    } else {
      ElMessage.error(result.message)
    }
  } catch (error: any) {
    ElMessage.error('复位失败: ' + (error.response?.data?.detail || error.message))
  } finally {
    loading.reset = false
  }
}

// 获取状态
async function fetchState() {
  try {
    const response = await axios.get(`${getApiBase()}/lift/state`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    
    if (response.data) {
      state.connected = response.data.connected ?? false
      state.enabled = response.data.enabled ?? false
      state.currentPosition = response.data.current_position ?? 0
      state.currentSpeed = response.data.current_speed ?? 20
      state.positionReached = response.data.position_reached ?? true
      state.alarm = response.data.alarm ?? false
    }
  } catch (error) {
    console.error('获取状态失败:', error)
    state.connected = false
  }
}

// 定时刷新状态
let stateInterval: number | null = null

onMounted(() => {
  fetchState()
  fetchLiftPoints()
  stateInterval = setInterval(fetchState, 500)
})

onUnmounted(() => {
  if (stateInterval) {
    clearInterval(stateInterval)
  }
  if (isManualMoving) {
    stopManualMove()
  }
})
</script>

<style scoped>
.lift-panel {
  padding: var(--spacing-lg);
}

.panel-section {
  margin-bottom: var(--spacing-sm);
}

.section-title {
  margin: 0 0 var(--spacing-md) 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* 状态可视化 */
.status-visual {
  display: flex;
  gap: var(--spacing-lg);
  padding: var(--spacing-md);
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: var(--radius-lg);
  transition: all 0.3s var(--transition-smooth);
}

.status-visual:hover {
  background: rgba(30, 41, 59, 0.6);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.height-column {
  display: flex;
  gap: var(--spacing-xs);
}

.height-track {
  width: 24px;
  height: 100px;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-sm);
  position: relative;
  border: 1px solid rgba(148, 163, 184, 0.2);
  overflow: hidden;
}

.height-fill {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, var(--color-primary), #fbbf24);
  transition: height 0.2s ease;
  box-shadow: 0 0 15px rgba(245, 158, 11, 0.4);
}

.height-indicator {
  position: absolute;
  left: -4px;
  right: -4px;
  height: 16px;
  background: linear-gradient(135deg, var(--color-primary), #fbbf24);
  border-radius: var(--radius-xs);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: bottom 0.2s ease;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.5);
  transform: translateY(50%);
}

.height-label {
  font-size: 9px;
  font-weight: 700;
  color: #fff;
}

.height-scale {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 9px;
  color: var(--color-text-tertiary);
  height: 100px;
  padding: 2px 0;
}

.status-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-xs) var(--spacing-sm);
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: var(--radius-sm);
}

.info-label {
  font-size: 11px;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.info-value {
  font-size: 12px;
  font-family: 'Consolas', monospace;
  color: #10b981;
  font-weight: 700;
}

/* 速度控制 */
.speed-control {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.unit {
  font-size: 12px;
  color: var(--color-text-tertiary);
}

/* 位置控制 */
.position-control {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.position-input {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.quick-positions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.quick-positions .el-button {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: 12px;
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(148, 163, 184, 0.2);
  transition: all 0.3s var(--transition-smooth);
}

.quick-positions .el-button:hover {
  background: rgba(30, 41, 59, 0.6);
  border-color: var(--color-primary);
  transform: translateY(-2px);
}

/* 手动控制 */
.manual-controls {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
}

.jog-btn {
  width: 100px;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
}

.jog-btn span {
  font-size: 12px;
  font-weight: 600;
}

.jog-hint {
  text-align: center;
  font-size: 11px;
  color: var(--color-text-tertiary);
  margin: var(--spacing-sm) 0 0 0;
}

:deep(.el-divider) {
  margin: var(--spacing-lg) 0;
  border-color: rgba(148, 163, 184, 0.2);
}

:deep(.el-alert) {
  padding: var(--spacing-sm) var(--spacing-md);
}

:deep(.el-alert .el-alert__title) {
  font-size: 12px;
}

:deep(.el-input-number--small) {
  width: auto;
}

/* 点位列表 */
.point-list {
  max-height: 300px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.empty-hint {
  text-align: center;
  padding: var(--spacing-xl);
  color: var(--color-text-tertiary);
  font-size: 12px;
}

.point-item {
  padding: var(--spacing-sm) var(--spacing-md);
  margin-bottom: 0;
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.3s var(--transition-smooth);
}

.point-item:hover {
  background: rgba(30, 41, 59, 0.6);
  border-color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.point-item.selected {
  background: rgba(245, 158, 11, 0.15);
  border-color: var(--color-primary);
  box-shadow: 0 0 20px rgba(245, 158, 11, 0.2);
}

.point-item.builtin {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.3);
}

.point-info {
  margin-bottom: var(--spacing-xs);
}

.point-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-xs);
}

.point-name .el-icon {
  color: var(--color-primary);
}

.point-value {
  font-size: 12px;
  color: #10b981;
  font-family: 'Consolas', monospace;
  font-weight: 700;
}

.point-desc {
  font-size: 11px;
  color: var(--color-text-tertiary);
  margin-top: var(--spacing-xs);
}

.point-actions {
  display: flex;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
}

.point-actions .el-button {
  padding: var(--spacing-xs) var(--spacing-xs);
  font-size: 11px;
}
</style>

