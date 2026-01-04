<template>
  <div class="head-panel">
    <!-- 连接状态提示 -->
    <div v-if="!state.connected" class="panel-section">
      <el-alert
        title="头部舵机未连接"
        type="warning"
        description="未检测到头部舵机状态"
        show-icon
        :closable="false"
      />
    </div>

    <!-- 当前状态 -->
    <div class="panel-section">
      <h3 class="section-title">当前位置</h3>
      <div class="head-visual">
        <div class="head-avatar" :style="headStyle">
          <SvgIcon name="camera" :size="40" />
        </div>
        <div class="head-angles">
          <div class="angle-item">
            <span class="angle-label">水平 (Pan)</span>
            <span class="angle-value">{{ (state.panNormalized * 90).toFixed(1) }}°</span>
          </div>
          <div class="angle-item">
            <span class="angle-label">俯仰 (Tilt)</span>
            <span class="angle-value">{{ (state.tiltNormalized * 90).toFixed(1) }}°</span>
          </div>
        </div>
      </div>
    </div>

    <el-divider />

    <!-- 手动控制 -->
    <div class="panel-section">
      <h3 class="section-title">手动控制</h3>
      <div class="control-sliders">
        <div class="control-item">
          <div class="control-header">
            <span class="control-label">水平 Pan (左/右)</span>
            <span class="control-value">{{ (targetPan * 90).toFixed(0) }}°</span>
          </div>
          <el-slider 
            v-model="targetPan" 
            :min="-1" 
            :max="1"
            :step="0.05"
            size="small"
            :marks="panMarks"
          />
        </div>
        <div class="control-item">
          <div class="control-header">
            <span class="control-label">俯仰 Tilt (上/下)</span>
            <span class="control-value">{{ (targetTilt * 90).toFixed(0) }}°</span>
          </div>
          <el-slider 
            v-model="targetTilt" 
            :min="-1" 
            :max="1"
            :step="0.05"
            size="small"
            :marks="tiltMarks"
          />
        </div>
      </div>
      
      <div class="action-buttons">
        <el-button type="primary" @click="executeMove" :loading="loading">
          <SvgIcon name="position" :size="16" />
          执行
        </el-button>
        <el-button @click="resetHead" :loading="loadingReset">
          <SvgIcon name="aim" :size="16" />
          回正
        </el-button>
      </div>
    </div>

    <el-divider />

    <!-- 点位管理 -->
    <div class="panel-section">
      <h3 class="section-title">
        <SvgIcon name="star" :size="16" />
        保存的点位
      </h3>
      
      <!-- 点位列表 -->
      <div class="points-list" v-if="headPoints.length > 0">
        <div
          v-for="point in headPoints"
          :key="point.id"
          class="point-item"
          :class="{ selected: selectedPointId === point.id, builtin: point.is_builtin }"
          @click="selectedPointId = point.id"
        >
          <div class="point-info">
            <div class="point-name">
              <SvgIcon v-if="point.is_builtin" name="star" :size="14" class="builtin-icon" />
              {{ point.name }}
            </div>
            <div class="point-desc" v-if="point.description">{{ point.description }}</div>
            <div class="point-position">
              水平: {{ (point.pan * 100).toFixed(0) }}% | 上下: {{ (point.tilt * 100).toFixed(0) }}%
            </div>
          </div>
          <div class="point-actions">
            <el-button size="small" text @click.stop="goToPoint(point.id)">
              <SvgIcon name="position" :size="16" />
            </el-button>
            <el-button size="small" text @click.stop="openEditDialog(point)" v-if="!point.is_builtin">
              <SvgIcon name="edit" :size="16" />
            </el-button>
            <el-button size="small" text type="danger" @click.stop="deletePoint(point)" v-if="!point.is_builtin">
              <SvgIcon name="delete" :size="16" />
            </el-button>
          </div>
        </div>
      </div>
      <div class="empty-points" v-else>
        <SvgIcon name="star" :size="16" />
        <span>暂无保存的点位</span>
      </div>

      <!-- 点位操作 -->
      <div class="points-actions">
        <el-button type="primary" size="small" @click="handleAddPoint">
          <SvgIcon name="plus" :size="16" />
          采集当前位置
        </el-button>
        <el-button 
          type="success" 
          size="small" 
          @click="goToSelectedPoint"
          :disabled="!selectedPointId"
        >
          <SvgIcon name="position" :size="16" />
          前往选中点位
        </el-button>
      </div>

      <!-- 更新点位数据 -->
      <div class="update-point-section" v-if="selectedPointId && !isBuiltinPoint(selectedPointId)">
        <div class="update-label">更新选中点位的位置数据：</div>
        <el-button size="small" @click="updatePointPosition">
          <SvgIcon name="refresh" :size="16" />
          更新为当前位置
        </el-button>
      </div>
    </div>

    <el-divider />

    <!-- 预设位置 -->
    <div class="panel-section">
      <h3 class="section-title">快捷位置</h3>
      <div class="preset-grid">
        <div 
          v-for="preset in presets" 
          :key="preset.id"
          class="preset-item"
          @click="goToPreset(preset)"
        >
          <div class="preset-icon">
            <el-icon :size="20"><component :is="preset.icon" /></el-icon>
          </div>
          <span class="preset-name">{{ preset.name }}</span>
        </div>
      </div>
    </div>

    <!-- 添加点位对话框 -->
    <el-dialog v-model="addPointDialogVisible" title="采集头部点位" width="400px">
      <el-form :model="newPointForm" label-width="80px">
        <el-form-item label="点位名称">
          <el-input v-model="newPointForm.name" placeholder="请输入点位名称" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="newPointForm.description" type="textarea" :rows="2" placeholder="可选" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="addPointDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmAddPoint">确认采集</el-button>
      </template>
    </el-dialog>

    <!-- 编辑点位对话框 -->
    <el-dialog v-model="editPointDialogVisible" title="编辑点位" width="400px">
      <el-form :model="editPointForm" label-width="80px">
        <el-form-item label="点位名称">
          <el-input v-model="editPointForm.name" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="editPointForm.description" type="textarea" :rows="2" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editPointDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmEditPoint">保存</el-button>
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

