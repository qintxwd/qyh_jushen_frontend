<template>
  <div class="chassis-panel">
    <!-- 标签页导航 -->
    <el-tabs v-model="activeTab" type="card" class="chassis-tabs">
      <!-- ==================== 状态标签页 ==================== -->
      <el-tab-pane label="状态" name="status">
        <!-- 系统状态概览 -->
        <div class="panel-section">
          <h3 class="section-title">系统状态</h3>
          <div class="status-grid">
            <div class="status-item">
              <span class="status-label">系统</span>
              <el-tag :type="getStatusType(status.system_status)" size="small">
                {{ status.system_status_text }}
              </el-tag>
            </div>
            <div class="status-item">
              <span class="status-label">定位</span>
              <el-tag :type="getLocationStatusType(status.location_status)" size="small">
                {{ status.location_status_text }}
              </el-tag>
            </div>
            <div class="status-item">
              <span class="status-label">操作</span>
              <el-tag :type="status.operation_status === 2 ? 'warning' : 'success'" size="small">
                {{ status.operation_status_text }}
              </el-tag>
            </div>
            <div class="status-item">
              <span class="status-label">调度</span>
              <el-tag :type="status.scheduling_mode === 2 ? 'success' : 'warning'" size="small">
                {{ status.scheduling_mode_text }}
              </el-tag>
            </div>
            <div class="status-item">
              <span class="status-label">运动</span>
              <el-tag :type="status.motion_status === 1 ? '' : 'success'" size="small">
                {{ status.motion_status_text }}
              </el-tag>
            </div>
          </div>
        </div>

        <el-divider />

        <!-- 位姿信息 -->
        <div class="panel-section">
          <h3 class="section-title">位姿信息</h3>
          <div class="pose-info">
            <div class="pose-item">
              <span class="pose-label">X</span>
              <span class="pose-value">{{ status.pose?.x?.toFixed(3) ?? '0.000' }} m</span>
            </div>
            <div class="pose-item">
              <span class="pose-label">Y</span>
              <span class="pose-value">{{ status.pose?.y?.toFixed(3) ?? '0.000' }} m</span>
            </div>
            <div class="pose-item">
              <span class="pose-label">航向</span>
              <span class="pose-value">{{ ((status.pose?.yaw ?? 0) * 180 / Math.PI).toFixed(1) }}°</span>
            </div>
            <div class="pose-item">
              <span class="pose-label">置信度</span>
              <span class="pose-value" :class="getConfidenceClass(status.pose?.confidence)">
                {{ ((status.pose?.confidence ?? 0) * 100).toFixed(1) }}%
              </span>
            </div>
          </div>
          <div class="velocity-info">
            <div class="vel-row">
              <span class="vel-label">速度</span>
              <span class="vel-value">
                {{ status.velocity?.linear_x?.toFixed(3) ?? '0.000' }} m/s | 
                {{ ((status.velocity?.angular_z ?? 0) * 180 / Math.PI).toFixed(1) }}°/s
              </span>
            </div>
          </div>
        </div>

        <el-divider />

        <!-- 电池信息 -->
        <div class="panel-section">
          <h3 class="section-title">电池信息</h3>
          <div class="battery-main">
            <div class="battery-visual">
              <div class="battery-bar" :style="{ width: status.battery?.percentage + '%' }"></div>
              <span class="battery-text" :class="getBatteryClass(status.battery?.percentage)">
                {{ status.battery?.percentage ?? 0 }}%
              </span>
            </div>
            <el-tag :type="getBatteryStatusType(status.battery?.status)" size="small">
              {{ status.battery?.status_text }}
            </el-tag>
          </div>
          <div class="battery-details">
            <div class="battery-item">
              <span class="bat-label">电压</span>
              <span class="bat-value">{{ (status.battery?.voltage ?? 0).toFixed(1) }} V</span>
            </div>
            <div class="battery-item">
              <span class="bat-label">电流</span>
              <span class="bat-value" :class="{ 'charging': (status.battery?.current ?? 0) > 0 }">
                {{ (status.battery?.current ?? 0).toFixed(2) }} A
              </span>
            </div>
            <div class="battery-item">
              <span class="bat-label">温度</span>
              <span class="bat-value" :class="getTempClass(status.battery?.temperature)">
                {{ status.battery?.temperature ?? 0 }}°C
              </span>
            </div>
            <div class="battery-item">
              <span class="bat-label">剩余时间</span>
              <span class="bat-value">{{ formatTime(status.battery?.estimated_time) }}</span>
            </div>
            <div class="battery-item">
              <span class="bat-label">循环次数</span>
              <span class="bat-value">{{ status.battery?.cycle_count ?? 0 }}</span>
            </div>
          </div>
        </div>

        <el-divider />

        <!-- 统计信息 -->
        <div class="panel-section">
          <h3 class="section-title">统计信息</h3>
          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-label">总里程</span>
              <span class="stat-value">{{ formatDistance(status.statistics?.total_distance) }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">运行时间</span>
              <span class="stat-value">{{ formatDuration(status.statistics?.total_boot_time) }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">启动次数</span>
              <span class="stat-value">{{ status.statistics?.total_boot_count ?? 0 }}</span>
            </div>
          </div>
        </div>

        <el-divider />

        <!-- 状态标志 -->
        <div class="panel-section">
          <h3 class="section-title">状态标志</h3>
          <div class="flags-grid">
            <div class="flag-item" :class="{ active: status.flags?.is_emergency_stopped }">
              <SvgIcon name="emergency-stop" :size="16" />
              <span>急停</span>
            </div>
            <div class="flag-item" :class="{ active: status.flags?.is_brake_released }">
              <SvgIcon name="unlock" :size="16" />
              <span>抱闸释放</span>
            </div>
            <div class="flag-item" :class="{ active: status.flags?.is_charging, charging: status.flags?.is_charging }">
              <SvgIcon name="lightning" :size="16" />
              <span>充电中</span>
            </div>
            <div class="flag-item" :class="{ active: status.flags?.is_auto_mode }">
              <SvgIcon name="setting" :size="16" />
              <span>自动模式</span>
            </div>
            <div class="flag-item" :class="{ active: status.flags?.is_loaded }">
              <SvgIcon name="box" :size="16" />
              <span>有载荷</span>
            </div>
            <div class="flag-item" :class="{ active: status.flags?.has_wifi, wifi: status.flags?.has_wifi }">
              <SvgIcon name="connection" :size="16" />
              <span>WiFi</span>
            </div>
            <div class="flag-item" :class="{ active: status.flags?.obstacle_slowdown, warning: status.flags?.obstacle_slowdown }">
              <SvgIcon name="slow-obstacle" :size="16" />
              <span>减速避障</span>
            </div>
            <div class="flag-item" :class="{ active: status.flags?.obstacle_paused, danger: status.flags?.obstacle_paused }">
              <SvgIcon name="pause-obstacle" :size="16" />
              <span>障碍暂停</span>
            </div>
          </div>
        </div>

        <el-divider />

        <!-- 障碍传感器 -->
        <div class="panel-section">
          <h3 class="section-title">障碍传感器</h3>
          <div class="sensor-grid">
            <div class="sensor-item" :class="{ triggered: status.obstacle_sensors?.main_radar }">
              主雷达
            </div>
            <div class="sensor-item" :class="{ triggered: status.obstacle_sensors?.aux_radar }">
              辅雷达
            </div>
            <div class="sensor-item" :class="{ triggered: status.obstacle_sensors?.depth_camera1 }">
              深度相机1
            </div>
            <div class="sensor-item" :class="{ triggered: status.obstacle_sensors?.depth_camera2 }">
              深度相机2
            </div>
            <div class="sensor-item" :class="{ triggered: status.obstacle_sensors?.obstacle_radar1 }">
              避障雷达1
            </div>
            <div class="sensor-item" :class="{ triggered: status.obstacle_sensors?.obstacle_radar2 }">
              避障雷达2
            </div>
          </div>
        </div>

        <el-divider />

        <!-- 任务信息 -->
        <div class="panel-section">
          <h3 class="section-title">任务信息</h3>
          <div class="mission-info">
            <div class="mission-row">
              <span class="mission-label">任务ID</span>
              <span class="mission-value">{{ status.mission?.id ?? 0 }}</span>
            </div>
            <div class="mission-row">
              <span class="mission-label">状态</span>
              <el-tag :type="getMissionStatusType(status.mission?.status)" size="small">
                {{ status.mission?.status_text }}
              </el-tag>
            </div>
            <div class="mission-row">
              <span class="mission-label">结果</span>
              <el-tag :type="getMissionResultType(status.mission?.result)" size="small">
                {{ status.mission?.result_text }}
              </el-tag>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <!-- ==================== 控制标签页 ==================== -->
      <el-tab-pane label="控制" name="control">
        <!-- 紧急控制 -->
        <div class="panel-section">
          <h3 class="section-title danger-title">紧急控制</h3>
          <div class="emergency-buttons">
            <el-button 
              type="danger" 
              size="large"
              :disabled="status.flags?.is_emergency_stopped"
              @click="emergencyStop"
            >
              <SvgIcon name="emergency-stop" :size="16" />
              紧急停止
            </el-button>
            <el-button 
              type="warning"
              size="large"
              :disabled="!status.flags?.is_emergency_stopped || !status.flags?.is_emergency_recoverable"
              @click="releaseEmergencyStop"
            >
              <SvgIcon name="unlock" :size="16" />
              解除急停
            </el-button>
          </div>
        </div>

        <el-divider />

        <!-- 移动控制 -->
        <div class="panel-section">
          <h3 class="section-title">移动控制</h3>
          <div class="move-buttons">
            <el-button @click="pauseMove" :loading="moveLoading.pause">
              <SvgIcon name="videopause" :size="16" />
              暂停移动
            </el-button>
            <el-button type="primary" @click="resumeMove" :loading="moveLoading.resume">
              <SvgIcon name="videoplay" :size="16" />
              恢复移动
            </el-button>
            <el-button type="danger" @click="stopMove" :loading="moveLoading.stop">
              <SvgIcon name="switchbutton" :size="16" />
              停止移动
            </el-button>
          </div>
        </div>

        <el-divider />

        <!-- 充电控制 -->
        <div class="panel-section">
          <h3 class="section-title">充电控制</h3>
          <div class="charge-buttons">
            <el-button 
              type="success" 
              @click="startCharging"
              :disabled="status.flags?.is_charging"
              :loading="chargeLoading.start"
            >
              <SvgIcon name="lightning" :size="16" />
              开始充电
            </el-button>
            <el-button 
              type="warning" 
              @click="stopCharging"
              :disabled="!status.flags?.is_charging"
              :loading="chargeLoading.stop"
            >
              <SvgIcon name="switchbutton" :size="16" />
              停止充电
            </el-button>
          </div>
        </div>

        <el-divider />

        <!-- 功耗控制 -->
        <div class="panel-section">
          <h3 class="section-title">功耗控制</h3>
          <div class="power-buttons">
            <el-button 
              @click="enterLowPower"
              :disabled="status.flags?.is_low_power_mode"
              :loading="powerLoading.enter"
            >
              <SvgIcon name="moon" :size="16" />
              进入低功耗
            </el-button>
            <el-button 
              type="primary"
              @click="exitLowPower"
              :disabled="!status.flags?.is_low_power_mode"
              :loading="powerLoading.exit"
            >
              <SvgIcon name="sunny" :size="16" />
              退出低功耗
            </el-button>
          </div>
        </div>

        <el-divider />

        <!-- 任务控制 -->
        <div class="panel-section">
          <h3 class="section-title">任务控制</h3>
          <div class="mission-buttons">
            <el-button @click="pauseMission" :loading="missionLoading.pause">
              暂停任务
            </el-button>
            <el-button type="primary" @click="resumeMission" :loading="missionLoading.resume">
              恢复任务
            </el-button>
            <el-button type="danger" @click="cancelMission" :loading="missionLoading.cancel">
              取消任务
            </el-button>
          </div>
        </div>

        <el-divider />

        <!-- 系统控制 -->
        <div class="panel-section">
          <h3 class="section-title">系统控制</h3>
          <div class="system-buttons">
            <el-button type="warning" @click="systemReset" :loading="systemLoading">
              <SvgIcon name="refreshright" :size="16" />
              系统复位
            </el-button>
            <el-button @click="stopLocalization" :loading="locLoading">
              停止定位
            </el-button>
          </div>
        </div>
      </el-tab-pane>

      <!-- ==================== 导航标签页 ==================== -->
      <el-tab-pane label="导航" name="navigation">
        <!-- 坐标导航 -->
        <div class="panel-section">
          <h3 class="section-title">坐标导航</h3>
          <div class="nav-inputs">
            <div class="nav-input-item">
              <span class="nav-label">X (m)</span>
              <el-input-number v-model="navTarget.x" :step="0.1" size="small" />
            </div>
            <div class="nav-input-item">
              <span class="nav-label">Y (m)</span>
              <el-input-number v-model="navTarget.y" :step="0.1" size="small" />
            </div>
            <div class="nav-input-item">
              <span class="nav-label">航向 (°)</span>
              <el-input-number v-model="navTarget.yaw" :step="5" :min="-180" :max="180" size="small" />
            </div>
          </div>
          <div class="nav-buttons">
            <el-button type="primary" @click="navigateToCoord(false)" :loading="navLoading">
              <SvgIcon name="navigate-target" :size="16" />
              导航到目标
            </el-button>
            <el-button @click="navigateToCoord(true)" :loading="localizingLoading">
              <SvgIcon name="aim" :size="16" />
              定位到坐标
            </el-button>
          </div>
        </div>

        <el-divider />

        <!-- 强制定位 -->
        <div class="panel-section">
          <h3 class="section-title">强制定位</h3>
          <div class="force-loc-inputs">
            <div class="nav-input-item">
              <span class="nav-label">X (m)</span>
              <el-input-number v-model="forceLocTarget.x" :step="0.1" size="small" />
            </div>
            <div class="nav-input-item">
              <span class="nav-label">Y (m)</span>
              <el-input-number v-model="forceLocTarget.y" :step="0.1" size="small" />
            </div>
            <div class="nav-input-item">
              <span class="nav-label">航向 (°)</span>
              <el-input-number v-model="forceLocTarget.yaw" :step="5" :min="-180" :max="180" size="small" />
            </div>
          </div>
          <el-button type="warning" style="width: 100%; margin-top: 10px" @click="forceLocalize" :loading="forceLocLoading">
            <SvgIcon name="aim" :size="16" />
            强制定位
          </el-button>
        </div>

        <el-divider />

        <!-- 预设站点 -->
        <div class="panel-section">
          <h3 class="section-title">地图站点导航</h3>
          <div class="station-nav-container">
            <!-- 站点列表显示 -->
            <div class="station-list-display">
              <!-- 搜索框 -->
              <div class="station-search">
                <el-input 
                  v-model="stationSearchText" 
                  placeholder="搜索站点名称或ID..." 
                  size="small"
                  clearable
                >
                  <template #prefix>
                    <SvgIcon name="search" :size="16" />
                  </template>
                </el-input>
              </div>
              
              <!-- 列表标题 -->
              <div class="station-list-title">
                <span>地图站点列表（{{ filteredStations.length }}/{{ stations.length }}）</span>
                <el-tag v-if="selectedStationId" type="primary" size="small">已选择</el-tag>
              </div>
              
              <!-- 站点列表 -->
              <div class="station-list">
                <div 
                  v-for="station in filteredStations" 
                  :key="station.id"
                  class="station-item"
                  :class="{ selected: selectedStationId === station.id }"
                  @click="selectedStationId = station.id"
                >
                  <SvgIcon name="locationfilled" :size="16" />
                  <span class="station-name">{{ station.name }}</span>
                  <span class="station-id">ID: {{ station.id }}</span>
                  <span class="station-coord">({{ (station.x / 1000).toFixed(2) }}, {{ (station.y / 1000).toFixed(2) }}) m</span>
                </div>
                <div v-if="filteredStations.length === 0" class="station-empty">
                  <SvgIcon name="infofilled" :size="16" />
                  <span>{{ stationSearchText ? '未找到匹配的站点' : '暂无站点数据' }}</span>
                </div>
              </div>
            </div>
            
            <!-- 任务ID输入（可选） -->
            <div class="nav-input-item">
              <span class="nav-label">任务ID（可选）</span>
              <el-input-number 
                v-model="taskId" 
                :min="0" 
                :max="65535" 
                size="small" 
                style="width: 100%"
                placeholder="不设置则使用默认"
              />
            </div>
            
            <!-- 导航按钮 -->
            <div class="station-nav-buttons">
              <el-button 
                type="primary" 
                style="flex: 1"
                :disabled="!selectedStationId"
                :loading="stationNavLoading"
                @click="navigateToSelectedStation"
              >
                <SvgIcon name="position" :size="16" />
                导航到站点
              </el-button>
            </div>
          </div>
        </div>

        <el-divider />

        <!-- 导航参数 -->
        <div class="panel-section">
          <h3 class="section-title">导航参数</h3>
          <div class="nav-params">
            <div class="param-item">
              <span class="param-label">速度级别</span>
              <div class="slider-row">
                <el-slider 
                  v-model="navParams.speedLevel" 
                  :min="1" 
                  :max="100" 
                  :step="1"
                  size="small"
                  class="param-slider"
                  @change="setSpeedLevel"
                />
                <span class="slider-value">{{ navParams.speedLevel }}</span>
              </div>
            </div>
            <div class="param-item">
              <span class="param-label">音量</span>
              <div class="slider-row">
                <el-slider 
                  v-model="navParams.volume" 
                  :min="0" 
                  :max="100" 
                  :step="1"
                  size="small"
                  class="param-slider"
                  @change="setVolume"
                />
                <span class="slider-value">{{ navParams.volume }}</span>
              </div>
            </div>
            <div class="param-item">
              <span class="param-label">避障策略</span>
              <el-select v-model="navParams.obstacleStrategy" size="small" @change="setObstacleStrategy">
                <el-option :value="0" label="停止避障" />
                <el-option :value="1" label="绕行避障" />
                <el-option :value="2" label="减速避障" />
              </el-select>
            </div>
          </div>
        </div>

        <el-divider />

        <!-- 地图信息 -->
        <div class="panel-section">
          <h3 class="section-title">地图</h3>
          <div class="map-info">
            <span class="map-label">当前地图:</span>
            <strong class="map-name">{{ status.current_map_name || '未知' }}</strong>
            <el-button 
              type="success" 
              size="small" 
              :loading="syncMapsLoading"
              @click="syncMaps"
            >
              <SvgIcon name="refresh" :size="16" />
              刷新地图
            </el-button>
          </div>
        </div>
      </el-tab-pane>

      <!-- ==================== 手动控制标签页 ==================== -->
      <el-tab-pane label="手动" name="manual">
        <!-- 手动模式开关 -->
        <div class="panel-section">
          <h3 class="section-title">手动控制模式</h3>
          <div class="manual-toggle">
            <el-switch 
              v-model="manualMode" 
              active-text="手动控制" 
              inactive-text="自动控制"
              active-color="#e6a23c"
              @change="toggleManualMode"
            />
            <el-tag v-if="manualMode" type="warning" size="small">
              使用方向键控制 (W/A/S/D 或 ↑/←/↓/→)
            </el-tag>
          </div>
        </div>

        <el-divider />

        <!-- 控制模式切换 -->
        <div class="panel-section">
          <h3 class="section-title">控制模式</h3>
          <div class="mode-switch">
            <el-radio-group v-model="controlMode" size="small">
              <el-radio-button value="coil">线圈模式</el-radio-button>
              <el-radio-button value="velocity">速度模式</el-radio-button>
            </el-radio-group>
          </div>
          <div class="mode-description">
            <span v-if="controlMode === 'coil'">固定速度，每次执行100ms</span>
            <span v-else>自定义速度，持续发送</span>
          </div>
        </div>

        <!-- 速度模式参数设置 -->
        <template v-if="controlMode === 'velocity'">
          <el-divider />
          <div class="panel-section">
            <h3 class="section-title">速度设置</h3>
            <div class="velocity-settings">
              <div class="setting-item">
                <span class="setting-label">线速度</span>
                <el-slider 
                  v-model="velocitySpeed" 
                  :min="0.1" 
                  :max="1.0" 
                  :step="0.05"
                  size="small"
                  :show-tooltip="false"
                />
                <span class="setting-value">{{ velocitySpeed.toFixed(2) }} m/s</span>
              </div>
              <div class="setting-item">
                <span class="setting-label">角速度</span>
                <el-slider 
                  v-model="angularSpeed" 
                  :min="0.1" 
                  :max="1.0" 
                  :step="0.05"
                  size="small"
                  :show-tooltip="false"
                />
                <span class="setting-value">{{ angularSpeed.toFixed(2) }} rad/s</span>
              </div>
            </div>
          </div>
        </template>

        <el-divider />

        <!-- 虚拟摇杆 -->
        <div class="panel-section">
          <h3 class="section-title">运动控制</h3>
          <div class="manual-control-grid">
            <!-- 方向按钮: W前进 S后退 A左旋 D右旋 -->
            <div class="direction-pad">
              <div class="pad-row">
                <div class="pad-empty"></div>
                <el-button 
                  class="direction-btn"
                  :type="pressedKeys.forward ? 'primary' : ''"
                  @mousedown="startManualMove('forward')"
                  @mouseup="stopManualMove('forward')"
                  @mouseleave="stopManualMove('forward')"
                >
                  <SvgIcon name="arrowup" :size="16" />
                  <span class="key-hint">W</span>
                </el-button>
                <div class="pad-empty"></div>
              </div>
              <div class="pad-row">
                <el-button 
                  class="direction-btn"
                  :type="pressedKeys.rotate_left ? 'primary' : ''"
                  @mousedown="startManualMove('rotate_left')"
                  @mouseup="stopManualMove('rotate_left')"
                  @mouseleave="stopManualMove('rotate_left')"
                >
                  <SvgIcon name="refreshleft" :size="16" />
                  <span class="key-hint">A</span>
                </el-button>
                <el-button 
                  class="direction-btn"
                  :type="pressedKeys.backward ? 'primary' : ''"
                  @mousedown="startManualMove('backward')"
                  @mouseup="stopManualMove('backward')"
                  @mouseleave="stopManualMove('backward')"
                >
                  <SvgIcon name="arrowdown" :size="16" />
                  <span class="key-hint">S</span>
                </el-button>
                <el-button 
                  class="direction-btn"
                  :type="pressedKeys.rotate_right ? 'primary' : ''"
                  @mousedown="startManualMove('rotate_right')"
                  @mouseup="stopManualMove('rotate_right')"
                  @mouseleave="stopManualMove('rotate_right')"
                >
                  <SvgIcon name="refreshright" :size="16" />
                  <span class="key-hint">D</span>
                </el-button>
              </div>
            </div>
          </div>
          <div class="manual-hint">
            <span>W/S/↑/↓: 前进/后退 | A/D/←/→: 左转/右转 | 支持组合按键</span>
          </div>
        </div>

        <!-- 紧急停止按钮 -->
        <el-divider />
        <div class="panel-section">
          <el-button type="danger" size="large" style="width: 100%" @click="stopChassis">
            <SvgIcon name="emergency-stop" :size="16" />
            紧急停止
          </el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import { chassisApi } from '@/api/chassis'
import { eventBus, EVENTS } from '@/utils/eventBus'

// ==================== 状态数据 ====================
const activeTab = ref('status')

const status = reactive({
  connected: false,
  system_status: 0,
  system_status_text: '未知',
  location_status: 0,
  location_status_text: '未知',
  operation_status: 0,
  operation_status_text: '未知',
  scheduling_mode: 0,
  scheduling_mode_text: '未知',
  motion_status: 0,
  motion_status_text: '未知',
  current_station_id: 0,
  last_error_code: 0,
  current_system_volume: 50,
  ip_address: '',
  current_map_name: '',
  pose: { x: 0, y: 0, yaw: 0, confidence: 0 },
  velocity: { linear_x: 0, linear_y: 0, angular_z: 0 },
  battery: {
    percentage: 0,
    voltage: 0,
    current: 0,
    temperature: 0,
    estimated_time: 0,
    status: 0,
    status_text: '未知',
    cycle_count: 0,
    nominal_capacity: 0
  },
  statistics: {
    total_distance: 0,
    total_boot_time: 0,
    total_boot_count: 0
  },
  flags: {
    is_emergency_stopped: false,
    is_emergency_recoverable: true,
    is_brake_released: true,
    is_charging: false,
    is_low_power_mode: false,
    obstacle_slowdown: false,
    obstacle_paused: false,
    can_run_motion_task: true,
    is_auto_mode: true,
    is_loaded: false,
    has_wifi: true
  },
  obstacle_sensors: {
    main_radar: false,
    aux_radar: false,
    depth_camera1: false,
    depth_camera2: false,
    obstacle_radar1: false,
    obstacle_radar2: false
  },
  mission: {
    id: 0,
    status: 0,
    status_text: '无效状态',
    result: 0,
    result_text: '无效状态',
    error_code: 0
  }
})

// ==================== 控制状态 ====================
const moveLoading = reactive({ pause: false, resume: false, stop: false })
const chargeLoading = reactive({ start: false, stop: false })
const powerLoading = reactive({ enter: false, exit: false })
const missionLoading = reactive({ pause: false, resume: false, cancel: false })
const systemLoading = ref(false)
const locLoading = ref(false)
const syncMapsLoading = ref(false)

// ==================== 导航数据 ====================
const navTarget = reactive({ x: 0, y: 0, yaw: 0 })
const forceLocTarget = reactive({ x: 0, y: 0, yaw: 0 })
const navLoading = ref(false)
const localizingLoading = ref(false)
const forceLocLoading = ref(false)
const stationNavLoading = ref(false)

// 站点导航
const selectedStationId = ref<number | null>(null)
const taskId = ref<number | null>(null)
const stationSearchText = ref('')

const navParams = reactive({
  speedLevel: 50,
  volume: 50,
  obstacleStrategy: 1
})

const mapName = ref('')

const stations = ref<Array<{ id: number; name: string; x: number; y: number; yaw: number }>>([])

// 过滤后的站点列表（根据搜索文本）
const filteredStations = computed(() => {
  if (!stationSearchText.value.trim()) {
    return stations.value
  }
  
  const searchLower = stationSearchText.value.toLowerCase().trim()
  return stations.value.filter(station => {
    // 按名称或ID搜索
    return station.name.toLowerCase().includes(searchLower) ||
           station.id.toString().includes(searchLower)
  })
})

// ==================== 手动控制 ====================
const manualMode = ref(false)
// 控制模式: 'coil' = 线圈模式(固定速度), 'velocity' = 速度模式(自定义速度)
const controlMode = ref<'coil' | 'velocity'>('coil')
// 速度模式下的线速度设置 (m/s)
const velocitySpeed = ref(0.3)
// 速度模式下的角速度设置 (rad/s)
const angularSpeed = ref(0.3)

// 按键状态：前进、后退、左旋转、右旋转
const pressedKeys = reactive({
  forward: false,
  backward: false,
  rotate_left: false,
  rotate_right: false
})

// ==================== 状态轮询 ====================
let pollTimer: number | null = null
let manualCommandTimer: number | null = null
let isSendingCommand = false // 防止命令发送并发
const MANUAL_COMMAND_INTERVAL = 100 // 每100ms发送一次命令

onMounted(async () => {
  // 从地图数据加载站点列表
  await loadStationsFromMap()

  // 开始轮询状态
  pollTimer = window.setInterval(fetchStatus, 500)
  fetchStatus()

  // 监听键盘事件
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)
})

onUnmounted(() => {
  if (pollTimer) {
    clearInterval(pollTimer)
  }
  if (manualCommandTimer) {
    clearInterval(manualCommandTimer)
  }
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('keyup', handleKeyUp)
})

async function fetchStatus() {
  try {
    const data = await chassisApi.getStatus()
    Object.assign(status, data)
    
    // 从API读取持久化的配置值并同步到UI
    if (data.speed_level !== undefined) {
      navParams.speedLevel = data.speed_level
    }
    if (data.current_system_volume !== undefined) {
      navParams.volume = data.current_system_volume
    }
    if (data.obstacle_strategy !== undefined) {
      navParams.obstacleStrategy = data.obstacle_strategy
    }
  } catch {
    // 静默失败
  }
}

// ==================== 辅助函数 ====================
function getStatusType(s: number): 'success' | 'warning' | 'danger' | 'info' | '' {
  if (s === 0x02) return 'success' // 空闲
  if (s === 0x03 || s >= 0x15) return 'danger' // 错误
  if (s >= 0x08 && s <= 0x0A) return 'warning' // 障碍
  return 'info'
}

function getLocationStatusType(s: number): 'success' | 'warning' | 'danger' | 'info' | '' {
  if (s === 0x03) return 'success'
  if (s === 0x04) return 'warning'
  if (s === 0x05) return 'danger'
  return 'info'
}

function getBatteryClass(pct?: number): string {
  if (!pct) return ''
  if (pct > 50) return 'battery-high'
  if (pct > 20) return 'battery-mid'
  return 'battery-low'
}

function getBatteryStatusType(s?: number): 'success' | 'warning' | 'danger' | 'info' | '' {
  if (s === 0x02) return 'success' // 充电中
  return ''
}

function getConfidenceClass(conf?: number): string {
  if (!conf) return ''
  if (conf > 0.8) return 'conf-high'
  if (conf > 0.5) return 'conf-mid'
  return 'conf-low'
}

function getTempClass(temp?: number): string {
  if (!temp) return ''
  if (temp > 45) return 'temp-high'
  if (temp > 35) return 'temp-mid'
  return ''
}

function getMissionStatusType(s?: number): 'success' | 'warning' | 'danger' | 'info' | '' {
  if (s === 0x05) return 'success'
  if (s === 0x03) return 'warning'
  if (s === 0x04) return 'info'
  return ''
}

function getMissionResultType(r?: number): 'success' | 'warning' | 'danger' | 'info' | '' {
  if (r === 0x01) return 'success'
  if (r === 0x02) return 'warning'
  if (r === 0x03) return 'danger'
  return ''
}

function formatTime(minutes?: number): string {
  if (!minutes) return '--'
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}

function formatDistance(meters?: number): string {
  if (!meters) return '0 m'
  if (meters >= 1000) return `${(meters / 1000).toFixed(2)} km`
  return `${meters.toFixed(0)} m`
}

function formatDuration(seconds?: number): string {
  if (!seconds) return '--'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  return `${h}h ${m}m`
}

// ==================== 紧急控制 ====================
async function emergencyStop() {
  try {
    await chassisApi.emergencyStop()
    ElMessage.error('紧急停止已触发')
    fetchStatus()
  } catch (e: any) {
    ElMessage.error(e.message || '操作失败')
  }
}

async function releaseEmergencyStop() {
  try {
    await chassisApi.releaseEmergencyStop()
    ElMessage.success('急停已解除')
    fetchStatus()
  } catch (e: any) {
    ElMessage.error(e.message || '操作失败')
  }
}

// ==================== 移动控制 ====================
async function pauseMove() {
  moveLoading.pause = true
  try {
    await chassisApi.pauseMove()
    ElMessage.success('移动已暂停')
  } catch (e: any) {
    ElMessage.error(e.message || '操作失败')
  } finally {
    moveLoading.pause = false
  }
}

async function resumeMove() {
  moveLoading.resume = true
  try {
    await chassisApi.resumeMove()
    ElMessage.success('移动已恢复')
  } catch (e: any) {
    ElMessage.error(e.message || '操作失败')
  } finally {
    moveLoading.resume = false
  }
}

async function stopMove() {
  moveLoading.stop = true
  try {
    await chassisApi.stopMove()
    ElMessage.warning('移动已停止')
  } catch (e: any) {
    ElMessage.error(e.message || '操作失败')
  } finally {
    moveLoading.stop = false
  }
}

// ==================== 充电控制 ====================
async function startCharging() {
  chargeLoading.start = true
  try {
    await chassisApi.startCharging()
    ElMessage.success('开始充电')
  } catch (e: any) {
    ElMessage.error(e.message || '操作失败')
  } finally {
    chargeLoading.start = false
  }
}

async function stopCharging() {
  chargeLoading.stop = true
  try {
    await chassisApi.stopCharging()
    ElMessage.success('停止充电')
  } catch (e: any) {
    ElMessage.error(e.message || '操作失败')
  } finally {
    chargeLoading.stop = false
  }
}

// ==================== 功耗控制 ====================
async function enterLowPower() {
  powerLoading.enter = true
  try {
    await chassisApi.enterLowPower()
    ElMessage.success('进入低功耗模式')
  } catch (e: any) {
    ElMessage.error(e.message || '操作失败')
  } finally {
    powerLoading.enter = false
  }
}

async function exitLowPower() {
  powerLoading.exit = true
  try {
    await chassisApi.exitLowPower()
    ElMessage.success('退出低功耗模式')
  } catch (e: any) {
    ElMessage.error(e.message || '操作失败')
  } finally {
    powerLoading.exit = false
  }
}

// ==================== 任务控制 ====================
async function pauseMission() {
  missionLoading.pause = true
  try {
    await chassisApi.pauseMission()
    ElMessage.success('任务已暂停')
  } catch (e: any) {
    ElMessage.error(e.message || '操作失败')
  } finally {
    missionLoading.pause = false
  }
}

async function resumeMission() {
  missionLoading.resume = true
  try {
    await chassisApi.resumeMission()
    ElMessage.success('任务已恢复')
  } catch (e: any) {
    ElMessage.error(e.message || '操作失败')
  } finally {
    missionLoading.resume = false
  }
}

async function cancelMission() {
  missionLoading.cancel = true
  try {
    await chassisApi.cancelMission()
    ElMessage.warning('任务已取消')
  } catch (e: any) {
    ElMessage.error(e.message || '操作失败')
  } finally {
    missionLoading.cancel = false
  }
}

// ==================== 系统控制 ====================
async function systemReset() {
  systemLoading.value = true
  try {
    await chassisApi.systemReset()
    ElMessage.success('系统复位成功')
  } catch (e: any) {
    ElMessage.error(e.message || '操作失败')
  } finally {
    systemLoading.value = false
  }
}

async function stopLocalization() {
  locLoading.value = true
  try {
    await chassisApi.stopLocalization()
    ElMessage.success('定位已停止')
  } catch (e: any) {
    ElMessage.error(e.message || '操作失败')
  } finally {
    locLoading.value = false
  }
}

// ==================== 导航控制 ====================
async function navigateToCoord(isLocalization: boolean) {
  if (isLocalization) {
    localizingLoading.value = true
  } else {
    navLoading.value = true
  }
  
  try {
    await chassisApi.navigateToCoordinate({
      x: navTarget.x,
      y: navTarget.y,
      yaw: navTarget.yaw * Math.PI / 180,
      is_localization: isLocalization
    })
    const action = isLocalization ? '定位' : '导航'
    ElMessage.success(`${action}到 (${navTarget.x}, ${navTarget.y}) 已启动`)
  } catch (e: any) {
    ElMessage.error(e.message || '操作失败')
  } finally {
    navLoading.value = false
    localizingLoading.value = false
  }
}

async function forceLocalize() {
  forceLocLoading.value = true
  try {
    await chassisApi.forceLocalize({
      x: forceLocTarget.x,
      y: forceLocTarget.y,
      yaw: forceLocTarget.yaw * Math.PI / 180
    })
    ElMessage.success('强制定位成功')
  } catch (e: any) {
    ElMessage.error(e.message || '操作失败')
  } finally {
    forceLocLoading.value = false
  }
}

async function loadStationsFromMap() {
  try {
    const mapData = await chassisApi.getMapData()
    if (mapData.success && mapData.stations) {
      // 将地图数据中的站点转换为组件使用的格式
      stations.value = mapData.stations.map((s: any) => ({
        id: s.id,
        name: s.name || `站点${s.id}`,
        x: s['pos.x'],  // 单位：mm
        y: s['pos.y'],  // 单位：mm
        yaw: s['pos.yaw']  // 单位：1/1000 rad
      }))
      console.log(`从地图加载了 ${stations.value.length} 个站点`)
    }
  } catch (error) {
    console.warn('从地图加载站点失败:', error)
    // 失败时使用空列表
    stations.value = []
  }
}

async function navigateToSelectedStation() {
  if (!selectedStationId.value) {
    ElMessage.warning('请先选择一个站点')
    return
  }
  
  stationNavLoading.value = true
  try {
    const station = stations.value.find(s => s.id === selectedStationId.value)
    if (!station) {
      ElMessage.error('未找到选中的站点')
      return
    }
    
    if (taskId.value !== null && taskId.value > 0) {
      // 带任务ID导航
      await chassisApi.navigateToSiteWithTask(station.id, taskId.value)
      ElMessage.success(`正在导航到站点: ${station.name} (任务ID: ${taskId.value})`)
    } else {
      // 不带任务ID导航
      await chassisApi.navigateToSiteSimple(station.id)
      ElMessage.success(`正在导航到站点: ${station.name}`)
    }
  } catch (e: any) {
    ElMessage.error(e.message || '导航失败')
  } finally {
    stationNavLoading.value = false
  }
}

async function goToStation(station: { id: number; name: string; x: number; y: number; yaw: number }) {
  navLoading.value = true
  try {
    await chassisApi.navigateToSite({ site_id: station.id })
    ElMessage.success(`导航到站点: ${station.name}`)
  } catch (e: any) {
    ElMessage.error(e.message || '操作失败')
  } finally {
    navLoading.value = false
  }
}

// ==================== 参数设置 ====================
async function setSpeedLevel(level: number) {
  try {
    await chassisApi.setSpeedLevel({ level })
    ElMessage.success(`速度级别设置为 ${level}`)
  } catch (e: any) {
    ElMessage.error(e.message || '操作失败')
  }
}

async function setVolume(volume: number) {
  try {
    await chassisApi.setVolume({ volume })
    ElMessage.success(`音量设置为 ${volume}`)
  } catch (e: any) {
    ElMessage.error(e.message || '操作失败')
  }
}

async function setObstacleStrategy(strategy: number) {
  try {
    await chassisApi.setObstacleStrategy({ strategy })
    ElMessage.success('避障策略已更新')
  } catch (e: any) {
    ElMessage.error(e.message || '操作失败')
  }
}

async function setMap() {
  if (!mapName.value.trim()) {
    ElMessage.warning('请输入地图名称')
    return
  }
  try {
    await chassisApi.setMap({ map_name: mapName.value })
    ElMessage.success(`地图切换到: ${mapName.value}`)
  } catch (e: any) {
    ElMessage.error(e.message || '操作失败')
  }
}

async function syncMaps() {
  syncMapsLoading.value = true
  try {
    const result = await chassisApi.syncMaps()
    if (result.success) {
      ElMessage.success(`地图同步完成！当前地图: ${result.current_map}，共 ${result.maps.length} 个地图`)
      // 更新当前地图名称
      status.current_map_name = result.current_map
      // 发送地图刷新事件，通知3D场景重新加载地图
      eventBus.emit(EVENTS.MAP_REFRESHED, result.current_map)
    } else {
      ElMessage.error(result.message || '同步失败')
    }
  } catch (e: any) {
    ElMessage.error(e.message || '地图同步失败')
  } finally {
    syncMapsLoading.value = false
  }
}

// ==================== 手动控制 ====================
async function toggleManualMode(enabled: boolean) {
  try {
    if (enabled) {
      await chassisApi.startManualControl()
      ElMessage.success('手动控制已启动')
    } else {
      await chassisApi.stopManualControl()
      // 确保停止时发送零速度
      if (controlMode.value === 'velocity') {
        await chassisApi.sendVelocity({ linear_x: 0, linear_y: 0, angular_z: 0 })
      }
      ElMessage.success('手动控制已停止')
    }
  } catch (e: any) {
    manualMode.value = !enabled
    ElMessage.error(e.message || '操作失败')
  }
}

async function stopChassis() {
  // 清空所有按键状态
  pressedKeys.forward = false
  pressedKeys.backward = false
  pressedKeys.rotate_left = false
  pressedKeys.rotate_right = false
  
  // 停止定时器
  if (manualCommandTimer) {
    clearInterval(manualCommandTimer)
    manualCommandTimer = null
  }
  
  try {
    // 发送停止命令
    await chassisApi.sendVelocity({ linear_x: 0, linear_y: 0, angular_z: 0 })
    await chassisApi.stop()
    ElMessage.warning('底盘已停止')
  } catch (e: any) {
    ElMessage.error(e.message || '操作失败')
  }
}

// 方向按钮控制
function startManualMove(direction: string) {
  if (!manualMode.value) {
    ElMessage.warning('请先启用手动控制模式')
    return
  }
  
  pressedKeys[direction as keyof typeof pressedKeys] = true
  
  // 立即发送一次命令
  sendManualCommand()
  
  // 如果还没有定时器，启动持续发送命令的定时器
  if (!manualCommandTimer) {
    manualCommandTimer = window.setInterval(() => {
      // 检查是否还有按键被按下
      const hasActiveKey = Object.values(pressedKeys).some(v => v)
      if (hasActiveKey) {
        sendManualCommand()
      } else {
        // 没有按键按下，停止定时器
        if (manualCommandTimer) {
          clearInterval(manualCommandTimer)
          manualCommandTimer = null
        }
      }
    }, MANUAL_COMMAND_INTERVAL)
  }
}

function stopManualMove(direction: string) {
  pressedKeys[direction as keyof typeof pressedKeys] = false
  
  // 检查是否还有按键被按下
  const hasActiveKey = Object.values(pressedKeys).some(v => v)
  
  if (!hasActiveKey) {
    // 所有按键都松开了，停止定时器
    if (manualCommandTimer) {
      clearInterval(manualCommandTimer)
      manualCommandTimer = null
    }
    // 发送停止命令
    sendManualCommand()
  }
}

async function sendManualCommand() {
  // 防止并发发送
  if (isSendingCommand) {
    console.warn('[手动控制] 上一次命令还在发送中，跳过本次')
    return
  }
  
  isSendingCommand = true
  const startTime = Date.now()
  
  try {
    if (controlMode.value === 'coil') {
      // 线圈模式：发送布尔命令，底盘以固定速度执行100ms
      console.log('[手动控制] 发送线圈命令:', pressedKeys)
      await chassisApi.sendManualCommand({
        forward: pressedKeys.forward,
        backward: pressedKeys.backward,
        left: false,  // 底盘无横移能力
        right: false, // 底盘无横移能力
        rotate_left: pressedKeys.rotate_left,
        rotate_right: pressedKeys.rotate_right
      })
    } else {
      // 速度模式：根据按键状态计算速度并发送
      let linear_x = 0
      let angular_z = 0
      
      // 计算线速度
      if (pressedKeys.forward) linear_x += velocitySpeed.value
      if (pressedKeys.backward) linear_x -= velocitySpeed.value
      
      // 计算角速度 (左转为正，右转为负)
      if (pressedKeys.rotate_left) angular_z += angularSpeed.value
      if (pressedKeys.rotate_right) angular_z -= angularSpeed.value
      
      console.log('[手动控制] 发送速度命令:', { linear_x, angular_z })
      await chassisApi.sendVelocity({
        linear_x: linear_x,
        linear_y: 0,  // 底盘无横移能力
        angular_z: angular_z
      })
    }
    
    const elapsed = Date.now() - startTime
    console.log(`[手动控制] 命令发送成功，耗时: ${elapsed}ms`)
  } catch (err) {
    const elapsed = Date.now() - startTime
    console.error(`[手动控制] 发送失败 (耗时${elapsed}ms):`, err)
  } finally {
    isSendingCommand = false
  }
}

// 键盘控制
function handleKeyDown(e: KeyboardEvent) {
  if (!manualMode.value || activeTab.value !== 'manual') return
  
  // W/S: 前进/后退, A/D: 左旋转/右旋转
  // 方向键: 上/下: 前进/后退, 左/右: 左旋转/右旋转
  const keyMap: Record<string, string> = {
    'w': 'forward',
    'W': 'forward',
    's': 'backward',
    'S': 'backward',
    'a': 'rotate_left',
    'A': 'rotate_left',
    'd': 'rotate_right',
    'D': 'rotate_right',
    'ArrowUp': 'forward',      // 上方向键 = 前进
    'ArrowDown': 'backward',   // 下方向键 = 后退
    'ArrowLeft': 'rotate_left', // 左方向键 = 左旋
    'ArrowRight': 'rotate_right' // 右方向键 = 右旋
  }
  
  const direction = keyMap[e.key]
  if (direction) {
    // 阻止默认行为和事件冒泡
    e.preventDefault()
    e.stopPropagation()
    
    // 如果已经按下，忽略重复事件
    if (pressedKeys[direction as keyof typeof pressedKeys]) {
      return
    }
    
    pressedKeys[direction as keyof typeof pressedKeys] = true
    
    // 立即发送一次命令
    sendManualCommand()
    
    // 如果还没有定时器，启动持续发送命令的定时器
    if (!manualCommandTimer) {
      manualCommandTimer = window.setInterval(() => {
        const hasActiveKey = Object.values(pressedKeys).some(v => v)
        if (hasActiveKey) {
          sendManualCommand()
        } else {
          if (manualCommandTimer) {
            clearInterval(manualCommandTimer)
            manualCommandTimer = null
          }
        }
      }, MANUAL_COMMAND_INTERVAL)
    }
  }
}

function handleKeyUp(e: KeyboardEvent) {
  if (!manualMode.value) return
  
  // W/S: 前进/后退, A/D: 左旋转/右旋转
  // 方向键: 上/下: 前进/后退, 左/右: 左旋转/右旋转
  const keyMap: Record<string, string> = {
    'w': 'forward',
    'W': 'forward',
    's': 'backward',
    'S': 'backward',
    'a': 'rotate_left',
    'A': 'rotate_left',
    'd': 'rotate_right',
    'D': 'rotate_right',
    'ArrowUp': 'forward',      // 上方向键 = 前进
    'ArrowDown': 'backward',   // 下方向键 = 后退
    'ArrowLeft': 'rotate_left', // 左方向键 = 左旋
    'ArrowRight': 'rotate_right' // 右方向键 = 右旋
  }
  
  const direction = keyMap[e.key]
  if (direction) {
    // 阻止默认行为
    e.preventDefault()
    e.stopPropagation()
    
    pressedKeys[direction as keyof typeof pressedKeys] = false
    
    // 检查是否还有按键被按下
    const hasActiveKey = Object.values(pressedKeys).some(v => v)
    
    if (!hasActiveKey) {
      // 所有按键都松开了，停止定时器
      if (manualCommandTimer) {
        clearInterval(manualCommandTimer)
        manualCommandTimer = null
      }
      // 发送停止命令
      sendManualCommand()
    }
  }
}
</script>

<style scoped>
.chassis-panel {
  height: 100%;
  overflow: hidden;
}

.chassis-tabs {
  height: 100%;
}

.chassis-tabs :deep(.el-tabs__header) {
  margin: 0;
  background: rgba(30, 41, 59, 0.5);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
}

.chassis-tabs :deep(.el-tabs__nav) {
  border: none;
}

.chassis-tabs :deep(.el-tabs__item) {
  color: rgba(148, 163, 184, 0.8);
  border: none;
  background-color: transparent;
  transition: all 0.3s var(--transition-smooth);
}

.chassis-tabs :deep(.el-tabs__item:hover) {
  color: var(--color-text-primary);
}

.chassis-tabs :deep(.el-tabs__item.is-active) {
  color: var(--color-primary);
  background: rgba(245, 158, 11, 0.1);
  border-bottom: 2px solid var(--color-primary);
}

.chassis-tabs :deep(.el-tabs__content) {
  padding: var(--spacing-md);
  height: calc(100% - 40px);
  overflow-y: auto;
}

.panel-section {
  margin-bottom: var(--spacing-md);
}

.section-title {
  margin: 0 0 var(--spacing-sm) 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.danger-title {
  color: #ef4444;
}

/* ====================  状态显示 ==================== */
.status-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-sm);
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm) var(--spacing-md);
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(148, 163, 184, 0.15);
  border-radius: var(--radius-md);
  transition: all 0.3s var(--transition-smooth);
}

