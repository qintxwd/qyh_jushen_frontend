/**
 * 录制管理 API
 * 
 * 对应新后端 /api/v1/recording 路由
 */
import apiClient from './client'

// ==================== 类型定义 ====================

export type RecordingStatus = 'idle' | 'recording' | 'paused' | 'processing'

export interface RecordingState {
  status: RecordingStatus
  action_id: string | null
  episode_number: number | null
  start_time: string | null
  duration_seconds: number
  frames_recorded: number
  topics: string[]
}

export interface StartRecordingRequest {
  action_id: string
  episode_name?: string
}

export interface RecordingResult {
  success: boolean
  episode_path?: string
  frames_count?: number
  duration_seconds?: number
  message: string
}

// ==================== API 方法 ====================

/**
 * 获取录制状态
 */
export async function getRecordingState(): Promise<RecordingState> {
  return apiClient.get('/api/v1/recording/status')
}

/**
 * 开始录制
 */
export async function startRecording(request: StartRecordingRequest): Promise<{
  success: boolean
  episode_number: number
  message: string
}> {
  return apiClient.post('/api/v1/recording/start', request)
}

/**
 * 停止录制
 */
export async function stopRecording(): Promise<RecordingResult> {
  return apiClient.post('/api/v1/recording/stop')
}

/**
 * 暂停录制
 */
export async function pauseRecording(): Promise<{
  success: boolean
  message: string
}> {
  return apiClient.post('/api/v1/recording/pause')
}

/**
 * 恢复录制
 */
export async function resumeRecording(): Promise<{
  success: boolean
  message: string
}> {
  return apiClient.post('/api/v1/recording/resume')
}

/**
 * 丢弃当前录制
 */
export async function discardRecording(): Promise<{
  success: boolean
  message: string
}> {
  return apiClient.post('/api/v1/recording/discard')
}

export default {
  getRecordingState,
  startRecording,
  stopRecording,
  pauseRecording,
  resumeRecording,
  discardRecording
}