const loading = ref(false)
const loadingReset = ref(false)

// 状态
const state = reactive({
  connected: false,
  panPosition: 500,
  tiltPosition: 500,
  panNormalized: 0,
  tiltNormalized: 0
})

// 目标值 (-1 到 1)
const targetPan = ref(0)
const targetTilt = ref(0)

// 滑块刻度
const panMarks = {
  '-1': '左',
  '0': '中',
  '1': '右'
}

const tiltMarks = {
  '-1': '下',
  '0': '中',
  '1': '上'
}

// 预设位置
const presets = [
  { id: 1, name: '正前方', icon: 'Aim', pan: 0, tilt: 0 },
  { id: 2, name: '左侧', icon: 'Back', pan: 0.7, tilt: 0 },
  { id: 3, name: '右侧', icon: 'Right', pan: -0.7, tilt: 0 },
  { id: 4, name: '向下', icon: 'Bottom', pan: 0, tilt: -0.5 },
  { id: 5, name: '向上', icon: 'Top', pan: 0, tilt: 0.5 },
  { id: 6, name: '左下', icon: 'BottomLeft', pan: 0.5, tilt: -0.3 }
]

// 头部可视化样式
const headStyle = computed(() => ({
  transform: `rotateX(${state.tiltNormalized * 30}deg) rotateY(${-state.panNormalized * 45}deg)`
}))

// 发送控制命令
async function sendControl(pan: number | null, tilt: number | null) {
  const response = await axios.post(
    `${getApiBase()}/head/control`,
    { pan, tilt },
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
  )
  return response.data
}

// 执行移动
async function executeMove() {
  loading.value = true
  try {
    const result = await sendControl(targetPan.value, targetTilt.value)
    if (result.success) {
      ElMessage.success('头部控制已执行')
    } else {
      ElMessage.error(result.message)
    }
  } catch (error: any) {
    ElMessage.error('控制失败: ' + (error.response?.data?.detail || error.message))
  } finally {
    loading.value = false
  }
}

// 回正
async function resetHead() {
  loadingReset.value = true
  try {
    const response = await axios.post(
      `${getApiBase()}/head/reset`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    if (response.data.success) {
      targetPan.value = 0
      targetTilt.value = 0
      ElMessage.success('头部已回正')
    } else {
      ElMessage.error(response.data.message)
    }
  } catch (error: any) {
    ElMessage.error('回正失败: ' + (error.response?.data?.detail || error.message))
  } finally {
    loadingReset.value = false
  }
}

// 去预设位置
function goToPreset(preset: { name: string; pan: number; tilt: number }) {
  targetPan.value = preset.pan
  targetTilt.value = preset.tilt
  executeMove()
}

// 获取状态
async function fetchState() {
  try {
    const response = await axios.get(`${getApiBase()}/head/state`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      timeout: 2000
    })
    
    if (response.data) {
      state.connected = response.data.connected ?? false
      state.panPosition = response.data.pan_position ?? 500
      state.tiltPosition = response.data.tilt_position ?? 500
      state.panNormalized = response.data.pan_normalized ?? 0
      state.tiltNormalized = response.data.tilt_normalized ?? 0
    }
  } catch (error) {
    console.error('获取头部状态失败:', error)
    state.connected = false
  }
}

