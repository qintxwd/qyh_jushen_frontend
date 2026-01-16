<template>
  <div class="terminal-panel">
    <!-- 标签栏 -->
    <div class="tab-bar">
      <div class="tabs-container">
        <div
          v-for="tab in tabs"
          :key="tab.id"
          class="tab"
          :class="{ active: activeTabId === tab.id }"
          @click="activateTab(tab.id)"
        >
          <span class="tab-title">{{ tab.title }}</span>
          <el-icon 
            v-if="tabs.length > 1"
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
          <SvgIcon name="plus" :size="16" />
        </el-button>
      </div>
    </div>

    <!-- 终端内容区 -->
    <div class="terminal-content">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        v-show="activeTabId === tab.id"
        class="terminal-instance"
      >
        <Terminal :key="tab.key" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import Terminal from '@/components/Terminal.vue'

interface TerminalTab {
  id: number
  title: string
  key: number
}

let nextTabId = 1

const tabs = ref<TerminalTab[]>([
  { id: 1, title: '终端 1', key: Date.now() }
])

const activeTabId = ref<number>(1)
nextTabId = 2

function activateTab(tabId: number) {
  activeTabId.value = tabId
}

function addTab() {
  const newTabId = nextTabId++
  tabs.value.push({ id: newTabId, title: `终端 ${newTabId}`, key: Date.now() })
  activeTabId.value = newTabId
}

function closeTab(tabId: number) {
  const index = tabs.value.findIndex(t => t.id === tabId)
  if (index === -1) return
  tabs.value.splice(index, 1)
  if (activeTabId.value === tabId && tabs.value.length > 0) {
    const newIndex = Math.min(index, tabs.value.length - 1)
    activeTabId.value = tabs.value[newIndex].id
  }
}
</script>

<style scoped>
.terminal-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--color-bg-secondary, #1e1e1e);
}

/* 标签栏 */
.tab-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-bg-secondary, #252526);
  border-bottom: 1px solid var(--color-border, #3c3c3c);
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
  color: var(--color-text-muted, #888);
  background-color: transparent;
  border-right: 1px solid var(--color-border, #3c3c3c);
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  transition: all 0.2s;
}

.tab:hover {
  background-color: var(--color-surface-hover, #2a2d2e);
  color: var(--color-text-secondary, #ccc);
}

.tab.active {
  background-color: var(--color-bg-secondary, #1e1e1e);
  color: var(--color-text-primary, #fff);
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
</style>
