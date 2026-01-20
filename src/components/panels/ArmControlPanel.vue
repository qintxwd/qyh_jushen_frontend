<template>
  <div class="arm-control-panel">
    <!-- 状态显示-->
    <div class="panel-section">
      <div class="status-card" :class="statusClass">
        <div class="status-indicator">
          <el-icon :size="24">
            <component :is="statusIcon" />
          </el-icon>
        </div>
        <div class="status-info">
          <span class="status-label">机械臂状态</span>
          <span class="status-value">{{ statusText }}</span>
        </div>
      </div>
    </div>

    <!-- 电源控制 -->
    <div class="panel-section">
      <h3 class="section-title">电源控制</h3>
      <div class="control-row">
        <el-button 
          type="success" 
          :disabled="!armState.connected || armState.powered_on"
          :loading="loading.power"
          @click="powerOn"
        >
          <SvgIcon name="power-on" :size="16" />
          上电
        </el-button>
        <el-button 
          type="warning" 
          :disabled="!armState.connected || !armState.powered_on || armState.enabled"
          :loading="loading.power"
          @click="powerOff"
        >
          <SvgIcon name="power-off" :size="16" />
          下电
        </el-button>
      </div>
    </div>

    <!-- 使能控制 -->
    <div class="panel-section">
      <h3 class="section-title">使能控制</h3>
      <div class="control-row">
        <el-button 
          type="primary" 
          :disabled="!armState.connected || !armState.powered_on || armState.enabled"
          :loading="loading.enable"
          @click="enableArm"
        >
          <SvgIcon name="enable" :size="16" />
          使能
        </el-button>
        <el-button 
          type="info" 
          :disabled="!armState.connected || !armState.enabled"
          :loading="loading.enable"
          @click="disableArm"
        >
          <SvgIcon name="disable" :size="16" />
          去使能
        </el-button>
      </div>
    </div>

    <!-- 伺服模式 -->
    <div class="panel-section">
      <h3 class="section-title">伺服模式</h3>
      <div class="servo-status">
        <span class="servo-mode" :class="{ active: isServoRunning }">
          {{ isServoRunning ? '运行中' : '空闲' }}
        </span>
        <span class="servo-rate" v-if="isServoRunning">
          {{ servoStatus.publish_rate_hz.toFixed(1) }} Hz
        </span>
      </div>
      <div class="control-row">
        <el-button 
          type="success"
          :disabled="!armState.connected || !armState.enabled || isServoRunning"
          :loading="loading.servo"
          @click="startServo"
        >
          <SvgIcon name="caretright" :size="16" />
          启动伺服
        </el-button>
        <el-button 
          type="warning"
          :disabled="!armState.connected || !isServoRunning"
          :loading="loading.servo"
          @click="stopServo"
        >
          <SvgIcon name="switchbutton" :size="16" />
          停止伺服
        </el-button>
      </div>
    </div>

    <el-divider />

    <!-- 点位管理 -->
    <div class="panel-section">
      <h3 class="section-title">
        <SvgIcon name="location" :size="16" />
        点位管理
      </h3>
      
      <!-- 点位列表 -->
      <div class="points-list">
        <div 
          v-for="point in armPoints" 
          :key="point.id"
          class="point-item"
          :class="{ selected: selectedPointId === point.id, builtin: point.is_builtin }"
          @click="selectedPointId = point.id"
        >
          <div class="point-info">
            <span class="point-name">
              <SvgIcon v-if="point.is_builtin" name="star" :size="14" class="builtin-icon" />
              {{ point.name }}
            </span>
            <span class="point-desc" v-if="point.description">{{ point.description }}</span>
          </div>
          <div class="point-actions" v-if="selectedPointId === point.id">
            <el-button 
              size="small" 
              type="warning" 
              circle
              :disabled="point.id === 'zero'"
              @click.stop="openEditDialog(point)"
            >
              <SvgIcon name="edit" :size="16" />
            </el-button>
            <el-button 
              size="small" 
              type="danger" 
              circle
              :disabled="point.is_builtin"
              @click.stop="deletePoint(point)"
            >
              <SvgIcon name="delete" :size="16" />
            </el-button>
          </div>
        </div>
        
        <div v-if="armPoints.length === 0" class="empty-points">
          暂无点位，请添加
        </div>
      </div>
      
      <!-- 点位操作按钮 -->
      <div class="points-actions">
        <el-button 
          type="primary"
          :disabled="!selectedPointId || !armState.enabled || isServoRunning"
          :loading="loading.goToPoint"
          @click="goToSelectedPoint"
        >
          <SvgIcon name="position" :size="16" />
          移动到选中点位
        </el-button>
        
        <el-dropdown trigger="click" @command="handleAddPoint">
          <el-button type="success">
            <SvgIcon name="plus" :size="16" />
            采集新点位
            <SvgIcon name="arrowdown" :size="16" />
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="both">采集双臂</el-dropdown-item>
              <el-dropdown-item command="left">仅采集左臂</el-dropdown-item>
              <el-dropdown-item command="right">仅采集右臂</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      
      <!-- 更新选中点位 -->
      <div class="update-point-section" v-if="selectedPointId && selectedPointId !== 'zero'">
        <span class="update-label">更新选中点位为当前位置</span>
        <div class="update-buttons">
          <el-button size="small" @click="updatePointJoints('both')">双臂</el-button>
          <el-button size="small" @click="updatePointJoints('left')">仅左臂</el-button>
          <el-button size="small" @click="updatePointJoints('right')">仅右臂</el-button>
        </div>
      </div>
    </div>

    <el-divider />

    <!-- 点动控制 (Jog) -->
    <div class="panel-section">
      <h3 class="section-title">
        <SvgIcon name="pointer" :size="16" />
        点动控制 (Jog)
      </h3>
      
      <!-- 机器人选择和模式选择 -->
      <div class="jog-config">
        <div class="config-row">
          <span class="config-label">机器人</span>
          <el-radio-group v-model="jogParams.robotId" size="small">
            <el-radio-button :label="0">左臂</el-radio-button>
            <el-radio-button :label="1">右臂</el-radio-button>
          </el-radio-group>
        </div>
        <div class="config-row">
          <span class="config-label">坐标系</span>
          <el-radio-group v-model="jogParams.coordType" size="small" disabled>
            <el-radio-button :label="1">关节空间</el-radio-button>
          </el-radio-group>
          <el-tooltip content="目前只支持关节空间点位" placement="top">
            <SvgIcon name="infofilled" :size="14" style="margin-left: 8px; color: #409eff;" />
          </el-tooltip>
        </div>
        <div class="config-row">
          <span class="config-label">模式:</span>
          <el-radio-group v-model="jogParams.moveMode" size="small">
            <el-radio-button :label="1">步进</el-radio-button>
            <el-radio-button :label="2">连续</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      
      <!-- 速度和步距设置-->
      <div class="jog-speed-config">
        <div class="speed-row">
          <span class="speed-label">速度:</span>
          <el-slider 
            v-model="jogParams.velocity" 
            :min="0.01" 
            :max="jogParams.coordType === 1 ? 0.5 : 50"
            :step="jogParams.coordType === 1 ? 0.01 : 1"
            :format-tooltip="(v: number) => jogParams.coordType === 1 ? `${v.toFixed(2)} rad/s` : `${v.toFixed(0)} mm/s`"
            size="small"
            style="flex: 1;"
          />
          <span class="speed-value">{{ jogParams.coordType === 1 ? jogParams.velocity.toFixed(2) + ' rad/s' : jogParams.velocity.toFixed(0) + ' mm/s' }}</span>
        </div>
        <div class="speed-row" v-if="jogParams.moveMode === 1">
          <span class="speed-label">步距:</span>
          <el-slider 
            v-model="jogParams.stepSize" 
            :min="jogParams.coordType === 1 ? 0.01 : 1"
            :max="jogParams.coordType === 1 ? 0.5 : 50"
            :step="jogParams.coordType === 1 ? 0.01 : 1"
            :format-tooltip="(v: number) => jogParams.coordType === 1 ? `${v.toFixed(2)} rad` : `${v.toFixed(0)} mm`"
            size="small"
            style="flex: 1;"
          />
          <span class="speed-value">{{ jogParams.coordType === 1 ? jogParams.stepSize.toFixed(2) + ' rad' : jogParams.stepSize.toFixed(0) + ' mm' }}</span>
        </div>
      </div>
      
      <!-- 关节空间点动控制 -->
      <div class="jog-controls">
        <div class="jog-axis-row" v-for="i in 7" :key="'joint'+i">
          <span class="axis-label">J{{ i }}</span>
          <el-button 
            :type="activeJogAxis === i && jogDirection === -1 ? 'primary' : 'default'"
            size="small"
            class="jog-btn minus"
            @mousedown="startJog(i, -1)"
            @mouseup="stopJog"
            @mouseleave="stopJog"
            @touchstart.prevent="startJog(i, -1)"
            @touchend.prevent="stopJog"
            :disabled="!armState.enabled || isServoRunning"
          >
            <SvgIcon name="minus" :size="16" />
          </el-button>
          <div class="axis-value">{{ formatJointValue(jogParams.robotId, i-1) }}</div>
          <el-button 
            :type="activeJogAxis === i && jogDirection === 1 ? 'primary' : 'default'"
            size="small"
            class="jog-btn plus"
            @mousedown="startJog(i, 1)"
            @mouseup="stopJog"
            @mouseleave="stopJog"
            @touchstart.prevent="startJog(i, 1)"
            @touchend.prevent="stopJog"
            :disabled="!armState.enabled || isServoRunning"
          >
            <SvgIcon name="plus" :size="16" />
          </el-button>
        </div>
      </div>
      
      <!-- 笛卡尔空间点动控制（暂不支持-->
      <div class="jog-controls" v-if="false" style="display: none;">
        <div class="jog-cartesian-section">
          <div class="cartesian-title">位置</div>
          <div class="jog-axis-row" v-for="(axis, idx) in ['X', 'Y', 'Z']" :key="'cart'+axis">
            <span class="axis-label axis-position">{{ axis }}</span>
            <el-button 
              :type="activeJogAxis === idx+1 && jogDirection === -1 ? 'primary' : 'default'"
              size="small"
              class="jog-btn"
              @mousedown="startJog(idx+1, -1)"
              @mouseup="stopJog"
              @mouseleave="stopJog"
              @touchstart.prevent="startJog(idx+1, -1)"
              @touchend.prevent="stopJog"
              :disabled="!armState.enabled"
            >
              <SvgIcon name="minus" :size="16" />
            </el-button>
            <div class="axis-value">{{ formatCartesianValue(jogParams.robotId, idx) }}</div>
            <el-button 
              :type="activeJogAxis === idx+1 && jogDirection === 1 ? 'primary' : 'default'"
              size="small"
              class="jog-btn"
              @mousedown="startJog(idx+1, 1)"
              @mouseup="stopJog"
              @mouseleave="stopJog"
              @touchstart.prevent="startJog(idx+1, 1)"
              @touchend.prevent="stopJog"
              :disabled="!armState.enabled"
            >
              <SvgIcon name="plus" :size="16" />
            </el-button>
          </div>
        </div>
        <div class="jog-cartesian-section">
          <div class="cartesian-title">姿态</div>
          <div class="jog-axis-row" v-for="(axis, idx) in ['Rx', 'Ry', 'Rz']" :key="'rot'+axis">
            <span class="axis-label axis-rotation">{{ axis }}</span>
            <el-button 
              :type="activeJogAxis === idx+4 && jogDirection === -1 ? 'primary' : 'default'"
              size="small"
              class="jog-btn"
              @mousedown="startJog(idx+4, -1)"
              @mouseup="stopJog"
              @mouseleave="stopJog"
              @touchstart.prevent="startJog(idx+4, -1)"
              @touchend.prevent="stopJog"
              :disabled="!armState.enabled"
            >
              <SvgIcon name="minus" :size="16" />
            </el-button>
            <div class="axis-value">{{ formatRotationValue(jogParams.robotId, idx) }}</div>
            <el-button 
              :type="activeJogAxis === idx+4 && jogDirection === 1 ? 'primary' : 'default'"
              size="small"
              class="jog-btn"
              @mousedown="startJog(idx+4, 1)"
              @mouseup="stopJog"
              @mouseleave="stopJog"
              @touchstart.prevent="startJog(idx+4, 1)"
              @touchend.prevent="stopJog"
              :disabled="!armState.enabled"
            >
              <SvgIcon name="plus" :size="16" />
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <el-divider />

    <!-- 运动参数 -->
    <div class="panel-section">
      <h3 class="section-title">运动参数</h3>
      
      <!-- 目标选择 -->
      <div class="target-select">
        <el-radio-group v-model="moveTarget" size="small">
          <el-radio-button label="dual">双臂</el-radio-button>
          <el-radio-button label="left">左臂</el-radio-button>
          <el-radio-button label="right">右臂</el-radio-button>
        </el-radio-group>
      </div>

      <!-- 运动参数 -->
      <div class="motion-params">
        <div class="param-row">
          <span class="param-label">速度</span>
          <el-slider 
            v-model="motionParams.velocity" 
            :min="0.1" 
            :max="1.5"
            :step="0.1"
            :format-tooltip="(v: number) => `${v.toFixed(1)} rad/s`"
            size="small"
          />
          <span class="param-value">{{ motionParams.velocity.toFixed(1) }}</span>
        </div>
        <div class="param-row">
          <span class="param-label">加速度</span>
          <el-slider 
            v-model="motionParams.acceleration" 
            :min="0.1" 
            :max="1.0"
            :step="0.1"
            :format-tooltip="(v: number) => `${v.toFixed(1)} rad/s²`"
            size="small"
          />
          <span class="param-value">{{ motionParams.acceleration.toFixed(1) }}</span>
        </div>
      </div>
    </div>

    <el-divider />

    <!-- 负载管理 -->
    <div class="panel-section">
      <h3 class="section-title">
        <SvgIcon name="goods" :size="16" />
        负载管理
      </h3>
      
      <!-- 夹爪配置 -->
      <div class="payload-config">
        <div class="config-title">夹爪重量配置</div>
        <div class="payload-row">
          <span class="payload-label">左夹爪</span>
          <el-input-number 
            v-model="payloadConfig.leftGripperMass" 
            :min="0" 
            :max="5" 
            :step="0.1"
            :precision="2"
            size="small"
          />
          <span class="payload-unit">kg</span>
          <el-button 
            type="primary" 
            size="small" 
            :loading="loading.payload"
            @click="applyGripperPayload(0)"
          >
            应用
          </el-button>
        </div>
        <div class="payload-row">
          <span class="payload-label">右夹爪</span>
          <el-input-number 
            v-model="payloadConfig.rightGripperMass" 
            :min="0" 
            :max="5" 
            :step="0.1"
            :precision="2"
            size="small"
          />
          <span class="payload-unit">kg</span>
          <el-button 
            type="primary" 
            size="small"
            :loading="loading.payload"
            @click="applyGripperPayload(1)"
          >
            应用
          </el-button>
        </div>
        <div class="payload-actions">
          <el-button 
            type="success" 
            size="small"
            :loading="loading.payload"
            @click="saveGripperConfig"
          >
            保存配置
          </el-button>
          <el-button 
            size="small"
            @click="loadGripperConfig"
          >
            重新加载
          </el-button>
        </div>
      </div>
      
      <!-- 物品重量 -->
      <div class="payload-object">
        <div class="config-title">夹取物品重量</div>
        <div class="payload-row">
          <span class="payload-label">左臂物品:</span>
          <el-input-number 
            v-model="payloadObject.left" 
            :min="0" 
            :max="5" 
            :step="0.1"
            :precision="2"
            size="small"
          />
          <span class="payload-unit">kg</span>
          <el-button 
            type="primary" 
            size="small"
            :loading="loading.payload"
            @click="setObjectPayload(0)"
          >
            设置
          </el-button>
          <el-button 
            type="warning" 
            size="small"
            @click="clearObjectPayload(0)"
          >
            清除
          </el-button>
        </div>
        <div class="payload-row">
          <span class="payload-label">右臂物品:</span>
          <el-input-number 
            v-model="payloadObject.right" 
            :min="0" 
            :max="5" 
            :step="0.1"
            :precision="2"
            size="small"
          />
          <span class="payload-unit">kg</span>
          <el-button 
            type="primary" 
            size="small"
            :loading="loading.payload"
            @click="setObjectPayload(1)"
          >
            设置
          </el-button>
          <el-button 
            type="warning" 
            size="small"
            @click="clearObjectPayload(1)"
          >
            清除
          </el-button>
        </div>
      </div>
      
      <!-- 负载状态显示-->
      <div class="payload-status">
        <div class="status-row">
          <span class="status-label">左臂总负载</span>
          <span class="status-value">{{ (payloadConfig.leftGripperMass + payloadObject.left).toFixed(2) }} kg</span>
        </div>
        <div class="status-row">
          <span class="status-label">右臂总负载</span>
          <span class="status-value">{{ (payloadConfig.rightGripperMass + payloadObject.right).toFixed(2) }} kg</span>
        </div>
      </div>
    </div>

    <el-divider />

    <!-- 紧急控制-->
    <div class="panel-section">
      <h3 class="section-title">紧急控制</h3>
      <div class="emergency-buttons">
        <el-button 
          type="danger" 
          size="large"
          :disabled="!armState.connected"
          :loading="loading.abort"
          @click="motionAbort"
        >
          <SvgIcon name="warningfilled" :size="16" />
          急停
        </el-button>
        <el-button 
          type="warning"
          :disabled="!armState.connected"
          :loading="loading.clear"
          @click="clearError"
        >
          <SvgIcon name="refreshright" :size="16" />
          清除错误
        </el-button>
      </div>
      <div class="error-message" v-if="armState.error_message">
        {{ armState.error_message }}
      </div>
    </div>

    <!-- 添加点位对话框-->
    <el-dialog
      v-model="addPointDialogVisible"
      title="采集新点位"
      width="400px"
      :close-on-click-modal="false"
    >
      <el-form :model="newPointForm" label-width="80px">
        <el-form-item label="点位名称" required>
          <el-input 
            v-model="newPointForm.name" 
            placeholder="请输入点位名称"
            maxlength="50"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="描述">
          <el-input 
            v-model="newPointForm.description" 
            type="textarea"
            :rows="2"
            placeholder="点位描述（可选）"
          />
        </el-form-item>
        <el-form-item label="采集模式">
          <el-tag>{{ { both: '双臂', left: '仅左臂', right: '仅右臂' }[newPointForm.side] }}</el-tag>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="addPointDialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="loading.addPoint" @click="confirmAddPoint">
          确定采集
        </el-button>
      </template>
    </el-dialog>

    <!-- 编辑点位对话框-->
    <el-dialog
      v-model="editPointDialogVisible"
      title="编辑点位"
      width="400px"
      :close-on-click-modal="false"
    >
      <el-form :model="editPointForm" label-width="80px">
        <el-form-item label="点位名称" required>
          <el-input 
            v-model="editPointForm.name" 
            placeholder="请输入点位名称"
            maxlength="50"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="描述">
          <el-input 
            v-model="editPointForm.description" 
            type="textarea"
            :rows="2"
            placeholder="点位描述（可选）"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editPointDialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="loading.editPoint" @click="confirmEditPoint">
          保存
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import apiClient from '@/api/client'
import { useDataPlane } from '@/composables/useDataPlane'