// 定时刷新状态
let stateInterval: number | null = null

// ==================== 点位管理 ====================
interface HeadPoint {
  id: string
  name: string
  description: string
  pan: number
  tilt: number
  is_builtin: boolean
}

const headPoints = ref<HeadPoint[]>([])
const selectedPointId = ref<string>('')
const addPointDialogVisible = ref(false)
const editPointDialogVisible = ref(false)

const newPointForm = reactive({
  name: '',
  description: '',
  pan: 0,
  tilt: 0
})

const editPointForm = reactive({
  id: '',
  name: '',
  description: '',
  pan: 0,
  tilt: 0
})

// 获取点位列表
const fetchHeadPoints = async () => {
  try {
    const response = await axios.get(`${getApiBase()}/head/points`)
    headPoints.value = response.data
  } catch (error) {
    console.error('获取头部点位列表失败:', error)
    ElMessage.error('获取点位列表失败')
  }
}

// 打开添加点位对话框
const handleAddPoint = () => {
  // 使用当前位置作为默认值
  newPointForm.name = ''
  newPointForm.description = ''
  newPointForm.pan = state.panNormalized
  newPointForm.tilt = state.tiltNormalized
  addPointDialogVisible.value = true
}

// 确认添加点位
const confirmAddPoint = async () => {
  if (!newPointForm.name.trim()) {
    ElMessage.warning('请输入点位名称')
    return
  }
  
  try {
    await axios.post(`${getApiBase()}/head/points`, newPointForm)
    ElMessage.success('点位添加成功')
    addPointDialogVisible.value = false
    await fetchHeadPoints()
  } catch (error: any) {
    console.error('添加点位失败:', error)
    ElMessage.error(error.response?.data?.detail || '添加点位失败')
  }
}

// 打开编辑点位对话框
const openEditDialog = (point: HeadPoint) => {
  if (point.is_builtin) {
    ElMessage.warning('内置点位无法编辑')
    return
  }
  
  editPointForm.id = point.id
  editPointForm.name = point.name
  editPointForm.description = point.description
  editPointForm.pan = point.pan
  editPointForm.tilt = point.tilt
  editPointDialogVisible.value = true
}

// 确认编辑点位
const confirmEditPoint = async () => {
  if (!editPointForm.name.trim()) {
    ElMessage.warning('请输入点位名称')
    return
  }
  
  try {
    await axios.put(`${getApiBase()}/head/points/${editPointForm.id}`, {
      name: editPointForm.name,
      description: editPointForm.description,
      pan: editPointForm.pan,
      tilt: editPointForm.tilt
    })
    ElMessage.success('点位更新成功')
    editPointDialogVisible.value = false
    await fetchHeadPoints()
  } catch (error: any) {
    console.error('更新点位失败:', error)
    ElMessage.error(error.response?.data?.detail || '更新点位失败')
  }
}

// 删除点位
const deletePoint = async (point: HeadPoint) => {
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
    
    await axios.delete(`${getApiBase()}/head/points/${point.id}`)
    ElMessage.success('点位删除成功')
    if (selectedPointId.value === point.id) {
      selectedPointId.value = ''
    }
    await fetchHeadPoints()
  } catch (error: any) {
    if (error !== 'cancel') {
      console.error('删除点位失败:', error)
      ElMessage.error(error.response?.data?.detail || '删除点位失败')
    }
  }
}

// 前往指定点位
const goToPoint = async (point: HeadPoint) => {
  loading.value = true
  try {
    targetPan.value = point.pan
    targetTilt.value = point.tilt
    await executeMove()
    ElMessage.success(`已前往点位: ${point.name}`)
  } catch (error: any) {
    console.error('前往点位失败:', error)
    ElMessage.error(error.response?.data?.detail || '前往点位失败')
  } finally {
    loading.value = false
  }
}

// 前往选中的点位
const goToSelectedPoint = () => {
  const point = headPoints.value.find(p => p.id === selectedPointId.value)
  if (point) {
    goToPoint(point)
  }
}

