<template>
  <div class="task-toolbar">
    <!-- 左侧：任务操作 -->
    <div class="toolbar-left">
      <el-button-group>
        <el-button size="small" @click="onNew">
          <SvgIcon name="plus" :size="16" />
          新建
        </el-button>
        <el-button size="small" @click="onOpenTemplate">
          <SvgIcon name="files" :size="16" />
          模板
        </el-button>
        <el-button size="small" @click="onOpen">
          <SvgIcon name="folderopened" :size="16" />
          打开
        </el-button>
        <el-button size="small" :disabled="!isDirty" @click="onSave">
          <SvgIcon name="documentchecked" :size="16" />
          保存
        </el-button>
      </el-button-group>
      
      <el-divider direction="vertical" />
      
      <!-- 当前任务信息 -->
      <div class="task-info" v-if="currentTask">
        <el-input
          v-model="taskName"
          size="small"
          placeholder="任务名称"
          style="width: 200px"
          @change="onNameChange"
        />
        <span class="dirty-indicator" v-if="isDirty">●</span>
      </div>
    </div>
    
    <!-- 中间：执行控制 -->
    <div class="toolbar-center">
      <el-button-group>
        <el-tooltip content="运行任务 (F5)" placement="bottom">
          <el-button 
            type="success" 
            size="small" 
            :disabled="!canExecute"
            @click="onExecute"
          >
            <SvgIcon name="videoplay" :size="16" />
            运行
          </el-button>
        </el-tooltip>
        
        <el-tooltip content="暂停" placement="bottom">
          <el-button 
            type="warning"
            size="small" 
            :disabled="!canPause"
            @click="onPause"
          >
            <SvgIcon name="videopause" :size="16" />
          </el-button>
        </el-tooltip>
        
        <el-tooltip content="继续" placement="bottom">
          <el-button 
            type="primary"
            size="small" 
            :disabled="!canResume"
            @click="onResume"
          >
            <SvgIcon name="caretright" :size="16" />
          </el-button>
        </el-tooltip>
        
        <el-tooltip content="停止" placement="bottom">
          <el-button 
            type="danger"
            size="small" 
            :disabled="!canCancel"
            @click="onCancel"
          >
            <SvgIcon name="closebold" :size="16" />
          </el-button>
        </el-tooltip>
      </el-button-group>
      
      <!-- 执行状态 -->
      <div v-if="executionState" class="execution-status" :class="'status-' + executionState.status">
        <SvgIcon v-if="executionState.status === 'running'" name="loading" :size="16" class="loading" />
        <span>{{ statusText }}</span>
        <span v-if="executionState.progress > 0" class="progress">
          {{ Math.round(executionState.progress * 100) }}%
        </span>
      </div>
    </div>
    
    <!-- 右侧：视图控制 -->
    <div class="toolbar-right">
      <el-tooltip content="切换节点面板" placement="bottom">
        <el-button 
          size="small" 
          :type="nodePaletteVisible ? 'primary' : 'default'"
          @click="toggleNodePalette"
        >
          <SvgIcon name="menu" :size="16" />
        </el-button>
      </el-tooltip>
      
      <el-tooltip content="切换属性面板" placement="bottom">
        <el-button 
          size="small" 
          :type="propertyPanelVisible ? 'primary' : 'default'"
          @click="togglePropertyPanel"
        >
          <SvgIcon name="setting" :size="16" />
        </el-button>
      </el-tooltip>
      
      <el-divider direction="vertical" />
      
      <!-- 导入 -->
      <el-dropdown trigger="click" @command="onImport">
        <el-button size="small">
          <SvgIcon name="upload" :size="16" />
          导入
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="file">
              <SvgIcon name="document" :size="16" />
              从文件导入
            </el-dropdown-item>
            <el-dropdown-item command="clipboard">
              <SvgIcon name="documentcopy" :size="16" />
              从剪贴板导入
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      
      <el-dropdown trigger="click" @command="onExport">
        <el-button size="small">
          <SvgIcon name="download" :size="16" />
          导出
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="json">
              <SvgIcon name="document" :size="16" />
              导出 JSON
            </el-dropdown-item>
            <el-dropdown-item command="clipboard">
              <SvgIcon name="copydocument" :size="16" />
              复制到剪贴板
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    
    <!-- 隐藏的文件输入框 -->
    <input 
      ref="fileInputRef"
      type="file" 
      accept=".json"
      style="display: none"
      @change="handleFileImport"
    />
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useTaskEditorStore } from '@/stores/task'
import { executeTaskTree, pauseTask, resumeTask, cancelTask, createTask, updateTask } from '@/api/task'

const emit = defineEmits<{
  (e: 'open-task-list'): void
  (e: 'open-template-dialog'): void
}>()

const taskStore = useTaskEditorStore()

