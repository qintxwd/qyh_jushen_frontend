<template>
  <div class="camera-view" :class="{ 'no-signal': !topicOnline }">
    <div class="camera-header">
      <SvgIcon name="videocamera" :size="16" />
      <span>{{ title }}</span>
      <div class="camera-status" :class="{ online: topicOnline }">
        {{ topicOnline ? '在线' : '离线' }}
      </div>
    </div>
    <div class="camera-content">
      <img 
        v-if="streamUrl" 
        :src="streamUrl" 
        :alt="title"
        @error="handleImageError"
        @load="handleImageLoad"
        :class="{ 'stream-error': streamError }"
        :style="rotate ? { transform: `rotate(${rotate}deg)` } : {}"
      />
      <div v-if="!streamUrl || streamError" class="no-signal-overlay">
        <el-icon size="48"><VideoCamera /></el-icon>
        <span>{{ topicOnline ? '视频流异常 (ROS Topic 正常)' : (errorMessage || '未连接') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
const props = defineProps<{
  title: string
  cameraId: string  // 'head', 'left_hand', 'right_hand'
  enabled?: boolean
  rotate?: number   // 旋转角度，如 180 表示旋转180度（用于左手摄像头上下颠倒的情况）
}>()

// 基于 ROS2 Topic 的在线状态（更可靠）
const topicOnline = ref(false)
// 视频流是否有错误
const streamError = ref(false)
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
  streamError.value = true
  // 不再用视频流状态来判断在线，只记录流错误
}

function handleImageLoad() {
  streamError.value = false
  imageLoaded.value = true
}

// 定期检查 ROS2 Topic 状态（更可靠，不依赖 web_video_server）
let topicCheckTimer: number | null = null

async function checkTopicStatus() {
  if (!props.enabled) {
    topicOnline.value = false
    return
  }
  
  try {
    // 使用 ROS2 topic 状态接口检查相机是否真正在线
    const host = window.location.hostname
    const baseUrl = import.meta.env.DEV 
      ? `http://${host}:8000` 
      : `${window.location.protocol}//${host}:${window.location.port || '80'}`
    
    const response = await fetch(`${baseUrl}/api/v1/camera/topic_status`)
    if (response.ok) {
      const data = await response.json()
      const cameraStatus = data.cameras?.[props.cameraId]
      topicOnline.value = cameraStatus?.available ?? false
      
      if (!topicOnline.value) {
        errorMessage.value = cameraStatus?.error || '相机话题无数据'
      } else {
        errorMessage.value = ''
      }
    } else {
      // API 调用失败时保持之前的状态，避免闪烁
      errorMessage.value = '无法连接后端'
    }
  } catch (e) {
    // 网络错误时保持之前的状态
    errorMessage.value = '网络错误'
  }
}

watch(() => props.enabled, (enabled) => {
  if (enabled) {
    checkTopicStatus()
  } else {
    topicOnline.value = false
  }
})

onMounted(() => {
  if (props.enabled) {
    checkTopicStatus()
  }
  // 每 2 秒检查一次 ROS2 Topic 状态（比之前的 5 秒更频繁）
  topicCheckTimer = window.setInterval(checkTopicStatus, 2000)
})

onUnmounted(() => {
  if (topicCheckTimer) {
    clearInterval(topicCheckTimer)
  }
})
</script>

<style scoped>
.camera-view {
  background-color: var(--color-bg-secondary, #1e1e1e);
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
  background-color: var(--color-bg-tertiary, #2d2d2d);
  font-size: 12px;
  color: var(--color-text-secondary, #b0b0b0);
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

.camera-content img.stream-error {
  opacity: 0.3;
}

.no-signal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #606060;
  background-color: rgba(13, 13, 13, 0.8);
}

.no-signal-overlay span {
  font-size: 12px;
  text-align: center;
  padding: 0 8px;
}
</style>