const { isConnected, sendArmJog } = useDataPlane()

// 机械臂状态
const armState = reactive({
  connected: false,
  robot_ip: '',
  powered_on: false,
  enabled: false,
  in_estop: false,
  in_error: false,
  servo_mode_enabled: false,  // 伺服模式是否开启
  error_message: ''
})

// 伺服状态
const servoStatus = reactive({
  mode: 'idle',
  is_abs: true,
  cycle_time_ns: 8000000,
  publish_rate_hz: 125.0,
  latency_ms: 0.0,
  packet_loss_rate: 0.0,
  error_code: 0
})

// 运动目标
const moveTarget = ref<'dual' | 'left' | 'right'>('dual')

// 运动参数
const motionParams = reactive({
  velocity: 0.5,
  acceleration: 0.3
})

// Jog 点动控制参数
const jogParams = reactive({
  robotId: 0,        // 0=左臂, 1=右臂
  coordType: 1,      // 固定为1=关节空间（目前只支持关节点动
  moveMode: 1,       // 1=步进, 2=连续
  velocity: 0.1,     // 速度 (rad/s)
  stepSize: 0.05     // 步进大小 (rad)
})

// Jog 状态
const activeJogAxis = ref<number | null>(null)
const jogDirection = ref<number>(0)
const jogIntervalId = ref<number | null>(null)
const jogTimeoutId = ref<number | null>(null)  // 连续模式超时定时器
const jogStartTime = ref<number>(0)  // Jog 开始时器
const jogFailureCount = ref<number>(0)  // 连续失败次数
const lastJogArmState = ref<boolean>(false)  // 上次Jog时的使能状态

