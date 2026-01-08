<template>
  <div 
    class="control-node"
    :class="{ selected: props.selected, [statusClass]: true }"
    :style="{ borderColor: data.color }"
  >
    <!-- 输入连接点 -->
    <Handle type="target" :position="Position.Top" class="handle-top" />
    
    <!-- 节点内容 -->
    <div class="node-header" :style="{ backgroundColor: data.color }">
      <el-icon :size="18">
        <component :is="data.icon" />
      </el-icon>
      <span class="node-label">{{ data.label }}</span>
      <span class="child-count" v-if="childCount > 0">{{ childCount }}</span>
    </div>
    
    <div class="node-body">
      <div class="control-type">{{ controlDescription }}</div>
      <!-- 参数预览 -->
      <div v-if="displayParams.length > 0" class="param-preview">
        <div v-for="param in displayParams" :key="param.name" class="param-item">
          <span class="param-name">{{ param.label }}:</span>
          <span class="param-value">{{ param.value }}</span>
        </div>
      </div>
    </div>
    
    <!-- 状态指示器 -->
    <div v-if="data.status && data.status !== 'idle'" class="status-indicator" :class="'status-' + data.status">
      <SvgIcon v-if="data.status === 'running'" name="loading" :size="16" class="loading-icon" />
      <el-icon v-else-if="data.status === 'success'"><SuccessFilled /></el-icon>
      <el-icon v-else-if="data.status === 'failure'"><CircleCloseFilled /></el-icon>
    </div>
    
    <!-- 输出连接点（连接子节点） -->
    <Handle type="source" :position="Position.Bottom" class="handle-bottom" />
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { Handle, Position, useVueFlow } from '@vue-flow/core'
import type { FlowNodeData } from '@/stores/task'
import { getNodeDefinition } from '@/api/task'

const props = defineProps<{
  id: string
  data: FlowNodeData
  selected?: boolean
}>()

const { getEdges } = useVueFlow()

// 获取节点定义
const nodeDef = computed(() => getNodeDefinition(props.data.type))

// 控制节点类型描述
const controlDescription = computed(() => {
  switch (props.data.type) {
    case 'Sequence': return '依次执行子节点'
    case 'Parallel': return '并行执行子节点'
    case 'Selector': return '选择执行子节点'
    case 'Decorator': return '装饰器节点'
    default: return ''
  }
})

// 子节点数量
const childCount = computed(() => {
  const edges = getEdges.value
  return edges.filter(e => e.source === props.id).length
})

// 显示的参数
const displayParams = computed(() => {
  if (!nodeDef.value) return []
  
  const params = props.data.params || {}
  return nodeDef.value.params
    .filter(p => params[p.name] !== undefined)
    .map(p => ({
      name: p.name,
      label: p.label,
      value: params[p.name]
    }))
})

// 状态样式类
const statusClass = computed(() => {
  return props.data.status ? `status-${props.data.status}` : ''
})
</script>

<style scoped>
.control-node {
  min-width: 180px;
  background-color: #252526;
  border: 2px solid #409EFF;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
  position: relative;
}

.control-node:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}

.control-node.selected {
  box-shadow: 0 0 0 2px #409eff, 0 4px 16px rgba(0, 0, 0, 0.4);
}

.node-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 8px 8px 0 0;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
}

.node-label {
  flex: 1;
}

.child-count {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  font-size: 11px;
}

.node-body {
  padding: 10px 14px;
}

.control-type {
  font-size: 11px;
  color: #888;
  margin-bottom: 6px;
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
}

.param-name {
  color: #777;
}

.param-value {
  color: #ccc;
}

/* 连接点样式 */
.handle-top,
.handle-bottom {
  width: 12px;
  height: 12px;
  background-color: #409eff;
  border: 2px solid #fff;
  border-radius: 50%;
}

.handle-bottom {
  background-color: #67c23a;
}

.handle-top:hover,
.handle-bottom:hover {
  transform: scale(1.2);
}

/* 状态指示器 */
.status-indicator {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #252526;
  border: 2px solid;
  font-size: 14px;
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
.control-node.status-running {
  border-color: #409eff;
  animation: pulse-border 1.5s ease-in-out infinite;
}

.control-node.status-success {
  border-color: #67c23a;
}

.control-node.status-failure {
  border-color: #f56c6c;
}

@keyframes pulse-border {
  0%, 100% { box-shadow: 0 0 0 0 rgba(64, 158, 255, 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(64, 158, 255, 0); }
}
</style>
