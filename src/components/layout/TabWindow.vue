<template>
  <div 
    class="tab-window"
    :class="{ 
      'drop-target': layoutStore.dropTarget === position,
      'dragging': layoutStore.draggingTab !== null
    }"
    @dragover.prevent="onDragOver"
    @dragleave="onDragLeave"
    @drop="onDrop"
  >
    <!-- Tab 标签栏 -->
    <div class="tabs-header">
      <div class="tabs-scroll">
        <div 
          v-for="tab in tabs" 
          :key="tab.id"
          class="tab-item"
          :class="{ active: tab.id === activeTabId }"
          draggable="true"
          @click="layoutStore.setActiveTab(tab.id, position)"
          @mousedown.middle="closeTab(tab)"
          @contextmenu.prevent="showContextMenu($event, tab)"
          @dragstart="onDragStart($event, tab)"
          @dragend="onDragEnd"
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
        <!-- 移动到另一侧按钮 -->
        <el-tooltip 
          v-if="tabs.length > 0"
          :content="position === 'left' ? '移到右侧' : '移到左侧'" 
          placement="bottom"
        >
          <el-button text size="small" @click="moveActiveTab">
            <el-icon>
              <component :is="position === 'left' ? 'Right' : 'Left'" />
            </el-icon>
          </el-button>
        </el-tooltip>
        
        <!-- 最大化按钮 -->
        <el-tooltip content="最大化" placement="bottom">
          <el-button text size="small" @click="layoutStore.maximizeWindow(position)">
            <el-icon><FullScreen /></el-icon>
          </el-button>
        </el-tooltip>
      </div>
    </div>

    <!-- Tab 内容区域 -->
    <div class="tabs-content">
      <template v-for="tab in tabs" :key="tab.id">
        <div 
          v-show="tab.id === activeTabId"
          class="tab-panel"
        >
          <component :is="getPanelComponent(tab.panelId)" />
        </div>
      </template>
      
      <!-- 空状态 -->
      <div v-if="tabs.length === 0" class="empty-state">
        <el-icon :size="48"><FolderOpened /></el-icon>
        <p>拖拽 Tab 到此处</p>
        <p class="hint">或从左侧菜单选择面板</p>
      </div>
    </div>

    <!-- 拖拽提示覆盖层 -->
    <div v-if="layoutStore.draggingTab && layoutStore.dropTarget === position" class="drop-overlay">
      <div class="drop-hint">
        <el-icon :size="24"><Plus /></el-icon>
        <span>放置到此窗口</span>
      </div>
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
      <div class="context-menu-item" @click="moveToOtherWindow">
        <el-icon><component :is="position === 'left' ? 'Right' : 'Left'" /></el-icon>
        <span>{{ position === 'left' ? '移到右窗口' : '移到左窗口' }}</span>
      </div>
      <div class="context-menu-divider"></div>
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
import { reactive, onMounted, onUnmounted, defineAsyncComponent, computed } from 'vue'
import { useLayoutStore, type OpenTab, type WindowPosition } from '@/stores/layout'

const props = defineProps<{
  position: WindowPosition
  tabs: OpenTab[]
  activeTabId: string | null
}>()

const layoutStore = useLayoutStore()

// 动态加载面板组件
const panelComponents: Record<string, ReturnType<typeof defineAsyncComponent>> = {
  'Scene3DPanel': defineAsyncComponent(() => import('../panels/Scene3DPanel.vue')),
  'ArmControlPanel': defineAsyncComponent(() => import('../panels/ArmControlPanel.vue')),
  'GripperPanel': defineAsyncComponent(() => import('../panels/GripperPanel.vue')),
  'ChassisPanel': defineAsyncComponent(() => import('../panels/ChassisPanel.vue')),
  'HeadPanel': defineAsyncComponent(() => import('../panels/HeadPanel.vue')),
  'LiftPanel': defineAsyncComponent(() => import('../panels/LiftPanel.vue')),
  'WaistPanel': defineAsyncComponent(() => import('../panels/WaistPanel.vue')),
  'TaskPanel': defineAsyncComponent(() => import('../panels/TaskPanel.vue')),
  'SettingsPanel': defineAsyncComponent(() => import('../panels/SettingsPanel.vue')),
  'VRTeleoperationPanel': defineAsyncComponent(() => import('../panels/VRTeleoperationPanel.vue')),
  'DataCollectionPanel': defineAsyncComponent(() => import('../panels/DataCollectionPanel.vue')),
  'TerminalPanel': defineAsyncComponent(() => import('../panels/TerminalPanel.vue'))
}

// 面板ID到组件名的映射
const panelIdToComponent: Record<string, string> = {
  'scene3d': 'Scene3DPanel',
  'arm-control': 'ArmControlPanel',
  'gripper': 'GripperPanel',
  'chassis': 'ChassisPanel',
  'head': 'HeadPanel',
  'lift': 'LiftPanel',
  'waist': 'WaistPanel',
  'task': 'TaskPanel',
  'settings': 'SettingsPanel',
  'vr-teleoperation': 'VRTeleoperationPanel',
  'data-collection': 'DataCollectionPanel',
  'terminal': 'TerminalPanel'
}

// 右键菜单
const contextMenu = reactive({
  visible: false,
  x: 0,
  y: 0,
  targetTab: null as OpenTab | null
})

