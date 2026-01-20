/**
 * Data Plane WebSocket 连接 Hook
 * 
 * 提供与 Data Plane (C++ WebSocket Server) 的连接管理，
 * 包括认证、订阅、心跳、状态接收和控制命令发送
 * 
 * 使用 Protobuf 进行消息序列化/反序列化
 */

import { ref, reactive, onMounted, onUnmounted, computed } from 'vue'
import { qyh } from '@/proto/dataplane'
import { getSystemConfig } from '@/api/system'

// Protobuf 类型别名
const { WebSocketMessage, MessageType } = qyh.dataplane

// ==================== 类型定义 ====================

// 重新导出 Protobuf 枚举供外部使用
export { MessageType }
export type { qyh }

/** 机器人工作模式 */
export enum RobotMode {
  IDLE = 0,
  TELEOP = 1,
  AUTO = 2,
  MAINTENANCE = 3,
  ERROR = 4,
}

/** 位姿 */
export interface Pose {
  position: { x: number; y: number; z: number }
  orientation: { x: number; y: number; z: number; w: number }
}

/** 速度 */
export interface Twist {
  linear: { x: number; y: number; z: number }
  angular: { x: number; y: number; z: number }
}

/** 执行器状态 (升降/腰部/头部) */
export interface ActuatorState {
  actuator_id: string
  position: number
  velocity: number
  min_limit: number
  max_limit: number
  in_motion: boolean
  in_position: boolean
}

/** 夹爪状态 */
export interface GripperState {
  gripper_id: string
  position: number
  force: number
  object_detected: boolean
  in_motion: boolean
}

/** 机械臂状态 */
export interface ArmState {
  connected: boolean
  powered_on: boolean
  enabled: boolean
  in_estop: boolean
  in_error: boolean
  servo_mode: boolean
  error_message: string
  left_positions: number[]
  right_positions: number[]
  left_end_effector?: Pose
  right_end_effector?: Pose
  left_in_position: boolean
  right_in_position: boolean
}

/** 底盘状态 */
export interface ChassisState {
  odom?: Pose
  velocity?: Twist
  battery_level: number
  charging: boolean
  emergency_stop: boolean
  navigation?: {
    state: number
    current_goal?: Pose
    distance_remaining: number
    eta_seconds: number
    error_message: string
  }
}

/** 关节状态 */
export interface JointState {
  names: string[]
  positions: number[]
  velocities: number[]
  efforts: number[]
}

/** VR 系统状态 */
export interface VRSystemState {
  connected: boolean
  head_pose?: Pose
  left_controller_active: boolean
  right_controller_active: boolean
  left_clutch_engaged: boolean
  right_clutch_engaged: boolean
}

/** 任务状态 */
export interface TaskState {
  task_id: number
  task_name: string
  status: 'pending' | 'running' | 'paused' | 'completed' | 'failed' | 'cancelled'
  current_step: number
  total_steps: number
  progress: number
  current_action: string
  error_message?: string
}

/** 机器人综合状态 */
export interface RobotState {
  mode: RobotMode
  control_held: boolean
  control_holder: string
  arm?: ArmState
  chassis?: ChassisState
  joints?: JointState
  lift?: ActuatorState
  waist?: ActuatorState
  head_pan?: ActuatorState
  head_tilt?: ActuatorState
  left_gripper?: GripperState
  right_gripper?: GripperState
  system_ready: boolean
  active_errors: string[]
  warnings: string[]
}

// 使用 Protobuf 生成的类型
export type IWebSocketMessage = qyh.dataplane.IWebSocketMessage

/** 连接状态 */
export type ConnectionState = 'disconnected' | 'connecting' | 'authenticating' | 'connected' | 'error'

/** 可订阅的话题 */
export const SUBSCRIBABLE_TOPICS = [
  'robot_state',      // 综合状态 (30Hz)
  'joint_state',      // 关节状态 (100Hz)
  'arm_state',        // 机械臂状态
  'chassis_state',    // 底盘状态
  'gripper_state',    // 夹爪状态
  'vr_system_state',  // VR 状态
  'task_state',       // 任务状态
  'actuator_state',   // 执行器状态
] as const