.status-item:hover {
  background: rgba(30, 41, 59, 0.6);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.status-label {
  font-size: 12px;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

/* ==================== 位姿信息 ==================== */
.pose-info {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  margin-bottom: 8px;
}

.pose-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  background: #2d2d2d;
  border-radius: 6px;
}

.pose-label {
  font-size: 11px;
  color: #909399;
}

.pose-value {
  font-size: 13px;
  font-weight: 500;
  font-family: 'Consolas', monospace;
  color: #67c23a;
}

.conf-high { color: #67c23a; }
.conf-mid { color: #e6a23c; }
.conf-low { color: #f56c6c; }

.velocity-info {
  padding: 8px 10px;
  background: #2d2d2d;
  border-radius: 6px;
}

.vel-row {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.vel-label { color: #909399; }
.vel-value { color: #67c23a; font-family: 'Consolas', monospace; }

/* ==================== 电池信息 ==================== */
.battery-main {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
}

.battery-visual {
  flex: 1;
  height: 28px;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: var(--radius-sm);
  position: relative;
  overflow: hidden;
}

.battery-bar {
  height: 100%;
  background: linear-gradient(90deg, #10b981, #34d399);
  transition: width 0.5s var(--transition-smooth);
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.4);
}

.battery-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  font-weight: 700;
  text-shadow: 0 0 3px rgba(0,0,0,0.8);
  color: var(--color-text-primary);
}

.battery-high { color: #10b981; }
.battery-mid { color: var(--color-primary); }
.battery-low { color: #ef4444; }

.battery-details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-xs);
}

.battery-item {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-xs) var(--spacing-sm);
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: var(--radius-sm);
}

.bat-label {
  font-size: 10px;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
}

.bat-value {
  font-size: 12px;
  font-family: 'Consolas', monospace;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.bat-value.charging { color: #10b981; }
.temp-high { color: #ef4444; }
.temp-mid { color: var(--color-primary); }

/* ==================== 统计信息 ==================== */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background: #2d2d2d;
  border-radius: 6px;
}

.stat-label {
  font-size: 11px;
  color: #909399;
}

.stat-value {
  font-size: 14px;
  font-weight: 500;
  font-family: 'Consolas', monospace;
  color: #409eff;
}

/* ==================== 状态标志 ==================== */
.flags-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-xs);
}

.flag-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-sm) var(--spacing-xs);
  background: rgba(30, 41, 59, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(148, 163, 184, 0.15);
  border-radius: var(--radius-md);
  font-size: 10px;
  color: rgba(148, 163, 184, 0.6);
  transition: all 0.3s var(--transition-smooth);
}

.flag-item.active {
  background: rgba(16, 185, 129, 0.15);
  border-color: rgba(16, 185, 129, 0.4);
  color: #10b981;
}

.flag-item.charging {
  background: rgba(16, 185, 129, 0.15);
  border-color: rgba(16, 185, 129, 0.4);
  color: #10b981;
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.2);
}

.flag-item.wifi {
  background: rgba(59, 130, 246, 0.15);
  border-color: rgba(59, 130, 246, 0.4);
  color: #3b82f6;
}

.flag-item.warning {
  background: rgba(245, 158, 11, 0.15);
  border-color: rgba(245, 158, 11, 0.4);
  color: var(--color-primary);
}

.flag-item.danger {
  background: rgba(239, 68, 68, 0.15);
  border-color: rgba(239, 68, 68, 0.4);
  color: #ef4444;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.flag-item .el-icon {
  font-size: 16px;
  margin-bottom: var(--spacing-xs);
}

/* ==================== 障碍传感器 ==================== */
.sensor-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}

.sensor-item {
  padding: 8px;
  text-align: center;
  background: #2d2d2d;
  border-radius: 4px;
  font-size: 11px;
  color: #909399;
  transition: all 0.2s;
}

.sensor-item.triggered {
  background: #5a3535;
  color: #f56c6c;
}

/* ==================== 任务信息 ==================== */
.mission-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.mission-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 10px;
  background: #2d2d2d;
  border-radius: 4px;
}

.mission-label {
  font-size: 12px;
  color: #909399;
}

.mission-value {
  font-size: 12px;
  font-family: 'Consolas', monospace;
}

/* ==================== 控制按钮 ==================== */
.emergency-buttons {
  display: flex;
  gap: 10px;
}

.emergency-buttons .el-button {
  flex: 1;
  height: 48px;
  font-size: 14px;
}

.move-buttons,
.charge-buttons,
.power-buttons,
.mission-buttons,
.system-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.move-buttons .el-button,
.charge-buttons .el-button,
.power-buttons .el-button,
.mission-buttons .el-button {
  flex: 1;
  min-width: 100px;
}

/* ==================== 导航 ==================== */
.nav-inputs,
.force-loc-inputs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 10px;
}

