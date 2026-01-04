/**
 * 底盘控制 API 模块
 */
import apiClient from './client'

// ==================== 类型定义 ====================

export interface ChassisStatus {
  connected: boolean
  system_status: number
  system_status_text: string
  location_status: number
  location_status_text: string
  operation_status: number
  operation_status_text: string
  scheduling_mode: number
  scheduling_mode_text: string
  motion_status: number
  motion_status_text: string
  current_station_id: number
  last_error_code: number
  current_system_volume: number
  ip_address: string
  current_map_name: string
  pose: {
    x: number
    y: number
    yaw: number
    confidence: number
  }
  velocity: {
    linear_x: number
    linear_y: number
    angular_z: number
  }
  battery: {
    percentage: number
    voltage: number
    current: number
    temperature: number
    estimated_time: number
    status: number
    status_text: string
    cycle_count: number
    nominal_capacity: number
  }
  statistics: {
    total_distance: number
    total_boot_time: number
    total_boot_count: number
  }
  flags: {
    is_emergency_stopped: boolean
    is_emergency_recoverable: boolean
    is_brake_released: boolean
    is_charging: boolean
    is_low_power_mode: boolean
    obstacle_slowdown: boolean
    obstacle_paused: boolean
    can_run_motion_task: boolean
    is_auto_mode: boolean
    is_loaded: boolean
    has_wifi: boolean
  }
  obstacle_sensors: {
    main_radar: boolean
    aux_radar: boolean
    depth_camera1: boolean
    depth_camera2: boolean
    depth_camera3: boolean
    depth_camera4: boolean
    obstacle_radar1: boolean
    obstacle_radar2: boolean
    obstacle_radar3: boolean
    obstacle_radar4: boolean
  }
  mission: {
    id: number
    status: number
    status_text: string
    result: number
    result_text: string
    error_code: number
  }
  move_task: {
    no: number
    status: number
    status_text: string
    result: number
    result_text: string
    start_station: number
    dest_station: number
    path_no: number
  }
}

export interface VelocityCommand {
  linear_x: number
  linear_y: number
  angular_z: number
}

// 地图数据类型定义
export interface MapMeta {
  'zero_offset.x': number
  'zero_offset.y': number
  'size.x': number
  'size.y': number
  resolution: number  // cm/pixel
  length_unit: string
  angle_unit: string
  version?: string
}

export interface MapNode {
  id: number
  x: number  // mm
  y: number  // mm
  yaw: number  // rad
  desc?: string
}

export interface MapEdge {
  id: number
  type: number  // 1=直线, 3=贝塞尔曲线
  sx: number
  sy: number
  ex: number
  ey: number
  cx?: number  // 贝塞尔控制点1
  cy?: number
  dx?: number  // 贝塞尔控制点2
  dy?: number
  s_node: number
  e_node: number
  cost?: number
}

export interface MapStation {
  id: number
  name: string
  type?: string
  'pos.x'?: number
  'pos.y'?: number
  'pos.yaw'?: number
  x?: number
  y?: number
  yaw?: number
  desc?: string
}

export interface MapData {
  success: boolean
  map_name: string
  meta: MapMeta
  nodes: MapNode[]
  edges: MapEdge[]
  stations: MapStation[]
  has_image: boolean
  image_url: string | null
}

export interface NavigationTarget {
  x: number
  y: number
  yaw: number
  is_localization?: boolean
}

export interface SiteTarget {
  site_id: number
  is_localization?: boolean
}

export interface ForceLocalizeRequest {
  x: number
  y: number
  yaw: number
}

export interface ManualControlCommand {
  forward: boolean
  backward: boolean
  left: boolean
  right: boolean
  rotate_left: boolean
  rotate_right: boolean
}

export interface Station {
  id: number
  name: string
  x: number
  y: number
  yaw: number
}

// ==================== API 函数 ====================

