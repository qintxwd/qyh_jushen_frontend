<template>
  <div class="lift-panel">
    <!-- 报警提示 -->
    <div v-if="state.alarm" class="alert-compact">
      <el-alert title="电机报警" type="error" show-icon :closable="false">
        <template #default>
          <el-button type="danger" size="small" @click="resetAlarm" :loading="loading.reset">复位</el-button>
        </template>
      </el-alert>
    </div>

    <div class="panel-layout">
      <!-- 状态 + 控制区 -->
      <div class="top-section">
        <!-- 紧凑状态栏 -->
        <div class="status-compact">
          <div class="status-header">
            <h3>升降状态</h3>
            <div class="status-tags">
              <el-tag :type="state.connected ? 'success' : 'danger'" size="small">
                {{ state.connected ? '已连接' : '断开' }}
              </el-tag>
              <el-tag :type="state.enabled ? 'success' : 'info'" size="small">
                {{ state.enabled ? '使能' : '未使能' }}
              </el-tag>
              <el-tag :type="state.electromagnetOn ? 'success' : 'info'" size="small">
                {{ state.electromagnetOn ? '电磁铁开' : '电磁铁关' }}
              </el-tag>
            </div>
          </div>
          
          <div class="status-display">
            <div class="height-visual">
              <div class="height-track-mini">
                <div class="height-fill" :style="{ height: heightPercentage + '%' }"></div>
                <div class="height-indicator" :style="{ bottom: heightPercentage + '%' }">
                  <span>{{ state.currentPosition.toFixed(0) }}</span>
                </div>
              </div>
            </div>
            <div class="status-values">
              <div class="value-item">
                <span class="label">高度</span>
                <span class="value">{{ state.currentPosition.toFixed(1) }} mm</span>
              </div>
              <div class="value-item">
                <span class="label">速度</span>
                <span class="value">{{ state.currentSpeed.toFixed(0) }} mm/s</span>
              </div>
              <div class="value-item">
                <span class="label">状态</span>
                <el-tag :type="state.positionReached ? 'success' : 'warning'" size="small">
                  {{ state.positionReached ? '到位' : '运动中' }}
                </el-tag>
              </div>
            </div>
          </div>
        </div>

        <!-- 控制区 -->
        <div class="control-section">
          <div class="control-row">
            <el-button
              :type="state.enabled ? 'danger' : 'primary'"
              @click="toggleEnable"
              :loading="loading.enable"
              :disabled="!state.connected"
              size="small"
            >
              <SvgIcon v-if="state.enabled" name="disable" :size="14" />
              <SvgIcon v-else name="enable" :size="14" />
              {{ state.enabled ? '下使能' : '上使能' }}
            </el-button>
            <el-button
              :type="state.electromagnetOn ? 'warning' : 'info'"
              @click="toggleElectromagnet"
              :loading="loading.electromagnet"
              :disabled="!state.connected"
              size="small"
            >
              {{ state.electromagnetOn ? '关闭电磁铁' : '开启电磁铁' }}
            </el-button>
            <div class="speed-mini">
              <el-input-number
                v-model="inputSpeed"
                :min="1"
                :max="100"
                :step="5"
                size="small"
                :disabled="!state.connected || !state.enabled"
                style="width: 80px"
              />
              <span class="unit">mm/s</span>
              <el-button
                type="primary"
                size="small"
                @click="setSpeed"
                :loading="loading.speed"
                :disabled="!state.connected || !state.enabled"
              >设置</el-button>
            </div>
          </div>

          <div class="position-compact">
            <div class="position-input-row">
              <el-input-number
                v-model="inputPosition"
                :min="0"
                :max="maxHeight"
                :step="10"
                :precision="1"
                size="small"
                :disabled="!state.connected || !state.enabled"
                style="width: 90px"
              />
              <span class="unit">mm</span>
              <el-button
                type="success"
                size="small"
                @click="goToPosition"
                :loading="loading.position"
                :disabled="!state.connected || !state.enabled"
              >
                <SvgIcon name="execute-move" :size="14" />
                GO
              </el-button>
              <el-button
                type="danger"
                size="small"
                @click="stopMove"
                :loading="loading.stop"
                :disabled="!state.connected || !state.enabled"
              >
                STOP
              </el-button>
            </div>
            
            <div class="quick-positions-mini">
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

          <!-- 手动控制 -->
          <div class="manual-compact">
            <el-button
              type="success"
              size="small"
              class="jog-btn-mini"
              @mousedown="startManualMove('up')"
              @mouseup="stopManualMove"
              @mouseleave="stopManualMove"
              :disabled="!state.connected || !state.enabled"
            >
              <SvgIcon name="top" :size="16" />
              上升
            </el-button>
            <el-button
              type="warning"
              size="small"
              class="jog-btn-mini"
              @mousedown="startManualMove('down')"
              @mouseup="stopManualMove"
              @mouseleave="stopManualMove"
              :disabled="!state.connected || !state.enabled"
            >
              <SvgIcon name="bottom" :size="16" />
              下降
            </el-button>
          </div>
        </div>
      </div>

      <!-- 预设点位 -->
      <div class="bottom-section">
        <div class="points-header">
          <h3>预设点位</h3>
          <el-button type="primary" size="small" @click="handleAddPoint">
            <SvgIcon name="plus" :size="12" />
            添加点位
          </el-button>
        </div>
        
        <div class="point-grid">
          <div v-if="liftPoints.length === 0" class="empty-hint">暂无点位</div>
          
          <div 
            v-for="point in liftPoints" 
            :key="point.id"
            class="point-card"
            :class="{ builtin: point.is_builtin, selected: selectedPointId === point.id }"
            @click="selectedPointId = point.id"
          >
            <div class="point-header">
              <div class="point-name">
                <SvgIcon v-if="point.is_builtin" name="star" :size="14" />
                {{ point.name }}
              </div>
              <div class="point-value">{{ point.height }}mm</div>
            </div>
            <div class="point-footer">
              <el-button 
                type="success"
                size="small" 
                class="point-go-btn"
                @click.stop="goToPoint(point)"
              >
                <SvgIcon name="navigate-target" :size="14" />
                GO
              </el-button>
              <div class="point-actions" v-if="!point.is_builtin">
                <el-button text size="small" @click.stop="updatePointPosition(point)">
                  <SvgIcon name="refresh" :size="12" />
                </el-button>
                <el-button text size="small" @click.stop="openEditDialog(point)">
                  <SvgIcon name="edit" :size="12" />
                </el-button>
                <el-button text size="small" type="danger" @click.stop="deletePoint(point)">
                  <SvgIcon name="delete" :size="12" />
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
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
import apiClient from '@/api/client'

