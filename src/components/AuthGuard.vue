<template>
  <div class="auth-guard">
    <!-- 会话状态指示器 -->
    <div v-if="showSessionIndicator" class="session-indicator" :class="sessionStatus">
      <SvgIcon v-if="sessionStatus === 'active'" name="circlecheck" :size="16" />
      <SvgIcon v-else-if="sessionStatus === 'warning'" name="warningfilled" :size="16" />
      <SvgIcon v-else name="circleclosefilled" :size="16" />
      <span>{{ sessionMessage }}</span>
    </div>
    
    <!-- 会话即将过期提醒 -->
    <el-dialog
      v-model="showExpiringDialog"
      title="会话即将过期"
      width="400px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <p>您的会话即将过期，是否继续保持登录？</p>
      <template #footer>
        <el-button @click="handleLogout">退出登录</el-button>
        <el-button type="primary" @click="handleExtendSession">继续使用</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { ElMessage } from 'element-plus'
import SvgIcon from '@/components/SvgIcon.vue'

const authStore = useAuthStore()
const showSessionIndicator = ref(false)
const showExpiringDialog = ref(false)

const sessionStatus = computed(() => {
  if (!authStore.isLoggedIn) return 'expired'
  // 可以根据心跳状态判断
  return 'active'
})

const sessionMessage = computed(() => {
  switch (sessionStatus.value) {
    case 'active':
      return '会话正常'
    case 'warning':
      return '会话即将过期'
    case 'expired':
      return '会话已过期'
    default:
      return ''
  }
})

const handleLogout = () => {
  showExpiringDialog.value = false
  authStore.logout()
  ElMessage.info('已退出登录')
}

const handleExtendSession = async () => {
  showExpiringDialog.value = false
  try {
    await authStore.checkHeartbeat()
    ElMessage.success('会话已延长')
  } catch {
    ElMessage.error('会话延长失败，请重新登录')
    authStore.logout()
  }
}

// 页面可见性变化时，重新检查心跳
const handleVisibilityChange = () => {
  if (!document.hidden && authStore.isLoggedIn) {
    console.log('📱 页面可见，检查会话状态')
    authStore.checkHeartbeat()
  }
}

onMounted(() => {
  document.addEventListener('visibilitychange', handleVisibilityChange)
})

onUnmounted(() => {
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
</script>

<style scoped>
.session-indicator {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 8px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  z-index: 9999;
  transition: all 0.3s;
}

.session-indicator.active {
  background: #f0f9ff;
  color: #409eff;
  border: 1px solid #b3d8ff;
}

.session-indicator.warning {
  background: #fdf6ec;
  color: #e6a23c;
  border: 1px solid #f5dab1;
}

.session-indicator.expired {
  background: #fef0f0;
  color: #f56c6c;
  border: 1px solid #fbc4c4;
}
</style>
