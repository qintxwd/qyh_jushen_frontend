<template>
  <div class="property-panel" v-if="selectedNode && nodeDefinition">
    <div class="panel-header">
      <div class="header-title">
        <el-icon :size="18" :style="{ color: selectedNode.data?.color }">
          <component :is="selectedNode.data?.icon" />
        </el-icon>
        <span>{{ nodeDefinition.name }}</span>
      </div>
      <el-button text size="small" @click="emit('delete')">
        <SvgIcon name="delete" :size="16" />
      </el-button>
    </div>
    
    <div class="panel-body">
      <el-form 
        ref="formRef"
        :model="formData" 
        label-position="top" 
        size="small"
        @submit.prevent
      >
        <!-- 节点类型（只读） -->
        <el-form-item label="节点类型">
          <el-input :model-value="nodeDefinition.type" disabled />
        </el-form-item>
        
        <!-- 节点 ID（只读） -->
        <el-form-item label="节点 ID">
          <el-input :model-value="selectedNode.id" disabled />
        </el-form-item>
        
        <el-divider />
        
        <!-- 动态参数表单 -->
        <template v-for="param in nodeDefinition.params" :key="param.name">
          <el-form-item 
            :label="param.label"
            :required="param.required"
          >
            <!-- 选择器 -->
            <el-select
              v-if="param.type === 'select'"
              v-model="formData[param.name]"
              :placeholder="`选择${param.label}`"
              @change="onParamChange"
            >
              <el-option
                v-for="opt in param.options"
                :key="opt.value"
                :label="opt.label"
                :value="opt.value"
              />
            </el-select>
            
            <!-- 预设选择器 -->
            <div v-else-if="param.type === 'preset'">
              <el-select
                v-model="formData[param.name]"
                :placeholder="`选择${param.label}`"
                filterable
                clearable
                @change="(value) => onPresetChange(param.name, value, param.presetType)"
              >
                <el-option
                  v-for="preset in getPresets(param.presetType!)"
                  :key="preset.id"
                  :label="preset.name"
                  :value="preset.id"
                />
              </el-select>
              <!-- 显示选中的预设名称 -->
              <div v-if="formData[param.name]" class="preset-display">
                已选择: {{ getPresetName(param.presetType!, formData[param.name]) }}
              </div>
            </div>
            
            <!-- 数字输入 -->
            <el-input-number
              v-else-if="param.type === 'number'"
              v-model="formData[param.name]"
              :min="param.min"
              :max="param.max"
              :step="param.step || 1"
              :precision="getPrecision(param.step)"
              controls-position="right"
              @change="onParamChange"
            />
            
            <!-- 布尔开关 -->
            <el-switch
              v-else-if="param.type === 'boolean'"
              v-model="formData[param.name]"
              @change="onParamChange"
            />
            
            <!-- 文本输入 -->
            <el-input
              v-else
              v-model="formData[param.name]"
              :placeholder="`输入${param.label}`"
              @change="onParamChange"
            />
            
            <!-- 参数说明 -->
            <div v-if="param.name === 'condition'" class="param-hint">
              格式: variable operator value (如: arm.is_idle == True)
            </div>
          </el-form-item>
        </template>
        
        <template v-if="nodeDefinition.params.length === 0">
          <div class="no-params-hint">
            <SvgIcon name="infofilled" :size="16" />
            此节点没有可配置参数
          </div>
        </template>
      </el-form>
    </div>
    
    <div class="panel-footer">
      <el-button type="danger" size="small" @click="emit('delete')">
        <SvgIcon name="delete" :size="16" />
        删除节点
      </el-button>
    </div>
  </div>
  
  <div class="property-panel empty" v-else>
    <div class="empty-content">
      <SvgIcon name="setting" :size="48" />
      <p>选择节点以编辑属性</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'
import { ref, computed, watch, reactive, onMounted } from 'vue'
import type { FlowNode } from '@/stores/task'
import type { NodeDefinition } from '@/api/task'
import { listPresets, listTasks, listHeadPoints, listLiftPoints, listWaistPoints } from '@/api/task'
import { useTaskEditorStore } from '@/stores/task'

