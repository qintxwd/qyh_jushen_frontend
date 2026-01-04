<template>
  <div class="scene3d-panel">
    <!-- 场景头部工具栏 -->
    <div class="scene-toolbar">
      <div class="toolbar-left">
        <el-button-group size="small">
          <el-tooltip content="重置视角">
            <el-button @click="resetCamera">
              <el-icon><Aim /></el-icon>
            </el-button>
          </el-tooltip>
          <el-tooltip content="俯视图">
            <el-button @click="setTopView">
              <el-icon><Top /></el-icon>
            </el-button>
          </el-tooltip>
          <el-tooltip content="前视图">
            <el-button @click="setFrontView">
              <el-icon><View /></el-icon>
            </el-button>
          </el-tooltip>
        </el-button-group>
      </div>
      
      <div class="toolbar-right">
        <el-tooltip content="显示关节状态">
          <el-button 
            size="small" 
            :type="showJointStatus ? 'primary' : 'default'"
            @click="showJointStatus = !showJointStatus"
          >
            <el-icon><DataLine /></el-icon>
          </el-button>
        </el-tooltip>
        <el-tooltip content="全屏">
          <el-button size="small" @click="toggleFullscreen">
            <el-icon><FullScreen /></el-icon>
          </el-button>
        </el-tooltip>
      </div>
    </div>

    <!-- 3D 场景区域 -->
    <div class="scene-content" ref="sceneContainer">
      <MainScene ref="mainSceneRef" />
      
      <!-- 关节状态悬浮显示 -->
      <div v-if="showJointStatus" class="joint-overlay">
        <JointStatusOverlay />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MainScene from '@/components/scene/MainScene.vue'
import JointStatusOverlay from '@/components/scene/JointStatusOverlay.vue'
import { useLayoutStore } from '@/stores/layout'

const layoutStore = useLayoutStore()
const mainSceneRef = ref<InstanceType<typeof MainScene> | null>(null)
const sceneContainer = ref<HTMLElement | null>(null)
const showJointStatus = ref(true)

function resetCamera() {
  mainSceneRef.value?.resetCamera()
}

function setTopView() {
  mainSceneRef.value?.setTopView?.()
}

function setFrontView() {
  mainSceneRef.value?.setFrontView?.()
}

function toggleFullscreen() {
  if (sceneContainer.value) {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      sceneContainer.value.requestFullscreen()
    }
  }
}
</script>

<style scoped>
.scene3d-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #1a1a1a;
}

.scene-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background-color: #252526;
  border-bottom: 1px solid #3c3c3c;
  flex-shrink: 0;
}

.toolbar-left,
.toolbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.scene-content {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.joint-overlay {
  position: absolute;
  bottom: 12px;
  left: 12px;
  z-index: 10;
  pointer-events: auto;
}

/* 全屏样式 */
.scene-content:fullscreen {
  background-color: #1a1a1a;
}

.scene-content:fullscreen .joint-overlay {
  bottom: 20px;
  left: 20px;
}
</style>
