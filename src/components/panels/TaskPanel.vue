<template>
  <div class="task-panel-full">
    <!-- 工具栏 -->
    <TaskToolbar 
      @open-task-list="showTaskListDialog = true" 
      @open-template-dialog="showTemplateDialog = true"
    />
    
    <!-- 主体区域 -->
    <div class="editor-body">
      <!-- 左侧：节点面板 -->
      <div 
        class="node-palette-container"
        :class="{ collapsed: !nodePaletteVisible }"
      >
        <NodePalette 
          v-show="nodePaletteVisible"
          @add-node="onAddNode"
          @drag-start="onDragStart"
        />
        
        <!-- 折叠按钮 -->
        <div class="collapse-button left" @click="toggleNodePalette">
          <el-icon>
            <ArrowLeft v-if="nodePaletteVisible" />
            <ArrowRight v-else />
          </el-icon>
        </div>
      </div>
      
      <!-- 中间：画布 -->
      <div class="canvas-container">
        <TaskEditorCanvas />
      </div>
      
      <!-- 右侧：属性面板 -->
      <div 
        class="property-panel-container"
        :class="{ collapsed: !propertyPanelVisible }"
      >
        <!-- 折叠按钮 -->
        <div class="collapse-button right" @click="togglePropertyPanel">
          <el-icon>
            <ArrowRight v-if="propertyPanelVisible" />
            <ArrowLeft v-else />
          </el-icon>
        </div>
        
        <PropertyPanel
          v-show="propertyPanelVisible"
          :selected-node="selectedNode"
          :node-definition="selectedNodeDefinition"
          @update-params="onUpdateParams"
          @delete="onDeleteNode"
        />
      </div>
    </div>
    
    <!-- 任务列表对话框 -->
    <el-dialog
      v-model="showTaskListDialog"
      title="任务列表"
      width="600px"
      :close-on-click-modal="false"
    >
      <div class="task-list-dialog">
        <div v-if="taskList.length === 0" class="empty-list">
          <el-icon :size="48"><DocumentDelete /></el-icon>
          <p>暂无已保存的任务</p>
        </div>
        
        <div v-else class="task-list">
          <div 
            v-for="task in taskList" 
            :key="task.id"
            class="task-list-item"
            :class="{ selected: selectedTaskId === task.id }"
            @click="selectedTaskId = task.id"
            @dblclick="onOpenTask(task)"
          >
            <div class="task-icon">
              <el-icon :size="24"><Document /></el-icon>
            </div>
            <div class="task-info">
              <span class="task-name">{{ task.name }}</span>
              <span class="task-desc">{{ task.description || '无描述' }}</span>
              <span class="task-time">{{ formatTime(task.updated_at) }}</span>
            </div>
            <div class="task-actions">
              <el-button size="small" type="danger" circle @click.stop="onDeleteTask(task)">
                <el-icon><Delete /></el-icon>
              </el-button>
            </div>
          </div>
        </div>
      </div>
      
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showTaskListDialog = false">取消</el-button>
          <el-button @click="refreshTaskList">
            <el-icon><Refresh /></el-icon>
            刷新
          </el-button>
          <el-button 
            type="primary" 
            :disabled="!selectedTaskId"
            @click="onOpenSelectedTask"
          >
            <el-icon><FolderOpened /></el-icon>
            打开
          </el-button>
        </div>
      </template>
    </el-dialog>
    
    <!-- 模板选择对话框 -->
    <TemplateDialog v-model:visible="showTemplateDialog" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { 
  ArrowLeft, 
  ArrowRight, 
  DocumentDelete, 
  Document, 
  Delete, 
  Refresh,
  FolderOpened
} from '@element-plus/icons-vue'
import { useTaskEditorStore } from '@/stores/task'
import { useTaskWebSocket } from '@/composables/useTaskWebSocket'
import { 
  TaskEditorCanvas, 
  TaskToolbar, 
  NodePalette, 
  PropertyPanel,
  TemplateDialog
} from '@/components/task-editor'
import { 
  listTasks, 
  deleteTask,
  createTask,
  updateTask,
  getTask,
  type TaskDefinition, 
  type NodeType 
} from '@/api/task'

const taskStore = useTaskEditorStore()

// WebSocket 连接
const { connected: wsConnected } = useTaskWebSocket()

// 从 store 获取状态
const nodePaletteVisible = computed(() => taskStore.nodePaletteVisible)
const propertyPanelVisible = computed(() => taskStore.propertyPanelVisible)
const selectedNode = computed(() => taskStore.selectedNode)
const selectedNodeDefinition = computed(() => taskStore.selectedNodeDefinition)

// 任务列表
const showTaskListDialog = ref(false)
const showTemplateDialog = ref(false)
const taskList = ref<TaskDefinition[]>([])
const selectedTaskId = ref<string | undefined>(undefined)

// 加载任务列表
async function refreshTaskList() {
  try {
    taskList.value = await listTasks()
  } catch (e) {
    console.error('Failed to load task list:', e)
  }
}

// 选择任务（打开）- 兼容旧逻辑
function onSelectTask(task: TaskDefinition) {
  onOpenTask(task)
}

// 打开任务
async function onOpenTask(task: TaskDefinition) {
  try {
    // 如果任务没有 root 字段，需要从后端获取完整数据
    let fullTask = task
    if (!task.root && task.id) {
      fullTask = await getTask(task.id)
    }
    
    taskStore.loadTask(fullTask)
    showTaskListDialog.value = false
    selectedTaskId.value = undefined
    ElMessage.success(`已加载任务: ${fullTask.name}`)
  } catch (error) {
    console.error('Failed to load task:', error)
    ElMessage.error('加载任务失败')
  }
}

