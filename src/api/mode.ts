/**
 * 工作模式管理 API
 * 
 * 对应新后端 /api/v1/mode 路由
 */
import apiClient from './client'

// ==================== 类型定义 ====================

export type RobotMode = 'idle' | 'manual' | 'auto' | 'vr_teleop' | 'emergency_stop'

export interface ModeStatus {
  current_mode: RobotMode
  previous_mode: RobotMode | null
  mode_since: string
  can_switch_to: RobotMode[]
}

export interface SwitchModeRequest {
  target_mode: RobotMode
  force?: boolean
  reason?: string
}

// ==================== API 方法 ====================

/**
 * 获取当前模式状态
 */
export async function getModeStatus(): Promise<ModeStatus> {
  return apiClient.get('/api/v1/mode/status')
}

/**
 * 切换工作模式
 */
export async function switchMode(request: SwitchModeRequest): Promise<{
  success: boolean
  current_mode: RobotMode
  message: string
}> {
  return apiClient.post('/api/v1/mode/switch', request)
}

/**
 * 获取可切换的模式列表
 */
export async function getAvailableModes(): Promise<{
  current_mode: RobotMode
  available_modes: RobotMode[]
}> {
  return apiClient.get('/api/v1/mode/available')
}

export default {
  getModeStatus,
  switchMode,
  getAvailableModes
}