// 最大高度 (mm)
const maxHeight = 500

// 状态 - 对应 LiftState.msg
const state = reactive({
  connected: false,
  enabled: false,
  currentPosition: 0,
  currentSpeed: 20,
  positionReached: true,
  alarm: false,
  electromagnetOn: false
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
  stop: false,
  electromagnet: false
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
    const data = await apiClient.get('/api/v1/lift/points')
    liftPoints.value = data
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
    await apiClient.post('/api/v1/lift/points', newPointForm)
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
    await apiClient.put(`/api/v1/lift/points/${editPointForm.id}`, {
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
    
    await apiClient.delete(`/api/v1/lift/points/${point.id}`)
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
    
    await apiClient.put(`/api/v1/lift/points/${point.id}`, {
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
    return apiClient.post('/api/v1/lift/control', { command, value, hold })
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

// 切换电磁铁
async function toggleElectromagnet() {
  loading.electromagnet = true
  try {
    const enable = !state.electromagnetOn
    const result = await apiClient.post('/api/v1/lift/electromagnet', { enable })
    if (result?.success) {
      state.electromagnetOn = enable
      ElMessage.success(result.message || (enable ? '电磁铁已开启' : '电磁铁已关闭'))
    } else {
      ElMessage.error(result?.message || '电磁铁操作失败')
    }
  } catch (error: any) {
    ElMessage.error('电磁铁操作失败: ' + (error.response?.data?.detail || error.message))
  } finally {
    loading.electromagnet = false
  }
}

// 获取状态
async function fetchState() {
  try {
    const data = await apiClient.get('/api/v1/lift/state')
    
    if (data) {
      state.connected = data.connected ?? false
      state.enabled = data.enabled ?? false
      state.currentPosition = data.current_position ?? 0
      state.currentSpeed = data.current_speed ?? 20
      state.positionReached = data.position_reached ?? true
      state.alarm = data.alarm ?? false
      state.electromagnetOn = data.electromagnet_on ?? false
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
  padding: 16px;
  height: 100%;
  overflow: hidden;
}

.alert-compact {
  margin-bottom: 8px;
}

.alert-compact :deep(.el-alert) {
  padding: 8px 12px;
}

.panel-layout {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
}

.top-section {
  display: grid;
  grid-template-columns: minmax(240px, 320px) 1fr;
  gap: 16px;
}

.bottom-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 220px;
}

/* 紧凑状态栏 */
.status-compact {
  background: var(--color-surface, rgba(30, 41, 59, 0.4));
  border: 1px solid var(--color-border, rgba(148, 163, 184, 0.2));
  border-radius: 8px;
  padding: 12px;
}

.status-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.status-header h3 {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary, #e0e0e0);
  margin: 0;
}

.status-tags {
  display: flex;
  gap: 4px;
}

.status-display {
  display: flex;
  gap: 12px;
}

.height-visual {
  display: flex;
  align-items: center;
}

.height-track-mini {
  width: 20px;
  height: 80px;
  background: var(--color-bg-tertiary, rgba(15, 23, 42, 0.6));
  border-radius: 4px;
  position: relative;
  border: 1px solid var(--color-border, rgba(148, 163, 184, 0.2));
  overflow: hidden;
}

.height-fill {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, var(--color-primary), #fbbf24);
  transition: height 0.2s ease;
}

.height-indicator {
  position: absolute;
  left: -3px;
  right: -3px;
  height: 14px;
  background: linear-gradient(135deg, var(--color-primary), #fbbf24);
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: bottom 0.2s ease;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.5);
  transform: translateY(50%);
}

.height-indicator span {
  font-size: 8px;
  font-weight: 700;
  color: #fff;
}

.status-values {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.value-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  background: var(--color-bg-tertiary, rgba(15, 23, 42, 0.6));
  border-radius: 4px;
  border: 1px solid var(--color-border, rgba(148, 163, 184, 0.1));
}

.value-item .label {
  font-size: 12px;
  color: var(--color-text-muted, #888);
}

.value-item .value {
  font-size: 13px;
  font-family: 'Consolas', monospace;
  color: #10b981;
  font-weight: 600;
}

/* 控制区 */
.control-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.control-row {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.speed-mini {
  display: flex;
  gap: 6px;
  align-items: center;
  flex: 1;
}

.unit {
  font-size: 12px;
  color: var(--color-text-muted, #888);
}

.position-compact {
  background: var(--color-surface, rgba(30, 41, 59, 0.4));
  border: 1px solid var(--color-border, rgba(148, 163, 184, 0.2));
  border-radius: 6px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.position-input-row {
  display: flex;
  gap: 6px;
  align-items: center;
  flex-wrap: wrap;
}

.quick-positions-mini {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 6px;
}

.quick-positions-mini .el-button {
  padding: 8px 6px;
  font-size: 12px;
}

.manual-compact {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.jog-btn-mini {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 40px;
  font-size: 14px;
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

/* 点位网格 */
.points-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding: 0 4px;
}

.points-header h3 {
  font-size: 14px;
  font-weight: 600;
  color: #e0e0e0;
  margin: 0;
}

.point-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: min-content;
  align-content: start;
  gap: 12px;
  overflow-y: auto;
  padding: 6px;
  flex: 1;
}

.point-grid::-webkit-scrollbar {
  width: 6px;
}

.point-grid::-webkit-scrollbar-thumb {
  background: #555;
  border-radius: 3px;
}

.point-card {
  background: var(--color-surface, linear-gradient(135deg, rgba(30, 41, 59, 0.6), rgba(30, 41, 59, 0.4)));
  border: 1px solid var(--color-border, rgba(148, 163, 184, 0.3));
  border-radius: 10px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.point-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.15), transparent);
  transition: left 0.6s ease;
}

.point-card:hover {
  background: var(--color-surface-hover, linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(30, 41, 59, 0.6)));
  border-color: var(--color-primary);
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(245, 158, 11, 0.3);
}

.point-card:hover::before {
  left: 100%;
}

.point-card.selected {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(245, 158, 11, 0.15));
  border-color: var(--color-primary);
  box-shadow: 0 0 16px rgba(245, 158, 11, 0.4), inset 0 0 30px rgba(245, 158, 11, 0.1);
}

.point-card.builtin {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.1));
  border-color: rgba(59, 130, 246, 0.5);
}

.point-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.point-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-text-primary, #f0f0f0);
  display: flex;
  align-items: center;
  gap: 5px;
}

.point-value {
  font-size: 14px;
  color: #10b981;
  font-family: 'Consolas', monospace;
  font-weight: 700;
  background: rgba(16, 185, 129, 0.15);
  padding: 3px 8px;
  border-radius: 5px;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.point-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
}

.point-go-btn {
  flex: 1;
  padding: 8px 14px !important;
  height: 36px;
  font-weight: 700;
  font-size: 13px;
  background: linear-gradient(135deg, #10b981, #059669) !important;
  border: none !important;
  box-shadow: 0 3px 8px rgba(16, 185, 129, 0.4);
}

.point-go-btn:hover {
  background: linear-gradient(135deg, #059669, #047857) !important;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.6);
  transform: translateY(-2px);
}

.point-actions {
  display: flex;
  gap: 2px;
}

.point-actions .el-button {
  padding: 4px 6px;
  min-height: auto;
  opacity: 0.7;
}

.point-actions .el-button:hover {
  opacity: 1;
}
</style>

