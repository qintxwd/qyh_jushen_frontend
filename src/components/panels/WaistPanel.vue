<template>
  <div class="waist-panel">
    <!-- 报警提示 -->
    <div v-if="state.alarm" class="alert-compact">
      <el-alert title="电机报警" type="error" show-icon :closable="false">
        <template #default>
          <el-button type="danger" size="small" @click="resetAlarm" :loading="loading.reset">复位</el-button>
        </template>
      </el-alert>
    </div>

    <div class="panel-layout">
      <!-- 状�?+ 控制�?-->
      <div class="top-section">
        <!-- 状态栏 -->
        <div class="status-compact">
          <div class="status-row">
            <div class="status-visual-mini">
              <div class="angle-display">
                <div class="body-base-mini"></div>
                <div class="body-torso-mini" :style="{ transform: `rotate(${-state.currentAngle}deg)` }">
                  <div class="torso-line-mini"></div>
                  <div class="torso-head-mini"></div>
                </div>
              </div>
              <div class="angle-value">{{ state.currentAngle.toFixed(1) }}°</div>
            </div>

            <div class="status-info-compact">
              <div class="info-item">
                <span class="label">连接</span>
                <el-tag :type="state.connected ? 'success' : 'danger'" size="small">
                  {{ state.connected ? '已连�? : '断开' }}
                </el-tag>
              </div>
              <div class="info-item">
                <span class="label">使能</span>
                <el-tag :type="state.enabled ? 'success' : 'info'" size="small">
                  {{ state.enabled ? '使能' : '未使�? }}
                </el-tag>
              </div>
              <div class="info-item">
                <span class="label">角度</span>
                <span class="value">{{ state.currentAngle.toFixed(1) }}°</span>
              </div>
              <div class="info-item">
                <span class="label">速度</span>
                <span class="value">{{ state.currentSpeed }}</span>
              </div>
              <div class="info-item">
                <span class="label">状�?/span>
                <el-tag :type="state.positionReached ? 'success' : 'warning'" size="small">
                  {{ state.positionReached ? '到位' : '运动�? }}
                </el-tag>
              </div>
            </div>
          </div>
        </div>

        <!-- 控制�?-->
        <div class="control-compact">
          <!-- 使能 + 速度 -->
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
              {{ state.enabled ? '下使�? : '上使�? }}
            </el-button>
            <div class="speed-mini">
              <el-input-number
                v-model="inputSpeed"
                :min="100"
                :max="5000"
                :step="100"
                size="small"
                :disabled="!state.connected || !state.enabled"
                style="width: 90px"
              />
              <el-button
                type="primary"
                size="small"
                @click="setSpeed"
                :loading="loading.speed"
                :disabled="!state.connected || !state.enabled"
              >设置速度</el-button>
            </div>
          </div>

          <!-- 角度控制 -->
          <div class="angle-control-compact">
            <div class="slider-row">
              <el-slider
                v-model="inputAngle"
                :min="0"
                :max="45"
                :step="1"
                :disabled="!state.connected || !state.enabled"
                show-input
                :show-input-controls="false"
                input-size="small"
                style="flex: 1"
              />
              <span class="unit">°</span>
            </div>
            <div class="angle-buttons">
              <el-button
                type="success"
                size="small"
                @click="goToAngle"
                :loading="loading.angle"
                :disabled="!state.connected || !state.enabled"
              >
                <SvgIcon name="execute-move" :size="14" />
                GO
              </el-button>
              <el-button
                type="primary"
                size="small"
                @click="goUpright"
                :loading="loading.upright"
                :disabled="!state.connected || !state.enabled"
              >
                <SvgIcon name="home-position" :size="14" />
                回正
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
            
            <!-- 快捷角度 -->
            <div class="quick-angles-mini">
              <el-button
                v-for="pos in quickAngles"
                :key="pos.value"
                size="small"
                @click="setQuickAngle(pos.value)"
                :disabled="!state.connected || !state.enabled"
              >
                {{ pos.label }}
              </el-button>
            </div>
          </div>

          <!-- 手动控制 -->
          <div class="manual-compact">
            <el-button
              type="warning"
              size="small"
              class="jog-btn-mini"
              @mousedown="startManualMove('forward')"
              @mouseup="stopManualMove"
              @mouseleave="stopManualMove"
              @touchstart.prevent="startManualMove('forward')"
              @touchend.prevent="stopManualMove"
              @touchcancel.prevent="stopManualMove"
              :disabled="!state.connected || !state.enabled"
            >
              <SvgIcon name="top" :size="16" />
              前�?
            </el-button>
            <el-button
              type="success"
              size="small"
              class="jog-btn-mini"
              @mousedown="startManualMove('back')"
              @mouseup="stopManualMove"
              @mouseleave="stopManualMove"
              @touchstart.prevent="startManualMove('back')"
              @touchend.prevent="stopManualMove"
              @touchcancel.prevent="stopManualMove"
              :disabled="!state.connected || !state.enabled"
            >
              <SvgIcon name="bottom" :size="16" />
              后仰
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
          <div v-if="waistPoints.length === 0" class="empty-hint">暂无点位</div>
          
          <div 
            v-for="point in waistPoints" 
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
              <div class="point-value">{{ point.angle }}°</div>
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
                <el-button text size="small" @click.stop="updatePointAngle(point)">
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
    
    <!-- 添加点位对话�?-->
    <el-dialog
      v-model="addPointDialogVisible"
      title="添加腰部点位"
      width="400px"
    >
      <el-form label-width="80px">
        <el-form-item label="点位名称">
          <el-input v-model="newPointForm.name" placeholder="请输入点位名�? />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="newPointForm.description" placeholder="可�? />
        </el-form-item>
        <el-form-item label="角度">
          <el-input-number
            v-model="newPointForm.angle"
            :min="0"
            :max="45"
            :step="1"
            style="width: 100%"
          />
          <span class="unit" style="margin-left: 8px">° (当前: {{ state.currentAngle.toFixed(1) }}°)</span>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="addPointDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmAddPoint">确定</el-button>
      </template>
    </el-dialog>

    <!-- 编辑点位对话�?-->
    <el-dialog
      v-model="editPointDialogVisible"
      title="编辑腰部点位"
      width="400px"
    >
      <el-form label-width="80px">
        <el-form-item label="点位名称">
          <el-input v-model="editPointForm.name" placeholder="请输入点位名�? />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="editPointForm.description" placeholder="可�? />
        </el-form-item>
        <el-form-item label="角度">
          <el-input-number
            v-model="editPointForm.angle"
            :min="0"
            :max="45"
            :step="1"
            style="width: 100%"
          />
          <span class="unit" style="margin-left: 8px">°</span>
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

// 最大角�?
const maxAngle = 45

// 状�?- 对应 WaistState
const state = reactive({
  connected: false,
  enabled: false,
  currentPosition: 230715,
  currentAngle: 0,
  currentSpeed: 1000,
  positionReached: true,
  alarm: false
})

// 输入�?
const inputSpeed = ref(1000)
const inputAngle = ref(0)

// 加载状�?
const loading = reactive({
  enable: false,
  speed: false,
  angle: false,
  upright: false,
  reset: false,
  stop: false
})

// 快捷角度
const quickAngles = [
  { label: '竖直', value: 0 },
  { label: '15°', value: 15 },
  { label: '30°', value: 30 },
  { label: '45°', value: 45 }
]

// 手动移动状�?
let isManualMoving = false

// ==================== 点位管理 ====================
interface WaistPoint {
  id: string
  name: string
  description: string
  angle: number
  is_builtin: boolean
}

const waistPoints = ref<WaistPoint[]>([])
const selectedPointId = ref<string>('')
const addPointDialogVisible = ref(false)
const editPointDialogVisible = ref(false)

const newPointForm = reactive({
  name: '',
  description: '',
  angle: 0
})

const editPointForm = reactive({
  id: '',
  name: '',
  description: '',
  angle: 0
})

// 获取点位列表
async function fetchWaistPoints() {
  try {
    const data = await apiClient.get(`/api/v1/waist/points`)
    waistPoints.value = data.points || data || []
  } catch (error) {
    console.error('获取腰部点位列表失败:', error)
  }
}

// 打开添加点位对话�?
function handleAddPoint() {
  newPointForm.name = ''
  newPointForm.description = ''
  newPointForm.angle = state.currentAngle
  addPointDialogVisible.value = true
}

// 确认添加点位
async function confirmAddPoint() {
  if (!newPointForm.name.trim()) {
    ElMessage.warning('请输入点位名�?)
    return
  }
  
  try {
    await apiClient.post(`/api/v1/waist/points`, newPointForm)
    ElMessage.success('点位添加成功')
    addPointDialogVisible.value = false
    await fetchWaistPoints()
  } catch (error: any) {
    console.error('添加点位失败:', error)
    ElMessage.error(error.response?.data?.detail || '添加点位失败')
  }
}

// 打开编辑点位对话�?
function openEditDialog(point: WaistPoint) {
  if (point.is_builtin) {
    ElMessage.warning('内置点位无法编辑')
    return
  }
  
  editPointForm.id = point.id
  editPointForm.name = point.name
  editPointForm.description = point.description
  editPointForm.angle = point.angle
  editPointDialogVisible.value = true
}

// 确认编辑点位
async function confirmEditPoint() {
  if (!editPointForm.name.trim()) {
    ElMessage.warning('请输入点位名�?)
    return
  }
  
  try {
    await apiClient.put(`/api/v1/waist/points/${editPointForm.id}`, {
      name: editPointForm.name,
      description: editPointForm.description,
      angle: editPointForm.angle
    })
    ElMessage.success('点位更新成功')
    editPointDialogVisible.value = false
    await fetchWaistPoints()
  } catch (error: any) {
    console.error('更新点位失败:', error)
    ElMessage.error(error.response?.data?.detail || '更新点位失败')
  }
}

// 删除点位
async function deletePoint(point: WaistPoint) {
  if (point.is_builtin) {
    ElMessage.warning('内置点位无法删除')
    return
  }
  
  try {
    await ElMessageBox.confirm(
      `确定要删除点�?"${point.name}" 吗？`,
      '删除确认',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    await apiClient.delete(`/api/v1/waist/points/${point.id}`)
    ElMessage.success('点位删除成功')
    if (selectedPointId.value === point.id) {
      selectedPointId.value = ''
    }
    await fetchWaistPoints()
  } catch (error: any) {
    if (error !== 'cancel') {
      console.error('删除点位失败:', error)
      ElMessage.error(error.response?.data?.detail || '删除点位失败')
    }
  }
}

// 前往指定点位
async function goToPoint(point: WaistPoint) {
  inputAngle.value = point.angle
  await goToAngle()
}

// 使用当前角度更新点位
async function updatePointAngle(point: WaistPoint) {
  if (point.is_builtin) {
    ElMessage.warning('内置点位无法更新')
    return
  }
  
  try {
    await ElMessageBox.confirm(
      `确定要将点位 "${point.name}" 更新为当前角度吗？`,
      '更新确认',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }
    )
    
    await apiClient.put(`/api/v1/waist/points/${point.id}`, {
      name: point.name,
      description: point.description,
      angle: state.currentAngle
    })
    ElMessage.success('点位角度已更�?)
    await fetchWaistPoints()
  } catch (error: any) {
    if (error !== 'cancel') {
      console.error('更新点位失败:', error)
      ElMessage.error(error.response?.data?.detail || '更新点位失败')
    }
  }
}

// 命令常量 - 对应 WaistControl.srv
const CMD = {
  ENABLE: 1,
  DISABLE: 2,
  SET_SPEED: 3,
  GO_POSITION: 4,
  GO_ANGLE: 5,
  LEAN_FORWARD: 6,
  LEAN_BACK: 7,
  RESET_ALARM: 8,
  STOP: 9,
  GO_UPRIGHT: 10
}

// 发送控制命�?
async function sendCommand(command: number, value: number = 0, hold: boolean = false) {
  try {
    return apiClient.post('/api/v1/waist/control', { command, value, hold })
  } catch (error: any) {
    console.error('Waist control error:', error)
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

// 去目标角�?
async function goToAngle() {
  loading.angle = true
  try {
    const result = await sendCommand(CMD.GO_ANGLE, inputAngle.value)
    if (result.success) {
      ElMessage.success('开始移�?)
    } else {
      ElMessage.error(result.message)
    }
  } catch (error: any) {
    ElMessage.error('操作失败: ' + (error.response?.data?.detail || error.message))
  } finally {
    loading.angle = false
  }
}

// 回到竖直位置
async function goUpright() {
  loading.upright = true
  try {
    const result = await sendCommand(CMD.GO_UPRIGHT)
    if (result.success) {
      ElMessage.success('回到竖直位置')
    } else {
      ElMessage.error(result.message)
    }
  } catch (error: any) {
    ElMessage.error('操作失败: ' + (error.response?.data?.detail || error.message))
  } finally {
    loading.upright = false
  }
}

// 停止运动
async function stopMove() {
  loading.stop = true
  try {
    const result = await sendCommand(CMD.STOP)
    if (result.success) {
      ElMessage.warning('运动已停�?)
    } else {
      ElMessage.error(result.message)
    }
  } catch (error: any) {
    ElMessage.error('停止失败: ' + (error.response?.data?.detail || error.message))
  } finally {
    loading.stop = false
  }
}

// 设置快捷角度
function setQuickAngle(value: number) {
  inputAngle.value = value
  goToAngle()
}

// 开始手动移�?
async function startManualMove(direction: 'forward' | 'back') {
  if (!state.enabled || !state.connected || isManualMoving) return
  
  isManualMoving = true
  try {
    const command = direction === 'forward' ? CMD.LEAN_FORWARD : CMD.LEAN_BACK
    await sendCommand(command, 0, true)  // hold=true 开始运�?
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
    await sendCommand(CMD.LEAN_FORWARD, 0, false)  // hold=false 停止运动
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
      ElMessage.success('报警已复�?)
    } else {
      ElMessage.error(result.message)
    }
  } catch (error: any) {
    ElMessage.error('复位失败: ' + (error.response?.data?.detail || error.message))
  } finally {
    loading.reset = false
  }
}

// 获取状�?
async function fetchState() {
  try {
    const data = await apiClient.get(`/api/v1/waist/state`)
    
    if (data) {
      state.connected = data.connected ?? false
      state.enabled = data.enabled ?? false
      state.currentPosition = data.current_position ?? 230715
      state.currentAngle = data.current_angle ?? 0
      state.currentSpeed = data.current_speed ?? 1000
      state.positionReached = data.position_reached ?? true
      state.alarm = data.alarm ?? false
    }
  } catch (error) {
    console.error('获取状态失�?', error)
    state.connected = false
  }
}

// 定时刷新状�?
let stateInterval: number | null = null

onMounted(() => {
  fetchState()
  fetchWaistPoints()
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
.waist-panel {
  padding: 14px;
  height: 100%;
  overflow: hidden;
}

.alert-compact {
  margin-bottom: 10px;
}

.alert-compact :deep(.el-alert) {
  padding: 10px 14px;
}

.panel-layout {
  display: flex;
  flex-direction: column;
  gap: 14px;
  height: calc(100% - 50px);
}

.top-section {
  display: grid;
  grid-template-columns: minmax(220px, 280px) 1fr;
  gap: 14px;
  align-items: start;
}

.bottom-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
}

/* 紧凑状态栏 */
.status-compact {
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 8px;
  padding: 12px;
}

.status-row {
  display: flex;
  gap: 14px;
}

.status-visual-mini {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.angle-display {
  width: 72px;
  height: 84px;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: rgba(15, 23, 42, 0.3);
  border-radius: 6px;
  border: 1px solid rgba(148, 163, 184, 0.1);
}

.body-base-mini {
  position: absolute;
  bottom: 4px;
  width: 36px;
  height: 16px;
  background: rgba(148, 163, 184, 0.3);
  border-radius: 3px;
  border: 1px solid rgba(148, 163, 184, 0.2);
}

.body-torso-mini {
  position: absolute;
  bottom: 16px;
  width: 4px;
  height: 52px;
  transform-origin: bottom center;
  transition: transform 0.3s ease;
}

.torso-line-mini {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 4px;
  height: 44px;
  background: linear-gradient(to top, var(--color-primary), #fbbf24);
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.4);
}

.torso-head-mini {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 14px;
  height: 14px;
  background: linear-gradient(135deg, var(--color-primary), #fbbf24);
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(245, 158, 11, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.angle-value {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-primary);
}

.status-info-compact {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 10px;
  background: rgba(15, 23, 42, 0.6);
  border-radius: 4px;
  border: 1px solid rgba(148, 163, 184, 0.1);
}

.info-item .label {
  font-size: 12px;
  color: #888;
}

.info-item .value {
  font-size: 12px;
  font-family: 'Consolas', monospace;
  color: #10b981;
  font-weight: 600;
}

/* 控制�?*/
.control-compact {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.control-row {
  display: flex;
  gap: 10px;
  align-items: center;
}

.speed-mini {
  display: flex;
  gap: 6px;
  align-items: center;
  flex: 1;
}

.angle-control-compact {
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 6px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.slider-row {
  display: flex;
  gap: 8px;
  align-items: center;
}

.unit {
  font-size: 12px;
  color: #888;
  min-width: 15px;
}

.angle-buttons {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

.quick-angles-mini {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.quick-angles-mini .el-button {
  padding: 6px;
  font-size: 12px;
  height: 32px;
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
  font-size: 13px;
}

:deep(.el-slider) {
  --el-slider-main-bg-color: var(--color-primary);
  --el-slider-runway-bg-color: rgba(15, 23, 42, 0.6);
  --el-slider-button-wrapper-size: 36px;
  --el-slider-button-size: 16px;
}

:deep(.el-slider__bar) {
  background: linear-gradient(90deg, var(--color-primary), #fbbf24);
}

:deep(.el-slider__button) {
  border: 2px solid var(--color-primary);
  background: rgba(15, 23, 42, 0.9);
  box-shadow: 0 0 8px rgba(245, 158, 11, 0.4);
}

/* 点位网格 */
.points-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 0 6px;
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
  gap: 12px;
  overflow-y: auto;
  padding: 6px;
}

.point-grid::-webkit-scrollbar {
  width: 6px;
}

.point-grid::-webkit-scrollbar-thumb {
  background: #555;
  border-radius: 3px;
}

.point-card {
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.6), rgba(30, 41, 59, 0.4));
  border: 1px solid rgba(148, 163, 184, 0.3);
  border-radius: 10px;
  padding: 14px;
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
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(30, 41, 59, 0.6));
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
  color: #f0f0f0;
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
  padding: 6px 8px;
  min-height: auto;
  opacity: 0.7;
}

.waist-panel :deep(.el-button--small) {
  height: 36px;
  padding: 0 14px;
  font-size: 13px;
}

.waist-panel :deep(.el-input-number--small) {
  height: 34px;
}

.waist-panel :deep(.el-tag--small) {
  height: 24px;
  font-size: 12px;
}

.point-actions .el-button:hover {
  opacity: 1;
}
</style>


