import apiClient from './client'

interface LoginRequest {
  username: string
  password: string
}

interface LoginResponse {
  access_token: string
  token_type: string
  expires_in: number
  user: {
    id: number
    username: string
    role: string
    email: string
  }
}

interface HeartbeatResponse {
  alive: boolean
  refreshed: boolean
  access_token?: string
  token_type?: string
  expires_in?: number
  user: {
    username: string
    role: string
  }
}

export const login = (data: LoginRequest): Promise<LoginResponse> => {
  return apiClient.post('/api/v1/auth/login', data)
}

export const logout = (): Promise<void> => {
  return apiClient.post('/api/v1/auth/logout')
}

export const getCurrentUser = (): Promise<any> => {
  return apiClient.get('/api/v1/auth/me')
}

export const heartbeat = (): Promise<HeartbeatResponse> => {
  return apiClient.post('/api/v1/auth/heartbeat')
}

export const refreshToken = (): Promise<any> => {
  return apiClient.post('/api/v1/auth/refresh')
}
