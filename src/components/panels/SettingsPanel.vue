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
          <SvgIcon name="check" :size="16" />
          保存设置
        </el-button>
        <el-button @click="resetSettings">
          <SvgIcon name="refresh" :size="16" />
          重置默认
        </el-button>
        <el-button @click="handleLogout" type="danger">
          <SvgIcon name="switchbutton" :size="16" />
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
          <SvgIcon name="switchbutton" :size="16" />
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
import SvgIcon from '@/components/SvgIcon.vue'
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
  padding: var(--spacing-lg);
  height: 100%;
  overflow-y: auto;
}

.settings-panel::-webkit-scrollbar {
  width: 8px;
}

.settings-panel::-webkit-scrollbar-track {
  background: rgba(30, 41, 59, 0.3);
  border-radius: var(--radius-sm);
}

.settings-panel::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.4);
  border-radius: var(--radius-sm);
}

.settings-panel::-webkit-scrollbar-thumb:hover {
  background: rgba(148, 163, 184, 0.6);
}

.panel-section {
  margin-bottom: var(--spacing-lg);
}

.section-title {
  margin: 0 0 var(--spacing-md) 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.user-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: var(--radius-lg);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.user-card:hover {
  background: rgba(30, 41, 59, 0.6);
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.user-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: var(--radius-lg);
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm) 0;
  font-size: 13px;
  color: var(--color-text-primary);
  transition: all 0.2s ease;
}

.setting-item:hover {
  color: var(--color-primary);
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.action-buttons .el-button {
  width: 100%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.action-buttons .el-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.about-section {
  margin-top: var(--spacing-xl);
}

.about-info {
  text-align: center;
  padding: var(--spacing-lg);
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: var(--radius-lg);
}

.about-info p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 13px;
}

.about-info .version {
  margin-top: var(--spacing-xs);
  font-size: 11px;
  color: var(--color-text-tertiary);
}

.power-hint {
  margin-top: var(--spacing-sm);
  font-size: 11px;
  color: var(--color-text-tertiary);
  text-align: center;
  font-style: italic;
}

:deep(.el-divider) {
  margin: var(--spacing-lg) 0;
  border-color: rgba(148, 163, 184, 0.1);
}

:deep(.el-form-item__label) {
  color: var(--color-text-tertiary);
}

:deep(.el-input__wrapper) {
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(148, 163, 184, 0.2);
  transition: all 0.3s ease;
}

:deep(.el-input__wrapper:hover) {
  border-color: rgba(148, 163, 184, 0.4);
}

:deep(.el-input__wrapper.is-focus) {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 1px var(--color-primary);
}

:deep(.el-input__inner) {
  color: var(--color-text-primary);
}

:deep(.el-input-number) {
  width: 100px;
}

:deep(.el-button--primary) {
  background: var(--color-primary);
  border-color: var(--color-primary);
}

:deep(.el-button--primary:hover) {
  background: #FFA726;
  border-color: #FFA726;
}

:deep(.el-button--danger) {
  background: #ef4444;
  border-color: #ef4444;
}

:deep(.el-button--danger:hover) {
  background: #dc2626;
  border-color: #dc2626;
}

:deep(.el-switch.is-checked .el-switch__core) {
  background-color: #10b981;
}

:deep(.el-tag) {
  backdrop-filter: blur(8px);
}

:deep(.el-avatar) {
  background: rgba(245, 158, 11, 0.2);
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
}
</style>