const props = defineProps<{
  selectedNode: FlowNode | null
  nodeDefinition: NodeDefinition | null
}>()

const emit = defineEmits<{
  (e: 'update-params', params: Record<string, any>): void
  (e: 'delete'): void
}>()

const taskStore = useTaskEditorStore()

// 表单数据
const formData = reactive<Record<string, any>>({})

// 预设缓存
const presetsCache = ref<Record<string, any[]>>({})

// 监听选中节点变化，更新表单数据
watch(
  () => props.selectedNode,
  (node) => {
    if (node && node.data) {
      // 清空并重新填充
      Object.keys(formData).forEach(key => delete formData[key])
      Object.assign(formData, { ...node.data.params })

      // 检查并在没有具体值时加载预设详情
      if (props.nodeDefinition) {
        for (const param of props.nodeDefinition.params) {
          if (param.type === 'preset' && formData[param.name]) {
            // head_point: position_name -> pan, tilt
            if (param.presetType === 'head_point' && param.name === 'position_name') {
              if (formData['pan'] === undefined || formData['tilt'] === undefined) {
                loadHeadPointDetails(formData[param.name])
              }
            }
            // lift_point: height_name -> height
            else if (param.presetType === 'lift_point' && param.name === 'height_name') {
              if (formData['height'] === undefined) {
                loadLiftPointDetails(formData[param.name])
              }
            }
            // waist_point: angle_name -> angle
            else if (param.presetType === 'waist_point' && param.name === 'angle_name') {
              if (formData['angle'] === undefined) {
                loadWaistPointDetails(formData[param.name])
              }
            }
          }
        }
      }
    }
  },
  { immediate: true, deep: true }
)

// 参数变化时触发更新
function onParamChange() {
  emit('update-params', { ...formData })
}

// 预设选择变化时，同时保存名称
function onPresetChange(paramName: string, value: any, presetType?: string) {
  if (presetType === 'saved_task' && value) {
    // 为子任务保存任务名称
    const tasks = presetsCache.value[presetType] || []
    const selectedTask = tasks.find(t => t.id === value)
    if (selectedTask) {
      formData[`${paramName}_name`] = selectedTask.name
    }
  } else if (presetType === 'head_point' && value) {
    // 为头部点位自动填充pan/tilt值
    loadHeadPointDetails(value)
  } else if (presetType === 'lift_point' && value) {
    // 为升降点位自动填充height值
    loadLiftPointDetails(value)
  } else if (presetType === 'waist_point' && value) {
    // 为腰部点位自动填充angle值
    loadWaistPointDetails(value)
  }
  onParamChange()
}

// 加载头部点位详细信息并填充pan/tilt
async function loadHeadPointDetails(pointId: string) {
  try {
    const headPoints = await listHeadPoints()
    const point = headPoints.find(p => p.id === pointId)
    if (point) {
      formData['pan'] = point.pan
      formData['tilt'] = point.tilt
      emit('update-params', { ...formData })
    }
  } catch (e) {
    console.error('Failed to load head point details:', e)
  }
}

// 加载升降点位详细信息并填充height
async function loadLiftPointDetails(pointId: string) {
  try {
    const liftPoints = await listLiftPoints()
    const point = liftPoints.find(p => p.id === pointId)
    if (point) {
      formData['height'] = point.height
      emit('update-params', { ...formData })
    }
  } catch (e) {
    console.error('Failed to load lift point details:', e)
  }
}

// 加载腰部点位详细信息并填充angle
async function loadWaistPointDetails(pointId: string) {
  try {
    const waistPoints = await listWaistPoints()
    const point = waistPoints.find(p => p.id === pointId)
    if (point) {
      formData['angle'] = point.angle
      emit('update-params', { ...formData })
    }
  } catch (e) {
    console.error('Failed to load waist point details:', e)
  }
}

