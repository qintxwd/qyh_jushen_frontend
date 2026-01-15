/**
 * 系统关机 API - 独立模块
 */
import client from './client'

export interface ShutdownResponse {
  success: boolean
  message: string
}

export interface ShutdownState {
  shutdown_in_progress: boolean
  trigger_source: number  // 0=无, 1=硬件按钮, 2=软件命令
  trigger_source_text: string
  countdown_seconds: number
  plc_connected: boolean
}

/**
 * 获取关机状态
 */
export async function getShutdownState(): Promise<ShutdownState> {
  return client.get<ShutdownState>('/api/v1/shutdown/state')
}

/**
 * 系统关机
 * 通过PLC实现：写M100线圈 -> 系统shutdown -> PLC断电
 */
export async function shutdownSystem(): Promise<ShutdownResponse> {
  return client.post<ShutdownResponse>('/api/v1/shutdown')
}

export default {
  getShutdownState,
  shutdownSystem
}
