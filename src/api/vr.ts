/**
 * VR 遥操作状态 API
 * 
 * 对应新后端 /api/v1/vr 路由
 * 
 * 注意: VR 实时数据通过 Data Plane WebSocket 订阅 "vr_system_state" 话题
 * 本模块仅提供连接状态查询
 */
import apiClient from './client'

// ==================== 类型定义 ====================

export interface VRClientInfo {
  device: string
  version: string
  session_id: string
  connected_at: string | null
}

export interface VRConnectionStatus {
  connected: boolean
  client_info: VRClientInfo | null
}

export interface VRControllerState {
  active: boolean
  pose: {
    position: number[]
    orientation: number[]
  }
  joystick: number[]
  trigger: number
  grip: number
  buttons: boolean[]
  clutch_engaged: boolean
}

export interface VRSystemState {
  connected: boolean
  head_pose: {
    position: number[]
    orientation: number[]
  }
  left_controller: VRControllerState
  right_controller: VRControllerState
}

// ==================== API 方法 ====================

/**
 * 获取 VR 连接状态
 * 
 * 返回 VR 是否已连接以及客户端信息
 */
export async function getVRStatus(): Promise<VRConnectionStatus> {
  return apiClient.get('/api/v1/vr/status')
}

export default {
  getVRStatus
}
