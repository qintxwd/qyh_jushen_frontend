<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <div class="card-header">
          <h1>QYH Jushen Web</h1>
          <p>机器人Web控制平台</p>
        </div>
      </template>
      
      <el-form :model="form" :rules="rules" ref="formRef" @submit.prevent="handleLogin">
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="用户名"
            size="large"
            :prefix-icon="User"
          />
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="密码"
            size="large"
            :prefix-icon="Lock"
            @keyup.enter="handleLogin"
          />
        </el-form-item>
        
        <el-form-item>
          <el-button
            type="primary"
            size="large"
            style="width: 100%"
            :loading="loading"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
      
      <div class="default-account">
        <el-alert
          title="默认账号: admin / admin123"
          type="info"
          :closable="false"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { ElMessage } from 'element-plus'
import SvgIcon from '@/components/SvgIcon.vue'

// 创建图标渲染函数
const User = () => h(SvgIcon, { name: 'view', size: 16 })
const Lock = () => h(SvgIcon, { name: 'lock', size: 16 })

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  username: '',
  password: ''
})

const formRef = ref()
const loading = ref(false)

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const handleLogin = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate(async (valid: boolean) => {
    if (!valid) return
    
    loading.value = true
    try {
      await authStore.login(form.value.username, form.value.password)
      ElMessage.success('登录成功')
      router.push('/')
    } catch (error: any) {
      ElMessage.error(error.response?.data?.detail || '登录失败')
    } finally {
      loading.value = false
    }
  })
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%);
  position: relative;
  overflow: hidden;
}

.login-container::before {
  content: '';
  position: absolute;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%);
  top: -100px;
  right: -100px;
  animation: float 6s ease-in-out infinite;
}

.login-container::after {
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%);
  bottom: -80px;
  left: -80px;
  animation: float 8s ease-in-out infinite reverse;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(30px, 30px); }
}

.login-card {
  width: 560px;
  background: rgba(30, 41, 59, 0.6) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(248, 250, 252, 0.1);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5),
              0 0 0 1px rgba(245, 158, 11, 0.1);
  border-radius: 24px;
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.login-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #F59E0B, transparent);
  opacity: 0.6;
}

.card-header {
  text-align: center;
  padding: 12px 0;
}

.card-header h1 {
  margin: 0 0 12px 0;
  font-size: 36px;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  background: linear-gradient(135deg, #F8FAFC 0%, #F59E0B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
}

.card-header p {
  margin: 0;
  font-size: 17px;
  font-family: 'DM Sans', sans-serif;
  color: #94A3B8;
  font-weight: 500;
}

.default-account {
  margin-top: 24px;
}

.default-account :deep(.el-alert) {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 12px;
}

.default-account :deep(.el-alert__title) {
  color: #93C5FD;
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
}

:deep(.el-form-item) {
  margin-bottom: 28px;
}

:deep(.el-input__wrapper) {
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(148, 163, 184, 0.2);
  box-shadow: none;
  border-radius: 12px;
  padding: 16px 18px;
  transition: all 0.3s ease;
}

:deep(.el-input__wrapper:hover) {
  border-color: rgba(245, 158, 11, 0.4);
  background: rgba(15, 23, 42, 0.7);
}

:deep(.el-input__wrapper.is-focus) {
  border-color: #F59E0B;
  background: rgba(15, 23, 42, 0.8);
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
}

:deep(.el-input__inner) {
  color: #F8FAFC;
  font-family: 'DM Sans', sans-serif;
  font-size: 18px;
}

:deep(.el-input__inner::placeholder) {
  color: #64748B;
}

:deep(.el-button--primary) {
  background: linear-gradient(135deg, #F59E0B 0%, #F97316 100%);
  border: none;
  border-radius: 12px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  font-size: 18px;
  padding: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(245, 158, 11, 0.3);
}

:deep(.el-button--primary:hover) {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(245, 158, 11, 0.4);
}

:deep(.el-button--primary:active) {
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .login-container::before,
  .login-container::after {
    animation: none;
  }
}
</style>
