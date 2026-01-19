/**
 * 系统配置 API
 * 
 * 对应新后端 /api/v1/system 路由
 */
import apiClient from './client'

// ==================== 类型定义 ====================

export interface EndpointsConfig {
  websocket: string
  webrtc_signaling: string
}

export interface WebRTCConfig {
  ice_servers: { urls: string }[]
}

export interface FeaturesConfig {
  vr_teleop: boolean
  multi_camera: boolean
  recording: boolean
  navigation: boolean
}

export interface SystemConfig {
  robot_id: string
  robot_name: string
  endpoints: EndpointsConfig
  webrtc: WebRTCConfig
  features: FeaturesConfig
}

export interface ServiceHealth {
  name: string
  status: 'healthy' | 'degraded' | 'unhealthy' | 'unknown'
  latency_ms: number
  message: string
}

export interface SystemHealth {
  overall_status: 'healthy' | 'degraded' | 'unhealthy'
  services: ServiceHealth[]
  uptime_seconds: number
  robot_mode: string
  timestamp: string
}

export interface SystemInfo {
  version: string
  environment: string
  uptime_seconds: number
  robot_mode: string
}

// ==================== API 方法 ====================

/**
 * 获取系统配置（服务发现）
 * 前端只硬编码 FastAPI 地址，其他所有服务地址从此接口获取
 */
export async function getSystemConfig(): Promise<SystemConfig> {
  return apiClient.get('/api/v1/system/config')
}

/**
 * 获取系统健康状态
 */
export async function getSystemHealth(): Promise<SystemHealth> {
  return apiClient.get('/api/v1/system/health')
}

/**
 * 获取系统基本信息
 */
export async function getSystemInfo(): Promise<SystemInfo> {
  return apiClient.get('/api/v1/system/info')
}

export default {
  getSystemConfig,
  getSystemHealth,
  getSystemInfo
}
