<template>
  <div class="settings-panel">
    <!-- 用户信息 -->
    <div class="panel-section">
      <h3 class="section-title">用户信息</h3>
      <div class="user-card">
        <el-avatar :size="48" icon="User" />
        <div class="user-info">
          <span class="user-name">{{ authStore.user?.username }}</span>
          <el-tag size="small" :type="roleTagType">{{ roleText }}</el-tag>
        </div>
      </div>
    </div>

    <el-divider />

    <!-- 界面设置 -->
    <div class="panel-section">
      <h3 class="section-title">界面设置</h3>
      <div class="settings-list">
        <div class="setting-item">
          <span>暗色主题</span>
          <el-switch v-model="settings.darkMode" size="small" />
        </div>
        <div class="setting-item">
          <span>3D 场景抗锯齿</span>
          <el-switch v-model="settings.antiAlias" size="small" />
        </div>
      </div>
    </div>

    <el-divider />

    <!-- 操作 -->
    <div class="panel-section">
      <h3 class="section-title">操作</h3>
      <div class="action-buttons">
        <el-button @click="saveSettings" type="primary">
          <el-icon><Check /></el-icon>
          保存设置
        </el-button>
        <el-button @click="resetSettings">
          <el-icon><Refresh /></el-icon>
          重置默认
        </el-button>
        <el-button @click="handleLogout" type="danger">
          <el-icon><SwitchButton /></el-icon>
          退出登录
        </el-button>
      </div>
    </div>

    <el-divider />

    <!-- 系统电源 -->
    <div class="panel-section">
      <h3 class="section-title">系统电源</h3>
      <div class="action-buttons">
        <el-button @click="handleShutdown" type="danger" :loading="shuttingDown">
          <el-icon><SwitchButton /></el-icon>
          系统关机
        </el-button>
      </div>
      <p class="power-hint">关机后PLC将在10秒后断电</p>
    </div>

    <!-- 关于 -->
    <div class="panel-section about-section">
      <h3 class="section-title">关于</h3>
      <div class="about-info">
        <p>远昌机器人控制平台</p>
        <p class="version">版本 1.0.0</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useLayoutStore } from '@/stores/layout'
import { ElMessage, ElMessageBox } from 'element-plus'
import { liftApi } from '@/api/lift'

const router = useRouter()
const authStore = useAuthStore()
const layoutStore = useLayoutStore()

const shuttingDown = ref(false)

const settings = reactive({
  darkMode: true,
  antiAlias: true
})

// 从localStorage加载设置
function loadSettings() {
  const saved = localStorage.getItem('app_settings')
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      settings.darkMode = parsed.darkMode ?? true
      settings.antiAlias = parsed.antiAlias ?? true
    } catch (e) {
      console.error('Failed to load settings:', e)
    }
  }
  // 应用暗色模式
  applyDarkMode()
}

// 应用暗色模式到body
function applyDarkMode() {
  if (settings.darkMode) {
    document.documentElement.classList.remove('light')
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
    document.documentElement.classList.add('light')
  }
}

// 监听暗色模式变化
watch(() => settings.darkMode, () => {
  applyDarkMode()
})

onMounted(() => {
  loadSettings()
})

const roleText = computed(() => {
  const role = authStore.user?.role
  if (role === 'admin') return '管理员'
  if (role === 'operator') return '操作员'
  return '访客'
})

const roleTagType = computed(() => {
  const role = authStore.user?.role
  if (role === 'admin') return 'danger'
  if (role === 'operator') return 'warning'
  return 'info'
})

function saveSettings() {
  localStorage.setItem('app_settings', JSON.stringify(settings))
  ElMessage.success('设置已保存')
}

function resetSettings() {
  settings.darkMode = true
  settings.antiAlias = true
  ElMessage.info('已重置为默认设置')
}

function handleLogout() {
  authStore.logout()
  router.push('/login')
}

async function handleShutdown() {
  try {
    await ElMessageBox.confirm(
      '确定要关闭系统吗？关机后PLC将在10秒后断电，需要物理开机才能重新启动。',
      '系统关机',
      {
        confirmButtonText: '确定关机',
        cancelButtonText: '取消',
        type: 'warning',
        confirmButtonClass: 'el-button--danger'
      }
    )
    
    shuttingDown.value = true
    const result = await liftApi.systemShutdown()
    
    if (result.success) {
      ElMessage.warning('系统正在关机，请稍候...')
    } else {
      ElMessage.error(`关机失败: ${result.message}`)
    }
  } catch (e) {
    if (e !== 'cancel') {
      ElMessage.error('关机命令发送失败')
    }
  } finally {
    shuttingDown.value = false
  }
}
</script>

<style scoped>
.settings-panel {
  padding: 16px;
}

.panel-section {
  margin-bottom: 8px;
}

.section-title {
  margin: 0 0 12px 0;
  font-size: 13px;
  font-weight: 500;
  color: #909399;
}

.user-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background-color: #2d2d2d;
  border-radius: 8px;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.user-name {
  font-size: 16px;
  font-weight: 500;
  color: #e0e0e0;
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  background-color: #2d2d2d;
  border-radius: 8px;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #ccc;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.action-buttons .el-button {
  width: 100%;
}

.about-section {
  margin-top: 20px;
}

.about-info {
  text-align: center;
  padding: 16px;
  background-color: #2d2d2d;
  border-radius: 8px;
}

.about-info p {
  margin: 0;
  color: #909399;
  font-size: 13px;
}

.about-info .version {
  margin-top: 4px;
  font-size: 11px;
  color: #666;
}

.power-hint {
  margin-top: 8px;
  font-size: 11px;
  color: #909399;
  text-align: center;
}

:deep(.el-divider) {
  margin: 16px 0;
  border-color: #3c3c3c;
}

:deep(.el-form-item__label) {
  color: #909399;
}

:deep(.el-input__wrapper) {
  background-color: #1e1e1e;
  border-color: #3c3c3c;
}

:deep(.el-input__inner) {
  color: #ccc;
}

:deep(.el-input-number) {
  width: 100px;
}
</style>