export const chassisApi = {
  // 状态获取
  async getStatus(): Promise<ChassisStatus> {
    return apiClient.get('/api/v1/chassis/status')
  },

  async getNavigationStatus(): Promise<any> {
    return apiClient.get('/api/v1/chassis/navigation_status')
  },

  async getStations(): Promise<{ stations: Station[] }> {
    return apiClient.get('/api/v1/chassis/stations')
  },

  // 速度控制
  async sendVelocity(cmd: VelocityCommand): Promise<any> {
    return apiClient.post('/api/v1/chassis/velocity', cmd)
  },

  async stop(): Promise<any> {
    return apiClient.post('/api/v1/chassis/stop')
  },

  // 手动控制
  async startManualControl(): Promise<any> {
    return apiClient.post('/api/v1/chassis/manual/start')
  },

  async stopManualControl(): Promise<any> {
    return apiClient.post('/api/v1/chassis/manual/stop')
  },

  async sendManualCommand(cmd: ManualControlCommand): Promise<any> {
    return apiClient.post('/api/v1/chassis/manual/command', cmd)
  },

  // 移动控制
  async pauseMove(): Promise<any> {
    return apiClient.post('/api/v1/chassis/pause_move')
  },

  async resumeMove(): Promise<any> {
    return apiClient.post('/api/v1/chassis/resume_move')
  },

  async stopMove(): Promise<any> {
    return apiClient.post('/api/v1/chassis/stop_move')
  },

  async stopLocalization(): Promise<any> {
    return apiClient.post('/api/v1/chassis/stop_localization')
  },

  // 急停控制
  async emergencyStop(): Promise<any> {
    return apiClient.post('/api/v1/chassis/emergency_stop')
  },

  async releaseEmergencyStop(): Promise<any> {
    return apiClient.post('/api/v1/chassis/release_emergency_stop')
  },

  // 充电控制
  async startCharging(): Promise<any> {
    return apiClient.post('/api/v1/chassis/start_charging')
  },

  async stopCharging(): Promise<any> {
    return apiClient.post('/api/v1/chassis/stop_charging')
  },

  // 功耗控制
  async enterLowPower(): Promise<any> {
    return apiClient.post('/api/v1/chassis/enter_low_power')
  },

  async exitLowPower(): Promise<any> {
    return apiClient.post('/api/v1/chassis/exit_low_power')
  },

  // 系统控制
  async systemReset(): Promise<any> {
    return apiClient.post('/api/v1/chassis/system_reset')
  },

  // 任务控制
  async pauseMission(): Promise<any> {
    return apiClient.post('/api/v1/chassis/mission/pause')
  },

  async resumeMission(): Promise<any> {
    return apiClient.post('/api/v1/chassis/mission/resume')
  },

  async cancelMission(): Promise<any> {
    return apiClient.post('/api/v1/chassis/mission/cancel')
  },

  // 导航控制
  async navigateToCoordinate(target: NavigationTarget): Promise<any> {
    return apiClient.post('/api/v1/chassis/navigate/coordinate', target)
  },

  async navigateToSite(target: SiteTarget): Promise<any> {
    return apiClient.post('/api/v1/chassis/navigate/site', target)
  },

  async navigateToSiteSimple(siteId: number): Promise<any> {
    return apiClient.post('/api/v1/chassis/navigate/site_simple', { site_id: siteId })
  },

  async navigateToSiteWithTask(siteId: number, taskId: number): Promise<any> {
    return apiClient.post('/api/v1/chassis/navigate/site_with_task', { site_id: siteId, task_id: taskId })
  },

  async forceLocalize(req: ForceLocalizeRequest): Promise<any> {
    return apiClient.post('/api/v1/chassis/force_localize', req)
  },

  // 参数设置
  async setSpeedLevel(req: { level: number }): Promise<any> {
    return apiClient.post('/api/v1/chassis/set_speed_level', req)
  },

  async setObstacleStrategy(req: { strategy: number }): Promise<any> {
    return apiClient.post('/api/v1/chassis/set_obstacle_strategy', req)
  },

  async setCurrentSite(req: { site_id: number }): Promise<any> {
    return apiClient.post('/api/v1/chassis/set_current_site', req)
  },

  async setVolume(req: { volume: number }): Promise<any> {
    return apiClient.post('/api/v1/chassis/set_volume', req)
  },

  async setMap(req: { map_name: string }): Promise<any> {
    return apiClient.post('/api/v1/chassis/set_map', req)
  },

  // 地图同步
  async syncMaps(): Promise<{
    success: boolean
    message: string
    current_map: string
    maps: string[]
    output: string
  }> {
    return apiClient.post('/api/v1/chassis/sync_maps')
  },

  // 获取地图数据 (用于3D渲染)
  async getMapData(): Promise<MapData> {
    return apiClient.get('/api/v1/chassis/map_data')
  },

  // 获取地图列表
  async getMapsList(): Promise<{ maps: string[]; current_map: string }> {
    return apiClient.get('/api/v1/chassis/maps')
  },

  // 获取地图图片URL
  getMapImageUrl(mapName: string): string {
    // 动态获取 API 地址，支持远程访问
    const protocol = window.location.protocol
    const hostname = window.location.hostname
    const baseUrl = import.meta.env.VITE_API_BASE_URL || `${protocol}//${hostname}:8000`
    return `${baseUrl}/api/v1/chassis/map_image/${mapName}`
  }
}

export default chassisApi
