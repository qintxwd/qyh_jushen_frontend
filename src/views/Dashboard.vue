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
                  <el-icon><View /></el-icon>
                  3D监控
                </el-button>
                <el-button 
                  v-if="authStore.isOperator" 
                  @click="$router.push('/task-editor')"
                  type="success"
                >
                  <el-icon><Edit /></el-icon>
                  任务编辑
                </el-button>
                <el-button 
                  v-if="authStore.isAdmin" 
                  @click="$router.push('/ros-gui')"
                  type="info"
                >
                  <el-icon><Setting /></el-icon>
                  ROS GUI控制
                </el-button>
                <el-button 
                  v-if="authStore.isAdmin" 
                  @click="$router.push('/terminal')"
                  type="warning"
                >
                  <el-icon><Monitor /></el-icon>
                  系统终端
                </el-button>
                <el-button 
                  v-if="authStore.isAdmin" 
                  @click="$router.push('/lift-control')"
                  type="primary"
                >
                  <el-icon><Top /></el-icon>
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
}

.el-header {
  background-color: #545c64;
  color: #fff;
  display: flex;
  align-items: center;
}

.header-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content h1 {
  margin: 0;
  font-size: 20px;
}

.el-main {
  padding: 20px;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.button-group .el-button {
  width: 100%;
}
</style>
