/**
 * 控制权管理 API
 * 
 * 对应新后端 /api/v1/control 路由
 */
import apiClient from './client'

// ==================== 类型定义 ====================

export interface ControlHolder {
  session_id: string
  user_id: number
  username: string
  client_type: string
  acquired_at: string
  last_activity: string
}

export interface ControlStatus {
  has_holder: boolean
  holder: ControlHolder | null
  is_mine: boolean
  queue_position: number
  queue_length: number
}

export interface AcquireControlRequest {
  client_type: string
  force?: boolean
  reason?: string
}

export interface ReleaseControlRequest {
  reason?: string
}

// ==================== API 方法 ====================

/**
 * 获取控制权状态
 */
export async function getControlStatus(): Promise<ControlStatus> {
  return apiClient.get('/api/v1/control/status')
}

/**
 * 申请控制权
 */
export async function acquireControl(request: AcquireControlRequest): Promise<{
  success: boolean
  session_id?: string
  message: string
}> {
  return apiClient.post('/api/v1/control/acquire', request)
}

/**
 * 释放控制权
 */
export async function releaseControl(request?: ReleaseControlRequest): Promise<{
  success: boolean
  message: string
}> {
  return apiClient.post('/api/v1/control/release', request || {})
}

/**
 * 续约控制权（心跳）
 */
export async function renewControl(): Promise<{
  success: boolean
  expires_at: string
}> {
  return apiClient.post('/api/v1/control/renew')
}

/**
 * 强制释放其他人的控制权（需要管理员权限）
 */
export async function forceRelease(sessionId: string): Promise<{
  success: boolean
  message: string
}> {
  return apiClient.post('/api/v1/control/force-release', { session_id: sessionId })
}

export default {
  getControlStatus,
  acquireControl,
  releaseControl,
  renewControl,
  forceRelease
}
