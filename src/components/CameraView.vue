<template>
  <div class="camera-view" :class="{ 'no-signal': !topicOnline }">
    <div class="camera-header">
      <SvgIcon name="videocamera" :size="16" />
      <span>{{ title }}</span>
      <div class="camera-status" :class="{ online: topicOnline }">
        {{ topicOnline ? '在线' : '离线' }}
        <span v-if="shouldUseWebRTC && rtcConnected" style="margin-left:4px; font-size:9px; opacity:0.8">(RTC)</span>
        <span v-else-if="shouldUseWebRTC && !rtcConnected && !rtcFailure" style="margin-left:4px; font-size:9px; opacity:0.8">(Conn...)</span>
      </div>
    </div>
    <div class="camera-content">
      <video
        v-if="shouldUseWebRTC"
        ref="videoRef"
        autoplay
        playsinline
        muted
        :class="{ 'stream-error': streamError }"
        :style="rotateStyle"
        style="width: 100%; height: 100%; object-fit: contain;"
      ></video>
      <img 
        v-else-if="streamUrl" 
        :src="streamUrl" 
        :alt="title"
        @error="handleImageError"
        @load="handleImageLoad"
        :class="{ 'stream-error': streamError }"
        :style="rotateStyle"
      />
      <div v-if="(!streamUrl && !shouldUseWebRTC) || streamError || (shouldUseWebRTC && !rtcStream && !rtcFailure)" class="no-signal-overlay">
        <template v-if="shouldUseWebRTC && !rtcStream && !rtcFailure">
             <el-icon class="is-loading" size="24"><Loading /></el-icon>
             <span>连接视频流中...</span>
        </template>
        <template v-else>
            <el-icon size="48"><VideoCamera /></el-icon>
            <span>{{ topicOnline ? '视频流异常 (ROS Topic 正常)' : (errorMessage || '未连接') }}</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'
import { Loading, VideoCamera } from '@element-plus/icons-vue'
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useWebRTCStream } from '@/composables/useWebRTCStream'

const props = defineProps<{
  title: string
  cameraId: string  // 'head', 'left_hand', 'right_hand'
  enabled?: boolean
  rotate?: number   // 旋转角度，如 180 表示旋转180度（用于左手摄像头上下颠倒的情况）
  mode?: 'auto' | 'webrtc' | 'mjpeg' // default auto
}>()

// 模式控制
const currentMode = ref(props.mode || 'auto')
const shouldUseWebRTC = computed(() => currentMode.value === 'webrtc' || (currentMode.value === 'auto' && !rtcFailure.value))
const rtcFailure = ref(false)

// WebRTC logic
// 猜测源名称: head -> head_camera
const rtcSource = computed(() => props.cameraId.endsWith('_camera') ? props.cameraId : `${props.cameraId}_camera`)
const { start: startWebRTC, stop: stopWebRTC, stream: rtcStream, isConnected: rtcConnected, error: rtcError } = useWebRTCStream(rtcSource.value)
const videoRef = ref<HTMLVideoElement | null>(null)

// 基于 ROS2 Topic 的在线状态（更可靠）
const topicOnline = ref(false)
// 视频流是否有错误
const streamError = ref(false)
const errorMessage = ref('')
const imageLoaded = ref(false)

// 获取后端 API 基础 URL
function getApiBaseUrl() {
  const host = window.location.hostname
  // 始终使用 8000 端口访问后端 API
  return `http://${host}:8000`
}

// 构建 MJPEG 视频流 URL
const streamUrl = computed(() => {
  if (!props.enabled) return ''
  return `${getApiBaseUrl()}/api/v1/camera/stream/${props.cameraId}?quality=50`
})

// 旋转样式
const rotateStyle = computed(() => props.rotate ? { transform: `rotate(${props.rotate}deg)` } : {})

// 监视 WebRTC 流并绑定到 Video 元素
watch(rtcStream, (newStream) => {
  if (newStream) {
    nextTick(() => {
      if (videoRef.value) {
        videoRef.value.srcObject = newStream
        videoRef.value.play().catch(console.error)
      }
    })
  }
})

// 监视 WebRTC 错误，自动降级
watch(rtcError, (err) => {
  if (err && currentMode.value === 'auto') {
    console.warn(`WebRTC error for ${props.title}, falling back to MJPEG:`, err)
    rtcFailure.value = true
    stopWebRTC()
  }
})

function initStream() {
  if (!props.enabled) return
  
  // Reset failure state on re-enable?
  // rtcFailure.value = false 
  
  if (shouldUseWebRTC.value) {
    startWebRTC()
  }
}

function stopStream() {
  stopWebRTC()
}

// ... existing topic check logic ...
function handleImageError() {
  streamError.value = true
}

function handleImageLoad() {
  streamError.value = false
  imageLoaded.value = true
  topicOnline.value = true
  errorMessage.value = ''
}

// 定期检查相机状态
let topicCheckTimer: number | null = null

async function checkTopicStatus() {
  if (!props.enabled) {
    topicOnline.value = false
    return
  }
  
  try {
    const response = await fetch(`${getApiBaseUrl()}/api/v1/camera/topic_status`)
    if (response.ok) {
      const data = await response.json()
      const cameraStatus = data.cameras?.[props.cameraId]
      // WebRTC 连接成功也可以认为在线
      topicOnline.value = cameraStatus?.available || rtcConnected.value
      
      if (!topicOnline.value) {
        errorMessage.value = cameraStatus?.error || '相机话题无数据'
      } else {
        errorMessage.value = ''
      }
    } else {
      errorMessage.value = '无法连接后端'
    }
  } catch (e) {
    errorMessage.value = '网络错误'
  }
}

watch(() => props.enabled, (enabled) => {
  if (enabled) {
    checkTopicStatus()
    initStream()
  } else {
    topicOnline.value = false
    stopStream()
  }
})

onMounted(() => {
  if (props.enabled) {
    checkTopicStatus()
    initStream()
  }
  topicCheckTimer = window.setInterval(checkTopicStatus, 2000)
})

onUnmounted(() => {
  stopStream()
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