// Jog 安全配置
const JOG_CONFIG = {
  MAX_CONTINUOUS_TIME: 60000,  // 连续模式最大运行时间60秒)
  REQUEST_TIMEOUT: 1000,       // 单次请求超时 1秒(心跳需要快速响应)
  MAX_FAILURES: 5,             // 最大连续失败次
  HEARTBEAT_INTERVAL_MS: 100   // 心跳发送间隔(后端超时300ms，所以100ms发一次)
}



// 当前关节状态(弧度)
const currentJoints = reactive({
  left: [0, 0, 0, 0, 0, 0, 0],
  right: [0, 0, 0, 0, 0, 0, 0]
})

// 加载状态
const loading = reactive({
  power: false,
  enable: false,
  servo: false,
  move: false,
  moveHome: false,
  updateHome: false,
  abort: false,
  clear: false,
  goToPoint: false,
  addPoint: false,
  editPoint: false,
  payload: false
})

// ========== 负载管理 ==========
// 夹爪配置 (持久
const payloadConfig = reactive({
  leftGripperMass: 0.8,
  rightGripperMass: 0.8
})

// 物品重量 (不持久化)
const payloadObject = reactive({
  left: 0.0,
  right: 0.0
})

// ========== 点位管理 ==========
interface ArmPoint {
  id: string
  name: string
  description: string
  is_builtin: boolean
  left_joints: number[]
  right_joints: number[]
}

const armPoints = ref<ArmPoint[]>([])
const selectedPointId = ref<string | null>(null)

// 添加点位对话框
const addPointDialogVisible = ref(false)
const newPointForm = reactive({
  name: '',
  description: '',
  side: 'both' as 'left' | 'right' | 'both'
})

// 编辑点位对话框
const editPointDialogVisible = ref(false)
const editPointForm = reactive({
  id: '',
  name: '',
  description: ''
})

// 轮询定时器
let pollTimer: number | null = null

// 计算伺服是否真正运行中(考虑机械臂状态
const isServoRunning = computed(() => {
  // 如果机械臂未使能，伺服肯定不在运行
  if (!armState.enabled) return false
  // 根据伺服状态或 armState 中的 servo_mode_enabled 判断
  return servoStatus.mode !== 'idle' || armState.servo_mode_enabled
})

// 计算状态样式
const statusClass = computed(() => {
  if (armState.in_error || armState.in_estop) return 'error'
  if (isServoRunning.value) return 'servo'
  if (armState.enabled) return 'enabled'
  if (armState.powered_on) return 'powered'
  if (armState.connected) return 'connected'
  return 'disconnected'
})

const statusIcon = computed(() => {
  if (armState.in_error || armState.in_estop) return 'WarningFilled'
  if (isServoRunning.value) return 'VideoPlay'
  if (armState.enabled) return 'Unlock'
  if (armState.powered_on) return 'CircleCheck'
  return 'CircleClose'
})

const statusText = computed(() => {
  if (armState.in_estop) return '急停中'
  if (armState.in_error) return '故障'
  if (isServoRunning.value) return '伺服运行'
  if (armState.enabled) return '已使能'
  if (armState.powered_on) return '已上电'
  if (armState.connected) return '已连接'
  return '未连接'
})

// ========== 点位管理函数 ==========

// 获取点位列表
async function fetchArmPoints() {
  try {
    const data = await apiClient.get('/api/v1/arm/points')
    armPoints.value = data.points || []
  } catch (error) {
    console.warn('获取点位列表失败:', error)
  }
}

// 移动到选中点位
async function goToSelectedPoint() {
  if (!selectedPointId.value) {
    ElMessage.warning('请先选择一个点位')
    return
  }
  
  loading.goToPoint = true
  try {
    const side = moveTarget.value === 'dual' ? 'both' : moveTarget.value
    const data = await apiClient.post(`/api/v1/arm/points/${selectedPointId.value}/go`, {
      velocity: motionParams.velocity,
      acceleration: motionParams.acceleration,
      side: side
    })
    if (data.success) {
      ElMessage.success(data.message)
    } else {
      ElMessage.error(data.message || '移动失败')
    }
  } catch (error: any) {
    ElMessage.error(error.response?.data?.detail || '移动失败')
  } finally {
    loading.goToPoint = false
  }
}

