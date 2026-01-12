/**
 * 任务编排 API
 */

import apiClient from './client'

// ==================== 类型定义 ====================

/** 节点类型 */
export type NodeType = 
  // 控制节点
  | 'Sequence' | 'Parallel' | 'Selector' | 'Decorator'
  // 技能节点
  | 'ArmMoveJ' | 'ArmMoveL' | 'ArmStop'
  | 'GripperControl'
  | 'HeadLookAt' | 'HeadScan'
  | 'BaseMoveTo' | 'BaseVelocity'
  | 'LiftMoveTo' | 'LiftStop'
  | 'WaistMoveTo' | 'WaistStop' | 'WaistUpright'
  | 'Wait' | 'CheckCondition'
  | 'Loop'
  | 'SubTask'
  // AI 模型节点
  | 'ACTExecute' | 'ACTLoadModel'

/** 头部点位 */
export interface HeadPoint {
  id: string
  name: string
  description: string
  pan: number
  tilt: number
  is_builtin: boolean
}

/** 升降点位 */
export interface LiftPoint {
  id: string
  name: string
  description: string
  height: number
  is_builtin: boolean
}

/** 腰部点位 */
export interface WaistPoint {
  id: string
  name: string
  description: string
  angle: number
  is_builtin: boolean
}

/** 升降点位 */
export interface LiftPoint {
  id: string
  name: string
  description: string
  height: number
  is_builtin: boolean
}

/** 腰部点位 */
export interface WaistPoint {
  id: string
  name: string
  description: string
  angle: number
  is_builtin: boolean
}

/** 节点参数定义 */
export interface NodeParamDef {
  name: string
  type: 'string' | 'number' | 'boolean' | 'array' | 'select' | 'preset'
  label: string
  required?: boolean
  default?: any
  options?: { label: string; value: any }[]
  presetType?: 'location' | 'arm_pose' | 'head_point' | 'lift_point' | 'waist_point' | 'gripper_position' | 'task_template' | 'saved_task'
  min?: number
  max?: number
  step?: number
}

/** 节点定义 */
export interface NodeDefinition {
  type: NodeType
  category: 'control' | 'arm' | 'gripper' | 'head' | 'base' | 'lift' | 'waist' | 'logic' | 'ai'
  name: string
  description: string
  icon: string
  color: string
  params: NodeParamDef[]
  hasChildren?: boolean
  maxChildren?: number
}

/** 任务节点 (画布上的节点) */
export interface TaskNode {
  id: string
  type: NodeType
  params: Record<string, any>
  children?: TaskNode[]
}

/** 任务定义 */
export interface TaskDefinition {
  id?: string
  name: string
  description?: string
  category?: string
  root: TaskNode
  created_at?: string
  updated_at?: string
}

/** 任务执行状态 */
export interface TaskExecutionState {
  task_id: string
  status: 'idle' | 'running' | 'paused' | 'completed' | 'failed' | 'cancelled'
  current_node_id?: string
  progress: number
  message?: string
  started_at?: string
  finished_at?: string
}

/** 节点状态 */
export interface NodeStatus {
  node_id: string
  node_type?: string
  node_name?: string
  status: 'idle' | 'running' | 'success' | 'failure' | 'halted'
  message?: string
  duration?: number
  // 扩展字段（用于复杂场景）
  children_count?: number
  current_child_index?: number
  current_iteration?: number
  total_iterations?: number
}

// ==================== 节点定义库 ====================

