/**
 * 升降控制 API 模块
 */
import apiClient from './client'

// ==================== 类型定义 ====================

export interface LiftState {
  connected: boolean
  enabled: boolean
  current_position: number
  current_speed: number
  position_reached: boolean
  alarm: boolean
  shutdown_requested: boolean  // 硬件关机请求
}

export interface LiftControlResponse {
  success: boolean
  message: string
}

export interface LiftControlRequest {
  command: number  // 1=使能, 2=去使能, 3=设置速度, 4=去位置, 5=上升, 6=下降, 7=复位, 8=停止, 9=关机
  value?: number
  hold?: boolean
}

// 命令常量
export const LiftCommand = {
  ENABLE: 1,
  DISABLE: 2,
  SET_SPEED: 3,
  GO_POSITION: 4,
  MOVE_UP: 5,
  MOVE_DOWN: 6,
  RESET_ALARM: 7,
  STOP: 8,
  SHUTDOWN: 9
}

// ==================== API 方法 ====================

export const liftApi = {
  /**
   * 获取升降状态
   */
  async getState(): Promise<LiftState> {
    return apiClient.get('/api/v1/lift/state')
  },

  /**
   * 发送升降控制命令
   */
  async control(request: LiftControlRequest): Promise<LiftControlResponse> {
    return apiClient.post('/api/v1/lift/control', request)
  },

  /**
   * 使能升降
   */
  async enable(): Promise<LiftControlResponse> {
    return this.control({ command: LiftCommand.ENABLE })
  },

  /**
   * 去使能升降
   */
  async disable(): Promise<LiftControlResponse> {
    return this.control({ command: LiftCommand.DISABLE })
  },

  /**
   * 设置速度
   */
  async setSpeed(speed: number): Promise<LiftControlResponse> {
    return this.control({ command: LiftCommand.SET_SPEED, value: speed })
  },

  /**
   * 移动到指定位置
   */
  async goToPosition(position: number): Promise<LiftControlResponse> {
    return this.control({ command: LiftCommand.GO_POSITION, value: position })
  },

  /**
   * 手动上升
   */
  async moveUp(hold: boolean): Promise<LiftControlResponse> {
    return this.control({ command: LiftCommand.MOVE_UP, hold })
  },

  /**
   * 手动下降
   */
  async moveDown(hold: boolean): Promise<LiftControlResponse> {
    return this.control({ command: LiftCommand.MOVE_DOWN, hold })
  },

  /**
   * 停止运动
   */
  async stop(): Promise<LiftControlResponse> {
    return this.control({ command: LiftCommand.STOP })
  },

  /**
   * 复位报警
   */
  async resetAlarm(): Promise<LiftControlResponse> {
    return this.control({ command: LiftCommand.RESET_ALARM })
  },

  /**
   * 系统关机
   * 通过PLC实现：写关机线圈 -> 系统shutdown -> PLC断电
   */
  async systemShutdown(): Promise<LiftControlResponse> {
    return apiClient.post('/api/v1/system/shutdown')
  }
}

export default liftApi
