<template>
  <div class="node-palette">
    <div class="palette-header">
      <span class="palette-title">节点面板</span>
      <el-input
        v-model="searchQuery"
        placeholder="搜索节点..."
        size="small"
        :prefix-icon="Search"
        clearable
      />
    </div>
    
    <div class="palette-content">
      <el-collapse v-model="expandedCategories">
        <el-collapse-item 
          v-for="(nodes, category) in filteredNodesByCategory" 
          :key="category"
          :name="category"
        >
          <template #title>
            <div class="category-header">
              <span class="category-name">{{ CATEGORY_NAMES[category] || category }}</span>
              <span class="category-count">{{ nodes.length }}</span>
            </div>
          </template>
          
          <div class="node-list">
            <div
              v-for="nodeDef in nodes"
              :key="nodeDef.type"
              class="palette-node"
              :style="{ borderLeftColor: nodeDef.color }"
              draggable="true"
              @dragstart="onDragStart($event, nodeDef.type)"
              @click="onNodeClick(nodeDef.type)"
            >
              <div class="node-icon" :style="{ backgroundColor: nodeDef.color }">
                <el-icon :size="16">
                  <component :is="nodeDef.icon" />
                </el-icon>
              </div>
              <div class="node-info">
                <span class="node-name">{{ nodeDef.name }}</span>
                <span class="node-desc">{{ nodeDef.description }}</span>
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    
    <div class="palette-footer">
      <el-tooltip content="拖拽节点到画布添加" placement="top">
        <span class="hint-text">
          <el-icon><InfoFilled /></el-icon>
          拖拽或点击添加节点
        </span>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search, InfoFilled } from '@element-plus/icons-vue'
import { 
  NODE_DEFINITIONS, 
  CATEGORY_NAMES, 
  getNodesByCategory,
  type NodeType,
  type NodeDefinition
} from '@/api/task'

const emit = defineEmits<{
  (e: 'add-node', type: NodeType): void
  (e: 'drag-start', event: DragEvent, type: NodeType): void
}>()

// 搜索
const searchQuery = ref('')

// 展开的类别
const expandedCategories = ref<string[]>(['control', 'arm', 'logic'])

// 按类别分组的节点（隐藏 Sequence，因为顺序执行是默认行为）
const nodesByCategory = computed(() => {
  const allNodes = getNodesByCategory()
  // 从控制节点中移除 Sequence
  if (allNodes.control) {
    allNodes.control = allNodes.control.filter(n => n.type !== 'Sequence')
  }
  return allNodes
})

// 过滤后的节点
const filteredNodesByCategory = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return nodesByCategory.value
  
  const result: Record<string, NodeDefinition[]> = {}
  for (const [category, nodes] of Object.entries(nodesByCategory.value)) {
    const filtered = nodes.filter(
      n => n.name.toLowerCase().includes(query) || 
           n.description.toLowerCase().includes(query)
    )
    if (filtered.length > 0) {
      result[category] = filtered
    }
  }
  return result
})

// 拖拽开始
function onDragStart(event: DragEvent, type: NodeType) {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/vueflow', type)
    event.dataTransfer.effectAllowed = 'move'
  }
  emit('drag-start', event, type)
}

// 点击节点（添加到画布中心）
function onNodeClick(type: NodeType) {
  emit('add-node', type)
}
</script>

<style scoped>
.node-palette {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #1e1e1e;
  border-right: 1px solid #3c3c3c;
}

.palette-header {
  padding: 12px;
  border-bottom: 1px solid #3c3c3c;
}

.palette-title {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #ccc;
  margin-bottom: 8px;
}

.palette-content {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.category-name {
  font-size: 13px;
  color: #ccc;
}

.category-count {
  font-size: 11px;
  color: #888;
  background-color: #333;
  padding: 2px 6px;
  border-radius: 10px;
}

.node-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 4px 0;
}

.palette-node {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background-color: #2d2d2d;
  border-left: 3px solid;
  border-radius: 6px;
  cursor: grab;
  transition: all 0.2s ease;
}

.palette-node:hover {
  background-color: #3c3c3c;
  transform: translateX(4px);
}

.palette-node:active {
  cursor: grabbing;
}

.node-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  color: #fff;
  flex-shrink: 0;
}

.node-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.node-name {
  font-size: 13px;
  color: #e0e0e0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.node-desc {
  font-size: 11px;
  color: #888;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.palette-footer {
  padding: 10px 12px;
  border-top: 1px solid #3c3c3c;
}

.hint-text {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: #666;
}

/* Element Plus 样式覆盖 */
:deep(.el-collapse) {
  border: none;
  --el-collapse-header-bg-color: transparent;
  --el-collapse-content-bg-color: transparent;
}

:deep(.el-collapse-item__header) {
  background-color: transparent;
  border-bottom: 1px solid #333;
  color: #ccc;
  height: 40px;
}

:deep(.el-collapse-item__header:hover) {
  background-color: #2a2a2a;
}

:deep(.el-collapse-item__content) {
  padding-bottom: 0;
}

:deep(.el-collapse-item__wrap) {
  border-bottom: none;
}

:deep(.el-input__wrapper) {
  background-color: #2d2d2d;
  border-color: #3c3c3c;
}

:deep(.el-input__inner) {
  color: #ccc;
}

:deep(.el-input__inner::placeholder) {
  color: #666;
}
</style>