// 文件输入框引用
const fileInputRef = ref<HTMLInputElement | null>(null)

// 从 store 获取状态
const currentTask = computed(() => taskStore.currentTask)
const isDirty = computed(() => taskStore.isDirty)
const executionState = computed(() => taskStore.executionState)
const canExecute = computed(() => taskStore.canExecute)
const canPause = computed(() => taskStore.canPause)
const canResume = computed(() => taskStore.canResume)
const canCancel = computed(() => taskStore.canCancel)
const nodePaletteVisible = computed(() => taskStore.nodePaletteVisible)
const propertyPanelVisible = computed(() => taskStore.propertyPanelVisible)

// 任务名称
const taskName = ref('')
watch(
  () => currentTask.value?.name,
  (name) => { taskName.value = name || '' },
  { immediate: true }
)

// 状态文字
const statusText = computed(() => {
  const status = executionState.value?.status
  const map: Record<string, string> = {
    idle: '空闲',
    running: '运行中',
    paused: '已暂停',
    completed: '已完成',
    failed: '执行失败',
    cancelled: '已取消'
  }
  return map[status || 'idle'] || status
})

// 事件处理
async function onNew() {
  if (isDirty.value) {
    try {
      await ElMessageBox.confirm('当前任务未保存，是否继续？', '提示', {
        type: 'warning',
        confirmButtonText: '继续',
        cancelButtonText: '取消'
      })
    } catch {
      return
    }
  }
  taskStore.newTask()
}

function onOpen() {
  emit('open-task-list')
}

function onOpenTemplate() {
  emit('open-template-dialog')
}

async function onSave() {
  // 先验证任务结构
  const validation = taskStore.validateTask()
  if (!validation.valid) {
    ElMessage.error(validation.error || '任务验证失败')
    return
  }
  
  const task = taskStore.exportToTaskTree()
  if (!task) {
    ElMessage.warning('任务为空，无法保存')
    return
  }
  
  try {
    // 检查任务名是否重复（需要动态导入 listTasks）
    const { listTasks } = await import('@/api/task')
    const existingTasks = await listTasks()
    const duplicateName = existingTasks.find(t => 
      t.name === task.name && t.id !== currentTask.value?.id
    )
    if (duplicateName) {
      ElMessage.error(`任务名 "${task.name}" 已存在，请使用其他名称`)
      return
    }
    
    if (currentTask.value?.id) {
      await updateTask(currentTask.value.id, task)
    } else {
      const saved = await createTask(task)
      taskStore.currentTask!.id = saved.id
    }
    taskStore.isDirty = false
    ElMessage.success('任务已保存')
  } catch (e: any) {
    ElMessage.error(`保存失败: ${e.message || e}`)
  }
}

function onNameChange() {
  if (currentTask.value) {
    currentTask.value.name = taskName.value
  }
}

async function onExecute() {
  const task = taskStore.exportToTaskTree()
  if (!task) {
    ElMessage.warning('任务为空')
    return
  }
  
  try {
    taskStore.clearNodeStatuses()
    taskStore.isExecuting = true
    
    const result = await executeTaskTree(task)
    if (result.success) {
      ElMessage.success('任务开始执行')
    } else {
      ElMessage.error(`执行失败: ${result.message}`)
      taskStore.isExecuting = false
    }
  } catch (e: any) {
    ElMessage.error(`执行失败: ${e.message || e}`)
    taskStore.isExecuting = false
  }
}

async function onPause() {
  try {
    const taskId = executionState.value?.task_id || 'current'
    await pauseTask(taskId)
    ElMessage.info('任务已暂停')
  } catch (e: any) {
    ElMessage.error(`暂停失败: ${e.message || e}`)
  }
}

async function onResume() {
  try {
    const taskId = executionState.value?.task_id || 'current'
    await resumeTask(taskId)
    ElMessage.info('任务继续执行')
  } catch (e: any) {
    ElMessage.error(`恢复失败: ${e.message || e}`)
  }
}

async function onCancel() {
  try {
    await ElMessageBox.confirm('确定要停止当前任务吗？', '确认停止', {
      type: 'warning'
    })
    
    const taskId = executionState.value?.task_id || 'current'
    await cancelTask(taskId)
    taskStore.isExecuting = false
    ElMessage.info('任务已停止')
  } catch {
    // 用户取消
  }
}

function toggleNodePalette() {
  taskStore.nodePaletteVisible = !taskStore.nodePaletteVisible
}

function togglePropertyPanel() {
  taskStore.propertyPanelVisible = !taskStore.propertyPanelVisible
}