.nav-input-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-label {
  font-size: 11px;
  color: #909399;
}

.nav-buttons {
  display: flex;
  gap: 10px;
}

.nav-buttons .el-button {
  flex: 1;
}

/* ==================== 站点导航 ==================== */
.station-nav-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.station-nav-buttons {
  display: flex;
  gap: 8px;
}

.station-list-display {
  margin-top: 0;
}

/* 搜索框样式 */
.station-search {
  margin-bottom: 8px;
}

.station-list-title {
  font-size: 11px;
  color: #909399;
  margin-bottom: 6px;
  padding-left: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.station-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: 200px;
  overflow-y: auto;
}

.station-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: #2d2d2d;
	border-radius: 6px;
	cursor: pointer;
	transition: all 0.2s;
/* removed extra closing brace here */

.station-item:hover {
  background: #3c3c3c;
}

.station-item.selected {
  background: #354561;
  border: 1px solid #409eff;
}

/* 空状态显示 */
.station-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 30px 12px;
  color: #606266;
  font-size: 12px;
  background: #2d2d2d;
  border-radius: 6px;
}
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.station-item:hover {
  background: #3c3c3c;
}

.station-item.selected {
  background: #354561;
  border: 1px solid #409eff;
}

.station-name {
  flex: 1;
  font-size: 13px;
}