// 使用当前位置更新点位
const updatePointPosition = async (point: HeadPoint) => {
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
    
    await axios.put(`${getApiBase()}/head/points/${point.id}`, {
      name: point.name,
      description: point.description,
      pan: state.panNormalized,
      tilt: state.tiltNormalized
    })
    ElMessage.success('点位位置已更新')
    await fetchHeadPoints()
  } catch (error: any) {
    if (error !== 'cancel') {
      console.error('更新点位失败:', error)
      ElMessage.error(error.response?.data?.detail || '更新点位失败')
    }
  }
}

// 判断是否是内置点位
const isBuiltinPoint = (point: HeadPoint) => point.is_builtin

onMounted(() => {
  fetchState()
  fetchHeadPoints()  // 加载点位列表
  stateInterval = setInterval(fetchState, 500)
})

onUnmounted(() => {
  if (stateInterval) {
    clearInterval(stateInterval)
  }
})
</script>

<style scoped>
.head-panel {
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
}

.head-visual {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: var(--radius-lg);
  transition: all 0.3s var(--transition-smooth);
}

.head-visual:hover {
  background: rgba(30, 41, 59, 0.6);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.head-avatar {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--color-primary) 0%, #fbbf24 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition: transform 0.3s ease;
  perspective: 100px;
  box-shadow: 0 0 20px rgba(245, 158, 11, 0.3);
}

.head-angles {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.angle-item {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-sm) var(--spacing-md);
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: var(--radius-md);
}

.angle-label {
  font-size: 12px;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.angle-value {
  font-size: 14px;
  font-family: 'Consolas', monospace;
  color: #10b981;
  font-weight: 700;
}

.control-sliders {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.control-item {
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(148, 163, 184, 0.15);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  transition: all 0.3s var(--transition-smooth);
}

.control-item:hover {
  background: rgba(30, 41, 59, 0.5);
  border-color: rgba(148, 163, 184, 0.25);
}

.control-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-sm);
}

.control-label {
  font-size: 12px;
  color: var(--color-text-secondary);
  font-weight: 600;
}

.control-value {
  font-size: 12px;
  font-family: 'Consolas', monospace;
  color: var(--color-primary);
  font-weight: 700;
}

.action-buttons {
  display: flex;
  gap: var(--spacing-md);
}

.action-buttons .el-button {
  flex: 1;
}

.preset-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-sm);
}

.preset-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-md) var(--spacing-sm);
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.3s var(--transition-smooth);
}

.preset-item:hover {
  background: rgba(30, 41, 59, 0.6);
  border-color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.preset-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(148, 163, 184, 0.15);
  border-radius: 50%;
  color: var(--color-primary);
  transition: all 0.3s;
}

.preset-item:hover .preset-icon {
  background: rgba(245, 158, 11, 0.15);
  border-color: var(--color-primary);
  box-shadow: 0 0 15px rgba(245, 158, 11, 0.3);
}

.preset-name {
  font-size: 11px;
  color: var(--color-text-primary);
  text-align: center;
  font-weight: 500;
}

/* 点位管理样式 */
.points-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  max-height: 300px;
  overflow-y: auto;
}

.point-item {
  padding: var(--spacing-md);
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
}

.point-info {
  margin-bottom: var(--spacing-sm);
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

.builtin-icon {
  color: var(--color-primary);
}

.point-desc {
  font-size: 11px;
  color: var(--color-text-tertiary);
  margin-top: var(--spacing-xs);
}

.point-position {
  font-size: 11px;
  color: var(--color-text-secondary);
  font-family: 'Consolas', monospace;
  margin-top: var(--spacing-xs);
}

.point-actions {
  display: flex;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
}

.empty-points {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-xl);
  color: var(--color-text-tertiary);
  font-size: 12px;
}

.points-actions {
  display: flex;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
}

.update-point-section {
  margin-top: var(--spacing-md);
  padding: var(--spacing-md);
  background: rgba(59, 130, 246, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: var(--radius-md);
}

.update-label {
  font-size: 12px;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-sm);
}

:deep(.el-divider) {
  margin: var(--spacing-lg) 0;
  border-color: rgba(148, 163, 184, 0.2);
}

:deep(.el-slider__marks-text) {
  font-size: 10px;
  color: var(--color-text-tertiary);
}

:deep(.el-alert) {
  padding: var(--spacing-sm) var(--spacing-md);
}

:deep(.el-alert .el-alert__title) {
  font-size: 12px;
}
</style>
