/**
 * 紧急停止 API
 * 
 * 对应新后端 /api/v1/emergency 路由
 */
import apiClient from './client'

// ==================== 类型定义 ====================

export interface EmergencyStatus {
  is_active: boolean
  triggered_at: string | null
  trigger_source: 'hardware' | 'software' | 'watchdog' | null
  can_recover: boolean
  message: string
}

// ==================== API 方法 ====================

/**
 * 获取紧急停止状态
 */
export async function getEmergencyStatus(): Promise<EmergencyStatus> {
  return apiClient.get('/api/v1/emergency/status')
}

/**
 * 触发紧急停止
 */
export async function triggerEmergencyStop(reason?: string): Promise<{
  success: boolean
  message: string
}> {
  return apiClient.post('/api/v1/emergency/stop', { reason })
}

/**
 * 恢复紧急停止
 */
export async function recoverEmergencyStop(): Promise<{
  success: boolean
  message: string
}> {
  return apiClient.post('/api/v1/emergency/recover')
}

export default {
  getEmergencyStatus,
  triggerEmergencyStop,
  recoverEmergencyStop
}