export const NODE_DEFINITIONS: NodeDefinition[] = [
  // 控制节点
  {
    type: 'Sequence',
    category: 'control',
    name: '顺序执行',
    description: '按顺序执行所有子节点，任一失败则停止',
    icon: 'Sort',
    color: '#409EFF',
    params: [],
    hasChildren: true
  },
  {
    type: 'Parallel',
    category: 'control',
    name: '并行执行',
    description: '同时执行所有子节点',
    icon: 'Grid',
    color: '#409EFF',
    params: [
      { name: 'success_threshold', type: 'number', label: '成功阈值', default: -1 }
    ],
    hasChildren: true
  },
  {
    type: 'Selector',
    category: 'control',
    name: '选择执行',
    description: '依次尝试子节点，任一成功则停止',
    icon: 'Switch',
    color: '#409EFF',
    params: [],
    hasChildren: true
  },

  // 机械臂技能
  {
    type: 'ArmMoveJ',
    category: 'arm',
    name: '关节运动',
    description: '控制机械臂关节运动到指定位置',
    icon: 'Cpu',
    color: '#67C23A',
    params: [
      { name: 'side', type: 'select', label: '机械臂', required: true, options: [
        { label: '左臂', value: 'left' },
        { label: '右臂', value: 'right' },
        { label: '双臂', value: 'both' }
      ], default: 'left' },
      { name: 'pose_name', type: 'preset', label: '预设姿态', presetType: 'arm_pose' },
      { name: 'velocity', type: 'number', label: '速度', default: 0.5, min: 0.1, max: 1.0, step: 0.1 },
      { name: 'acceleration', type: 'number', label: '加速度', default: 0.3, min: 0.1, max: 1.0, step: 0.1 }
    ]
  },
  {
    type: 'ArmMoveL',
    category: 'arm',
    name: '直线运动',
    description: '控制机械臂末端直线运动',
    icon: 'Cpu',
    color: '#67C23A',
    params: [
      { name: 'side', type: 'select', label: '机械臂', required: true, options: [
        { label: '左臂', value: 'left' },
        { label: '右臂', value: 'right' }
      ], default: 'left' },
      { name: 'x', type: 'number', label: 'X (m)', required: true, default: 0, step: 0.01 },
      { name: 'y', type: 'number', label: 'Y (m)', required: true, default: 0, step: 0.01 },
      { name: 'z', type: 'number', label: 'Z (m)', required: true, default: 0, step: 0.01 },
      { name: 'velocity', type: 'number', label: '速度 (mm/s)', default: 100, min: 10, max: 500 }
    ]
  },
  {
    type: 'ArmStop',
    category: 'arm',
    name: '机械臂急停',
    description: '立即停止机械臂运动',
    icon: 'CircleClose',
    color: '#F56C6C',
    params: [
      { name: 'side', type: 'select', label: '机械臂', default: 'both', options: [
        { label: '左臂', value: 'left' },
        { label: '右臂', value: 'right' },
        { label: '双臂', value: 'both' }
      ]}
    ]
  },

  // 夹爪技能
  {
    type: 'GripperControl',
    category: 'gripper',
    name: '夹爪控制',
    description: '控制夹爪开合',
    icon: 'Scissor',
    color: '#E6A23C',
    params: [
      { name: 'side', type: 'select', label: '夹爪', required: true, options: [
        { label: '左夹爪', value: 'left' },
        { label: '右夹爪', value: 'right' }
      ], default: 'left' },
      { name: 'action', type: 'select', label: '动作', options: [
        { label: '打开', value: 'open' },
        { label: '关闭', value: 'close' }
      ], default: 'open' },
      { name: 'position_name', type: 'preset', label: '预设位置', presetType: 'gripper_position' },
      { name: 'force', type: 'number', label: '夹持力', min: 0, max: 100, step: 10 }
    ]
  },

  // 头部技能
  {
    type: 'HeadLookAt',
    category: 'head',
    name: '头部转向',
    description: '控制头部云台转向指定角度',
    icon: 'View',
    color: '#909399',
    params: [
      { name: 'position_name', type: 'preset', label: '预设点位', presetType: 'head_point' },
      { name: 'pan', type: 'number', label: '水平角', default: 0, min: -1, max: 1, step: 0.1 },
      { name: 'tilt', type: 'number', label: '俯仰角', default: 0, min: -1, max: 1, step: 0.1 }
    ]
  },
  {
    type: 'HeadScan',
    category: 'head',
    name: '头部扫描',
    description: '头部执行扫描动作',
    icon: 'Refresh',
    color: '#909399',
    params: [
      { name: 'pattern', type: 'select', label: '扫描模式', options: [
        { label: '左右扫描', value: 'left_right' },
        { label: '上下扫描', value: 'up_down' },
        { label: '环形扫描', value: 'circle' }
      ], default: 'left_right' },
      { name: 'speed', type: 'number', label: '速度', default: 0.5, min: 0.1, max: 1.0, step: 0.1 },
      { name: 'repeat', type: 'number', label: '重复次数', default: 1, min: 1, max: 10 }
    ]
  },

  // 底盘技能
  {
    type: 'BaseMoveTo',
    category: 'base',
    name: '导航到点位',
    description: '底盘导航到指定位置',
    icon: 'Position',
    color: '#9B59B6',
    params: [
      { name: 'location', type: 'preset', label: '预设点位', presetType: 'location' },
      { name: 'x', type: 'number', label: 'X (m)', step: 0.1 },
      { name: 'y', type: 'number', label: 'Y (m)', step: 0.1 },
      { name: 'theta', type: 'number', label: '朝向 (rad)', default: 0, step: 0.1 },
      { name: 'timeout', type: 'number', label: '超时 (s)', default: 60, min: 5, max: 300 }
    ]
  },
  {
    type: 'BaseVelocity',
    category: 'base',
    name: '速度控制',
    description: '底盘速度控制',
    icon: 'Van',
    color: '#9B59B6',
    params: [
      { name: 'linear_x', type: 'number', label: '线速度 (m/s)', default: 0, min: -1, max: 1, step: 0.1 },
      { name: 'angular_z', type: 'number', label: '角速度 (rad/s)', default: 0, min: -1, max: 1, step: 0.1 },
      { name: 'duration', type: 'number', label: '持续时间 (s)', required: true, default: 1, min: 0.1, max: 10 }
    ]
  },

  // 升降技能
  {
    type: 'LiftMoveTo',
    category: 'lift',
    name: '升降移动',
    description: '控制升降电机移动到指定高度',
    icon: 'DCaret',
    color: '#3498DB',
    params: [
      { name: 'height_name', type: 'preset', label: '预设高度', presetType: 'lift_point' },
      { name: 'height', type: 'number', label: '高度 (mm)', min: 0, max: 500, step: 10 },
      { name: 'speed', type: 'number', label: '速度', default: 50, min: 10, max: 100 },
      { name: 'timeout', type: 'number', label: '超时 (s)', default: 30 }
    ]
  },
  {
    type: 'LiftStop',
    category: 'lift',
    name: '升降停止',
    description: '停止升降电机',
    icon: 'CircleClose',
    color: '#F56C6C',
    params: []
  },

  // 腰部技能
  {
    type: 'WaistMoveTo',
    category: 'waist',
    name: '腰部前倾',
    description: '控制腰部前倾到指定角度 (0~45度)',
    icon: 'SemiSelect',
    color: '#E67E22',
    params: [
      { name: 'angle_name', type: 'preset', label: '预设角度', presetType: 'waist_point' },
      { name: 'angle', type: 'number', label: '角度 (度)', min: 0, max: 45, step: 1 },
      { name: 'speed', type: 'number', label: '速度', default: 1000, min: 100, max: 5000 },
      { name: 'timeout', type: 'number', label: '超时 (s)', default: 30 }
    ]
  },
  {
    type: 'WaistUpright',
    category: 'waist',
    name: '腰部回正',
    description: '腰部回到竖直位置',
    icon: 'Aim',
    color: '#27AE60',
    params: [
      { name: 'speed', type: 'number', label: '速度', default: 1000, min: 100, max: 5000 },
      { name: 'timeout', type: 'number', label: '超时 (s)', default: 30 }
    ]
  },
  {
    type: 'WaistStop',
    category: 'waist',
    name: '腰部停止',
    description: '停止腰部电机',
    icon: 'CircleClose',
    color: '#F56C6C',
    params: []
  },

  // 逻辑技能
  {
    type: 'Wait',
    category: 'logic',
    name: '等待',
    description: '等待指定时间',
    icon: 'Clock',
    color: '#1ABC9C',
    params: [
      { name: 'duration', type: 'number', label: '时间 (s)', required: true, default: 1, min: 0.1, max: 60, step: 0.1 }
    ]
  },
  {
    type: 'CheckCondition',
    category: 'logic',
    name: '条件检查',
    description: '检查条件是否满足',
    icon: 'QuestionFilled',
    color: '#1ABC9C',
    params: [
      { name: 'condition', type: 'string', label: '条件表达式', required: true }
    ]
  },
  {
    type: 'Loop',
    category: 'control',
    name: '循环执行',
    description: '循环执行子节点指定次数（0表示无限循环）',
    icon: 'Refresh',
    color: '#409EFF',
    params: [
      { name: 'count', type: 'number', label: '循环次数', default: 1, min: 0, max: 1000, step: 1 },
      { name: 'break_on_failure', type: 'boolean', label: '失败时退出', default: true }
    ],
    hasChildren: true
  },
  {
    type: 'SubTask',
    category: 'logic',
    name: '子任务',
    description: '执行另一个已定义的任务',
    icon: 'Files',
    color: '#1ABC9C',
    params: [
      { name: 'task_id', type: 'preset', label: '选择任务', required: true, presetType: 'saved_task' }
    ]
  },

  // ==================== AI 模型节点 ====================
  {
    type: 'ACTExecute',
    category: 'ai',
    name: '执行 ACT 模型',
    description: '执行训练好的 ACT 动作模型',
    icon: 'MagicStick',
    color: '#9B59B6',
    params: [
      { name: 'action_id', type: 'preset', label: '选择动作', required: true, presetType: 'trained_action' },
      { name: 'max_duration', type: 'number', label: '最大执行时间(秒)', default: 30, min: 5, max: 120, step: 5 },
      { name: 'action_scale', type: 'number', label: '动作缩放', default: 0.4, min: 0.1, max: 1.0, step: 0.1 },
      { name: 'smoothing_alpha', type: 'number', label: '平滑系数', default: 0.3, min: 0.1, max: 1.0, step: 0.1 }
    ]
  },
  {
    type: 'ACTLoadModel',
    category: 'ai',
    name: '加载 ACT 模型',
    description: '预加载 ACT 模型（减少执行时延迟）',
    icon: 'Download',
    color: '#9B59B6',
    params: [
      { name: 'action_id', type: 'preset', label: '选择动作', required: true, presetType: 'trained_action' }
    ]
  }
]

