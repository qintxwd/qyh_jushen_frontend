<template>
  <div class="camera-view" :class="{ 'no-signal': !hasSignal }">
    <div class="camera-header">
      <el-icon><VideoCamera /></el-icon>
      <span>{{ title }}</span>
      <div class="camera-status" :class="{ online: hasSignal }">
        {{ hasSignal ? '在线' : '离线' }}
      </div>
    </div>
    <div class="camera-content">
      <img 
        v-if="hasSignal && streamUrl" 
        :src="streamUrl" 
        :alt="title"
        @error="handleImageError"
        @load="handleImageLoad"
      />
      <div v-else class="no-signal-overlay">
        <el-icon size="48"><VideoCamera /></el-icon>
        <span>{{ errorMessage || '未连接' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { VideoCamera } from '@element-plus/icons-vue'

const props = defineProps<{
  title: string
  cameraId: string  // 'head', 'left_hand', 'right_hand'
  enabled?: boolean
}>()

const hasSignal = ref(false)
const errorMessage = ref('')
const imageLoaded = ref(false)

// 构建视频流 URL
// 通过后端 API 代理访问 web_video_server
const streamUrl = computed(() => {
  if (!props.enabled) return ''
  
  // 使用后端代理 API，避免 CORS 问题
  // 后端会代理到 web_video_server
  const host = window.location.hostname
  const port = window.location.port || '80'
  const protocol = window.location.protocol
  
  // 开发环境使用 5173，生产环境使用 /api
  const baseUrl = import.meta.env.DEV 
    ? `http://${host}:8000` 
    : `${protocol}//${host}:${port}`
  
  return `${baseUrl}/api/v1/camera/stream/${props.cameraId}?quality=50`
})

function handleImageError() {
  hasSignal.value = false
  errorMessage.value = '视频流连接失败'
}

function handleImageLoad() {
  hasSignal.value = true
  imageLoaded.value = true
  errorMessage.value = ''
}

// 定期检查连接状态
let checkTimer: number | null = null

async function checkConnection() {
  if (!props.enabled) {
    hasSignal.value = false
    return
  }
  
  try {
    // 使用后端 API 检查相机状态
    const host = window.location.hostname
    const baseUrl = import.meta.env.DEV 
      ? `http://${host}:8000` 
      : `${window.location.protocol}//${host}:${window.location.port || '80'}`
    
    const response = await fetch(`${baseUrl}/api/v1/camera/status`)
    if (response.ok) {
      const data = await response.json()
      const cameraStatus = data.cameras?.[props.cameraId]
      hasSignal.value = cameraStatus?.available ?? false
      if (!hasSignal.value) {
        errorMessage.value = data.web_video_server_available 
          ? '相机未连接' 
          : 'web_video_server 未运行'
      }
    } else {
      hasSignal.value = false
      errorMessage.value = '无法连接后端'
    }
  } catch (e) {
    hasSignal.value = false
    errorMessage.value = '网络错误'
  }
}

watch(() => props.enabled, (enabled) => {
  if (enabled) {
    checkConnection()
  } else {
    hasSignal.value = false
  }
})

onMounted(() => {
  if (props.enabled) {
    checkConnection()
  }
  // 每 5 秒检查一次连接状态
  checkTimer = window.setInterval(checkConnection, 5000)
})

onUnmounted(() => {
  if (checkTimer) {
    clearInterval(checkTimer)
  }
})
</script>

<style scoped>
.camera-view {
  background-color: #1e1e1e;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.camera-view.no-signal {
  opacity: 0.7;
}

.camera-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background-color: #2d2d2d;
  font-size: 12px;
  color: #b0b0b0;
}

.camera-header .el-icon {
  color: #409eff;
}

.camera-status {
  margin-left: auto;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background-color: #909399;
  color: white;
}

.camera-status.online {
  background-color: #67c23a;
}

.camera-content {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: #0d0d0d;
  display: flex;
  align-items: center;
  justify-content: center;
}

.camera-content img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.no-signal-overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #606060;
}

.no-signal-overlay span {
  font-size: 12px;
}
</style>
