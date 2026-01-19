/**
 * 预设管理 API
 * 
 * 对应新后端 /api/v1/presets 路由
 * 统一管理所有预设类型
 */
import apiClient from './client'

// ==================== 类型定义 ====================

/** 预设类型 */
export type PresetType = 
  | 'arm_pose'
  | 'head_position'
  | 'lift_height'
  | 'waist_angle'
  | 'location'
  | 'gripper_position'
  | 'full_pose'

/** 预设类型信息 */
export interface PresetTypeInfo {
  type: PresetType
  name: string
  description: string
  data_fields: string[]
}

/** 预设基础信息 */
export interface PresetBase {
  id: string
  name: string
  description?: string
  category?: string
  is_builtin: boolean
  created_at?: string
  updated_at?: string
}

/** 机械臂预设数据 */
export interface ArmPoseData {
  side: 'left' | 'right' | 'both'
  pose_type?: string
  left_joints?: number[]
  right_joints?: number[]
  velocity?: number
  acceleration?: number
}

/** 头部预设数据 */
export interface HeadPositionData {
  pan: number
  tilt: number
}

/** 升降预设数据 */
export interface LiftHeightData {
  height: number
}

/** 腰部预设数据 */
export interface WaistAngleData {
  angle: number
}

/** 导航点预设数据 */
export interface LocationData {
  x: number
  y: number
  theta: number
  frame_id?: string
  station_id?: number
}

/** 夹爪预设数据 */
export interface GripperPositionData {
  side: 'left' | 'right'
  left_position?: number
  right_position?: number
  force?: number
}

/** 预设（带数据） */
export interface Preset<T = any> extends PresetBase {
  preset_type: PresetType
  data: T
}

/** 创建预设请求 */
export interface CreatePresetRequest<T = any> {
  preset_type: PresetType
  name: string
  description?: string
  category?: string
  data: T
}

/** 更新预设请求 */
export interface UpdatePresetRequest<T = any> {
  name?: string
  description?: string
  category?: string
  data?: T
}

/** 采集预设请求 */
export interface CapturePresetRequest {
  preset_type: PresetType
  name: string
  description?: string
  category?: string
}

/** 应用预设请求 */
export interface ApplyPresetRequest {
  velocity?: number
  wait_complete?: boolean
}

/** 预设列表响应 */
export interface PresetsListResponse {
  preset_type: PresetType
  total: number
  items: Preset[]
}

// ==================== API 方法 ====================

/**
 * 获取所有预设类型
 */
export async function getPresetTypes(): Promise<PresetTypeInfo[]> {
  const res: any = await apiClient.get('/api/v1/presets/types')
  return res.data?.types || res.types || []
}

/**
 * 获取指定类型的预设列表
 */
export async function listPresets(
  presetType: PresetType,
  options?: {
    category?: string
    include_builtin?: boolean
  }
): Promise<Preset[]> {
  const params: any = { preset_type: presetType }
  if (options?.category) params.category = options.category
  if (options?.include_builtin !== undefined) params.include_builtin = options.include_builtin
  
  const res: any = await apiClient.get('/api/v1/presets', { params })
  return res.data?.items || res.items || []
}

/**
 * 获取预设详情
 */
export async function getPreset(presetType: PresetType, presetId: string): Promise<Preset> {
  return apiClient.get(`/api/v1/presets/${presetType}/${presetId}`)
}

/**
 * 创建预设
 */
export async function createPreset<T>(request: CreatePresetRequest<T>): Promise<Preset<T>> {
  return apiClient.post('/api/v1/presets', request)
}

/**
 * 更新预设
 */
export async function updatePreset<T>(
  presetType: PresetType,
  presetId: string,
  request: UpdatePresetRequest<T>
): Promise<Preset<T>> {
  return apiClient.put(`/api/v1/presets/${presetType}/${presetId}`, request)
}

/**
 * 删除预设
 */
export async function deletePreset(presetType: PresetType, presetId: string): Promise<void> {
  return apiClient.delete(`/api/v1/presets/${presetType}/${presetId}`)
}

/**
 * 应用预设（执行预设动作）
 */
export async function applyPreset(
  presetType: PresetType,
  presetId: string,
  options?: ApplyPresetRequest
): Promise<{ preset_id: string; preset_name: string; applied: boolean; message: string }> {
  return apiClient.post(`/api/v1/presets/${presetType}/${presetId}/apply`, options || {})
}

/**
 * 采集当前状态为新预设
 */
export async function capturePreset(request: CapturePresetRequest): Promise<Preset> {
  return apiClient.post('/api/v1/presets/capture', request)
}

// ==================== 便捷方法 ====================

/** 获取机械臂预设列表 */
export const listArmPosePresets = () => listPresets('arm_pose')

/** 获取头部预设列表 */
export const listHeadPresets = () => listPresets('head_position')

/** 获取升降预设列表 */
export const listLiftPresets = () => listPresets('lift_height')

/** 获取腰部预设列表 */
export const listWaistPresets = () => listPresets('waist_angle')

/** 获取导航点预设列表 */
export const listLocationPresets = () => listPresets('location')

/** 获取夹爪预设列表 */
export const listGripperPresets = () => listPresets('gripper_position')

export default {
  getPresetTypes,
  listPresets,
  getPreset,
  createPreset,
  updatePreset,
  deletePreset,
  applyPreset,
  capturePreset,
  listArmPosePresets,
  listHeadPresets,
  listLiftPresets,
  listWaistPresets,
  listLocationPresets,
  listGripperPresets
}
