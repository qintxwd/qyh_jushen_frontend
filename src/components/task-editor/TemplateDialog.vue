<template>
  <el-dialog
    v-model="visible"
    title="选择任务模板"
    width="700px"
    :close-on-click-modal="false"
  >
    <div class="template-dialog">
      <!-- 分类筛选 -->
      <div class="category-tabs">
        <el-radio-group v-model="selectedCategory" size="small">
          <el-radio-button label="">全部</el-radio-button>
          <el-radio-button 
            v-for="cat in categories" 
            :key="cat" 
            :label="cat"
          >{{ cat }}</el-radio-button>
        </el-radio-group>
      </div>
      
      <!-- 模板列表 -->
      <div class="template-grid">
        <div 
          v-for="template in filteredTemplates"
          :key="template.id"
          class="template-card"
          :class="{ selected: selectedTemplate?.id === template.id }"
          @click="selectTemplate(template)"
        >
          <div class="template-icon" :style="{ backgroundColor: getCategoryColor(template.category) }">
            <el-icon :size="24">
              <component :is="template.icon" />
            </el-icon>
          </div>
          <div class="template-info">
            <div class="template-name">{{ template.name }}</div>
            <div class="template-desc">{{ template.description }}</div>
            <el-tag size="small" :type="getCategoryType(template.category)">
              {{ template.category }}
            </el-tag>
          </div>
        </div>
      </div>
      
      <!-- 模板预览 -->
      <div v-if="selectedTemplate" class="template-preview">
        <h4>模板预览</h4>
        <div class="preview-content">
          <pre>{{ JSON.stringify(selectedTemplate.task.root, null, 2) }}</pre>
        </div>
      </div>
    </div>
    
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" :disabled="!selectedTemplate" @click="confirm">
        使用模板
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { getTaskTemplates, type TaskTemplate } from '@/api/task'
import { useTaskEditorStore } from '@/stores/task'
import * as Icons from '@element-plus/icons-vue'

const visible = defineModel<boolean>('visible', { default: false })

const taskStore = useTaskEditorStore()
const templates = getTaskTemplates()
const selectedCategory = ref('')
const selectedTemplate = ref<TaskTemplate | null>(null)

// 获取所有类别
const categories = computed(() => {
  const cats = new Set(templates.map(t => t.category))
  return Array.from(cats)
})

// 筛选模板
const filteredTemplates = computed(() => {
  if (!selectedCategory.value) return templates
  return templates.filter(t => t.category === selectedCategory.value)
})

function selectTemplate(template: TaskTemplate) {
  selectedTemplate.value = template
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    '常用': '#409EFF',
    '高级': '#E6A23C',
    '安全': '#67C23A'
  }
  return colors[category] || '#909399'
}

function getCategoryType(category: string): '' | 'success' | 'warning' | 'danger' | 'info' {
  const types: Record<string, '' | 'success' | 'warning' | 'danger' | 'info'> = {
    '常用': '',
    '高级': 'warning',
    '安全': 'success'
  }
  return types[category] || 'info'
}

function confirm() {
  if (!selectedTemplate.value) return
  
  // 加载模板到编辑器
  const template = selectedTemplate.value
  const task = JSON.parse(JSON.stringify(template.task)) // 深拷贝
  
  taskStore.loadTask(task)
  taskStore.isDirty = true
  
  ElMessage.success(`已加载模板: ${template.name}`)
  visible.value = false
  selectedTemplate.value = null
}
</script>

<style scoped>
.template-dialog {
  max-height: 60vh;
  overflow-y: auto;
}

.category-tabs {
  margin-bottom: 16px;
}

.template-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

.template-card {
  display: flex;
  gap: 12px;
  padding: 12px;
  border: 1px solid #3c3c3c;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  background-color: #2d2d2d;
}

.template-card:hover {
  border-color: #555;
  background-color: #333;
}

.template-card.selected {
  border-color: #409eff;
  background-color: rgba(64, 158, 255, 0.1);
}

.template-icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
}

.template-info {
  flex: 1;
  min-width: 0;
}

.template-name {
  font-weight: 500;
  color: #fff;
  margin-bottom: 4px;
}

.template-desc {
  font-size: 12px;
  color: #999;
  margin-bottom: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.template-preview {
  background-color: #1e1e1e;
  border-radius: 8px;
  padding: 12px;
}

.template-preview h4 {
  margin: 0 0 8px;
  color: #ccc;
  font-size: 14px;
}

.preview-content {
  max-height: 200px;
  overflow-y: auto;
}

.preview-content pre {
  margin: 0;
  font-size: 11px;
  color: #999;
  white-space: pre-wrap;
}
</style>