// 处理添加点位
function handleAddPoint(side: 'left' | 'right' | 'both') {
  newPointForm.name = ''
  newPointForm.description = ''
  newPointForm.side = side
  addPointDialogVisible.value = true
}

// 确认添加点位
async function confirmAddPoint() {
  if (!newPointForm.name.trim()) {
    ElMessage.warning('请输入点位名称')
    return
  }
  
  loading.addPoint = true
  try {
    const data = await apiClient.post('/api/v1/arm/points', {
      name: newPointForm.name.trim(),
      description: newPointForm.description.trim(),
      side: newPointForm.side
    })
    if (data.success) {
      ElMessage.success(data.message)
      addPointDialogVisible.value = false
      await fetchArmPoints()
    } else {
      ElMessage.error(data.message || '添加失败')
    }
  } catch (error: any) {
    ElMessage.error(error.response?.data?.detail || '添加点位失败')
  } finally {
    loading.addPoint = false
  }
}

// 打开编辑对话框
function openEditDialog(point: ArmPoint) {
  editPointForm.id = point.id
  editPointForm.name = point.name
  editPointForm.description = point.description
  editPointDialogVisible.value = true
}

// 确认编辑点位
async function confirmEditPoint() {
  if (!editPointForm.name.trim()) {
    ElMessage.warning('请输入点位名称')
    return
  }
  
  loading.editPoint = true
  try {
    const data = await apiClient.put(`/api/v1/arm/points/${editPointForm.id}`, {
      name: editPointForm.name.trim(),
      description: editPointForm.description.trim()
    })
    if (data.success) {
      ElMessage.success(data.message)
      editPointDialogVisible.value = false
      await fetchArmPoints()
    } else {
      ElMessage.error(data.message || '更新失败')
    }
  } catch (error: any) {
    ElMessage.error(error.response?.data?.detail || '更新点位失败')
  } finally {
    loading.editPoint = false
  }
}

// 更新点位关节数据
async function updatePointJoints(side: 'left' | 'right' | 'both') {
  if (!selectedPointId.value) return
  
  const point = armPoints.value.find(p => p.id === selectedPointId.value)
  if (!point) return
  
  const sideText = { left: '左臂', right: '右臂', both: '双臂' }[side]
  
  try {
    await ElMessageBox.confirm(
      `确定要将 "${point.name}" 的${sideText}数据更新为当前位置吗？`,
      '更新点位',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
  } catch {
    return
  }
  
  try {
    const data = await apiClient.put(`/api/v1/arm/points/${selectedPointId.value}`, {
      update_joints: true,
      side: side
    })
    if (data.success) {
      ElMessage.success(`点位 "${point.name}" 已更新`)
      await fetchArmPoints()
    } else {
      ElMessage.error(data.message || '更新失败')
    }
  } catch (error: any) {
    ElMessage.error(error.response?.data?.detail || '更新点位失败')
  }
}

// 删除点位
async function deletePoint(point: ArmPoint) {
  try {
    await ElMessageBox.confirm(
      `确定要删除点位 "${point.name}" 吗？`,
      '删除点位',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger'
      }
    )
  } catch {
    return
  }
  
  try {
    const data = await apiClient.delete(`/api/v1/arm/points/${point.id}`)
    if (data.success) {
      ElMessage.success('点位已删除')
      if (selectedPointId.value === point.id) {
        selectedPointId.value = null
      }
      await fetchArmPoints()
    } else {
      ElMessage.error(data.message || '删除失败')
    }
  } catch (error: any) {
    ElMessage.error(error.response?.data?.detail || '删除点位失败')
  }
}

// 获取机械臂状态
async function fetchArmState() {
  try {
    const data = await apiClient.get('/api/v1/arm/state')
    const safeData = data || {}
    // Validate connected flag is boolean
    if (typeof safeData.connected !== 'boolean') safeData.connected = false
    // Ensure other expected boolean flags are present
    if (typeof safeData.powered_on !== 'boolean') safeData.powered_on = !!safeData.powered_on
    if (typeof safeData.enabled !== 'boolean') safeData.enabled = !!safeData.enabled
    if (typeof safeData.in_estop !== 'boolean') safeData.in_estop = !!safeData.in_estop
    if (typeof safeData.in_error !== 'boolean') safeData.in_error = !!safeData.in_error
    if (typeof safeData.servo_mode_enabled !== 'boolean') safeData.servo_mode_enabled = !!safeData.servo_mode_enabled
    Object.assign(armState, safeData)
  } catch (error) {
    console.warn('获取机械臂状态失败', error)
    // Mark as disconnected / not powered when fetch fails to avoid stale "connected" UI
    Object.assign(armState, {
      connected: false,
      powered_on: false,
      enabled: false,
      in_estop: false,
      in_error: false,
      servo_mode_enabled: false
    })
  }
}

// 获取伺服状态
async function fetchServoStatus() {
  try {
    const data = await apiClient.get('/api/v1/arm/servo/status')
    Object.assign(servoStatus, data)
  } catch (error) {
    console.warn('获取伺服状态失败', error)
  }
}

// 获取关节状态(用于实时显示)
async function fetchJointStates() {
  try {
    const data = await apiClient.get('/api/v1/robot-model/joint_states')
    
    if (data.source === 'ros2' && data.left && data.right) {
      // 更新实时关节数据 (弧度)
      currentJoints.left = data.left
      currentJoints.right = data.right
    }
  } catch (error) {
    console.warn('获取关节状态失败', error)
  }
}

// 上电
async function powerOn() {
  loading.power = true
  try {
    const data = await apiClient.post('/api/v1/arm/power_on')
    if (data.success) {
      ElMessage.success('机械臂已上电')
      await fetchArmState()
    } else {
      ElMessage.error(data.message || '上电失败')
    }
  } catch (error: any) {
    ElMessage.error(error.response?.data?.detail || '上电失败')
  } finally {
    loading.power = false
  }
}

// 下电
async function powerOff() {
  loading.power = true
  try {
    const data = await apiClient.post('/api/v1/arm/power_off')
    if (data.success) {
      ElMessage.success('机械臂已下电')
      await fetchArmState()
    } else {
      ElMessage.error(data.message || '下电失败')
    }
  } catch (error: any) {
    ElMessage.error(error.response?.data?.detail || '下电失败')
  } finally {
    loading.power = false
  }
}

// 使能
async function enableArm() {
  loading.enable = true
  try {
    const data = await apiClient.post('/api/v1/arm/enable')
    if (data.success) {
      ElMessage.success('机械臂已使能')
      await fetchArmState()
    } else {
      ElMessage.error(data.message || '使能失败')
    }
  } catch (error: any) {
    ElMessage.error(error.response?.data?.detail || '使能失败')
  } finally {
    loading.enable = false
  }
}

// 去使能
async function disableArm() {
  loading.enable = true
  try {
    const data = await apiClient.post('/api/v1/arm/disable')
    if (data.success) {
      ElMessage.success('机械臂已去使能')
      await fetchArmState()
    } else {
      ElMessage.error(data.message || '去使能失败')
    }
  } catch (error: any) {
    ElMessage.error(error.response?.data?.detail || '去使能失败')
  } finally {
    loading.enable = false
  }
}

// 启动伺服
async function startServo() {
  loading.servo = true
  try {
    const data = await apiClient.post('/api/v1/arm/servo/start')
    if (data.success) {
      ElMessage.success('伺服模式已启动')
      await fetchServoStatus()
    } else {
      ElMessage.error(data.message || '启动失败')
    }
  } catch (error: any) {
    ElMessage.error(error.response?.data?.detail || '启动伺服失败')
  } finally {
    loading.servo = false
  }
}

// 停止伺服
async function stopServo() {
  loading.servo = true
  try {
    const data = await apiClient.post('/api/v1/arm/servo/stop')
    if (data.success) {
      ElMessage.success('伺服模式已停止')
      await fetchServoStatus()
    } else {
      ElMessage.error(data.message || '停止失败')
    }
  } catch (error: any) {
    ElMessage.error(error.response?.data?.detail || '停止伺服失败')
  } finally {
    loading.servo = false
  }
}

