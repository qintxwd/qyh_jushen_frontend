<template>
  <div 
    class="skill-node"
    :class="{ selected: props.selected, [statusClass]: true }"
    :style="{ borderColor: data.color }"
  >
    <!-- 输入连接点 -->
    <Handle type="target" :position="Position.Top" class="handle-top" />
    
    <!-- 节点内容 -->
    <div class="node-header" :style="{ backgroundColor: data.color }">
      <el-icon :size="16">
        <component :is="data.icon" />
      </el-icon>
      <span class="node-label">{{ data.label }}</span>
    </div>
    
    <div class="node-body">
      <!-- 显示关键参数 -->
      <div v-if="displayParams.length > 0" class="param-preview">
        <div v-for="param in displayParams" :key="param.name" class="param-item">
          <span class="param-name">{{ param.label }}:</span>
          <span class="param-value">{{ formatValue(param.value) }}</span>
        </div>
      </div>
      <div v-else class="no-params">
        点击配置参数
      </div>
    </div>
    
    <!-- 状态指示器 -->
    <div v-if="data.status && data.status !== 'idle'" class="status-indicator" :class="'status-' + data.status">
      <SvgIcon v-if="data.status === 'running'" name="loading" :size="16" class="loading-icon" />
      <el-icon v-else-if="data.status === 'success'"><SuccessFilled /></el-icon>
      <el-icon v-else-if="data.status === 'failure'"><CircleCloseFilled /></el-icon>
    </div>
    
    <!-- 输出连接点（技能节点通常没有输出，除非是控制节点） -->
    <Handle type="source" :position="Position.Bottom" class="handle-bottom" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Handle, Position } from '@vue-flow/core'
import type { FlowNodeData } from '@/stores/task'
import { getNodeDefinition } from '@/api/task'

const props = defineProps<{
  id: string
  data: FlowNodeData
  selected?: boolean
}>()

// 获取节点定义以显示参数
const nodeDef = computed(() => getNodeDefinition(props.data.type))

// 格式化参数值显示
function formatValue(value: any): string {
  if (value === null || value === undefined) return '-'
  if (typeof value === 'boolean') return value ? '是' : '否'
  if (typeof value === 'number') return value.toFixed(2).replace(/\.?0+$/, '')
  if (Array.isArray(value)) return `[${value.length}项]`
  if (typeof value === 'object') return JSON.stringify(value).slice(0, 20)
  return String(value).slice(0, 15)
}

// 状态样式类
const statusClass = computed(() => {
  return props.data.status ? `status-${props.data.status}` : ''
})

// 获取显示参数，过滤掉内部ID参数
const displayParams = computed(() => {
  if (!nodeDef.value) return []
  
  const params = props.data.params || {}
  
  // 跳过这些内部预设ID参数，只显示实际数值
  const skipParams = ['height_name', 'position_name', 'angle_name', 'point_id', 'task_id_name']
  
  return nodeDef.value.params
    .filter(p => {
      // 跳过内部ID参数
      if (skipParams.includes(p.name)) return false
      // 只显示有值的参数
      return params[p.name] !== undefined && params[p.name] !== ''
    })
    .slice(0, 3) // 最多显示 3 个参数
    .map(p => {
      let displayValue = params[p.name]
      // 如果是task_id且有对应的task_id_name，使用任务名称
      if (p.name === 'task_id' && params['task_id_name']) {
        displayValue = params['task_id_name']
      }
      return {
        name: p.name,
        label: p.label,
        value: displayValue
      }
    })
})
</script>

<style scoped>
.skill-node {
  min-width: 160px;
  background-color: var(--color-bg-tertiary, #2d2d2d);
  border: 2px solid var(--color-border, #555);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
  position: relative;
}

.skill-node:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}

.skill-node.selected {
  box-shadow: 0 0 0 2px #409eff, 0 4px 16px rgba(0, 0, 0, 0.4);
}

.node-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 6px 6px 0 0;
  color: #fff;
  font-size: 13px;
  font-weight: 500;
}

.node-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.node-body {
  padding: 8px 12px;
  min-height: 30px;
}

.param-preview {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.param-item {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #999;
}

.param-name {
  color: #777;
}

.param-value {
  color: #ccc;
  font-family: monospace;
}

.no-params {
  font-size: 11px;
  color: #666;
  text-align: center;
}

/* 连接点样式 */
.handle-top,
.handle-bottom {
  width: 10px;
  height: 10px;
  background-color: #555;
  border: 2px solid #777;
  border-radius: 50%;
}

.handle-top:hover,
.handle-bottom:hover {
  background-color: #409eff;
  border-color: #409eff;
}

/* 状态指示器 */
.status-indicator {
  position: absolute;
  top: -12px;
  right: -12px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: rgba(45, 45, 45, 0.95);
  border: 2px solid;
  font-size: 16px;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.status-running .status-indicator {
  border-color: #409eff;
  color: #409eff;
  background-color: rgba(64, 158, 255, 0.15);
  box-shadow: 0 0 12px rgba(64, 158, 255, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3);
}

.status-success .status-indicator {
  border-color: #67c23a;
  color: #67c23a;
  background-color: rgba(103, 194, 58, 0.15);
  box-shadow: 0 0 8px rgba(103, 194, 58, 0.3);
}

.status-failure .status-indicator {
  border-color: #f56c6c;
  color: #f56c6c;
}

.loading-icon {
  animation: spin 1s linear infinite;
  filter: drop-shadow(0 0 4px rgba(64, 158, 255, 0.6));
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 执行状态边框动画 */
.skill-node.status-running {
  border-color: #409eff;
  animation: pulse-border 1.5s ease-in-out infinite;
}

.skill-node.status-success {
  border-color: #67c23a;
}

.skill-node.status-failure {
  border-color: #f56c6c;
}

@keyframes pulse-border {
  0%, 100% { box-shadow: 0 0 0 0 rgba(64, 158, 255, 0.4); }
  50% { box-shadow: 0 0 0 6px rgba(64, 158, 255, 0); }
}
</style>
