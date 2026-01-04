<template>
  <div class="task-editor-canvas">
    <VueFlow
      ref="vueFlowRef"
      v-model:nodes="nodes"
      v-model:edges="edges"
      :node-types="nodeTypes"
      :default-viewport="{ x: 0, y: 0, zoom: 1 }"
      :min-zoom="0.25"
      :max-zoom="2"
      :snap-to-grid="true"
      :snap-grid="[15, 15]"
      :connection-mode="ConnectionMode.Loose"
      :auto-connect="true"
      fit-view-on-init
      @node-click="onNodeClick"
      @pane-click="onPaneClick"
      @node-drag-stop="onNodeDragStop"
      @connect="onConnect"
      @edges-change="onEdgesChange"
      @drop="onDrop"
      @dragover="onDragOver"
    >
      <!-- 背景 -->
      <Background :pattern-color="'#333'" :gap="20" />
      
      <!-- 小地图 -->
      <MiniMap 
        :pannable="true" 
        :zoomable="true"
        :node-color="miniMapNodeColor"
      />
      
      <!-- 控制按钮 -->
      <Controls :show-interactive="false">
        <ControlButton @click="fitView">
          <SvgIcon name="aim" :size="16" />
        </ControlButton>
        <ControlButton @click="resetZoom">
          <SvgIcon name="zoomin" :size="16" />
        </ControlButton>
      </Controls>
      
      <!-- 画布为空时的提示 -->
      <Panel v-if="nodes.length === 0" position="top-center" class="empty-hint-panel">
        <div class="empty-hint">
          <SvgIcon name="plus" :size="32" />
          <p>拖拽左侧节点到此处开始编排任务</p>
        </div>
      </Panel>
    </VueFlow>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'
import { ref, computed, watch, markRaw, toRaw } from 'vue'
import { 
  VueFlow, 
  useVueFlow,
  Panel,
  ConnectionMode,
  type Node,
  type Edge,
  type Connection,
  type EdgeChange
} from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { MiniMap } from '@vue-flow/minimap'
import { Controls, ControlButton } from '@vue-flow/controls'

// Vue Flow 样式 - 使用简化导入
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'

import SkillNode from './SkillNode.vue'
import ControlNode from './ControlNode.vue'
import { useTaskEditorStore, generateNodeId, type FlowNode, type FlowNodeData } from '@/stores/task'
import { getNodeDefinition, type NodeType } from '@/api/task'

const taskStore = useTaskEditorStore()

// 节点和边（双向绑定到 store）
const nodes = computed({
  get: () => taskStore.nodes,
  set: (val) => { taskStore.nodes = val }
})

const edges = computed({
  get: () => taskStore.edges,
  set: (val) => { taskStore.edges = val }
})

// Vue Flow 实例
const vueFlowRef = ref()
const { project, fitView: vueFlowFitView, setViewport } = useVueFlow()

// 自定义节点类型（使用 any 避免严格类型检查问题）
const nodeTypes: Record<string, any> = {
  skill: markRaw(SkillNode),
  control: markRaw(ControlNode)
}

// 事件处理
function onNodeClick({ node }: { node: Node }) {
  taskStore.selectNode(node.id)
}

function onPaneClick() {
  taskStore.selectNode(null)
}

function onNodeDragStop({ node }: { node: Node }) {
  taskStore.updateNodePosition(node.id, node.position)
}

function onConnect(connection: Connection) {
  if (connection.source && connection.target) {
    taskStore.addEdge(connection.source, connection.target)
  }
}

function onEdgesChange(changes: EdgeChange[]) {
  for (const change of changes) {
    if (change.type === 'remove') {
      taskStore.deleteEdge(change.id)
    }
  }
}

// 拖放处理
function onDragOver(event: DragEvent) {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}

function onDrop(event: DragEvent) {
  event.preventDefault()
  
  const type = event.dataTransfer?.getData('application/vueflow') as NodeType
  if (!type) return
  
  // 计算放置位置
  const { left, top } = (event.target as HTMLElement).getBoundingClientRect()
  const position = project({
    x: event.clientX - left,
    y: event.clientY - top
  })
  
  // 添加节点
  taskStore.addNode(type, position)
}

// 小地图节点颜色
function miniMapNodeColor(node: Node): string {
  return (node.data as FlowNodeData)?.color || '#666'
}

// 视图控制
function fitView() {
  vueFlowFitView({ padding: 0.2 })
}

function resetZoom() {
  setViewport({ x: 0, y: 0, zoom: 1 })
}
</script>

<style scoped>
.task-editor-canvas {
  width: 100%;
  height: 100%;
  background-color: #1a1a1a;
}

.empty-hint-panel {
  pointer-events: none;
}

.empty-hint {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px 32px;
  background-color: rgba(45, 45, 45, 0.9);
  border-radius: 12px;
  color: #888;
}

.empty-hint p {
  margin: 0;
  font-size: 14px;
}

/* Vue Flow 样式覆盖 */
:deep(.vue-flow__node) {
  cursor: pointer;
}

:deep(.vue-flow__edge-path) {
  stroke: #555;
  stroke-width: 2;
}

:deep(.vue-flow__edge.selected .vue-flow__edge-path) {
  stroke: #409eff;
  stroke-width: 3;
}

:deep(.vue-flow__connection-path) {
  stroke: #67c23a;
  stroke-width: 2;
  stroke-dasharray: 5;
}

:deep(.vue-flow__background) {
  background-color: #1a1a1a;
}

:deep(.vue-flow__minimap) {
  background-color: #252526;
  border-radius: 8px;
  overflow: hidden;
}

:deep(.vue-flow__minimap-mask) {
  fill: rgba(64, 158, 255, 0.1);
}

:deep(.vue-flow__controls) {
  background-color: #2d2d2d;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

:deep(.vue-flow__controls-button) {
  background-color: #2d2d2d;
  border: none;
  color: #ccc;
  width: 32px;
  height: 32px;
}

:deep(.vue-flow__controls-button:hover) {
  background-color: #3c3c3c;
  color: #fff;
}

:deep(.vue-flow__controls-button svg) {
  display: none;
}
</style>
