<template>
  <div class="dashboard">
    <el-container>
      <el-header>
        <div class="header-content">
          <h1>QYH Jushen Web</h1>
          <div>
            <span>欢迎, {{ authStore.user?.username }}</span>
            <el-button @click="handleLogout" size="small" style="margin-left: 20px">
              登出
            </el-button>
          </div>
        </div>
      </el-header>
      
      <el-main>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-card>
              <template #header>
                <div class="card-header">
                  <span>系统状态</span>
                </div>
              </template>
              <p>ROS2: 已连接</p>
              <p>数据库: 正常</p>
            </el-card>
          </el-col>
          
          <el-col :span="8">
            <el-card>
              <template #header>
                <div class="card-header">
                  <span>快速操作</span>
                </div>
              </template>
              <div class="button-group">
                <el-button @click="$router.push('/monitor')" type="primary">
                  <SvgIcon name="view" :size="16" />
                  3D监控
                </el-button>
                <el-button 
                  v-if="authStore.isOperator" 
                  @click="$router.push('/task-editor')"
                  type="success"
                >
                  <SvgIcon name="edit" :size="16" />
                  任务编辑
                </el-button>
                <el-button 
                  v-if="authStore.isAdmin" 
                  @click="$router.push('/ros-gui')"
                  type="info"
                >
                  <SvgIcon name="setting" :size="16" />
                  ROS GUI控制
                </el-button>
                <el-button 
                  v-if="authStore.isAdmin" 
                  @click="$router.push('/lift-control')"
                  type="primary"
                >
                  <SvgIcon name="top" :size="16" />
                  升降控制
                </el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.dashboard {
  height: 100vh;
  background: linear-gradient(135deg, var(--color-bg-primary, #0F172A) 0%, var(--color-bg-secondary, #1E293B) 100%);
  font-family: 'DM Sans', sans-serif;
}

.el-header {
  background: var(--color-surface, rgba(30, 41, 59, 0.6));
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--color-border, rgba(248, 250, 252, 0.1));
  color: var(--color-text-primary, #F8FAFC);
  display: flex;
  align-items: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.header-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content h1 {
  margin: 0;
  font-size: 24px;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  background: linear-gradient(135deg, var(--color-text-primary, #F8FAFC) 0%, #F59E0B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
}

.header-content span {
  color: var(--color-text-secondary, #CBD5E1);
  font-weight: 500;
  font-size: 15px;
}

.el-main {
  padding: 32px;
  background: transparent;
}

:deep(.el-card) {
  background: var(--color-surface, rgba(30, 41, 59, 0.5));
  backdrop-filter: blur(20px);
  border: 1px solid var(--color-border, rgba(148, 163, 184, 0.2));
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

:deep(.el-card:hover) {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4),
              0 0 0 1px rgba(245, 158, 11, 0.2);
  border-color: rgba(245, 158, 11, 0.3);
}

:deep(.el-card__header) {
  border-bottom: 1px solid var(--color-border, rgba(148, 163, 184, 0.15));
  padding: 18px 24px;
  background: var(--color-surface, rgba(15, 23, 42, 0.3));
}

:deep(.card-header span) {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: var(--color-text-primary, #F8FAFC);
  letter-spacing: -0.3px;
}

:deep(.el-card__body) {
  padding: 24px;
  color: var(--color-text-secondary, #CBD5E1);
  font-size: 15px;
  line-height: 1.8;
}

:deep(.el-card__body p) {
  margin: 12px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

:deep(.el-card__body p::before) {
  content: '●';
  color: #10B981;
  font-size: 12px;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.button-group :deep(.el-button) {
  width: 100%;
  border-radius: 12px;
  padding: 14px 20px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  font-size: 15px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.button-group :deep(.el-button::before) {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.button-group :deep(.el-button:hover::before) {
  left: 100%;
}

.button-group :deep(.el-button:hover) {
  transform: translateX(4px);
  border-color: rgba(245, 158, 11, 0.4);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.button-group :deep(.el-button--primary) {
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  border: none;
}

.button-group :deep(.el-button--success) {
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  border: none;
}

.button-group :deep(.el-button--info) {
  background: linear-gradient(135deg, #64748B 0%, #475569 100%);
  border: none;
}

.button-group :deep(.el-button--warning) {
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  border: none;
}

@media (prefers-reduced-motion: reduce) {
  :deep(.el-card),
  .button-group :deep(.el-button) {
    transition: none;
  }
  
  :deep(.el-card__body p::before) {
    animation: none;
  }
}
</style>