.station-id {
  font-size: 11px;
  color: #67c23a;
  font-family: 'Consolas', monospace;
}

.station-coord {
  font-size: 11px;
  color: #909399;
  font-family: 'Consolas', monospace;
}

/* ==================== 导航参数 ==================== */
.nav-params {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.param-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.param-label {
  font-size: 12px;
  color: #909399;
}

.slider-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.param-slider {
  flex: 1;
}

.slider-value {
  min-width: 32px;
  text-align: right;
  font-size: 13px;
  font-family: 'Consolas', monospace;
  color: #67c23a;
}

.param-item :deep(.el-slider) {
  margin-left: 0;
}

.map-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: #2d2d2d;
  border-radius: 6px;
}

.map-label {
  font-size: 12px;
  color: #909399;
}

.map-name {
  flex: 1;
  font-size: 14px;
  color: #409eff;
}

/* ==================== 手动控制 ==================== */
.manual-toggle {
  display: flex;
  align-items: center;
  gap: 12px;
}

.manual-control-grid {
  display: flex;
  justify-content: center;
}

.direction-pad {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.pad-row {
  display: flex;
  gap: 6px;
  justify-content: center;
}

.pad-empty {
  width: 60px;
  height: 60px;
}

.direction-btn {
  width: 60px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  font-size: 10px;
}

.direction-btn .el-icon {
  font-size: 20px;
}

.key-hint {
  font-size: 10px;
  color: #909399;
}

.center-indicator {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2d2d2d;
  border-radius: 50%;
  color: #409eff;
}

.manual-hint {
  margin-top: 12px;
  text-align: center;
  font-size: 11px;
  color: #909399;
}

/* ==================== 控制模式切换 ==================== */
.mode-switch {
  margin-bottom: 8px;
}

.mode-description {
  font-size: 11px;
  color: #909399;
  margin-top: 6px;
}

/* ==================== 速度设置 ==================== */
.velocity-settings {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.setting-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.setting-label {
  font-size: 12px;
  color: #909399;
  min-width: 50px;
}

.setting-item :deep(.el-slider) {
  flex: 1;
}

.setting-value {
  font-size: 12px;
  font-family: 'Consolas', monospace;
  color: #67c23a;
  min-width: 80px;
  text-align: right;
}

/* ==================== 速度滑块 ==================== */
.velocity-sliders {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 12px;
}

.slider-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.slider-label {
  font-size: 12px;
  color: #909399;
  min-width: 60px;
}

.slider-item :deep(.el-slider) {
  flex: 1;
}

.slider-value {
  font-size: 12px;
  font-family: 'Consolas', monospace;
  color: #67c23a;
  min-width: 70px;
  text-align: right;
}

.velocity-buttons {
  display: flex;
  gap: 10px;
}

.velocity-buttons .el-button {
  flex: 1;
}

/* ==================== 分隔线 ==================== */
:deep(.el-divider) {
  margin: 12px 0;
  border-color: #3c3c3c;
}

:deep(.el-input-number) {
  width: 100%;
}

:deep(.el-tag) {
  font-size: 11px;
}
</style>