// 急停
async function motionAbort() {
  loading.abort = true
  try {
    const data = await apiClient.post('/api/v1/arm/motion_abort')
    if (data.success) {
      ElMessage.warning('急停已执行')
      await fetchArmState()
      await fetchServoStatus()
    } else {
      ElMessage.error(data.message || '急停失败')
    }
  } catch (error: any) {
    ElMessage.error(error.response?.data?.detail || '急停失败')
  } finally {
    loading.abort = false
  }
}

// 清除错误
async function clearError() {
  loading.clear = true
  try {
    const data = await apiClient.post('/api/v1/arm/clear_error')
    if (data.success) {
      ElMessage.success('错误已清除')
      await fetchArmState()
    } else {
      ElMessage.error(data.message || '清除失败')
    }
  } catch (error: any) {
    ElMessage.error(error.response?.data?.detail || '清除错误失败')
  } finally {
    loading.clear = false
  }
}

// ========== 负载管理 ==========

// 加载夹爪配置
async function loadGripperConfig() {
  try {
    const data = await apiClient.get('/api/v1/arm/payload/gripper_config')
    payloadConfig.leftGripperMass = data.left_gripper_mass
    payloadConfig.rightGripperMass = data.right_gripper_mass
  } catch (error: any) {
    console.warn('加载夹爪配置失败:', error)
  }
}

// 保存夹爪配置
async function saveGripperConfig() {
  loading.payload = true
  try {
    const data = await apiClient.post('/api/v1/arm/payload/gripper_config', {
      left_gripper_mass: payloadConfig.leftGripperMass,
      right_gripper_mass: payloadConfig.rightGripperMass
    })
    if (data.success) {
      ElMessage.success('夹爪配置已保存')
    } else {
      ElMessage.error(data.message || '保存失败')
    }
  } catch (error: any) {
    ElMessage.error(error.response?.data?.detail || '保存夹爪配置失败')
  } finally {
    loading.payload = false
  }
}

// 应用夹爪负载
async function applyGripperPayload(robotId: number) {
  loading.payload = true
  try {
    const data = await apiClient.post(`/api/v1/arm/payload/apply_gripper?robot_id=${robotId}`)
    if (data.success) {
      ElMessage.success(data.message)
      // 清除物品重量
      if (robotId === 0) {
        payloadObject.left = 0
      } else {
        payloadObject.right = 0
      }
    } else {
      ElMessage.error(data.message || '应用失败')
    }
  } catch (error: any) {
    ElMessage.error(error.response?.data?.detail || '应用夹爪负载失败')
  } finally {
    loading.payload = false
  }
}

// 设置物品重量
async function setObjectPayload(robotId: number) {
  loading.payload = true
  try {
    const objectMass = robotId === 0 ? payloadObject.left : payloadObject.right
    const data = await apiClient.post(`/api/v1/arm/payload/set_object?robot_id=${robotId}&object_mass=${objectMass}`)
    if (data.success) {
      ElMessage.success(data.message)
    } else {
      ElMessage.error(data.message || '设置失败')
    }
  } catch (error: any) {
    ElMessage.error(error.response?.data?.detail || '设置物品重量失败')
  } finally {
    loading.payload = false
  }
}

// 清除物品重量
async function clearObjectPayload(robotId: number) {
  if (robotId === 0) {
    payloadObject.left = 0
  } else {
    payloadObject.right = 0
  }
  await setObjectPayload(robotId)
}

// ========== 点动控制 (Jog) ==========

// 格式化关节值显
function formatJointValue(robotId: number, jointIdx: number): string {
  const joints = robotId === 0 ? currentJoints.left : currentJoints.right
  const rad = joints[jointIdx] || 0
  const deg = rad * 180 / Math.PI
  return `${deg.toFixed(1)}°`
}

// 格式化笛卡尔位置值显
function formatCartesianValue(_robotId: number, _idx: number): string {
  // TODO: 获取当前笛卡尔位置
  return '--'
}

// 格式化旋转值显
function formatRotationValue(_robotId: number, _idx: number): string {
  // TODO: 获取当前笛卡尔姿态
  return '--'
}

// 开始 Jog
async function startJog(axisNum: number, direction: number) {
  // 只支持关节空间
  if (jogParams.coordType !== 1) {
    ElMessage.warning('目前只支持关节空间点动')
    return
  }
  
  // 状态检查：必须使能且未在伺服模式
  if (!armState.enabled) {
    ElMessage.warning('机械臂未使能，无法点动')
    return
  }
  
  if (isServoRunning.value) {
    ElMessage.warning('伺服模式运行中，无法点动')
    return
  }
  
  // 如果已有点动在运行，先停止
  if (activeJogAxis.value !== null) {
    await stopJog()
  }
  
  activeJogAxis.value = axisNum
  jogDirection.value = direction
  jogStartTime.value = Date.now()
  jogFailureCount.value = 0  // 重置失败计数
  lastJogArmState.value = armState.enabled
  
  // 计算位置增量
  const position = jogParams.stepSize * direction
  
  // 步进模式：单次执行
  if (jogParams.moveMode === 1) {
    await executeJog(axisNum, position)
  } else {
    // 连续模式：发送启动命令，然后持续发送心跳
    // 后端收到后会发送大目标位置，持续运行
    // 后端有300ms超时检测，如果没收到心跳会自动停止
    await sendJogHeartbeat(axisNum, direction)
    
    // 设置定时器持续发送心跳
    jogIntervalId.value = window.setInterval(async () => {
      // 检查是否超过最大运行时器
      const runningTime = Date.now() - jogStartTime.value
      if (runningTime > JOG_CONFIG.MAX_CONTINUOUS_TIME) {
        ElMessage.warning(`点动已运行${JOG_CONFIG.MAX_CONTINUOUS_TIME / 1000}秒，自动停止`)
        await stopJog()
        return
      }
      
      // 检查机械臂状态是否变化
      if (!armState.enabled || isServoRunning.value) {
        console.log('机械臂状态变化，自动停止点动')
        await stopJog()
        return
      }
      
      await sendJogHeartbeat(axisNum, direction)
    }, JOG_CONFIG.HEARTBEAT_INTERVAL_MS)
    
    // 设置最大运行时间保护
    jogTimeoutId.value = window.setTimeout(async () => {
      ElMessage.warning(`点动超时 (${JOG_CONFIG.MAX_CONTINUOUS_TIME / 1000}秒)，强制停止`)
      await stopJog()
    }, JOG_CONFIG.MAX_CONTINUOUS_TIME)
  }
}

// 发送连续模式心跳
async function sendJogHeartbeat(axisNum: number, direction: number) {
  // WS Priority
  if (isConnected.value) {
    const side = jogParams.robotId === 0 ? 'left' : 'right'
    const mode = jogParams.coordType === 1 ? 'joint' : 'cartesian'
    // direction is +1 or -1
    const speed = jogParams.velocity * Math.sign(direction)
    
    sendArmJog(side, axisNum, speed, mode)
    return
  }

  // HTTP Fallback
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), JOG_CONFIG.REQUEST_TIMEOUT)
    
    // 发送心跳 move_mode=0 表示连续模式, velocity 的正负表示方向
    await apiClient.post('/api/v1/arm/jog', {
      robot_id: jogParams.robotId,
      axis_num: axisNum,
      move_mode: 0,  // 连续模式
      coord_type: jogParams.coordType,
      velocity: jogParams.velocity * direction,  // 速度带方向
      position: 0  // 连续模式不需要 position
    }, {
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    jogFailureCount.value = 0
    
  } catch (error: any) {
    jogFailureCount.value++
    
    if (error.name === 'AbortError' || error.code === 'ECONNABORTED') {
      console.warn(`心跳超时, 失败次数: ${jogFailureCount.value}`)
    } else if (error.code === 'ERR_NETWORK') {
      console.warn('网络连接失败，停止点动')
      ElMessage.error('网络连接失败')
      await stopJog()
      return
    }
    
    if (jogFailureCount.value >= JOG_CONFIG.MAX_FAILURES) {
      ElMessage.error(`心跳连续失败 ${JOG_CONFIG.MAX_FAILURES} 次，已停止`)
      await stopJog()
    }
  }
}