function getPanelComponent(panelId: string) {
  const componentName = panelIdToComponent[panelId]
  return componentName ? panelComponents[componentName] : null
}

function closeTab(tab: OpenTab) {
  if (tab.closable) {
    layoutStore.closeTab(tab.id)
  }
}

function moveActiveTab() {
  if (props.activeTabId) {
    const targetPosition: WindowPosition = props.position === 'left' ? 'right' : 'left'
    layoutStore.moveTab(props.activeTabId, targetPosition)
  }
}

// 拖拽事件
function onDragStart(event: DragEvent, tab: OpenTab) {
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', tab.id)
  }
  layoutStore.startDrag(tab, props.position)
}

function onDragEnd() {
  layoutStore.endDrag()
}

function onDragOver(event: DragEvent) {
  if (layoutStore.draggingTab && layoutStore.draggingTab.from !== props.position) {
    layoutStore.setDropTarget(props.position)
  }
}

function onDragLeave() {
  if (layoutStore.dropTarget === props.position) {
    layoutStore.setDropTarget(null)
  }
}

function onDrop(event: DragEvent) {
  event.preventDefault()
  if (layoutStore.draggingTab) {
    layoutStore.moveTab(layoutStore.draggingTab.tab.id, props.position)
  }
  layoutStore.endDrag()
}

// 右键菜单
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

function moveToOtherWindow() {
  if (contextMenu.targetTab) {
    const targetPosition: WindowPosition = props.position === 'left' ? 'right' : 'left'
    layoutStore.moveTab(contextMenu.targetTab.id, targetPosition)
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
.tab-window {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  position: relative;
  background: transparent;
  font-family: var(--font-body);
}

.tab-window.dragging {
  pointer-events: auto;
}

.tab-window.drop-target {
  outline: 2px dashed #F59E0B;
  outline-offset: -2px;
  background: rgba(245, 158, 11, 0.05);
}

/* Tab 标签栏 */
.tabs-header {
  display: flex;
  align-items: center;
  height: 38px;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(148, 163, 184, 0.15);
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
  gap: 8px;
  padding: 0 16px;
  height: 38px;
  border-right: 1px solid rgba(148, 163, 184, 0.1);
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s ease;
  flex-shrink: 0;
  user-select: none;
  position: relative;
  background: transparent;
  color: #CBD5E1;
}

.tab-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: transparent;
  transition: all 0.3s ease;
}

.tab-item:hover {
  background: rgba(30, 41, 59, 0.5);
  color: #F8FAFC;
}

.tab-item.active {
  background: rgba(30, 41, 59, 0.7);
  color: #F59E0B;
}

.tab-item.active::after {
  background: linear-gradient(90deg, #F59E0B 0%, #F97316 100%);
  box-shadow: 0 0 8px rgba(245, 158, 11, 0.6);
}

.tab-item[draggable="true"] {
  cursor: grab;
}

.tab-item[draggable="true"]:active {
  cursor: grabbing;
  opacity: 0.7;
}

.tab-title {
  font-size: 13px;
  font-weight: 500;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tab-item.active .tab-title {
  font-weight: 600;
}

.tab-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  margin-left: 4px;
  opacity: 0;
  transition: all 0.3s ease;
  color: #94A3B8;
}

.tab-item:hover .tab-close {
  opacity: 1;
}

.tab-close:hover {
  background: rgba(245, 158, 11, 0.2);
  color: #F59E0B;
}

.tabs-actions {
  display: flex;
  align-items: center;
  padding: 0 4px;
  gap: 2px;
}

/* Tab 内容区域 */
.tabs-content {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.tab-panel {
  height: 100%;
  overflow-y: auto;
  background: transparent;
}

.tab-panel::-webkit-scrollbar {
  width: 8px;
}

.tab-panel::-webkit-scrollbar-track {
  background: rgba(15, 23, 42, 0.3);
}

.tab-panel::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.3);
  border-radius: 4px;
}

.tab-panel::-webkit-scrollbar-thumb:hover {
  background: rgba(245, 158, 11, 0.5);
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #64748B;
}

.empty-state .el-icon {
  margin-bottom: 16px;
  color: #475569;
  font-size: 48px;
}

.empty-state p {
  margin: 6px 0;
  font-size: 15px;
  font-weight: 500;
  color: #94A3B8;
}

.empty-state .hint {
  font-size: 13px;
  color: #64748B;
}

/* 拖拽覆盖层 */
.drop-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(245, 158, 11, 0.1);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 100;
}

.drop-hint {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 32px;
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(20px);
  border: 2px dashed #F59E0B;
  border-radius: 16px;
  color: #F59E0B;
  font-size: 15px;
  font-weight: 600;
  box-shadow: 0 8px 32px rgba(245, 158, 11, 0.3);
}

/* 右键菜单 */
.context-menu {
  position: fixed;
  z-index: 1000;
  background: rgba(30, 41, 59, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 10px;
  padding: 6px 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  min-width: 180px;
}

.context-menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  cursor: pointer;
  color: #CBD5E1;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.context-menu-item:hover {
  background: rgba(245, 158, 11, 0.15);
  color: #F59E0B;
}

.context-menu-item .el-icon {
  font-size: 16px;
}

.context-menu-divider {
  height: 1px;
  background: rgba(148, 163, 184, 0.2);
  margin: 6px 0;
}
</style>