/** 获取节点定义 */
export function getNodeDefinition(type: NodeType): NodeDefinition | undefined {
  return NODE_DEFINITIONS.find(n => n.type === type)
}

/** 按类别分组节点 */
export function getNodesByCategory(): Record<string, NodeDefinition[]> {
  const categories: Record<string, NodeDefinition[]> = {}
  for (const node of NODE_DEFINITIONS) {
    if (!categories[node.category]) {
      categories[node.category] = []
    }
    categories[node.category].push(node)
  }
  return categories
}

/** 类别名称 */
export const CATEGORY_NAMES: Record<string, string> = {
  control: '控制节点',
  arm: '机械臂',
  gripper: '夹爪',
  head: '头部',
  base: '底盘',
  lift: '升降',
  waist: '腰部',
  logic: '逻辑',
  ai: 'AI 模型'
}

// ==================== API 调用 ====================

/** 获取任务列表 */
export async function listTasks(category?: string): Promise<TaskDefinition[]> {
  const params = category ? { category } : {}
  const response = await apiClient.get('/api/v1/task/list', { params })
  return response as unknown as TaskDefinition[]
}

/** 获取任务详情 */
export async function getTask(taskId: string): Promise<TaskDefinition> {
  return apiClient.get(`/api/v1/task/${taskId}`)
}

