import { defineStore } from 'pinia'
import { login as apiLogin } from '@/api/auth'

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
    user: getSavedUser()
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
    },

    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }
})
