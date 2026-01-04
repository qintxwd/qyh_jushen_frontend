<template>
  <div class="panel-container">
    <!-- Tab 标签栏 -->
    <div class="tabs-header">
      <div class="tabs-scroll">
        <div 
          v-for="tab in layoutStore.openTabs" 
          :key="tab.id"
          class="tab-item"
          :class="{ active: tab.id === layoutStore.activeTabId }"
          @click="layoutStore.setActiveTab(tab.id)"
          @mousedown.middle="closeTab(tab)"
          @contextmenu.prevent="showContextMenu($event, tab)"
        >
          <el-icon :size="14">
            <component :is="tab.icon" />
          </el-icon>
          <span class="tab-title">{{ tab.title }}</span>
          <span 
            v-if="tab.closable" 
            class="tab-close"
            @click.stop="closeTab(tab)"
          >
            <el-icon :size="12"><Close /></el-icon>
          </span>
        </div>
      </div>
      
      <div class="tabs-actions">
        <el-tooltip content="关闭面板" placement="bottom">
          <el-button text size="small" @click="layoutStore.toggleRightPanel">
            <el-icon><Close /></el-icon>
          </el-button>
        </el-tooltip>
      </div>
    </div>

    <!-- Tab 内容区域 -->
    <div class="tabs-content">
      <template v-for="tab in layoutStore.openTabs" :key="tab.id">
        <div 
          v-show="tab.id === layoutStore.activeTabId"
          class="tab-panel"
        >
          <component :is="getPanelComponent(tab.panelId)" />
        </div>
      </template>
    </div>

    <!-- 右键菜单 -->
    <div 
      v-if="contextMenu.visible"
      class="context-menu"
      :style="{ left: contextMenu.x + 'px', top: contextMenu.y + 'px' }"
      @click="hideContextMenu"
    >
      <div class="context-menu-item" @click="closeCurrentTab">
        <el-icon><Close /></el-icon>
        <span>关闭</span>
      </div>
      <div class="context-menu-item" @click="closeOtherTabs">
        <el-icon><FolderRemove /></el-icon>
        <span>关闭其他</span>
      </div>
      <div class="context-menu-item" @click="closeAllTabs">
        <el-icon><Delete /></el-icon>
        <span>关闭全部</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import { useLayoutStore, type OpenTab } from '@/stores/layout'

const layoutStore = useLayoutStore()

// 动态加载面板组件
const panelComponents: Record<string, ReturnType<typeof defineAsyncComponent>> = {
  'ArmControlPanel': defineAsyncComponent(() => import('./ArmControlPanel.vue')),
  'GripperPanel': defineAsyncComponent(() => import('./GripperPanel.vue')),
  'ChassisPanel': defineAsyncComponent(() => import('./ChassisPanel.vue')),
  'HeadPanel': defineAsyncComponent(() => import('./HeadPanel.vue')),
  'LiftPanel': defineAsyncComponent(() => import('./LiftPanel.vue')),
  'WaistPanel': defineAsyncComponent(() => import('./WaistPanel.vue')),
  'TaskPanel': defineAsyncComponent(() => import('./TaskPanel.vue')),
  'SettingsPanel': defineAsyncComponent(() => import('./SettingsPanel.vue')),
  'VRTeleoperationPanel': defineAsyncComponent(() => import('./VRTeleoperationPanel.vue')),
  'TerminalPanel': defineAsyncComponent(() => import('./TerminalPanel.vue'))
}

// 右键菜单
const contextMenu = reactive({
  visible: false,
  x: 0,
  y: 0,
  targetTab: null as OpenTab | null
})

function getPanelComponent(panelId: string) {
  const panelDef = layoutStore.activePanel
  if (panelDef) {
    return panelComponents[panelDef.component]
  }
  
  // 根据 panelId 查找组件
  const componentName = {
    'arm-control': 'ArmControlPanel',
    'gripper': 'GripperPanel',
    'chassis': 'ChassisPanel',
    'head': 'HeadPanel',
    'lift': 'LiftPanel',
    'waist': 'WaistPanel',
    'task': 'TaskPanel',
    'settings': 'SettingsPanel',
    'vr-teleoperation': 'VRTeleoperationPanel',
    'terminal': 'TerminalPanel'
  }[panelId]
  
  return componentName ? panelComponents[componentName] : null
}

function closeTab(tab: OpenTab) {
  if (tab.closable) {
    layoutStore.closeTab(tab.id)
  }
}

function showContextMenu(event: MouseEvent, tab: OpenTab) {
  contextMenu.visible = true
  contextMenu.x = event.clientX
  contextMenu.y = event.clientY
  contextMenu.targetTab = tab
}

function hideContextMenu() {
  contextMenu.visible = false
  contextMenu.targetTab = null
}

function closeCurrentTab() {
  if (contextMenu.targetTab?.closable) {
    layoutStore.closeTab(contextMenu.targetTab.id)
  }
}

function closeOtherTabs() {
  if (contextMenu.targetTab) {
    layoutStore.closeOtherTabs(contextMenu.targetTab.id)
  }
}

function closeAllTabs() {
  layoutStore.closeAllTabs()
}

// 点击其他地方关闭右键菜单
function handleClickOutside(event: MouseEvent) {
  if (contextMenu.visible) {
    hideContextMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.panel-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

/* Tab 标签栏 */
.tabs-header {
  display: flex;
  align-items: center;
  height: 35px;
  background-color: #2d2d2d;
  border-bottom: 1px solid #3c3c3c;
  flex-shrink: 0;
}

.tabs-scroll {
  flex: 1;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
}

.tabs-scroll::-webkit-scrollbar {
  height: 3px;
}

.tabs-scroll::-webkit-scrollbar-thumb {
  background-color: #555;
  border-radius: 2px;
}

.tab-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 12px;
  height: 34px;
  border-right: 1px solid #3c3c3c;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.2s;
  flex-shrink: 0;
}

.tab-item:hover {
  background-color: #37373d;
}

.tab-item.active {
  background-color: #1e1e1e;
  border-bottom: 1px solid #1e1e1e;
  margin-bottom: -1px;
}

.tab-title {
  font-size: 13px;
  color: #ccc;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tab-item.active .tab-title {
  color: #fff;
}

.tab-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 3px;
  margin-left: 4px;
  opacity: 0;
  transition: all 0.2s;
}

.tab-item:hover .tab-close {
  opacity: 0.7;
}

.tab-close:hover {
  opacity: 1;
  background-color: #555;
}

.tabs-actions {
  display: flex;
  align-items: center;
  padding: 0 4px;
}

/* Tab 内容区域 */
.tabs-content {
  flex: 1;
  overflow: hidden;
}

.tab-panel {
  height: 100%;
  overflow-y: auto;
  background-color: #1e1e1e;
}

/* 右键菜单 */
.context-menu {
  position: fixed;
  z-index: 1000;
  background-color: #2d2d2d;
  border: 1px solid #454545;
  border-radius: 6px;
  padding: 4px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  min-width: 150px;
}

.context-menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  cursor: pointer;
  color: #ccc;
  font-size: 13px;
  transition: background-color 0.15s;
}

.context-menu-item:hover {
  background-color: #094771;
  color: #fff;
}

.context-menu-item .el-icon {
  font-size: 14px;
}
</style>