export type SubscribableTopic = typeof SUBSCRIBABLE_TOPICS[number]

// ==================== 配置 ====================

const DATA_PLANE_PORT = 8765
const HEARTBEAT_INTERVAL = 150  // ms, < 200ms watchdog timeout
const RECONNECT_DELAY = 2000    // ms
const MAX_RECONNECT_ATTEMPTS = 10
const AUTH_TIMEOUT = 10000      // ms

// ==================== Composable ====================

export function useDataPlane() {
  // 连接状态
  const connectionState = ref<ConnectionState>('disconnected')
  const sessionId = ref<string>('')
  const reconnectAttempts = ref(0)
  const lastError = ref<string>('')
  
  // 订阅的话题
  const subscribedTopics = ref<Set<string>>(new Set())
  
  // 最新状态数据
  const robotState = reactive<Partial<RobotState>>({})
  const jointState = reactive<Partial<JointState>>({})
  const armState = reactive<Partial<ArmState>>({})
  const chassisState = reactive<Partial<ChassisState>>({})
  const vrSystemState = reactive<Partial<VRSystemState>>({})
  const taskState = reactive<Partial<TaskState>>({})
  const liftState = reactive<Partial<ActuatorState>>({})
  const waistState = reactive<Partial<ActuatorState>>({})
  const headPanState = reactive<Partial<ActuatorState>>({})
  const headTiltState = reactive<Partial<ActuatorState>>({})
  const leftGripperState = reactive<Partial<GripperState>>({})
  const rightGripperState = reactive<Partial<GripperState>>({})
  
  // 计算属性
  const isConnected = computed(() => connectionState.value === 'connected')
  const isAuthenticated = computed(() => connectionState.value === 'connected' && sessionId.value !== '')
  
  // 内部变量
  let ws: WebSocket | null = null
  let heartbeatTimer: number | null = null
  let reconnectTimer: number | null = null
  let authTimeoutTimer: number | null = null
  let messageSequence = 0
  
  // 事件回调
  const eventHandlers: Map<string, Set<(data: any) => void>> = new Map()
  
  /**
   * 获取 WebSocket URL
   */
  async function getWsUrl(): Promise<string> {
    try {
      const config = await getSystemConfig()
      if (config.endpoints && config.endpoints.websocket) {
        return config.endpoints.websocket
      }
    } catch (e) {
      console.warn('[DataPlane] 获取系统配置失败, 使用默认 WebSocket 地址', e)
    }
    
    // 后备方案
    const hostname = window.location.hostname
    return `ws://${hostname}:${DATA_PLANE_PORT}/`
  }
  
  /**
   * 连接到 Data Plane
   */
  async function connect() {
    if (ws?.readyState === WebSocket.OPEN || ws?.readyState === WebSocket.CONNECTING) {
      return
    }
    
    connectionState.value = 'connecting'
    lastError.value = ''
    
    const url = await getWsUrl()
    console.log(`[DataPlane] 连接到 ${url}`)
    
    try {
      ws = new WebSocket(url)
      ws.binaryType = 'arraybuffer'  // Protobuf 使用二进制
      
      ws.onopen = handleOpen
      ws.onmessage = handleMessage
      ws.onerror = handleError
      ws.onclose = handleClose
    } catch (error: any) {
      console.error('[DataPlane] 连接失败:', error)
      connectionState.value = 'error'
      lastError.value = error.message
      scheduleReconnect()
    }
  }
  
  /**
   * 断开连接
   */
  function disconnect() {
    clearTimers()
    reconnectAttempts.value = 0
    
    if (ws) {
      ws.onclose = null  // 防止触发重连
      ws.close()
      ws = null
    }
    
    connectionState.value = 'disconnected'
    sessionId.value = ''
    subscribedTopics.value.clear()
  }
  
  /**
   * 发送消息 (使用 Protobuf 序列化)
   */
  function send(message: qyh.dataplane.IWebSocketMessage): boolean {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      console.warn('[DataPlane] WebSocket 未连接，无法发送消息')
      return false
    }
    
    // 添加序列号和时间戳
    message.sequence = ++messageSequence
    message.timestamp = {
      seconds: Math.floor(Date.now() / 1000),
      nanos: (Date.now() % 1000) * 1000000
    }
    
    try {
      // 使用 Protobuf 编码
      const protoMsg = WebSocketMessage.create(message)
      const buffer = WebSocketMessage.encode(protoMsg).finish()
      ws.send(buffer)
      return true
    } catch (error) {
      console.error('[DataPlane] Protobuf 编码失败:', error)
      return false
    }
  }
  
  /**
   * 认证
   */
  function authenticate() {
    const token = localStorage.getItem('token')
    if (!token) {
      console.error('[DataPlane] 无 Token，无法认证')
      connectionState.value = 'error'
      lastError.value = '未登录'
      return
    }
    
    connectionState.value = 'authenticating'
    
    // 设置认证超时
    authTimeoutTimer = window.setTimeout(() => {
      console.error('[DataPlane] 认证超时')
      connectionState.value = 'error'
      lastError.value = '认证超时'
      disconnect()
    }, AUTH_TIMEOUT)
    
    send({
      type: MessageType.MSG_AUTH_REQUEST,
      authRequest: {
        token,
        clientType: 'web',
        clientVersion: '1.0.0'
      }
    })
  }
  
  /**
   * 订阅话题
   */
  function subscribe(topics: SubscribableTopic[], maxRateHz: number = 30) {
    if (!isAuthenticated.value) {
      console.warn('[DataPlane] 未认证，无法订阅')
      return
    }
    
    send({
      type: MessageType.MSG_SUBSCRIBE,
      subscribe: {
        topics,
        maxRateHz
      }
    })
    
    topics.forEach(t => subscribedTopics.value.add(t))
  }
  
  /**
   * 取消订阅
   */
  function unsubscribe(topics: SubscribableTopic[]) {
    if (!isAuthenticated.value) return
    
    send({
      type: MessageType.MSG_UNSUBSCRIBE,
      unsubscribe: { topics }
    })
    
    topics.forEach(t => subscribedTopics.value.delete(t))
  }
  
  /**
   * 发送心跳
   */
  function sendHeartbeat() {
    if (!isAuthenticated.value) return
    
    send({
      type: MessageType.MSG_HEARTBEAT,
      heartbeat: {
        sessionId: sessionId.value,
        controlType: qyh.dataplane.ControlType.CONTROL_NONE
      }
    })
  }

  /**
   * 发送紧急停止 (WebSocket 通道 - 优先使用)
   */
  function sendEmergencyStop(active: boolean, reason: string = 'User triggered emergency stop'): boolean {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      return false
    }

    /* 
     * 注意: 急停不需要认证即可发送 (根据安全要求)
     * 但如果连接未建立，必须回退到 HTTP
     */

    // 直接构造消息发送，绕过 send() 的序列号检查可能带来的问题（虽然 send() 也能用）
    // 这里复用 standard send()
    return send({
      type: MessageType.MSG_EMERGENCY_STOP,
      emergencyStop: {
        active: active,
        reason: reason
      }
    })
  }
  
  /**
   * 发送底盘速度命令
   * 支持两种调用方式:
   * 1. sendChassisVelocity(linearX, linearY, angularZ) - 直接参数
   * 2. sendChassisVelocity({ linear: {x,y,z}, angular: {x,y,z} }) - 对象格式
   */
  function sendChassisVelocity(
    linearXOrCmd: number | { linear?: { x?: number; y?: number; z?: number }; angular?: { x?: number; y?: number; z?: number } },
    linearY?: number,
    angularZ?: number
  ) {
    if (!isAuthenticated.value) return false
    
    let lx: number, ly: number, az: number
    
    if (typeof linearXOrCmd === 'object') {
      // 对象格式调用
      lx = linearXOrCmd.linear?.x ?? 0
      ly = linearXOrCmd.linear?.y ?? 0
      az = linearXOrCmd.angular?.z ?? 0
    } else {
      // 直接参数调用
      lx = linearXOrCmd
      ly = linearY ?? 0
      az = angularZ ?? 0
    }
    
    return send({
      type: MessageType.MSG_CHASSIS_VELOCITY,
      chassisVelocity: {
        linearX: lx,
        linearY: ly,
        angularZ: az
      }
    })
  }
  
  /**
   * 发送关节命令
   */
  function sendJointCommand(names: string[], positions: number[], velocities?: number[]) {
    if (!isAuthenticated.value) return false
    
    return send({
      type: MessageType.MSG_JOINT_COMMAND,
      jointCommand: {
        names,
        positions,
        velocities: velocities || []
      }
    })
  }
  
  /**
   * 发送夹爪命令
   */
  function sendGripperCommand(gripperId: 'left' | 'right', position: number, force: number = 50) {
    if (!isAuthenticated.value) return false
    
    return send({
      type: MessageType.MSG_GRIPPER_COMMAND,
      gripperCommand: {
        gripperId,
        position,
        force
      }
    })
  }

  /**
   * 发送升降柱命令
   */
  function sendLiftCommand(command: string, targetHeight: number = 0, speed: number = 0.5) {
     if (!isAuthenticated.value) return false
     return send({
       type: MessageType.MSG_LIFT_COMMAND,
       liftCommand: {
         command,
         targetHeight,
         speed
       }
     })
  }

  /**
   * 发送头部云台命令
   */
  function sendHeadCommand(command: string, yaw: number = 0, pitch: number = 0, presetName: string = '', speed: number = 0.5) {
     if (!isAuthenticated.value) return false
     return send({
       type: MessageType.MSG_HEAD_COMMAND,
       headCommand: {
         command,
         yaw,
         pitch,
         presetName,
         speed
       }
     })
  }

  /**
   * 发送腰部命令
   */
  function sendWaistCommand(command: string, targetAngle: number = 0, speed: number = 0.5) {
     if (!isAuthenticated.value) return false
     return send({
       type: MessageType.MSG_WAIST_COMMAND,
       waistCommand: {
         command,
         targetAngle,
         speed
       }
     })
  }

  /**
   * 发送机械臂移动命令
   */
  function sendArmMove(armSide: string, motionType: string, target: number[], speed: number = 0.5) {
    if (!isAuthenticated.value) return false
    return send({
      type: MessageType.MSG_ARM_MOVE,
      armMove: {
        armSide,
        motionType,
        target,
        speed
      }
    })
  }

  /**
   * 发送机械臂点动命令
   */
  function sendArmJog(armSide: string, axisIndex: number, direction: number, jogMode: string = 'joint') {
    if (!isAuthenticated.value) return false
    return send({
      type: MessageType.MSG_ARM_JOG,
      armJog: {
        armSide,
        jogMode,
        axisIndex, // 0-5
        direction // -1.0 to 1.0 (speed * sign)
      }
    })
  }
  
  /**
   * 注册事件处理器
   */
  function on(event: string, handler: (data: any) => void) {
    if (!eventHandlers.has(event)) {
      eventHandlers.set(event, new Set())
    }
    eventHandlers.get(event)!.add(handler)
    
    return () => {
      eventHandlers.get(event)?.delete(handler)
    }
  }
  
  /**
   * 触发事件
   */
  function emit(event: string, data: any) {
    eventHandlers.get(event)?.forEach(handler => {
      try {
        handler(data)
      } catch (e) {
        console.error(`[DataPlane] 事件处理器错误 (${event}):`, e)
      }
    })
  }
  
  // ==================== 内部处理函数 ====================
  
  function handleOpen() {
    console.log('[DataPlane] WebSocket 已连接')
    reconnectAttempts.value = 0
    authenticate()
  }
  
  function handleMessage(event: MessageEvent) {
    let message: qyh.dataplane.WebSocketMessage
    
    try {
      // 使用 Protobuf 解码二进制数据
      if (event.data instanceof ArrayBuffer) {
        const uint8Array = new Uint8Array(event.data)
        message = WebSocketMessage.decode(uint8Array)
      } else if (typeof event.data === 'string') {
        // 兼容 JSON 格式（调试用）
        const jsonObj = JSON.parse(event.data)
        message = WebSocketMessage.fromObject(jsonObj)
      } else {
        console.warn('[DataPlane] 未知消息格式:', typeof event.data)
        return
      }
    } catch (e) {
      console.error('[DataPlane] Protobuf 解码失败:', e)
      return
    }
    
    switch (message.type) {
      case MessageType.MSG_AUTH_RESPONSE:
        handleAuthResponse(message)
        break
        
      case MessageType.MSG_ROBOT_STATE:
        if (message.robotState) {
          Object.assign(robotState, message.robotState)
          emit('robot_state', message.robotState)
        }
        break
        
      case MessageType.MSG_JOINT_STATE:
        if (message.jointState) {
          Object.assign(jointState, message.jointState)
          emit('joint_state', message.jointState)
        }
        break
        
      case MessageType.MSG_ARM_STATE:
        if (message.armState) {
          Object.assign(armState, message.armState)
          emit('arm_state', message.armState)
        }
        break
        
      case MessageType.MSG_CHASSIS_STATE:
        if (message.chassisState) {
          Object.assign(chassisState, message.chassisState)
          emit('chassis_state', message.chassisState)
        }
        break
        
      case MessageType.MSG_GRIPPER_STATE:
        if (message.gripperState) {
          const gs = message.gripperState
          if (gs.gripperId === 'left') {
            Object.assign(leftGripperState, gs)
          } else if (gs.gripperId === 'right') {
            Object.assign(rightGripperState, gs)
          }
          emit('gripper_state', gs)
        }
        break
        
      case MessageType.MSG_VR_SYSTEM_STATE:
        if (message.vrSystemState) {
          Object.assign(vrSystemState, message.vrSystemState)
          emit('vr_system_state', message.vrSystemState)
        }
        break
        
      case MessageType.MSG_TASK_STATE:
        if (message.taskState) {
          Object.assign(taskState, message.taskState)
          emit('task_state', message.taskState)
        }
        break
        
      case MessageType.MSG_ACTUATOR_STATE:
        if (message.actuatorState) {
          const as = message.actuatorState
          switch (as.actuatorId) {
            case 'lift':
              Object.assign(liftState, as)
              break
            case 'waist':
              Object.assign(waistState, as)
              break
            case 'head_pan':
              Object.assign(headPanState, as)
              break
            case 'head_tilt':
              Object.assign(headTiltState, as)
              break
          }
          emit('actuator_state', as)
        }
        break
        
      case MessageType.MSG_ERROR:
        if (message.error) {
          console.error('[DataPlane] 收到错误:', message.error)
          lastError.value = message.error.message || '未知错误'
          emit('error', message.error)
        }
        break
        
      case MessageType.MSG_MODE_CHANGED:
        if (message.modeChanged) {
          emit('mode_changed', message.modeChanged)
        }
        break
        
      case MessageType.MSG_CONTROL_CHANGED:
        if (message.controlChanged) {
          emit('control_changed', message.controlChanged)
        }
        break
        
      case MessageType.MSG_EMERGENCY_STOP:
        if (message.emergencyStop) {
          console.warn('[DataPlane] 紧急停止:', message.emergencyStop)
          emit('emergency_stop', message.emergencyStop)
        }
        break
        
      case MessageType.MSG_HEARTBEAT_ACK:
        // 心跳确认，不处理
        break
        
      default:
        console.log('[DataPlane] 未知消息类型:', message.type)
    }
  }
  
  function handleAuthResponse(message: qyh.dataplane.WebSocketMessage) {
    if (authTimeoutTimer) {
      clearTimeout(authTimeoutTimer)
      authTimeoutTimer = null
    }
    
    const resp = message.authResponse
    if (!resp) return
    
    if (resp.success && resp.session) {
      console.log('[DataPlane] 认证成功:', resp.session.user?.username)
      sessionId.value = resp.session.sessionId || ''
      connectionState.value = 'connected'
      
      // 开始心跳
      startHeartbeat()
      
      emit('authenticated', resp.session)
    } else {
      console.error('[DataPlane] 认证失败:', resp.error?.message)
      connectionState.value = 'error'
      lastError.value = resp.error?.message || '认证失败'
      disconnect()
    }
  }
  
  function handleError(event: Event) {
    console.error('[DataPlane] WebSocket 错误:', event)
    lastError.value = 'WebSocket 连接错误'
  }
  
  function handleClose(event: CloseEvent) {
    console.log(`[DataPlane] WebSocket 已断开: ${event.code} ${event.reason}`)
    
    clearTimers()
    connectionState.value = 'disconnected'
    sessionId.value = ''
    
    scheduleReconnect()
  }
  
  function startHeartbeat() {
    if (heartbeatTimer) {
      clearInterval(heartbeatTimer)
    }
    
    heartbeatTimer = window.setInterval(() => {
      sendHeartbeat()
    }, HEARTBEAT_INTERVAL)
  }
  
  function scheduleReconnect() {
    if (reconnectTimer) return
    if (reconnectAttempts.value >= MAX_RECONNECT_ATTEMPTS) {
      console.error('[DataPlane] 达到最大重连次数，停止重连')
      return
    }
    
    reconnectAttempts.value++
    const delay = RECONNECT_DELAY * Math.min(reconnectAttempts.value, 5)
    
    console.log(`[DataPlane] ${delay}ms 后尝试重连 (${reconnectAttempts.value}/${MAX_RECONNECT_ATTEMPTS})`)
    
    reconnectTimer = window.setTimeout(() => {
      reconnectTimer = null
      connect()
    }, delay)
  }
  
  function clearTimers() {
    if (heartbeatTimer) {
      clearInterval(heartbeatTimer)
      heartbeatTimer = null
    }
    if (reconnectTimer) {
      clearTimeout(reconnectTimer)
      reconnectTimer = null
    }
    if (authTimeoutTimer) {
      clearTimeout(authTimeoutTimer)
      authTimeoutTimer = null
    }
  }
  
  // 生命周期
  onMounted(() => {
    // 默认不自动连接，由组件主动调用 connect()
  })
  
  onUnmounted(() => {
    disconnect()
  })
  
  return {
    // 状态
    connectionState,
    sessionId,
    isConnected,
    isAuthenticated,
    lastError,
    subscribedTopics,
    reconnectAttempts,
    
    // 实时数据
    robotState,
    jointState,
    armState,
    chassisState,
    vrSystemState,
    taskState,
    liftState,
    waistState,
    headPanState,
    headTiltState,
    leftGripperState,
    rightGripperState,
    
    // 方法
    connect,
    disconnect,
    subscribe,
    unsubscribe,
    sendChassisVelocity,
    sendJointCommand,
    sendGripperCommand,
    sendEmergencyStop,
    sendLiftCommand,
    sendHeadCommand,
    sendWaistCommand,
    sendArmMove,
    sendArmJog,
    on,
  }
}

// 单例模式
let dataPlaneInstance: ReturnType<typeof useDataPlane> | null = null

/**
 * 获取全局 Data Plane 实例 (单例)
 */
export function useDataPlaneSingleton() {
  if (!dataPlaneInstance) {
    dataPlaneInstance = useDataPlane()
  }
  return dataPlaneInstance
}

export default useDataPlane