// 获取精度
function getPrecision(step?: number): number {
  if (!step) return 0
  const str = step.toString()
  const decimal = str.indexOf('.')
  return decimal >= 0 ? str.length - decimal - 1 : 0
}

// 获取预设列表
function getPresets(presetType: string): any[] {
  return presetsCache.value[presetType] || []
}

// 获取预设名称（用于显示）
function getPresetName(presetType: string, presetId: string): string {
  const presets = presetsCache.value[presetType] || []
  const preset = presets.find(p => p.id === presetId)
  return preset ? preset.name : presetId
}

// 加载预设
async function loadPresets(presetType: string) {
  if (presetsCache.value[presetType]) return
  
  try {
    if (presetType === 'saved_task') {
      // 特殊处理：从任务列表加载，排除当前任务
      const tasks = await listTasks()
      const currentTaskId = taskStore.currentTask?.id
      presetsCache.value[presetType] = tasks
        .filter(t => t.id !== currentTaskId)
        .map(t => ({ id: t.id, name: t.name }))
    } else if (presetType === 'head_point') {
      // 特殊处理：从 head_points API 加载
      const headPoints = await listHeadPoints()
      presetsCache.value[presetType] = headPoints.map(p => ({
        id: p.id,
        name: p.name,
        description: p.description
      }))
    } else if (presetType === 'lift_point') {
      // 特殊处理：从 lift_points API 加载
      const liftPoints = await listLiftPoints()
      presetsCache.value[presetType] = liftPoints.map(p => ({
        id: p.id,
        name: p.name,
        description: p.description
      }))
    } else if (presetType === 'waist_point') {
      // 特殊处理：从 waist_points API 加载
      const waistPoints = await listWaistPoints()
      presetsCache.value[presetType] = waistPoints.map(p => ({
        id: p.id,
        name: p.name,
        description: p.description
      }))
    } else {
      const response = await listPresets(presetType as any)
      presetsCache.value[presetType] = response.items || []
    }
  } catch (e) {
    console.error(`Failed to load presets for ${presetType}:`, e)
    presetsCache.value[presetType] = []
  }
}

// 监听节点定义，加载需要的预设
watch(
  () => props.nodeDefinition,
  (def) => {
    if (def) {
      for (const param of def.params) {
        if (param.type === 'preset' && param.presetType) {
          loadPresets(param.presetType)
        }
      }
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.property-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #1e1e1e;
  border-left: 1px solid #3c3c3c;
}

.property-panel.empty {
  justify-content: center;
  align-items: center;
}

.empty-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: #666;
}

.empty-content p {
  margin: 0;
  font-size: 13px;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #3c3c3c;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #e0e0e0;
}

.panel-body {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.panel-footer {
  padding: 12px 16px;
  border-top: 1px solid #3c3c3c;
}

.panel-footer .el-button {
  width: 100%;
}

.no-params-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 20px;
  color: #666;
  font-size: 13px;
}

.param-hint {
  font-size: 11px;
  color: #888;
  margin-top: 4px;
}

.preset-display {
  font-size: 11px;
  color: #67c23a;
  margin-top: 4px;
  padding: 4px 8px;
  background-color: rgba(103, 194, 58, 0.1);
  border-radius: 4px;
}

/* Element Plus 样式覆盖 */
:deep(.el-form-item__label) {
  color: #999;
  font-size: 12px;
}

:deep(.el-input__wrapper),
:deep(.el-select .el-input__wrapper),
:deep(.el-input-number) {
  background-color: #2d2d2d;
  border-color: #3c3c3c;
}

:deep(.el-input__inner) {
  color: #ccc;
}

:deep(.el-input.is-disabled .el-input__wrapper) {
  background-color: #252526;
}

:deep(.el-input.is-disabled .el-input__inner) {
  color: #666;
}

:deep(.el-divider) {
  margin: 16px 0;
  border-color: #3c3c3c;
}

:deep(.el-select) {
  width: 100%;
}

:deep(.el-input-number) {
  width: 100%;
}

:deep(.el-switch) {
  --el-switch-on-color: #409eff;
}
</style>
