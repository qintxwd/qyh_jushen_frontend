<template>
  <div class="monitor-3d">
    <el-container>
      <el-header>
        <div class="header-content">
          <h2>双臂机器人 3D 监控</h2>
          <el-button @click="goBack" size="small">
            <SvgIcon name="back" :size="16" />
            返回
          </el-button>
        </div>
      </el-header>

      <el-main>
        <el-row :gutter="20" style="height: 100%;">
          <!-- 左侧：3D视图 -->
          <el-col :span="18" style="height: 100%;">
            <el-card class="full-height-card">
              <template #header>
                <div class="card-header">
                  <span>实时3D视图 (类RViz)</span>
                  <el-space>
                    <el-tag :type="connected ? 'success' : 'danger'">
                      {{ connected ? '已连接 ROS2' : '演示模式' }}
                    </el-tag>
                    <el-button size="small" @click="toggleFullscreen">
                      <SvgIcon name="fullscreen" :size="16" />
                      全屏
                    </el-button>
                  </el-space>
                </div>
              </template>
              
              <URDFViewer 
                ref="urdfViewer"
                :api-base-url="apiBaseUrl"
                :enable-realtime="true"
                @connection-change="handleConnectionChange"
              />
            </el-card>
          </el-col>

          <!-- 右侧：控制和信息面板 -->
          <el-col :span="6">
            <el-space direction="vertical" style="width: 100%;" :size="15">
              <!-- 机器人状态 -->
              <el-card>
                <template #header>
                  <span>机器人状态</span>
                </template>
                <el-descriptions :column="1" size="small">
                  <el-descriptions-item label="模式">
                    <el-tag type="success">{{ robotMode }}</el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item label="电源">
                    <el-tag :type="powerOn ? 'success' : 'info'">
                      {{ powerOn ? '已上电' : '未上电' }}
                    </el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item label="使能">
                    <el-tag :type="enabled ? 'success' : 'warning'">
                      {{ enabled ? '已使能' : '未使能' }}
                    </el-tag>
                  </el-descriptions-item>
                </el-descriptions>
              </el-card>

              <!-- 视图设置 -->
              <el-card>
                <template #header>
                  <span>视图设置</span>
                </template>
                <el-form label-width="80px" size="small">
                  <el-form-item label="坐标系">
                    <el-switch v-model="showCoordinates" />
                  </el-form-item>
                  <el-form-item label="网格">
                    <el-switch v-model="showGrid" />
                  </el-form-item>
                  <el-form-item label="轨迹">
                    <el-switch v-model="showTrajectory" />
                  </el-form-item>
                  <el-form-item label="碰撞体">
                    <el-switch v-model="showCollision" />
                  </el-form-item>
                </el-form>
              </el-card>

              <!-- 快捷视角 -->
              <el-card>
                <template #header>
                  <span>快捷视角</span>
                </template>
                <el-space wrap>
                  <el-button size="small" @click="setView('front')">前视图</el-button>
                  <el-button size="small" @click="setView('side')">侧视图</el-button>
                  <el-button size="small" @click="setView('top')">俯视图</el-button>
                  <el-button size="small" @click="setView('iso')">等轴测</el-button>
                </el-space>
              </el-card>

              <!-- 录制控制 -->
              <el-card>
                <template #header>
                  <span>动作录制</span>
                </template>
                <el-space direction="vertical" style="width: 100%;">
                  <el-button 
                    :type="recording ? 'danger' : 'primary'" 
                    @click="toggleRecording"
                    style="width: 100%;"
                  >
                    <SvgIcon v-if="recording" name="videopause" :size="16" />
                    <SvgIcon v-else name="videoplay" :size="16" />
                    {{ recording ? '停止录制' : '开始录制' }}
                  </el-button>
                  <div v-if="recording" class="recording-info">
                    <el-text type="danger">
                      <SvgIcon name="videocamera" :size="16" />
                      录制中... {{ recordingTime }}s
                    </el-text>
                  </div>
                </el-space>
              </el-card>
            </el-space>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import URDFViewer from '@/components/URDFViewer.vue'

const router = useRouter()

// API Base URL
const apiBaseUrl = ref('/api/v1/robot-model')

// 连接状态
const connected = ref(false)

// 机器人状态
const robotMode = ref('空闲')
const powerOn = ref(false)
const enabled = ref(false)

// 视图设置
const showCoordinates = ref(true)
const showGrid = ref(true)
const showTrajectory = ref(false)
const showCollision = ref(false)

// 录制状态
const recording = ref(false)
const recordingTime = ref(0)
let recordingTimer: number | null = null

// 组件引用
const urdfViewer = ref()

// 连接状态变化 - 只显示一次消息
let hasShownConnectMessage = false
const handleConnectionChange = (isConnected: boolean) => {
  connected.value = isConnected
  if (isConnected && !hasShownConnectMessage) {
    ElMessage.success('已连接到机器人')
    hasShownConnectMessage = true
  } else if (!isConnected) {
    hasShownConnectMessage = false
  }
}

// 设置视角
const setView = (view: string) => {
  console.log('Set view:', view)
  // TODO: 调用URDFViewer的视角切换方法
  ElMessage.info(`切换到${view}视图`)
}

// 切换全屏
const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

// 切换录制
const toggleRecording = () => {
  recording.value = !recording.value
  
  if (recording.value) {
    recordingTime.value = 0
    recordingTimer = setInterval(() => {
      recordingTime.value++
    }, 1000)
    ElMessage.success('开始录制')
  } else {
    if (recordingTimer) {
      clearInterval(recordingTimer)
      recordingTimer = null
    }
    ElMessage.success(`录制完成，时长: ${recordingTime.value}秒`)
  }
}

// 返回
const goBack = () => {
  router.push('/')
}

onMounted(() => {
  console.log('3D Monitor mounted')
})

onUnmounted(() => {
  if (recordingTimer) {
    clearInterval(recordingTimer)
  }
})
</script>

<style scoped>
.monitor-3d {
  height: 100vh;
  background-color: #f5f7fa;
}

.el-header {
  background-color: #545c64;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.header-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content h2 {
  margin: 0;
  font-size: 18px;
}

.el-main {
  padding: 20px;
  height: calc(100vh - 60px);
}

.full-height-card {
  height: 100%;
}

.full-height-card :deep(.el-card__body) {
  height: calc(100% - 57px);
  padding: 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.recording-info {
  text-align: center;
  padding: 10px;
  background-color: #fef0f0;
  border-radius: 4px;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
</style>
