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

export const login = (data: LoginRequest): Promise<LoginResponse> => {
  return apiClient.post('/api/auth/login', data)
}

export const logout = (): Promise<void> => {
  return apiClient.post('/api/auth/logout')
}

export const getCurrentUser = (): Promise<any> => {
  return apiClient.get('/api/auth/me')
}
