/**
 * API 统一入口
 * 
 * 导出所有 API 模块，便于统一管理
 */

// 基础客户端
export { default as apiClient } from './client'

// 认证
export * from './auth'
export { login, logout, getCurrentUser, heartbeat, refreshToken } from './auth'

// 系统配置
export * from './system'
export { default as systemApi } from './system'

// 控制权管理
export * from './control'
export { default as controlApi } from './control'

// 工作模式
export * from './mode'
export { default as modeApi } from './mode'

// 紧急停止
export * from './emergency'
export { default as emergencyApi } from './emergency'

// 预设管理 (使用新的统一预设接口)
export * from './presets'
export { default as presetsApi } from './presets'

// 任务管理 (注意: task.ts 中的 listPresets 已废弃，请使用 presets.ts)
export {
  // 类型
  type NodeType,
  type HeadPoint,
  type LiftPoint,
  type WaistPoint,
  type NodeParamDef,
  type NodeDefinition,
  type TaskNode,
  type TaskDefinition,
  type TaskExecutionState,
  type NodeStatus,
  // 节点定义
  NODE_DEFINITIONS,
  CATEGORY_NAMES,
  getNodeDefinition,
  getNodesByCategory,
  // 任务 API
  listTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  startTask,
  pauseTask,
  resumeTask,
  cancelTask,
  getTaskStatus,
  executeTask,
  executeTaskTree,
  // 点位 API (兼容接口，建议使用 presets.ts)
  listHeadPoints,
  getHeadPoint,
  listLiftPoints,
  getLiftPoint,
  listWaistPoints,
  getWaistPoint,
} from './task'

// 动作管理
export * from './actions'

// 录制管理
export * from './recording'
export { default as recordingApi } from './recording'

// 底盘
export * from './chassis'
export { default as chassisApi, chassisConfigApi } from './chassis'

// 升降
export * from './lift'
export { liftApi } from './lift'

// VR 遥操作
export * from './vr'
export { default as vrApi } from './vr'

// 关机
export * from './shutdown'
export { default as shutdownApi } from './shutdown'