// 执行 Jog 命令
async function executeJog(axisNum: number, position: number) {
  try {
    // 使用 AbortController 实现请求超时
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), JOG_CONFIG.REQUEST_TIMEOUT)
    
    await apiClient.post('/api/v1/arm/jog', {
      robot_id: jogParams.robotId,
      axis_num: axisNum,
      move_mode: jogParams.moveMode,
      coord_type: jogParams.coordType,
      velocity: jogParams.velocity,
      position: Math.abs(position) * Math.sign(position)
    }, {
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    jogFailureCount.value = 0  // 成功后重置失败计数
    
  } catch (error: any) {
    jogFailureCount.value++
    
    // 判断错误类型
    if (error.name === 'AbortError' || error.code === 'ECONNABORTED') {
      console.warn(`Jog请求超时 (${JOG_CONFIG.REQUEST_TIMEOUT}ms), 失败次数: ${jogFailureCount.value}`)
    } else if (error.code === 'ERR_NETWORK') {
      console.warn('网络连接失败，停止点动')
      ElMessage.error('网络连接失败')
      await stopJog()
      return
    } else {
      console.warn('Jog command failed:', error.message)
    }
    
    // 连续失败次数过多，停止点位
    if (jogFailureCount.value >= JOG_CONFIG.MAX_FAILURES) {
      ElMessage.error(`点动连续失败 ${JOG_CONFIG.MAX_FAILURES} 次，已停止`)
      await stopJog()
      return
    }
  }
}

// 停止 Jog
async function stopJog() {
  // 清除所有定时器
  if (jogIntervalId.value) {
    clearInterval(jogIntervalId.value)
    jogIntervalId.value = null
  }
  
  if (jogTimeoutId.value) {
    clearTimeout(jogTimeoutId.value)
    jogTimeoutId.value = null
  }
  
  // 保存当前轴号用于发送停止命令
  const axisToStop = activeJogAxis.value
  const robotToStop = jogParams.robotId
  
  // 立即重置状态
  activeJogAxis.value = null
  jogDirection.value = 0
  jogStartTime.value = 0
  jogFailureCount.value = 0
  
  // 发送停止命令（在连续模式下确保机械臂停止运动）
  if (axisToStop !== null) {
    if (isConnected.value) {
      const side = robotToStop === 0 ? 'left' : 'right'
      const mode = jogParams.coordType === 1 ? 'joint' : 'cartesian'
      sendArmJog(side, axisToStop, 0.0, mode)
    }

    try {
      // 停止命令也设置超时
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 1000)  // 1秒超时
      
      await apiClient.post('/api/v1/arm/jog_stop', {
        robot_id: robotToStop,
        axis_num: axisToStop
      }, {
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
    } catch (error) {
      console.warn('Jog stop failed:', error)
      // 停止命令失败不影响前端状态清理
    }
  }
}

// 开始轮询
function startPolling() {
  fetchArmState()
  fetchServoStatus()
  fetchJointStates()
  pollTimer = window.setInterval(() => {
    fetchArmState()
    fetchServoStatus()
    fetchJointStates()
  }, 500)
}

// 停止轮询
function stopPolling() {
  if (pollTimer) {
    clearInterval(pollTimer)
    pollTimer = null
  }
}

onMounted(() => {
  startPolling()
  fetchArmPoints()
  loadGripperConfig()
  
  // 添加页面关闭前的紧急停止处理
  window.addEventListener('beforeunload', handleBeforeUnload)
})

onUnmounted(() => {
  // 移除事件监听
  window.removeEventListener('beforeunload', handleBeforeUnload)
  
  stopPolling()
  // 组件卸载时停止所有Jog操作
  if (activeJogAxis.value !== null) {
    // 使用同步方式发送停止命令
    sendJogStopSync()
  }
})

// 页面关闭前的处理
function handleBeforeUnload(event: BeforeUnloadEvent) {
  if (activeJogAxis.value !== null) {
    // 使用 sendBeacon 确保停止命令发送
    sendJogStopSync()
    
    // 可选：显示警告（但现代浏览器可能不显示自定义消息）
    event.preventDefault()
    event.returnValue = ''
  }
}

// 同步发送 Jog 停止命令（使用 sendBeacon 或 Fetch keepalive)
function sendJogStopSync() {
  if (activeJogAxis.value === null) return
  
  const axisToStop = activeJogAxis.value
  const robotToStop = jogParams.robotId
  
  // 清理定时器
  if (jogIntervalId.value) {
    clearInterval(jogIntervalId.value)
    jogIntervalId.value = null
  }
  if (jogTimeoutId.value) {
    clearTimeout(jogTimeoutId.value)
    jogTimeoutId.value = null
  }
  
  // 重置状态
  activeJogAxis.value = null
  jogDirection.value = 0
  jogStartTime.value = 0
  jogFailureCount.value = 0
  
  try {
    const token = localStorage.getItem('token')
    const url = `${apiClient.defaults.baseURL}/api/v1/arm/jog_stop`
    const data = JSON.stringify({
      robot_id: robotToStop,
      axis_num: axisToStop
    })
    
    // 方法1: 使用 sendBeacon（浏览器关闭时也会发送）
    if (navigator.sendBeacon) {
      // sendBeacon 只支持 POST，但不支持自定义 header
      // 所以需要在 URL 中带 token 或后端允许这种情况
      const blob = new Blob([data], { type: 'application/json' })
      
      // 尝试使用 Beacon，如果失败则降级为 Fetch
      const beaconUrl = token ? `${url}?_emergency_stop=1&_token=${encodeURIComponent(token)}` : url
      const sent = navigator.sendBeacon(beaconUrl, blob)
      
      if (sent) {
        console.log('Emergency jog stop sent via Beacon')
        return
      }
    }
    
    // 方法2: 使用 Fetch with keepalive
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      },
      body: data,
      keepalive: true  // 关键：即使页面关闭也会完成请求
    }).then(() => {
      console.log('Emergency jog stop sent via Fetch')
    }).catch(err => {
      console.warn('Emergency jog stop failed:', err)
    })
    
  } catch (error) {
    console.warn('Failed to send emergency jog stop:', error)
  }
}
</script>

<style scoped>
.arm-control-panel {
  padding: var(--spacing-lg);
}

/* 全局深色主题 tabs 样式 */
.arm-control-panel :deep(.el-tabs__header) {
  background: var(--color-surface, rgba(30, 41, 59, 0.5));
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--color-border, rgba(148, 163, 184, 0.2));
}

.arm-control-panel :deep(.el-tabs__nav) {
  border: none;
}

.arm-control-panel :deep(.el-tabs__item) {
  color: var(--color-text-muted, rgba(148, 163, 184, 0.8));
  border: none;
  background-color: transparent;
  transition: all 0.3s var(--transition-smooth);
}

.arm-control-panel :deep(.el-tabs__item:hover) {
  color: var(--color-text-primary);
}

.arm-control-panel :deep(.el-tabs__item.is-active) {
  color: var(--color-primary);
  background: rgba(245, 158, 11, 0.1);
  border-bottom: 2px solid var(--color-primary);
}

.panel-section {
  margin-bottom: var(--spacing-lg);
}

.section-title {
  margin: 0 0 var(--spacing-md) 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.section-title .el-icon {
  font-size: 14px;
  color: var(--color-primary);
}

/* 状态卡片 - Glassmorphism */
.status-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  background: var(--color-surface, rgba(30, 41, 59, 0.4));
  backdrop-filter: blur(20px);
  border: 1px solid var(--color-border, rgba(148, 163, 184, 0.2));
  transition: all 0.3s var(--transition-smooth);
  position: relative;
  overflow: hidden;
}

.status-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--color-border, rgba(148, 163, 184, 0.3));
  transition: all 0.3s var(--transition-smooth);
}

