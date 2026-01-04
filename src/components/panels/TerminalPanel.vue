<template>
  <div class="terminal-panel">
    <TerminalPane 
      :pane="rootPane" 
      :is-root="true"
      @split="handleSplit"
      @add-tab="handleAddTab"
      @close-tab="handleCloseTab"
      @close-pane="handleClosePane"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TerminalPane from './TerminalPane.vue'

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

let nextPaneId = 1
let nextTabId = 1

// 根面板
const rootPane = ref<Pane>({
  id: nextPaneId++,
  type: 'leaf',
  tabs: [
    { id: 1, title: '终端 1', key: Date.now() }
  ],
  activeTabId: 1
})
nextTabId = 2 // 下一个终端从2开始

// 分割面板（只支持左右分屏）
function handleSplit(paneId: number, direction: 'horizontal' | 'vertical') {
  splitPane(rootPane.value, paneId, direction)
}

function splitPane(pane: Pane, targetId: number, direction: 'horizontal' | 'vertical'): boolean {
  if (pane.id === targetId && pane.type === 'leaf') {
    // 将当前叶子节点转换为分割节点
    const newTabId = nextTabId++
    const newTab = { id: newTabId, title: `终端 ${newTabId}`, key: Date.now() }
    
    // 保存原有的 tabs 和 activeTabId
    const originalTabs = pane.tabs
    const originalActiveTabId = pane.activeTabId
    
    pane.type = 'split'
    pane.direction = direction
    pane.children = [
      {
        id: pane.id,
        type: 'leaf',
        tabs: originalTabs, // 保留原有的 tabs，不会重新创建终端
        activeTabId: originalActiveTabId
      },
      {
        id: nextPaneId++,
        type: 'leaf',
        tabs: [newTab],
        activeTabId: newTab.id
      }
    ]
    
    delete pane.tabs
    delete pane.activeTabId
    
    return true
  }
  
  if (pane.children) {
    for (const child of pane.children) {
      if (splitPane(child, targetId, direction)) {
        return true
      }
    }
  }
  
  return false
}

// 添加新标签页
function handleAddTab(paneId: number) {
  addTab(rootPane.value, paneId)
}

function addTab(pane: Pane, targetId: number): boolean {
  if (pane.id === targetId && pane.type === 'leaf' && pane.tabs) {
    const newTabId = nextTabId++
    const newTab = { id: newTabId, title: `终端 ${newTabId}`, key: Date.now() }
    pane.tabs.push(newTab)
    pane.activeTabId = newTab.id
    return true
  }
  
  if (pane.children) {
    for (const child of pane.children) {
      if (addTab(child, targetId)) {
        return true
      }
    }
  }
  
  return false
}

// 关闭标签页
function handleCloseTab(paneId: number, tabId: number) {
  closeTab(rootPane.value, paneId, tabId)
}

function closeTab(pane: Pane, paneId: number, tabId: number): boolean {
  if (pane.id === paneId && pane.type === 'leaf' && pane.tabs) {
    const index = pane.tabs.findIndex(t => t.id === tabId)
    if (index !== -1) {
      pane.tabs.splice(index, 1)
      
      // 如果关闭的是当前激活的标签，激活相邻的标签
      if (pane.activeTabId === tabId && pane.tabs.length > 0) {
        const newIndex = Math.min(index, pane.tabs.length - 1)
        pane.activeTabId = pane.tabs[newIndex].id
      }
      
      return true
    }
  }
  
  if (pane.children) {
    for (const child of pane.children) {
      if (closeTab(child, paneId, tabId)) {
        return true
      }
    }
  }
  
  return false
}

// 关闭面板
function handleClosePane(paneId: number) {
  // 不能关闭根面板
  if (paneId === rootPane.value.id) return
  
  closePaneRecursive(rootPane.value, paneId)
}

function closePaneRecursive(pane: Pane, targetId: number): boolean {
  if (pane.children) {
    const index = pane.children.findIndex(c => c.id === targetId)
    if (index !== -1) {
      // 删除目标面板
      pane.children.splice(index, 1)
      
      // 如果只剩一个子面板，将其提升
      if (pane.children.length === 1) {
        const remaining = pane.children[0]
        Object.assign(pane, remaining)
      }
      
      return true
    }
    
    for (const child of pane.children) {
      if (closePaneRecursive(child, targetId)) {
        return true
      }
    }
  }
  
  return false
}
</script>

<style scoped>
.terminal-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #1e1e1e;
}
</style>