/** 创建任务 */
export async function createTask(task: TaskDefinition): Promise<TaskDefinition> {
  return apiClient.post('/api/v1/task/create', task)
}

/** 更新任务 */
export async function updateTask(taskId: string, task: Partial<TaskDefinition>): Promise<TaskDefinition> {
  return apiClient.put(`/api/v1/task/${taskId}`, task)
}

/** 删除任务 */
export async function deleteTask(taskId: string): Promise<void> {
  return apiClient.delete(`/api/v1/task/${taskId}`)
}

/** 执行任务 */
export async function executeTask(taskId: string): Promise<{ success: boolean; message: string }> {
  return apiClient.post(`/api/v1/task/${taskId}/execute`)
}

/** 直接执行任务树 */
export async function executeTaskTree(taskTree: TaskDefinition): Promise<{ success: boolean; message: string }> {
  return apiClient.post('/api/v1/task/execute', taskTree)
}

/** 暂停任务 */
export async function pauseTask(taskId: string): Promise<{ success: boolean; message: string }> {
  return apiClient.post('/api/v1/task/pause', { task_id: taskId })
}

/** 恢复任务 */
export async function resumeTask(taskId: string): Promise<{ success: boolean; message: string }> {
  return apiClient.post('/api/v1/task/resume', { task_id: taskId })
}

