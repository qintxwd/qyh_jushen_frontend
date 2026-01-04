<template>
  <!-- 分割容器 -->
  <div 
    v-if="pane.type === 'split'" 
    class="split-container"
    :class="pane.direction"
  >
    <TerminalPane
      v-for="(child, index) in pane.children"
      :key="child.id"
      :pane="child"
      :is-root="false"
      @split="$emit('split', $event, arguments[1])"
      @add-tab="$emit('add-tab', $event)"
      @close-tab="$emit('close-tab', $event, arguments[1])"
      @close-pane="$emit('close-pane', $event)"
    />
  </div>

  <!-- 叶子节点（包含标签页的终端） -->
  <div v-else class="terminal-pane">
    <!-- 标签栏 -->
    <div class="tab-bar">
      <div class="tabs-container">
        <div
          v-for="tab in pane.tabs"
          :key="tab.id"
          class="tab"
          :class="{ active: pane.activeTabId === tab.id }"
          @click="activateTab(tab.id)"
        >
          <span class="tab-title">{{ tab.title }}</span>
          <el-icon 
            v-if="pane.tabs && pane.tabs.length > 1"
            class="tab-close" 
            @click.stop="closeTab(tab.id)"
          >
            <Close />
          </el-icon>
        </div>
        
        <el-button 
          class="add-tab-btn" 
          size="small"
          text
          @click="addTab"
        >
          <el-icon><Plus /></el-icon>
        </el-button>
      </div>

      <div class="pane-actions">
        <el-dropdown trigger="click" @command="handleCommand">
          <el-button size="small" text>
            <el-icon><MoreFilled /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="split-h">
                <el-icon><Grid /></el-icon>
                左右分屏
              </el-dropdown-item>
              <el-dropdown-item command="split-v">
                <el-icon><Grid /></el-icon>
                上下分屏
              </el-dropdown-item>
              <el-dropdown-item divided command="close-pane" v-if="!isRoot">
                <el-icon><Close /></el-icon>
                关闭面板
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <!-- 终端内容区 -->
    <div class="terminal-content">
      <div
        v-for="tab in pane.tabs"
        :key="tab.id"
        v-show="pane.activeTabId === tab.id"
        class="terminal-instance"
      >
        <Terminal :key="tab.key" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Close, Plus, MoreFilled, Grid } from '@element-plus/icons-vue'
import Terminal from '@/components/Terminal.vue'

interface TerminalTab {
  id: number
  title: string
  key: number
}

interface Pane {
  id: number
  type: 'leaf' | 'split'
  direction?: 'horizontal' | 'vertical'
  tabs?: TerminalTab[]
  activeTabId?: number
  children?: Pane[]
}

const props = defineProps<{
  pane: Pane
  isRoot: boolean
}>()

const emit = defineEmits<{
  split: [paneId: number, direction: 'horizontal' | 'vertical']
  addTab: [paneId: number]
  closeTab: [paneId: number, tabId: number]
  closePane: [paneId: number]
}>()

function activateTab(tabId: number) {
  if (props.pane.type === 'leaf') {
    props.pane.activeTabId = tabId
  }
}

function addTab() {
  emit('add-tab', props.pane.id)
}

function closeTab(tabId: number) {
  emit('close-tab', props.pane.id, tabId)
}

function handleCommand(command: string) {
  if (command === 'split-h') {
    emit('split', props.pane.id, 'horizontal')
  } else if (command === 'split-v') {
    emit('split', props.pane.id, 'vertical')
  } else if (command === 'close-pane') {
    emit('close-pane', props.pane.id)
  }
}
</script>

<style scoped>
/* 分割容器 */
.split-container {
  display: flex;
  height: 100%;
  width: 100%;
  gap: 1px;
  background-color: #3c3c3c;
}

.split-container.horizontal {
  flex-direction: row;
}

.split-container.vertical {
  flex-direction: column;
}

.split-container > * {
  flex: 1;
  min-width: 200px;
  min-height: 100px;
}

/* 终端面板 */
.terminal-pane {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #1e1e1e;
}

/* 标签栏 */
.tab-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #252526;
  border-bottom: 1px solid #3c3c3c;
  flex-shrink: 0;
  min-height: 36px;
}

.tabs-container {
  display: flex;
  align-items: center;
  flex: 1;
  overflow-x: auto;
  overflow-y: hidden;
}

.tabs-container::-webkit-scrollbar {
  height: 3px;
}

.tabs-container::-webkit-scrollbar-thumb {
  background-color: #555;
  border-radius: 2px;
}

.tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  font-size: 13px;
  color: #888;
  background-color: transparent;
  border-right: 1px solid #3c3c3c;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  transition: all 0.2s;
}

.tab:hover {
  background-color: #2a2d2e;
  color: #ccc;
}

.tab.active {
  background-color: #1e1e1e;
  color: #fff;
  border-bottom: 2px solid #409eff;
}

.tab-title {
  font-weight: 400;
}

.tab-close {
  font-size: 14px;
  opacity: 0;
  transition: opacity 0.2s;
}

.tab:hover .tab-close,
.tab.active .tab-close {
  opacity: 0.7;
}

.tab-close:hover {
  opacity: 1 !important;
  color: #f56c6c;
}

.add-tab-btn {
  margin-left: 4px;
  color: #888;
  min-width: 32px;
  padding: 4px 8px;
}

.add-tab-btn:hover {
  color: #fff;
  background-color: #2a2d2e;
}

.pane-actions {
  display: flex;
  align-items: center;
  padding-right: 4px;
  border-left: 1px solid #3c3c3c;
}

/* 终端内容 */
.terminal-content {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.terminal-instance {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

/* 覆盖Element Plus样式 */
:deep(.el-button) {
  --el-button-bg-color: transparent;
  --el-button-border-color: transparent;
  --el-button-text-color: #888;
  --el-button-hover-bg-color: #2a2d2e;
  --el-button-hover-border-color: transparent;
  --el-button-hover-text-color: #fff;
}

:deep(.el-dropdown-menu) {
  background-color: #2d2d2d;
  border-color: #3c3c3c;
}

:deep(.el-dropdown-menu__item) {
  color: #ccc;
}

:deep(.el-dropdown-menu__item:hover) {
  background-color: #3c3c3c;
  color: #fff;
}

:deep(.el-dropdown-menu__item .el-icon) {
  margin-right: 8px;
}
</style>
