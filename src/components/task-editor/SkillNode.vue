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
      <el-icon v-if="data.status === 'running'" class="loading-icon"><Loading /></el-icon>
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
import { Loading, SuccessFilled, CircleCloseFilled } from '@element-plus/icons-vue'
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

// 获取显示参数，特殊处理task_id
const displayParams = computed(() => {
  if (!nodeDef.value) return []
  
  const params = props.data.params || {}
  return nodeDef.value.params
    .filter(p => params[p.name] !== undefined && params[p.name] !== '')
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
  background-color: #2d2d2d;
  border: 2px solid #555;
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
  top: -8px;
  right: -8px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #2d2d2d;
  border: 2px solid;
}

.status-running .status-indicator {
  border-color: #409eff;
  color: #409eff;
}

.status-success .status-indicator {
  border-color: #67c23a;
  color: #67c23a;
}

.status-failure .status-indicator {
  border-color: #f56c6c;
  color: #f56c6c;
}

.loading-icon {
  animation: spin 1s linear infinite;
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
