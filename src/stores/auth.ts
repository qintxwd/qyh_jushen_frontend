import { defineStore } from 'pinia'
import { login as apiLogin, heartbeat as apiHeartbeat } from '@/api/auth'
import router from '@/router'

interface UserInfo {
  id: number
  username: string
  role: string
  email: string
}

// 从 localStorage 恢复用户信息
const getSavedUser = (): UserInfo | null => {
  try {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: getSavedUser(),
    heartbeatTimer: null as number | null,
    heartbeatInterval: 5 * 60 * 1000 // 5分钟心跳一次
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    userRole: (state) => state.user?.role || 'guest',
    isOperator: (state) => ['operator', 'admin'].includes(state.user?.role || ''),
    isAdmin: (state) => state.user?.role === 'admin'
  },

  actions: {
    async login(username: string, password: string) {
      const response = await apiLogin({ username, password })
      this.token = response.access_token
      this.user = response.user
      localStorage.setItem('token', this.token)
      localStorage.setItem('user', JSON.stringify(this.user))
      
      // 登录成功后启动心跳
      this.startHeartbeat()
    },

    logout() {
      this.stopHeartbeat()
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      
      // 跳转到登录页
      if (router.currentRoute.value.path !== '/login') {
        router.push('/login')
      }
    },

    async checkHeartbeat() {
      if (!this.token) {
        this.logout()
        return
      }

      try {
        const response = await apiHeartbeat()
        
        // 如果 Token 被刷新，更新本地存储
        if (response.refreshed && response.access_token) {
          this.token = response.access_token
          localStorage.setItem('token', this.token)
          console.log('✅ Token 已通过心跳刷新')
        }
        
        console.log('💓 心跳正常')
      } catch (error) {
        console.error('❌ 心跳失败，会话已过期')
        this.logout()
      }
    },

    startHeartbeat() {
      // 清除已有的定时器
      this.stopHeartbeat()
      
      // 立即执行一次心跳
      this.checkHeartbeat()
      
      // 启动定时心跳
      this.heartbeatTimer = window.setInterval(() => {
        this.checkHeartbeat()
      }, this.heartbeatInterval)
      
      console.log(`💓 心跳已启动，间隔 ${this.heartbeatInterval / 1000} 秒`)
    },

    stopHeartbeat() {
      if (this.heartbeatTimer) {
        window.clearInterval(this.heartbeatTimer)
        this.heartbeatTimer = null
        console.log('💔 心跳已停止')
      }
    }
  }
})
