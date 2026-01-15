/**
 * 模型动作管理 API
 * 
 * 动作有两种状态：
 * - collecting: 数据采集中，只能用于数据采集
 * - trained: 已训练，可以执行推理，同时也支持继续采集数据
 * 
 * 目录结构：model_actions/{robot_name}/{version}/{action_id}/
 */
import axios from 'axios'
import { normalizeApiResponse } from './client'
import { getApiV1BaseUrl } from '@/utils/apiUrl'

const api = axios.create({
  baseURL: `${getApiV1BaseUrl()}/actions`,
})

// 添加认证头
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截器（统一响应格式扁平化）
api.interceptors.response.use((response) => {
  return { ...response, data: normalizeApiResponse(response.data) }
})

// 动作状态类型
export type ActionStatus = 'collecting' | 'trained'

// 机器人信息（从后端获取）
export interface RobotInfo {
  name: string
  version: string
}

// 缓存的机器人信息
let cachedRobotInfo: RobotInfo | null = null

/**
 * 获取当前机器人信息
 */
export async function getRobotInfo(): Promise<RobotInfo> {
  if (cachedRobotInfo) {
    return cachedRobotInfo
  }
  const response = await api.get('/robot-info')
  if (response.data.success) {
    cachedRobotInfo = {
      name: response.data.robot_name,
      version: response.data.robot_version
    }
    return cachedRobotInfo
  }
  // 默认值
  return { name: 'general', version: '1.0' }
}

export interface ActionSummary {
  id: string
  name: string
  description: string
  version: string
  tags: string[]
  status: ActionStatus      // 动作状态
  has_model: boolean        // 是否有模型文件
  episode_count: number     // 已采集轨迹数
  topics: string[]
  camera_count: number
  model_version?: number    // 模型版本号
  robot_name?: string       // 机器人类型
  robot_version?: string    // 机器人版本
  created_at: string
  updated_at: string
}

export interface ActionDetail {
  id: string
  name: string
  description: string
  version: string
  tags: string[]
  status: ActionStatus
  has_model: boolean
  episode_count: number
  last_training: string | null
  model_version: string | null
  collection: {
    cameras: Array<{
      name: string
      topic: string
      type: string
      resize: number[]
    }>
    joints: {
      topic: string
      names: string[]
    }
    grippers: Array<{
      topic: string
      joint_name: string
    }>
    sync_method: string
    sync_tolerance_ms: number
    target_hz: number
    action_type: string
  }
  training: Record<string, any>
  inference: Record<string, any>
}

/**
 * 获取所有可用动作列表
 * @param status 可选，过滤特定状态的动作
 */
export async function listActions(status?: ActionStatus): Promise<ActionSummary[]> {
  const params = status ? { status } : {}
  const response = await api.get('/list', { params })
  if (response.data.success) {
    return response.data.actions
  }
  throw new Error(response.data.message || 'Failed to list actions')
}

/**
 * 获取已训练的动作列表（可用于执行推理）
 */
export async function listTrainedActions(): Promise<ActionSummary[]> {
  const response = await api.get('/trained')
  if (response.data.success) {
    return response.data.actions
  }
  throw new Error(response.data.message || 'Failed to list trained actions')
}

/**
 * 获取数据采集中的动作列表
 */
export async function listCollectingActions(): Promise<ActionSummary[]> {
  const response = await api.get('/collecting')
  if (response.data.success) {
    return response.data.actions
  }
  throw new Error(response.data.message || 'Failed to list collecting actions')
}

/**
 * 获取动作详情
 */
export async function getAction(actionId: string): Promise<ActionDetail> {
  const response = await api.get(`/${actionId}`)
  if (response.data.success) {
    return response.data.action
  }
  throw new Error(response.data.message || 'Failed to get action')
}

/**
 * 获取动作需要录制的话题列表
 */
export async function getActionTopics(actionId: string): Promise<string[]> {
  const response = await api.get(`/${actionId}/topics`)
  if (response.data.success) {
    return response.data.topics
  }
  throw new Error('Failed to get topics')
}

/**
 * 创建新动作（初始状态为 collecting）
 */
export async function createAction(params: {
  id: string
  name: string
  description?: string
  template?: string
}): Promise<ActionSummary> {
  const response = await api.post('/create', params)
  if (response.data.success) {
    return response.data.action
  }
  throw new Error(response.data.message || 'Failed to create action')
}

/**
 * 删除动作
 */
export async function deleteAction(actionId: string, deleteData: boolean = false): Promise<void> {
  await api.delete(`/${actionId}`, { params: { delete_data: deleteData } })
}

/**
 * 更新动作的轨迹数量统计
 */
export async function updateEpisodeCount(actionId: string): Promise<number> {
  const response = await api.post(`/${actionId}/update-episode-count`)
  if (response.data.success) {
    return response.data.episode_count
  }
  throw new Error('Failed to update episode count')
}

/**
 * 标记动作为已训练状态
 */
export async function markActionTrained(actionId: string, modelVersion: string = '1.0.0'): Promise<void> {
  const response = await api.post(`/${actionId}/mark-trained`, null, {
    params: { model_version: modelVersion }
  })
  if (!response.data.success) {
    throw new Error('Failed to mark action as trained')
  }
}

/**
 * 获取推理配置（仅适用于已训练的动作）
 */
export async function getInferenceConfig(actionId: string): Promise<Record<string, any>> {
  const response = await api.get(`/${actionId}/inference-config`)
  if (response.data.success) {
    return response.data.config
  }
  throw new Error('Failed to get inference config')
}