.status-card.connected::before {
  background: linear-gradient(180deg, #3b82f6, #60a5fa);
  box-shadow: 0 0 12px rgba(59, 130, 246, 0.5);
}

.status-card.powered::before {
  background: linear-gradient(180deg, #10b981, #34d399);
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.5);
}

.status-card.enabled::before {
  background: linear-gradient(180deg, #059669, #10b981);
  box-shadow: 0 0 12px rgba(5, 150, 105, 0.5);
}

.status-card.servo::before {
  background: linear-gradient(180deg, var(--color-primary), #fbbf24);
  box-shadow: 0 0 12px rgba(245, 158, 11, 0.5);
}

.status-card.error::before {
  background: linear-gradient(180deg, #ef4444, #f87171);
  box-shadow: 0 0 12px rgba(239, 68, 68, 0.5);
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.status-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(148, 163, 184, 0.1);
  transition: all 0.3s var(--transition-smooth);
}

.status-card.error .status-indicator {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.15);
}

.status-card.servo .status-indicator {
  color: var(--color-primary);
  background: rgba(245, 158, 11, 0.15);
}

.status-card.enabled .status-indicator,
.status-card.powered .status-indicator {
  color: #10b981;
  background: rgba(16, 185, 129, 0.15);
}

.status-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.status-label {
  font-size: 12px;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-value {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text-primary);
  font-family: var(--font-heading);
}

/* 控制按钮*/
.control-row {
  display: flex;
  gap: var(--spacing-sm);
}

.control-row .el-button {
  flex: 1;
  font-weight: 600;
  transition: all 0.3s var(--transition-smooth);
}

.control-row .el-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* 伺服状态 */
.servo-status {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-surface, rgba(30, 41, 59, 0.4));
  backdrop-filter: blur(10px);
  border: 1px solid var(--color-border, rgba(148, 163, 184, 0.2));
  border-radius: var(--radius-md);
}

.servo-mode {
  font-size: 13px;
  color: var(--color-text-secondary);
  font-weight: 500;
}

.servo-mode.active {
  color: var(--color-primary);
  font-weight: 600;
}

.servo-rate {
  font-size: 12px;
  font-family: 'Consolas', monospace;
  color: #10b981;
  font-weight: 600;
}

/* 目标选择 */
.target-select {
  margin-bottom: 12px;
}

.target-select :deep(.el-radio-group) {
  width: 100%;
  display: flex;
}

.target-select :deep(.el-radio-button) {
  flex: 1;
}

.target-select :deep(.el-radio-button__inner) {
  width: 100%;
}

/* 运动参数 */
.motion-params {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 12px;
}

.param-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.param-label {
  width: 50px;
  font-size: 12px;
  color: var(--color-text-muted, #909399);
}

.param-row :deep(.el-slider) {
  flex: 1;
}

.param-value {
  width: 40px;
  font-size: 12px;
  font-family: 'Consolas', monospace;
  color: #67c23a;
  text-align: right;
}

/* 点位列表 */
.points-list {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid var(--color-border, rgba(148, 163, 184, 0.2));
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-md);
  background: var(--color-surface, rgba(15, 23, 42, 0.4));
  backdrop-filter: blur(10px);
}

.point-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm) var(--spacing-md);
  cursor: pointer;
  transition: all 0.3s var(--transition-smooth);
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
  position: relative;
}

.point-item:last-child {
  border-bottom: none;
}

.point-item:hover {
  background: rgba(30, 41, 59, 0.5);
  transform: translateX(4px);
}

.point-item.selected {
  background: rgba(245, 158, 11, 0.1);
  border-left: 3px solid var(--color-primary);
}

.point-item.builtin .point-name {
  color: #10b981;
}

.point-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.point-name {
  font-size: 13px;
  font-weight: 500;
  color: #e0e0e0;
  display: flex;
  align-items: center;
  gap: 4px;
}

.builtin-icon {
  color: #e6a23c;
  font-size: 12px;
}

.point-desc {
  font-size: 11px;
  color: #909399;
}

.point-actions {
  display: flex;
  gap: 4px;
}

.empty-points {
  padding: 20px;
  text-align: center;
  color: #909399;
  font-size: 13px;
}