// 打开选中的任务
function onOpenSelectedTask() {
  const task = taskList.value.find(t => t.id === selectedTaskId.value)
  if (task) {
    onOpenTask(task)
  }
}

// 删除任务
async function onDeleteTask(task: TaskDefinition) {
  try {
    await ElMessageBox.confirm(`确定要删除任务 "${task.name}" 吗？`, '确认删除', {
      type: 'warning'
    })
    
    if (task.id) {
      await deleteTask(task.id)
      await refreshTaskList()
      ElMessage.success('任务已删除')
    }
  } catch {
    // 用户取消
  }
}

// 保存任务
async function onSaveTask() {
  // 先验证任务结构
  const validation = taskStore.validateTask()
  if (!validation.valid) {
    ElMessage.error(validation.error || '任务验证失败')
    return
  }
  
  const taskTree = taskStore.exportToTaskTree()
  if (!taskTree) {
    ElMessage.warning('没有可保存的内容')
    return
  }
  
  try {
    // 检查任务名是否重复
    const existingTasks = await listTasks()
    const duplicateName = existingTasks.find(t => 
      t.name === taskTree.name && t.id !== taskStore.currentTask?.id
    )
    if (duplicateName) {
      ElMessage.error(`任务名 "${taskTree.name}" 已存在，请使用其他名称`)
      return
    }
    
    if (taskStore.currentTask?.id) {
      // 更新已有任务
      const updated = await updateTask(taskStore.currentTask.id, taskTree)
      taskStore.currentTask = updated
      taskStore.isDirty = false
      ElMessage.success('任务已更新')
    } else {
      // 创建新任务
      const created = await createTask(taskTree)
      taskStore.currentTask = created
      taskStore.isDirty = false
      ElMessage.success('任务已保存')
    }
  } catch (e) {
    console.error('Failed to save task:', e)
    ElMessage.error('保存失败')
  }
}

// 新建任务
function onNewTask() {
  if (taskStore.isDirty) {
    ElMessageBox.confirm('当前任务未保存，是否放弃修改？', '提示', {
      type: 'warning'
    }).then(() => {
      taskStore.newTask()
    }).catch(() => {})
  } else {
    taskStore.newTask()
  }
}

// 添加节点
function onAddNode(type: NodeType) {
  // 在画布中心添加节点
  taskStore.addNode(type, { x: 400, y: 200 })
}

// 拖拽开始
function onDragStart(event: DragEvent, type: NodeType) {
  // 由 TaskEditorCanvas 处理
}

// 更新节点参数
function onUpdateParams(params: Record<string, any>) {
  if (taskStore.selectedNodeId) {
    taskStore.updateNodeParams(taskStore.selectedNodeId, params)
  }
}

// 删除节点
function onDeleteNode() {
  if (taskStore.selectedNodeId) {
    taskStore.deleteNode(taskStore.selectedNodeId)
  }
}

// 切换面板
function toggleNodePalette() {
  taskStore.nodePaletteVisible = !taskStore.nodePaletteVisible
}

function togglePropertyPanel() {
  taskStore.propertyPanelVisible = !taskStore.propertyPanelVisible
}

// 格式化时间
function formatTime(time?: string): string {
  if (!time) return ''
  const date = new Date(time)
  return date.toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 初始化
onMounted(() => {
  // 如果没有当前任务，创建一个新任务
  if (!taskStore.currentTask) {
    taskStore.newTask()
  }
})

// 打开对话框时加载任务列表
watch(showTaskListDialog, (visible) => {
  if (visible) {
    refreshTaskList()
  }
})

// 暴露保存方法给 TaskToolbar
defineExpose({
  onSaveTask,
  onNewTask
})
</script>

<style scoped>
.task-panel-full {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #1a1a1a;
}

.editor-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* 节点面板容器 */
.node-palette-container {
  position: relative;
  width: 260px;
  min-width: 260px;
  transition: width 0.2s ease, min-width 0.2s ease;
}

.node-palette-container.collapsed {
  width: 0;
  min-width: 0;
}

/* 属性面板容器 */
.property-panel-container {
  position: relative;
  width: 280px;
  min-width: 280px;
  transition: width 0.2s ease, min-width 0.2s ease;
}

.property-panel-container.collapsed {
  width: 0;
  min-width: 0;
}

/* 画布容器 */
.canvas-container {
  flex: 1;
  overflow: hidden;
}

/* 折叠按钮 */
.collapse-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #333;
  border: 1px solid #444;
  cursor: pointer;
  z-index: 10;
  transition: background-color 0.2s;
}

.collapse-button:hover {
  background-color: #409eff;
  color: #fff;
}

.collapse-button.left {
  right: -20px;
  border-radius: 0 4px 4px 0;
  border-left: none;
}

.collapse-button.right {
  left: -20px;
  border-radius: 4px 0 0 4px;
  border-right: none;
}

/* 任务列表对话框 */
.task-list-dialog {
  max-height: 400px;
  overflow-y: auto;
}

.empty-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #999;
}

.empty-list p {
  margin: 12px 0 0 0;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.task-list-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;
}

.task-list-item:hover {
  background-color: #e8f4ff;
}

.task-list-item.selected {
  background-color: #e8f4ff;
  border-color: #409eff;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.task-icon {
  color: #409eff;
}

.task-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.task-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.task-desc {
  font-size: 12px;
  color: #999;
}

.task-time {
  font-size: 11px;
  color: #bbb;
}
</style>