/** 取消任务 */
export async function cancelTask(taskId: string): Promise<{ success: boolean; message: string }> {
  return apiClient.post('/api/v1/task/cancel', { task_id: taskId })
}

/** 获取任务执行状态 */
export async function getTaskStatus(taskId: string): Promise<TaskExecutionState> {
  return apiClient.get('/api/v1/task/status', { params: { task_id: taskId } })
}

// ==================== 预设 API ====================

/** 获取预设列表 */
export async function listPresets(
  presetType: 'location' | 'arm_pose' | 'head_position' | 'lift_height' | 'gripper_position' | 'task_template'
): Promise<{ items: any[] }> {
  return apiClient.get(`/api/v1/presets/${presetType}`)
}

// ==================== 任务模板 ====================

export interface TaskTemplate {
  id: string
  name: string
  description: string
  category: string
  icon: string
  task: TaskDefinition
}

/** 内置任务模板 */
export const TASK_TEMPLATES: TaskTemplate[] = [
  {
    id: 'pick_and_place',
    name: '抓取放置',
    description: '抓取物体并放置到指定位置',
    category: '常用',
    icon: 'Goods',
    task: {
      name: '抓取放置任务',
      description: '抓取物体并放置到指定位置',
      root: {
        id: 'root',
        type: 'Sequence',
        params: {},
        children: [
          { id: 'n1', type: 'ArmMoveJ', params: { side: 'left', velocity: 0.5 } },
          { id: 'n2', type: 'GripperControl', params: { side: 'left', action: 'open' } },
          { id: 'n3', type: 'ArmMoveL', params: { side: 'left', z: -0.1, velocity: 50 } },
          { id: 'n4', type: 'GripperControl', params: { side: 'left', action: 'close' } },
          { id: 'n5', type: 'ArmMoveL', params: { side: 'left', z: 0.1, velocity: 50 } },
          { id: 'n6', type: 'ArmMoveJ', params: { side: 'left', velocity: 0.5 } },
          { id: 'n7', type: 'GripperControl', params: { side: 'left', action: 'open' } }
        ]
      }
    }
  },
  {
    id: 'scan_and_look',
    name: '环顾扫描',
    description: '头部执行扫描动作，观察周围环境',
    category: '常用',
    icon: 'View',
    task: {
      name: '环顾扫描任务',
      description: '头部执行扫描动作',
      root: {
        id: 'root',
        type: 'Sequence',
        params: {},
        children: [
          { id: 'n1', type: 'HeadLookAt', params: { pitch: 0, yaw: 0 } },
          { id: 'n2', type: 'HeadScan', params: { pattern: 'left_right', speed: 0.3, repeat: 2 } },
          { id: 'n3', type: 'HeadLookAt', params: { pitch: 0, yaw: 0 } }
        ]
      }
    }
  },
  {
    id: 'navigate_and_lift',
    name: '导航与升降',
    description: '导航到目标点并调整升降高度',
    category: '常用',
    icon: 'Position',
    task: {
      name: '导航升降任务',
      description: '导航到目标点并调整升降高度',
      root: {
        id: 'root',
        type: 'Sequence',
        params: {},
        children: [
          { id: 'n1', type: 'LiftMoveTo', params: { height: 100 } },
          { id: 'n2', type: 'BaseMoveTo', params: { timeout: 60 } },
          { id: 'n3', type: 'LiftMoveTo', params: { height: 300 } }
        ]
      }
    }
  },
  {
    id: 'dual_arm_grasp',
    name: '双臂协同抓取',
    description: '双臂同时动作抓取大型物体',
    category: '高级',
    icon: 'Connection',
    task: {
      name: '双臂协同抓取',
      description: '双臂同时动作抓取大型物体',
      root: {
        id: 'root',
        type: 'Sequence',
        params: {},
        children: [
          {
            id: 'n1',
            type: 'Parallel',
            params: {},
            children: [
              { id: 'n1_1', type: 'ArmMoveJ', params: { side: 'left', velocity: 0.5 } },
              { id: 'n1_2', type: 'ArmMoveJ', params: { side: 'right', velocity: 0.5 } }
            ]
          },
          {
            id: 'n2',
            type: 'Parallel',
            params: {},
            children: [
              { id: 'n2_1', type: 'GripperControl', params: { side: 'left', action: 'close' } },
              { id: 'n2_2', type: 'GripperControl', params: { side: 'right', action: 'close' } }
            ]
          },
          {
            id: 'n3',
            type: 'Parallel',
            params: {},
            children: [
              { id: 'n3_1', type: 'ArmMoveL', params: { side: 'left', z: 0.1, velocity: 30 } },
              { id: 'n3_2', type: 'ArmMoveL', params: { side: 'right', z: 0.1, velocity: 30 } }
            ]
          }
        ]
      }
    }
  },
  {
    id: 'home_position',
    name: '回归初始位',
    description: '所有部件回到初始位置',
    category: '安全',
    icon: 'HomeFilled',
    task: {
      name: '回归初始位',
      description: '所有部件回到初始位置',
      root: {
        id: 'root',
        type: 'Parallel',
        params: {},
        children: [
          { id: 'n1', type: 'ArmMoveJ', params: { side: 'both', velocity: 0.3 } },
          { id: 'n2', type: 'GripperControl', params: { side: 'left', action: 'open' } },
          { id: 'n3', type: 'GripperControl', params: { side: 'right', action: 'open' } },
          { id: 'n4', type: 'HeadLookAt', params: { pan: 0, tilt: 0 } },
          { id: 'n5', type: 'LiftMoveTo', params: { height: 0 } }
        ]
      }
    }
  }
]