.points-actions {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.points-actions .el-button {
  flex: 1;
}

/* 更新点位区域 */
.update-point-section {
  background-color: var(--color-bg-tertiary, #2d2d2d);
  border-radius: 6px;
  padding: 10px;
}

.update-label {
  display: block;
  font-size: 11px;
  color: var(--color-text-muted, #909399);
  margin-bottom: 8px;
}

.update-buttons {
  display: flex;
  gap: 6px;
}

.update-buttons .el-button {
  flex: 1;
}

/* 紧急按钮 */
.emergency-buttons {
  display: flex;
  gap: 8px;
}

.emergency-buttons .el-button {
  flex: 1;
}

.emergency-buttons .el-button--danger {
  --el-button-bg-color: #c45656;
  --el-button-border-color: #c45656;
}

.emergency-buttons .el-button--danger:hover {
  --el-button-hover-bg-color: #f56c6c;
  --el-button-hover-border-color: #f56c6c;
}

/* 错误信息 */
.error-message {
  margin-top: 12px;
  padding: 10px 12px;
  background-color: rgba(245, 108, 108, 0.1);
  border: 1px solid rgba(245, 108, 108, 0.3);
  border-radius: 6px;
  color: #f56c6c;
  font-size: 12px;
}

/* 关节控制标签页 */
.joint-control-tabs :deep(.el-tabs__header) {
  margin-bottom: 8px;
  background-color: var(--color-bg-secondary, #252526);
  border-bottom: 1px solid var(--color-border, #3c3c3c);
}

.joint-control-tabs :deep(.el-tabs__nav) {
  border: none;
}

.joint-control-tabs :deep(.el-tabs__item) {
  font-size: 12px;
  padding: 0 12px;
  color: var(--color-text-muted, #909399);
  border: none;
  background-color: transparent;
  transition: all 0.2s;
}

.joint-control-tabs :deep(.el-tabs__item:hover) {
  color: var(--color-text-secondary, #c0c4cc);
}

.joint-control-tabs :deep(.el-tabs__item.is-active) {
  color: #409eff;
  background-color: var(--color-bg-tertiary, #2d2d2d);
}

/* 关节输入 */
.joint-inputs {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.joint-input-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.joint-label {
  width: 24px;
  font-size: 11px;
  font-weight: 600;
  color: #409eff;
  text-align: center;
}

.joint-input-row :deep(.el-slider) {
  flex: 1;
}

.joint-input-row :deep(.el-slider__input) {
  width: 60px;
}

.joint-unit {
  width: 16px;
  font-size: 11px;
  color: var(--color-text-muted, #909399);
}

/* MoveJ 操作按钮 */
.movej-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  flex-wrap: wrap;
}

.movej-actions .el-button {
  flex: 1;
  min-width: 100px;
}

/* 笛卡尔输入 */
.cartesian-inputs {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cartesian-group {
  background-color: var(--color-bg-tertiary, #2d2d2d);
  border-radius: 6px;
  padding: 10px;
}

.group-label {
  display: block;
  font-size: 11px;
  color: var(--color-text-muted, #909399);
  margin-bottom: 8px;
}

.cartesian-row {
  display: flex;
  gap: 8px;
}

.cartesian-input {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.cartesian-input span {
  font-size: 10px;
  color: #67c23a;
  font-weight: 600;
}

.cartesian-input :deep(.el-input-number) {
  width: 100%;
}

.cartesian-input :deep(.el-input-number .el-input__inner) {
  text-align: center;
}

/* MoveL 操作按钮 */
.movel-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.movel-actions .el-button {
  flex: 1;
}

:deep(.el-divider) {
  margin: 16px 0;
  border-color: var(--color-border, #3c3c3c);
}

/* Jog 控制样式 */
.jog-config {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
  padding: var(--spacing-md);
  background: var(--color-surface, rgba(30, 41, 59, 0.4));
  backdrop-filter: blur(20px);
  border: 1px solid var(--color-border, rgba(148, 163, 184, 0.2));
  border-radius: var(--radius-lg);
}

.config-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.config-label {
  min-width: 55px;
  color: var(--color-text-secondary);
  font-size: 13px;
  font-weight: 600;
}

.config-row :deep(.el-radio-group) {
  flex: 1;
}

.config-row :deep(.el-radio-button__inner) {
  padding: 6px 12px;
  font-size: 12px;
  transition: all 0.3s var(--transition-smooth);
}

.jog-speed-config {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  padding: var(--spacing-md);
  background: var(--color-surface, rgba(15, 23, 42, 0.5));
  backdrop-filter: blur(15px);
  border: 1px solid var(--color-border, rgba(148, 163, 184, 0.15));
  border-radius: var(--radius-lg);
}

.speed-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.speed-label {
  min-width: 45px;
  color: var(--color-text-secondary);
  font-size: 13px;
  font-weight: 600;
}

.speed-value {
  min-width: 80px;
  text-align: right;
  color: #10b981;
  font-family: 'Consolas', monospace;
  font-size: 12px;
  font-weight: 700;
}

.jog-controls {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.jog-axis-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  background: var(--color-surface, rgba(30, 41, 59, 0.4));
  backdrop-filter: blur(10px);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border, rgba(148, 163, 184, 0.1));
  transition: all 0.3s var(--transition-smooth);
}

.jog-axis-row:hover {
  background: var(--color-surface-hover, rgba(30, 41, 59, 0.6));
  border-color: var(--color-border, rgba(148, 163, 184, 0.2));
}

.axis-label {
  min-width: 40px;
  color: var(--color-text-primary, #fff);
  font-weight: 600;
  font-size: 13px;
}

.axis-value {
  flex: 1;
  color: #67c23a;
  font-family: 'Consolas', monospace;
  font-size: 12px;
  text-align: center;
}

.axis-btns {
  display: flex;
  gap: 4px;
}

.jog-btn {
  width: 36px !important;
  height: 36px !important;
  padding: 0 !important;
  font-size: 18px !important;
  font-weight: bold;
  border-radius: 6px !important;
}

.jog-btn.minus {
  background: #f56c6c !important;
  border-color: #f56c6c !important;
}

.jog-btn.minus:hover {
  background: #f78989 !important;
  border-color: #f78989 !important;
}

.jog-btn.minus:active {
  background: #dd6161 !important;
  border-color: #dd6161 !important;
}

.jog-btn.plus {
  background: #67c23a !important;
  border-color: #67c23a !important;
}

.jog-btn.plus:hover {
  background: #85ce61 !important;
  border-color: #85ce61 !important;
}

.jog-btn.plus:active {
  background: #5daf34 !important;
  border-color: #5daf34 !important;
}

.jog-btn:disabled {
  opacity: 0.5 !important;
  cursor: not-allowed !important;
}

.jog-cartesian-section {
  margin-bottom: 12px;
}

.jog-cartesian-section:last-child {
  margin-bottom: 0;
}

.cartesian-title {
  color: #888;
  font-size: 12px;
  margin-bottom: 6px;
  padding-left: 4px;
}

.axis-label.axis-position {
  color: #409eff;
}

.axis-label.axis-rotation {
  color: #e6a23c;
}

/* 负载管理样式 */
.payload-config,
.payload-object {
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.config-title {
  color: var(--color-text-secondary);
  font-size: 12px;
  margin-bottom: var(--spacing-sm);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.payload-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.payload-row:last-child {
  margin-bottom: 0;
}

.payload-label {
  min-width: 70px;
  color: #ccc;
  font-size: 13px;
}

.payload-unit {
  color: #888;
  font-size: 12px;
  min-width: 25px;
}

.payload-row :deep(.el-input-number) {
  width: 100px;
}

.payload-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.payload-status {
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 10px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.payload-status .status-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  border-radius: 8px;
  background: rgba(30, 41, 59, 0.45);
  border: 1px solid rgba(148, 163, 184, 0.12);
}

.payload-status .status-row:last-child {
  margin-bottom: 0;
}

.payload-status .status-label {
  color: var(--color-text-secondary);
  font-size: 12px;
  font-weight: 600;
}

.payload-status .status-value {
  color: #34d399;
  font-weight: 700;
  font-family: 'Consolas', monospace;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(16, 185, 129, 0.18);
  border: 1px solid rgba(16, 185, 129, 0.35);
}

/* ==================== Light Mode Refinements ==================== */
:global(html.light) .arm-control-panel {
  background: transparent;
}

:global(html.light) .arm-control-panel .section-title {
  color: var(--color-text-secondary);
}

:global(html.light) .arm-control-panel .status-card {
  background: var(--color-surface);
  border-color: var(--color-border);
  box-shadow: var(--shadow-sm);
}

:global(html.light) .arm-control-panel .status-indicator {
  background: rgba(15, 23, 42, 0.06);
}

:global(html.light) .arm-control-panel .servo-status,
:global(html.light) .arm-control-panel .jog-config,
:global(html.light) .arm-control-panel .jog-speed-config,
:global(html.light) .arm-control-panel .jog-axis-row,
:global(html.light) .arm-control-panel .payload-config,
:global(html.light) .arm-control-panel .payload-object {
  background: var(--color-surface);
  border-color: var(--color-border);
  box-shadow: var(--shadow-sm);
}

:global(html.light) .arm-control-panel .points-list,
:global(html.light) .arm-control-panel .update-point-section,
:global(html.light) .arm-control-panel .cartesian-group,
:global(html.light) .arm-control-panel .payload-status {
  background: var(--color-surface);
  border-color: var(--color-border);
  box-shadow: var(--shadow-sm);
}

:global(html.light) .arm-control-panel .point-item {
  border-bottom-color: rgba(15, 23, 42, 0.06);
}

:global(html.light) .arm-control-panel .point-item:hover {
  background: rgba(15, 23, 42, 0.04);
  transform: translateX(2px);
}

:global(html.light) .arm-control-panel .point-item.selected {
  background: rgba(245, 158, 11, 0.12);
  border-left-color: var(--color-primary);
}

:global(html.light) .arm-control-panel .point-name {
  color: var(--color-text-primary);
}

:global(html.light) .arm-control-panel .point-desc,
:global(html.light) .arm-control-panel .update-label,
:global(html.light) .arm-control-panel .param-label,
:global(html.light) .arm-control-panel .payload-label,
:global(html.light) .arm-control-panel .payload-unit,
:global(html.light) .arm-control-panel .group-label {
  color: var(--color-text-muted);
}

:global(html.light) .arm-control-panel .axis-label,
:global(html.light) .arm-control-panel .speed-label,
:global(html.light) .arm-control-panel .config-label {
  color: var(--color-text-secondary);
}

:global(html.light) .arm-control-panel .axis-value,
:global(html.light) .arm-control-panel .speed-value,
:global(html.light) .arm-control-panel .param-value,
:global(html.light) .arm-control-panel .payload-status .status-value {
  color: #0f766e;
  background: rgba(16, 185, 129, 0.12);
  border-color: rgba(16, 185, 129, 0.25);
}

:global(html.light) .arm-control-panel .error-message {
  background-color: rgba(239, 68, 68, 0.08);
  border-color: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

:global(html.light) .arm-control-panel .jog-btn.minus {
  background: #f87171 !important;
  border-color: #f87171 !important;
}

:global(html.light) .arm-control-panel .jog-btn.plus {
  background: #4ade80 !important;
  border-color: #4ade80 !important;
}

:global(html.light) .arm-control-panel .jog-btn.minus:hover {
  background: #ef4444 !important;
  border-color: #ef4444 !important;
}

:global(html.light) .arm-control-panel .jog-btn.plus:hover {
  background: #22c55e !important;
  border-color: #22c55e !important;
}

:global(html.light) .arm-control-panel :deep(.el-divider) {
  border-color: rgba(15, 23, 42, 0.08);
}

/* ==================== Dark Mode Refinements ==================== */
:global(html.dark) .arm-control-panel .status-card {
  background: rgba(17, 24, 39, 0.6);
  border-color: rgba(148, 163, 184, 0.18);
  box-shadow: var(--shadow-md);
}

:global(html.dark) .arm-control-panel .servo-status,
:global(html.dark) .arm-control-panel .jog-config,
:global(html.dark) .arm-control-panel .jog-speed-config,
:global(html.dark) .arm-control-panel .jog-axis-row,
:global(html.dark) .arm-control-panel .payload-config,
:global(html.dark) .arm-control-panel .payload-object {
  background: rgba(17, 24, 39, 0.6);
  border-color: rgba(148, 163, 184, 0.18);
}

:global(html.dark) .arm-control-panel .points-list {
  background: rgba(15, 23, 42, 0.55);
  border-color: rgba(148, 163, 184, 0.18);
}

:global(html.dark) .arm-control-panel .point-item:hover {
  background: rgba(30, 41, 59, 0.65);
}

:global(html.dark) .arm-control-panel .update-point-section,
:global(html.dark) .arm-control-panel .cartesian-group,
:global(html.dark) .arm-control-panel .payload-status {
  background: rgba(15, 23, 42, 0.65);
  border: 1px solid rgba(148, 163, 184, 0.16);
}

:global(html.light) .arm-control-panel .payload-status .status-row {
  background: rgba(15, 23, 42, 0.04);
  border-color: rgba(15, 23, 42, 0.08);
}

:global(html.dark) .arm-control-panel .payload-status .status-row {
  background: rgba(30, 41, 59, 0.55);
  border-color: rgba(148, 163, 184, 0.14);
}

:global(html.dark) .arm-control-panel .payload-label,
:global(html.dark) .arm-control-panel .payload-unit,
:global(html.dark) .arm-control-panel .group-label {
  color: var(--color-text-secondary);
}
</style>


