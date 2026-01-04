import axios from 'axios'
import router from '@/router'

// 动态获取 API 地址：使用当前访问的主机地址，支持远程访问
const getApiBaseUrl = () => {
  // 优先使用环境变量
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL
  }
  // 否则使用当前页面的主机地址
  const protocol = window.location.protocol
  const hostname = window.location.hostname
  return `${protocol}//${hostname}:8000`
}

const API_BASE_URL = getApiBaseUrl()

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器（添加 Token）
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截器（处理错误和Token刷新）
apiClient.interceptors.response.use(
  (response) => {
    // 检查响应中是否包含新的 Token（自动刷新的情况）
    if (response.data?.access_token) {
      const newToken = response.data.access_token
      localStorage.setItem('token', newToken)
      console.log('✅ Token 已自动刷新')
    }
    return response.data
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token 过期或无效，清除认证信息并跳转到登录
      console.warn('⚠️ 认证失败，跳转到登录页面')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      
      // 使用 router.push 而不是直接修改 location
      if (router.currentRoute.value.path !== '/login') {
        router.push('/login')
      }
    }
    return Promise.reject(error)
  }
)

export default apiClient