/** 获取模板列表 */
export function getTaskTemplates(): TaskTemplate[] {
  return TASK_TEMPLATES
}

/** 获取模板 */
export function getTaskTemplate(templateId: string): TaskTemplate | undefined {
  return TASK_TEMPLATES.find(t => t.id === templateId)
}

// ==================== 头部点位 API ====================

/** 获取头部点位列表 */
export async function listHeadPoints(): Promise<HeadPoint[]> {
  return await apiClient.get('/api/v1/head/points')
}

/** 获取指定头部点位 */
export async function getHeadPoint(pointId: string): Promise<HeadPoint> {
  return await apiClient.get(`/api/v1/head/points/${pointId}`)
}

// ==================== 升降点位 API ====================

/** 获取升降点位列表 */
export async function listLiftPoints(): Promise<LiftPoint[]> {
  return await apiClient.get('/api/v1/lift/points')
}

/** 获取指定升降点位 */
export async function getLiftPoint(pointId: string): Promise<LiftPoint> {
  return await apiClient.get(`/api/v1/lift/points/${pointId}`)
}

// ==================== 腰部点位 API ====================

/** 获取腰部点位列表 */
export async function listWaistPoints(): Promise<WaistPoint[]> {
  return await apiClient.get('/api/v1/waist/points')
}

/** 获取指定腰部点位 */
export async function getWaistPoint(pointId: string): Promise<WaistPoint> {
  return await apiClient.get(`/api/v1/waist/points/${pointId}`)
}