async function onExport(command: string) {
  const task = taskStore.exportToTaskTree()
  if (!task) {
    ElMessage.warning('任务为空')
    return
  }
  
  const jsonStr = JSON.stringify(task, null, 2)
  
  if (command === 'clipboard') {
    try {
      await navigator.clipboard.writeText(jsonStr)
      ElMessage.success('已复制到剪贴板')
    } catch {
      ElMessage.error('复制失败')
    }
  } else if (command === 'json') {
    // 下载 JSON 文件
    const blob = new Blob([jsonStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${task.name || 'task'}.json`
    a.click()
    URL.revokeObjectURL(url)
    ElMessage.success('JSON 文件已下载')
  }
}

// 导入任务
async function onImport(command: string) {
  if (isDirty.value) {
    try {
      await ElMessageBox.confirm('当前任务未保存，导入将覆盖当前任务，是否继续？', '提示', {
        type: 'warning',
        confirmButtonText: '继续',
        cancelButtonText: '取消'
      })
    } catch {
      return
    }
  }
  
  if (command === 'file') {
    // 触发文件选择
    fileInputRef.value?.click()
  } else if (command === 'clipboard') {
    // 从剪贴板导入
    try {
      const text = await navigator.clipboard.readText()
      importFromJson(text)
    } catch (e) {
      ElMessage.error('无法读取剪贴板，请确保有复制内容且授权')
    }
  }
}

// 处理文件导入
function handleFileImport(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  
  const reader = new FileReader()
  reader.onload = (e) => {
    const text = e.target?.result as string
    importFromJson(text)
    // 清除 input 值，允许重复选择同一文件
    input.value = ''
  }
  reader.onerror = () => {
    ElMessage.error('文件读取失败')
  }
  reader.readAsText(file)
}

// 从 JSON 字符串导入任务
function importFromJson(jsonStr: string) {
  try {
    const task = JSON.parse(jsonStr)
    
    // 验证任务格式
    if (!task.root || !task.root.type) {
      ElMessage.error('无效的任务格式：缺少 root 节点')
      return
    }
    
    // 加载任务
    taskStore.loadTask({
      id: undefined, // 导入后作为新任务
      name: task.name || '导入的任务',
      description: task.description || '',
      root: task.root
    })
    
    taskStore.isDirty = true // 标记为需要保存
    ElMessage.success('任务导入成功')
  } catch (e) {
    ElMessage.error('JSON 解析失败，请检查格式')
    console.error('Import error:', e)
  }
}

// 键盘快捷键
function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'F5') {
    e.preventDefault()
    if (canExecute.value) onExecute()
  } else if (e.ctrlKey && e.key === 's') {
    e.preventDefault()
    if (isDirty.value) onSave()
  }
}

// 注册键盘事件
onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.task-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: 0 16px;
  background-color: #252526;
  border-bottom: 1px solid #3c3c3c;
}

.toolbar-left,
.toolbar-center,
.toolbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.task-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.dirty-indicator {
  color: #e6a23c;
  font-size: 12px;
}

.execution-status {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  background-color: #333;
  color: #ccc;
}

.execution-status.status-running {
  background-color: rgba(64, 158, 255, 0.2);
  color: #409eff;
}

.execution-status.status-paused {
  background-color: rgba(230, 162, 60, 0.2);
  color: #e6a23c;
}

.execution-status.status-completed {
  background-color: rgba(103, 194, 58, 0.2);
  color: #67c23a;
}

.execution-status.status-failed,
.execution-status.status-cancelled {
  background-color: rgba(245, 108, 108, 0.2);
  color: #f56c6c;
}

.loading {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.progress {
  margin-left: 4px;
  font-family: monospace;
}

/* Element Plus 样式覆盖 */
:deep(.el-button) {
  --el-button-bg-color: #3c3c3c;
  --el-button-border-color: #555;
  --el-button-text-color: #ccc;
  --el-button-hover-bg-color: #505050;
  --el-button-hover-border-color: #666;
  --el-button-hover-text-color: #fff;
}

:deep(.el-button--primary) {
  --el-button-bg-color: #409eff;
  --el-button-border-color: #409eff;
  --el-button-text-color: #fff;
}

:deep(.el-button--success) {
  --el-button-bg-color: #67c23a;
  --el-button-border-color: #67c23a;
  --el-button-text-color: #fff;
}

:deep(.el-button--warning) {
  --el-button-bg-color: #e6a23c;
  --el-button-border-color: #e6a23c;
  --el-button-text-color: #fff;
}

:deep(.el-button--danger) {
  --el-button-bg-color: #f56c6c;
  --el-button-border-color: #f56c6c;
  --el-button-text-color: #fff;
}

:deep(.el-divider--vertical) {
  border-color: #3c3c3c;
  height: 24px;
}

:deep(.el-input__wrapper) {
  background-color: #2d2d2d;
  border-color: #3c3c3c;
}

:deep(.el-input__inner) {
  color: #ccc;
}
</style>
